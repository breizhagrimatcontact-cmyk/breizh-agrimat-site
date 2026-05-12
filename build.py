"""
Breizh Agrimat — Multi-page site builder (V2)
==============================================
Reads the Notion "LBC Sourcing & Pipeline" database, downloads photos,
injects stock JSON into stock/index.html, and copies all site files
to the output directory.

V2 changes:
  - Multi-page structure: /, /stock/, /vendre/, /a-propos/, /contact/
  - Stock template is now stock/index.html (not template.html)
  - Photos output to site/photos/{slug}/
  - All static files (CSS, JS, HTML pages) copied to site/

Variables d'environnement requises:
  NOTION_TOKEN          Token de l'intégration Notion
  NOTION_DATABASE_ID    ID de la BDD LBC Sourcing & Pipeline
"""
import os
import re
import json
import shutil
import io
from pathlib import Path
import requests
from PIL import Image

# ============================================================
# Configuration
# ============================================================
NOTION_TOKEN = os.environ["NOTION_TOKEN"]
NOTION_DATABASE_ID = os.environ["NOTION_DATABASE_ID"]
NOTION_VERSION = "2022-06-28"

ROOT = Path(__file__).parent
STOCK_TEMPLATE = ROOT / "stock" / "index.html"
OUTPUT_DIR = ROOT / "site"
PHOTOS_DIR = OUTPUT_DIR / "photos"

EXCLUDED_STAGES = {"Sold", "Lost", "Refused", "To contact"}

MAX_PHOTO_WIDTH = 1200

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
}

STATIC_FILES = [
    "index.html",
    "styles.css",
    "i18n.js",
    "scripts.js",
    "sitemap.xml",
    "robots.txt",
    "netlify.toml",
]

STATIC_DIRS = [
    "vendre",
    "a-propos",
    "contact",
    "assets",
]


# ============================================================
# Utilitaires
# ============================================================
def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[-\s]+", "-", text).strip("-")
    return text or "unnamed"


def get_prop(props: dict, name: str, default=None):
    p = props.get(name)
    if not p:
        return default
    t = p["type"]
    if t == "title":
        return "".join(x["plain_text"] for x in p["title"]).strip()
    if t == "rich_text":
        return "".join(x["plain_text"] for x in p["rich_text"]).strip()
    if t == "number":
        return p["number"]
    if t == "select":
        return p["select"]["name"] if p["select"] else None
    if t == "multi_select":
        return [x["name"] for x in p["multi_select"]]
    if t == "url":
        return p["url"]
    if t == "email":
        return p["email"]
    if t == "phone_number":
        return p["phone_number"]
    if t == "checkbox":
        return p["checkbox"]
    if t == "date":
        return p["date"]["start"] if p["date"] else None
    if t == "files":
        urls = []
        for f in p["files"]:
            if f["type"] == "file":
                urls.append(f["file"]["url"])
            elif f["type"] == "external":
                urls.append(f["external"]["url"])
        return urls
    if t == "formula":
        f = p["formula"]
        return f.get(f["type"])
    return default


# ============================================================
# Notion API
# ============================================================
def query_notion_database():
    url = f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query"
    rows = []
    cursor = None
    while True:
        body = {"page_size": 100}
        if cursor:
            body["start_cursor"] = cursor
        r = requests.post(url, headers=HEADERS, json=body, timeout=30)
        if r.status_code != 200:
            print(f"Notion API error {r.status_code}: {r.text}")
            r.raise_for_status()
        data = r.json()
        rows.extend(data["results"])
        if not data.get("has_more"):
            break
        cursor = data["next_cursor"]
    print(f"  {len(rows)} rows fetched from Notion")
    return rows


def download_and_resize(url: str, dest: Path) -> bool:
    try:
        r = requests.get(url, timeout=60, stream=True)
        r.raise_for_status()
        img = Image.open(io.BytesIO(r.content))
        if img.mode in ("RGBA", "P", "LA"):
            img = img.convert("RGB")
        if img.width > MAX_PHOTO_WIDTH:
            ratio = MAX_PHOTO_WIDTH / img.width
            new_size = (MAX_PHOTO_WIDTH, int(img.height * ratio))
            img = img.resize(new_size, Image.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(dest, "JPEG", quality=85, optimize=True)
        return True
    except Exception as e:
        print(f"   Photo download failed ({url[:60]}...): {e}")
        return False


# ============================================================
# Transformation Notion row -> equipment
# ============================================================
def row_to_equipment(row: dict) -> dict | None:
    props = row["properties"]

    stage = get_prop(props, "Pipeline stage")
    if stage in EXCLUDED_STAGES:
        return None

    reference = get_prop(props, "Reference", "")
    if not reference:
        return None

    brand = get_prop(props, "Brand", "")
    model = get_prop(props, "Model", "") or ""
    model = re.sub(r"\*+", "", model).strip()
    year = get_prop(props, "Year")
    hours = get_prop(props, "Hours")
    power = get_prop(props, "Horsepower")
    price = get_prop(props, "Asking price online")
    eq_type = get_prop(props, "Equipment type", "Tractor")
    notes = get_prop(props, "Notes", "")
    summary = get_prop(props, "Summary", "")
    photo_urls = get_prop(props, "Files & media", []) or []

    tagline = summary or (notes[:100] + "..." if len(notes) > 100 else notes)
    tagline = tagline.replace("\n", " ").strip()

    slug = slugify(reference)

    photo_filenames = []
    if photo_urls:
        eq_photos_dir = PHOTOS_DIR / slug
        if eq_photos_dir.exists():
            shutil.rmtree(eq_photos_dir)
        for i, url in enumerate(photo_urls, start=1):
            filename = f"photo-{i:02d}.jpg"
            dest = eq_photos_dir / filename
            if download_and_resize(url, dest):
                photo_filenames.append(filename)

    features = [line.strip(" -\t") for line in notes.split("\n") if line.strip()]
    features = [f for f in features if not re.match(r"^(bonjour|hello)", f, re.I)][:10]

    return {
        "slug": slug,
        "reference": reference,
        "brand": brand or "Unknown",
        "model": model,
        "year": year,
        "hours": hours,
        "power": power,
        "price": price,
        "type": eq_type,
        "tagline": tagline[:140] if tagline else f"{brand} {model} — {year}",
        "photos": photo_filenames,
        "features": features,
        "notes_full": notes,
    }


# ============================================================
# Site generation
# ============================================================
def copy_static_files():
    for filename in STATIC_FILES:
        src = ROOT / filename
        if src.exists():
            dest = OUTPUT_DIR / filename
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            print(f"  Copied {filename}")

    for dirname in STATIC_DIRS:
        src = ROOT / dirname
        if src.exists():
            dest = OUTPUT_DIR / dirname
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(src, dest)
            print(f"  Copied {dirname}/")


def generate_stock_page(equipment_list: list) -> str:
    template = STOCK_TEMPLATE.read_text(encoding="utf-8")
    stock_json = json.dumps(equipment_list, ensure_ascii=False, indent=2)
    if "/*INJECT_STOCK*/" not in template:
        raise RuntimeError("stock/index.html must contain the /*INJECT_STOCK*/ marker")
    return template.replace("/*INJECT_STOCK*/", stock_json)


# ============================================================
# Pipeline
# ============================================================
def main():
    print("Breizh Agrimat V2 — Site Build")
    print("=" * 50)

    # 1. Fetch from Notion
    rows = query_notion_database()

    # 2. Transform
    equipment = []
    for row in rows:
        eq = row_to_equipment(row)
        if eq:
            equipment.append(eq)
            print(f"  + {eq['reference']} ({len(eq['photos'])} photo(s))")
        else:
            ref = get_prop(row["properties"], "Reference", "?")
            stage = get_prop(row["properties"], "Pipeline stage", "?")
            print(f"  - Excluded: {ref} (stage: {stage})")

    # 3. Sort by price descending
    equipment.sort(key=lambda e: e.get("price") or 0, reverse=True)

    # 4. Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 5. Copy static files (home, CSS, JS, other pages)
    copy_static_files()

    # 5b. Inject featured stock into home page
    featured = equipment[:3]
    home_path = OUTPUT_DIR / "index.html"
    if home_path.exists():
        home_html = home_path.read_text(encoding="utf-8")
        if "/*INJECT_FEATURED*/" in home_html:
            featured_json = json.dumps(featured, ensure_ascii=False, indent=2)
            home_html = home_html.replace("/*INJECT_FEATURED*/", featured_json)
            home_path.write_text(home_html, encoding="utf-8")
            print(f"  Injected {len(featured)} featured items into index.html")

    # 6. Generate stock page with injected data
    stock_html = generate_stock_page(equipment)
    stock_output = OUTPUT_DIR / "stock" / "index.html"
    stock_output.parent.mkdir(parents=True, exist_ok=True)
    stock_output.write_text(stock_html, encoding="utf-8")
    print(f"  Generated stock/index.html with {len(equipment)} items")

    print("=" * 50)
    print(f"  Output:  {OUTPUT_DIR}")
    print(f"  Photos:  {PHOTOS_DIR}")
    print(f"  Stock:   {len(equipment)} equipment(s)")
    print("  Build OK")


if __name__ == "__main__":
    main()

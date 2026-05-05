"""
Breizh Agrimat — Stock site builder
====================================
Lit la BDD "LBC Sourcing & Pipeline" dans Notion, télécharge les photos,
génère le site HTML public.

Variables d'environnement requises:
  NOTION_TOKEN          Token de l'intégration Notion (commence par "secret_" ou "ntn_")
  NOTION_DATABASE_ID    ID de la BDD LBC Sourcing & Pipeline (sans tirets ou avec)

Lancement manuel (pour tester):
  pip install -r requirements.txt
  export NOTION_TOKEN=secret_xxxxxx
  export NOTION_DATABASE_ID=78de78753903494891208b23aaf6c8f6
  python build.py
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
TEMPLATE_FILE = ROOT / "template.html"
OUTPUT_DIR = ROOT / "site"
PHOTOS_DIR = OUTPUT_DIR / "photos"

# Stages exclus du site public (annonces vendues, perdues, refusées, ou non encore contactées)
EXCLUDED_STAGES = {"Sold", "Lost", "Refused", "To contact"}

# Largeur max des photos (compression web)
MAX_PHOTO_WIDTH = 1200

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
}


# ============================================================
# Utilitaires
# ============================================================
def slugify(text: str) -> str:
    """Convertit 'John Deere - 6110 M - 2018' → 'john-deere-6110-m-2018'."""
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[-\s]+", "-", text).strip("-")
    return text or "unnamed"


def get_prop(props: dict, name: str, default=None):
    """Extrait la valeur d'une propriété Notion en gérant tous les types."""
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
    """Récupère toutes les lignes de la BDD Notion (paginé)."""
    url = f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query"
    rows = []
    cursor = None
    while True:
        body = {"page_size": 100}
        if cursor:
            body["start_cursor"] = cursor
        r = requests.post(url, headers=HEADERS, json=body, timeout=30)
        if r.status_code != 200:
            print(f"❌ Notion API error {r.status_code}: {r.text}")
            r.raise_for_status()
        data = r.json()
        rows.extend(data["results"])
        if not data.get("has_more"):
            break
        cursor = data["next_cursor"]
    print(f"📥 {len(rows)} lignes récupérées depuis Notion")
    return rows


def download_and_resize(url: str, dest: Path) -> bool:
    """Télécharge et redimensionne une photo. Renvoie True si succès."""
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
        print(f"   ⚠️  Photo non téléchargée ({url[:60]}...): {e}")
        return False


# ============================================================
# Transformation Notion row → équipement public
# ============================================================
def row_to_equipment(row: dict) -> dict | None:
    """Convertit une ligne Notion en dict d'équipement, ou None si à exclure."""
    props = row["properties"]

    stage = get_prop(props, "Pipeline stage")
    if stage in EXCLUDED_STAGES:
        return None

    reference = get_prop(props, "Reference", "")
    if not reference:
        return None

    brand = get_prop(props, "Brand", "")
    model = get_prop(props, "Model", "") or ""
    # Notion peut stocker du markdown dans rich_text, on nettoie
    model = re.sub(r"\*+", "", model).strip()
    year = get_prop(props, "Year")
    hours = get_prop(props, "Hours")
    power = get_prop(props, "Horsepower")
    price = get_prop(props, "Asking price online")
    eq_type = get_prop(props, "Equipment type", "Tractor")
    notes = get_prop(props, "Notes", "")
    summary = get_prop(props, "Summary", "")
    photo_urls = get_prop(props, "Files & media", []) or []

    # Tagline = courte phrase d'accroche basée sur la 1ère caractéristique du Summary, sinon sur Notes
    if summary:
        # Première bullet du summary, sans le tiret initial, max 100 chars
        first_line = next((line.lstrip("- •*\t ").strip() for line in summary.split("\n") if line.strip()), "")
        tagline = first_line[:100]
    else:
        tagline = (notes[:100] + "..." if len(notes) > 100 else notes).replace("\n", " ").strip()

    slug = slugify(reference)

    # Téléchargement des photos
    photo_filenames = []
    if photo_urls:
        eq_photos_dir = PHOTOS_DIR / slug
        # On nettoie l'ancien dossier pour reflèter exactement les photos actuelles dans Notion
        if eq_photos_dir.exists():
            shutil.rmtree(eq_photos_dir)
        for i, url in enumerate(photo_urls, start=1):
            ext = "jpg"
            filename = f"photo-{i:02d}.{ext}"
            dest = eq_photos_dir / filename
            if download_and_resize(url, dest):
                photo_filenames.append(filename)

    # Caractéristiques: priorité au Summary (généré par Notion AI), fallback sur Notes
    if summary:
        features = [line.lstrip("- •*\t ").strip() for line in summary.split("\n") if line.strip()]
    else:
        features = [line.strip(" -•*\t") for line in notes.split("\n") if line.strip()]
        features = [f for f in features if not re.match(r"^(bonjour|hello)", f, re.I)]
    features = [f for f in features if f][:10]

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
# Génération du HTML
# ============================================================
def generate_html(equipment_list: list) -> str:
    """Injecte le STOCK dans le template HTML."""
    template = TEMPLATE_FILE.read_text(encoding="utf-8")
    stock_json = json.dumps(equipment_list, ensure_ascii=False, indent=2)
    # Le template contient le marker /*INJECT_STOCK*/
    if "/*INJECT_STOCK*/" not in template:
        raise RuntimeError("Le template doit contenir le marker /*INJECT_STOCK*/")
    return template.replace("/*INJECT_STOCK*/", stock_json)


# ============================================================
# Pipeline complet
# ============================================================
def main():
    print("🚜 Breizh Agrimat — Build du site stock")
    print("=" * 50)

    # 1. Récupération depuis Notion
    rows = query_notion_database()

    # 2. Transformation
    equipment = []
    for row in rows:
        eq = row_to_equipment(row)
        if eq:
            equipment.append(eq)
            print(f"  ✅ {eq['reference']} ({len(eq['photos'])} photo(s))")
        else:
            ref = get_prop(row["properties"], "Reference", "?")
            stage = get_prop(row["properties"], "Pipeline stage", "?")
            print(f"  ⏭️  Exclu: {ref} (stage: {stage})")

    # 3. Tri par prix décroissant (plus chers en haut, ça met le stock premium en avant)
    equipment.sort(key=lambda e: e.get("price") or 0, reverse=True)

    # 4. Génération du HTML
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    html = generate_html(equipment)
    (OUTPUT_DIR / "index.html").write_text(html, encoding="utf-8")
    print(f"\n📄 Site généré: {OUTPUT_DIR / 'index.html'}")
    print(f"📸 Photos:       {PHOTOS_DIR}")
    print(f"📦 {len(equipment)} équipement(s) publié(s)")
    print("=" * 50)
    print("✨ Build OK")


if __name__ == "__main__":
    main()

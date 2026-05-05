# Breizh Agrimat — Pipeline auto Notion → Site web

> Tu mets à jour ta BDD Notion. Le site web public se met à jour tout seul tous les jours.
> Aucune compétence dev requise. Suis ce guide pas à pas.

---

## Comment ça marche (en 30 secondes)

```
┌─────────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Toi dans Notion    │ →  │  GitHub Actions  │ →  │  Netlify (site)  │
│  ajoutes/modifies   │    │  build.py tourne │    │  redeploie auto  │
│  une annonce        │    │  tous les jours  │    │  ~2 min après    │
└─────────────────────┘    └──────────────────┘    └──────────────────┘
```

**Tous les jours à 7h du matin**, un robot lit ta BDD Notion, télécharge les nouvelles photos, régénère le site, le publie. Tu n'as **rien d'autre à faire** que d'ajouter tes annonces dans Notion comme tu fais déjà.

Si tu veux forcer une mise à jour avant l'heure, tu cliques un bouton sur GitHub. C'est tout.

---

## Étape par étape (compte à 0 — environ 45 minutes la 1ère fois)

### ÉTAPE 1 — Créer un compte GitHub (5 min)

GitHub = service où tu vas héberger les fichiers du site et le robot.

1. Va sur **https://github.com/signup**
2. Email pro recommandé (ex: `estebanm.0904@gmail.com`)
3. Choisis un nom d'utilisateur (ex: `esteban-breizh-agrimat`)
4. Choisis un mot de passe solide (note-le quelque part)
5. Vérifie l'email
6. Réponds aux questions (peu importe les réponses) → choisir "Free plan"

✅ Tu es maintenant connecté sur github.com avec ton nouveau compte.

---

### ÉTAPE 2 — Créer le repository "breizh-agrimat-site" (3 min)

Un "repository" (ou "repo") = un dossier en ligne qui contient les fichiers du projet.

1. Une fois connecté, clique en haut à droite sur **+ → New repository**
2. **Repository name**: `breizh-agrimat-site`
3. **Description**: `Site web public — stock matériel agricole`
4. Choisis **Public** (sauf si tu veux payer pour un repo privé)
5. ✅ Coche **"Add a README file"**
6. Clique **Create repository**

✅ Tu as un repo vide à l'adresse `https://github.com/<ton-username>/breizh-agrimat-site`

---

### ÉTAPE 3 — Uploader les fichiers du dossier `automation/` (5 min)

1. Sur la page de ton repo, clique **Add file → Upload files**
2. Ouvre ton Finder/explorateur de fichiers
3. Va dans `~/Documents/Claude/Projects/Reborn Breizh Agrimat/automation/`
4. Sélectionne **TOUS** les fichiers et dossiers visibles :
   - `build.py`
   - `template.html`
   - `requirements.txt`
   - `README.md`
   - `.gitignore`
   - le dossier `.github/`
5. Glisse-dépose le tout dans la zone GitHub
6. En bas, dans "Commit changes", laisse le message par défaut
7. Clique **Commit changes** (gros bouton vert)

⚠️ **Attention au dossier `.github/`** : il commence par un point. Sur Mac il peut être caché. Dans Finder, fais `Cmd + Shift + .` pour afficher les fichiers cachés. Sur Windows : `Affichage → Éléments masqués`.

✅ Tu vois maintenant tes fichiers en ligne sur GitHub.

---

### ÉTAPE 4 — Créer une intégration Notion (5 min)

L'intégration = la "clé" qui permet au robot de lire ta BDD Notion.

1. Va sur **https://www.notion.so/profile/integrations**
2. Clique **+ New integration**
3. **Name**: `Breizh Agrimat — Site Builder`
4. **Associated workspace**: choisis ton workspace (`Esteban's personnal`)
5. **Type**: laisse "Internal"
6. Clique **Save**
7. Sur l'écran suivant, va dans **Configuration** → en haut, copie le **"Internal Integration Secret"** (commence par `ntn_...` ou `secret_...`)

📝 **Note ce token quelque part de sûr** (mot de passe manager, ou note locale chiffrée). Tu en auras besoin dans 2 minutes.

---

### ÉTAPE 5 — Donner accès à ta BDD à l'intégration (2 min) ⚠️ CRUCIAL

Sans cette étape, le robot ne pourra rien lire. C'est l'oubli le plus fréquent.

1. Va sur ton workspace Notion
2. Ouvre la BDD **📋 LBC Sourcing & Pipeline** (clic dessus pour l'ouvrir en plein écran)
3. En haut à droite de la page, clique sur **• • •** (les 3 points)
4. Tout en bas : **Connections** → clique
5. Cherche **"Breizh Agrimat — Site Builder"** → clique dessus
6. Confirme **Connect**

✅ Ton intégration a maintenant accès à la BDD.

---

### ÉTAPE 6 — Récupérer l'ID de la BDD (1 min)

1. Toujours sur ta BDD ouverte en plein écran, regarde l'URL dans la barre du navigateur :
   ```
   https://www.notion.so/78de78753903494891208b23aaf6c8f6?v=...
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ```
2. La partie de 32 caractères après `notion.so/` (avant le `?v=`) c'est l'ID.
   Pour ton workspace c'est : **`78de78753903494891208b23aaf6c8f6`**

📝 Note-le aussi.

---

### ÉTAPE 7 — Mettre les 2 secrets dans GitHub (3 min)

1. Retourne sur ton repo GitHub `breizh-agrimat-site`
2. Onglet **Settings** (en haut, à droite des onglets)
3. Menu de gauche → **Secrets and variables** → **Actions**
4. Clique **New repository secret**
   - **Name**: `NOTION_TOKEN`
   - **Secret**: colle le token noté à l'étape 4 (commence par `ntn_` ou `secret_`)
   - Clique **Add secret**
5. Re-clique **New repository secret**
   - **Name**: `NOTION_DATABASE_ID`
   - **Secret**: colle l'ID noté à l'étape 6 (`78de78753903494891208b23aaf6c8f6`)
   - Clique **Add secret**

✅ Tu as 2 secrets configurés. GitHub les utilisera pour appeler Notion sans jamais les afficher.

---

### ÉTAPE 8 — Lancer le 1er build manuellement (2 min)

1. Sur ton repo, onglet **Actions** (en haut)
2. Clique sur **Build site from Notion** dans la liste de gauche
3. À droite, bouton gris **Run workflow** → clique
4. Une popup s'ouvre, laisse tout par défaut → clique **Run workflow**
5. Attends ~30 secondes, rafraîchis la page
6. Tu vois une ligne avec un cercle jaune qui tourne, puis vert ✅ (succès) ou rouge ❌ (erreur)

**Si vert ✅** : Le build a marché. Va voir ton repo, tu as maintenant un dossier `site/` avec `index.html` + `photos/`.

**Si rouge ❌** : Clique sur la ligne pour voir le log d'erreur. Les 2 erreurs les plus fréquentes :
- *"401 Unauthorized"* → ton `NOTION_TOKEN` est faux (re-vérifie étape 4 + 7)
- *"Could not find database"* → tu n'as pas connecté la BDD à l'intégration (refait étape 5)

---

### ÉTAPE 9 — Connecter Netlify pour publier le site (5 min)

Netlify = service qui va prendre les fichiers du dossier `site/` et les rendre accessibles à une URL publique.

1. Va sur **https://app.netlify.com/signup**
2. Clique **Sign up with GitHub** (le plus simple) → autorise
3. Une fois sur le tableau de bord Netlify, clique **Add new site → Import an existing project**
4. Choisis **GitHub** → autorise Netlify à voir tes repos
5. Cherche `breizh-agrimat-site` → clique dessus
6. Configuration du déploiement :
   - **Branch to deploy**: `main`
   - **Build command**: laisse vide (le build se fait sur GitHub, pas Netlify)
   - **Publish directory**: `site`
7. Clique **Deploy site**
8. Attends ~30 secondes. Tu obtiens une URL du genre `https://gentle-otter-12345.netlify.app`

✅ **Ton site est en ligne.** Ouvre l'URL dans un nouvel onglet, tu vois ton stock.

Pour changer le nom de l'URL : **Site settings → Domain management → Options → Edit site name** → ex: `breizh-agrimat`.

---

### ÉTAPE 10 — (Optionnel) Domaine perso (10 min, ~10 €/an)

Si tu veux `breizh-agrimat.fr` au lieu de `breizh-agrimat.netlify.app` :

1. Achète le domaine sur **OVH**, **Gandi**, ou **Cloudflare Registrar** (~10 €/an)
2. Sur Netlify : **Domain management → Add custom domain** → tape ton domaine
3. Netlify te donne 2 enregistrements DNS à ajouter chez ton registrar (suis les instructions sur l'écran Netlify)
4. Attends que la propagation DNS se fasse (15 min à 24h selon le registrar)
5. Netlify met le HTTPS gratuit en place automatiquement

---

## C'est tout. Workflow quotidien à partir de maintenant

### Quand tu trouves une nouvelle annonce intéressante :

1. Tu ajoutes une ligne dans ta BDD **📋 LBC Sourcing & Pipeline** dans Notion
2. Tu remplis : Reference, Brand, Model, Year, Hours, Horsepower, Asking price online, Notes
3. Tu drag & drop les **photos** dans le champ "Files & media"
4. Tu mets le **Pipeline stage** sur "Replied" ou "Confirmed available" (sinon ne s'affichera pas)

### Le lendemain matin à 7h :

→ Le robot tourne, le site est mis à jour. Tu peux vérifier dans l'onglet **Actions** de ton repo.

### Si tu veux pousser une mise à jour MAINTENANT (pas attendre demain matin) :

→ Onglet **Actions** sur GitHub → **Run workflow** → 30 secondes plus tard c'est en ligne.

### Si tu veux retirer un tracteur du site :

→ Dans Notion, change le **Pipeline stage** en `Sold`, `Lost` ou `Refused` → il disparaît au prochain build.

---

## Filtrage : qui apparaît sur le site, qui n'apparaît pas

| Pipeline stage | Affiché sur le site ? |
|---|---|
| `To contact` | ❌ Non (pas encore validé) |
| `Message sent` | ❌ Non (pas de réponse confirmée) |
| `Replied` | ✅ Oui |
| `Price negotiation` | ✅ Oui |
| `Other items proposed` | ✅ Oui |
| `Confirmed available` | ✅ Oui |
| `Refused` | ❌ Non |
| `Sold` | ❌ Non |
| `Lost` | ❌ Non |

C'est défini dans `build.py`, ligne 27 (constante `EXCLUDED_STAGES`). Tu peux changer si tu veux.

---

## Tester le script en local (optionnel — pour debug)

Si un jour tu veux tester sans pousser sur GitHub :

```bash
cd ~/Documents/Claude/Projects/Reborn\ Breizh\ Agrimat/automation
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export NOTION_TOKEN="ntn_xxxxx"
export NOTION_DATABASE_ID="78de78753903494891208b23aaf6c8f6"
python build.py
```

Le résultat est dans `automation/site/index.html` — tu l'ouvres dans ton navigateur pour voir.

---

## Troubleshooting

**Le site n'a pas mes nouvelles annonces.**
→ Vérifie le Pipeline stage dans Notion. Vérifie aussi le dernier run dans **Actions** : a-t-il tourné ? a-t-il réussi ?

**Une photo ne s'affiche pas.**
→ Dans Notion, vérifie que la photo est bien dans le champ "Files & media" (pas dans le contenu de la page). Relance un build manuel.

**"401 Unauthorized" dans les logs.**
→ Token Notion expiré ou incorrect. Régénère-le (étape 4) et remplace dans GitHub Secrets (étape 7).

**Je veux ajouter un nouveau champ (ex: location, transmission, etc.).**
→ Modifie `build.py` ligne `def row_to_equipment` pour ajouter le `get_prop`. Modifie ensuite `template.html` pour l'afficher. Commit et push : le site se rebuild automatiquement.

**Je veux changer la fréquence (toutes les 2h au lieu de 24h).**
→ Édite `.github/workflows/build.yml` ligne `cron: '0 6 * * *'` →
- toutes les 2h : `'0 */2 * * *'`
- toutes les heures : `'0 * * * *'`
- 2 fois par jour (7h et 19h) : `'0 7,19 * * *'`

**Le site dit "0 results".**
→ Aucune annonce dans Notion n'a un Pipeline stage publiable. Mets au moins une en "Replied" ou "Confirmed available".

---

## Coûts récapitulatifs

| Service | Coût |
|---|---|
| GitHub | Gratuit (repos publics) |
| GitHub Actions | Gratuit (2000 min/mois — un build prend ~30s, donc 1500 builds gratuits/mois) |
| Netlify | Gratuit (100 GB bande passante/mois) |
| Notion | Gratuit (ton plan actuel suffit) |
| Domaine perso (optionnel) | ~10 €/an |
| **Total** | **0 à 10 €/an** |

---

## Architecture des fichiers

```
breizh-agrimat-site/        ← ton repo GitHub
├── build.py                ← le robot (lit Notion, génère le HTML)
├── template.html           ← le squelette du site
├── requirements.txt        ← libs Python
├── README.md               ← ce document
├── .gitignore              ← fichiers locaux à ignorer
├── .github/
│   └── workflows/
│       └── build.yml       ← config du robot (cron quotidien)
└── site/                   ← GÉNÉRÉ AUTO — ne pas modifier à la main
    ├── index.html
    └── photos/
        ├── jd-6110m-2018/
        ├── jd-6195r-2019/
        └── ...
```

---

## Quand tu veux faire évoluer le site

Toutes les modifs visuelles passent par `template.html`. Tu peux :
- Changer les couleurs (variables CSS en haut du fichier)
- Ajouter/retirer des sections
- Modifier le wording

Tu commit, tu push, le workflow déclenche un nouveau build, Netlify déploie. Tu vois le résultat en 2 minutes.

---

**Bonne chance, et bonne prospection. 🚜**

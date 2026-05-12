/*
  Breizh Agrimat V2 — Internationalization
  Languages: EN (default), FR, DE
  Usage: elements with data-i18n="key" get their textContent replaced.
         elements with data-i18n-html="key" get their innerHTML replaced.
         elements with data-i18n-placeholder="key" get placeholder replaced.
*/

const TRANSLATIONS = {

  // ===== NAVIGATION =====
  "nav.stock": { en: "Stock", fr: "Stock", de: "Bestand" },
  "nav.sell": { en: "Sell", fr: "Vendre", de: "Verkaufen" },
  "nav.about": { en: "About", fr: "À propos", de: "Über uns" },
  "nav.contact": { en: "Contact", fr: "Contact", de: "Kontakt" },
  "nav.browse": { en: "Browse stock", fr: "Voir le stock", de: "Bestand ansehen" },

  // ===== HERO =====
  "hero.tag": { en: "Stock updated weekly", fr: "Stock mis à jour chaque semaine", de: "Bestand wöchentlich aktualisiert" },
  "hero.title": {
    en: "Used farm equipment, sourced and verified across Europe.",
    fr: "Du matériel agricole d’occasion, sourcé et vérifié partout en Europe.",
    de: "Gebrauchte Landmaschinen, europaweit gefunden und geprüft."
  },
  "hero.sub": {
    en: "An independent French broker. Trilingual. Pan-European reach.",
    fr: "Un mandataire français indépendant. Trilingue. Couverture pan-européenne.",
    de: "Ein unabhängiger französischer Makler. Dreisprachig. Europäische Reichweite."
  },
  "hero.cta.browse": { en: "Browse stock", fr: "Voir le stock", de: "Bestand ansehen" },
  "hero.cta.sell": { en: "Sell your equipment", fr: "Vendez votre matériel", de: "Verkaufen Sie Ihre Maschine" },
  "hero.stat.machines": { en: "machines sold", fr: "machines vendues", de: "Maschinen verkauft" },
  "hero.stat.countries": { en: "European countries", fr: "pays européens", de: "europäische Länder" },
  "hero.stat.trilingual": { en: "Trilingual: EN · FR · DE", fr: "Trilingue : EN · FR · DE", de: "Dreisprachig: EN · FR · DE" },

  // ===== MARQUEE =====
  "marquee.label": { en: "Trusted brands we work with", fr: "Marques avec lesquelles nous travaillons", de: "Marken, mit denen wir arbeiten" },

  // ===== PILLARS =====
  "pillars.overline": { en: "Our approach", fr: "Notre approche", de: "Unser Ansatz" },
  "pillars.title": { en: "Four pillars of trust", fr: "Quatre piliers de confiance", de: "Vier Säulen des Vertrauens" },
  "pillar.1.title": { en: "Pan-European sourcing", fr: "Sourcing pan-européen", de: "Europäische Beschaffung" },
  "pillar.1.desc": {
    en: "Equipment found across France, UK, Germany, Netherlands, Poland, and more.",
    fr: "Matériel trouvé en France, au Royaume-Uni, en Allemagne, aux Pays-Bas, en Pologne et ailleurs.",
    de: "Maschinen aus Frankreich, Großbritannien, Deutschland, den Niederlanden, Polen und weiteren Ländern."
  },
  "pillar.2.title": { en: "Independent inspection", fr: "Inspection indépendante", de: "Unabhängige Inspektion" },
  "pillar.2.desc": {
    en: "Every machine physically checked by a verified expert before purchase.",
    fr: "Chaque machine est physiquement contrôlée par un expert vérifié avant l’achat.",
    de: "Jede Maschine wird vor dem Kauf physisch von einem geprüften Experten kontrolliert."
  },
  "pillar.3.title": { en: "Verified sellers", fr: "Vendeurs vérifiés", de: "Verifizierte Verkäufer" },
  "pillar.3.desc": {
    en: "Full KYC and document validation. No unknown intermediaries.",
    fr: "Vérification KYC complète et validation des documents. Aucun intermédiaire inconnu.",
    de: "Vollständige KYC- und Dokumentenprüfung. Keine unbekannten Zwischenhändler."
  },
  "pillar.4.title": { en: "End-to-end handling", fr: "Gestion de A à Z", de: "Rundum-Service" },
  "pillar.4.desc": {
    en: "Paperwork, export documents, transport: we handle it all so you don’t have to.",
    fr: "Papiers, documents d’export, transport : nous gérons tout pour que vous n’ayez pas à le faire.",
    de: "Papierkram, Exportdokumente, Transport: Wir kümmern uns um alles, damit Sie es nicht müssen."
  },

  // ===== STEPPER =====
  "stepper.overline": { en: "How it works", fr: "Comment ça marche", de: "So funktioniert es" },
  "stepper.title": { en: "From search to delivery", fr: "De la recherche à la livraison", de: "Von der Suche bis zur Lieferung" },
  "step.1.title": { en: "Tell us what you need", fr: "Dites-nous ce qu’il vous faut", de: "Sagen Sie uns, was Sie brauchen" },
  "step.1.desc": { en: "Brand, model, budget, timeline.", fr: "Marque, modèle, budget, délai.", de: "Marke, Modell, Budget, Zeitrahmen." },
  "step.2.title": { en: "We source across Europe", fr: "Nous sourcons en Europe", de: "Wir suchen europaweit" },
  "step.2.desc": { en: "Our network spans 12+ countries.", fr: "Notre réseau couvre plus de 12 pays.", de: "Unser Netzwerk umfasst 12+ Länder." },
  "step.3.title": { en: "We inspect & verify", fr: "Nous inspectons et vérifions", de: "Wir prüfen und verifizieren" },
  "step.3.desc": { en: "Independent expert on-site check.", fr: "Contrôle sur site par un expert indépendant.", de: "Vor-Ort-Prüfung durch unabhängigen Experten." },
  "step.4.title": { en: "Paperwork & shipping", fr: "Papiers et transport", de: "Papierkram und Versand" },
  "step.4.desc": { en: "Export docs, invoicing, logistics.", fr: "Documents d’export, facturation, logistique.", de: "Exportdokumente, Rechnungsstellung, Logistik." },
  "step.5.title": { en: "Delivered to your door", fr: "Livré chez vous", de: "An Ihre Tür geliefert" },
  "step.5.desc": { en: "The machine arrives ready to work.", fr: "La machine arrive prête à travailler.", de: "Die Maschine kommt einsatzbereit an." },

  // ===== FEATURED STOCK =====
  "featured.overline": { en: "Featured stock", fr: "Sélection du moment", de: "Aktuelle Auswahl" },
  "featured.title": { en: "Latest arrivals", fr: "Dernières arrivées", de: "Neueste Zugänge" },
  "featured.viewall": { en: "View all stock", fr: "Voir tout le stock", de: "Gesamten Bestand ansehen" },

  // ===== STORY =====
  "story.overline": { en: "Our story", fr: "Notre histoire", de: "Unsere Geschichte" },
  "story.title": {
    en: "Founded by a farmer’s son in Brittany",
    fr: "Fondé par un fils d’agriculteur en Bretagne",
    de: "Gegründet vom Sohn eines Bauern in der Bretagne"
  },
  "story.p1": {
    en: "Esteban Massue grew up on a Breton farm in Treffendel, Ille-et-Vilaine.",
    fr: "Esteban Massue a grandi dans une ferme bretonne à Treffendel, en Ille-et-Vilaine.",
    de: "Esteban Massue wuchs auf einem bretonischen Bauernhof in Treffendel, Ille-et-Vilaine, auf."
  },
  "story.p2": {
    en: "At 21, he founded Breizh Agrimat to help farmers sell their used equipment — like a real estate agent for tractors.",
    fr: "À 21 ans, il a fondé Breizh Agrimat pour aider les agriculteurs à vendre leur matériel d’occasion — comme un agent immobilier pour tracteurs.",
    de: "Mit 21 gründete er Breizh Agrimat, um Landwirten beim Verkauf ihrer Gebrauchtmaschinen zu helfen — wie ein Immobilienmakler für Traktoren."
  },
  "story.p3": {
    en: "After two years, 1,000+ machines sold and recognition from major French agricultural press, he’s now scaling the model across Europe.",
    fr: "Après deux ans, plus de 1 000 machines vendues et une reconnaissance de la presse agricole française, il étend désormais le modèle à toute l’Europe.",
    de: "Nach zwei Jahren, über 1.000 verkauften Maschinen und Anerkennung durch die französische Fachpresse skaliert er das Modell nun europaweit."
  },
  "story.press": { en: "As featured in", fr: "Vu dans", de: "Bekannt aus" },

  // ===== TESTIMONIALS =====
  "testimonials.overline": { en: "Testimonials", fr: "Témoignages", de: "Referenzen" },
  "testimonials.title": { en: "Trusted across Europe", fr: "La confiance à travers l’Europe", de: "Vertrauen in ganz Europa" },

  // ===== DUAL CTA =====
  "cta.buy.overline": { en: "For buyers", fr: "Pour les acheteurs", de: "Für Käufer" },
  "cta.buy.title": { en: "Looking for a specific machine?", fr: "Vous cherchez une machine précise ?", de: "Suchen Sie eine bestimmte Maschine?" },
  "cta.buy.desc": {
    en: "Tell us what you need. We’ll source it across Europe within 14 days.",
    fr: "Dites-nous ce qu’il vous faut. Nous le trouverons en Europe sous 14 jours.",
    de: "Sagen Sie uns, was Sie brauchen. Wir finden es europaweit innerhalb von 14 Tagen."
  },
  "cta.buy.btn": { en: "Send a request", fr: "Envoyer une demande", de: "Anfrage senden" },
  "cta.sell.overline": { en: "For sellers", fr: "Pour les vendeurs", de: "Für Verkäufer" },
  "cta.sell.title": { en: "Have a machine to sell?", fr: "Vous avez une machine à vendre ?", de: "Haben Sie eine Maschine zu verkaufen?" },
  "cta.sell.desc": {
    en: "Get a free valuation in 48h. We handle the rest.",
    fr: "Obtenez une estimation gratuite en 48h. Nous gérons le reste.",
    de: "Erhalten Sie eine kostenlose Bewertung in 48 Stunden. Wir erledigen den Rest."
  },
  "cta.sell.btn": { en: "Get a quote", fr: "Obtenir un devis", de: "Angebot anfordern" },

  // ===== FOOTER =====
  "footer.tagline": {
    en: "Used farm equipment, sourced and verified across Europe.",
    fr: "Matériel agricole d’occasion, sourcé et vérifié partout en Europe.",
    de: "Gebrauchte Landmaschinen, europaweit gefunden und geprüft."
  },
  "footer.nav": { en: "Navigation", fr: "Navigation", de: "Navigation" },
  "footer.contact": { en: "Contact", fr: "Contact", de: "Kontakt" },
  "footer.legal": { en: "Legal", fr: "Légal", de: "Rechtliches" },
  "footer.privacy": { en: "Privacy policy", fr: "Politique de confidentialité", de: "Datenschutz" },
  "footer.terms": { en: "Terms of service", fr: "Conditions générales", de: "Nutzungsbedingungen" },
  "footer.copy": {
    en: "© 2026 Breizh Agrimat. Founded in Brittany, France.",
    fr: "© 2026 Breizh Agrimat. Fondé en Bretagne, France.",
    de: "© 2026 Breizh Agrimat. Gegründet in der Bretagne, Frankreich."
  },
  "footer.hours": {
    en: "Mon–Sat 8AM–8PM CET",
    fr: "Lun–Sam 8h–20h CET",
    de: "Mo–Sa 8–20 Uhr MEZ"
  },

  // ===== STOCK PAGE =====
  "stock.title": { en: "All stock", fr: "Tout le stock", de: "Gesamter Bestand" },
  "stock.subtitle": {
    en: "Browse our full catalogue of verified agricultural equipment.",
    fr: "Parcourez notre catalogue complet de matériel agricole vérifié.",
    de: "Durchsuchen Sie unseren vollständigen Katalog geprüfter Landmaschinen."
  },
  "stock.search": { en: "Search brand, model, year...", fr: "Chercher marque, modèle, année...", de: "Marke, Modell, Jahr suchen..." },
  "stock.brand": { en: "All brands", fr: "Toutes les marques", de: "Alle Marken" },
  "stock.type": { en: "All types", fr: "Tous les types", de: "Alle Typen" },
  "stock.sort": { en: "Sort by", fr: "Trier par", de: "Sortieren nach" },
  "stock.sort.price_desc": { en: "Price: high to low", fr: "Prix : décroissant", de: "Preis: absteigend" },
  "stock.sort.price_asc": { en: "Price: low to high", fr: "Prix : croissant", de: "Preis: aufsteigend" },
  "stock.sort.year_desc": { en: "Year: newest", fr: "Année : récent", de: "Jahr: neueste" },
  "stock.sort.hours_asc": { en: "Hours: lowest", fr: "Heures : croissant", de: "Stunden: niedrigste" },
  "stock.results": { en: "results", fr: "résultats", de: "Ergebnisse" },
  "stock.result": { en: "result", fr: "résultat", de: "Ergebnis" },
  "stock.empty": {
    en: "No equipment matches your search.",
    fr: "Aucun matériel ne correspond à votre recherche.",
    de: "Keine Maschine entspricht Ihrer Suche."
  },
  "stock.available": { en: "Available", fr: "Disponible", de: "Verfügbar" },
  "stock.year": { en: "Year", fr: "Année", de: "Jahr" },
  "stock.hours": { en: "Hours", fr: "Heures", de: "Stunden" },
  "stock.power": { en: "Power", fr: "Puissance", de: "Leistung" },
  "stock.price": { en: "Price", fr: "Prix", de: "Preis" },
  "stock.exworks": { en: "Ex-works", fr: "Départ", de: "Ab Werk" },
  "stock.details": { en: "Details", fr: "Détails", de: "Details" },
  "stock.highlights": { en: "Highlights", fr: "Points clés", de: "Highlights" },
  "stock.description": { en: "Description", fr: "Description", de: "Beschreibung" },
  "stock.ask.wa": { en: "Ask on WhatsApp", fr: "Demander sur WhatsApp", de: "Per WhatsApp anfragen" },
  "stock.ask.email": { en: "Email enquiry", fr: "Demande par email", de: "E-Mail-Anfrage" },
  "stock.onrequest": { en: "On request", fr: "Sur demande", de: "Auf Anfrage" },
  "stock.specs.default": { en: "Full specifications available on request.", fr: "Spécifications complètes disponibles sur demande.", de: "Vollständige technische Daten auf Anfrage." },

  // ===== SELL PAGE =====
  "sell.title": { en: "Sell your equipment", fr: "Vendez votre matériel", de: "Verkaufen Sie Ihre Maschine" },
  "sell.subtitle": {
    en: "Get a free valuation. We handle the sale from A to Z.",
    fr: "Obtenez une estimation gratuite. Nous gérons la vente de A à Z.",
    de: "Kostenlose Bewertung erhalten. Wir kümmern uns um den Verkauf von A bis Z."
  },
  "sell.reassure.1": { en: "Free valuation, no commitment", fr: "Estimation gratuite, sans engagement", de: "Kostenlose Bewertung, unverbindlich" },
  "sell.reassure.2": { en: "Reply within 48h", fr: "Réponse sous 48h", de: "Antwort innerhalb von 48h" },
  "sell.reassure.3": { en: "Confidentiality guaranteed", fr: "Confidentialité garantie", de: "Vertraulichkeit garantiert" },
  "sell.field.name": { en: "Full name", fr: "Nom complet", de: "Vollständiger Name" },
  "sell.field.email": { en: "Email", fr: "Email", de: "E-Mail" },
  "sell.field.phone": { en: "Phone", fr: "Téléphone", de: "Telefon" },
  "sell.field.whatsapp": { en: "This is my WhatsApp number", fr: "C’est mon numéro WhatsApp", de: "Dies ist meine WhatsApp-Nummer" },
  "sell.field.country": { en: "Country", fr: "Pays", de: "Land" },
  "sell.field.eqtype": { en: "Equipment type", fr: "Type de matériel", de: "Maschinentyp" },
  "sell.field.brand": { en: "Brand", fr: "Marque", de: "Marke" },
  "sell.field.model": { en: "Model", fr: "Modèle", de: "Modell" },
  "sell.field.year": { en: "Year", fr: "Année", de: "Baujahr" },
  "sell.field.hours": { en: "Hours", fr: "Heures", de: "Betriebsstunden" },
  "sell.field.price": { en: "Asking price (€)", fr: "Prix demandé (€)", de: "Preisvorstellung (€)" },
  "sell.field.desc": { en: "Description", fr: "Description", de: "Beschreibung" },
  "sell.field.desc.placeholder": {
    en: "Describe your equipment: condition, options, service history...",
    fr: "Décrivez votre matériel : état, options, historique d’entretien...",
    de: "Beschreiben Sie Ihre Maschine: Zustand, Ausstattung, Wartungshistorie..."
  },
  "sell.field.photos": { en: "Photos (max 10)", fr: "Photos (max 10)", de: "Fotos (max. 10)" },
  "sell.field.photos.label": { en: "Click to upload or drag and drop", fr: "Cliquez pour uploader ou glissez-déposez", de: "Klicken Sie zum Hochladen oder ziehen Sie Dateien hierher" },
  "sell.field.contact": { en: "Preferred contact method", fr: "Mode de contact préféré", de: "Bevorzugte Kontaktmethode" },
  "sell.submit": { en: "Submit", fr: "Envoyer", de: "Absenden" },

  // ===== THANK YOU =====
  "thankyou.title": { en: "Request received", fr: "Demande reçue", de: "Anfrage erhalten" },
  "thankyou.desc": {
    en: "Thank you for your submission. Here’s what happens next:",
    fr: "Merci pour votre soumission. Voici les prochaines étapes :",
    de: "Vielen Dank für Ihre Anfrage. So geht es weiter:"
  },
  "thankyou.step1.title": { en: "We contact you", fr: "Nous vous contactons", de: "Wir kontaktieren Sie" },
  "thankyou.step1.desc": { en: "Within 48h for a quick chat.", fr: "Sous 48h pour un échange rapide.", de: "Innerhalb von 48h für ein kurzes Gespräch." },
  "thankyou.step2.title": { en: "Photos & verification", fr: "Photos et vérification", de: "Fotos und Prüfung" },
  "thankyou.step2.desc": { en: "Day 3–7: we organise the shoot and check.", fr: "Jour 3–7 : nous organisons les photos et le contrôle.", de: "Tag 3–7: Wir organisieren Fotos und Prüfung." },
  "thankyou.step3.title": { en: "Listed across Europe", fr: "Publié en Europe", de: "Europäisch gelistet" },
  "thankyou.step3.desc": { en: "Week 2: your machine is live on our network.", fr: "Semaine 2 : votre machine est en ligne sur notre réseau.", de: "Woche 2: Ihre Maschine ist in unserem Netzwerk online." },
  "thankyou.step4.title": { en: "Sale closed", fr: "Vente conclue", de: "Verkauf abgeschlossen" },
  "thankyou.step4.desc": { en: "We handle paperwork. You get paid.", fr: "Nous gérons les papiers. Vous êtes payé.", de: "Wir erledigen den Papierkram. Sie werden bezahlt." },
  "thankyou.back": { en: "Back to home", fr: "Retour à l’accueil", de: "Zurück zur Startseite" },

  // ===== ABOUT PAGE =====
  "about.title": { en: "About Breizh Agrimat", fr: "À propos de Breizh Agrimat", de: "Über Breizh Agrimat" },
  "about.subtitle": {
    en: "The story of a farmer’s son building Europe’s most trusted used equipment broker.",
    fr: "L’histoire d’un fils d’agriculteur qui construit le mandataire de confiance en Europe.",
    de: "Die Geschichte eines Bauernsohns, der Europas vertrauenswürdigsten Gebrauchtmaschinen-Makler aufbaut."
  },
  "about.ch1.title": { en: "Childhood on the farm", fr: "Une enfance à la ferme", de: "Kindheit auf dem Bauernhof" },
  "about.ch1.desc": {
    en: "Esteban Massue grew up in Treffendel, a small commune in Ille-et-Vilaine, Brittany. Surrounded by cattle and crops, he understood farming from the inside — the rhythms, the investments, the weight of a broken machine at harvest time.",
    fr: "Esteban Massue a grandi à Treffendel, une petite commune d’Ille-et-Vilaine, en Bretagne. Entouré de bétail et de cultures, il a compris l’agriculture de l’intérieur — les rythmes, les investissements, le poids d’une machine en panne au moment des récoltes.",
    de: "Esteban Massue wuchs in Treffendel auf, einer kleinen Gemeinde in Ille-et-Vilaine, Bretagne. Umgeben von Vieh und Feldern verstand er die Landwirtschaft von innen — die Rhythmen, die Investitionen, das Gewicht einer defekten Maschine zur Erntezeit."
  },
  "about.ch2.title": { en: "The first mandate", fr: "Le premier mandat", de: "Das erste Mandat" },
  "about.ch2.desc": {
    en: "At 21, Esteban launched Breizh Agrimat with a simple idea: act as a real estate agent for tractors. Take exclusive mandates, handle photos, calls, negotiations, and paperwork. Let the farmer focus on farming.",
    fr: "À 21 ans, Esteban a lancé Breizh Agrimat avec une idée simple : agir comme un agent immobilier pour tracteurs. Prendre des mandats exclusifs, gérer les photos, les appels, les négociations et les papiers. Laisser l’agriculteur se concentrer sur son métier.",
    de: "Mit 21 startete Esteban Breizh Agrimat mit einer einfachen Idee: als Immobilienmakler für Traktoren agieren. Exklusivmandate übernehmen, Fotos, Anrufe, Verhandlungen und Papierkram erledigen. Den Landwirt arbeiten lassen."
  },
  "about.ch3.title": { en: "The press takes notice", fr: "La presse s’intéresse", de: "Die Presse wird aufmerksam" },
  "about.ch3.desc": {
    en: "With 20–25 listings per month and over 1,000 machines sold, French agricultural media took notice. France Bleu, Réussir Machinisme, Matériel Agricole Info, and Terre-net Occasions all covered the young entrepreneur from Brittany.",
    fr: "Avec 20 à 25 annonces par mois et plus de 1 000 machines vendues, la presse agricole française s’est intéressée. France Bleu, Réussir Machinisme, Matériel Agricole Info et Terre-net Occasions ont tous parlé du jeune entrepreneur breton.",
    de: "Mit 20–25 Anzeigen pro Monat und über 1.000 verkauften Maschinen wurde die französische Fachpresse aufmerksam. France Bleu, Réussir Machinisme, Matériel Agricole Info und Terre-net Occasions berichteten über den jungen Unternehmer aus der Bretagne."
  },
  "about.ch4.title": { en: "Going European", fr: "Le virage européen", de: "Europäische Expansion" },
  "about.ch4.desc": {
    en: "In 2024, Esteban pivoted to a fully digital, pan-European model. Trilingual (French, English, German), 100% remote, with a network of verified inspectors across the continent. The mission: make cross-border used equipment trade safe and simple.",
    fr: "En 2024, Esteban a pivoté vers un modèle entièrement digital et pan-européen. Trilingue (français, anglais, allemand), 100 % à distance, avec un réseau d’experts vérifiés à travers le continent. La mission : rendre le commerce transfrontalier de matériel d’occasion sûr et simple.",
    de: "2024 stellte Esteban auf ein vollständig digitales, pan-europäisches Modell um. Dreisprachig (Französisch, Englisch, Deutsch), 100 % remote, mit einem Netzwerk verifizierter Inspektoren auf dem ganzen Kontinent. Die Mission: den grenzüberschreitenden Gebrauchtmaschinenhandel sicher und einfach zu machen."
  },
  "about.press.title": { en: "Press coverage", fr: "Couverture presse", de: "Presseberichterstattung" },
  "about.stats.machines": { en: "machines sold", fr: "machines vendues", de: "Maschinen verkauft" },
  "about.stats.countries": { en: "countries", fr: "pays", de: "Länder" },
  "about.stats.languages": { en: "languages", fr: "langues", de: "Sprachen" },

  // ===== CONTACT PAGE =====
  "contact.title": { en: "Let’s talk.", fr: "Parlons-en.", de: "Sprechen wir." },
  "contact.subtitle": {
    en: "Fastest reply on WhatsApp. Available Monday to Saturday.",
    fr: "Réponse la plus rapide sur WhatsApp. Disponible du lundi au samedi.",
    de: "Schnellste Antwort per WhatsApp. Montag bis Samstag erreichbar."
  },
  "contact.wa.title": { en: "WhatsApp", fr: "WhatsApp", de: "WhatsApp" },
  "contact.wa.desc": { en: "Fastest way to reach us.", fr: "Le moyen le plus rapide de nous joindre.", de: "Der schnellste Weg, uns zu erreichen." },
  "contact.wa.btn": { en: "Open WhatsApp", fr: "Ouvrir WhatsApp", de: "WhatsApp öffnen" },
  "contact.email.title": { en: "Email", fr: "Email", de: "E-Mail" },
  "contact.email.desc": { en: "For detailed enquiries and documents.", fr: "Pour les demandes détaillées et les documents.", de: "Für detaillierte Anfragen und Dokumente." },
  "contact.email.btn": { en: "Send an email", fr: "Envoyer un email", de: "E-Mail senden" },
  "contact.phone.title": { en: "Phone", fr: "Téléphone", de: "Telefon" },
  "contact.phone.desc": { en: "Same number as WhatsApp.", fr: "Même numéro que WhatsApp.", de: "Gleiche Nummer wie WhatsApp." },
  "contact.phone.btn": { en: "Call now", fr: "Appeler", de: "Jetzt anrufen" },
  "contact.hours": { en: "Opening hours", fr: "Horaires d’ouverture", de: "Öffnungszeiten" },
  "contact.form.title": { en: "Or send us a message", fr: "Ou envoyez-nous un message", de: "Oder senden Sie uns eine Nachricht" },
  "contact.form.name": { en: "Your name", fr: "Votre nom", de: "Ihr Name" },
  "contact.form.email": { en: "Your email", fr: "Votre email", de: "Ihre E-Mail" },
  "contact.form.message": { en: "Your message", fr: "Votre message", de: "Ihre Nachricht" },
  "contact.form.send": { en: "Send message", fr: "Envoyer le message", de: "Nachricht senden" },
};

// ===== I18N ENGINE =====
const I18N = {
  current: 'en',
  supported: ['en', 'fr', 'de'],

  init() {
    const stored = localStorage.getItem('ba-lang');
    if (stored && this.supported.includes(stored)) {
      this.current = stored;
    } else {
      const nav = (navigator.language || '').toLowerCase().slice(0, 2);
      if (this.supported.includes(nav)) this.current = nav;
    }
    this.apply();
    this.updateSwitcher();
    document.documentElement.lang = this.current;
  },

  setLang(lang) {
    if (!this.supported.includes(lang)) return;
    this.current = lang;
    localStorage.setItem('ba-lang', lang);
    this.apply();
    this.updateSwitcher();
    document.documentElement.lang = lang;
  },

  t(key) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[this.current] || entry.en || key;
  },

  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = this.t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = this.t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', this.t(el.dataset.i18nAria));
    });
  },

  updateSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.current);
    });
  }
};

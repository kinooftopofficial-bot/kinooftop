# 🎬 Kinoof Top V2 — Premium Cinema Website

> **Not an event. A platform.**  
> Control the Sound. Control the Vision.

---

## 🌐 Présentation du projet

**Kinoof Top** est une plateforme d'expériences live et digitales premium basée à Kinshasa (RDC). Le site V2 est une version multipage haut de gamme au design cinématographique, prête pour hébergement web.

---

## ✅ Fonctionnalités complètes

### Design & UX
- ✅ Design premium "luxe/cinéma" : scan lines, grain, cursor glow, animations reveal
- ✅ Navigation fixe avec effet scroll + menu mobile
- ✅ Loader cinématique avec barre de progression
- ✅ Animations scroll reveal sur tous les éléments
- ✅ Mouse glow interactif sur les cards
- ✅ Structure multipage complète (7 pages)

### SEO & Metadata
- ✅ Meta title + description optimisés pour chaque page
- ✅ Open Graph (og:title, og:description, og:image, og:url) sur toutes les pages
- ✅ Twitter Card sur la page d'accueil
- ✅ Schema.org JSON-LD : Organization (accueil) + MusicEvent (événement)
- ✅ Canonical URLs
- ✅ Robots meta
- ✅ Favicon SVG + Apple Touch Icon + theme-color

### Fonctionnalités
- ✅ Formulaire de contact connecté (→ table `contacts`)
- ✅ Formulaire de réservation connecté (→ table `reservations`)
- ✅ Formulaire de partenariat connecté (→ table `contacts`)
- ✅ Countdown dynamique jusqu'au 30 Avril 2026 19h00
- ✅ WhatsApp réel : **+243 815 334 097**
- ✅ Deck de présentation interactif (HTML → print PDF)
- ✅ Toast notifications pour les formulaires

---

## 📁 Structure des fichiers

```
kinoof-top/
├── index.html              → Accueil (hero + concept + formats + events + partners)
├── about.html              → À propos (identité, vision, pilliers, roadmap)
├── formats.html            → Formats KTS / KTV / KTX (détail + comparatif)
├── events.html             → Événements (Sessions #01 + countdown + réservation)
├── media.html              → Content & Media (gallery + types de contenu)
├── partnerships.html       → Partenariats (packs + formulaire + deck download)
├── contact.html            → Contact (formulaire + WhatsApp + réseaux)
├── css/
│   ├── style.css           → Styles principaux (variables, layout, composants)
│   └── components.css      → Composants supplémentaires (modal, tabs, deck box...)
├── js/
│   └── main.js             → Scripts (nav, reveal, countdown, formulaires, toast)
├── images/
│   ├── favicon.svg         → Favicon SVG gradient K
│   └── kinoof-top-logo.png → Logo généré (horizontal)
└── assets/
    └── kinoof-top-deck.pdf.html → Deck de présentation imprimable
```

---

## 🗂️ Pages et URLs

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/index.html` | Hero + concept + formats + next event + content + partners |
| À propos | `/about.html` | Identité, vision, piliers, roadmap |
| Formats | `/formats.html` | KTS, KTV, KTX détaillés + comparatif |
| Events | `/events.html` | Sessions #01, countdown, réservation |
| Content | `/media.html` | Gallery vidéo et photo, types de contenu |
| Partnerships | `/partnerships.html` | Packs Bronze/Silver/Gold/Exclusive, formulaire, deck |
| Contact | `/contact.html` | Formulaire, WhatsApp, email, réseaux |
| Deck | `/assets/kinoof-top-deck.pdf.html` | Deck 7 slides imprimable |

---

## 🗄️ Modèles de données (API Tables)

### Table `reservations`
| Champ | Type | Description |
|-------|------|-------------|
| `id` | text | UUID auto |
| `nom` | text | Nom du participant |
| `email` | text | Email |
| `telephone` | text | Téléphone |
| `places` | number | Nombre de places |
| `event` | text | Nom de l'événement |
| `status` | text | `pending` / `confirmed` / `cancelled` |

### Table `contacts`
| Champ | Type | Description |
|-------|------|-------------|
| `id` | text | UUID auto |
| `nom` | text | Nom complet |
| `email` | text | Email |
| `telephone` | text | Téléphone |
| `message` | rich_text | Message |
| `type` | text | `contact` / `partenariat` / `media` / `reservation` |
| `status` | text | `new` / `read` / `replied` |

---

## 🔌 API Endpoints utilisés

```javascript
// Créer une réservation
POST tables/reservations

// Créer un contact/partenariat
POST tables/contacts
```

---

## 📞 Contact réel intégré

- **WhatsApp** : [+243 815 334 097](https://wa.me/243815334097)
- **Email** : hello@kinooftop.com
- **WhatsApp pré-rempli réservation** : `https://wa.me/243815334097?text=Je%20veux%20réserver...`
- **WhatsApp pré-rempli partenariat** : `https://wa.me/243815334097?text=Je%20voudrais%20en%20savoir%20plus%20sur%20les%20partenariats...`

---

## 🎨 Design System

### Couleurs
- Background : `#050709`
- Blue : `#3aa0ff`
- Orange : `#ff7a1a`
- Gradient : `linear-gradient(130deg, #3aa0ff, #ff7a1a)`
- Text : `#f0f4fb`
- Muted : `#8494ab`

### Typographie
- Font : **Inter** (Google Fonts) — weights 300–900

### Effets cinématographiques
- Scan lines subtiles (CSS)
- Film grain (SVG filter)
- Cursor glow (JS)
- Loader animé
- Scroll reveal (IntersectionObserver)
- Card interactive mouse glow

---

## 🚀 Prêt pour déploiement

- ✅ Aucune dépendance serveur
- ✅ Tous les CDN en HTTPS
- ✅ Images via Unsplash CDN (peuvent être remplacées par les vraies photos)
- ✅ Formulaires connectés via l'API Tables
- ✅ Compatible avec tous hébergeurs statiques (Netlify, Vercel, GitHub Pages, cPanel...)

---

## 📋 À faire / Recommandations

### Priorité haute
- [ ] Remplacer les images Unsplash par les vraies photos de Kinoof Top
- [ ] Ajouter la vidéo hero (mp4 autoplay) si disponible
- [ ] Mettre à jour les handles réseaux sociaux (Instagram, TikTok, YouTube, Facebook)
- [ ] Créer l'OG image réelle (`images/og-image.jpg` 1200×630px)

### Priorité moyenne
- [ ] Ajouter les vrais logos partenaires dans la section Partners
- [ ] Remplacer le logo Kinoof Top dans la nav par la vraie image
- [ ] Configurer le domaine `kinooftop.com` avec HTTPS
- [ ] Ajouter Google Analytics ou Plausible Analytics

### Priorité basse
- [ ] Créer le vrai PDF deck (design graphique)
- [ ] Ajouter une galerie photo post-événement
- [ ] Intégrer un lecteur vidéo pour les aftermovies (Vimeo/YouTube embed)
- [ ] Page 404 personnalisée

---

## 📊 Stack technique

- **HTML5** sémantique
- **CSS3** custom properties, grid, flexbox
- **JavaScript** vanilla ES6+ (pas de framework)
- **Font Awesome 6.5** (icons CDN)
- **Google Fonts** Inter
- **API Tables** (formulaires)
- **Unsplash** (images temporaires)

---

*© 2026 Kinoof Top — Designed with precision.*

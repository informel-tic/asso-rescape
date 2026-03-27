# 📋 CAHIER DES CHARGES COMPLET — SITE WEB ASSOCIATION RESCAPE
**Document de spécifications techniques à destination d'un agent de code IA**
**Version : 1.0 — Février 2026**

---

## 0. CONTEXTE & MISSION DU PROJET

Créer le site vitrine officiel de l'association **Rescape** (orthographe exacte, jamais "rescapé"), association loi 1901 de lutte anti-gaspillage solidaire basée à Aniche (59580). Le site doit raconter une histoire humaine forte, mobiliser des partenaires et donateurs, afficher les horaires/infos pratiques, et permettre à la présidente Vanessa Delarue de gérer elle-même publications et événements via un back-office simple.

---

## 1. IDENTITÉ DE L'ASSOCIATION

| Champ | Valeur |
|---|---|
| Nom | **Rescape** |
| Sous-titre | Lutte Anti Gaspillage Solidaire |
| Adresse | 4 Place Fogt, 59580 Aniche |
| Téléphone | 06.44.73.86.36 |
| Email | delaruevanessa48@gmail.com |
| Présidente | Vanessa Delarue |
| Vice-Président | Nicolas Delarue |
| Trésorière | Nadia Bennaceur |
| Secrétaire | Sandrine Laruelle |

**Horaires d'ouverture :**
- Lundi : 9h–11h / 14h–16h
- Mardi : 9h–11h / 14h–16h
- Jeudi : 9h–11h / 14h–16h
- Vendredi : 9h–11h / 14h–16h
- Samedi (semaines paires uniquement) : 10h–12h / 14h–17h

---

## 2. CHARTE GRAPHIQUE

### 2.1 Palette de couleurs (extraite des visuels fournis)

```css
:root {
  --color-primary:     #C85A1E;  /* Orange brique chaud — couleur dominante */
  --color-secondary:   #E8935A;  /* Orange doux — accents, hover */
  --color-background:  #F5ECD7;  /* Beige parchemin — fond général */
  --color-surface:     #FDFAF3;  /* Blanc cassé — cartes, modales */
  --color-dark:        #2C1A0E;  /* Brun profond — textes principaux */
  --color-accent:      #D4A853;  /* Or chaud — highlights, CTA secondaires */
  --color-text-light:  #7A5C3E;  /* Brun moyen — textes secondaires */
  --color-success:     #5A8A4A;  /* Vert naturel — confirmations */
}
```

### 2.2 Typographies

**Priorité 1 — Google Fonts (gratuites, proches de l'identité visuelle existante) :**

| Usage | Font | Poids | Style |
|---|---|---|---|
| Logo / Titre principal H1 | **"Pacifico"** ou **"Lobster Two"** | 400 | Cursive groovy rétro — reproduit l'esprit du logo manuscrit |
| Titres H2 / H3 | **"Playfair Display"** | 700 | Serif élégant avec caractère |
| Corps de texte / narratif | **"Lato"** ou **"Inter"** | 400 / 300 | Lisibilité maximale mobile |
| Accroches / Labels | **"Nunito"** | 600 | Arrondi, chaleureux |
| Chiffres / Stats | **"Bebas Neue"** | 400 | Impact chiffré |

```html
<!-- Import Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Playfair+Display:wght@700&family=Lato:wght@300;400;700&family=Nunito:wght@600;800&family=Bebas+Neue&display=swap" rel="stylesheet">
```

### 2.3 Iconographie & Illustrations

- Mascotte : sac de courses animé/kawaii (déjà présent dans la charte visuelle) — utiliser comme élément récurrent décoratif en SVG animé
- Icônes : **Heroicons** ou **Phosphor Icons** (open source)
- Style illustratif : chaud, organique, traces légèrement irrégulières (éviter le trop propre/corporate)
- Emojis autorisés dans les textes éditoriaux (🌱 ♻️ 💛 🤝)

### 2.4 Effets visuels autorisés

- Texture papier/parchemin en overlay SVG sur les fonds (opacity 0.08)
- Ombres douces `box-shadow: 0 4px 20px rgba(44,26,14,0.10)`
- Border-radius généreux : 12px–20px sur les cartes
- Animations : légères, purposeful — pas de surcharge
- Fond section alternant beige clair et blanc cassé

---

## 3. ARCHITECTURE DU SITE (PAGES & NAVIGATION)

### Navigation principale (sticky header mobile-first)

```
[Logo Rescape]  [Accueil] [Notre Histoire] [Nos Actions] [Actualités] [Événements] [Partenaires & Dons] [Contact]
[Burger menu sur mobile]
```

### 3.1 PAGE ACCUEIL (`/`)

#### Section Hero

- **Fond :** couleur beige parchemin avec texture légère
- **Animation d'entrée :** mascotte sac de courses qui "rebondit" doucement à l'arrivée (CSS keyframes, `animation: bounce 2s infinite alternate`)
- **Accroche principale H1 :** `"Ensemble, rien ne se perd. Tout se partage."` (en Pacifico/Lobster Two, couleur brique)
- **Sous-titre :** `"Lutte Anti Gaspillage Solidaire — Aniche (59580)"`
- **2 boutons CTA :**
  - `[Découvrir notre histoire]` → ancre `#histoire` (fond orange brique, texte blanc)
  - `[Faire un don ou déposer]` → ancre `#depot` (bordure orange, fond transparent)
- **Badge animé :** petit badge tournant lentement `"Ouvert à tous ♻️"` (CSS rotation lente)

#### Section "En chiffres" (statistiques animées au scroll)

Compteur JS qui s'anime quand la section entre dans le viewport :
```
[Années d'existence]   [Personnes aidées]   [Kg de gaspillage évités]   [Partenaires]
      X                      X                        X                       X
```
*(Valeurs à renseigner par Vanessa via back-office — champs éditables)*

#### Section "Ce que nous faisons" (3 colonnes sur desktop, scroll horizontal sur mobile)

Icône + titre + courte description pour chaque action :
- 🧺 **Armoire solidaire** — Déposez, reprenez librement
- 🌱 **Potager du partage** — Jardin collectif anti-gaspillage
- 🎄 **Événements & ateliers** — Noël solidaire, sorties scolaires…
- 🤝 **Aide alimentaire** — Sacs de nourriture pour les familles en difficulté

#### Section "Horaires & Accès" (fond brique doux)

Widget d'horaires avec jour actuel mis en surbrillance automatiquement (JS `new Date().getDay()`).
Bouton `[Voir sur Google Maps]` lien vers l'adresse.
Samedi pair clairement indiqué avec tooltip explicatif.

#### Section "Actualité récente" (3 derniers articles depuis le back-office)

#### Footer

Coordonnées complètes, liens réseaux sociaux, QR Code généré dynamiquement vers le site, crédits bureau, lien vers l'admin.

---

### 3.2 PAGE "NOTRE HISTOIRE" (`/histoire`)

Cette page est le **cœur émotionnel du site**. Elle raconte l'histoire de Vanessa sous forme de **narrative scrollytelling**.

#### Structure narrative (timeline verticale animée au scroll)

Chaque étape apparaît en `fadeInUp` au scroll (Intersection Observer API) :

---

**INTRO — Photo ou illustration + texte accroche :**
> *"Tout a commencé par un masque cousu à la main."*

Paragraphe introductif : Vanessa a perdu ses parents et son fils sur 3 années consécutives. Quand le COVID est arrivé, son mari lui a cousu un masque parce qu'elle avait peur de perdre encore. Ce geste d'amour a tout déclenché.

---

**ÉTAPE 1 🧵 — La chaîne des masques (COVID)**
> Titre : `"Un masque, puis des milliers"`
> Texte narratif : La chaîne de solidarité autour des masques commence. La communauté répond. Des rouleaux de tissu élastique arrivent sur la palette.

---

**ÉTAPE 2 🍞 — Le premier sac de nourriture**
> Titre : `"Un voisin avait faim"`
> Un monsieur passe. Il a des soucis de nourriture. Le lendemain, un sac de nourriture apparaît sur la palette. L'entraide prend une autre dimension.

---

**ÉTAPE 3 📦 — La caisse, puis l'armoire**
> Titre : `"D'une caisse sur une chaise à une armoire sur le trottoir"`
> L'ampleur grandit. Une caisse. Puis une armoire. Puis une plus grande armoire. Le trottoir devient un espace de partage.

---

**ÉTAPE 4 🏛️ — La naissance de Rescape**
> Titre : `"Du trottoir au local, une association naît"`
> Pour être dans les règles et ne plus déranger les voisins, l'association est créée officiellement. Un local est trouvé. Rescape existe.

---

**ÉTAPE 5 🌱 — Aujourd'hui**
> Titre : `"Ce que nous sommes devenus"`
> Les actions : armoire solidaire, potager, événements scolaires, Noël solidaire, aide alimentaire, lutte contre le gaspillage. Ouvert à tous, sans condition.

---

**Citation finale (style pull-quote typographié) :**
> *"Nous avons tenu à rester ouverts à tous — et nous le resterons."*
> — Vanessa Delarue, Présidente

---

**Portrait section "Vanessa & l'équipe" :**
Bloc avec photo de l'équipe (upload possible depuis le back-office), présentation de chaque membre du bureau avec leur rôle et une phrase personnelle (éditables en back-office).

---

### 3.3 PAGE "NOS ACTIONS" (`/actions`)

Grille de cartes (2 colonnes desktop, 1 colonne mobile) avec :
- Image/illustration
- Titre de l'action
- Description
- Statut (En cours / Saisonnier / Ponctuel)

Actions à pré-remplir :
1. Armoire solidaire (permanente)
2. Sacs alimentaires d'urgence
3. Potager jardin du partage
4. Événements scolaires
5. Noël solidaire
6. Ateliers et animations

Section basse : **"Vous voulez nous aider à agir ?"** → CTA vers page Partenaires & Dons.

---

### 3.4 PAGE "ACTUALITÉS" (`/actualites`)

Liste des articles publiés depuis le back-office.
- Filtres par catégorie (tags) : Action, Événement, Partenariat, Témoignage
- Pagination (6 articles par page)
- Chaque article : image de couverture, titre, date, extrait, bouton `[Lire la suite]`
- Page article individuelle avec partage réseaux sociaux

---

### 3.5 PAGE "ÉVÉNEMENTS" (`/evenements`)

Calendrier interactif (librairie **FullCalendar.js**, open source) + vue liste.
- Événements créés depuis le back-office
- Champ : titre, date/heure, lieu, description, lien inscription (optionnel)
- Filtre : à venir / passés
- Affichage "prochain événement" en Hero de la page

---

### 3.6 PAGE "PARTENAIRES & DONS" (`/soutenir`)

#### Section 1 — Appel aux dons

**Titre :** `"Chaque geste compte"`

Texte : Rescape fonctionne grâce à la générosité collective. Vos dons permettent de maintenir le local, financer les actions, et rester ouverts à tous.

**Formes de soutien :**
- 💰 Don financier (bouton PayPal ou lien HelloAsso — à configurer)
- 📦 Dépôt de produits alimentaires non périssables
- 👕 Dépôt de vêtements / objets en bon état
- 🤲 Bénévolat (formulaire de contact dédié)

> ⚠️ **Important :** Préciser clairement que **les dépôts physiques se font UNIQUEMENT à l'adresse : 4 Place Fogt, 59580 Aniche** pendant les horaires d'ouverture. Pas d'enlèvement à domicile.

#### Section 2 — Devenir partenaire

Formulaire partenariat (voir module formulaires).

#### Section 3 — Nos partenaires actuels (logos gérés depuis le back-office)

Carrousel de logos partenaires (auto-scroll lent, pause au hover).

---

### 3.7 PAGE "CONTACT" (`/contact`)

- Formulaire de contact général
- Bloc d'informations : adresse, téléphone, email, horaires
- Carte Google Maps embarquée (iframe) centrée sur 4 Place Fogt, Aniche
- Rappel dépôts physiques uniquement

---

## 4. MODULES & FONCTIONNALITÉS DÉTAILLÉES

### 4.1 Formulaires

#### Formulaire de contact général
```
Champs :
- Nom Prénom (required)
- Email (required, validation)
- Téléphone (optionnel)
- Objet : [Renseignement / Bénévolat / Partenariat / Dépôt / Autre] (select)
- Message (textarea, min 20 chars)
- Consentement RGPD (checkbox required)
[Envoyer]
```
**Action :** Envoi email vers delaruevanessa48@gmail.com + confirmation auto à l'expéditeur.

#### Formulaire devenir partenaire
```
Champs :
- Nom de la structure / entreprise (required)
- Nom du contact (required)
- Email (required)
- Téléphone
- Type de structure : [Entreprise / Association / Collectivité / Particulier / Autre]
- Type de partenariat souhaité : [Don financier / Don matériel / Mise à disposition / Compétences / Autre]
- Description du partenariat envisagé (textarea)
- Consentement RGPD (checkbox required)
[Envoyer ma demande de partenariat]
```

#### Formulaire bénévolat
```
- Nom Prénom
- Email
- Téléphone
- Disponibilités (jours / horaires)
- Compétences ou envie de contribuer (textarea)
- Consentement RGPD
```

#### Formulaire newsletter (simple, pied de page)
```
- Email
- [S'abonner aux actualités]
```

---

### 4.2 Animations & Micro-interactions

Toutes les animations doivent respecter `prefers-reduced-motion` :

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

| Élément | Animation |
|---|---|
| Mascotte hero | `bounce` CSS infini, amplitude 8px, 2s |
| Chiffres stats | CountUp JS au scroll (Intersection Observer) |
| Timeline histoire | `fadeInUp` décalé au scroll (stagger 150ms) |
| Cards actions | `scaleUp` légère au hover (scale 1.03) |
| Navigation sticky | Fond devient solide avec `box-shadow` au scroll |
| Boutons CTA | Légère translation Y -2px au hover + transition couleur |
| Badge "Ouvert à tous" | `rotate` lent 360° en 20s infini |
| Logos partenaires | Défilement horizontal auto (`scroll-snap`) |

---

### 4.3 Accessibilité (WCAG 2.1 AA minimum)

- Contraste texte/fond minimum 4.5:1 vérifié sur toute la palette
- Tous les formulaires avec `label` associé
- Navigation clavier complète (focus visible stylisé)
- `alt` text sur toutes les images
- `aria-label` sur les boutons icônes
- Landmarks HTML5 sémantiques (`header`, `main`, `nav`, `footer`, `section`, `article`)
- Skip link `"Aller au contenu principal"` en premier élément du DOM
- Langue déclarée `<html lang="fr">`

---

### 4.4 SEO

- Meta title + description uniques par page
- Schema.org JSON-LD pour l'association (`LocalBusiness` / `NGO`)
- Open Graph + Twitter Card pour partage réseaux sociaux
- Sitemap XML auto-généré
- `robots.txt`
- Balises Hn hiérarchisées (un seul H1 par page)
- Lazy loading images (`loading="lazy"`)
- Core Web Vitals : LCP < 2.5s, CLS < 0.1, FID < 100ms

---

## 5. BACK-OFFICE (CMS) — INTERFACE D'ADMINISTRATION

### 5.1 Accès & Authentification

- URL : `/admin` (non indexée par robots.txt)
- Authentification : email + mot de passe (bcrypt)
- Session sécurisée (JWT ou session cookie httpOnly)
- Protection CSRF sur tous les formulaires admin
- Bouton "Mot de passe oublié" avec email de réinitialisation
- Compte initial : `delaruevanessa48@gmail.com`

### 5.2 Dashboard

Écran d'accueil après connexion :
- Résumé : nombre d'articles, événements à venir, messages non lus
- Boutons rapides : `[+ Nouvel article]` `[+ Nouvel événement]` `[Voir les messages]`
- Derniers messages reçus (liste avec statut lu/non lu)

### 5.3 Modules gérables

#### Articles / Actualités
- Liste des articles avec recherche et filtre par catégorie
- Formulaire de création/édition :
  - Titre
  - Image de couverture (upload drag & drop)
  - Catégorie (select + création à la volée)
  - Contenu : **éditeur WYSIWYG** (recommandé : **TipTap** ou **Quill.js** — interface simple comme Word)
  - Statut : Brouillon / Publié
  - Date de publication (programmation possible)
- Prévisualisation avant publication
- Suppression avec confirmation

#### Événements
- Liste des événements (passés / à venir)
- Formulaire création/édition :
  - Titre
  - Date et heure de début / fin
  - Lieu (texte libre)
  - Description (éditeur riche)
  - Image
  - Lien d'inscription externe (optionnel)
  - Statut : Brouillon / Publié / Annulé
- Affichage automatique sur le calendrier front

#### Pages statiques éditables
- Section "En chiffres" : 4 champs numériques + labels éditables
- Section "Équipe" : photo + nom + rôle + citation pour chaque membre du bureau
- Page "À propos" : texte riche éditable
- Horaires : formulaire structuré pour mettre à jour les horaires

#### Partenaires
- Gestion des logos partenaires : upload, nom, lien URL, ordre d'affichage
- Actif / Inactif

#### Messages reçus
- Liste de tous les messages des formulaires
- Marquer comme lu / Archiver
- Répondre par email (lien `mailto:` pré-rempli)
- Supprimer

#### Newsletter (simple)
- Liste des emails inscrits avec date d'inscription
- Export CSV
- Désinscription manuelle possible

### 5.4 Médias
- Gestionnaire de fichiers basique : liste des images uploadées, suppression

### 5.5 Sécurité back-office
- Rate limiting sur la page de login (5 tentatives max, blocage 15min)
- Logs des connexions (date, IP)
- HTTPS obligatoire

---

## 6. STACK TECHNIQUE RECOMMANDÉE

### Option A — Stack légère (recommandée pour ce projet)

| Couche | Technologie |
|---|---|
| Front-end | HTML5 / CSS3 (custom, pas de framework lourd) + Vanilla JS |
| Animations | CSS Keyframes + Intersection Observer API |
| Calendrier | FullCalendar.js (open source) |
| Éditeur WYSIWYG | TipTap (open source) |
| Back-end | **Node.js + Express** |
| Base de données | **SQLite** (simple, pas de serveur séparé) ou **PostgreSQL** |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| Emails | Nodemailer (SMTP Gmail) |
| Hébergement | **Railway** ou **Render** (gratuit/cheap, simple à déployer) |
| Fichiers/Images | Stockage local ou Cloudinary (gratuit tier) |

### Option B — CMS headless (si préférence pour back-office clé en main)

| Couche | Technologie |
|---|---|
| CMS | **Directus** (self-hosted, open source, interface admin belle et simple) |
| Front-end | Next.js (SSG/SSR) |
| DB | PostgreSQL |
| Hébergement | Render / Railway |

---

## 7. RESPONSIVE & MOBILE-FIRST

### Breakpoints

```css
/* Mobile first */
/* xs : 0–479px */
/* sm : 480–767px */
/* md : 768–1023px */
/* lg : 1024–1279px */
/* xl : 1280px+ */
```

### Spécifications mobiles critiques

- Navigation : burger menu avec drawer latéral (animation slide-in depuis la droite)
- Hero : mascotte repositionnée au-dessus du texte sur mobile
- Timeline histoire : colonne unique, ligne verticale à gauche
- Stats : 2 colonnes sur mobile (2x2)
- Cards actions : une seule colonne, swipeable (touch scroll natif)
- Formulaires : champs 100% largeur, bouton submit 100% largeur
- Footer : empilé en colonnes sur mobile
- Taille de police minimum body : 16px
- Boutons CTA : minimum 48x48px (tap target)
- Téléphone cliquable : `<a href="tel:0644738636">06.44.73.86.36</a>`
- Email cliquable : `<a href="mailto:delaruevanessa48@gmail.com">`

---

## 8. PERFORMANCE

- Images : format WebP avec fallback JPG, lazy loading
- Fonts : `font-display: swap`, preconnect Google Fonts
- CSS critique inliné dans `<head>`
- JS non bloquant (defer / async)
- Pas de dépendances inutiles
- Objectif Lighthouse : Performance > 85, Accessibilité > 90, SEO > 90

---

## 9. RGPD & LÉGAL

- **Bannière de consentement cookies** (solution légère : Cookieyes free tier ou custom)
- **Politique de confidentialité** page dédiée (`/confidentialite`) — template conforme RGPD à personnaliser
- **Mentions légales** page dédiée (`/mentions-legales`) avec :
  - Éditeur du site : Association Rescape
  - Directrice de publication : Vanessa Delarue
  - Hébergeur : à compléter selon choix hosting
- Données des formulaires : stockées en base, supprimables depuis l'admin, droit d'accès/suppression sur demande
- Pas de tracking tiers sans consentement (pas de Google Analytics sans opt-in)
- Alternative RGPD : **Plausible** ou **Umami** (analytics privacy-first, sans cookies)

---

## 10. CONTENU ÉDITORIAL DE DÉPART (à pré-intégrer)

### Texte narratif "À propos" (page histoire)

> **L'étincelle**
> Tout a commencé pendant le COVID. Vanessa avait peur — peur de perdre encore, après avoir dit adieu à ses parents et à son fils sur trois années qui se sont suivies comme un poids trop lourd. Son mari lui a cousu un masque. Un seul masque. Parce qu'il l'aimait et qu'il voulait la protéger.
>
> **La chaîne**
> Ce masque cousu à la main est devenu une chaîne. Une palette est arrivée avec du tissu élastique. Les masques se sont multipliés. La solidarité, aussi.
>
> **La nourriture**
> Un jour, un monsieur passe. Il a des soucis de nourriture. Le lendemain, un sac apparaît sur la palette. Puis une caisse sur une chaise. Puis une armoire sur le trottoir.
>
> **L'association**
> Il a fallu structurer pour ne pas déranger. Du trottoir, Rescape est passée à un local. De l'action citoyenne, Rescape est devenue une association officielle. Mais l'âme n'a pas changé.
>
> **Aujourd'hui**
> Rescape lutte contre le gaspillage, crée du lien, organise des événements, fait pousser un potager. Et reste ouverte à tous — pour déposer, retirer, discuter, ou simplement être accueillie, dans la bonne humeur.

### Accroche page partenaires

> *"Rescape existe grâce aux gestes de chacun. Un partenariat, c'est rejoindre une histoire humaine qui continue de s'écrire. Ensemble, nous pouvons faire encore plus."*

---

## 11. CHECKLIST DE LIVRAISON

- [ ] Toutes les pages front développées et responsive
- [ ] Back-office accessible et fonctionnel
- [ ] Formulaires fonctionnels avec envoi email
- [ ] Horaires avec mise en surbrillance du jour courant
- [ ] Samedi pair calculé automatiquement
- [ ] Animations respectant `prefers-reduced-motion`
- [ ] HTTPS actif en production
- [ ] Score Lighthouse validé
- [ ] Politique de confidentialité et mentions légales présentes
- [ ] Bannière RGPD fonctionnelle
- [ ] Téléphone et email cliquables sur mobile
- [ ] QR Code généré vers l'URL du site
- [ ] Documentation admin remise à Vanessa (PDF simple, pas technique)
- [ ] Formation/tutoriel vidéo courte pour la prise en main du back-office

---

## 12. NOTES IMPORTANTES POUR L'AGENT IA

1. **Orthographe du nom :** Toujours écrire `Rescape` (R majuscule, jamais "rescapé" ni "ReScapé")
2. **Ton :** Chaleureux, humain, accessible — jamais corporate ni froid
3. **Dépôts physiques :** Toujours préciser que les dépôts se font UNIQUEMENT au local (4 Place Fogt, Aniche) pendant les horaires d'ouverture
4. **Samedi pair :** Mentionner systématiquement "Samedi des semaines paires" pour éviter les confusions
5. **Mascotte :** Le sac de courses kawaii est l'identité visuelle de l'association — l'utiliser comme fil rouge sur tout le site
6. **Priorité à la simplicité du back-office :** Vanessa n'est pas technicienne — l'interface admin doit être aussi simple qu'un réseau social, avec des boutons clairs et un éditeur WYSIWYG intuitif
7. **Mobile first absolu :** La majorité des visiteurs et de Vanessa elle-même utilisera un smartphone
8. **Émotion avant tout :** La page "Notre Histoire" est la plus importante du site — elle doit émouvoir avant d'informer

---

*Document produit par Claude (Anthropic) — Février 2026*
*À transmettre tel quel à l'agent de code IA pour développement*

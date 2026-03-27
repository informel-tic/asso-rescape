# Audit et Plan d'implémentation : SaaS Rescape & Gestion du site

Ce document détaille l'audit complet du site actuel et planifie l'implémentation de la nouvelle architecture orientée SaaS pour le portail d'administration sécurisé, ainsi que les modifications requises pour la partie publique.

## 1. Audit de l'existant (Ce qui doit / peut être modifié)

### 1.1 Partie Publique (Front-Office)
*   **Page d'accueil :**
    *   **Statistiques (Anti-gaspi, partenaires, personnes aidées, années d'existence) :** Modifiables via le modèle `Stat` existant.
    *   **Cartes "Ce que nous faisons" (Actions) :** Modifiables via le modèle `Action`.
        *   💡 *Évolution UI requise* : Ajouter une modale au survol (desktop) ou au toucher (mobile) pour afficher les détails (images, périodicité).
    *   **Réseaux Sociaux (Instagram, Facebook) :** Modifiables via le modèle `SocialLink`.
*   **Page "Notre Histoire" :**
    *   **Timeline / Phases :** Modifiables via le modèle `TimelineEntry`.
    *   **Équipe :** Modifiables via le modèle `TeamMember` (photos, noms, rôles et ordre).
*   **Page "Actualités" :**
    *   Modifiable dynamiquement via le modèle `Article`.
*   **Calendrier & Événements :**
    *   **Fusion calendaire :** Le calendrier public (et privé) doit centraliser plusieurs flux : les événements de l'association (`Event`), les actions partenaires, les retraits/dépôts de dons (`Appointment`), et les nouveaux dons alimentaires (`Donation`).
    *   **Mise en avant des partenaires :** Nécessité d'ajouter un système (ex: `isHighlighted: true`) sur le modèle `Partner` pour les faire remonter sur le site public.

### 1.2 Back-Office actuel (Prisma & UI)
*   L'architecture de base en base de données gère déjà les Entités, Utilisateurs, Evénements, et Comptabilité (`AccountingEntry`).
*   Il manque la gestion explicite d'accès granulaires au menu Dashboard et au changement visuel de branding selon le rôle.
*   Il manque la notion de "carte annuelle (15€)" liée aux adhérents (nouveau modèle `Membership` ou ajout au modèle `User`).

---

## 2. Planification et Architecture : Le Portail SaaS Rescape

L'objectif est de transformer le back-office actuel en un véritable portail SaaS, visuellement distinct du site vitrine, avec des fonctionnalités restreintes et ciblées selon le rôle de l'utilisateur connecté.

### 2.1 Refonte des Rôles et Droits d'Accès
Voici la nouvelle structure de rôles et la marque associée (Logo/Texte dynamique) :

1.  **SUPER_ADMIN (Direction / Vous)**
    *   **Branding :** "Rescape Super Admin" ou "Rescape Direction"
    *   **Droits :** Accès total. Gestion des utilisateurs, des données comptables, modification profonde du site (Stats, Actions, Timeline, Équipe, Réseaux sociaux).
2.  **DIRECTION / TRESORERIE**
    *   **Branding :** "Rescape Direction"
    *   **Droits :** Toutes les gestions liées à l'administratif, au suivi des adhérents, et à la comptabilité (recettes/dépenses).
3.  **BENEVOLE**
    *   **Branding :** "Rescape Bénévole"
    *   **Droits :** Consultation des plannings (Calendrier global des actions), participation aux événements, dépôts/collectes (`Appointments`), édition d'articles/événements si permis.
4.  **PARTENAIRE**
    *   **Branding :** "Rescape Partenaire"
    *   **Droits :** Portail restreint à leur entreprise. Outil de communication avec la direction, déclaration des dons alimentaires, et vision du suivi avec l'association.

### 2.2 Design System : Orientation SaaS
*   **Identité Visuelle :** Le portail SaaS n'utilisera pas la charte chaleureuse et texturée du site public. Il adoptera une esthétique moderne et épurée (Style Tailwind UI / Dashboard premium).
*   **Couleurs :** Fonds gris très clairs (`bg-slate-50`), composants blancs (`bg-white`), bordures subtiles (`border-slate-200`). Utilisation de couleurs accents strictes (Bleu, Vert Émeraude, Rouge pour les états).
*   **Navigation dynamique :** La Sidebar / Navbar s'adapte strictement au rôle. Un partenaire ne verra pas l'onglet "Comptabilité" ou "Utilisateurs".
*   **Logo :** Le texte de l'en-tête (en haut à gauche de la sidebar/navbar) reflétera le statut, par exemple :
    `<div className="logo">RESCAPE <span className="opacity-50 font-light">Partenaire</span></div>`

### 2.3 Fonctionnalités Métier à Implémenter (Le Carnet de Suivi)
1.  **Gestion des Adhérents & Cartes Annuelles :**
    *   **DB Modification :** Création d'une table `Membership` (userId, numeroCarte, annee, estPaye).
    *   **SaaS UI :** Onglet "Adhérents" pour suivre les paiements de 15€/an (facultatif).
2.  **Suivi Financier (Recettes et Dons) :**
    *   Utilisation complète de la table `AccountingEntry`.
    *   Tableaux de bord (Dashboard) affichant des KPIs rapides (Total dons de ce mois, total recettes, stats partenaires).
3.  **Communications Partenaires :**
    *   UI de messagerie privée ou de tickets (`Message` ou nouveau modèle `Ticket`) permettant un échange direct entre Direction et Partenaires.
4.  **Le Mega-Calendrier métier :**
    *   Un composant SaaS regroupant : Vue mensuelle/hebdomadaire.
    *   Codes couleurs selon le type : Retrait (rouge), Dépôt (vert), Événement public (bleu), Action conjointe partenaire (violet).

---

## 3. Étapes d'Implémentation

### Étape 1 : Refonte de la base de données (Schéma)
*   Ajout de la gestion d'Adhesion (Carte annuelle de 15€).
*   Ajout du boolean `isHighlighted: Boolean @default(false)` sur `Partner`.
*   Ajustement des relations d'utilisateurs pour mieux lier le `Partner` avec un `User` de rôle Partenaire (si ce n'est pas déjà le cas).

### Étape 2 : Design & Layout du SaaS back-office
*   Mise à jour de `src/app/admin/layout.tsx` pour inclure la logique de rôles complète.
*   Changement du Header/Logo dynamique (ex: `Rescape {Role}`).
*   Refonte du design en profondeur pour lui donner cet aspect "Premium SaaS" distinct de la vitrine.

### Étape 3 : Fonctionnalités SaaS pour Super Admin / Direction
*   Pages de gestion UI : Paramètres poussés (Stats, Liens réseaux, Timeline).
*   Pages "Carnet de Suivi" : Tableau de bord des recettes, comptabilité améliorée.
*   Page "Adhérents" (Gestion des cotisations).

### Étape 4 : Portail Partenaire et Fonctions Bénévoles
*   Vue "Partenaire" restreinte : Interface de don et vue calendrier orientée activité.
*   Modification de la Sidebar/Navigation pour filtrer les accès.

### Étape 5 : Mise à Jour du Site Public (Front-End)
*   Modifications des cartes "Actions" avec la modale au survol/toucher.
*   Agglomération des données (Events, Appointments) dans un composant calendrier UI public si nécessaire, visuellement élégant.
*   Mise en avant dynamique des partenaires (ceux taggés `isHighlighted`).

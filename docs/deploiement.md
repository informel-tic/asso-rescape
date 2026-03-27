# Documentation de Déploiement — Rescape

Ce document décrit les étapes nécessaires pour mettre en production le projet.

## 1. Environnement (Fichier .env)
Copiez `.env.example` vers `.env` sur votre serveur et renseignez les valeurs suivantes :
- `DATABASE_URL` : Votre URL de connexion PostgreSQL (ex: `postgresql://user:pass@host:5432/db`).
- `AUTH_SECRET` : Une clé aléatoire forte (ex: via `openssl rand -base64 32`).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` : Vos identifiants pour l'envoi d'emails (obligatoire pour les formulaires de contact).

## 2. Migration de la Base de Données
### Passage de SQLite à PostgreSQL
1. Assurez-vous d'avoir une instance PostgreSQL vide.
2. Dans `.env`, passez `DB_PROVIDER=postgresql`.
3. Lancez la synchronisation :
   ```bash
   npx prisma db push
   ```
   *Note : Les données existantes dans dev.db ne sont pas migrées automatiquement. Un export/import JSON ou SQL est nécessaire si vous souhaitez conserver les tests.*

## 3. Build & Lancement
L'application est optimisée pour Next.js (déploiement idéal sur Vercel ou via Docker).

```bash
npm install --legacy-peer-deps
npm run build
npm run start
```

## 4. Maintenance
- **Vérification des logs :** Surveillez les logs pour les erreurs d'envoi SMTP (Nodemailer).
- **Mises à jour :** Veillez à mettre à jour les packages `@types/nodemailer` et `better-sqlite3` si vous restez sur un environnement hybride.

---
*Projet configuré avec Prisma v7 et Next.js 16.*

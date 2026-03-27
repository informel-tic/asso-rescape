# Guide de Déploiement Vercel — Asso-Rescape

Ce guide t'accompagne pas à pas pour finaliser le déploiement sur Vercel après les modifications techniques effectuées.

## 1. Base de Données (PostgreSQL)

Vercel ne supporte pas SQLite en production. Tu dois utiliser une base PostgreSQL.
- **Option simple** : Utilise "Vercel Postgres" (onglet Storage sur ton projet Vercel).
- **Alternative** : Utilise Supabase ou Neon.
- Une fois créée, récupère la `POSTGRES_URL` (ou `DATABASE_URL`).

## 2. Configuration des Variables d'Environnement

Dans ton projet Vercel, va dans **Settings** > **Environment Variables** et ajoute les clés suivantes :

| Clé | Valeur | Note |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...` | Ton URL PostgreSQL (fournie par ton hébergeur DB) |
| `AUTH_SECRET` | *(Clé aléatoire)* | Génère une clé via `openssl rand -base64 32` ou tape n'importe quoi de long et complexe |
| `NEXTAUTH_URL` | `https://ton-domaine.vercel.app` | L'URL de ton site Vercel |
| `SMTP_HOST` | `mail.rescape.org` | Ton hôte SMTP |
| `SMTP_PORT` | `587` | Port SMTP |
| `SMTP_USER` | `contact@rescape.org` | Utilisateur SMTP |
| `SMTP_PASS` | *(Ton mot de passe)* | Mot de passe SMTP |
| `SMTP_FROM` | `contact@rescape.org` | Email d'envoi |
| `ADMIN_EMAIL` | `delaruevanessa48@gmail.com` | Email de réception des formulaires |

## 3. Déploiement

1. **Commit & Push** : Envoie les modifications que je viens de faire sur ton GitHub.
   ```bash
   git add .
   git commit -m "chore: prepare for vercel deployment (postgresql & prisma)"
   git push
   ```
2. **Build** : Vercel va détecter le push et lancer le build automatiquement.
3. **Prisma DB Push** : La première fois, tu devras peut-être synchroniser le schéma avec ta nouvelle base PostgreSQL. Tu peux le faire depuis ton terminal local (en pointant temporairement vers la DB de prod dans ton `.env`) :
   ```bash
   npx prisma db push
   ```
   *Ou utilise l'onglet "Storage" de Vercel pour gérer la base si tu utilises Vercel Postgres.*

---
*Note : Si tu rencontres une erreur de build liée à `better-sqlite3`, ne t'inquiète pas, le code est configuré pour l'ignorer sur Vercel (Linux).*

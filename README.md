# Cook API

API REST de gestion de tâches (Task Manager) avec authentification JWT, développée avec NestJS, PostgreSQL et Prisma.

Chaque utilisateur peut créer un compte, se connecter, et gérer uniquement ses propres tâches (création, consultation, modification, suppression, filtrage).

## Prérequis

- [Node.js](https://nodejs.org/) v24 ou supérieur
- [Bun](https://bun.sh/) (gestionnaire de paquets et runtime)
- [PostgreSQL](https://www.postgresql.org/) (v14 ou supérieur recommandé)
- [pgAdmin](https://www.pgadmin.org/) (optionnel, pour gérer la base visuellement)
- [Bruno](https://www.usebruno.com/) (pour lancer la collection de tests)

## Installation des dépendances

```bash
bun install
```

## Configuration de l'environnement (.env)

Créer un fichier `.env` à la racine du projet, avec les variables suivantes :

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/cook_api_db?schema=public"
JWT_SECRET="votre-secret-jwt-long-et-aleatoire"
```

- `DATABASE_URL` : chaîne de connexion PostgreSQL (adapter l'utilisateur, le mot de passe et le nom de la base à votre configuration locale)
- `JWT_SECRET` : clé secrète utilisée pour signer les tokens JWT (choisir une chaîne longue et aléatoire)

⚠️ Le fichier `.env` ne doit jamais être commit sur Git (il est déjà exclu via `.gitignore`).

## Création de la base de données

1. Ouvrir pgAdmin (ou `psql` en ligne de commande)
2. Créer une base de données nommée `cook_api_db` :

```sql
CREATE DATABASE cook_api_db;
```

3. Appliquer les migrations Prisma, qui créent automatiquement les tables `User` et `Task` :

```bash
bunx prisma migrate dev
```

4. (Optionnel) Générer le client Prisma manuellement si besoin :

```bash
bunx prisma generate
```

## Lancement de l'API

```bash
# Mode développement (avec rechargement automatique)
bun run start:dev

# Mode production
bun run start:prod
```

L'API est accessible par défaut sur `http://localhost:3000`.

## Structure du projet

src/
auth/ → inscription, connexion, protection JWT
users/ → gestion interne des utilisateurs (utilisé par auth)
tasks/ → CRUD des tâches (protégé par JWT)
prisma/ → service de connexion à la base de données
prisma/
schema.prisma → modèles de données (User, Task) et migrations


## Endpoints disponibles

### Authentification

| Méthode | Route | Description | Protégé |
|---|---|---|---|
| POST | `/auth/register` | Créer un compte | Non |
| POST | `/auth/login` | Se connecter (retourne un token JWT) | Non |
| GET | `/auth/profil` | Récupérer l'utilisateur connecté | Oui |

### Tâches

| Méthode | Route | Description | Protégé |
|---|---|---|---|
| POST | `/tasks` | Créer une tâche | Oui |
| GET | `/tasks` | Lister ses tâches (filtres: `?completed=` et `?priority=`) | Oui |
| GET | `/tasks/:id` | Récupérer une tâche | Oui |
| PATCH | `/tasks/:id` | Modifier une tâche | Oui |
| PATCH | `/tasks/:id/complete` | Marquer une tâche comme terminée | Oui |
| DELETE | `/tasks/:id` | Supprimer une tâche | Oui |

Les routes protégées nécessitent un header :


## Lancement des tests avec Bruno

1. Installer [Bruno](https://www.usebruno.com/downloads)
2. Ouvrir Bruno, cliquer sur **"Open Collection"**
3. Sélectionner le dossier `bruno/` (ou l'emplacement de la collection "Tasks API") fourni avec ce projet
4. Sélectionner l'environnement **"Local"** (en haut à droite)
5. Vérifier que l'API tourne (`bun run start:dev`) avant de lancer les tests
6. Lancer les requêtes individuellement, ou clic droit sur la collection → **"Run"** pour tout exécuter d'un coup

La collection est organisée en 3 dossiers :
- **Auth** : inscription, connexion, cas d'erreurs (email déjà utilisé, mauvais mot de passe)
- **Tasks** : CRUD complet des tâches, filtres, cas d'erreurs (sans token, données invalides)
- **Sécurité** : vérifie qu'un utilisateur ne peut jamais accéder aux tâches d'un autre utilisateur

## Technologies utilisées

- [NestJS](https://nestjs.com/) — framework backend
- [Prisma](https://www.prisma.io/) (v7) — ORM
- [PostgreSQL](https://www.postgresql.org/) — base de données
- [Passport](https://www.passportjs.org/) + [JWT](https://jwt.io/) — authentification
- [bcrypt](https://www.npmjs.com/package/bcrypt) — hashage des mots de passe
- [class-validator](https://github.com/typestack/class-validator) — validation des données
- [Bun](https://bun.sh/) — runtime et gestionnaire de paquets
- [Bruno](https://www.usebruno.com/) — tests API


## NB :
# 3. Sélectionner le dossier `bruno/` (ou l'emplacement de la collection "Tasks API") fourni avec ce projet

# 3. Sélectionner le dossier `Test-API-Bruno/` fourni avec ce projet

#  > Note : la modification d'une tâche utilise `PATCH` plutôt que `PUT`, car PATCH correspond mieux au comportement de modification partielle implémenté.
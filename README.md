# JWT Authentication

Une application qui permet de pratiquer l’intégration de **JWT** en utilisant **Node.js** avec **Express.js** pour le backend et **React** pour le frontend.

Pour ceux qui ne connaissent pas, **JWT** (*JSON Web Token*) est une méthode d’authentification qui permet de vérifier l’identité des utilisateurs de manière sécurisée, en échangeant un jeton (token) signé entre le client et le serveur.
[Voir la documentation officielle de JWT](https://jwt.io/introduction).

## Fonctionnalités

* **Inscription** et **connexion** des utilisateurs avec génération de JWT.
* **Protection des routes** côté backend avec middleware de vérification du token.
* **Stockage sécurisé du token** côté client.
* **Interface React** simple pour tester l’authentification.

---

## Installation et démarrage

```bash
# Cloner le projet
git clone https://github.com/HarenaFiantso/jwt-authentication.git
cd jwt-authentication

# Installer les dépendances frontend
npm install  # Installe les dépendances React nécessaires

# Installer les dépendances backend
cd ./src/api
npm install  # Installe les dépendances Node/Express nécessaires
cd ../..

# Lancer frontend et backend en même temps
npm run dev:all
# Ce script (défini dans package.json côté frontend) utilise 'concurrently'
# pour démarrer à la fois le serveur React et le serveur Node.js.
```
> [!IMPORTANT]
> Pensez à créer un fichier `.env.local` à la racine du projet **frontend** et à y définir votre propre valeur pour `VITE_API_BASE_URL` (indiquée dans `.env.template`). Cette variable correspond à l’URL de votre API.


---

## Scripts utiles

| Commande             | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Lance uniquement le frontend (React)                       |
| `npm run dev:server` | Lance uniquement le backend (Node.js)                      |
| `npm run dev:all`    | Lance les deux serveurs en parallèle avec **concurrently** |

---

## Structure du projet

```
jwt-authentication/
├── public/
├── src/
│   ├── api/              # Backend (Node.js + Express.js)
│   │   ├── controllers/  # Logique métier
│   │   ├── routes/       # Routes API
│   │   └── server.js     # Point d’entrée backend
├── ├── assets/ 
├── ├── components/
├── ├── lib/
├── ├── service/
├── package.json          # Scripts et dépendances frontend
└── README.md
```

---

## Technologies utilisées

* **Backend** : Node.js, Express.js, JWT, bcrypt (hashage des mots de passe)
* **Frontend** : React, Axios

---

## Points importants

* Le token JWT est généré à la connexion et envoyé au client.
* Les requêtes vers les routes protégées doivent inclure le token dans l’en-tête `Authorization`.
* Le token a une durée de vie limitée et doit être régénéré à la reconnexion.

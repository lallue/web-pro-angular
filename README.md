# 🌡️ Application Température – Angular + Express

Bienvenue dans ce projet fullstack permettant la gestion d'un compte utilisateur et l'affichage de températures. Cette application est composée :

- d’un **serveur Express** (`/serveur-express`) pour la gestion de l'API REST
- d’un **client Angular** (`/temperature`) pour l’interface utilisateur

---

## 📁 Structure du projet

```
├── serveur-express       # Serveur Node.js + Express (API)
│   └── ...               
├── temperature           # Client Angular (frontend)
│   └── ...
├── README.md             # Ce fichier
```

---

## 🚀 Fonctionnalités

### 🏠 Page d’accueil
- Accès à une **surprise** cachée 😉
- Redirection vers **connexion** ou **inscription** selon l’état de l’utilisateur
- **Déconnexion** : bouton de logout

### 🔐 Authentification
- **Inscription** : création d’un compte avec email et mot de passe
- **Connexion** : authentification via email/mot de passe

### 👤 Gestion du profil
- Modification de **l’adresse email**
- Changement du **mot de passe**

### 🌡️ Températures
- Accessible via : `https://temp.3il-rodez-projets.site/api`
- Voir la **liste des températures**
- **Ajouter**, **supprimer** des entrées

## ⚙️ Lancement du projet

### 1. Backend (Express)

```bash
cd serveur-express
npm install
npm start
```

Par défaut, le backend est accessible sur : `http://localhost:3000/api`

### 2. Frontend (Angular)

```bash
cd temperature
npm install
ng serve
```

Accès à l'interface : `http://localhost:4200`
ne pas oublier de changer   private apiUrl = 'https://temp.3il-rodez-projets.site/api'; dans auth.service.ts
---

## 🌐 Déploiement

L'application est hébergée sur :

- 🌍 [https://temp.3il-rodez-projets.site](https://temp.3il-rodez-projets.site) – Frontend Angular
- 🛠️ [https://temp.3il-rodez-projets.site/api](https://temp.3il-rodez-projets.site/api) – API ExpressJS

---

## 💡 Conseil

> N'oubliez pas de découvrir la **surprise** sur la page d'accueil 😄

---

## 👨‍💻 Tech Stack

- **Frontend** : Angular
- **Backend** : ExpressJS (Node.js)
- **BDD** : MongoDB
- **Web server** : Nginx


# 🌴 Tchat Caribbean - Fullstack IRC Web App

Ce projet est une application **IRC moderne** complète construite avec :

- 🖥️ **Frontend** : Next.js (React + TailwindCSS)  
- 🔌 **Backend** : Node.js (Express) + MongoDB  
- ☁️ **Déploiement** : Render (backend) + Vercel (frontend)  
- 💬 Fonctionnalités : Authentification, salons de discussion, bots, jeux, système d'XP, badges, boutique, missions...

---

## 🗂️ Structure du projet

```
📦 Tchat-Caribbean-IRC/
├── backend/         ← Express + MongoDB
│   ├── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── ... (Modèles, Bots, etc.)
│
└── frontend/        ← Next.js (React + Tailwind)
    ├── pages/
    ├── public/
    ├── styles/
    └── ...
```

---

## 🧪 Lancer en local

### 1. Cloner le projet

```bash
git clone https://github.com/weed450/Tchat-Caribbean-IRC.git
cd Tchat-Caribbean-IRC
```

### 2. Lancer le backend (Express)

```bash
cd backend
cp .env.example .env
npm install
npm start
```
### 3. Lancer le frontend (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔐 Exemple de `.env` pour le backend

```env
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/ChatCaribbean
```

---

## ☁️ Déploiement

### 🔹 Backend – Render

1. Créer un nouveau **Web Service**
2. Dossier racine : `backend`
3. Start command : `node server.js`
4. Ajouter la variable d’environnement `MONGODB_URI`

### 🔹 Frontend – Vercel

1. Créer un nouveau projet
2. Dossier racine : `frontend`
3. Framework : **Next.js**

---

## ✅ Fonctionnalités incluses

- [x] Authentification (connexion / inscription)
- [x] Salons de discussion (avec rôles et accès par âge)
- [x] Messages privés (fenêtres flottantes)
- [x] Bots (quiz, modération, jeux)
- [x] Jeux interactifs (quiz, blackjack, dés...)
- [x] XP, niveaux et classement
- [x] Badges & personnalisation
- [x] Missions journalières
- [x] Carte interactive des utilisateurs
- [x] Inventaire, boutique, système d’objets
- [x] Logs, mute, kick, ban, modération complète

---

## ⚙️ Technologies utilisées

| Frontend | Backend  | Base de données |
|----------|----------|------------------|
| Next.js  | Express  | MongoDB (Mongoose) |
| React    | Node.js  | MongoDB Atlas     |
| TailwindCSS | Socket.io |              |

---

## 📄 Licence

Ce projet est open source sous licence **MIT**.

---

## 🙌 Auteur

Développé par [weed450](https://github.com/weed450.) 

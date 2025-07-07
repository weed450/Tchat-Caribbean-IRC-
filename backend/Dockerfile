# Utiliser l'image officielle Node.js LTS (version 18)
FROM node:18

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances (cela sera mis en cache si package.json ne change pas)
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port sur lequel tourne le serveur (ici 5000 par défaut)
EXPOSE 5000

# Commande pour lancer ton serveur
CMD ["npm", "start"]
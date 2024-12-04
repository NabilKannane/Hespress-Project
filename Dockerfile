FROM node:18.19.1

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier tout le projet dans le conteneur
COPY . .

# Construire l'application Next.js
RUN npm run build


# Exposer le port sur lequel l'application Next.js fonctionne
EXPOSE 3000

# Démarrer l'application Next.js
CMD ["npm", "start"]
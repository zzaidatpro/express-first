# Automatec - Application Web Hybride (Express.js SPA / MPA)

Une application web hybride moderne construite avec **Node.js** et **Express.js**, capable de basculer de façon dynamique entre un mode **Single Page Application (SPA)** et un mode **Multi-Page Application (MPA)**.

---

## 🌟 Fonctionnalités Principales

- **Mode Hybride SPA / MPA** :
  - **Mode SPA** : Navigation fluide via `fetch` (routes API `/api/page/:name`) et manipulation de l'historique HTML5 (`history.pushState`), sans rechargement de page.
  - **Mode MPA** : Navigation traditionnelle avec rechargement complet de la page côté serveur.
  - **Bascule Dynamique (Toggle)** : Bouton interactif permettant de changer de mode à tout moment avec persistance dans le `localStorage`.
- **Restriction d'Accès par Horaires** :
  - Middleware personnalisé interdisant l'accès à l'application le week-end et en dehors des heures de bureau (Lundi au Vendredi, 09h00 – 17h00).
  - Renvoie une page d'accès restreint avec statut `403 Forbidden` tout en conservant le style CSS.
- **Architecture Modulaire JavaScript (ES6 Modules)** :
  - Séparation nette des responsabilités (`app.js`, `navbar.js`, `spa.js`).
  - Utilisation de la délégation d'événements pour garantir la persistance des clics et formulaires après injection dynamique du contenu.

---

## 📁 Structure du Projet

```text
automatec-hybrid-app/
├── public/                  # Fichiers statiques servis par Express
│   ├── css/
│   │   └── style.css        # Feuille de style principale
│   ├── js/
│   │   ├── app.js           # Point d'entrée JavaScript (ES Module)
│   │   ├── navbar.js        # Rendu du menu & gestion des badges/titres
│   │   └── spa.js           # Routeur SPA, logique du toggle & fetch
│   └── index.html           # Squelette HTML principal de l'application
├── views/                   # Fragments HTML des vues (SPA & MPA)
│   ├── index.html           # Contenu de la page d'accueil (<main>)
│   ├── services.html        # Contenu de la page services (<main>)
│   └── contact.html         # Contenu de la page contact (<main>)
├── server.js                # Serveur Express & middleware
├── package.json             # Dépendances du projet
└── README.md                # Documentation

Installation et Démarrage
Prérequis
Node.js (v14 ou supérieure)

npm ou yarn

1. Cloner ou Télécharger le Projet
Bash
git clone [https://github.com/votre-compte/automatec-hybrid-app.git](https://github.com/votre-compte/automatec-hybrid-app.git)
cd automatec-hybrid-app
2. Installer les Dépendances
Bash
npm install
3. Lancer le Serveur
Bash
npm start
# Ou directement avec Node :
node server.js
L'application sera accessible à l'adresse : http://localhost:3000

🛠️ Architecture & Découpage Technique
1. Serveur Express (server.js)
Fichiers Statiques : Le dossier public/ est servi au niveau racine (/), garantissant l'accès permanent aux ressources /css/style.css et /js/*.

Middleware d'Horaires (verifierheure) : Intercepte les requêtes HTML/API. Il laisse passer le contenu statique (CSS/JS) pour que la mise en page de la page de blocage reste fonctionnelle.

Endpoints API SPA : Les vues partielles situées dans views/*.html sont exposées sur la route /api/page/:name.

Routes Fallback MPA : Les accès directs (/, /services, /contact) servent le fichier maître public/index.html.

2. Gestion du Mode SPA vs MPA (public/js/spa.js)
Le mode actif est lu dans le localStorage (app_mode).

Mode SPA : Intercepte les liens .nav-link, effectue un fetch('/api/page/...'), injecte le résultat dans le conteneur <main id="main">, et met à jour l'URL sans rechargement.

Mode MPA : Désactive l'interception des liens pour laisser le navigateur faire un rechargement classique.

Bascule (Toggle) : Le clic sur le bouton #mode-badge fonctionne indépendamment du mode sélectionné.

3. Délégation d'Événements & Vues
Les fichiers dans views/*.html contiennent uniquement la balise <main> pour éviter la duplication des éléments de structure (<header>, <head>, etc.).

La fonction initPageEvents() réattache dynamiquement les écouteurs d'événements (par exemple la soumission du formulaire dans contact.html) à chaque transition de page SPA.

🔒 Configuration des Horaires
Par défaut, l'accès à l'application est restreint par le middleware verifierheure aux plages suivantes :

Jours autorisés : Lundi au Vendredi.

Heures autorisées : De 09h00 à 17h00.

Pour modifier ces contraintes, ajustez les variables dans server.js :

JavaScript
const le_week_end = (jour === 0 || jour === 6);
const horsHoraires = (heure_actuelle < 9 || heure_actuelle >= 17);
🧪 Procédure de Test
Tester le Mode SPA :

Assurez-vous que le badge affiche ⚡ Mode Actif : SPA.

Naviguez entre Accueil, Services, et Contact.

Observez l'onglet du navigateur : la page ne se recharge pas, et les requêtes dans l'onglet Réseau (F12) ciblent /api/page/....

Tester la Bascule (Toggle) :

Cliquez sur le badge. Il passe en orange : 📄 Mode Actif : MPA.

Les titres <h1> se mettent à jour avec le suffixe (MPA).

Tester le Mode MPA :

Cliquez sur un lien du menu.

Observez l'onglet du navigateur : la page effectue un rechargement complet.
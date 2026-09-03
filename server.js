const express = require('express'); 
const path = require('path');

const app = express(); 
const PORT = 3000;

const verifierheure = (req, res, next) => {
 
  if (req.path.startsWith('/css') || req.path.startsWith('/js') || req.path.includes('.')) {
    return next();
  }

  const date = new Date();
  const jour = date.getDay(); // 0 = Dimanche, 6 = Samedi
  const heure_actuelle = date.getHours();
  const le_week_end = (jour === 0 || jour === 6);
  const horsHoraires = (heure_actuelle < 9 || heure_actuelle >= 17);

  req.requestTime = date.toISOString();

  if (le_week_end || horsHoraires) {
    return res.status(403).send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accès Restreint</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <div class="container" style="margin-top: 5rem; text-align: center;">
          <div class="card" style="border-left: 5px solid #ef4444; padding: 2rem;">
            <h1 style="color: #ef4444; margin-bottom: 1rem;">Accès Hors Horaires</h1>
            <p>Le site est accessible uniquement du <strong>Lundi au Vendredi</strong>, de <strong>9h00 à 17h00</strong>.</p>
          </div>
        </div>
      </body>
      </html>
    `);
  }
  next();
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(verifierheure);
app.get('/api/page/:name', (req, res) => {
  const page = req.params.name;
  const validPages = ['index', 'services', 'contact'];
  
  if (validPages.includes(page)) {
    res.sendFile(path.join(__dirname, 'views', `${page}.html`));
  } else {
    res.status(404).send('<main id="main"><h1>Page non trouvée</h1></main>');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur hybride démarré sur http://localhost:${PORT}`);
});
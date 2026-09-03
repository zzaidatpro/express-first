const navLinks = [
  { path: '/', text: 'Accueil' },
  { path: '/nos-services', text: 'Nos services' },
  { path: '/nous-contacter', text: 'Nous contacter' }
];

const pages = {
  '/': `...`,
  '/nos-services': `...`,
  '/nous-contacter': `...`
};

const page = {
    '/' : `
    <h1>Accueil</h1><p>Bienveue sur notre site !</p>`,
    '/nos-services' : `<h1>Nos Services</h1>
    <p>Nous proposons une gamme complète de services adaptés à vos besoins :</p>
    <ul>
      <li>Développement Web & Mobile</li>
      <li>Infrastructures Réseaux</li>
      <li>Solutions de Sécurité</li>
    </ul>`,
    '/nous-contacter' : `<h1>Nous Contacter</h1>
    <p>Une question ou un projet ? Envoyez-nous un message.</p>
    <form id="contact-form">
      <div>
        <label>Nom :</label><br>
        <input type="text" placeholder="Votre nom" required>
      </div>
      <div>
        <label>Message :</label><br>
        <textarea placeholder="Votre message" required></textarea>
      </div>
      <button type="submit">Envoyer</button>
    </form>`
}

function renderNavbar() {
  const currentPath = window.location.pathname;
  const navbarContainer = document.getElementById('navbar-container');

  const linksHTML = navLinks.map(link => `
    <li>
      <a href="${link.path}" 
         class="nav-item ${currentPath === link.path ? 'active' : ''}" 
         data-link>
        ${link.text}
      </a>
    </li>
  `).join('');

  navbarContainer.innerHTML = `
    <nav class="navbar">
      <div class="logo">MonApp</div>
      <ul class="nav-menu">
        ${linksHTML}
      </ul>
    </nav>
  `;
}

function router() {
  const currentPath = window.location.pathname;
  const content = pages[currentPath] || '<h1>404</h1><p>Page non trouvée.</p>';

  document.getElementById('app').innerHTML = content;
  renderNavbar();
}

function navigateTo(url) {
  window.history.pushState(null, null, url);
  router();
}

document.addEventListener('click', e => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', router);
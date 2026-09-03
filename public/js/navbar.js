export function renderNavbar() {
  const container = document.getElementById('navbar-container');
  if (!container) return;

  container.innerHTML = `
    <nav class="navbar">
      <div class="logo">Automatec</div>
      <ul class="nav-links">
        <li><a href="/" class="nav-link">Accueil</a></li>
        <li><a href="/services" class="nav-link">Services</a></li>
        <li><a href="/contact" class="nav-link">Contact</a></li>
      </ul>
      <button id="mode-badge" type="button" class="mode-badge spa">
        ⚡ Mode Actif : SPA (Cliquer pour basculer)
      </button>
    </nav>
  `;
}

export function updateActiveNav(currentPathname) {
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPathname) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

export function updateModeBadge(isSPA) {
  const badge = document.getElementById('mode-badge');
  if (!badge) return;

  if (isSPA) {
    badge.className = 'mode-badge spa';
    badge.textContent = '⚡ Mode Actif : SPA (Cliquer pour basculer)';
  } else {
    badge.className = 'mode-badge mpa';
    badge.textContent = '📄 Mode Actif : MPA (Cliquer pour basculer)';
  }
}

export function updatePageHeadings(isSPA) {
  const modeText = isSPA ? 'SPA' : 'MPA';
  const pageTitle = document.querySelector('main h1');

  if (pageTitle) {
    const cleanTitle = pageTitle.textContent
      .replace(/\s*\((SPA|MPA)\)/gi, '')
      .trim();
      pageTitle.textContent = `${cleanTitle} (${modeText})`;
  }
}
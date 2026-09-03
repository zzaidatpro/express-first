import { updateActiveNav, updateModeBadge, updatePageHeadings } from './navbar.js';

let isSPAMode = localStorage.getItem('app_mode') !== 'MPA';

export function initSPARouter() {
  updateModeBadge(isSPAMode);
  document.addEventListener('click', (e) => {
    const badge = e.target.closest('#mode-badge');
    if (badge) {
      e.preventDefault();
      toggleMode();
      return;
    }
    if (!isSPAMode) return;

    const link = e.target.closest('a.nav-link');
    if (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        navigateTo(href);
      }
    }
  });

  window.addEventListener('popstate', () => {
    if (isSPAMode) {
      loadSPAPage(window.location.pathname, false);
    }
  });
}

function toggleMode() {
  isSPAMode = !isSPAMode;
  localStorage.setItem('app_mode', isSPAMode ? 'SPA' : 'MPA');
  
  updateModeBadge(isSPAMode);
  updatePageHeadings(isSPAMode);
}

export function navigateTo(pathname) {
  if (window.location.pathname === pathname) return;
  loadSPAPage(pathname, true);
}

export async function loadSPAPage(pathname, pushToHistory = true) {
  let pageName = 'index';
  if (pathname === '/services') pageName = 'services';
  if (pathname === '/contact') pageName = 'contact';

  try {
    const response = await fetch(`/api/page/${pageName}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const newContent = doc.querySelector('main') || doc.body;
    const mainContainer = document.getElementById('main');

    if (newContent && mainContainer) {
      mainContainer.innerHTML = newContent.innerHTML;

      if (pushToHistory) {
        history.pushState(null, '', pathname);
      }

      updateActiveNav(pathname);
      updatePageHeadings(isSPAMode);
      
      initPageEvents(pageName);
    }
  } catch (err) {
    console.error('Erreur SPA, bascule vers rechargement classique :', err);
    window.location.href = pathname;
  }
}

function initPageEvents(pageName) {
  if (pageName === 'contact') {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message envoyé avec succès !');
      });
    }
  }
}
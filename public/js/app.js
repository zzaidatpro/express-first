import { renderNavbar } from './navbar.js';
import { initSPARouter, loadSPAPage } from './spa.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar(); // charger la navbar
  initSPARouter(); // ecouteur
  loadSPAPage(window.location.pathname, false);
});
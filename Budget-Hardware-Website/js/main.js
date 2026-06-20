const nav = document.getElementById('nav');
const menuBtn = document.getElementById('navMenuBtn');
const mobilePanel = document.getElementById('navMobilePanel');
const mobileBackdrop = document.getElementById('navMobileBackdrop');
let currentPage = document.body.getAttribute('data-page') || 'home';

function goPage(name) {
  // Multi-page-in-one-file support (used on index.html)
  const pages = document.querySelectorAll('.page');
  if (pages.length > 1) {
    pages.forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + name);
    if (page) page.classList.add('active');
    currentPage = name;
    setActiveLinks(name);
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateNav();
    closeMobileMenu();
    return;
  }

  // Multi-file support: navigate to the matching page file
  const fileMap = {
    home: 'index.html',
    about: 'about.html',
    categories: 'categories.html',
    services: 'services.html',
    brands: 'brands.html',
    contact: 'contact.html'
  };
  if (fileMap[name]) {
    window.location.href = fileMap[name];
  }
}

function setActiveLinks(name) {
  document.querySelectorAll('.nav-links a, .nav-mobile-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === name);
  });
}

function updateNav() {
  const scrollY = window.scrollY;
  const isHome = currentPage === 'home';

  if (isHome && scrollY < 80) {
    nav.className = 'transparent';
  } else {
    nav.className = 'scrolled';
  }
}

function openMobileMenu() {
  menuBtn.classList.add('open');
  mobilePanel.classList.add('open');
  mobileBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  menuBtn.classList.remove('open');
  mobilePanel.classList.remove('open');
  mobileBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMobileMenu() {
  if (mobilePanel.classList.contains('open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

window.addEventListener('scroll', updateNav, { passive: true });

// Subtle parallax on hero bg (home page only)
window.addEventListener('scroll', () => {
  if (currentPage !== 'home') return;
  const bg = document.getElementById('heroBg');
  if (bg) {
    bg.style.transform = `scale(1.0) translateY(${window.scrollY * 0.25}px)`;
  }
}, { passive: true });

setActiveLinks(currentPage);
updateNav();

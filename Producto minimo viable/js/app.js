import * as THREE from 'three';
import * as PANOLENS from 'panolens';

// ============================================
// DATA — EDIT WITH YOUR OWN CONTENT
// ============================================

const projects = [
  {
    title: 'Stickers',
    description: 'Colección de stickers con diseños originales y estilo urbano.',
    image: 'images/Stickers/portada.jpg',
    link: '#stickers-gallery',
  },
  // TODO: Agrega más proyectos aquí
  // {
  //   title: 'Nombre del Proyecto',
  //   description: 'Descripción breve del proyecto.',
  //   image: 'images/Proyectos/tu-imagen.jpg',
  //   link: '#',
  // },
];

const tours = [
  {
    title: 'Estudio de Diseño',
    description: 'Recorrido virtual por mi espacio de trabajo creativo',
    panorama: 'images/Panoramas/360_1.jpg',
    // TODO: Reemplaza con tus propias imágenes 360°
  },
  // {
  //   title: 'Nombre del Tour',
  //   description: 'Descripción del recorrido',
  //   panorama: 'images/Panoramas/tu-panorama.jpg',
  // },
];

const galleryData = {
  autorretratos: [
    // TODO: Agrega tus imágenes aquí
    // { src: 'images/Galeria/Autorretratos/imagen1.jpg', title: 'Título', desc: 'Descripción' },
  ],
  animaciones: [
    // { src: 'images/Galeria/Animaciones/imagen1.gif', title: 'Título', desc: 'Descripción' },
  ],
  carteles: [
    // { src: 'images/Galeria/Carteles/imagen1.jpg', title: 'Título', desc: 'Descripción' },
  ],
  personajes: [
    // { src: 'images/Galeria/Personajes/imagen1.jpg', title: 'Título', desc: 'Descripción' },
  ],
  ilustraciones: [
    // { src: 'images/Galeria/Ilustraciones/imagen1.jpg', title: 'Título', desc: 'Descripción' },
  ],
  letras: [
    // { src: 'images/Galeria/Letras/imagen1.jpg', title: 'Título', desc: 'Descripción' },
  ],
  stickers: {
    tanda1: [
      // 'IMG_1723.PNG', 'IMG_1724.PNG',
    ],
    tanda2: [
      // 'IMG_1781.PNG', 'IMG_1782.PNG',
    ],
  },
};

let panoramaViewer = null;
let currentPanorama = null;

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavigation();
  initScrollAnimations();
  initProjects();
  initTourViewer();
  initGalleryTabs();
  initFormValidation();
  initMobileMenu();
  initCustomCursor();
});

// ============================================
// PAGE LOADER
// ============================================

function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 500);
  });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
  const header = document.querySelector('header');
  if (!header) return;

  const navLinks = document.querySelectorAll('.nav-links a');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    header.classList.toggle('scrolled', scrollY > 50);

    if (scrollY > lastScroll && scrollY > 200) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScroll = scrollY;

    let current = '';
    const sections = document.querySelectorAll('section[id]');
    const offset = scrollY + header.offsetHeight + 100;
    sections.forEach((s) => {
      if (offset >= s.offsetTop && offset < s.offsetTop + s.offsetHeight) {
        current = s.id;
      }
    });
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - header.offsetHeight,
          behavior: 'smooth',
        });
      }
    });
  });
}

function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  const toggle = (force) => {
    const open = force !== undefined ? force : !nav.classList.contains('active');
    nav.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', String(open));
    const icon = btn.querySelector('i');
    if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
  };

  btn.addEventListener('click', () => toggle());
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !e.target.closest('.nav-links, .mobile-menu-btn')) {
      toggle(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      toggle(false);
      btn.focus();
    }
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => observer.observe(el));

  const containers = document.querySelectorAll('.cascade-container');
  const cascadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('animate');
          cascadeObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  containers.forEach((c) => cascadeObserver.observe(c));
}

// ============================================
// PROJECTS
// ============================================

function initProjects() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  projects.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.innerHTML = `
      <div class="project-img">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="project-overlay">
          <div class="project-overlay-content">
            <a href="${p.link}" class="project-link">Ver detalles</a>
          </div>
        </div>
      </div>
      <div class="project-content">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>`;
    grid.appendChild(card);
  });

  requestAnimationFrame(() => {
    grid.querySelectorAll('.reveal').forEach((c) => c.classList.add('active'));
  });

  setupStickersModal();
}

function setupStickersModal() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.project-link');
    if (link && link.getAttribute('href') === '#stickers-gallery') {
      e.preventDefault();
      openStickersModal();
    }
  });
}

function openStickersModal() {
  const existing = document.getElementById('stickers-gallery');
  if (existing) { existing.style.display = 'block'; loadStickers(); return; }

  const modal = document.createElement('div');
  modal.id = 'stickers-gallery';
  modal.className = 'modal';
  modal.style.display = 'block';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Colección de Stickers</h2>
      <div class="stickers-container"></div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector('.close-modal').addEventListener('click', () => { modal.style.display = 'none'; });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  loadStickers();
}

function loadStickers() {
  const container = document.querySelector('.stickers-container');
  if (!container) return;
  container.innerHTML = '';

  const { tanda1, tanda2 } = galleryData.stickers;
  const path1 = 'images/Stickers/';

  tanda1.forEach((img) => {
    const item = document.createElement('div');
    item.className = 'sticker-item';
    const src = `${path1}${img}`;
    item.innerHTML = `<img src="${src}" alt="Sticker" loading="lazy">`;
    item.addEventListener('click', () => openFullImage(src));
    container.appendChild(item);
  });

  tanda2.forEach((img) => {
    const item = document.createElement('div');
    item.className = 'sticker-item';
    const src = `${path1}${img}`;
    item.innerHTML = `<img src="${src}" alt="Sticker" loading="lazy">`;
    item.addEventListener('click', () => openFullImage(src));
    container.appendChild(item);
  });
}

function openFullImage(src) {
  const view = document.createElement('div');
  view.className = 'full-image-view';
  view.innerHTML = `
    <div class="full-image-container">
      <span class="close-full-image">&times;</span>
      <img src="${src}" alt="Imagen completa">
    </div>`;
  document.body.appendChild(view);
  document.body.style.overflow = 'hidden';

  const close = () => { view.remove(); document.body.style.overflow = ''; };
  view.querySelector('.close-full-image').addEventListener('click', close);
  view.addEventListener('click', (e) => { if (e.target === view) close(); });
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', handler); }
  });
}

// ============================================
// TOUR 360°
// ============================================

function initTourViewer() {
  const container = document.getElementById('pano');
  const list = document.querySelector('.tours-list');
  if (!container || !list) return;

  if (tours.length === 0) {
    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,0.4);font-family:'Poppins',sans-serif;padding:2rem;text-align:center;">
        <p>Agrega tus tours 360° en <code>js/app.js</code> → array <code>tours</code></p>
      </div>`;
    list.innerHTML = '';
    return;
  }

  list.innerHTML = '';
  tours.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = 'tour-item';
    if (i === 0) item.classList.add('active');
    item.innerHTML = `
      <h3>${t.title}</h3>
      <p>${t.description}</p>
      <button class="tour-button" data-index="${i}">Ver Tour</button>`;
    list.appendChild(item);
  });

  function loadTour(index) {
    const tour = tours[index];
    const indicator = document.querySelector('.loading-indicator');
    if (indicator) indicator.style.display = 'block';

    document.querySelectorAll('.tour-item').forEach((it, i) => {
      it.classList.toggle('active', i === index);
    });

    if (currentPanorama && panoramaViewer) {
      panoramaViewer.remove(currentPanorama);
    }

    currentPanorama = new PANOLENS.ImagePanorama(tour.panorama);
    currentPanorama.addEventListener('load', () => {
      if (indicator) indicator.style.display = 'none';
    });
    currentPanorama.addEventListener('error', () => {
      if (indicator) indicator.style.display = 'none';
    });

    if (panoramaViewer) {
      panoramaViewer.add(currentPanorama);
    }
  }

  try {
    panoramaViewer = new PANOLENS.Viewer({
      container,
      autoRotate: true,
      autoRotateSpeed: 0.3,
      controlBar: true,
      controlButtons: ['fullscreen'],
      cameraFov: 90,
    });

    if (tours.length > 0) loadTour(0);
  } catch (err) {
    container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--primary);">Error al cargar el visor 360°</div>`;
  }

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.tour-button');
    if (btn) loadTour(parseInt(btn.dataset.index));
  });

  window.addEventListener('resize', () => {
    if (panoramaViewer) panoramaViewer.onWindowResize();
  });
}

// ============================================
// GALLERY TABS
// ============================================

function initGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const collections = document.querySelectorAll('.gallery-collection');

  // Load gallery images from data
  renderGalleryItems();

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.collection;
      collections.forEach((c) => c.classList.remove('active'));
      tabs.forEach((t) => t.classList.remove('active'));
      const col = document.getElementById(id);
      if (col) col.classList.add('active');
      tab.classList.add('active');
    });
  });
}

function renderGalleryItems() {
  const gridMap = {
    autorretratos: '.portraits-grid',
    animaciones: '.animations-grid',
    carteles: '.posters-grid',
    personajes: '.characters-grid',
    ilustraciones: '.illustrations-grid',
    letras: '.letters-grid',
  };

  Object.entries(galleryData).forEach(([key, items]) => {
    if (!Array.isArray(items)) return;
    const selector = gridMap[key];
    if (!selector) return;
    const grid = document.querySelector(selector);
    if (!grid) return;

    items.forEach((item) => {
      const div = document.createElement('div');
      div.className = `${key === 'autorretratos' ? 'portrait' : key === 'animaciones' ? 'animation' : key === 'carteles' ? 'poster' : key === 'personajes' ? 'character' : key === 'ilustraciones' ? 'illustration' : 'letter'}-item`;
      div.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="gallery-item-overlay">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>`;
      div.addEventListener('click', () => openFullImage(item.src));
      grid.appendChild(div);
    });
  });
}

// ============================================
// FORM VALIDATION
// ============================================

function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    clearError(name);
    clearError(email);
    clearError(message);

    if (!name.value.trim()) { showError(name, 'Introduce tu nombre'); valid = false; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Introduce un email válido');
      valid = false;
    }
    if (!message.value.trim()) { showError(message, 'Escribe tu mensaje'); valid = false; }

    if (valid) {
      const msg = document.createElement('div');
      msg.className = 'success-message';
      msg.textContent = '¡Mensaje enviado! Gracias por contactarme.';
      form.parentNode.insertBefore(msg, form.nextSibling);
      form.reset();
      setTimeout(() => msg.remove(), 5000);
    }
  });
}

function showError(input, text) {
  clearError(input);
  input.classList.add('error');
  const msg = document.createElement('div');
  msg.className = 'error-message';
  msg.textContent = text;
  input.parentNode.appendChild(msg);
}

function clearError(input) {
  input.classList.remove('error');
  const msg = input.parentNode.querySelector('.error-message');
  if (msg) msg.remove();
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll('a, button, .hover-lift, .project-card, .skill-item').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

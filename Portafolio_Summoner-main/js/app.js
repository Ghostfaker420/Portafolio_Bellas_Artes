import * as THREE from 'three';
import * as PANOLENS from 'panolens';

// ============================================
// Datos de la aplicación
// ============================================

const projects = [
  {
    title: 'Stickers',
    description: 'Colección de stickers de arte urbano con diseños originales y estilo graffiti.',
    image: 'images/Stickers Tanda 2/portada.jpg',
    category: 'arte-urbano',
    link: '#stickers-gallery',
  },
];

const tours = [
  {
    title: 'Estudio de Diseño',
    description: 'Recorrido virtual por un moderno estudio de diseño interactivo',
    panorama: 'images/360_1.jpg',
    hotspots: [
      { pitch: 0, yaw: 0, text: 'Área de trabajo principal' },
      { pitch: 10, yaw: 90, text: 'Estación de diseño 3D' },
    ],
  },
  {
    title: 'Galería de Proyectos',
    description: 'Exposición virtual de los mejores proyectos de diseño',
    panorama: 'images/360_1.jpg',
    hotspots: [
      { pitch: -10, yaw: 180, text: 'Sección de diseño web' },
      { pitch: 5, yaw: 270, text: 'Proyectos de realidad virtual' },
    ],
  },
];

let panoramaViewer = null;
let currentPanorama = null;

// ============================================
// Inicialización
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavigation();
  initScrollAnimations();
  initProjectsGallery();
  initTourViewer();
  initContactForm();
  initGalleryTabs();
  initLazyLoading();
  initAccessibility();
  initCustomCursor();
  initFormValidation();
  setupMobileMenu();
});

// ============================================
// Page Loader
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
// Navegación & Header
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

function setupMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  const toggle = (force) => {
    const open = force !== undefined ? force : !nav.classList.contains('active');
    nav.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', String(open));
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = open ? 'fas fa-times' : 'fas fa-bars';
    }
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
// Scroll Animations
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
// Proyectos
// ============================================

function initProjectsGallery() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  grid.innerHTML = '';
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

  createStickersModal();
}

function createStickersModal() {
  let modal = document.getElementById('stickers-gallery');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'stickers-gallery';
    modal.className = 'modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Colección de Stickers</h2>
        <div class="stickers-container"></div>
      </div>`;
    document.body.appendChild(modal);

    modal.querySelector('.close-modal').addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-link') && e.target.getAttribute('href') === '#stickers-gallery') {
      e.preventDefault();
      modal.style.display = 'block';
      loadStickers();
    }
  });
}

function loadStickers() {
  const container = document.querySelector('.stickers-container');
  if (!container) return;
  container.innerHTML = '';

  const images = [
    'IMG_1723.PNG', 'IMG_1724.PNG', 'IMG_1725.PNG', 'IMG_1726.PNG',
    'IMG_1727.PNG', 'IMG_1728.PNG',
  ];

  images.forEach((img) => {
    const item = document.createElement('div');
    item.className = 'sticker-item';
    const src = `images/Stickers Tanda 1/${img}`;
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
// Tour 360°
// ============================================

function initTourViewer() {
  const container = document.getElementById('pano');
  const list = document.querySelector('.tours-list');
  if (!container || !list) return;

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

  let viewer = null;

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
    container.innerHTML = `<div class="tour-error">Error al cargar el visor 360°</div>`;
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
// Contacto
// ============================================

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.trim();
    const email = data.get('email')?.trim();
    const message = data.get('message')?.trim();

    if (!name || !email || !message) return;

    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <p>¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.</p>
      </div>
      <button class="notification-close"><i class="fas fa-times"></i></button>`;
    document.body.appendChild(notification);

    requestAnimationFrame(() => notification.classList.add('show'));
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    }, 5000);

    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    });

    form.reset();
  });
}

// ============================================
// Validación de Formulario
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

    if (!name.value.trim()) { showError(name, 'Por favor, introduce tu nombre'); valid = false; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Por favor, introduce un email válido');
      valid = false;
    }
    if (!message.value.trim()) { showError(message, 'Por favor, introduce tu mensaje'); valid = false; }

    if (valid) {
      const msg = document.createElement('div');
      msg.className = 'success-message';
      msg.textContent = 'Mensaje enviado correctamente. ¡Gracias por contactar!';
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
// Galería de pestañas
// ============================================

function initGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const collections = document.querySelectorAll('.gallery-collection');

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

// ============================================
// Lazy Loading
// ============================================

function initLazyLoading() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '200px 0px', threshold: 0.01 }
  );

  document.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));
}

// ============================================
// Accesibilidad
// ============================================

function initAccessibility() {
  document.querySelectorAll('.mobile-menu-btn').forEach((btn) => {
    if (!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label', 'Abrir menú');
    btn.setAttribute('aria-expanded', 'false');
  });
}

// ============================================
// Cursor Personalizado
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

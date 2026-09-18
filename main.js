/* =============================================
   ALAN MUÑOZ CABELLO – PORTFOLIO MAIN SCRIPT
   ============================================= */

// ── Project Data ──────────────────────────────
const projects = [
  {
    id: 'atmosphericlettuce',
    title: 'AtmosphericLettuce',
    desc: 'Sistema de gestión agrícola integrado con inteligencia artificial para la detección temprana de enfermedades en cultivos. Diseñado como una plataforma full-stack que conecta datos de sensores IoT, recomendaciones y análisis de imágenes por IA y un panel de control web para agricultores.',
    tools: ['Python', 'FastAPI', 'SQLite', 'HTML', 'CSS', 'JS'],
    images: ['project_lettuce.png', 'project_lettuce_crops.png', 'project_lettuce_login.png', 'project_lettuce_chat.png'],
    web: 'https://atmosphericlettuce-61jw.onrender.com',
    github: '',
    contributors: [
      { name: 'Alan Muñoz', role: 'Backend Developer', initials: 'AM' },
      { name: 'Nicolás Urbina', role: 'Backend Developer', initials: 'NU' },
      { name: 'Cristian Aliaga', role: 'Frontend Developer', initials: 'CA' },
      { name: 'John Rojas', role: 'Frontend Developer', initials: 'JR' }
    ]
  },
  {
    id: 'redcicla',
    title: 'RedCicla',
    desc: 'RedCicla es un sistema creado para la empresa fictisia RedCicla, como apoyo y digitalización de procesos de reciclage como gestión de empleados, camiones, puntos de reciclage y rutas óptimas para los choferes de los camiones. El enfoque de la aplicación es la digitalización de tareas problematicas y reducción de la huella de carbono por parte de los camiones.',
    tools: ['Dart', 'Python', 'FastAPI', 'FireBase', 'JWT', 'HTML', 'CSS', 'JS'],
    images: ['project_redcicla.png', 'project_redcicla_map.png', 'project_redcicla_route.png', 'project_redcicla_dashboard.png'],
    web: '',
    github: 'https://github.com/Sebiita/Proyecto-RedCicla',
    contributors: [
      { name: 'Alan Muñoz', role: 'Scrum Master', initials: 'AM' },
      { name: 'Nicolás Urbina', role: 'Product Owner', initials: 'NU' },
      { name: 'Cristian Aliaga', role: 'Desarrollador', initials: 'CA' },
      { name: 'John Rojas', role: 'Desarrollador', initials: 'JR' },
      { name: 'Danilo Ponce', role: 'Desarrollador', initials: 'DP' },
      { name: 'Sebastian Ruiz', role: 'Desarrollador', initials: 'SR' }
    ]
  },
  {
    id: 'minimax',
    title: 'Gato de Gatos',
    desc: 'Este Minimax funciona en un ambiente modificado, en donde el algoritmo sigue buscando su emjor posibilidad de ganar en su cuadrante actual, sin tener en cuenta el resto de cuadrantes. Esto puede ser una bentaja para el usuario.',
    tools: ['Java', 'JavaFX'],
    images: ['project_minimax_home.png', 'project_minimax_player.png', 'project_minimax_gamemode.png', 'project_minimax.png'],
    web: '',
    github: 'https://github.com/alanmunozcabello/gato_de_gatos_javafx.git',
    contributors: [
      { name: 'Alan Muñoz', role: 'Desarrollador', initials: 'AM' },
      { name: 'Cristian Aliaga', role: 'Desarrollador', initials: 'CA' }
    ]
  }
];

// ── Carousel ──────────────────────────────────
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsContainer = document.getElementById('carousel-dots');
const cards = document.querySelectorAll('.project-card');

let currentIndex = 0;
let cardWidth = 0;
let visibleCards = 2;
const totalProjects = projects.length;

function getCardMeta() {
  const container = document.getElementById('carousel-track-container');
  const gap = 24;
  visibleCards = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 1 : 2;
  const singleCard = cards[0];
  const style = getComputedStyle(singleCard);
  const flexBasis = style.flexBasis;
  // Use container width
  const containerW = container.offsetWidth;
  if (visibleCards === 1) {
    cardWidth = containerW * (window.innerWidth <= 480 ? 0.88 : 0.8) + gap;
  } else {
    cardWidth = (containerW / 2) + (gap / 2);
  }
}

function updateCarousel() {
  getCardMeta();
  const maxIndex = Math.max(0, totalProjects - visibleCards);
  currentIndex = Math.min(currentIndex, maxIndex);
  const offset = currentIndex * (cardWidth);
  track.style.transform = `translateX(-${offset}px)`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;

  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function buildDots() {
  dotsContainer.innerHTML = '';
  const maxIndex = Math.max(0, totalProjects - visibleCards);
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir al proyecto ${i + 1}`);
    dot.addEventListener('click', () => { currentIndex = i; updateCarousel(); });
    dotsContainer.appendChild(dot);
  }
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) { currentIndex--; updateCarousel(); }
});
nextBtn.addEventListener('click', () => {
  const maxIndex = Math.max(0, totalProjects - visibleCards);
  if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); }
});

// Touch/swipe support
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 50) {
    if (delta > 0) nextBtn.click();
    else prevBtn.click();
  }
});

window.addEventListener('resize', () => {
  buildDots();
  updateCarousel();
});

// Init
buildDots();
updateCarousel();

// ── Modal ──────────────────────────────────────
const backdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

function openModal(idx) {
  const p = projects[idx];
  if (!p) return;

  const imagesHTML = p.images.map(src =>
    `<img src="${src}" alt="${p.title}" class="modal-gallery-img" loading="lazy" />`
  ).join('');

  const tagsHTML = p.tools.map(t => `<span class="modal-tag">${t}</span>`).join('');

  const linksHTML = [
    p.web ? `<a href="${p.web}" target="_blank" rel="noopener" class="modal-link-btn primary">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      Ver sitio web
    </a>` : '',
    p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="modal-link-btn secondary">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
      Ver en GitHub
    </a>` : '',
  ].filter(Boolean).join('');

  const contributorsHTML = p.contributors.map(c => `
    <div class="contributor-chip">
      <div class="contributor-avatar">${c.initials}</div>
      <div>
        <div class="contributor-name">${c.name}</div>
        <div class="contributor-role">${c.role}</div>
      </div>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <div class="modal-gallery">${imagesHTML}</div>
    <h2 id="modal-title">${p.title}</h2>
    <p class="modal-desc">${p.desc}</p>

    <p class="modal-section-label">Herramientas y Tecnologías</p>
    <div class="modal-tags">${tagsHTML}</div>

    ${linksHTML ? `<p class="modal-section-label">Links</p><div class="modal-links">${linksHTML}</div>` : ''}

    <p class="modal-section-label">Contribuidores</p>
    <div class="modal-contributors">${contributorsHTML}</div>
  `;

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Focus trap – focus close button
  setTimeout(() => modalClose.focus(), 50);
}

function closeModal() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

cards.forEach(card => {
  card.addEventListener('click', () => openModal(Number(card.dataset.project)));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(Number(card.dataset.project));
    }
  });
});

modalClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Navbar ─────────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = ['hero', 'proyectos', 'sobre-mi', 'tecnologias', 'contacto'];
  const offset = 120;
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY + offset >= el.offsetTop) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace('#', '');
    a.classList.toggle('active', href === current);
  });
}

// ── Scroll Reveal ──────────────────────────────
const revealEls = document.querySelectorAll('.section, .tech-card, .about-body');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ── Tech cards stagger ─────────────────────────
const techCards = document.querySelectorAll('.tech-card');
techCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

// Disable section's own reveal so cards animate individually
const techSection = document.getElementById('tecnologias');
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      techCards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 90);
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
techObserver.observe(techSection);

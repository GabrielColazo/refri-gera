// =============================================
// main.js — REFRI-GERA
// =============================================

// ---------------------------------------------
// NAVBAR — efecto scroll
// ---------------------------------------------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
// ---------------------------------------------
// NAVBAR — cerrar menú mobile al hacer click
// en un link o por fuera del menú
// ---------------------------------------------
const navLinks = document.querySelectorAll('#menuPrincipal .nav-link');
const menuCollapse = document.getElementById('menuPrincipal');
let bsCollapse = null;

if (menuCollapse) {
  bsCollapse = new bootstrap.Collapse(menuCollapse, { toggle: false });

  // Cerrar al hacer click en un link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });
}

// Cerrar al hacer click por fuera
document.addEventListener('click', function (e) {
  if (
    bsCollapse &&
    menuCollapse &&
    menuCollapse.classList.contains('show') &&
    !menuCollapse.contains(e.target) &&
    !document.querySelector('.navbar-toggler').contains(e.target)
  ) {
    bsCollapse.hide();
  }
});

// ---------------------------------------------
// SMOOTH SCROLL
// ---------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---------------------------------------------
// PARTÍCULAS — copos de nieve en el hero
// ---------------------------------------------
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('i');
    el.className = 'bi bi-snow particle';
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${0.7 + Math.random() * 1.2}rem;
      animation-duration: ${6 + Math.random() * 10}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(el);
  }
})();

// ---------------------------------------------
// REVEAL ON SCROLL
// ---------------------------------------------
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));
}

// ---------------------------------------------
// GLIGHTBOX — tu código existente
// ---------------------------------------------
const lightbox = GLightbox({
  gallery: 'proyectos',
  touchNavigation: true,
  loop: true,
  autoplayVideos: false,
  descPosition: 'bottom',
});

// ---------------------------------------------
// FORMULARIO WEB3FORMS — tu código existente
// ---------------------------------------------
const form = document.getElementById('formContacto');
const btnEnviar = document.getElementById('btnEnviar');
const btnTexto = document.getElementById('btnTexto');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    btnEnviar.disabled = true;
    btnTexto.textContent = 'Enviando...';

    formSuccess.classList.remove('visible');
    formError.classList.remove('visible');

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();

      if (result.success) {
        formSuccess.classList.add('visible');
        form.reset();
      } else {
        formError.classList.add('visible');
      }

    } catch (error) {
      formError.classList.add('visible');
    } finally {
      btnEnviar.disabled = false;
      btnTexto.textContent = 'Enviar mensaje';
    }
  });
}
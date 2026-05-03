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

// ---------------------------------------------
// TILT 3D — efecto en tarjetas de proyectos
// Solo en dispositivos con mouse (no touch)
// ---------------------------------------------
const isTouchDevice = () =>
  window.matchMedia('(hover: none)').matches;

if (!isTouchDevice()) {
  const tiltCards = document.querySelectorAll('.proyecto-thumb');

  tiltCards.forEach(card => {
    const wrap = card.querySelector('.proyecto-img-wrap');

    card.addEventListener('mousemove', function (e) {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;

      // Máximo 12 grados de inclinación
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) *  12;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

      // Mover el brillo siguiendo el mouse
      const shine = card.querySelector('.proyecto-shine');
      if (shine) {
        const shineX = (x / rect.width)  * 100;
        const shineY = (y / rect.height) * 100;
        shine.style.background = `
          radial-gradient(
            circle at ${shineX}% ${shineY}%,
            rgba(255,255,255,0.18) 0%,
            transparent 60%
          )
        `;
        shine.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';

      const shine = card.querySelector('.proyecto-shine');
      if (shine) {
        shine.style.opacity = '0';
      }
    });
  });
}

// ---------------------------------------------
// GLIGHTBOX — galería de proyectos
// ---------------------------------------------
if (typeof GLightbox !== 'undefined') {
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    descPosition: 'description false',
    openEffect: 'zoom',
    closeEffect: 'zoom',
  });
}


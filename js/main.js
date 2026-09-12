/**
 * PORTAFOLIO WEB INTERACTIVO - JAVASCRIPT MODULAR
 * Estudiante: Jostin Fernando Chalan Mora
 * Funcionalidades interactivas cumpliendo con la rúbrica
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initProjectFilter();
  initSkillFilter();
  initProjectModal();
  initContactForm();
  initScrollTop();
  initDesignSystemHelpers();
});

/* ==========================================================================
   1. TEMA CLARO / OSCURO (CON PERSISTENCIA EN LOCALSTORAGE)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  }
}

/* ==========================================================================
   2. MENÚ RESPONSIVE PARA MÓVILES
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? '✕' : '☰';
  });

  // Cerrar el menú al hacer clic en un enlace
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '☰';
    });
  });
}

/* ==========================================================================
   3. FILTRADO INTERACTIVO DE PROYECTOS
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. FILTRADO INTERACTIVO DE HABILIDADES
   ========================================================================== */
function initSkillFilter() {
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. MODAL INTERACTIVO DE PROYECTOS (ACCESIBLE CON TECLADO)
   ========================================================================== */
const projectData = {
  ecosam: {
    title: 'EcoScam - Clasificación Inteligente de Residuos',
    category: 'Eco-Tech / AI',
    image: 'assets/EcoScam.png',
    contain: true,
    description: 'Aplicación innovadora enfocada en la clasificación inteligente de residuos para promover el reciclaje activo y la educación ecológica.',
    problem: 'Baja tasa de reciclaje urbano y contaminación de vertederos debido a la falta de separación correcta en hogares y colegios.',
    solution: 'Algoritmo de visión artificial y machine learning que identifica el tipo de residuo en tiempo real y ofrece instrucciones pedagógicas para su correcta reutilización.',
    technologies: ['Python', 'Machine Learning', 'TensorFlow', 'CSS3', 'Web'],
    github: 'https://github.com/Jostinchalan/EcoScam---Clasificacion-de-Residuos',
    demo: '#'
  },
  cuentia: {
    title: 'CUENTIA - Sistema de Gestión Contable',
    category: 'Web Application',
    image: 'assets/CuentIA.png',
    contain: false,
    description: 'Sistema web robusto para la administración de ingresos, egresos, conciliación bancaria y facturación segura en tiempo real.',
    problem: 'Pérdida de trazabilidad económica y vulnerabilidades de seguridad en microempresas que llevan sus cuentas en planillas manuales.',
    solution: 'Arquitectura modular con Django y PostgreSQL que implementa autenticación multiusuario con roles (RBAC) y reportes contables automáticos.',
    technologies: ['Django', 'Python', 'JavaScript', 'PostgreSQL', 'CSS3'],
    github: 'https://github.com/Jostinchalan/CUENTIA.git',
    demo: '#'
  },
  agromercado: {
    title: 'AgroMercado - Plataforma Agrícola Directa',
    category: 'E-commerce',
    image: 'assets/AgroMercado.png',
    contain: false,
    description: 'Plataforma de comercio electrónico diseñada para enlazar a pequeños agricultores con compradores directos a precios justos.',
    problem: 'Intermediación abusiva que castiga los ingresos del campesino y encarece la canasta básica familiar.',
    solution: 'Mercado virtual directo con catálogo dinámico de cosechas, geolocalización de parcelas y contacto inmediato vía WhatsApp.',
    technologies: ['React', 'Node.js', 'Tailwind CSS', 'Vite', 'TypeScript'],
    github: 'https://github.com/Jostinchalan/AgroMercado.git',
    demo: 'https://agro-mercado.vercel.app/'
  },
  guiospro: {
    title: 'GUIOSPRO-FLOSS - Hub de Software Libre',
    category: 'Open Source',
    image: 'assets/GuiosPro.png',
    contain: true,
    description: 'Portal pedagógico y comunitario enfocado en la promoción, uso y contribución activa a proyectos de software libre (FLOSS).',
    problem: 'Desorientación de estudiantes y noveles desarrolladores para participar en comunidades abiertas y comprender licencias libres.',
    solution: 'Hub interactivo con rutas de aprendizaje, guías de contribución a GitHub y directorio clasificado de herramientas FLOSS.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    github: 'https://github.com/Jostinchalan/GUIOSPRO-FLOSS',
    demo: 'https://guiospro-floss-1vve.vercel.app/'
  }
};

function initProjectModal() {
  const backdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalCloseAction = document.getElementById('modal-close-action');
  if (!backdrop) return;

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];
      if (data) {
        populateModal(data);
        openModal(backdrop);
      }
    });
  });

  const closeModal = () => {
    backdrop.classList.remove('is-active');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-active')) {
      closeModal();
    }
  });
}

function openModal(backdrop) {
  backdrop.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function populateModal(data) {
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-desc').textContent = data.description;
  document.getElementById('modal-problem').textContent = data.problem;
  document.getElementById('modal-solution').textContent = data.solution;

  const imgEl = document.getElementById('modal-img');
  imgEl.src = data.image;
  imgEl.alt = data.title;
  if (data.contain) {
    imgEl.classList.add('contain');
  } else {
    imgEl.classList.remove('contain');
  }

  const techContainer = document.getElementById('modal-techs');
  techContainer.innerHTML = '';
  data.technologies.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = tech;
    techContainer.appendChild(span);
  });

  const githubBtn = document.getElementById('modal-github');
  if (data.github && data.github !== '#') {
    githubBtn.href = data.github;
    githubBtn.style.display = 'inline-flex';
  } else {
    githubBtn.style.display = 'none';
  }

  const demoBtn = document.getElementById('modal-demo');
  if (data.demo && data.demo !== '#') {
    demoBtn.href = data.demo;
    demoBtn.style.display = 'inline-flex';
  } else {
    demoBtn.style.display = 'none';
  }
}

/* ==========================================================================
   6. VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO DE CONTACTO
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const successAlert = document.getElementById('form-success-alert');

  const validateField = (input, errorId, validatorFn) => {
    const errorEl = document.getElementById(errorId);
    const errorMsg = validatorFn(input.value);

    if (errorMsg) {
      input.classList.add('is-invalid');
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.style.display = 'flex';
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
      return true;
    }
  };

  const nameValidator = (val) => {
    if (!val.trim()) return 'El nombre es obligatorio.';
    if (val.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
    return null;
  };

  const emailValidator = (val) => {
    if (!val.trim()) return 'El correo electrónico es obligatorio.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Por favor, ingresa un correo válido.';
    return null;
  };

  const subjectValidator = (val) => {
    if (!val.trim()) return 'El asunto es obligatorio.';
    if (val.trim().length < 4) return 'El asunto debe tener al menos 4 caracteres.';
    return null;
  };

  const messageValidator = (val) => {
    if (!val.trim()) return 'El mensaje no puede estar vacío.';
    if (val.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
    return null;
  };

  nameInput.addEventListener('blur', () => validateField(nameInput, 'error-name', nameValidator));
  emailInput.addEventListener('blur', () => validateField(emailInput, 'error-email', emailValidator));
  subjectInput.addEventListener('blur', () => validateField(subjectInput, 'error-subject', subjectValidator));
  messageInput.addEventListener('blur', () => validateField(messageInput, 'error-message', messageValidator));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, 'error-name', nameValidator);
    const isEmailValid = validateField(emailInput, 'error-email', emailValidator);
    const isSubjectValid = validateField(subjectInput, 'error-subject', subjectValidator);
    const isMessageValid = validateField(messageInput, 'error-message', messageValidator);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Validando y enviando...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Mensaje';
        form.reset();

        if (successAlert) {
          successAlert.style.display = 'flex';
          setTimeout(() => {
            successAlert.style.display = 'none';
          }, 6000);
        }
      }, 1000);
    }
  });
}

/* ==========================================================================
   7. BOTÓN VOLVER ARRIBA (SCROLL TO TOP)
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('is-visible');
    } else {
      scrollBtn.classList.remove('is-visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   8. UTILIDADES DEL DESIGN SYSTEM (COPIADO DE HEX)
   ========================================================================== */
function initDesignSystemHelpers() {
  document.querySelectorAll('.ds-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-hex');
      if (color) {
        navigator.clipboard.writeText(color).then(() => {
          const originalText = swatch.textContent;
          swatch.textContent = '¡Copiado!';
          setTimeout(() => swatch.textContent = originalText, 1500);
        });
      }
    });
  });
}

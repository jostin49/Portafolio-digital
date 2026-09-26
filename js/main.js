/**
 * PORTAFOLIO WEB INTERACTIVO - JAVASCRIPT MODULAR
 * Estudiante: Jostin Fernando Chalan Mora
 * Funcionalidades interactivas cumpliendo con la rúbrica
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initProjectsCatalogModal();
  initProjectFilter();
  initSkillFilter();
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

  const currentTheme = localStorage.getItem('theme') || 'dark';

  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

const ICONS = {
  sun: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="3" x2="12" y2="5"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
  moon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
  menu: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
  close: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
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
    toggleBtn.innerHTML = isOpen ? ICONS.close : ICONS.menu;
  });

  // Cerrar el menú al hacer clic en un enlace
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = ICONS.menu;
    });
  });
}

/* ==========================================================================
   3. FILTRADO INTERACTIVO DE PROYECTOS
   ========================================================================== */
function initProjectFilter() {
  const filterNav = document.getElementById('project-filter-nav');
  if (!filterNav) return;

  const filterBtns = filterNav.querySelectorAll('.project-filter-btn');
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const projectCards = grid.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        const match = filter === 'all' || tags.includes(filter.toLowerCase());

        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('hidden');
          card.style.opacity = '';
          card.style.transform = '';
        }
      });
    });
  });
}


/* ==========================================================================
   4. FILTRADO INTERACTIVO DE HABILIDADES Y ACORDEÓN DE CATEGORÍAS
   ========================================================================== */
function initSkillFilter() {
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillPills = document.querySelectorAll('.skill-pill-btn');
  const modal = document.getElementById('skill-detail-modal');

  console.log("initSkillFilter running! modal found:", !!modal, "pills found:", skillPills.length);

  if (!modal) return;

  const closeBtn = document.getElementById('close-skill-modal');

  // Elements inside modal to populate
  const modLogo = document.getElementById('modal-skill-logo');
  const modName = document.getElementById('modal-skill-name');
  const modSubcat = document.getElementById('modal-skill-subcat');
  const modBadge = document.getElementById('modal-skill-badge');
  const modDesc = document.getElementById('modal-skill-desc');
  const modProgText = document.getElementById('modal-skill-prog-text');
  const modProgFill = document.getElementById('modal-skill-prog-fill');

  const openSkillModal = (btn) => {
    // Populate modal data
    modLogo.src = btn.getAttribute('data-logo');
    modName.textContent = btn.getAttribute('data-name');
    modSubcat.textContent = btn.getAttribute('data-subcat');
    modDesc.textContent = btn.getAttribute('data-desc');

    modBadge.textContent = btn.getAttribute('data-badge');
    modBadge.className = 'skill-badge ' + btn.getAttribute('data-badge-class');

    const progVal = btn.getAttribute('data-prog');
    modProgText.textContent = progVal;

    // Reset progress bar animation
    modProgFill.style.width = '0%';

    // Show modal
    modal.classList.add('is-active');
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Trigger progress bar animation
    setTimeout(() => {
      modProgFill.style.width = progVal;
    }, 300);
  };

  const closeSkillModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      modal.setAttribute('hidden', '');
    }, 300);
  };

  // Asignar eventos a píldoras
  skillPills.forEach(btn => {
    btn.addEventListener('click', () => {
      openSkillModal(btn);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSkillModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeSkillModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeSkillModal();
    }
  });

  // Filtros superiores
  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      skillPills.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'inline-flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. CONTROL DE LA VENTANA MODAL DEL CATÁLOGO DE PROYECTOS
   ========================================================================== */
function initProjectsCatalogModal() {
  const catalogModal = document.getElementById('projects-catalog-modal');
  const openBtn = document.getElementById('open-projects-catalog-btn');
  const closeBtn = document.getElementById('close-catalog-modal-btn');
  const teaserCards = document.querySelectorAll('.showcase-teaser-card');

  if (!catalogModal) return;

  const openCatalog = (targetProjectId = null) => {
    catalogModal.classList.add('is-active');
    catalogModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    if (targetProjectId) {
      const allFilterBtn = catalogModal.querySelector('.project-filter-btn[data-category="all"]');
      if (allFilterBtn) allFilterBtn.click();

      const targetCard = catalogModal.querySelector(`.project-card[data-project-id="${targetProjectId}"]`);
      if (targetCard) {
        setTimeout(() => {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
      }
    }
  };

  const closeCatalog = () => {
    catalogModal.classList.remove('is-active');
    catalogModal.setAttribute('hidden', '');
    document.body.style.overflow = 'auto';
  };

  if (openBtn) {
    openBtn.addEventListener('click', () => openCatalog());
  }

  teaserCards.forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      openCatalog(projId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCatalog);
  }

  catalogModal.addEventListener('click', (e) => {
    if (e.target === catalogModal) {
      closeCatalog();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && catalogModal.classList.contains('is-active')) {
      closeCatalog();
    }
  });
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

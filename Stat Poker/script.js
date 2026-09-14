/* ═══════════════════════════════
   STATPOKER — INTERACTIVE SCRIPTS
   ═══════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initFallingElements();
  initSmoothScroll();
  initFormHandler();
  initHeaderScroll();
  initAuthFlow();
  initDashboard();
  initPromoModal();
});

/* ══════════════════════════════
   ANIMATION 1: FALLING CHIPS & CARDS
   ══════════════════════════════ */
function initFallingElements() {
  // Respect prefers-reduced-motion
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) return;

  const container = document.getElementById('fallingElements');
  if (!container) return;

  // SVG poker chip generator — classic casino flat design
  function createChipSVG(fillColor) {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="${fillColor}"/>
      <rect x="41" y="1" width="18" height="13" rx="4" ry="4" fill="white"/>
      <rect x="41" y="1" width="18" height="13" rx="4" ry="4" fill="white" transform="rotate(90,50,50)"/>
      <rect x="41" y="1" width="18" height="13" rx="4" ry="4" fill="white" transform="rotate(180,50,50)"/>
      <rect x="41" y="1" width="18" height="13" rx="4" ry="4" fill="white" transform="rotate(270,50,50)"/>
      <rect x="46" y="2" width="8" height="8" rx="2" ry="2" fill="white" transform="rotate(45,50,50)"/>
      <rect x="46" y="2" width="8" height="8" rx="2" ry="2" fill="white" transform="rotate(135,50,50)"/>
      <rect x="46" y="2" width="8" height="8" rx="2" ry="2" fill="white" transform="rotate(225,50,50)"/>
      <rect x="46" y="2" width="8" height="8" rx="2" ry="2" fill="white" transform="rotate(315,50,50)"/>
      <circle cx="50" cy="50" r="34" stroke="white" stroke-width="2.5" fill="none"/>
      <circle cx="50" cy="50" r="31" fill="${fillColor}"/>
    </svg>`;
  }

  // 4 chip colors
  const chipColors = [
    { color: '#1a1a1a', cls: 'chip-black' },
    { color: '#2b4fd8', cls: 'chip-blue' },
    { color: '#e0332b', cls: 'chip-red' },
    { color: '#3aa655', cls: 'chip-green' }
  ];

  // Card suits (kept as text)
  const cardSuits = [
    { text: '♠', color: '#ccc' },
    { text: '♥', color: '#e0332b' },
    { text: '♣', color: '#ccc' },
    { text: '♦', color: '#e0332b' }
  ];

  const MAX_ITEMS = 10;

  function createFallingItem() {
    const el = document.createElement('div');
    el.className = 'falling-item';

    const isChip = Math.random() < 0.5;

    if (isChip) {
      const chip = chipColors[Math.floor(Math.random() * chipColors.length)];
      el.innerHTML = createChipSVG(chip.color);
      el.classList.add(chip.cls);
      // Chip size (24-40px)
      const size = 24 + Math.random() * 16;
      el.style.width = size + 'px';
      el.style.height = size + 'px';
    } else {
      const card = cardSuits[Math.floor(Math.random() * cardSuits.length)];
      el.textContent = card.text;
      el.style.color = card.color;
      // Card suit size (18-36px)
      const size = 18 + Math.random() * 18;
      el.style.fontSize = size + 'px';
    }

    // Random horizontal position
    el.style.left = (Math.random() * 100) + '%';

    // Random opacity (10-25%)
    const opacity = 0.10 + Math.random() * 0.15;
    el.style.opacity = opacity;

    // Random drift (-60px to 60px)
    const drift = (Math.random() - 0.5) * 120;
    el.style.setProperty('--drift', drift + 'px');

    // Random rotation
    const rot = (Math.random() - 0.5) * 720;
    el.style.setProperty('--rot', rot + 'deg');

    // Random duration (12-25s)
    const duration = 12 + Math.random() * 13;
    el.style.setProperty('--dur', duration + 's');

    // Random delay for staggering
    const delay = Math.random() * 8;
    el.style.setProperty('--delay', delay + 's');

    container.appendChild(el);

    // Remove and recreate after animation completes
    const totalTime = (duration + delay) * 1000;
    setTimeout(() => {
      el.remove();
      createFallingItem();
    }, totalTime);
  }

  // Create initial batch
  for (let i = 0; i < MAX_ITEMS; i++) {
    createFallingItem();
  }
}

/* ══════════════════════════════
   SMOOTH SCROLL FOR NAV LINKS
   ══════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href.length <= 1) {
        e.preventDefault();
        return;
      }
      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      } catch (err) {
        e.preventDefault();
      }
    });
  });
}

/* ══════════════════════════════
   HEADER SCROLL EFFECT
   ══════════════════════════════ */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.85)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.04)';
    }
  }, { passive: true });
}

/* ══════════════════════════════
   CONTACT FORM HANDLER
   ══════════════════════════════ */
function initFormHandler() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn');
    const originalText = btn.textContent;

    btn.textContent = 'ENVIADO ✓';
    btn.style.background = '#4fd1a5';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 2500);
  });
}

/* ══════════════════════════════
   AUTH FLOW — LOGIN & 2FA
   ══════════════════════════════ */
function initAuthFlow() {
  const overlayLogin = document.getElementById('overlayLogin');
  const overlay2FA   = document.getElementById('overlay2FA');
  const overlayDash  = document.getElementById('overlayDashboard');

  if (!overlayLogin || !overlay2FA || !overlayDash) return;

  // ── Helpers ──
  function showLogin() {
    overlay2FA.hidden = true;
    overlayLogin.hidden = false;
    document.body.style.overflow = 'hidden';
    const loginUser = document.getElementById('loginUser');
    if (loginUser) loginUser.focus();
  }

  function showTwoFactor() {
    overlayLogin.hidden = true;
    overlay2FA.hidden = false;
    document.body.style.overflow = 'hidden';
    // reset OTP digits
    const otpDigits = document.querySelectorAll('.auth-otp__digit');
    otpDigits.forEach(inp => inp.value = '');
    const firstOtp = document.querySelector('.auth-otp__digit');
    if (firstOtp) firstOtp.focus();
  }

  function showDashboard() {
    overlayLogin.hidden = true;
    overlay2FA.hidden   = true;
    overlayDash.hidden  = false;
    document.body.style.overflow = 'hidden';
    overlayDash.scrollTop = 0;
  }

  function closeLoginModals() {
    overlayLogin.hidden = true;
    overlay2FA.hidden   = true;
    if (overlayDash.hidden) {
      document.body.style.overflow = '';
    }
  }

  // ── Open Login ──
  const btnOpen = document.getElementById('btnOpenLogin');
  if (btnOpen) {
    btnOpen.addEventListener('click', (e) => {
      e.preventDefault();
      showLogin();
    });
  }

  // ── Login → 2FA ──
  const btnLogin = document.getElementById('btnLogin');
  if (btnLogin) {
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault();
      showTwoFactor();
    });
  }

  // Allow pressing Enter in login inputs
  const loginUser = document.getElementById('loginUser');
  const loginPass = document.getElementById('loginPass');
  [loginUser, loginPass].forEach(input => {
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          showTwoFactor();
        }
      });
    }
  });

  // ── Login → Voltar ao site ──
  const btnLoginBack = document.getElementById('btnLoginBack');
  if (btnLoginBack) {
    btnLoginBack.addEventListener('click', (e) => {
      e.preventDefault();
      closeLoginModals();
    });
  }

  // ── 2FA → Confirmar ──
  const btnConfirm = document.getElementById('btnConfirm2FA');
  if (btnConfirm) {
    btnConfirm.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboard();
    });
  }

  // ── 2FA → Voltar ao login ──
  const btn2FABack = document.getElementById('btn2FABack');
  if (btn2FABack) {
    btn2FABack.addEventListener('click', (e) => {
      e.preventDefault();
      showLogin();
    });
  }

  // ── OTP keyboard behavior & Auto submit ──
  const otpDigits = document.querySelectorAll('.auth-otp__digit');

  otpDigits.forEach((input, i) => {
    // Only allow digits
    input.addEventListener('input', () => {
      const digit = input.value.replace(/[^0-9]/g, '').slice(-1);
      input.value = digit;
      if (digit && i < otpDigits.length - 1) {
        otpDigits[i + 1].focus();
      } else if (digit && i === otpDigits.length - 1) {
        const allFilled = Array.from(otpDigits).every(d => d.value.length === 1);
        if (allFilled) {
          setTimeout(showDashboard, 150);
        }
      }
    });

    // Backspace jumps to previous / Enter submits
    input.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !input.value && i > 0) {
        otpDigits[i - 1].focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        showDashboard();
      }
    });

    // Paste: distribute digits across fields
    input.addEventListener('paste', e => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData)
        .getData('text')
        .replace(/[^0-9]/g, '')
        .slice(0, 6);
      if (!text) return;
      text.split('').forEach((ch, idx) => {
        if (otpDigits[idx]) otpDigits[idx].value = ch;
      });
      const lastFilled = Math.min(text.length, otpDigits.length - 1);
      otpDigits[lastFilled].focus();
      if (text.length === 6) {
        setTimeout(showDashboard, 150);
      }
    });
  });

  // ── Close overlay on background click ──
  [overlayLogin, overlay2FA].forEach(overlay => {
    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeLoginModals();
      });
    }
  });

  // ── Close on Escape (only modals, not dashboard) ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!overlayLogin.hidden || !overlay2FA.hidden) {
        closeLoginModals();
      }
    }
  });
}

/* ══════════════════════════════
   DASHBOARD INTERACTIONS
   ══════════════════════════════ */
function initDashboard() {
  // ── Date dropdown ──
  const dateBtn  = document.getElementById('dateDropBtn');
  const dateMenu = document.getElementById('dateDropMenu');

  if (dateBtn && dateMenu) {
    dateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dateMenu.hidden = !dateMenu.hidden;
    });

    dateMenu.querySelectorAll('.dash-dropdown__item').forEach(item => {
      item.addEventListener('click', () => {
        dateBtn.childNodes[0].textContent = item.textContent + ' ';
        dateMenu.hidden = true;
      });
    });

    document.addEventListener('click', () => {
      if (!dateMenu.hidden) dateMenu.hidden = true;
    });
  }

  // ── Logout → volta para o site ──
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('overlayDashboard').hidden = true;
      document.body.style.overflow = '';
    });
  }

  // ── Mobile Sidebar Drawer ──
  const dashMenuBtn = document.getElementById('dashMenuBtn');
  const dashCloseSidebarBtn = document.getElementById('dashCloseSidebarBtn');
  const dashSidebar = document.getElementById('dashSidebar');
  const dashSidebarBackdrop = document.getElementById('dashSidebarBackdrop');

  function openMobileSidebar() {
    if (dashSidebar) dashSidebar.classList.add('dash-sidebar--open');
    if (dashSidebarBackdrop) dashSidebarBackdrop.classList.add('dash-sidebar-backdrop--visible');
  }

  function closeMobileSidebar() {
    if (dashSidebar) dashSidebar.classList.remove('dash-sidebar--open');
    if (dashSidebarBackdrop) dashSidebarBackdrop.classList.remove('dash-sidebar-backdrop--visible');
  }

  if (dashMenuBtn) dashMenuBtn.addEventListener('click', openMobileSidebar);
  if (dashCloseSidebarBtn) dashCloseSidebarBtn.addEventListener('click', closeMobileSidebar);
  if (dashSidebarBackdrop) dashSidebarBackdrop.addEventListener('click', closeMobileSidebar);

  // ── Sidebar nav: active state & view toggle ──
  const topbarTitle = document.getElementById('topbarTitle');
  document.querySelectorAll('.dash-nav__item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active state
      document.querySelectorAll('.dash-nav__item').forEach(l => l.classList.remove('dash-nav__item--active'));
      link.classList.add('dash-nav__item--active');

      // Update Topbar Title
      if (topbarTitle) {
        // Pega apenas o texto do link, ignorando o emoji/ícone
        const iconSpan = link.querySelector('.dash-nav__icon');
        let text = link.textContent;
        if (iconSpan) {
          text = text.replace(iconSpan.textContent, '').trim();
        }
        topbarTitle.textContent = text;
      }

      // Toggle views
      const viewId = link.getAttribute('data-view');
      if (viewId) {
        document.querySelectorAll('.dash-view').forEach(v => v.hidden = true);
        const targetView = document.getElementById('view-' + viewId);
        if (targetView) targetView.hidden = false;
      }

      // Fecha a sidebar mobile após selecionar uma aba
      closeMobileSidebar();
    });
  });
}

/* ══════════════════════════════
   PROMO MODAL: OFERTA DE LANÇAMENTO
   ══════════════════════════════ */
function initPromoModal() {
  const overlayPromo = document.getElementById('overlayPromo');
  const btnClosePromo = document.getElementById('btnClosePromo');
  const btnAproveitarPromo = document.getElementById('btnAproveitarPromo');

  if (!overlayPromo) return;

  function openPromo() {
    overlayPromo.removeAttribute('hidden');
    // Força reflow para garantir a transição CSS suave
    void overlayPromo.offsetWidth;
    overlayPromo.classList.add('is-visible');
  }

  function closePromo() {
    overlayPromo.classList.remove('is-visible');
    setTimeout(() => {
      overlayPromo.setAttribute('hidden', '');
    }, 320);
  }

  // Abre automaticamente ao carregar a página com um delay suave de 400ms
  setTimeout(openPromo, 400);

  if (btnClosePromo) {
    btnClosePromo.addEventListener('click', closePromo);
  }

  if (btnAproveitarPromo) {
    btnAproveitarPromo.addEventListener('click', (e) => {
      closePromo();
      // O link natural com href="#planos" já cuida da navegação suave
    });
  }

  // Fechar ao clicar no backdrop (fora do card)
  overlayPromo.addEventListener('click', (e) => {
    if (e.target === overlayPromo) {
      closePromo();
    }
  });

  // Fechar com a tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlayPromo.classList.contains('is-visible')) {
      closePromo();
    }
  });
}


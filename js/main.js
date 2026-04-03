/**
 * KINOOF TOP V2 — MAIN JAVASCRIPT
 * Premium Cinema Experience
 */

'use strict';

// ============================================================
// LOADER
// ============================================================
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1400);
  });
})();

// ============================================================
// NAV — scroll effect + mobile menu
// ============================================================
(function initNav() {
  const nav = document.querySelector('.nav');
  const menuBtn = document.getElementById('menuBtn');
  const navMobile = document.getElementById('navMobile');
  const overlay = document.getElementById('menuOverlay');

  if (nav) {
    let lastScroll = 0;

    const onScroll = () => {
      const currentScroll = window.scrollY;

      nav.classList.toggle('scrolled', currentScroll > 50);

      if (currentScroll > lastScroll && currentScroll > 120) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (menuBtn && navMobile && overlay) {
    menuBtn.addEventListener('click', () => {
      navMobile.classList.toggle("open");
      overlay.classList.toggle("active");
      menuBtn.textContent = navMobile.classList.contains('open') ? '✕' : '☰';
    });

    navMobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navMobile.classList.remove('open');
        overlay.classList.remove('active');
        menuBtn.textContent = '☰';
      });
    });

    overlay.addEventListener('click', () => {
      navMobile.classList.remove('open');
      overlay.classList.remove('active');
      menuBtn.textContent = '☰';
    });
  }

  // ✅ ACTIVE LINK FIX (moved inside)
  const links = document.querySelectorAll('.nav-links a, .nav-mobile a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();

// ============================================================
// CURSOR GLOW (desktop only)
// ============================================================
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

// ============================================================
// SCROLL REVEAL
// ============================================================
(function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

// ============================================================
// COUNTDOWN
// ============================================================
function initCountdown(targetDateStr) {
  const containers = document.querySelectorAll('[data-countdown]');
  if (!containers.length) return;

  const target = new Date(targetDateStr).getTime();

  function tick() {
    const now = Date.now();
    const diff = target - now;

    containers.forEach(container => {
      const d = container.querySelector('[data-cd-days]');
      const h = container.querySelector('[data-cd-hours]');
      const m = container.querySelector('[data-cd-minutes]');
      const s = container.querySelector('[data-cd-seconds]');

      if (diff <= 0) {
        [d, h, m, s].forEach(el => { if (el) el.textContent = '00'; });
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      if (d) d.textContent = String(days).padStart(2, '0');
      if (h) h.textContent = String(hours).padStart(2, '0');
      if (m) m.textContent = String(mins).padStart(2, '0');
      if (s) s.textContent = String(secs).padStart(2, '0');
    });
  }

  tick();
  setInterval(tick, 1000);
}

// ============================================================
// TOAST NOTIFICATION
// ============================================================
function showToast(message, sub, type = 'success') {
  const icon = type === 'success' ? '✓' : '✕';
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-text">
      <p>${message}</p>
      ${sub ? `<span>${sub}</span>` : ''}
    </div>
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

// ============================================================
// FORM — CONTACT (POST to /tables/contacts)
// ============================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span style="opacity:.6">Envoi en cours…</span>';
    btn.disabled = true;

    const data = {
      nom: form.nom?.value?.trim() || '',
      email: form.email?.value?.trim() || '',
      telephone: form.telephone?.value?.trim() || '',
      message: form.message?.value?.trim() || '',
      type: form.type?.value || 'contact',
      status: 'new'
    };

    try {
      const res = await fetch('tables/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showToast('Message envoyé !', 'Nous vous répondrons dans les 24h.', 'success');
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      showToast('Erreur', 'Veuillez réessayer ou nous contacter sur WhatsApp.', 'error');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}

// ============================================================
// FORM — RESERVATION (POST to /tables/reservations)
// ============================================================
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span style="opacity:.6">Envoi en cours…</span>';
    btn.disabled = true;

    const data = {
      nom: form.nom?.value?.trim() || '',
      email: form.email?.value?.trim() || '',
      telephone: form.telephone?.value?.trim() || '',
      places: parseInt(form.places?.value, 10) || 1,
      event: 'Kinoof Top Sessions #01 — 30 Avril 2026',
      status: 'pending'
    };

    try {
      const res = await fetch('tables/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showToast('Réservation reçue !', 'Vous recevrez une confirmation sous 24h.', 'success');
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      showToast('Erreur', 'Veuillez réessayer ou réserver via WhatsApp.', 'error');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}

// ============================================================
// FORM — PARTNERSHIP (POST to /tables/contacts)
// ============================================================
function initPartnershipForm() {
  const form = document.getElementById('partnershipForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span style="opacity:.6">Envoi en cours…</span>';
    btn.disabled = true;

    const data = {
      nom: form.nom?.value?.trim() || '',
      email: form.email?.value?.trim() || '',
      telephone: form.telephone?.value?.trim() || '',
      message: `[PARTENARIAT — ${form.pack?.value || ''}] ${form.message?.value?.trim() || ''}`,
      type: 'partenariat',
      status: 'new'
    };

    try {
      const res = await fetch('tables/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showToast('Demande envoyée !', 'Notre équipe vous contactera rapidement.', 'success');
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      showToast('Erreur', 'Veuillez réessayer ou nous contacter directement.', 'error');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}

// ============================================================
// DECK DOWNLOAD
// ============================================================
function initDeckDownload() {
  const btns = document.querySelectorAll('[data-deck-download]');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Opens the deck HTML page (browser can print as PDF)
      window.open('assets/kinoof-top-deck.pdf.html', '_blank');
    });
  });
}

// ============================================================
// TABS
// ============================================================
function initTabs() {
  document.querySelectorAll('.tabs-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const container = nav.closest('[data-tabs]') || document;
    const contents = container.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const panel = container.querySelector(`.tab-content[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// ============================================================
// SMOOTH ANCHOR SCROLL
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============================================================
// CARD MOUSE GLOW
// ============================================================
function initCardGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mouse-x', x);
      card.style.setProperty('--mouse-y', y);
    });
  });
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    let start = null;
    let started = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = (target * eased).toFixed(target % 1 !== 0 ? 1 : 0) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
  });
}

// ============================================================
// INIT ALL
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initReservationForm();
  initPartnershipForm();
  initDeckDownload();
  initTabs();
  initSmoothScroll();
  initCardGlow();
  initCounters();

  // Countdown: 01 may 2026 16:00 (Kinshasa time = UTC+1)
  initCountdown('2026-05-01T16:00:00+01:00');
});

//  PAGE TRANSITION 
document.addEventListener("DOMContentLoaded", () => {
  const transition = document.querySelector(".page-transition");

  if (!transition) return; // safety

  const links = document.querySelectorAll("a[href]");

  links.forEach(link => {
    link.addEventListener("click", e => {
      const url = link.getAttribute("href");

      // Ignore special links
      if (
        !url ||
        url.startsWith("#") ||
        url.startsWith("mailto:") ||
        url.startsWith("tel:") ||
        link.target === "_blank"
      ) return;

      e.preventDefault();

      // Activate transition
      transition.classList.add("active");

      // Faster + smoother
      setTimeout(() => {
        window.location.href = url;
      }, 350);
    });
  });
});


// 🔥 CRITICAL FIX (this was missing)
window.addEventListener("load", () => {
  const transition = document.querySelector(".page-transition");

  if (transition) {
    transition.classList.remove("active");
    transition.style.opacity = "0";
  }
});

// ✨ SCROLL REVEAL (FIXED)
window.addEventListener("load", () => {
  const reveals = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
});

// 🧲 MAGNETIC BUTTONS (FIXED)
window.addEventListener("load", () => {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0, 0)`;
    });
  });
});

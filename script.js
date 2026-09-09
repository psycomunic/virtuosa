/* ============================================================
   VIRTUOSA - Blumenau Vila Nova | interações da landing page
   ============================================================ */
(function () {
  'use strict';

  /* ---- 1. Links de WhatsApp ---------------------------------
     Altere apenas estas duas constantes para trocar o número
     ou a mensagem padrão de todos os CTAs da página.
  ------------------------------------------------------------ */
  var WHATSAPP_PHONE = '5547992350986'; // 55 (BR) + 47 (DDD) + número
  var DEFAULT_MSG = 'Olá, estava no site e quero agendar minha avaliação gratuita';

  function waLink(msg) {
    return 'https://api.whatsapp.com/send?phone=' + WHATSAPP_PHONE +
           '&text=' + encodeURIComponent(msg || DEFAULT_MSG);
  }

  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', waLink(el.getAttribute('data-msg')));
  });

  /* ---- 2. Header com sombra ao rolar ------------------------ */
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- 3. Placeholder quando a foto ainda não existe -------- */
  document.querySelectorAll('[data-slot]').forEach(function (slot) {
    var img = slot.querySelector('img');
    if (!img) { slot.classList.add('is-empty'); return; }
    function markEmpty() { slot.classList.add('is-empty'); img.remove(); }
    img.addEventListener('error', markEmpty);
    if (img.complete && img.naturalWidth === 0) markEmpty();
  });

  /* ---- 4. Carrossel de depoimentos -------------------------- */
  var track = document.getElementById('depoimentos-track');
  if (track) {
    function step() {
      var card = track.querySelector('.testimonial');
      return card ? card.getBoundingClientRect().width + 18 : track.clientWidth;
    }
    var prev = document.querySelector('[data-carousel-prev]');
    var next = document.querySelector('[data-carousel-next]');
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  }

  /* ---- 5. Animação de entrada ------------------------------- */
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ---- 6. FAQ: só uma pergunta aberta por vez --------------- */
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  /* ---- 8. Menu de navegacao (mobile) --------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---- 9. Ano do rodapé ---------------------------------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();

(function () {
  var heroImages = [
    './index_files/rosane-hero-1.jpg',
    './index_files/rosane-hero-2.jpg',
    './index_files/rosane-hero-3-upscaled.jpeg'
  ];

  heroImages.forEach(function (src) {
    var img = new Image();
    img.decoding = 'async';
    img.src = src;
  });

  document.querySelectorAll('.nav-link').forEach(function (link) {
    if (link.textContent.trim() === 'About') link.textContent = 'Sobre';
    if (link.textContent.trim() === 'Contact') link.textContent = 'Contato';
  });

  var fp = document.querySelector('.fp');
  if (fp) fp.textContent = 'Projeto em Destaque';

  var heroLogo = document.querySelector('.hero-logo');
  var root = document.documentElement;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setFeatureTitle() {
    var vh = window.innerHeight || 1;
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    var index = 1;
    if (y > vh * 1.65) index = 2;
    if (y > vh * 2.55) index = 3;
    document.body.setAttribute('data-feature-index', String(index));
  }

  function setHeroMotion() {
    var vh = window.innerHeight || 1;
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    var turn = clamp(y / (vh * .78), 0, 1);
    document.body.classList.toggle('rbp-scrolling-home', turn > .01);
    root.style.setProperty('--rbp-hero-turn', turn.toFixed(4));

    if (heroLogo) {
      var rect = heroLogo.getBoundingClientRect();
      var currentCenterX = rect.left + rect.width / 2;
      var currentCenterY = rect.top + rect.height / 2;
      var targetX = 168;
      var targetY = 78;
      var scale = 1 - turn * .72;
      root.style.setProperty('--rbp-logo-scale', scale.toFixed(4));
      root.style.setProperty('--rbp-logo-x', ((targetX - currentCenterX) * turn).toFixed(2));
      root.style.setProperty('--rbp-logo-y', ((targetY - currentCenterY) * turn).toFixed(2));
    }

    setFeatureTitle();
  }

  var ticking = false;
  function requestMotionUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      setHeroMotion();
    });
  }

  window.addEventListener('scroll', requestMotionUpdate, { passive: true });
  window.addEventListener('resize', requestMotionUpdate);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setHeroMotion);
  } else {
    setHeroMotion();
  }
})();

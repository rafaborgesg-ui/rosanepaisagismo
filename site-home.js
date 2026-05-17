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
  var motionLogo = document.querySelector('.hero-logo-motion');
  var root = document.documentElement;

  if (!motionLogo && heroLogo) {
    motionLogo = document.createElement('img');
    motionLogo.className = 'hero-logo-motion';
    motionLogo.src = './rosane-logo-hero-white.png';
    motionLogo.alt = 'Rosane Borges Paisagismo';
    document.body.appendChild(motionLogo);
  }

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

    if (motionLogo) {
      var isMobile = window.innerWidth < 768;
      var finalScale = isMobile ? .34 : .42;
      var startX = window.innerWidth / 2;
      var startY = window.innerHeight * (isMobile ? .40 : .36);
      var logoWidth = Math.min(isMobile ? 430 : 820, window.innerWidth * (isMobile ? .86 : .76));
      var targetLeft = isMobile ? 92 : 132;
      var targetTop = isMobile ? 34 : 32;
      var targetX = targetLeft + (logoWidth * finalScale) / 2;
      var targetY = targetTop + (motionLogo.offsetHeight * finalScale) / 2;
      var eased = turn < .5 ? 2 * turn * turn : 1 - Math.pow(-2 * turn + 2, 2) / 2;
      var x = startX + (targetX - startX) * eased;
      var yPos = startY + (targetY - startY) * eased;
      var scale = 1 - eased * (1 - finalScale);
      root.style.setProperty('--rbp-motion-x', x.toFixed(2));
      root.style.setProperty('--rbp-motion-y', yPos.toFixed(2));
      root.style.setProperty('--rbp-motion-scale', scale.toFixed(4));
      root.style.setProperty('--rbp-motion-opacity', document.body.classList.contains('rbp-loaded') ? '1' : '0');
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
  window.addEventListener('resize', function () {
    requestMotionUpdate();
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setHeroMotion);
  } else {
    setHeroMotion();
  }

  setTimeout(requestMotionUpdate, 4700);
  setTimeout(requestMotionUpdate, 5450);
})();

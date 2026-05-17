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
  var logoBaseRect = null;

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
      if (!logoBaseRect || turn < .01) {
        var fresh = heroLogo.getBoundingClientRect();
        logoBaseRect = {
          centerX: fresh.left + fresh.width / 2,
          centerY: fresh.top + fresh.height / 2,
          width: fresh.width,
          height: fresh.height
        };
      }

      var isMobile = window.innerWidth < 768;
      var finalScale = isMobile ? .34 : .42;
      var targetLeft = isMobile ? 90 : 138;
      var targetTop = isMobile ? 34 : 42;
      var targetX = targetLeft + (logoBaseRect.width * finalScale) / 2;
      var targetY = targetTop + (logoBaseRect.height * finalScale) / 2;
      var scale = 1 - turn * (1 - finalScale);
      root.style.setProperty('--rbp-logo-scale', scale.toFixed(4));
      root.style.setProperty('--rbp-logo-x', ((targetX - logoBaseRect.centerX) * turn).toFixed(2));
      root.style.setProperty('--rbp-logo-y', ((targetY - logoBaseRect.centerY) * turn).toFixed(2));
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
    logoBaseRect = null;
    requestMotionUpdate();
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setHeroMotion);
  } else {
    setHeroMotion();
  }
})();

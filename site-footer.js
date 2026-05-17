(function () {
  function setActiveLink(root) {
    var file = window.location.pathname.split('/').pop() || 'index.html';
    root.querySelectorAll('[data-match]').forEach(function (link) {
      if (link.getAttribute('data-match') === file) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function setCurrentYear(root) {
    root.querySelectorAll('[data-year]').forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  function loadFooter() {
    var slots = document.querySelectorAll('[data-site-footer]');
    if (!slots.length) return;

    if (document.querySelector('.fp-section-sticky [data-site-footer]')) {
      document.body.classList.add('has-site-footer-in-home');
    }

    fetch('./site-footer.html', { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) throw new Error('Footer indisponivel');
        return response.text();
      })
      .then(function (html) {
        slots.forEach(function (slot) {
          slot.innerHTML = html;
          setActiveLink(slot);
          setCurrentYear(slot);
        });
      })
      .catch(function () {
        slots.forEach(function (slot) {
          slot.innerHTML = '<footer class="site-footer"><div class="site-footer__inner"><p>Rosane Borges Paisagismo</p></div></footer>';
        });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }
})();

/* Поведение общей навигации: раскрытие мобильного меню и тень при прокрутке. */
(function () {
  var header = document.getElementById('site-nav');
  var menu = document.getElementById('site-nav-links');
  var burger = header && header.querySelector('.site-nav-burger');
  if (!header || !menu || !burger) return;
  document.documentElement.classList.add('nav-ready');

  function closeMenu() {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
  }

  burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      burger.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) closeMenu();
  });

  function updateScrolled() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', updateScrolled, { passive: true });
  updateScrolled();
})();

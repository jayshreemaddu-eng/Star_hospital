/* Shared JS: mobile nav + simple form UX */
(function () {
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  // Mobile menu
  var toggle = qs('[data-nav-toggle]');
  var mobile = qs('[data-nav-mobile]');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var isOpen = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Active link (based on current file name)
  var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  qsa('a[data-nav]').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === current) a.classList.add('active');
  });

  // Appointment/contact form "submit" (no backend)
  var form = qs('[data-appointment-form]');
  if (form) {
    var toast = qs('[data-form-toast]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic required validation
      var required = qsa('[required]', form);
      var firstInvalid = required.find(function (el) { return !String(el.value || '').trim(); });
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (toast) toast.classList.add('show');
      form.reset();

      // Auto-hide toast
      setTimeout(function () {
        if (toast) toast.classList.remove('show');
      }, 5000);
    });
  }
})();


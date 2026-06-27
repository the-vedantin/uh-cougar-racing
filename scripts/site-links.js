(function () {
  var CONTACT_URL = 'inquiry-services-page.html#contact';

  function linkText(link) {
    return (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function isContactLink(link) {
    var text = linkText(link);
    var href = (link.getAttribute('href') || '').toLowerCase();
    return text === 'contact' ||
      text === 'contact us here.' ||
      text === 'contact us here' ||
      (/contact us here/.test(text) && /index\.html|inquiry-services-page|^#?$/.test(href));
  }

  function fixLinks() {
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i += 1) {
      if (isContactLink(links[i])) {
        links[i].setAttribute('href', CONTACT_URL);
      }
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a') : null;
    if (link && isContactLink(link)) {
      link.setAttribute('href', CONTACT_URL);
    }
  }, true);

  function start() {
    fixLinks();
    setTimeout(fixLinks, 250);
    setTimeout(fixLinks, 1000);
    setTimeout(fixLinks, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

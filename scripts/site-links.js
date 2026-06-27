(function () {
  var CONTACT_URL = 'index.html#contact';
  var CONTACT_EMAIL = 'info.uhfsae@gmail.com';

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

  function isHomePage() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    return page === 'index.html' || page === '';
  }

  function isVisible(element) {
    if (!element) return false;
    var rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function findContactTarget() {
    var explicit = document.getElementById('contact') || document.getElementById('cr-contact');
    if (isVisible(explicit)) return explicit;

    var headings = document.querySelectorAll('h1, h2, h3, p, span, div');
    for (var i = 0; i < headings.length; i += 1) {
      var text = (headings[i].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (text === 'get in touch' && isVisible(headings[i])) {
        return headings[i];
      }
    }
    return null;
  }

  function scrollToHomeContact() {
    if (!isHomePage() || window.location.hash !== '#contact') return;
    var target = findContactTarget();
    if (target) {
      target.scrollIntoView({ block: 'start' });
    }
  }

  function normalize(value) {
    return (value || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function formField(form, label) {
    var controls = form.querySelectorAll('input, textarea');
    var wanted = normalize(label);
    for (var i = 0; i < controls.length; i += 1) {
      var name = normalize(controls[i].getAttribute('aria-label') || controls[i].name || controls[i].placeholder);
      if (name === wanted) return controls[i];
    }
    return null;
  }

  function isHomeContactForm(form) {
    return !!(form && formField(form, 'Email') && formField(form, 'Message'));
  }

  function sendHomeContactMail(event) {
    if (!isHomePage()) return;
    var trigger = event.target && event.target.closest ? event.target.closest('button, [role="button"], input[type="button"], input[type="submit"]') : null;
    var form = event.target && event.target.tagName === 'FORM' ? event.target : (trigger ? trigger.closest('form') : null);
    if (!isHomeContactForm(form)) return;
    if (event.type === 'click' && trigger) {
      var buttonText = normalize(trigger.textContent || trigger.value);
      if (buttonText !== 'send') return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();

    var firstName = formField(form, 'First name');
    var lastName = formField(form, 'Last name');
    var email = formField(form, 'Email');
    var subject = formField(form, 'Subject');
    var message = formField(form, 'Message');
    var fullName = [firstName && firstName.value, lastName && lastName.value].filter(Boolean).join(' ');
    var subjectText = (subject && subject.value) || 'Cougar Racing website inquiry';
    var body = [
      'Name: ' + fullName,
      'Email: ' + ((email && email.value) || ''),
      '',
      (message && message.value) || ''
    ].join('\n');

    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subjectText) + '&body=' + encodeURIComponent(body);
  }

  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a') : null;
    if (link && isContactLink(link)) {
      link.setAttribute('href', CONTACT_URL);
    }
  }, true);

  document.addEventListener('click', sendHomeContactMail, true);
  document.addEventListener('submit', sendHomeContactMail, true);

  function start() {
    fixLinks();
    scrollToHomeContact();
    setTimeout(fixLinks, 250);
    setTimeout(fixLinks, 1000);
    setTimeout(fixLinks, 2500);
    setTimeout(scrollToHomeContact, 250);
    setTimeout(scrollToHomeContact, 1000);
    setTimeout(scrollToHomeContact, 2500);
  }

  window.addEventListener('hashchange', scrollToHomeContact);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

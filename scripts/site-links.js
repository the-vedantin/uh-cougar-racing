(function () {
  var CONTACT_URL = 'index.html#contact';
  var CONTACT_EMAIL = 'info.uhfsae@gmail.com';
  var CONTACT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzExefPs2Ab1MCmXSIcB3XBKVDtepljINRh1Xd7d13MySmME9bL5nn5dI05PyIIur9Oqw/exec';
  var CONTACT_IFRAME = 'uhcr-contact-target';

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

  function fieldValue(control) {
    return control && typeof control.value === 'string' ? control.value.trim() : '';
  }

  function contactStatus(form) {
    var status = form.querySelector('#uhcr-contact-status');
    if (!status) {
      status = document.createElement('p');
      status.id = 'uhcr-contact-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.style.margin = '14px 0 0';
      status.style.fontFamily = 'Arial, Helvetica, sans-serif';
      status.style.fontSize = '14px';
      status.style.lineHeight = '1.4';
      form.appendChild(status);
    }
    return status;
  }

  function setContactStatus(form, message, isError) {
    var status = contactStatus(form);
    status.textContent = message;
    status.style.color = isError ? '#ff4d5f' : '#ffffff';
  }

  function addHiddenField(form, name, value) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value || '';
    form.appendChild(input);
  }

  function ensureContactFrame() {
    var frame = document.getElementById(CONTACT_IFRAME);
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = CONTACT_IFRAME;
      frame.name = CONTACT_IFRAME;
      frame.title = 'Contact form submission';
      frame.style.display = 'none';
      document.body.appendChild(frame);
    }
    return frame;
  }

  function fallbackMailto(fields) {
    var fullName = [fields.firstName, fields.lastName].filter(Boolean).join(' ');
    var body = [
      'Name: ' + fullName,
      'Email: ' + fields.email,
      '',
      fields.message
    ].join('\n');

    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(fields.subject) + '&body=' + encodeURIComponent(body);
  }

  function postContactForm(form, fields) {
    var frame = ensureContactFrame();
    var postForm = document.createElement('form');
    var complete = false;

    postForm.method = 'POST';
    postForm.action = CONTACT_ENDPOINT;
    postForm.target = CONTACT_IFRAME;
    postForm.style.display = 'none';

    addHiddenField(postForm, 'formSecret', 'uhcr-v1');
    addHiddenField(postForm, 'firstName', fields.firstName);
    addHiddenField(postForm, 'lastName', fields.lastName);
    addHiddenField(postForm, 'email', fields.email);
    addHiddenField(postForm, 'subject', fields.subject);
    addHiddenField(postForm, 'message', fields.message);
    addHiddenField(postForm, 'company', '');
    addHiddenField(postForm, 'page', window.location.href);

    function finish() {
      if (complete) return;
      complete = true;
      setContactStatus(form, 'Message sent.', false);
      form.reset();
      setTimeout(function () {
        if (postForm.parentNode) postForm.parentNode.removeChild(postForm);
      }, 1000);
    }

    frame.onload = finish;
    document.body.appendChild(postForm);
    postForm.submit();
    setTimeout(finish, 5000);
  }

  function sendHomeContactMail(event) {
    if (!isHomePage()) return;
    var trigger = event.target && event.target.closest ? event.target.closest('button, [role="button"], input[type="button"], input[type="submit"]') : null;
    var form = event.target && event.target.tagName === 'FORM' ? event.target : (trigger ? trigger.closest('form') : null);
    if (!isHomeContactForm(form)) return;
    if (event.type === 'click' && trigger) {
      var buttonText = normalize(trigger.textContent || trigger.value);
      if (buttonText !== 'send' && buttonText !== 'send email') return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();

    var firstName = formField(form, 'First name');
    var lastName = formField(form, 'Last name');
    var email = formField(form, 'Email');
    var subject = formField(form, 'Subject');
    var message = formField(form, 'Message');
    var fields = {
      firstName: fieldValue(firstName),
      lastName: fieldValue(lastName),
      email: fieldValue(email),
      subject: fieldValue(subject) || 'Cougar Racing website inquiry',
      message: fieldValue(message)
    };

    if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
      setContactStatus(form, 'Please fill out the required fields.', true);
      return;
    }

    if (!fields.email || !fields.message) {
      setContactStatus(form, 'Please add your email and message.', true);
      return;
    }

    if (!CONTACT_ENDPOINT) {
      fallbackMailto(fields);
      return;
    }

    setContactStatus(form, 'Sending...', false);

    try {
      postContactForm(form, fields);
    } catch (error) {
      setContactStatus(form, 'Could not send. Please email ' + CONTACT_EMAIL + '.', true);
      fallbackMailto(fields);
    }
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

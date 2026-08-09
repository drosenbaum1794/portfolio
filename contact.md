---
layout: page
title: Contact
subtitle: "Happy to talk."
permalink: /contact/
photo: "/assets/images/dan-contact.jpg"
photo_alt: "Dan Rosenbaum holding a yellow rotary phone to his ear"
---
Always up for a conversation about AI enablement, adoption, or education work.
Email reaches me fastest.

<div class="hero__ctas" style="margin: 24px 0 40px;">
  <a class="btn btn--primary" id="email-copy" href="mailto:{{ site.author.email }}" data-email="{{ site.author.email }}">{{ site.author.email }}</a>
  {% if site.author.linkedin %}<a class="btn" href="{{ site.author.linkedin }}" target="_blank" rel="noopener">Connect on LinkedIn</a>{% endif %}
</div>

<p class="sr-only" role="status" aria-live="polite" id="email-copy-status"></p>

I'm in Beverly, MA, on the North Shore of Boston.

<script>
(function () {
  var link = document.getElementById('email-copy');
  var status = document.getElementById('email-copy-status');
  if (!link) return;

  var email = link.getAttribute('data-email');
  var label = link.textContent.trim();

  // Lock the width so swapping the label does not shove the LinkedIn
  // button sideways.
  link.style.minWidth = link.offsetWidth + 'px';
  link.style.justifyContent = 'center';

  // navigator.clipboard only exists over HTTPS and on localhost. On plain
  // HTTP it is undefined, and reaching for .writeText there throws
  // synchronously rather than rejecting, so a .catch() would never see it.
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // execCommand is deprecated but it is the only thing that works on a
    // non-secure origin, and it has to run inside the click handler to
    // count as a user gesture.
    return new Promise(function (resolve, reject) {
      var field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.top = '-1000px';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      field.setSelectionRange(0, text.length);
      var ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(field);
      ok ? resolve() : reject(new Error('copy unavailable'));
    });
  }

  var reverting = null;

  link.addEventListener('click', function (event) {
    event.preventDefault();

    copy(email).then(function () {
      link.textContent = 'Copied to clipboard';
      link.classList.add('btn--copied');
      status.textContent = email + ' copied to clipboard';

      window.clearTimeout(reverting);
      reverting = window.setTimeout(function () {
        link.textContent = label;
        link.classList.remove('btn--copied');
        status.textContent = '';
      }, 2000);
    }).catch(function () {
      // Copying is genuinely unavailable, so fall through to the mail
      // client the href already points at.
      window.location.href = 'mailto:' + email;
    });
  });
})();
</script>

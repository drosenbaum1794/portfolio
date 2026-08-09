---
layout: page
title: Contact
subtitle: "Happy to talk."
permalink: /contact/
photo: "/assets/images/dan-contact.jpg"
photo_alt: "Dan Rosenbaum holding a yellow rotary phone to his ear"
---

Always up for a conversation about AI enablement, adoption, or education work. Email reaches me fastest.

<div class="hero__ctas" style="margin: 24px 0 40px;">
  <!-- Changed to a button element to safely handle the copy function while keeping your primary styles -->
  <button class="btn btn--primary" id="email-copy-btn" onclick="copyEmailAddress(this)" style="cursor: pointer;">
    {{ site.author.email }}
  </button>
  {% if site.author.linkedin %}<a class="btn" href="{{ site.author.linkedin }}" target="_blank" rel="noopener">Connect on LinkedIn</a>{% endif %}
</div>

I'm in Beverly, MA, on the North Shore of Boston.

<script>
function copyEmailAddress(buttonElement) {
  const emailText = "{{ site.author.email }}";

  navigator.clipboard.writeText(emailText).then(() => {
    const originalText = buttonElement.innerText;
    
    // Provide instant visual confirmation to the user
    buttonElement.innerText = "Copied! ✓";
    buttonElement.style.pointerEvents = "none"; 

    // Revert the text back to the email address after 2 seconds
    setTimeout(() => {
      buttonElement.innerText = originalText;
      buttonElement.style.pointerEvents = "auto";
    }, 2000);
  }).catch(err => {
    console.error("Clipboard copy failed: ", err);
    // Secure fallback: defaults to the native mail client if the browser blocks the clipboard
    window.location.href = "mailto:" + emailText;
  });
}
</script>

// ===== contact.js: copy email, local time, and the project form =====
(function () {
  const EMAIL = 'umukunzicevinkenzo7@gmail.com';
  const WHATSAPP_NUMBER = '250795334848';

  // ===== 1. Local time in Rwanda =====
  const timeText = document.getElementById('local-time-text');

  function updateTime() {
    if (!timeText) return;
    try {
      const time = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'Africa/Kigali',
      }).format(new Date());
      timeText.textContent = `It’s ${time} in Rwanda`;
    } catch (error) {
      // If the browser can't format the time, the default text stays
    }
  }

  updateTime();
  setInterval(updateTime, 30000);

  // ===== 2. "Copy email" button =====
  const copyBtn = document.getElementById('copy-email');

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Fallback for older browsers
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }

  if (copyBtn) {
    const icon = copyBtn.querySelector('i');
    const label = copyBtn.querySelector('span');

    copyBtn.addEventListener('click', async () => {
      try {
        await copyText(EMAIL);
        copyBtn.classList.add('copied');
        icon.className = 'fas fa-check';
        label.textContent = 'Copied';
      } catch (error) {
        label.textContent = 'Copy failed';
      }

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        icon.className = 'far fa-copy';
        label.textContent = 'Copy email';
      }, 2000);
    });
  }

  // ===== 3. Project form: opens WhatsApp or email with the message ready =====
  const form = document.getElementById('contact-form');
  if (!form) return;

  const hint = document.getElementById('form-hint');

  function readForm() {
    const data = new FormData(form);
    return {
      name: String(data.get('name') || '').trim(),
      topic: String(data.get('topic') || 'something else'),
      message: String(data.get('message') || '').trim(),
    };
  }

  function composeText(data) {
    return `Hi Kenzo, I’m ${data.name}. I’m looking for ${data.topic}.\n\n${data.message}`;
  }

  function showHint(text, type) {
    hint.textContent = text;
    hint.className = `form-hint ${type || ''}`;
  }

  // Pressing Enter in the name box should not reload the page
  form.addEventListener('submit', (event) => event.preventDefault());

  form.querySelectorAll('[data-send]').forEach((button) => {
    button.addEventListener('click', () => {
      const data = readForm();

      if (!data.name || !data.message) {
        showHint('Please add your name and a short message first.', 'error');
        return;
      }

      const text = composeText(data);

      if (button.dataset.send === 'whatsapp') {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener');
        showHint('Opening WhatsApp with your message…', 'ok');
      } else {
        const subject = `Project inquiry from ${data.name}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
        showHint('Opening your email app with your message…', 'ok');
      }
    });
  });
})();
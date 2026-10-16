(() => {
  'use strict';
  const form = document.getElementById('project-enquiry-form');
  if (!form) return;
  const status = form.querySelector('.form-feedback');
  const fallback = form.querySelector('.email-fallback');
  const fallbackLink = fallback.querySelector('.fallback-mailto');
  const submit = form.querySelector('[type="submit"]');
  const makeEmail = data => {
    const text = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Property / company: ${data.get('company') || ''}`,
      `Location: ${data.get('location') || ''}`,
      `Service: ${data.get('service') || ''}`,
      `Timing: ${data.get('timing') || ''}`,
      '', 'Project:', String(data.get('brief') || '')
    ].join('\n');
    return 'mailto:studio@maisonkrizsan.com?subject=' + encodeURIComponent('Maison Krizsan | Project enquiry') + '&body=' + encodeURIComponent(text);
  };
  form.addEventListener('submit', async event => {
    if (!window.fetch) return; // Native form submission if fetch is unavailable.
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    fallbackLink.href = makeEmail(data);
    status.hidden = false;
    status.classList.remove('is-error');
    status.textContent = 'Sending your enquiry…';
    fallback.hidden = true;
    submit.disabled = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/api/inquiry', { method:'POST', body:data, credentials:'same-origin', signal:controller.signal, headers: {'Accept':'application/json'} });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) throw new Error(result?.message || 'Delivery could not be confirmed.');
      status.textContent = 'Your enquiry has been submitted. Thank you. We’ll review it and reply by email.';
      form.reset();
      fallback.hidden = true;
    } catch (err) {
      status.textContent = 'We could not confirm delivery. Please send your details by email below.';
      status.classList.add('is-error');
      fallback.hidden = false;
    } finally {
      clearTimeout(timeout);
      submit.disabled = false;
    }
  });
})();

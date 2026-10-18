(() => {
  'use strict';
  const form = document.getElementById('project-enquiry-form');
  if (!form) return;
  const status = form.querySelector('.form-feedback');
  const fallback = form.querySelector('.email-fallback');
  const fallbackLink = fallback.querySelector('.fallback-mailto');
  const submit = form.querySelector('[type="submit"]');
  const challenge = form.querySelector('[data-challenge]');
  const challengeTarget = challenge?.querySelector('.turnstile-target');
  const challengeHelp = challenge?.querySelector('.challenge-help');
  let challengeConfig = null;
  let challengeLoad = null;
  let widgetId = null;
  let challengeTokenAt = 0;

  const makeEmail = data => {
    const text = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Property / company: ${data.get('company') || ''}`,
      `Location: ${data.get('location') || ''}`,
      `Service: ${data.get('service') || ''}`,
      `Project context: ${data.get('project_context') || ''}`,
      `Desired outcome: ${data.get('outcome') || ''}`,
      `Timing: ${data.get('timing') || ''}`,
      '', 'Project:', String(data.get('brief') || '')
    ].join('\n');
    return 'mailto:studio@maisonkrizsan.com?subject=' + encodeURIComponent('Maison Krizsan | Project enquiry') + '&body=' + encodeURIComponent(text);
  };
  function displayFailure(message) {
    status.hidden = false;
    status.classList.add('is-error');
    status.textContent = message || 'We could not confirm delivery. Please email the studio directly.';
    fallback.hidden = false;
    fallbackLink.href = makeEmail(new FormData(form));
  }
  function loadChallengeScript() {
    if (window.turnstile) return Promise.resolve();
    return new Promise((resolve,reject) => {
      const el = document.createElement('script');
      el.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      el.async = true;
      el.onload = () => window.turnstile ? resolve() : reject(new Error('Turnstile not ready'));
      el.onerror = () => reject(new Error('Turnstile unavailable'));
      document.head.appendChild(el);
    });
  }
  function initSecurity() {
    if (challengeLoad) return challengeLoad;
    challengeLoad = (async () => {
      const response = await fetch('/api/form-config', {credentials:'same-origin'});
      if (!response.ok) throw new Error('Cannot read security configuration');
      const cfg = await response.json();
      challengeConfig = cfg;
      if (cfg.misconfigured) throw new Error('Security credentials are incomplete');
      if (!cfg.turnstileEnabled) return;
      challenge.hidden = false;
      challengeHelp.textContent = 'Complete verification if prompted before sending your enquiry.';
      await loadChallengeScript();
      widgetId = window.turnstile.render(challengeTarget, {
        sitekey: cfg.siteKey,
        action: 'maison_enquiry',
        theme: 'auto', size: 'flexible', appearance: 'interaction-only',
        callback: () => {challengeTokenAt = Date.now();challengeHelp.textContent = '';},
        'expired-callback': () => {challengeTokenAt = 0;challengeHelp.textContent = 'Verification expired. Please complete it again.';},
        'error-callback': () => {challengeTokenAt = 0;challengeHelp.textContent = 'Verification could not load. You can contact us directly by email.';}
      });
    })().catch(() => {
      // If the public configuration endpoint is temporarily unavailable, retain
      // the existing form path; the server still enforces security when enabled.
      challengeConfig = {turnstileEnabled:false,misconfigured:false};
    });
    return challengeLoad;
  }
  // Lazy setup: avoid unnecessary third-party requests on a photo-led page.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {observer.disconnect();initSecurity();}
    }, {rootMargin:'250px 0px'});
    observer.observe(form);
  }
  form.addEventListener('focusin', () => {initSecurity();}, {once:true});
  form.addEventListener('submit', async event => {
    if (!window.fetch) return; // Native fallback if fetch is unavailable.
    event.preventDefault();
    if (!form.reportValidity()) return;
    await initSecurity();
    const data = new FormData(form);
    fallbackLink.href = makeEmail(data);
    if (challengeConfig?.misconfigured) {
      displayFailure('Security verification is temporarily unavailable. Please send your details by email.');
      return;
    }
    if (challengeConfig?.turnstileEnabled) {
      const token = String(data.get('cf-turnstile-response') || '');
      // Allow a short margin before token expiry to avoid reusing an old challenge.
      if (!token || !challengeTokenAt || Date.now() - challengeTokenAt > 270000) {
        if (widgetId != null && window.turnstile) window.turnstile.reset(widgetId);
        challengeHelp.textContent = 'Please complete the security check, then send again.';
        return;
      }
    }
    status.hidden = false;
    status.classList.remove('is-error');
    status.textContent = 'Sending your enquiry…';
    fallback.hidden = true;
    submit.disabled = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/api/inquiry', {method:'POST',body:data,credentials:'same-origin',signal:controller.signal,headers:{Accept:'application/json'}});
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) throw new Error(result?.message || 'Delivery could not be confirmed.');
      status.textContent = 'Your enquiry has been submitted. Thank you. We’ll review it and reply by email.';
      form.reset();
      fallback.hidden = true;
      challengeTokenAt = 0;
      if (challengeConfig?.turnstileEnabled && widgetId != null && window.turnstile) window.turnstile.reset(widgetId);
    } catch (err) {
      displayFailure(err?.message?.startsWith('Please complete') ? err.message : 'We could not confirm delivery. Please send your details by email below.');
      challengeTokenAt = 0;
      if (challengeConfig?.turnstileEnabled && widgetId != null && window.turnstile) window.turnstile.reset(widgetId);
    } finally {
      clearTimeout(timeout);
      submit.disabled = false;
    }
  });
})();

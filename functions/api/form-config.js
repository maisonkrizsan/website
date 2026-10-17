/* Public-only form configuration for Turnstile. No secrets leave the server. */
export function onRequestGet({env}) {
  const siteKey = String(env.TURNSTILE_SITE_KEY || '').trim();
  const secret = String(env.TURNSTILE_SECRET_KEY || '').trim();
  // Fail closed on partial configuration so the browser can offer the email fallback.
  const misconfigured = Boolean(siteKey) !== Boolean(secret);
  return new Response(JSON.stringify({
    turnstileEnabled: Boolean(siteKey && secret),
    misconfigured,
    siteKey: siteKey && secret ? siteKey : null
  }), {status:200, headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
}

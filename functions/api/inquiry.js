/* Maison Krizsan — Cloudflare Pages Function, POST /api/inquiry.
   Requires RESEND_API_KEY and RESEND_FROM configured as deployment secrets.
   No false-positive success when secrets are missing or email delivery is refused. */
const response = (data, status=200) => new Response(JSON.stringify(data), {
  status,
  headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}
});
const trim = (value, max=500) => String(value == null ? '' : value).trim().slice(0,max);
const SERVICES = new Set(['Photography','Film','Photography and film','Visual direction','Not sure yet']);
export async function onRequestPost({request,env}) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return response({ok:false,message:'Invalid request origin.'},403);
  const size = Number(request.headers.get('content-length') || 0);
  if (size > 18000) return response({ok:false,message:'The enquiry is too long.'},413);
  let data;
  try { data = await request.formData(); }
  catch { return response({ok:false,message:'The enquiry could not be read.'},400); }
  if (trim(data.get('website'))) return response({ok:true}); // honeypot spam, do not deliver.
  const name=trim(data.get('name'),120),email=trim(data.get('email'),254),company=trim(data.get('company'),160);
  const location=trim(data.get('location'),160),service=trim(data.get('service'),80);
  const timing=trim(data.get('timing'),80),brief=trim(data.get('brief'),6001);
  if (name.length<2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !SERVICES.has(service) || brief.length<20 || brief.length>6000) {
    return response({ok:false,message:'Please provide your name, valid email, service and project details.'},400);
  }
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    return response({ok:false,message:'The enquiry form is not yet connected. Please use email instead.'},503);
  }
  const text=[`Name: ${name}`,`Email: ${email}`,`Property/company: ${company}`,`Location: ${location}`,`Service: ${service}`,`Timing: ${timing}`,'',`Brief:\n${brief}`].join('\n');
  let sent;
  try {
    sent=await fetch('https://api.resend.com/emails', {
      method:'POST',headers:{authorization:`Bearer ${env.RESEND_API_KEY}`,'content-type':'application/json'},
      body:JSON.stringify({from:env.RESEND_FROM,to:[env.INQUIRY_TO || 'studio@maisonkrizsan.com'],reply_to:email,
       subject:`Maison Krizsan enquiry · ${service} · ${name}`,text})
    });
  } catch {return response({ok:false,message:'Unable to send right now. Please email the studio directly.'},502);}
  if (!sent.ok) {
    // Never leak service credentials, server errors or the user's submitted details into browser output.
    return response({ok:false,message:'Delivery could not be confirmed. Please email the studio directly.'},502);
  }
  return response({ok:true,message:'Enquiry accepted for delivery.'});
}
export function onRequestGet() {return response({ok:false,message:'Use the project enquiry form to submit.'},405);}

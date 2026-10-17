import assert from 'node:assert/strict';
import {onRequestPost,onRequestGet} from '../functions/api/inquiry.js';
import {onRequestGet as onConfigGet} from '../functions/api/form-config.js';

function form(overrides={}) {
 const x=new FormData();
 for(const [k,v] of Object.entries({name:'Test Client',email:'client@example.com',service:'Photography',brief:'Photograph our hotel opening for the main website and campaign.', ...overrides}))x.set(k,v);
 return new Request('https://maisonkrizsan.com/api/inquiry',{method:'POST',body:x,headers:{Origin:'https://maisonkrizsan.com'}});
}
const active={RESEND_API_KEY:'test_key_not_real',RESEND_FROM:'Maison <commissions@mail.maisonkrizsan.com>',INQUIRY_TO:'studio@maisonkrizsan.com'};
const guarded={...active,TURNSTILE_SITE_KEY:'0x4test-public',TURNSTILE_SECRET_KEY:'fake-private'};
let checks=0;
const oldFetch=globalThis.fetch;
async function run(name,env,changes,reply,expected){
 let sent=0,verified=0;
 globalThis.fetch=async (url,args)=>{
   if(String(url).includes('siteverify')){verified++;return new Response(JSON.stringify(reply.verify??{success:true,hostname:'maisonkrizsan.com',action:'maison_enquiry'}),{status:reply.siteStatus??200});}
   if(String(url).includes('resend')){sent++;return new Response(JSON.stringify({id:'test-delivery'}),{status:reply.resendStatus??200});}
   throw Error('unexpected fetch:'+url);
 };
 try {
  const r=await onRequestPost({request:form(changes),env});
  assert.equal(r.status,expected.status,`${name} status`);
  assert.equal(sent,expected.sent,`${name} Resend calls`);
  assert.equal(verified,expected.verified,`${name} challenge calls`);
  checks++;
  console.log('PASS:',name);
 }finally{globalThis.fetch=oldFetch;}
}
await run('Legacy working integration remains usable',active,{}, {},{status:200,sent:1,verified:0});
await run('Enabled challenge requires token',guarded,{}, {},{status:403,sent:0,verified:0});
await run('Valid token delivers',guarded,{'cf-turnstile-response':'valid-token'}, {},{status:200,sent:1,verified:1});
await run('Invalid token rejected',guarded,{'cf-turnstile-response':'bad-token'}, {verify:{success:false,hostname:'maisonkrizsan.com',action:'maison_enquiry'}},{status:403,sent:0,verified:1});
await run('Wrong hostname rejected',guarded,{'cf-turnstile-response':'valid-token'}, {verify:{success:true,hostname:'evil.example',action:'maison_enquiry'}},{status:403,sent:0,verified:1});
await run('Wrong action rejected',guarded,{'cf-turnstile-response':'valid-token'}, {verify:{success:true,hostname:'maisonkrizsan.com',action:'login'}},{status:403,sent:0,verified:1});
await run('Challenge provider offline rejected',guarded,{'cf-turnstile-response':'valid-token'}, {siteStatus:502},{status:503,sent:0,verified:1});
await run('Resend failure does not claim success',guarded,{'cf-turnstile-response':'valid-token'}, {resendStatus:403},{status:502,sent:1,verified:1});
await run('One-sided configuration fails closed',{...active,TURNSTILE_SECRET_KEY:'private-only'}, {}, {},{status:503,sent:0,verified:0});
await run('Short brief rejected',guarded,{brief:'hello'}, {},{status:400,sent:0,verified:0});
await run('Honeypot does not call Resend',guarded,{website:'https://spam.example'}, {},{status:200,sent:0,verified:0});
let response=await onRequestGet();assert.equal(response.status,405);checks++;
let cfg=await onConfigGet({env:guarded});const v=await cfg.json();assert.equal(v.siteKey,'0x4test-public');assert.equal(v.turnstileEnabled,true);assert.equal(JSON.stringify(v).includes('fake-private'),false);checks++;
cfg=await onConfigGet({env:active});assert.equal((await cfg.json()).turnstileEnabled,false);checks++;
console.log(`${checks} backend tests passed. No real email was sent.`);

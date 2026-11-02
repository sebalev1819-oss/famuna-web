let L=localStorage.getItem('famuna-lang')||((navigator.language||'es').startsWith('en')?'en':'es');
function apply(){const t=T[L];document.documentElement.lang=L;document.querySelectorAll('[data-i]').forEach(e=>{const k=e.dataset.i;if(t[k])e.textContent=t[k]});
document.querySelectorAll('[data-ph]').forEach(e=>e.placeholder=t[e.dataset.ph]);document.getElementById('lang').textContent=L==='es'?'EN':'ES';document.querySelectorAll('[data-al]').forEach(e=>e.setAttribute('aria-label',t[e.dataset.al]));const d=document.querySelector('meta[name=description]');if(d)d.content=t.desc;const lg=document.querySelector('#wl [name=lang]');if(lg)lg.value=L;document.querySelectorAll('[data-alt]').forEach(e=>e.alt=t[e.dataset.alt]);document.title='Famuna — '+t.tag}
document.getElementById('lang').onclick=()=>{L=L==='es'?'en':'es';localStorage.setItem('famuna-lang',L);apply()};
// Lista de espera / Waitlist -> Formspree. Reemplazar FORMSPREE_ID en index.html.
document.getElementById('wl').onsubmit=async e=>{e.preventDefault();const f=e.target,t=T[L],ok=document.getElementById('ok'),er=document.getElementById('err'),b=f.querySelector('button');
ok.hidden=true;er.hidden=true;const show=m=>{er.textContent=m;er.hidden=false};
if(f._gotcha&&f._gotcha.value)return;
for(const n of['name','country','age_range'])if(!f[n].value.trim()){f[n].focus();return show(t.e_req)}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim())){f.email.focus();return show(t.e_mail)}
if(f.action.includes('FORMSPREE_ID'))return show(t.e_cfg);
b.disabled=true;b.textContent=t.f_sending;
try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});if(!r.ok)throw 0;f.reset();ok.hidden=false}catch(_){show(t.e_send)}
finally{b.disabled=false;b.textContent=t.f_b}};
const q=new URLSearchParams(location.search).get('lang');if(q)L=q;apply();

const C=window.DPRO_CONFIG; const E={token:null,role:null};
async function api(path,opt={}){const headers={'content-type':'application/json','x-dpro-environment':C.ENVIRONMENT,...(opt.headers||{})};if(E.token)headers.authorization=`Bearer ${E.token}`;const r=await fetch(C.API_BASE+path,{...opt,headers});const j=await r.json().catch(()=>({ok:false,error:{message:'Invalid response'}}));if(!r.ok)throw Object.assign(new Error(j.error?.message||`HTTP ${r.status}`),{payload:j,status:r.status});return j}
async function demoLogin(role){const j=await api('/auth/demo-login',{method:'POST',body:JSON.stringify({role})});E.token=j.token;E.role=role;sessionStorage.setItem('dpro_demo_token',j.token);sessionStorage.setItem('dpro_demo_role',role);return j}
function restore(){E.token=sessionStorage.getItem('dpro_demo_token');E.role=sessionStorage.getItem('dpro_demo_role')}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function msg(el,text,kind='notice'){el.className=kind;el.textContent=text;el.setAttribute('role',kind==='error'?'alert':'status')}
window.DPRO={api,demoLogin,restore,esc,msg,state:E}; restore();

const toggle=document.querySelector('.menu');
const nav=document.querySelector('#nav');
function closeMenu(){if(!nav||!toggle)return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');}
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();document.querySelectorAll('details[open]').forEach(d=>d.removeAttribute('open'));toggle.focus();}});}
const projectForm=document.querySelector('#project-form');
if(projectForm){
 const params=new URLSearchParams(window.location.search);
 const chosen=params.get('servicio');if(chosen){const sel=projectForm.querySelector('#service');if(sel&&Array.from(sel.options).some(o=>o.value===chosen))sel.value=chosen;}
 projectForm.addEventListener('submit',e=>{
  e.preventDefault();if(!projectForm.reportValidity())return;
  const d=new FormData(projectForm);
  const v=k=>String(d.get(k)||'').trim();
  const fields=[['Tipo de cliente',v('clientType')],['Contacto',v('name')],['Empresa',v('company')],['Distrito',v('district')],['Tipo de proyecto',v('projectKind')],['Departamentos',v('units')],['Área referencial',v('area')?v('area')+' m²':''],['Servicio',v('service')],['Modalidad',v('mode')],['Planos/metrados',v('plans')],['Etapa',v('stage')],['Alcance',v('details')]];
  const message=['Hola, quisiera solicitar una propuesta técnica y económica para mi proyecto.','',...fields.filter(([,x])=>x).map(([k,x])=>k+': '+x),'','Tengo disponible información adicional para compartir por WhatsApp.'].join('\n');
  const url='https://wa.me/51920555433?text='+encodeURIComponent(message);
  const win=window.open(url,'_blank');if(win)win.opener=null;else window.location.href=url;
 });
}

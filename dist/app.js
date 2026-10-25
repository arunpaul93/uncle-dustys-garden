const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
$('#year').textContent = new Date().getFullYear();
const menu = $('.menu-toggle');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', expanded); $('#main-nav').classList.toggle('is-open', expanded);
});
$$('#main-nav a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); $('#main-nav').classList.remove('is-open'); }));
document.addEventListener('keydown', e => { if(e.key === 'Escape') {menu.setAttribute('aria-expanded','false');$('#main-nav').classList.remove('is-open');} });

// One-page enquiry: job details and contact information stay in memory.
const dialog = $('#quote-dialog'), form = $('#quote-form');
const serviceNames = { mowing:'Lawn mowing & edging', garden:'Hedges & garden care', cleanup:'Weeding & clean-ups', regular:'Regular garden care' };
let requestText = '', returnFocus, suggestedDetails = '';
function openQuote(service) {
  returnFocus = document.activeElement;
  form.hidden = false; $('#quote-success').hidden = true;
  const details = $('#job-details');
  if (serviceNames[service] && (!details.value.trim() || details.value === suggestedDetails)) {
    suggestedDetails = serviceNames[service] + ': '; details.value = suggestedDetails;
  }
  dialog.showModal(); document.body.classList.add('dialog-open'); details.focus({preventScroll:true}); dialog.scrollTop = 0;
}
$$('[data-quote]').forEach(button => button.addEventListener('click', () => openQuote(button.dataset.quote)));
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {document.body.classList.remove('dialog-open'); returnFocus?.focus();});
form.addEventListener('input', e => {if (typeof e.target.setCustomValidity === 'function') e.target.setCustomValidity('');});
form.addEventListener('submit', e => {
  e.preventDefault();
  const details = $('#job-details'), name = $('#contact-name'), phone = $('#contact-phone'), email = $('#contact-email');
  details.setCustomValidity(details.value.trim() ? '' : 'Please tell us what needs doing.');
  name.setCustomValidity(name.value.trim() ? '' : 'Please enter your contact name.');
  const phoneText = phone.value.trim();
  const validPhone = /^[+\d\s().-]+$/.test(phoneText) && phoneText.replace(/\D/g, '').length >= 7;
  phone.setCustomValidity(validPhone ? '' : 'Please enter a phone number with at least 7 digits.');
  if (!form.reportValidity()) return;
  const values = {details:details.value.trim(), name:name.value.trim(), phone:phoneText, email:email.value.trim()};
  requestText = `UNCLE DUSTY’S GARDEN — GARDEN ENQUIRY\nCreated: ${new Date().toLocaleDateString('en-AU')}\n\nJob details:\n${values.details}\n\nContact name: ${values.name}\nContact number: ${values.phone}\nEmail address: ${values.email || 'Not provided'}\n\nENQUIRY DRAFT — Not sent automatically. Bookings are confirmed by our office team.\n`;
  $('#request-summary').textContent = `${values.details}\n\nContact: ${values.name}\nPhone: ${values.phone}${values.email ? '\nEmail: ' + values.email : ''}`;
  $('#email-request').href = `mailto:admin@uncledustys.com.au?subject=${encodeURIComponent('Garden enquiry - office team')}&body=${encodeURIComponent(requestText)}`;
  form.hidden = true; $('#quote-success').hidden = false; $('#email-request').focus();
});
$('#download-request').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([requestText], {type:'text/plain;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = 'uncle-dustys-garden-enquiry.txt';
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
});
$('#start-again').addEventListener('click', () => {
  form.reset(); $$('input, textarea', form).forEach(field => field.setCustomValidity(''));
  requestText = ''; suggestedDetails = ''; $('#request-summary').textContent = ''; $('#email-request').href = 'mailto:admin@uncledustys.com.au';
  form.hidden = false; $('#quote-success').hidden = true; $('#job-details').focus({preventScroll:true}); dialog.scrollTop = 0;
});

// Seasonal notes, ordered around Australian seasons.
const notes={
  spring:{months:'SEP — NOV',title:'Time for a fresh start.',description:'The garden’s waking up. Give it a little attention now and make room for the good growth.',tasks:['Get back into a mowing rhythm','Tidy garden beds and wandering edges','Plan a freshen-up for outdoor living']},
  summer:{months:'DEC — FEB',title:'Made for the outdoors.',description:'Long days and backyard catch-ups. Keep the garden comfortable, tidy, and ready for a little outdoor living.',tasks:['Review your lawn care schedule','Keep paths and entertaining areas clear','Check local watering rules before watering']},
  autumn:{months:'MAR — MAY',title:'A little change of pace.',description:'Cooler mornings, falling leaves, and a chance to reset. A good time to give the garden a thoughtful tidy.',tasks:['Keep on top of fallen leaves','Clear paths and wandering growth','Plan the next round of garden maintenance']},
  winter:{months:'JUN — AUG',title:'Quiet garden. Good plans.',description:'Things slow down, but there’s still good work to do. Think tidy spaces and a plan for the season ahead.',tasks:['Adjust visits to your garden’s growth','Clear leaves from paths and outdoor spaces','Make a spring garden wish list']}
};
const tabs=$$('[data-season]');
function setSeason(season, focus=false){const note=notes[season];tabs.forEach(t=>{const active=t.dataset.season===season;t.setAttribute('aria-selected',active);t.tabIndex=active?0:-1;if(active&&focus)t.focus();});$('#season-note').setAttribute('aria-labelledby',`tab-${season}`);$('#season-months').textContent=note.months;$('#season-title').textContent=note.title;$('#season-description').textContent=note.description;$('#season-tasks').replaceChildren(...note.tasks.map(task=>{const li=document.createElement('li');li.textContent=task;return li;}));}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>setSeason(tab.dataset.season));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%4;if(e.key==='ArrowLeft')next=(i+3)%4;if(e.key==='Home')next=0;if(e.key==='End')next=3;if(next!==undefined){e.preventDefault();setSeason(tabs[next].dataset.season,true);}});});
const month=new Date().getMonth();setSeason(month>=8&&month<=10?'spring':month===11||month<=1?'summer':month<=4?'autumn':'winter');

// A small grass-cutting playground; no imagery or external game dependencies.
const canvas=$('#lawn'),ctx=canvas.getContext('2d');
const COLS=48,ROWS=28,cut=new Uint8Array(COLS*ROWS);
let width=600,height=335,down=false,lastPoint=null,cutCount=0,guidedRow=0,cursor={x:.12,y:.5},lastAnnounced=0;
function random(n){const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}
function render(){
  const dpr=Math.min(devicePixelRatio||1,2);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  const cw=width/COLS,ch=height/ROWS;
  for(let row=0;row<ROWS;row++)for(let col=0;col<COLS;col++){
    const i=row*COLS+col,short=cut[i],stripe=Math.floor(col/6)%2;
    ctx.fillStyle=short?(stripe?'#7eaa45':'#8eb84e'):(stripe?'#54792e':'#638b34');ctx.fillRect(col*cw,row*ch,cw+.5,ch+.5);
    for(let k=0;k<(short?3:6);k++){const seed=i*7+k,x=(col+random(seed))*cw,y=(row+random(seed+7100))*ch;ctx.strokeStyle=short?(k%2?'#a2c466':'#70973a'):(k%2?'#8eaf4b':'#3f6329');ctx.lineWidth=short?.8:1;ctx.beginPath();ctx.moveTo(x,y+ch*.5);ctx.quadraticCurveTo(x-2,y,x+(random(seed+60)-.5)*7,y-(short?2:7+random(seed+20)*9));ctx.stroke();}
  }
  if(cutCount>0&&cutCount<cut.length){
    const x=cursor.x*width,y=cursor.y*height;ctx.save();ctx.translate(x,y);ctx.shadowColor='#14331c50';ctx.shadowBlur=7;ctx.shadowOffsetY=4;
    ctx.fillStyle='#253a27';ctx.fillRect(-19,-12,38,24);ctx.fillStyle='#d8f36a';ctx.fillRect(-15,-14,30,25);ctx.fillStyle='#173e2b';ctx.fillRect(-9,-9,18,14);ctx.fillStyle='#c66e45';for(const ox of [-21,15])for(const oy of [-13,7])ctx.fillRect(ox,oy,7,10);ctx.shadowBlur=0;ctx.strokeStyle='#f5f3e8';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-11,-13);ctx.lineTo(-11,-31);ctx.lineTo(11,-31);ctx.lineTo(11,-13);ctx.stroke();ctx.restore();
  }
}
function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);render();}
new ResizeObserver(resize).observe(canvas);
function updateProgress(){
  const done=cutCount===cut.length;
  const shown=done?100:Math.floor(cutCount/cut.length*100);$('#lawn-progress').style.width=`${shown}%`;$('.progress-track').setAttribute('aria-valuenow',shown);
  $('#lawn-status').textContent=`${shown}% FRESHLY CUT`;lastAnnounced=shown;
  $('#lawn-intro').hidden=cutCount>0;$('#lawn-done').hidden=!done;
  $('#guided-mow').disabled=done;
}
function mow(x,y){
  cursor={x:Math.max(0,Math.min(1,x)),y:Math.max(0,Math.min(1,y))};
  const col=cursor.x*COLS,row=cursor.y*ROWS;
  for(let r=Math.max(0,Math.floor(row-2.3));r<=Math.min(ROWS-1,Math.ceil(row+2.3));r++)for(let c=Math.max(0,Math.floor(col-2));c<=Math.min(COLS-1,Math.ceil(col+2));c++){
    if(Math.abs(c-col)<2.3&&Math.abs(r-row)<2.5){const i=r*COLS+c;if(!cut[i]){cut[i]=1;cutCount++;}}
  }
}
function pointerPosition(e){const rect=canvas.getBoundingClientRect();return{x:(e.clientX-rect.left)/rect.width,y:(e.clientY-rect.top)/rect.height};}
canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;down=true;canvas.setPointerCapture(e.pointerId);lastPoint=pointerPosition(e);mow(lastPoint.x,lastPoint.y);updateProgress();render();});
canvas.addEventListener('pointermove',e=>{if(!down)return;const point=pointerPosition(e),distance=Math.hypot((point.x-lastPoint.x)*COLS,(point.y-lastPoint.y)*ROWS),steps=Math.max(1,Math.ceil(distance));for(let i=1;i<=steps;i++)mow(lastPoint.x+(point.x-lastPoint.x)*i/steps,lastPoint.y+(point.y-lastPoint.y)*i/steps);lastPoint=point;updateProgress();render();});
function endPointer(){down=false;lastPoint=null;}
canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',endPointer);
canvas.addEventListener('keydown',e=>{const directions={ArrowUp:[0,-.065],ArrowDown:[0,.065],ArrowLeft:[-.04,0],ArrowRight:[.04,0]};if(directions[e.key]){e.preventDefault();const[dX,dY]=directions[e.key];mow(cursor.x+dX,cursor.y+dY);updateProgress();render();}});
$('#guided-mow').addEventListener('click',()=>{let row=guidedRow;for(let r=0;r<ROWS;r++){const candidate=(guidedRow+r)%ROWS;if(cut.subarray(candidate*COLS,(candidate+1)*COLS).some(v=>v===0)){row=candidate;break;}}for(let col=0;col<COLS;col++)mow(col/COLS,row/ROWS);guidedRow=(row+4)%ROWS;updateProgress();render();});
$('#reset-lawn').addEventListener('click',()=>{cut.fill(0);cutCount=0;guidedRow=0;lastAnnounced=0;cursor={x:.12,y:.5};down=false;lastPoint=null;updateProgress();render();});

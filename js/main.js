(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,root=document.documentElement;
var press=function(){};
addEventListener('keydown',function(e){press(e.key)});

/* code rain */
var rc=document.getElementById('rain'),rx=rc.getContext('2d'),drops=[],fs=16,chars='01{}[]<>/\\$#%&=+*ABCDEF',last=0;
function rsize(){rc.width=innerWidth;rc.height=innerHeight;drops=[];for(var i=0;i<Math.ceil(rc.width/fs);i++)drops.push(Math.random()*rc.height/fs)}
addEventListener('resize',rsize);rsize();
function rain(now){
 if(now-last>60){last=now;rx.fillStyle='rgba(5,9,20,.12)';rx.fillRect(0,0,rc.width,rc.height);
  rx.fillStyle=getComputedStyle(root).getPropertyValue('--fg')||'#38E8FF';rx.font=fs+'px monospace';
  for(var i=0;i<drops.length;i++){rx.fillText(chars[Math.floor(Math.random()*chars.length)],i*fs,drops[i]*fs);
   if(drops[i]*fs>rc.height&&Math.random()>.975)drops[i]=0;drops[i]++}}
 requestAnimationFrame(rain);
}
if(!reduce)requestAnimationFrame(rain);

/* typed command lines: each keystroke presses a keycap */
var cmds=[].slice.call(document.querySelectorAll('.cmd'));
cmds.forEach(function(c){c.dataset.t=c.textContent;if(!reduce)c.textContent=''});
function typeIt(el){var s=el.dataset.t,i=0;(function step(){el.textContent=s.slice(0,++i);if(s[i-1]!==' ')press(s[i-1]);if(i<s.length)setTimeout(step,60+Math.random()*70)})()}
if(!reduce&&window.IntersectionObserver){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!e.target.dataset.d){e.target.dataset.d=1;typeIt(e.target)}})},{threshold:.6});
 window.startTyping=function(){cmds.forEach(function(c){io.observe(c)})};
}

/* boot sequence, sound, decrypt headings, progress ticks */
var boot=document.getElementById('boot'),bt=document.getElementById('bootTxt'),entered=false,AC=null,soundOn=false,snd=document.getElementById('snd');
var lines=['> BIOS check ........................ OK','> mounting /dev/earth ................ OK','> plotting 40,000 coordinates ........ OK','> locating target: Camiling, Tarlac ... FOUND','> handshake with karl@camiling ....... SECURE','','[ access granted · press any key to skip ]'],li=0;
function enter(){if(entered)return;entered=true;boot.classList.add('off');document.body.classList.remove('booting');scrollTo(0,0);if(window.startTyping)startTyping();if(window.startDecrypt)startDecrypt();setTimeout(function(){boot.remove()},900)}
function bootStep(){if(entered)return;if(li<lines.length){bt.textContent+=lines[li++]+'\n';setTimeout(bootStep,330)}else setTimeout(enter,1100)}
if(reduce){boot.style.display='none';entered=true}else{document.body.classList.add('booting');bootStep();boot.addEventListener('click',enter);addEventListener('keydown',enter)}
function clack(){if(!soundOn||!AC)return;var t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='square';o.frequency.setValueAtTime(1100+Math.random()*300,t);o.frequency.exponentialRampToValueAtTime(140,t+.05);g.gain.setValueAtTime(.04,t);g.gain.exponentialRampToValueAtTime(.001,t+.06);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.07)}
snd.addEventListener('click',function(){soundOn=!soundOn;if(soundOn&&!AC)AC=new(window.AudioContext||window.webkitAudioContext)();if(AC&&AC.state==='suspended')AC.resume();snd.textContent='sound: '+(soundOn?'on':'off');snd.setAttribute('aria-pressed',soundOn);clack()});
var hs=[].slice.call(document.querySelectorAll('h2')),SC='01#$%&<>/\\{}[]';
function decrypt(el){var s=el.dataset.t,n=0;(function f(){el.textContent=s.split('').map(function(c,i){return c===' '||i<n?c:SC[Math.random()*SC.length|0]}).join('');n+=.7;if(n<s.length+1)requestAnimationFrame(f);else el.textContent=s})()}
if(!reduce&&window.IntersectionObserver){hs.forEach(function(h){h.dataset.t=h.textContent});var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!e.target.dataset.x){e.target.dataset.x=1;decrypt(e.target)}})},{threshold:.8});window.startDecrypt=function(){hs.forEach(function(h){io2.observe(h)})}}
var pgEl=document.getElementById('prog'),ticks=[];for(var qi=0;qi<7;qi++){var tkEl=document.createElement('i');pgEl.appendChild(tkEl);ticks.push(tkEl)}

/* interactive terminal, breach simulation, packet log, cursor trail */
var term=document.getElementById('term'),tOut=document.getElementById('termOut'),tIn=document.getElementById('termIn'),hist=[],hi=0,kseq=[],lock=document.getElementById('lock');
function say(t,c){var d=document.createElement('div');if(c)d.className=c;d.textContent=t;tOut.appendChild(d);tOut.scrollTop=tOut.scrollHeight}
function toggleTerm(f){var o=f===undefined?!term.classList.contains('open'):f;term.classList.toggle('open',o);if(o){if(!tOut.children.length)say("type 'help' to list commands");setTimeout(function(){tIn.focus()},60)}else tIn.blur()}
document.getElementById('trm').addEventListener('click',function(){toggleTerm()});
var SEC={about:'about',experience:'experience',projects:'projects',skills:'skills',education:'awards',contact:'contact',home:'home'};
var OUT={
 whoami:'Karl Patrick S. Mandapat · Software Engineer / Web and System Developer',
 about:'Cum Laude BSIT grad (2026). 486 hrs full-stack at LGU Camiling. Built a production HRMS with PHP, MySQL and JavaScript.',
 skills:'PHP, MySQL, JavaScript, HTML, CSS, Linux (Ubuntu), pfSense, DNS, Git, Arduino, Flutter (basic)',
 projects:'HRMS · Smart Water Dispenser (IoT) · Flowershop App (Flutter) · Portfolio Website',
 experience:'IT Intern, LGU Camiling HRMO · Jan to Apr 2026 · 486 hrs',
 education:'BSIT, Tarlac Agricultural University · Cum Laude · Hackathon 2025 Champion (Team NEXUS)',
 contact:'kaarrlllmandapat@gmail.com · Camiling, Tarlac, Philippines'};
function hack(){var b=document.getElementById('breach'),o=b.querySelector('pre'),L=['[*] scanning 192.168.0.0/24 ...','[+] host found: portfolio.local','[*] bypassing firewall ...','[*] brute-forcing admin login ████████░░ 80%','[+] root shell obtained','[!] ACCESS GRANTED','','just kidding. this is a simulation :)','no systems were harmed.'],i=0;
 b.classList.add('on');o.textContent='';(function st(){if(i<L.length){o.textContent+=L[i++]+'\n';press();setTimeout(st,420)}else setTimeout(function(){b.classList.remove('on')},1800)})()}
function run(raw){
 var a=raw.trim().split(/\s+/),c=(a[0]||'').toLowerCase(),r=(a[1]||'').toLowerCase();
 if(!c)return;
 if(c==='help')say('commands: whoami about experience projects skills education contact · ls · cat <name> · goto <section> · hack · clear · exit');
 else if(c==='ls')say('about  experience  projects  skills  education  contact');
 else if(c==='cat'&&OUT[r])run(r);
 else if(c==='cat')say('cat: '+r+': No such file','e');
 else if(c==='goto'&&SEC[r]){say('-> '+r);location.hash='#'+SEC[r]}
 else if(c==='goto')say('goto: unknown section','e');
 else if(OUT[c]){say(OUT[c]);if(SEC[c])location.hash='#'+SEC[c]}
 else if(c==='sudo')say('karl is not in the sudoers file. This incident will be reported.','e');
 else if(c==='hack'){toggleTerm(false);hack()}
 else if(c==='clear')tOut.textContent='';
 else if(c==='exit')toggleTerm(false);
 else say(c+': command not found','e');
}
tIn.addEventListener('keydown',function(e){
 e.stopPropagation();press(e.key);
 if(e.key==='Enter'){var v=tIn.value;say('$ '+v);hist.push(v);hi=hist.length;tIn.value='';run(v)}
 else if(e.key==='ArrowUp'){hi=Math.max(0,hi-1);tIn.value=hist[hi]||'';e.preventDefault()}
 else if(e.key==='ArrowDown'){hi=Math.min(hist.length,hi+1);tIn.value=hist[hi]||'';e.preventDefault()}
 else if(e.key==='Escape'||e.key==='`'){toggleTerm(false);e.preventDefault()}
});
addEventListener('keydown',function(e){
 if(e.key==='`'){toggleTerm();e.preventDefault();return}
 kseq.push(e.key);kseq=kseq.slice(-10);
 if(kseq.join()==='ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a')hack();
});
var lg=document.getElementById('log'),LT=['[SYN] % -> :443','[ACK] % <- :443','[TLS] handshake ok %','[DNS] query karl.local <- %','[SSH] key exchange %','[ALERT] port scan blocked %'];
function ip(){return '10.'+(Math.random()*255|0)+'.'+(Math.random()*255|0)+'.'+(Math.random()*255|0)}
function logLine(){var t=LT[Math.random()*LT.length|0],d=document.createElement('div');d.textContent=t.replace('%',ip());if(t.indexOf('ALERT')===1)d.className='a';lg.appendChild(d);while(lg.children.length>7)lg.removeChild(lg.firstChild)}
if(!reduce){setInterval(logLine,800);
 var lt=0;addEventListener('pointermove',function(e){var n=performance.now();if(n-lt<45||e.pointerType==='touch')return;lt=n;var sp=document.createElement('span');sp.className='tr';sp.textContent=Math.random().toString(16).slice(2,4).toUpperCase();sp.style.left=e.clientX+'px';sp.style.top=e.clientY+'px';document.body.appendChild(sp);setTimeout(function(){sp.remove()},700)})}

if(!window.THREE)return;
var canvas=document.getElementById('gl'),hud=document.getElementById('hud'),vig=document.getElementById('vig');
var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
var scene=new THREE.Scene();
var cam=new THREE.PerspectiveCamera(35,1,.1,80);cam.position.z=11;
scene.add(new THREE.HemisphereLight(0xbfd8ff,0x060818,.9));
var dl=new THREE.DirectionalLight(0xffffff,1.1);dl.position.set(3,4,6);scene.add(dl);
var pl=new THREE.PointLight(0x38E8FF,1.4,25);pl.position.set(-4,-2,4);scene.add(pl);
var holder=new THREE.Group(),pitch=new THREE.Group(),spin=new THREE.Group(),keysG=new THREE.Group();
scene.add(holder,keysG);holder.add(pitch);pitch.add(spin);
function ll(lat,lon,r){var a=lat*Math.PI/180,b=lon*Math.PI/180;return new THREE.Vector3(r*Math.cos(a)*Math.sin(b),r*Math.sin(a),r*Math.cos(a)*Math.cos(b))}

/* stars */
var sa=[];for(var i=0;i<1800;i++){var v=new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(20+Math.random()*30);sa.push(v.x,v.y,v.z)}
var sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(sa,3));
var stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0x38E8FF,size:.06,transparent:true,opacity:.7}));scene.add(stars);

/* Earth: land polygons (lon,lat pairs) rasterised then sampled into dots */
var LAND=[
[-168,66,-141,70,-110,72,-95,72,-82,68,-80,62,-93,59,-85,55,-79,52,-77,60,-65,60,-56,52,-66,45,-70,42,-76,35,-81,31,-80,25,-84,30,-90,29,-97,26,-97,20,-91,19,-87,21,-88,16,-83,10,-79,8,-83,8,-88,13,-96,16,-105,20,-110,24,-112,30,-117,32,-124,40,-125,48,-135,58,-150,60,-158,57,-165,62],
[-44,60,-52,66,-58,75,-45,83,-22,82,-20,72,-30,68,-40,62],
[-79,8,-72,12,-62,11,-52,5,-50,0,-35,-5,-39,-15,-41,-22,-48,-26,-58,-35,-65,-41,-68,-52,-72,-54,-75,-48,-73,-38,-71,-25,-70,-18,-76,-14,-81,-5,-80,0,-77,4],
[-10,36,-9,43,-2,43,-4,48,2,51,8,54,10,57,5,60,5,62,14,68,25,71,32,70,30,60,28,56,34,52,40,48,38,45,28,41,26,36,22,37,18,40,12,38,8,44,3,43,-5,36],
[-17,21,-10,30,-6,36,10,37,20,32,32,31,35,28,43,12,51,12,45,2,40,-5,40,-15,35,-24,32,-29,26,-34,18,-34,14,-22,12,-6,9,4,-8,4,-13,8,-17,14],
[26,41,36,37,34,31,35,28,43,13,52,16,58,22,56,26,62,25,68,23,72,20,77,8,80,15,87,21,92,22,98,16,100,8,104,1,108,11,106,20,110,21,122,30,121,38,128,35,130,42,140,48,142,54,156,58,163,60,180,66,180,70,160,70,130,72,110,77,90,76,70,73,68,68,60,69,45,68,40,66,32,70,30,60,28,56,34,52,40,48,38,45],
[114,-22,122,-18,131,-12,137,-12,142,-11,146,-19,153,-26,150,-37,141,-38,131,-31,115,-34],
[-5,50,1,51,-2,56,-5,58,-6,54],[130,31,135,34,141,38,142,45,140,40,136,36],[-24,65,-14,66,-14,64,-22,63.5],[44,-25,47,-25,50,-15,49,-12,44,-17],
[120.3,18.5,122.2,18.6,122.3,16.2,121.6,14.2,124.1,13.2,123.5,12.6,121.6,13.4,120.7,13.9,120,14.8,119.8,16.3],
[120.3,13.5,121.5,13.4,121.2,12.2,120.4,12.4],[117.2,8.4,119.4,11.4,119.9,11.3,118.3,9],
[124.2,12.5,125.6,12.4,125.6,9.9,124.9,10.2,124.4,11],[121.9,11.9,123.1,11.6,122.8,10.4,122,10.8],[122.4,10.9,123.4,10.5,123.2,9,122.5,9.3],
[122,7,123.5,8.6,125.3,9.8,126.4,8.8,126.5,7.2,125.9,6.1,125.2,5.7,124.1,6.3,123.4,7.7,122.5,7],
[120.1,23,121.5,25.2,122,25,121.4,22.6,120.8,21.9],
[109,1.5,111,2,114,4.5,116.7,7,119,5,117.5,1,116.5,-3,114,-4,110,-3,109,-1],
[95.3,5.6,98.7,3.7,104,-1,106,-5.9,102,-4,98,.5],[105.2,-6.8,108,-6.3,114.5,-7.8,108,-8.1,106,-7.4],
[131,-1,141,-2.5,147,-6,150,-10,143,-9,138,-8,134,-4]];
var cv=document.createElement('canvas');cv.width=1440;cv.height=720;var cx=cv.getContext('2d');cx.fillStyle='#fff';
LAND.forEach(function(p){cx.beginPath();for(var i=0;i<p.length;i+=2){var X=(p[i]+180)*4,Y=(90-p[i+1])*4;i?cx.lineTo(X,Y):cx.moveTo(X,Y)}cx.closePath();cx.fill()});
cx.fillRect(0,640,1440,80);
var img=cx.getImageData(0,0,1440,720).data,land=[],sea=[],N=40000;
for(var i=0;i<N;i++){var y=1-2*(i+.5)/N,lat=Math.asin(y)*180/Math.PI,lon=((i*2.399963)%6.283185)*180/Math.PI-180;
 var px=Math.min(1439,(lon+180)*4|0),py=Math.min(719,(90-lat)*4|0),v=ll(lat,lon,1.5);
 if(img[(py*1440+px)*4+3]>0)land.push(v.x,v.y,v.z);else if(i%3===0)sea.push(v.x,v.y,v.z)}
function pts(a,size,op){var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(a,3));
 return new THREE.Points(g,new THREE.PointsMaterial({color:0x38E8FF,size:size,transparent:true,opacity:op}))}
var landP=pts(land,.016,.95),seaP=pts(sea,.01,.16);
var ocean=new THREE.Mesh(new THREE.SphereGeometry(1.48,64,32),new THREE.MeshBasicMaterial({color:0x040816}));
var grid=new THREE.Mesh(new THREE.SphereGeometry(1.5,36,18),new THREE.MeshBasicMaterial({wireframe:true,color:0x38E8FF,transparent:true,opacity:.07}));
spin.add(ocean,grid,landP,seaP);

/* arcs converging on Camiling, Tarlac (15.69N, 120.41E) */
var CT={NY:[40.7,-74],LON:[51.5,-.1],MUM:[19,72.8],TKY:[35.7,139.7],SYD:[-33.9,151.2],SP:[-23.5,-46.6],CAM:[15.69,120.41]},mk=[];
var packets=[];var arcMat=new THREE.LineBasicMaterial({color:0xA855F7,transparent:true,opacity:.85});
[['NY','LON'],['LON','MUM'],['MUM','TKY'],['SP','NY'],['NY','CAM'],['LON','CAM'],['TKY','CAM'],['SYD','CAM']].forEach(function(p){
 var a=ll(CT[p[0]][0],CT[p[0]][1],1.5),b=ll(CT[p[1]][0],CT[p[1]][1],1.5),m=a.clone().add(b).multiplyScalar(.5).setLength(1.5+a.distanceTo(b)*.35);
 var cu=new THREE.QuadraticBezierCurve3(a,m,b);spin.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cu.getPoints(48)),arcMat));
 var pk=new THREE.Mesh(new THREE.SphereGeometry(.026,8,8),new THREE.MeshBasicMaterial({color:0xFFFFFF}));spin.add(pk);packets.push({cu:cu,m:pk,o:Math.random(),s:.15+Math.random()*.2})});
for(var c in CT){var v=ll(CT[c][0],CT[c][1],1.51);mk.push(v.x,v.y,v.z)}
var mkP=pts(mk,.05,1);mkP.material.color.set(0xA855F7);spin.add(mkP);
var tp=ll(15.69,120.41,1.51),pulses=[];
spin.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([tp,tp.clone().multiplyScalar(1.35)]),new THREE.LineBasicMaterial({color:0xA855F7})));
[0,.5].forEach(function(o){var m=new THREE.Mesh(new THREE.RingGeometry(.016,.022,48),new THREE.MeshBasicMaterial({color:0xA855F7,transparent:true,side:THREE.DoubleSide,depthWrite:false}));
 m.position.copy(tp);spin.add(m);m.lookAt(tp.clone().multiplyScalar(2));pulses.push({m:m,o:o})});

var atmo=new THREE.Mesh(new THREE.SphereGeometry(1.66,48,24),new THREE.MeshBasicMaterial({color:0x38E8FF,transparent:true,opacity:.09,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false}));
holder.add(atmo);
var orbit=new THREE.Group();orbit.rotation.set(1.15,0,.4);holder.add(orbit);
var oMat=new THREE.MeshBasicMaterial({color:0x38E8FF,transparent:true,opacity:.5});
orbit.add(new THREE.Mesh(new THREE.TorusGeometry(2.2,.01,8,160),oMat));
var sat=new THREE.Mesh(new THREE.BoxGeometry(.14,.14,.14),new THREE.MeshBasicMaterial({color:0x38E8FF}));orbit.add(sat);

/* floating keycaps */
var labels=['ESC','{ }','>_','$','#','ROOT','CTRL','ALT','DEL','SUDO','0','1','A','S','X','ENTER'],keys=[],map={};
function legend(t,w){var c=document.createElement('canvas');c.width=128*w;c.height=128;var g=c.getContext('2d');
 g.fillStyle='#38E8FF';g.textAlign='center';g.textBaseline='middle';g.font='bold '+(t.length>3?38:t.length>1?52:76)+'px monospace';g.fillText(t,c.width/2,66);
 return new THREE.CanvasTexture(c)}
labels.forEach(function(t,i){
 var w=t==='ENTER'?2.1:t.length>3?1.3:1,g=new THREE.Group(),inner=new THREE.Group();
 var mat=new THREE.MeshStandardMaterial({color:0x141a2e,roughness:.45,metalness:.15,emissive:0x000000});
 var cap=new THREE.Mesh(new THREE.CylinderGeometry(.43,.57,.4,4),mat);cap.rotation.y=Math.PI/4;cap.scale.x=w;
 var top=new THREE.Mesh(new THREE.PlaneGeometry(.5*w,.5),new THREE.MeshBasicMaterial({map:legend(t,w),transparent:true}));
 top.rotation.x=-Math.PI/2;top.position.y=.205;
 var base=new THREE.Mesh(new THREE.BoxGeometry(.82*w,.08,.82),mat);base.position.y=-.22;
 inner.add(cap,top,base);g.add(inner);g.scale.setScalar(.75);
 var ang=i*2.4,rad=3.5+(i%3)*.55,k={g:g,inner:inner,mat:mat,press:0,i:i,bx:Math.cos(ang)*rad,by:((i%5)-2)*.85,bz:Math.sin(ang)*rad*.7};
 keysG.add(g);keys.push(k);map[t]=k});
press=function(ch,quiet){var k=map[String(ch||'').toUpperCase()]||keys[Math.random()*keys.length|0];k.press=1;if(!quiet)clack()};

/* scroll journey: world yaw/pitch (centre lon/lat), camera distance, side of globe */
var G='#38E8FF',R='#B388FF',D=Math.PI/180;
var K=[
 {yaw:1.22+6.283,pit:.35,z:11,side:1,bg:'#050914',fg:G},
 {yaw:.17,pit:.4,z:9,side:1,bg:'#060B1A',fg:G},
 {yaw:-.79,pit:.4,z:7.4,side:-1,bg:'#060B1A',fg:G},
 {yaw:-1.34,pit:.35,z:6,side:1,bg:'#0B0618',fg:R},
 {yaw:-1.75,pit:.3,z:4.8,side:-1,bg:'#060B1A',fg:G},
 {yaw:-1.95,pit:.28,z:3.9,side:1,bg:'#050914',fg:G},
 {yaw:-120.41*D,pit:15.69*D,z:3.2,side:-1,bg:'#02040C',fg:G}
];
var cols=K.map(function(k){return{bg:new THREE.Color(k.bg),fg:new THREE.Color(k.fg)}});
var F=['yaw','pit','z','side'],cur={},tgt={},prog=0,narrow=false,t0=performance.now(),tl=t0,fc=0;
F.forEach(function(n){cur[n]=tgt[n]=K[0][n]});
var bgc=new THREE.Color(),fgc=new THREE.Color(0x38E8FF);
var mx=0,my=0,sm={x:0,y:0},lastY=0,vel=0,lastSec=-1,lv=new THREE.Vector3();addEventListener('pointermove',function(e){mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1});
function resize(){var w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);cam.aspect=w/h;narrow=w<900;cam.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
function ease(t){return t*t*(3-2*t)}
function update(){
 var max=document.documentElement.scrollHeight-innerHeight;prog=max>0?Math.min(1,scrollY/max):0;
 var f=prog*(K.length-1),i=Math.min(Math.floor(f),K.length-2),t=ease(f-i),a=K[i],b=K[i+1];
 ticks.forEach(function(tk,j){tk.classList.toggle('on',j===Math.round(f))});
 var s2=Math.round(f);if(s2!==lastSec){lastSec=s2;if(!reduce){canvas.classList.remove('glitch');void canvas.offsetWidth;canvas.classList.add('glitch');setTimeout(function(){canvas.classList.remove('glitch')},320)}}
 F.forEach(function(n){tgt[n]=a[n]+(b[n]-a[n])*t});
 bgc.copy(cols[i].bg).lerp(cols[i+1].bg,t);fgc.copy(cols[i].fg).lerp(cols[i+1].fg,t);
 root.style.setProperty('--bg','#'+bgc.getHexString());root.style.setProperty('--fg','#'+fgc.getHexString());
}
addEventListener('scroll',update,{passive:true});update();
function fmt(v,p,n){return Math.abs(v).toFixed(2)+'°'+(v>=0?p:n)}

function frame(now){
 var k=reduce?1:.07,tt=reduce?0:(now-t0)/1000,dt=Math.min(.05,(now-tl)/1000);tl=now;
 F.forEach(function(n){cur[n]+=(tgt[n]-cur[n])*k});
 var zp=Math.max(0,Math.min(1,(11-cur.z)/7.8)),zz=cur.z*(narrow?1.12:1);
 cam.position.z=zz;
 var hh=.315*(zz-1.5),hw=hh*cam.aspect;
 holder.position.set(narrow?0:cur.side*hw*.42,narrow?hh*.42:0,0);
 sm.x+=(mx-sm.x)*.06;sm.y+=(my-sm.y)*.06;
 holder.rotation.set(sm.y*.15,sm.x*.25,0);
 keysG.position.copy(holder.position);keysG.position.x+=sm.x*.4;keysG.position.y-=sm.y*.3;
 if(!reduce){vel+=(Math.abs(scrollY-lastY)-vel)*.15;lastY=scrollY;cam.fov=35+Math.min(16,vel*.3);cam.updateProjectionMatrix()}
 var yaw=cur.yaw+tt*.1*(1-zp);
 pitch.rotation.x=cur.pit;spin.rotation.y=yaw;
 vig.style.opacity=(.2+zp*.7).toFixed(2);
 var os=1-Math.max(0,Math.min(1,(zp-.45)/.3));orbit.scale.setScalar(Math.max(.001,os));
 var ang=tt*.6+prog*8;sat.position.set(Math.cos(ang)*2.2,Math.sin(ang)*2.2,0);
 landP.material.color.copy(fgc);seaP.material.color.copy(fgc);grid.material.color.copy(fgc);atmo.material.color.copy(fgc);oMat.color.copy(fgc);sat.material.color.copy(fgc);pl.color.copy(fgc);stars.material.color.copy(fgc);
 stars.rotation.y=prog*.9+tt*.004;stars.rotation.x=prog*.3;
 packets.forEach(function(p){p.m.position.copy(p.cu.getPoint((tt*p.s+p.o)%1))});
 pulses.forEach(function(p){var ph=reduce?.3+p.o:(tt*.7+p.o)%1;if(ph>1)ph-=1;p.m.scale.setScalar(1+ph*5);p.m.material.opacity=(1-ph)*.9});
 var km=keysG,m=1+zp*zp*2.4;
 keys.forEach(function(q){
  q.g.position.set(q.bx*m,q.by*m+Math.sin(tt*.8+q.i)*.15,q.bz*m);
  q.g.rotation.set(1.15+Math.sin(tt*.5+q.i)*.2,tt*.35+q.i,Math.cos(tt*.4+q.i)*.15);
  q.press=Math.max(0,q.press-dt*3);q.inner.position.y=-q.press*.16;
  q.mat.emissive.copy(fgc).multiplyScalar(q.press*.7);
 });
 km.rotation.y=prog*3+tt*.05;
 if(!reduce&&Math.random()<.02)press(null,1);
 if(++fc%4===0){
  var lon=((-yaw/D+540)%360)-180,lat=cur.pit/D,alt=Math.round((zz-1.5)*4247/100)*100;
  hud.innerHTML='LAT '+fmt(lat,'N','S')+' · LON '+fmt(lon,'E','W')+'<br>ALT '+alt.toLocaleString('en-US')+' km'+(zp>.93?'<br><b>TARGET LOCKED: CAMILING, TARLAC, PH</b>':'');
 }
 spin.updateWorldMatrix(true,false);lv.copy(tp);spin.localToWorld(lv);lv.project(cam);
 lock.style.left=((lv.x*.5+.5)*innerWidth)+'px';lock.style.top=((-lv.y*.5+.5)*innerHeight)+'px';lock.style.opacity=zp>.85?1:0;
 renderer.render(scene,cam);requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();

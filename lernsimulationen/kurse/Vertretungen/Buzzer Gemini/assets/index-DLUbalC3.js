var ut=Object.defineProperty;var ft=(s,t,r)=>t in s?ut(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var x=(s,t,r)=>ft(s,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();const G=["#E69F00","#56B4E9","#009E73","#F0E442","#0072B2","#D55E00","#CC79A7","#999999","#661100","#6699CC","#882255","#44AA99","#117733","#332288","#AA4499","#DDCC77"],K=["Tiger","Orcas","Vulkane","Eulen","Wölfe","Pinguine","Adler","Löwen","Panther","Geparden","Delfine","Haie","Falke","Kolibris","Krokodile","Bären","Bisons","Luchse","Gecko","Chamäleons","Mantrakrabben","Tukane","Biber","Elche","Füchse","Kometen","Saturn","Phönix","Galaxien","Supernova","Asteroiden","Pulsare","Neptun","Orion","Sirius","Kosmonauten","Meteoriten","Sonnenstürme","Staubwolken","Milchstraße","Jupiter","Andromeda","Lichtjahre","Neutronen","Schwarze Löcher","Roboter","Quanten","Photonen","Laser","Elektronen","Algorithmen","Protonen","Tachyonen","Megabyte","Zahnräder","Nanobots","Hyperlinks","Matrix","Stromkreise","Vektoren","Pyramiden","Turbinen","Transistoren","Schaltkreise","Reaktoren","Drachen","Titanen","Gryphons","Hydra","Götter","Pegasus","Sphinx","Zentauren","Minotauren","Odysseus","Valkyren","Kraken","Neptune","Salamander","Siren","Wirbelstürme","Blitze","Tsunamis","Lawinen","Feuerbälle","Magma","Geysire","Orkane","Zyklone","Kristalle","Diamanten","Gletscher","Rubine","Smaragde","Magneten","Eisberge","Sturmkräuter","Tornado","Meteor","Polarlicht"];class nt{static getRandomName(t=[]){const r=K.filter(e=>!t.includes(e));return r.length===0?`${K[Math.floor(Math.random()*K.length)]} ${Math.floor(Math.random()*99)+1}`:r[Math.floor(Math.random()*r.length)]}static assignColor(t){return G[t%G.length]}}const ht="cb_session_",gt="cb_channel_";class pt{constructor(){x(this,"activeCode",null);x(this,"channel",null);x(this,"listeners",[])}generateSessionCode(){const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="";for(let e=0;e<4;e++)r+=t.charAt(Math.floor(Math.random()*t.length));return r}getSessionKey(t){return`${ht}${t.toUpperCase()}`}saveState(t){t.lastUpdate=Date.now();const r=this.getSessionKey(t.code);try{localStorage.setItem(r,JSON.stringify(t))}catch(e){console.warn("LocalStorage save failed:",e)}this.broadcast(t)}loadState(t){const r=this.getSessionKey(t),e=localStorage.getItem(r);if(!e)return null;try{return JSON.parse(e)}catch(n){return console.error("Failed to parse session state:",n),null}}initChannel(t){const r=t.toUpperCase();if(this.activeCode===r&&this.channel)return;this.channel&&this.channel.close(),this.activeCode=r;const e=`${gt}${r}`;typeof BroadcastChannel<"u"&&(this.channel=new BroadcastChannel(e),this.channel.onmessage=n=>{n.data&&n.data.code===r&&this.notifyListeners(n.data)}),window.onstorage=n=>{if(n.key===this.getSessionKey(r)&&n.newValue)try{const i=JSON.parse(n.newValue);this.notifyListeners(i)}catch(i){console.error(i)}}}broadcast(t){if(this.channel)try{this.channel.postMessage(t)}catch(r){console.warn("BroadcastChannel postMessage failed",r)}this.notifyListeners(t)}notifyListeners(t){this.listeners.forEach(r=>r(t))}async createSession(t="buzzer"){const r=this.generateSessionCode(),n={code:r,mode:t,groupMode:"individual",isActive:!0,isLocked:!1,roundNumber:1,participants:{},buzzes:[],votes:{},settings:{soundEnabled:!0,soundType:"buzzer",animationEnabled:!0,confettiEnabled:!0,vibrationEnabled:!0,autoLock:!0,visiblePlaces:5,countdownSeconds:3,pollOptions:["A","B","C","D"],pollTitle:"Umfrage",darkMode:!1},countdown:null,lastUpdate:Date.now()};return this.initChannel(r),this.saveState(n),n}async joinSession(t,r,e){const n=t.toUpperCase(),i=this.loadState(n);if(!i)throw new Error(`Sitzung mit Code "${n}" wurde nicht gefunden.`);this.initChannel(n);const o=e?r.trim():r.trim().toUpperCase().slice(0,3);if(!o)throw new Error("Bitte gib einen gültigen Namen oder eine Gruppe an.");const c=Object.keys(i.participants).length,a=nt.assignColor(c),l=Object.values(i.participants).find(d=>d.name.toUpperCase()===o.toUpperCase());if(l)return l;const u={id:"p_"+Math.random().toString(36).substring(2,9),name:o,color:a,score:0,joinedAt:Date.now(),isGroup:e};return i.participants[u.id]=u,this.saveState(i),u}async submitBuzz(t,r){const e=this.loadState(t);if(!e||!e.isActive||e.isLocked||e.buzzes.some(o=>o.participantId===r))return!1;const i=e.buzzes.length+1;return e.buzzes.push({participantId:r,timestamp:Date.now(),order:i}),e.settings.autoLock&&e.mode==="buzzer"&&(e.isLocked=!0),this.saveState(e),!0}async submitVote(t,r,e){const n=this.loadState(t);return!n||!n.isActive||n.isLocked?!1:(n.votes[r]={participantId:r,option:e,timestamp:Date.now()},this.saveState(n),!0)}async getState(t){const r=t.toUpperCase();return this.initChannel(r),this.loadState(r)}subscribeToState(t,r){const e=t.toUpperCase();this.initChannel(e),this.listeners.push(r);const n=this.loadState(e);return n&&r(n),()=>{this.listeners=this.listeners.filter(i=>i!==r)}}async updateSettings(t,r){const e=this.loadState(t);e&&(e.settings={...e.settings,...r},this.saveState(e))}async setMode(t,r){const e=this.loadState(t);e&&(e.mode=r,e.buzzes=[],e.votes={},e.isLocked=!1,this.saveState(e))}async setGroupMode(t,r){const e=this.loadState(t);e&&(e.groupMode=r,this.saveState(e))}async setParticipantColor(t,r,e){const n=this.loadState(t);!n||!n.participants[r]||(n.participants[r].color=e,this.saveState(n))}async removeParticipant(t,r){const e=this.loadState(t);e&&(delete e.participants[r],e.buzzes=e.buzzes.filter(n=>n.participantId!==r),delete e.votes[r],this.saveState(e))}async updateScore(t,r,e){const n=this.loadState(t);!n||!n.participants[r]||(n.participants[r].score+=e,this.saveState(n))}async startCountdown(t,r=3){const e=this.loadState(t);if(!e)return;e.isLocked=!0,e.countdown=r,this.saveState(e);let n=r;const i=setInterval(()=>{n-=1;const o=this.loadState(t);if(!o){clearInterval(i);return}n<=0?(clearInterval(i),o.countdown=null,o.isLocked=!1):o.countdown=n,this.saveState(o)},1e3)}async toggleLock(t,r){const e=this.loadState(t);e&&(e.isLocked=r!==void 0?r:!e.isLocked,this.saveState(e))}async resetRound(t){const r=this.loadState(t);r&&(r.buzzes=[],r.votes={},r.isLocked=!1,r.roundNumber+=1,r.countdown=null,this.saveState(r))}async clearResults(t){const r=this.loadState(t);r&&(r.buzzes=[],r.votes={},r.isLocked=!1,this.saveState(r))}}let mt=new pt;function D(){return mt}function bt(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var _={},Z,Ae;function yt(){return Ae||(Ae=1,Z=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Z}var X={},q={},Me;function $(){if(Me)return q;Me=1;let s;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return q.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17},q.getSymbolTotalCodewords=function(e){return t[e]},q.getBCHDigit=function(r){let e=0;for(;r!==0;)e++,r>>>=1;return e},q.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');s=e},q.isKanjiModeEnabled=function(){return typeof s<"u"},q.toSJIS=function(e){return s(e)},q}var ee={},ze;function Ce(){return ze||(ze=1,(function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function t(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+r)}}s.isValid=function(e){return e&&typeof e.bit<"u"&&e.bit>=0&&e.bit<4},s.from=function(e,n){if(s.isValid(e))return e;try{return t(e)}catch{return n}}})(ee)),ee}var te,Te;function vt(){if(Te)return te;Te=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(t){const r=Math.floor(t/8);return(this.buffer[r]>>>7-t%8&1)===1},put:function(t,r){for(let e=0;e<r;e++)this.putBit((t>>>r-e-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}},te=s,te}var ne,Re;function wt(){if(Re)return ne;Re=1;function s(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return s.prototype.set=function(t,r,e,n){const i=t*this.size+r;this.data[i]=e,n&&(this.reservedBit[i]=!0)},s.prototype.get=function(t,r){return this.data[t*this.size+r]},s.prototype.xor=function(t,r,e){this.data[t*this.size+r]^=e},s.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]},ne=s,ne}var re={},ke;function Ct(){return ke||(ke=1,(function(s){const t=$().getSymbolSize;s.getRowColCoords=function(e){if(e===1)return[];const n=Math.floor(e/7)+2,i=t(e),o=i===145?26:Math.ceil((i-13)/(2*n-2))*2,c=[i-7];for(let a=1;a<n-1;a++)c[a]=c[a-1]-o;return c.push(6),c.reverse()},s.getPositions=function(e){const n=[],i=s.getRowColCoords(e),o=i.length;for(let c=0;c<o;c++)for(let a=0;a<o;a++)c===0&&a===0||c===0&&a===o-1||c===o-1&&a===0||n.push([i[c],i[a]]);return n}})(re)),re}var ie={},xe;function St(){if(xe)return ie;xe=1;const s=$().getSymbolSize,t=7;return ie.getPositions=function(e){const n=s(e);return[[0,0],[n-t,0],[0,n-t]]},ie}var oe={},Le;function Et(){return Le||(Le=1,(function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};s.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},s.from=function(n){return s.isValid(n)?parseInt(n,10):void 0},s.getPenaltyN1=function(n){const i=n.size;let o=0,c=0,a=0,l=null,u=null;for(let d=0;d<i;d++){c=a=0,l=u=null;for(let h=0;h<i;h++){let f=n.get(d,h);f===l?c++:(c>=5&&(o+=t.N1+(c-5)),l=f,c=1),f=n.get(h,d),f===u?a++:(a>=5&&(o+=t.N1+(a-5)),u=f,a=1)}c>=5&&(o+=t.N1+(c-5)),a>=5&&(o+=t.N1+(a-5))}return o},s.getPenaltyN2=function(n){const i=n.size;let o=0;for(let c=0;c<i-1;c++)for(let a=0;a<i-1;a++){const l=n.get(c,a)+n.get(c,a+1)+n.get(c+1,a)+n.get(c+1,a+1);(l===4||l===0)&&o++}return o*t.N2},s.getPenaltyN3=function(n){const i=n.size;let o=0,c=0,a=0;for(let l=0;l<i;l++){c=a=0;for(let u=0;u<i;u++)c=c<<1&2047|n.get(l,u),u>=10&&(c===1488||c===93)&&o++,a=a<<1&2047|n.get(u,l),u>=10&&(a===1488||a===93)&&o++}return o*t.N3},s.getPenaltyN4=function(n){let i=0;const o=n.data.length;for(let a=0;a<o;a++)i+=n.data[a];return Math.abs(Math.ceil(i*100/o/5)-10)*t.N4};function r(e,n,i){switch(e){case s.Patterns.PATTERN000:return(n+i)%2===0;case s.Patterns.PATTERN001:return n%2===0;case s.Patterns.PATTERN010:return i%3===0;case s.Patterns.PATTERN011:return(n+i)%3===0;case s.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(i/3))%2===0;case s.Patterns.PATTERN101:return n*i%2+n*i%3===0;case s.Patterns.PATTERN110:return(n*i%2+n*i%3)%2===0;case s.Patterns.PATTERN111:return(n*i%3+(n+i)%2)%2===0;default:throw new Error("bad maskPattern:"+e)}}s.applyMask=function(n,i){const o=i.size;for(let c=0;c<o;c++)for(let a=0;a<o;a++)i.isReserved(a,c)||i.xor(a,c,r(n,a,c))},s.getBestMask=function(n,i){const o=Object.keys(s.Patterns).length;let c=0,a=1/0;for(let l=0;l<o;l++){i(l),s.applyMask(l,n);const u=s.getPenaltyN1(n)+s.getPenaltyN2(n)+s.getPenaltyN3(n)+s.getPenaltyN4(n);s.applyMask(l,n),u<a&&(a=u,c=l)}return c}})(oe)),oe}var H={},Pe;function rt(){if(Pe)return H;Pe=1;const s=Ce(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return H.getBlocksCount=function(n,i){switch(i){case s.L:return t[(n-1)*4+0];case s.M:return t[(n-1)*4+1];case s.Q:return t[(n-1)*4+2];case s.H:return t[(n-1)*4+3];default:return}},H.getTotalCodewordsCount=function(n,i){switch(i){case s.L:return r[(n-1)*4+0];case s.M:return r[(n-1)*4+1];case s.Q:return r[(n-1)*4+2];case s.H:return r[(n-1)*4+3];default:return}},H}var se={},O={},Ne;function Bt(){if(Ne)return O;Ne=1;const s=new Uint8Array(512),t=new Uint8Array(256);return(function(){let e=1;for(let n=0;n<255;n++)s[n]=e,t[e]=n,e<<=1,e&256&&(e^=285);for(let n=255;n<512;n++)s[n]=s[n-255]})(),O.log=function(e){if(e<1)throw new Error("log("+e+")");return t[e]},O.exp=function(e){return s[e]},O.mul=function(e,n){return e===0||n===0?0:s[t[e]+t[n]]},O}var Ie;function At(){return Ie||(Ie=1,(function(s){const t=Bt();s.mul=function(e,n){const i=new Uint8Array(e.length+n.length-1);for(let o=0;o<e.length;o++)for(let c=0;c<n.length;c++)i[o+c]^=t.mul(e[o],n[c]);return i},s.mod=function(e,n){let i=new Uint8Array(e);for(;i.length-n.length>=0;){const o=i[0];for(let a=0;a<n.length;a++)i[a]^=t.mul(n[a],o);let c=0;for(;c<i.length&&i[c]===0;)c++;i=i.slice(c)}return i},s.generateECPolynomial=function(e){let n=new Uint8Array([1]);for(let i=0;i<e;i++)n=s.mul(n,new Uint8Array([1,t.exp(i)]));return n}})(se)),se}var ae,qe;function Mt(){if(qe)return ae;qe=1;const s=At();function t(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(e){this.degree=e,this.genPoly=s.generateECPolynomial(this.degree)},t.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(e.length+this.degree);n.set(e);const i=s.mod(n,this.genPoly),o=this.degree-i.length;if(o>0){const c=new Uint8Array(this.degree);return c.set(i,o),c}return i},ae=t,ae}var ce={},le={},de={},De;function it(){return De||(De=1,de.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),de}var L={},$e;function ot(){if($e)return L;$e=1;const s="[0-9]+",t="[A-Z $%*+\\-./:]+";let r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";r=r.replace(/u/g,"\\u");const e="(?:(?![A-Z0-9 $%*+\\-./:]|"+r+`)(?:.|[\r
]))+`;L.KANJI=new RegExp(r,"g"),L.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),L.BYTE=new RegExp(e,"g"),L.NUMERIC=new RegExp(s,"g"),L.ALPHANUMERIC=new RegExp(t,"g");const n=new RegExp("^"+r+"$"),i=new RegExp("^"+s+"$"),o=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return L.testKanji=function(a){return n.test(a)},L.testNumeric=function(a){return i.test(a)},L.testAlphanumeric=function(a){return o.test(a)},L}var Fe;function F(){return Fe||(Fe=1,(function(s){const t=it(),r=ot();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(i,o){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!t.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?i.ccBits[0]:o<27?i.ccBits[1]:i.ccBits[2]},s.getBestModeForData=function(i){return r.testNumeric(i)?s.NUMERIC:r.testAlphanumeric(i)?s.ALPHANUMERIC:r.testKanji(i)?s.KANJI:s.BYTE},s.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")},s.isValid=function(i){return i&&i.bit&&i.ccBits};function e(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+n)}}s.from=function(i,o){if(s.isValid(i))return i;try{return e(i)}catch{return o}}})(le)),le}var Ue;function zt(){return Ue||(Ue=1,(function(s){const t=$(),r=rt(),e=Ce(),n=F(),i=it(),o=7973,c=t.getBCHDigit(o);function a(h,f,m){for(let M=1;M<=40;M++)if(f<=s.getCapacity(M,m,h))return M}function l(h,f){return n.getCharCountIndicator(h,f)+4}function u(h,f){let m=0;return h.forEach(function(M){const R=l(M.mode,f);m+=R+M.getBitsLength()}),m}function d(h,f){for(let m=1;m<=40;m++)if(u(h,m)<=s.getCapacity(m,f,n.MIXED))return m}s.from=function(f,m){return i.isValid(f)?parseInt(f,10):m},s.getCapacity=function(f,m,M){if(!i.isValid(f))throw new Error("Invalid QR Code version");typeof M>"u"&&(M=n.BYTE);const R=t.getSymbolTotalCodewords(f),S=r.getTotalCodewordsCount(f,m),T=(R-S)*8;if(M===n.MIXED)return T;const A=T-l(M,f);switch(M){case n.NUMERIC:return Math.floor(A/10*3);case n.ALPHANUMERIC:return Math.floor(A/11*2);case n.KANJI:return Math.floor(A/13);case n.BYTE:default:return Math.floor(A/8)}},s.getBestVersionForData=function(f,m){let M;const R=e.from(m,e.M);if(Array.isArray(f)){if(f.length>1)return d(f,R);if(f.length===0)return 1;M=f[0]}else M=f;return a(M.mode,M.getLength(),R)},s.getEncodedBits=function(f){if(!i.isValid(f)||f<7)throw new Error("Invalid QR Code version");let m=f<<12;for(;t.getBCHDigit(m)-c>=0;)m^=o<<t.getBCHDigit(m)-c;return f<<12|m}})(ce)),ce}var ue={},_e;function Tt(){if(_e)return ue;_e=1;const s=$(),t=1335,r=21522,e=s.getBCHDigit(t);return ue.getEncodedBits=function(i,o){const c=i.bit<<3|o;let a=c<<10;for(;s.getBCHDigit(a)-e>=0;)a^=t<<s.getBCHDigit(a)-e;return(c<<10|a)^r},ue}var fe={},he,Ve;function Rt(){if(Ve)return he;Ve=1;const s=F();function t(r){this.mode=s.NUMERIC,this.data=r.toString()}return t.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){let n,i,o;for(n=0;n+3<=this.data.length;n+=3)i=this.data.substr(n,3),o=parseInt(i,10),e.put(o,10);const c=this.data.length-n;c>0&&(i=this.data.substr(n),o=parseInt(i,10),e.put(o,c*3+1))},he=t,he}var ge,Oe;function kt(){if(Oe)return ge;Oe=1;const s=F(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function r(e){this.mode=s.ALPHANUMERIC,this.data=e}return r.getBitsLength=function(n){return 11*Math.floor(n/2)+6*(n%2)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(n){let i;for(i=0;i+2<=this.data.length;i+=2){let o=t.indexOf(this.data[i])*45;o+=t.indexOf(this.data[i+1]),n.put(o,11)}this.data.length%2&&n.put(t.indexOf(this.data[i]),6)},ge=r,ge}var pe,je;function xt(){if(je)return pe;je=1;const s=F();function t(r){this.mode=s.BYTE,typeof r=="string"?this.data=new TextEncoder().encode(r):this.data=new Uint8Array(r)}return t.getBitsLength=function(e){return e*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){for(let e=0,n=this.data.length;e<n;e++)r.put(this.data[e],8)},pe=t,pe}var me,He;function Lt(){if(He)return me;He=1;const s=F(),t=$();function r(e){this.mode=s.KANJI,this.data=e}return r.getBitsLength=function(n){return n*13},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let n;for(n=0;n<this.data.length;n++){let i=t.toSJIS(this.data[n]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[n]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),e.put(i,13)}},me=r,me}var be={exports:{}},Ke;function Pt(){return Ke||(Ke=1,(function(s){var t={single_source_shortest_paths:function(r,e,n){var i={},o={};o[e]=0;var c=t.PriorityQueue.make();c.push(e,0);for(var a,l,u,d,h,f,m,M,R;!c.empty();){a=c.pop(),l=a.value,d=a.cost,h=r[l]||{};for(u in h)h.hasOwnProperty(u)&&(f=h[u],m=d+f,M=o[u],R=typeof o[u]>"u",(R||M>m)&&(o[u]=m,c.push(u,m),i[u]=l))}if(typeof n<"u"&&typeof o[n]>"u"){var S=["Could not find a path from ",e," to ",n,"."].join("");throw new Error(S)}return i},extract_shortest_path_from_predecessor_list:function(r,e){for(var n=[],i=e;i;)n.push(i),r[i],i=r[i];return n.reverse(),n},find_path:function(r,e,n){var i=t.single_source_shortest_paths(r,e,n);return t.extract_shortest_path_from_predecessor_list(i,n)},PriorityQueue:{make:function(r){var e=t.PriorityQueue,n={},i;r=r||{};for(i in e)e.hasOwnProperty(i)&&(n[i]=e[i]);return n.queue=[],n.sorter=r.sorter||e.default_sorter,n},default_sorter:function(r,e){return r.cost-e.cost},push:function(r,e){var n={value:r,cost:e};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=t})(be)),be.exports}var Ge;function Nt(){return Ge||(Ge=1,(function(s){const t=F(),r=Rt(),e=kt(),n=xt(),i=Lt(),o=ot(),c=$(),a=Pt();function l(S){return unescape(encodeURIComponent(S)).length}function u(S,T,A){const E=[];let k;for(;(k=S.exec(A))!==null;)E.push({data:k[0],index:k.index,mode:T,length:k[0].length});return E}function d(S){const T=u(o.NUMERIC,t.NUMERIC,S),A=u(o.ALPHANUMERIC,t.ALPHANUMERIC,S);let E,k;return c.isKanjiModeEnabled()?(E=u(o.BYTE,t.BYTE,S),k=u(o.KANJI,t.KANJI,S)):(E=u(o.BYTE_KANJI,t.BYTE,S),k=[]),T.concat(A,E,k).sort(function(w,v){return w.index-v.index}).map(function(w){return{data:w.data,mode:w.mode,length:w.length}})}function h(S,T){switch(T){case t.NUMERIC:return r.getBitsLength(S);case t.ALPHANUMERIC:return e.getBitsLength(S);case t.KANJI:return i.getBitsLength(S);case t.BYTE:return n.getBitsLength(S)}}function f(S){return S.reduce(function(T,A){const E=T.length-1>=0?T[T.length-1]:null;return E&&E.mode===A.mode?(T[T.length-1].data+=A.data,T):(T.push(A),T)},[])}function m(S){const T=[];for(let A=0;A<S.length;A++){const E=S[A];switch(E.mode){case t.NUMERIC:T.push([E,{data:E.data,mode:t.ALPHANUMERIC,length:E.length},{data:E.data,mode:t.BYTE,length:E.length}]);break;case t.ALPHANUMERIC:T.push([E,{data:E.data,mode:t.BYTE,length:E.length}]);break;case t.KANJI:T.push([E,{data:E.data,mode:t.BYTE,length:l(E.data)}]);break;case t.BYTE:T.push([{data:E.data,mode:t.BYTE,length:l(E.data)}])}}return T}function M(S,T){const A={},E={start:{}};let k=["start"];for(let p=0;p<S.length;p++){const w=S[p],v=[];for(let g=0;g<w.length;g++){const B=w[g],b=""+p+g;v.push(b),A[b]={node:B,lastCount:0},E[b]={};for(let C=0;C<k.length;C++){const y=k[C];A[y]&&A[y].node.mode===B.mode?(E[y][b]=h(A[y].lastCount+B.length,B.mode)-h(A[y].lastCount,B.mode),A[y].lastCount+=B.length):(A[y]&&(A[y].lastCount=B.length),E[y][b]=h(B.length,B.mode)+4+t.getCharCountIndicator(B.mode,T))}}k=v}for(let p=0;p<k.length;p++)E[k[p]].end=0;return{map:E,table:A}}function R(S,T){let A;const E=t.getBestModeForData(S);if(A=t.from(T,E),A!==t.BYTE&&A.bit<E.bit)throw new Error('"'+S+'" cannot be encoded with mode '+t.toString(A)+`.
 Suggested mode is: `+t.toString(E));switch(A===t.KANJI&&!c.isKanjiModeEnabled()&&(A=t.BYTE),A){case t.NUMERIC:return new r(S);case t.ALPHANUMERIC:return new e(S);case t.KANJI:return new i(S);case t.BYTE:return new n(S)}}s.fromArray=function(T){return T.reduce(function(A,E){return typeof E=="string"?A.push(R(E,null)):E.data&&A.push(R(E.data,E.mode)),A},[])},s.fromString=function(T,A){const E=d(T,c.isKanjiModeEnabled()),k=m(E),p=M(k,A),w=a.find_path(p.map,"start","end"),v=[];for(let g=1;g<w.length-1;g++)v.push(p.table[w[g]].node);return s.fromArray(f(v))},s.rawSplit=function(T){return s.fromArray(d(T,c.isKanjiModeEnabled()))}})(fe)),fe}var Je;function It(){if(Je)return X;Je=1;const s=$(),t=Ce(),r=vt(),e=wt(),n=Ct(),i=St(),o=Et(),c=rt(),a=Mt(),l=zt(),u=Tt(),d=F(),h=Nt();function f(p,w){const v=p.size,g=i.getPositions(w);for(let B=0;B<g.length;B++){const b=g[B][0],C=g[B][1];for(let y=-1;y<=7;y++)if(!(b+y<=-1||v<=b+y))for(let z=-1;z<=7;z++)C+z<=-1||v<=C+z||(y>=0&&y<=6&&(z===0||z===6)||z>=0&&z<=6&&(y===0||y===6)||y>=2&&y<=4&&z>=2&&z<=4?p.set(b+y,C+z,!0,!0):p.set(b+y,C+z,!1,!0))}}function m(p){const w=p.size;for(let v=8;v<w-8;v++){const g=v%2===0;p.set(v,6,g,!0),p.set(6,v,g,!0)}}function M(p,w){const v=n.getPositions(w);for(let g=0;g<v.length;g++){const B=v[g][0],b=v[g][1];for(let C=-2;C<=2;C++)for(let y=-2;y<=2;y++)C===-2||C===2||y===-2||y===2||C===0&&y===0?p.set(B+C,b+y,!0,!0):p.set(B+C,b+y,!1,!0)}}function R(p,w){const v=p.size,g=l.getEncodedBits(w);let B,b,C;for(let y=0;y<18;y++)B=Math.floor(y/3),b=y%3+v-8-3,C=(g>>y&1)===1,p.set(B,b,C,!0),p.set(b,B,C,!0)}function S(p,w,v){const g=p.size,B=u.getEncodedBits(w,v);let b,C;for(b=0;b<15;b++)C=(B>>b&1)===1,b<6?p.set(b,8,C,!0):b<8?p.set(b+1,8,C,!0):p.set(g-15+b,8,C,!0),b<8?p.set(8,g-b-1,C,!0):b<9?p.set(8,15-b-1+1,C,!0):p.set(8,15-b-1,C,!0);p.set(g-8,8,1,!0)}function T(p,w){const v=p.size;let g=-1,B=v-1,b=7,C=0;for(let y=v-1;y>0;y-=2)for(y===6&&y--;;){for(let z=0;z<2;z++)if(!p.isReserved(B,y-z)){let I=!1;C<w.length&&(I=(w[C]>>>b&1)===1),p.set(B,y-z,I),b--,b===-1&&(C++,b=7)}if(B+=g,B<0||v<=B){B-=g,g=-g;break}}}function A(p,w,v){const g=new r;v.forEach(function(z){g.put(z.mode.bit,4),g.put(z.getLength(),d.getCharCountIndicator(z.mode,p)),z.write(g)});const B=s.getSymbolTotalCodewords(p),b=c.getTotalCodewordsCount(p,w),C=(B-b)*8;for(g.getLengthInBits()+4<=C&&g.put(0,4);g.getLengthInBits()%8!==0;)g.putBit(0);const y=(C-g.getLengthInBits())/8;for(let z=0;z<y;z++)g.put(z%2?17:236,8);return E(g,p,w)}function E(p,w,v){const g=s.getSymbolTotalCodewords(w),B=c.getTotalCodewordsCount(w,v),b=g-B,C=c.getBlocksCount(w,v),y=g%C,z=C-y,I=Math.floor(g/C),V=Math.floor(b/C),ct=V+1,Se=I-V,lt=new a(Se);let J=0;const j=new Array(C),Ee=new Array(C);let W=0;const dt=new Uint8Array(p.buffer);for(let U=0;U<C;U++){const Y=U<z?V:ct;j[U]=dt.slice(J,J+Y),Ee[U]=lt.encode(j[U]),J+=Y,W=Math.max(W,Y)}const Q=new Uint8Array(g);let Be=0,P,N;for(P=0;P<W;P++)for(N=0;N<C;N++)P<j[N].length&&(Q[Be++]=j[N][P]);for(P=0;P<Se;P++)for(N=0;N<C;N++)Q[Be++]=Ee[N][P];return Q}function k(p,w,v,g){let B;if(Array.isArray(p))B=h.fromArray(p);else if(typeof p=="string"){let I=w;if(!I){const V=h.rawSplit(p);I=l.getBestVersionForData(V,v)}B=h.fromString(p,I||40)}else throw new Error("Invalid data");const b=l.getBestVersionForData(B,v);if(!b)throw new Error("The amount of data is too big to be stored in a QR Code");if(!w)w=b;else if(w<b)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+b+`.
`);const C=A(w,v,B),y=s.getSymbolSize(w),z=new e(y);return f(z,w),m(z),M(z,w),S(z,v,0),w>=7&&R(z,w),T(z,C),isNaN(g)&&(g=o.getBestMask(z,S.bind(null,z,v))),o.applyMask(g,z),S(z,v,g),{modules:z,version:w,errorCorrectionLevel:v,maskPattern:g,segments:B}}return X.create=function(w,v){if(typeof w>"u"||w==="")throw new Error("No input text");let g=t.M,B,b;return typeof v<"u"&&(g=t.from(v.errorCorrectionLevel,t.M),B=l.from(v.version),b=o.from(v.maskPattern),v.toSJISFunc&&s.setToSJISFunction(v.toSJISFunc)),k(w,B,g,b)},X}var ye={},ve={},We;function st(){return We||(We=1,(function(s){function t(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let e=r.slice().replace("#","").split("");if(e.length<3||e.length===5||e.length>8)throw new Error("Invalid hex color: "+r);(e.length===3||e.length===4)&&(e=Array.prototype.concat.apply([],e.map(function(i){return[i,i]}))),e.length===6&&e.push("F","F");const n=parseInt(e.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+e.slice(0,6).join("")}}s.getOptions=function(e){e||(e={}),e.color||(e.color={});const n=typeof e.margin>"u"||e.margin===null||e.margin<0?4:e.margin,i=e.width&&e.width>=21?e.width:void 0,o=e.scale||4;return{width:i,scale:i?4:o,margin:n,color:{dark:t(e.color.dark||"#000000ff"),light:t(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},s.getScale=function(e,n){return n.width&&n.width>=e+n.margin*2?n.width/(e+n.margin*2):n.scale},s.getImageWidth=function(e,n){const i=s.getScale(e,n);return Math.floor((e+n.margin*2)*i)},s.qrToImageData=function(e,n,i){const o=n.modules.size,c=n.modules.data,a=s.getScale(o,i),l=Math.floor((o+i.margin*2)*a),u=i.margin*a,d=[i.color.light,i.color.dark];for(let h=0;h<l;h++)for(let f=0;f<l;f++){let m=(h*l+f)*4,M=i.color.light;if(h>=u&&f>=u&&h<l-u&&f<l-u){const R=Math.floor((h-u)/a),S=Math.floor((f-u)/a);M=d[c[R*o+S]?1:0]}e[m++]=M.r,e[m++]=M.g,e[m++]=M.b,e[m]=M.a}}})(ve)),ve}var Qe;function qt(){return Qe||(Qe=1,(function(s){const t=st();function r(n,i,o){n.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=o,i.width=o,i.style.height=o+"px",i.style.width=o+"px"}function e(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(i,o,c){let a=c,l=o;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),o||(l=e()),a=t.getOptions(a);const u=t.getImageWidth(i.modules.size,a),d=l.getContext("2d"),h=d.createImageData(u,u);return t.qrToImageData(h.data,i,a),r(d,l,u),d.putImageData(h,0,0),l},s.renderToDataURL=function(i,o,c){let a=c;typeof a>"u"&&(!o||!o.getContext)&&(a=o,o=void 0),a||(a={});const l=s.render(i,o,a),u=a.type||"image/png",d=a.rendererOpts||{};return l.toDataURL(u,d.quality)}})(ye)),ye}var we={},Ye;function Dt(){if(Ye)return we;Ye=1;const s=st();function t(n,i){const o=n.a/255,c=i+'="'+n.hex+'"';return o<1?c+" "+i+'-opacity="'+o.toFixed(2).slice(1)+'"':c}function r(n,i,o){let c=n+i;return typeof o<"u"&&(c+=" "+o),c}function e(n,i,o){let c="",a=0,l=!1,u=0;for(let d=0;d<n.length;d++){const h=Math.floor(d%i),f=Math.floor(d/i);!h&&!l&&(l=!0),n[d]?(u++,d>0&&h>0&&n[d-1]||(c+=l?r("M",h+o,.5+f+o):r("m",a,0),a=0,l=!1),h+1<i&&n[d+1]||(c+=r("h",u),u=0)):a++}return c}return we.render=function(i,o,c){const a=s.getOptions(o),l=i.modules.size,u=i.modules.data,d=l+a.margin*2,h=a.color.light.a?"<path "+t(a.color.light,"fill")+' d="M0 0h'+d+"v"+d+'H0z"/>':"",f="<path "+t(a.color.dark,"stroke")+' d="'+e(u,l,a.margin)+'"/>',m='viewBox="0 0 '+d+" "+d+'"',R='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+m+' shape-rendering="crispEdges">'+h+f+`</svg>
`;return typeof c=="function"&&c(null,R),R},we}var Ze;function $t(){if(Ze)return _;Ze=1;const s=yt(),t=It(),r=qt(),e=Dt();function n(i,o,c,a,l){const u=[].slice.call(arguments,1),d=u.length,h=typeof u[d-1]=="function";if(!h&&!s())throw new Error("Callback required as last argument");if(h){if(d<2)throw new Error("Too few arguments provided");d===2?(l=c,c=o,o=a=void 0):d===3&&(o.getContext&&typeof l>"u"?(l=a,a=void 0):(l=a,a=c,c=o,o=void 0))}else{if(d<1)throw new Error("Too few arguments provided");return d===1?(c=o,o=a=void 0):d===2&&!o.getContext&&(a=c,c=o,o=void 0),new Promise(function(f,m){try{const M=t.create(c,a);f(i(M,o,a))}catch(M){m(M)}})}try{const f=t.create(c,a);l(null,i(f,o,a))}catch(f){l(f)}}return _.create=t.create,_.toCanvas=n.bind(null,r.render),_.toDataURL=n.bind(null,r.renderToDataURL),_.toString=n.bind(null,function(i,o,c){return e.render(i,c)}),_}var Ft=$t();const Xe=bt(Ft);class Ut{static async generateSVG(t){try{return await Xe.toString(t,{type:"svg",margin:1,color:{dark:"#0f172a",light:"#ffffff"}})}catch(r){return console.error("Failed to generate QR Code SVG",r),'<svg viewBox="0 0 100 100"><text x="10" y="50" fill="red">QR Fehler</text></svg>'}}static async generateDataURL(t){try{return await Xe.toDataURL(t,{margin:1,width:300,color:{dark:"#0f172a",light:"#ffffff"}})}catch(r){return console.error("Failed to generate QR Code Data URL",r),""}}}class _t{static trigger(){if(typeof window>"u")return;let t=document.getElementById("confetti-canvas");t||(t=document.createElement("canvas"),t.id="confetti-canvas",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100vw",t.style.height="100vh",t.style.pointerEvents="none",t.style.zIndex="999999",document.body.appendChild(t));const r=t.getContext("2d");if(!r)return;const e=t.width=window.innerWidth,n=t.height=window.innerHeight,i=["#E69F00","#56B4E9","#009E73","#F0E442","#0072B2","#D55E00","#CC79A7"],o=80,c=[];for(let u=0;u<o;u++)c.push({x:e/2,y:n/3,vx:(Math.random()-.5)*16,vy:(Math.random()-.7)*18,size:Math.random()*8+6,color:i[Math.floor(Math.random()*i.length)],rotation:Math.random()*Math.PI*2,vRot:(Math.random()-.5)*.2,alpha:1});let a;const l=()=>{r.clearRect(0,0,e,n);let u=0;for(const d of c)d.alpha<=0||(u++,d.x+=d.vx,d.y+=d.vy,d.vy+=.4,d.rotation+=d.vRot,d.alpha-=.012,r.save(),r.globalAlpha=Math.max(0,d.alpha),r.translate(d.x,d.y),r.rotate(d.rotation),r.fillStyle=d.color,r.fillRect(-d.size/2,-d.size/2,d.size,d.size),r.restore());u>0?a=requestAnimationFrame(l):(cancelAnimationFrame(a),r.clearRect(0,0,e,n))};l()}}class at{static getAudioContext(){if(typeof window>"u")return null;if(!this.audioCtx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.audioCtx=new t)}return this.audioCtx&&this.audioCtx.state==="suspended"&&this.audioCtx.resume(),this.audioCtx}static play(t){if(t==="none")return;const r=this.getAudioContext();if(!r)return;const e=r.currentTime;switch(t){case"beep":{const n=r.createOscillator(),i=r.createGain();n.type="sine",n.frequency.setValueAtTime(880,e),i.gain.setValueAtTime(.3,e),i.gain.exponentialRampToValueAtTime(.01,e+.15),n.connect(i),i.connect(r.destination),n.start(e),n.stop(e+.15);break}case"bell":{const n=r.createOscillator(),i=r.createGain();n.type="triangle",n.frequency.setValueAtTime(1046.5,e),n.frequency.exponentialRampToValueAtTime(523.25,e+.6),i.gain.setValueAtTime(.4,e),i.gain.exponentialRampToValueAtTime(.001,e+.6),n.connect(i),i.connect(r.destination),n.start(e),n.stop(e+.6);break}case"buzzer":{const n=r.createOscillator(),i=r.createGain();n.type="sawtooth",n.frequency.setValueAtTime(150,e),n.frequency.linearRampToValueAtTime(110,e+.35),i.gain.setValueAtTime(.4,e),i.gain.exponentialRampToValueAtTime(.01,e+.35),n.connect(i),i.connect(r.destination),n.start(e),n.stop(e+.35);break}case"fanfare":{[523.25,659.25,783.99,1046.5].forEach((i,o)=>{const c=r.createOscillator(),a=r.createGain(),l=e+o*.08;c.type="sine",c.frequency.setValueAtTime(i,l),a.gain.setValueAtTime(.2,l),a.gain.exponentialRampToValueAtTime(.001,l+.2),c.connect(a),a.connect(r.destination),c.start(l),c.stop(l+.2)});break}}}}x(at,"audioCtx",null);class Vt{constructor(){x(this,"lastWinningBuzzId",null)}render(t,r){if(r.innerHTML="",r.className=`smartboard-stage ${t.isLocked?"locked":"active-stage"}`,t.countdown!==null){const e=document.createElement("div");e.className="countdown-overlay",e.innerHTML=`<div class="countdown-number">${t.countdown}</div>`,r.appendChild(e);return}switch(t.mode){case"buzzer":this.renderBuzzerMode(t,r);break;case"right_wrong":this.renderRightWrongMode(t,r);break;case"poll":this.renderPollMode(t,r);break;case"speed":this.renderSpeedMode(t,r);break}}renderBuzzerMode(t,r){if(t.buzzes.length===0){r.innerHTML=`
        <div style="text-align: center; color: var(--text-muted);">
          <div style="font-size: 4rem; margin-bottom: 12px;">🔔</div>
          <h2>Buzzer-Bereit</h2>
          <p style="margin-top: 8px;">Warte auf Antworten...</p>
        </div>
      `,this.lastWinningBuzzId=null;return}const e=t.buzzes[0],n=t.participants[e.participantId];if(!n)return;this.lastWinningBuzzId!==e.participantId&&(this.lastWinningBuzzId=e.participantId,t.settings.animationEnabled&&(document.body.classList.add("flash-effect"),setTimeout(()=>document.body.classList.remove("flash-effect"),400)),t.settings.confettiEnabled&&_t.trigger(),t.settings.soundEnabled&&at.play(t.settings.soundType));const i=new Date(e.timestamp).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3}),o=document.createElement("div");if(o.className="winner-banner",o.innerHTML=`
      <div class="badge" style="background-color: ${n.color}; color: #ffffff; font-size: 1.2rem; padding: 8px 20px;">
        1. Platz
      </div>
      <div class="winner-name" style="color: ${n.color};">
        ${n.name}
      </div>
      <div class="winner-timestamp">
        Zeitstempel: ${i}
      </div>
    `,r.appendChild(o),t.buzzes.length>1){const c=document.createElement("div");c.style.marginTop="24px",c.style.display="flex",c.style.gap="12px",c.style.flexWrap="wrap",c.style.justifyContent="center",t.buzzes.slice(1,t.settings.visiblePlaces).forEach((a,l)=>{const u=t.participants[a.participantId];if(u){const d=document.createElement("div");d.style.padding="8px 14px",d.style.borderRadius="var(--border-radius-full)",d.style.backgroundColor=u.color,d.style.color="#ffffff",d.style.fontWeight="bold",d.style.fontSize="0.95rem",d.textContent=`${l+2}. ${u.name}`,c.appendChild(d)}}),r.appendChild(c)}}renderRightWrongMode(t,r){const e=Object.keys(t.votes).length;let n=0,i=0;Object.values(t.votes).forEach(a=>{a.option==="right"&&n++,a.option==="wrong"&&i++});const o=e>0?Math.round(n/e*100):0,c=e>0?Math.round(i/e*100):0;r.innerHTML=`
      <div style="width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 24px;">
        <h2 style="text-align: center; font-size: 2rem;">Richtig / Falsch Auswertung</h2>
        <div style="display: flex; justify-content: space-around; font-size: 1.2rem; font-weight: bold;">
          <span>Gesamt-Stimmen: ${e}</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Richtig Bar -->
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: bold;">
              <span>🟢 Richtig (${n})</span>
              <span>${o}%</span>
            </div>
            <div class="poll-bar-track">
              <div class="poll-bar-fill" style="width: ${o}%; background: #10b981;"></div>
            </div>
          </div>

          <!-- Falsch Bar -->
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: bold;">
              <span>🔴 Falsch (${i})</span>
              <span>${c}%</span>
            </div>
            <div class="poll-bar-track">
              <div class="poll-bar-fill" style="width: ${c}%; background: #ef4444;"></div>
            </div>
          </div>
        </div>
      </div>
    `}renderPollMode(t,r){const e=Object.keys(t.votes).length,n={};t.settings.pollOptions.forEach(o=>n[o]=0),Object.values(t.votes).forEach(o=>{n[o.option]!==void 0&&n[o.option]++});const i=t.settings.pollOptions.map(o=>{const c=n[o]||0,a=e>0?Math.round(c/e*100):0;return`
        <div class="poll-bar-row">
          <div class="poll-option-label">${o}</div>
          <div class="poll-bar-track">
            <div class="poll-bar-fill" style="width: ${a}%;"></div>
          </div>
          <div class="poll-val-count">${c} (${a}%)</div>
        </div>
      `}).join("");r.innerHTML=`
      <div class="poll-chart-container">
        <h2 style="text-align: center; font-size: 2rem; margin-bottom: 12px;">${t.settings.pollTitle}</h2>
        <p style="text-align: center; color: var(--text-muted); margin-bottom: 20px;">
          Abgegebene Stimmen: ${e}
        </p>
        ${i}
      </div>
    `}renderSpeedMode(t,r){if(t.buzzes.length===0){r.innerHTML=`
        <div style="text-align: center; color: var(--text-muted);">
          <div style="font-size: 4rem; margin-bottom: 12px;">⏱️</div>
          <h2>Schnelligkeits-Messung</h2>
          <p style="margin-top: 8px;">Warte auf Reaktion der Schüler...</p>
        </div>
      `;return}const e=t.buzzes.map(n=>{const i=t.participants[n.participantId];if(!i)return"";const o=new Date(n.timestamp).toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3});return`
        <tr style="border-bottom: 1px solid var(--border-color);">
          <td style="padding: 12px; font-weight: bold; font-size: 1.2rem;">#${n.order}</td>
          <td style="padding: 12px; display: flex; align-items: center; gap: 10px;">
            <div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${i.color};"></div>
            <span style="font-weight: 700; font-size: 1.2rem;">${i.name}</span>
          </td>
          <td style="padding: 12px; font-family: monospace; font-size: 1.1rem; text-align: right;">${o}</td>
        </tr>
      `}).join("");r.innerHTML=`
      <div style="width: 100%; max-width: 700px;">
        <h2 style="text-align: center; margin-bottom: 16px;">Reihenfolge der Antworten</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
              <th style="padding: 12px;">Rang</th>
              <th style="padding: 12px;">Teilnehmer</th>
              <th style="padding: 12px; text-align: right;">Zeitstempel</th>
            </tr>
          </thead>
          <tbody>
            ${e}
          </tbody>
        </table>
      </div>
    `}}class Ot{constructor(){x(this,"container",null)}open(t,r){var i,o,c;this.close();const e=document.createElement("div");e.className="modal-backdrop";const n=t.settings;e.innerHTML=`
      <div class="modal-content">
        <div class="modal-header">
          <h2>⚙️ Lehrer-Einstellungen</h2>
          <button class="modal-close-btn" id="close-modal-btn">&times;</button>
        </div>

        <div class="settings-grid">
          <!-- Dark Mode -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Dunkelmodus (Dark Mode)</label>
              <span>Dunkles Farbschema aktivieren</span>
            </div>
            <label class="switch">
              <input type="checkbox" id="set-darkmode" ${n.darkMode?"checked":""}>
              <span class="slider"></span>
            </label>
          </div>

          <!-- Sound Type -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Buzzer-Sound</label>
              <span>Wähle den Ton für Reaktionen</span>
            </div>
            <select id="set-soundtype" style="padding: 8px 12px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
              <option value="none" ${n.soundType==="none"?"selected":""}>Kein Ton</option>
              <option value="beep" ${n.soundType==="beep"?"selected":""}>Piep</option>
              <option value="bell" ${n.soundType==="bell"?"selected":""}>Glocke</option>
              <option value="buzzer" ${n.soundType==="buzzer"?"selected":""}>Buzzer</option>
              <option value="fanfare" ${n.soundType==="fanfare"?"selected":""}>Fanfare</option>
            </select>
          </div>

          <!-- Confetti -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Konfetti-Animation</label>
              <span>Feuerwerk bei Gewinner</span>
            </div>
            <label class="switch">
              <input type="checkbox" id="set-confetti" ${n.confettiEnabled?"checked":""}>
              <span class="slider"></span>
            </label>
          </div>

          <!-- Auto Lock -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Automatische Sperre</label>
              <span>Sperrt Buzzer sofort nach der ersten Antwort</span>
            </div>
            <label class="switch">
              <input type="checkbox" id="set-autolock" ${n.autoLock?"checked":""}>
              <span class="slider"></span>
            </label>
          </div>

          <!-- Countdown Seconds -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Countdown-Dauer (Sekunden)</label>
              <span>Standardwert für Countdown vor Runden</span>
            </div>
            <input type="number" id="set-countdown" min="1" max="10" value="${n.countdownSeconds}" style="width: 70px; padding: 6px; text-align: center;">
          </div>

          <!-- Visible Places -->
          <div class="setting-row">
            <div class="setting-info">
              <label>Sichtbare Plätze</label>
              <span>Anzahl der Plätze auf der Ränge-Liste</span>
            </div>
            <input type="number" id="set-visibleplaces" min="1" max="20" value="${n.visiblePlaces}" style="width: 70px; padding: 6px; text-align: center;">
          </div>

          <!-- Poll Title & Options -->
          <div class="setting-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
            <div class="setting-info">
              <label>Umfrage-Optionen (Komma-getrennt)</label>
              <span>Beispiel: A, B, C, D oder Ja, Nein, Enthaltung</span>
            </div>
            <input type="text" id="set-polloptions" value="${n.pollOptions.join(", ")}" style="width: 100%; padding: 8px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);">
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
          <button class="btn btn-secondary" id="cancel-settings-btn">Abbrechen</button>
          <button class="btn btn-success" id="save-settings-btn">Speichern</button>
        </div>
      </div>
    `,document.body.appendChild(e),this.container=e,(i=e.querySelector("#close-modal-btn"))==null||i.addEventListener("click",()=>this.close()),(o=e.querySelector("#cancel-settings-btn"))==null||o.addEventListener("click",()=>this.close()),(c=e.querySelector("#save-settings-btn"))==null||c.addEventListener("click",async()=>{const a=e.querySelector("#set-soundtype").value,l=e.querySelector("#set-darkmode").checked,u=e.querySelector("#set-confetti").checked,d=e.querySelector("#set-autolock").checked,h=parseInt(e.querySelector("#set-countdown").value,10)||3,f=parseInt(e.querySelector("#set-visibleplaces").value,10)||5,M=e.querySelector("#set-polloptions").value.split(",").map(S=>S.trim()).filter(S=>S.length>0),R={soundType:a,soundEnabled:a!=="none",darkMode:l,confettiEnabled:u,autoLock:d,countdownSeconds:h,visiblePlaces:f,pollOptions:M.length>0?M:["A","B","C","D"]};l?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.removeAttribute("data-theme"),await D().updateSettings(t.code,R),r(),this.close()})}close(){this.container&&(this.container.remove(),this.container=null)}}class et{constructor(){x(this,"smartboard",new Vt);x(this,"settingsModal",new Ot);x(this,"currentCode",null);x(this,"unsubscribe",null)}async init(t,r){const e=D();let n=null;r&&(n=await e.getState(r)),n||(n=await e.createSession("buzzer")),this.currentCode=n.code,n.settings.darkMode?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.removeAttribute("data-theme"),this.renderSkeleton(t,n),this.setupKeyboardShortcuts(),this.unsubscribe&&this.unsubscribe(),this.unsubscribe=e.subscribeToState(this.currentCode,i=>{this.update(i,t)})}renderSkeleton(t,r){t.innerHTML=`
      <div class="teacher-layout">
        <!-- Header Topbar -->
        <header class="teacher-header">
          <div class="teacher-title-group">
            <h1>Classroom Buzzer</h1>
            <span class="badge" id="round-badge">Runde ${r.roundNumber}</span>
          </div>

          <!-- Mode Nav Switcher -->
          <nav class="mode-nav" id="mode-nav">
            <button data-mode="buzzer" class="${r.mode==="buzzer"?"active":""}">Buzzer</button>
            <button data-mode="right_wrong" class="${r.mode==="right_wrong"?"active":""}">Richtig / Falsch</button>
            <button data-mode="poll" class="${r.mode==="poll"?"active":""}">Umfrage</button>
            <button data-mode="speed" class="${r.mode==="speed"?"active":""}">Schnelligkeit</button>
          </nav>

          <!-- Topbar Action Buttons -->
          <div class="header-actions">
            <button class="btn btn-secondary" id="btn-group-toggle">
              ${r.groupMode==="group"?"👥 Gruppenmodus":"👤 Einzelmodus"}
            </button>
            <button class="btn btn-secondary" id="btn-fullscreen" title="Vollbild (F)">🖥️</button>
            <button class="btn btn-secondary" id="btn-settings" title="Einstellungen">⚙️</button>
            <button class="btn btn-secondary" id="btn-export-csv" title="Ergebnisse als CSV exportieren">📥 CSV</button>
          </div>
        </header>

        <!-- Main Dashboard Grid -->
        <main class="dashboard-grid">
          <!-- Left Column: Session Info & QR Code -->
          <section class="card session-info-card">
            <h2>Sitzung Beitreten</h2>
            <div class="qr-code-wrapper" id="qr-code-container">
              <!-- QR Code rendered here -->
            </div>
            <div class="session-code-display">
              <span>Sitzungscode</span>
              <div class="session-code-value">${r.code}</div>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted);">
              Schüler scannen QR-Code oder tippen Code ein.
            </p>

            <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 10px;">
              <button class="btn btn-secondary" id="btn-regen-qr">QR-Code neu erzeugen</button>
            </div>
          </section>

          <!-- Center Column: Smartboard Stage & Controls -->
          <section style="display: flex; flex-direction: column; gap: 16px;">
            <!-- Stage Controls -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="btn btn-lg ${r.isLocked?"btn-success":"btn-danger"}" id="btn-lock-toggle" style="flex: 1;">
                ${r.isLocked?"🔓 Buzzer Freigeben (Space)":"🔒 Buzzer Sperren (Space)"}
              </button>
              <button class="btn btn-lg btn-secondary" id="btn-countdown">⏱️ Countdown (C)</button>
              <button class="btn btn-lg btn-secondary" id="btn-reset-round">🔄 Neue Runde (R)</button>
              <button class="btn btn-lg btn-secondary" id="btn-clear-results">🧹 Leeren</button>
            </div>

            <!-- Smartboard Stage Container -->
            <div id="smartboard-container"></div>
          </section>

          <!-- Right Column: Participant List & Leaderboard -->
          <section class="card" style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h2>Teilnehmer (<span id="participant-count">0</span>)</h2>
            </div>
            <div class="participant-list" id="participant-list-container">
              <!-- Participants injected here -->
            </div>
          </section>
        </main>
      </div>
    `,this.renderQRCode(r.code,t),this.smartboard.render(r,t.querySelector("#smartboard-container")),this.renderParticipantList(r,t),this.bindEvents(t,r)}update(t,r){const e=r.querySelector("#round-badge");e&&(e.textContent=`Runde ${t.roundNumber}`);const n=r.querySelector("#btn-lock-toggle");n&&(n.className=`btn btn-lg ${t.isLocked?"btn-success":"btn-danger"}`,n.textContent=t.isLocked?"🔓 Buzzer Freigeben (Space)":"🔒 Buzzer Sperren (Space)");const i=r.querySelector("#btn-group-toggle");i&&(i.textContent=t.groupMode==="group"?"👥 Gruppenmodus":"👤 Einzelmodus"),r.querySelectorAll("#mode-nav button").forEach(a=>{a.getAttribute("data-mode")===t.mode?a.classList.add("active"):a.classList.remove("active")});const c=r.querySelector("#smartboard-container");c&&this.smartboard.render(t,c),this.renderParticipantList(t,r)}async renderQRCode(t,r){const e=r.querySelector("#qr-code-container");if(!e)return;const n=`${window.location.origin}${window.location.pathname}?join=${t}`,i=await Ut.generateSVG(n);e.innerHTML=i}renderParticipantList(t,r){const e=r.querySelector("#participant-list-container"),n=r.querySelector("#participant-count");if(!e)return;const i=Object.values(t.participants);if(n&&(n.textContent=i.length.toString()),i.length===0){e.innerHTML=`
        <p style="text-align: center; color: var(--text-muted); padding: 20px 0;">
          Noch keine Schüler beigetreten.
        </p>
      `;return}e.innerHTML=i.map(o=>`
        <div class="participant-item" style="border-left-color: ${o.color};">
          <div class="participant-info">
            <div class="participant-avatar" style="background-color: ${o.color};">
              ${o.name.slice(0,2)}
            </div>
            <div>
              <div class="participant-name">${o.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Punkte: <strong>${o.score}</strong></div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="score-controls">
              <button data-action="score-minus" data-id="${o.id}">-</button>
              <button data-action="score-plus" data-id="${o.id}">+</button>
            </div>
            <button class="btn btn-secondary" data-action="change-color" data-id="${o.id}" style="padding: 4px 8px; font-size: 0.8rem;" title="Farbe ändern">🎨</button>
            <button class="btn btn-danger" data-action="remove-student" data-id="${o.id}" style="padding: 4px 8px; font-size: 0.8rem;" title="Entfernen">&times;</button>
          </div>
        </div>
      `).join(""),e.querySelectorAll("button[data-action]").forEach(o=>{o.addEventListener("click",async c=>{const a=c.currentTarget,l=a.getAttribute("data-action"),u=a.getAttribute("data-id");if(!u||!this.currentCode)return;const d=D();if(l==="score-plus")await d.updateScore(this.currentCode,u,1);else if(l==="score-minus")await d.updateScore(this.currentCode,u,-1);else if(l==="remove-student")await d.removeParticipant(this.currentCode,u);else if(l==="change-color"){const h=G[Math.floor(Math.random()*G.length)];await d.setParticipantColor(this.currentCode,u,h)}})})}bindEvents(t,r){var n,i,o,c,a,l,u,d,h;const e=D();t.querySelectorAll("#mode-nav button").forEach(f=>{f.addEventListener("click",async()=>{const m=f.getAttribute("data-mode");m&&this.currentCode&&await e.setMode(this.currentCode,m)})}),(n=t.querySelector("#btn-group-toggle"))==null||n.addEventListener("click",async()=>{if(!this.currentCode)return;const f=r.groupMode==="group"?"individual":"group";await e.setGroupMode(this.currentCode,f)}),(i=t.querySelector("#btn-lock-toggle"))==null||i.addEventListener("click",async()=>{this.currentCode&&await e.toggleLock(this.currentCode)}),(o=t.querySelector("#btn-countdown"))==null||o.addEventListener("click",async()=>{this.currentCode&&await e.startCountdown(this.currentCode,r.settings.countdownSeconds)}),(c=t.querySelector("#btn-reset-round"))==null||c.addEventListener("click",async()=>{this.currentCode&&await e.resetRound(this.currentCode)}),(a=t.querySelector("#btn-clear-results"))==null||a.addEventListener("click",async()=>{this.currentCode&&await e.clearResults(this.currentCode)}),(l=t.querySelector("#btn-regen-qr"))==null||l.addEventListener("click",async()=>{const f=await e.createSession(r.mode);this.init(t,f.code)}),(u=t.querySelector("#btn-fullscreen"))==null||u.addEventListener("click",()=>{this.toggleFullscreen()}),(d=t.querySelector("#btn-settings"))==null||d.addEventListener("click",async()=>{if(!this.currentCode)return;const f=await e.getState(this.currentCode);f&&this.settingsModal.open(f,()=>{})}),(h=t.querySelector("#btn-export-csv"))==null||h.addEventListener("click",async()=>{if(!this.currentCode)return;const f=await e.getState(this.currentCode);f&&this.exportCSV(f)})}setupKeyboardShortcuts(){window.onkeydown=async t=>{if(t.target instanceof HTMLInputElement||t.target instanceof HTMLTextAreaElement||!this.currentCode)return;const r=D();if(t.code==="Space")t.preventDefault(),await r.toggleLock(this.currentCode);else if(t.code==="KeyC"){t.preventDefault();const e=await r.getState(this.currentCode);e&&await r.startCountdown(this.currentCode,e.settings.countdownSeconds)}else t.code==="KeyR"?(t.preventDefault(),await r.resetRound(this.currentCode)):t.code==="KeyF"&&(t.preventDefault(),this.toggleFullscreen())}}toggleFullscreen(){document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}exportCSV(t){const r=[["Sitzungscode",t.code],["Runde",t.roundNumber.toString()],["Modus",t.mode],[""],["Teilnehmer Name","Farbe","Punkte","Buzzer Rang","Antwort/Wahl"]];Object.values(t.participants).forEach(o=>{const c=t.buzzes.find(l=>l.participantId===o.id),a=t.votes[o.id];r.push([o.name,o.color,o.score.toString(),c?c.order.toString():"-",a?a.option:"-"])});const e="data:text/csv;charset=utf-8,"+r.map(o=>o.join(";")).join(`
`),n=encodeURI(e),i=document.createElement("a");i.setAttribute("href",n),i.setAttribute("download",`Classroom_Buzzer_${t.code}_Runde_${t.roundNumber}.csv`),document.body.appendChild(i),i.click(),document.body.removeChild(i)}}class tt{constructor(){x(this,"currentCode",null);x(this,"currentParticipant",null);x(this,"unsubscribe",null)}async init(t,r){this.currentCode=r?r.toUpperCase():null;const e=sessionStorage.getItem("cb_participant");if(e&&this.currentCode)try{this.currentParticipant=JSON.parse(e)}catch(n){console.error(n)}this.currentParticipant&&this.currentCode?this.subscribeAndRender(t):this.renderJoinForm(t)}async renderJoinForm(t){var o,c;const r=D();let e=!1;if(this.currentCode){const a=await r.getState(this.currentCode);a&&a.groupMode==="group"&&(e=!0)}const n=K.map(a=>`<option value="${a}">${a}</option>`).join("");t.innerHTML=`
      <div class="student-container">
        <div class="card join-card">
          <div class="join-card-header">
            <div class="join-title">
              <h1>Classroom Buzzer</h1>
              <p style="color: rgba(255, 255, 255, 0.85); font-weight: 600;">Sitzung beitreten</p>
            </div>
          </div>

          <form id="join-form" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label for="input-code">Sitzungscode (4 Zeichen)</label>
              <input type="text" id="input-code" class="form-input" maxlength="4" placeholder="z. B. B7K2" value="${this.currentCode||""}" required>
            </div>

            <!-- Single Mode Name Input (max 3 chars) -->
            <div class="form-group" id="group-single-input" style="${e?"display: none;":""}">
              <label for="input-name">Deine Initialen / Kürzel (max. 3 Zeichen)</label>
              <input type="text" id="input-name" class="form-input" maxlength="3" placeholder="z. B. ABC" ${e?"":"required"}>
            </div>

            <!-- Group Mode Selector -->
            <div class="form-group" id="group-select-input" style="${e?"":"display: none;"}">
              <label for="select-group">Wähle deinen Gruppennamen</label>
              <div class="group-selection-row">
                <select id="select-group">
                  ${n}
                </select>
                <button type="button" class="btn btn-secondary" id="btn-random-group" title="Zufälliger Gruppenname">🎲 Zufall</button>
              </div>
            </div>

            <div id="join-error" style="color: var(--danger-color); font-weight: bold; min-height: 24px;"></div>

            <button type="submit" class="btn btn-lg" style="width: 100%; margin-top: 10px;">
              🚀 Beitreten
            </button>
          </form>
        </div>
      </div>
    `;const i=t.querySelector("#input-code");i==null||i.addEventListener("input",async()=>{const a=i.value.trim().toUpperCase();if(a.length===4){const l=await r.getState(a);if(l){const u=t.querySelector("#group-single-input"),d=t.querySelector("#group-select-input"),h=t.querySelector("#input-name");l.groupMode==="group"?(u.style.display="none",d.style.display="block",h.removeAttribute("required")):(u.style.display="block",d.style.display="none",h.setAttribute("required","true"))}}}),(o=t.querySelector("#btn-random-group"))==null||o.addEventListener("click",()=>{const a=t.querySelector("#select-group");if(a){const l=nt.getRandomName();a.value=l}}),(c=t.querySelector("#join-form"))==null||c.addEventListener("submit",async a=>{a.preventDefault();const l=t.querySelector("#join-error");l&&(l.textContent="");const u=t.querySelector("#input-code").value.trim().toUpperCase(),h=t.querySelector("#group-single-input").style.display==="none";let f="";h?f=t.querySelector("#select-group").value:f=t.querySelector("#input-name").value.trim().toUpperCase().slice(0,3);try{const m=await r.joinSession(u,f,h);this.currentCode=u,this.currentParticipant=m,sessionStorage.setItem("cb_participant",JSON.stringify(m)),this.subscribeAndRender(t)}catch(m){l&&(l.textContent=m instanceof Error?m.message:"Fehler beim Beitreten")}})}subscribeAndRender(t){if(!this.currentCode||!this.currentParticipant)return;const r=D();this.unsubscribe&&this.unsubscribe(),this.unsubscribe=r.subscribeToState(this.currentCode,e=>{this.renderStage(t,e)})}renderStage(t,r){if(!this.currentParticipant)return;const e=this.currentParticipant,n=r.buzzes.some(c=>c.participantId===e.id),i=r.votes[e.id],o=r.isLocked||r.settings.autoLock&&r.buzzes.length>0;t.innerHTML=`
      <div class="student-container">
        <!-- Student Header -->
        <header class="student-header-info">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: ${e.color}; border: 2px solid white;"></div>
            <strong style="font-size: 1.2rem;">${e.name}</strong>
          </div>
          <div class="badge">Code: ${r.code}</div>
        </header>

        <!-- Main Stage depending on mode -->
        <main class="student-stage">
          ${this.renderModeControls(r,n,i,o)}
        </main>
      </div>
    `,this.bindStageEvents(t,r,e)}renderModeControls(t,r,e,n){if(t.countdown!==null)return`
        <div style="text-align: center;">
          <div style="font-size: 5rem; font-weight: 900; color: var(--accent-color);">${t.countdown}</div>
          <p style="font-size: 1.2rem; color: var(--text-muted); font-weight: bold;">Achtung... Bereitmachen!</p>
        </div>
      `;switch(t.mode){case"buzzer":case"speed":return`
          <div class="buzzer-button-wrapper">
            <button class="huge-buzzer" id="btn-student-buzz" ${n||r?"disabled":""}>
              ${r?"GEBUZZERT!":n?"GESPERRT":"BUZZER"}
            </button>
          </div>
          <div class="status-feedback-box ${r?"sent":""}">
            ${r?"✅ Antwort gesendet!":n?"🔒 Warten auf Freigabe der Lehrkraft...":"👉 Drücke den Buzzer so schnell du kannst!"}
          </div>
        `;case"right_wrong":return`
          <div class="choices-grid">
            <button class="choice-btn choice-btn-right" data-vote="right" ${n?"disabled":""}>
              <span>🟢</span>
              <span>Richtig</span>
            </button>
            <button class="choice-btn choice-btn-wrong" data-vote="wrong" ${n?"disabled":""}>
              <span>🔴</span>
              <span>Falsch</span>
            </button>
          </div>
          <div class="status-feedback-box ${e?"sent":""}">
            ${e?`✅ Du hast für "${e.option==="right"?"Richtig":"Falsch"}" gestimmt.`:"Wähle Richtig oder Falsch"}
          </div>
        `;case"poll":{const i=t.settings.pollOptions.map(o=>`
          <button class="choice-btn choice-btn-option ${e&&e.option===o?"selected":""}" data-vote="${o}" ${n?"disabled":""}>
            ${o}
          </button>
        `).join("");return`
          <div style="width: 100%;">
            <h2 style="text-align: center; margin-bottom: 20px;">${t.settings.pollTitle}</h2>
            <div class="choices-grid">
              ${i}
            </div>
          </div>
          <div class="status-feedback-box ${e?"sent":""}">
            ${e?`✅ Option "${e.option}" gewählt.`:"Wähle eine Option"}
          </div>
        `}}}bindStageEvents(t,r,e){const n=D(),i=t.querySelector("#btn-student-buzz");i&&i.addEventListener("click",async()=>{if(this.currentCode){if(r.settings.vibrationEnabled&&"vibrate"in navigator)try{navigator.vibrate([50,50,100])}catch(o){console.warn(o)}await n.submitBuzz(this.currentCode,e.id)}}),t.querySelectorAll("button[data-vote]").forEach(o=>{o.addEventListener("click",async()=>{const c=o.getAttribute("data-vote");if(!(!this.currentCode||!c)){if(r.settings.vibrationEnabled&&"vibrate"in navigator)try{navigator.vibrate(60)}catch(a){console.warn(a)}await n.submitVote(this.currentCode,e.id,c)}})})}}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(s=>{console.warn("Service Worker registration failed:",s)})});function jt(){var n,i;const s=document.getElementById("app");if(!s)return;const t=new URLSearchParams(window.location.search),r=t.get("join")||t.get("code"),e=t.get("mode");if(r||e==="student"){new tt().init(s,r||void 0);return}if(e==="teacher"){new et().init(s);return}s.innerHTML=`
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div class="card" style="max-width: 520px; width: 100%; text-align: center; display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h1 style="font-size: 2.2rem; background: linear-gradient(135deg, var(--accent-color), #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Classroom Buzzer
          </h1>
          <p style="color: var(--text-muted); margin-top: 6px;">
            Die moderne, datenschutzfreundliche Buzzer-Plattform für den Unterricht.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <button class="btn btn-lg" id="btn-start-teacher" style="padding: 20px; font-size: 1.2rem;">
            👨‍🏫 Lehrer-Dashboard Starten
          </button>
          <button class="btn btn-lg btn-secondary" id="btn-start-student" style="padding: 20px; font-size: 1.2rem;">
            📱 Schüler-Ansicht Öffnen
          </button>
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 16px; font-size: 0.85rem; color: var(--text-muted); display: flex; justify-content: space-around;">
          <span>✓ 100% Offline (PWA)</span>
          <span>✓ Keine Cookies & Tracking</span>
          <span>✓ Supabase-ready</span>
        </div>
      </div>
    </div>
  `,(n=document.getElementById("btn-start-teacher"))==null||n.addEventListener("click",()=>{new et().init(s)}),(i=document.getElementById("btn-start-student"))==null||i.addEventListener("click",()=>{new tt().init(s)})}document.addEventListener("DOMContentLoaded",jt);

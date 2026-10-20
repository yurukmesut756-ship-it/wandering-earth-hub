var mp=Object.defineProperty;var gp=(n,e,t)=>e in n?mp(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var be=(n,e,t)=>gp(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function nc(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const dt={},rs=[],Kn=()=>{},lf=()=>!1,aa=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),la=n=>n.startsWith("onUpdate:"),Pt=Object.assign,ic=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},vp=Object.prototype.hasOwnProperty,rt=(n,e)=>vp.call(n,e),Be=Array.isArray,Li=n=>Yr(n)==="[object Map]",Vo=n=>Yr(n)==="[object Set]",Oc=n=>Yr(n)==="[object Date]",We=n=>typeof n=="function",Tt=n=>typeof n=="string",$n=n=>typeof n=="symbol",at=n=>n!==null&&typeof n=="object",cf=n=>(at(n)||We(n))&&We(n.then)&&We(n.catch),uf=Object.prototype.toString,Yr=n=>uf.call(n),_p=n=>Yr(n).slice(8,-1),hf=n=>Yr(n)==="[object Object]",sc=n=>Tt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Ar=nc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ca=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},xp=/-\w/g,Bn=ca(n=>n.replace(xp,e=>e.slice(1).toUpperCase())),yp=/\B([A-Z])/g,hs=ca(n=>n.replace(yp,"-$1").toLowerCase()),ff=ca(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ca=ca(n=>n?`on${ff(n)}`:""),qn=(n,e)=>!Object.is(n,e),Fo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},df=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},rc=n=>{const e=parseFloat(n);return isNaN(e)?n:e},Mp=n=>{const e=Tt(n)?Number(n):NaN;return isNaN(e)?n:e};let Fc;const ua=()=>Fc||(Fc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Nr(n){if(Be(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Tt(i)?bp(i):Nr(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Tt(n)||at(n))return n}const Sp=/;(?![^(]*\))/g,Ep=/:([^]+)/,Tp=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function bp(n){const e={};return n.replace(Tp,t=>t.startsWith("/*")?"":t).split(Sp).forEach(t=>{if(t){const i=t.split(Ep);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Zt(n){let e="";if(Tt(n))e=n;else if(Be(n))for(let t=0;t<n.length;t++){const i=Zt(n[t]);i&&(e+=i+" ")}else if(at(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const wp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",Ap=nc(wp);function pf(n){return!!n||n===""}function Rp(n,e,t){if(n.length!==e.length)return!1;let i=!0;for(let s=0;i&&s<n.length;s++)i=ha(n[s],e[s],t);return i}function Bc(n,e,t){if(n.size!==e.size)return!1;const i=Array.from(e),s=new Uint8Array(i.length);for(const r of n){let a=-1;for(let o=0;o<i.length;o++)if(!s[o]&&ha(r,i[o],t)){a=o;break}if(a<0)return!1;s[a]=1}return!0}function Cp(n,e,t){let i=Li(n),s=Li(e);if(i||s||(i=Vo(n),s=Vo(e),i||s))return i&&s?Bc(n,e,t):!1;const r=Object.keys(n).length,a=Object.keys(e).length;if(r!==a)return!1;for(const o in n){const l=n.hasOwnProperty(o),u=e.hasOwnProperty(o);if(l&&!u||!l&&u||!ha(n[o],e[o],t))return!1}return String(n)===String(e)}function zc(n,e,t,i){t||(t=[new Map,new Map]);const[s,r]=t;if(s.has(n)||r.has(e))return s.get(n)===e&&r.get(e)===n;s.set(n,e),r.set(e,n);const a=i(n,e,t);return s.delete(n),r.delete(e),a}function ha(n,e,t){if(n===e)return!0;let i=Oc(n),s=Oc(e);return i||s?i&&s?n.getTime()===e.getTime():!1:(i=$n(n),s=$n(e),i||s?n===e:(i=Be(n),s=Be(e),i||s?i&&s?zc(n,e,t,Rp):!1:(i=at(n),s=at(e),i||s?!i||!s?!1:zc(n,e,t,Cp):String(n)===String(e))))}const mf=n=>!!(n&&n.__v_isRef===!0),qe=n=>Tt(n)?n:n==null?"":Be(n)||at(n)&&(n.toString===uf||!We(n.toString))?mf(n)?qe(n.value):JSON.stringify(n,gf,2):String(n),gf=(n,e)=>mf(e)?gf(n,e.value):Li(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[Pa(i,r)+" =>"]=s,t),{})}:Vo(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Pa(t))}:$n(e)?Pa(e):at(e)&&!Be(e)&&!hf(e)?String(e):e,Pa=(n,e="")=>{var t;return $n(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Gt;class Pp{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Gt&&(Gt.active?(this.parent=Gt,this.index=(Gt.scopes||(Gt.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){const i=this.scopes.slice();for(e=0,t=i.length;e<t;e++)i[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){const s=this.scopes.slice();for(e=0,t=s.length;e<t;e++)s[e].resume()}const i=this.effects.slice();for(e=0,t=i.length;e<t;e++)i[e].resume()}}run(e){if(this._active){const t=Gt;try{return Gt=this,e()}finally{Gt=t}}}on(){++this._on===1&&(this.prevScope=Gt,Gt=this)}off(){if(this._on>0&&--this._on===0){if(Gt===this)Gt=this.prevScope;else{let e=Gt;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(t=0,i=s.length;t<i;t++)s[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Lp(){return Gt}let pt;const La=new WeakSet;class vf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Gt&&(Gt.active?Gt.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,La.has(this)&&(La.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||xf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Gc(this),yf(this);const e=pt,t=zn;pt=this,zn=!0;try{return this.fn()}finally{Mf(this),pt=e,zn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)lc(e);this.deps=this.depsTail=void 0,Gc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?La.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Rl(this)&&this.run()}get dirty(){return Rl(this)}}let _f=0,Rr,Cr;function xf(n,e=!1){if(n.flags|=8,e){n.next=Cr,Cr=n;return}n.next=Rr,Rr=n}function oc(){_f++}function ac(){if(--_f>0)return;if(Cr){let e=Cr;for(Cr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Rr;){let e=Rr;for(Rr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function yf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Mf(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),lc(i),Ip(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Rl(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Sf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Sf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Or)||(n.globalVersion=Or,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Rl(n))))return;n.flags|=2;const e=n.dep,t=pt,i=zn;pt=n,zn=!0;try{yf(n);const s=n.fn(n._value);(e.version===0||qn(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{pt=t,zn=i,Mf(n),n.flags&=-3}}function lc(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)lc(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Ip(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let zn=!0;const Ef=[];function Zn(){Ef.push(zn),zn=!1}function Jn(){const n=Ef.pop();zn=n===void 0?!0:n}function Gc(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=pt;pt=void 0;try{e()}finally{pt=t}}}let Or=0;class Dp{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class cc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!pt||!zn||pt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==pt)t=this.activeLink=new Dp(pt,this),pt.deps?(t.prevDep=pt.depsTail,pt.depsTail.nextDep=t,pt.depsTail=t):pt.deps=pt.depsTail=t,Tf(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=pt.depsTail,t.nextDep=void 0,pt.depsTail.nextDep=t,pt.depsTail=t,pt.deps===t&&(pt.deps=i)}return t}trigger(e){this.version++,Or++,this.notify(e)}notify(e){oc();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{ac()}}}function Tf(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Tf(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Cl=new WeakMap,os=Symbol(""),Pl=Symbol(""),Fr=Symbol("");function Jt(n,e,t){if(zn&&pt){let i=Cl.get(n);i||Cl.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new cc),s.map=i,s.key=t),s.track()}}function fi(n,e,t,i,s,r){const a=Cl.get(n);if(!a){Or++;return}const o=l=>{l&&l.trigger()};if(oc(),e==="clear")a.forEach(o);else{const l=Be(n),u=l&&sc(t);if(l&&t==="length"){const c=Number(i);a.forEach((h,d)=>{(d==="length"||d===Fr||!$n(d)&&d>=c)&&o(h)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),u&&o(a.get(Fr)),e){case"add":l?u&&o(a.get("length")):(o(a.get(os)),Li(n)&&o(a.get(Pl)));break;case"delete":l||(o(a.get(os)),Li(n)&&o(a.get(Pl)));break;case"set":Li(n)&&o(a.get(os));break}}ac()}function ms(n){const e=st(n);return e===n||(Jt(e,"iterate",Fr),Rn(n))?e:Qn(n)?Ii(n)?e.map(t=>Ni(Cn(t))):e.map(Ni):e.map(Cn)}function fa(n){return Jt(n=st(n),"iterate",Fr),n}function Vn(n,e){return Qn(n)?Ni(Ii(n)?Cn(e):e):Cn(e)}const Up={__proto__:null,[Symbol.iterator](){return Ia(this,Symbol.iterator,n=>Vn(this,n))},concat(...n){return ms(this).concat(...n.map(e=>Be(e)?ms(e):e))},entries(){return Ia(this,"entries",n=>(n[1]=Vn(this,n[1]),n))},every(n,e){return ni(this,"every",n,e,void 0,arguments)},filter(n,e){return ni(this,"filter",n,e,t=>t.map(i=>Vn(this,i)),arguments)},find(n,e){return ni(this,"find",n,e,t=>Vn(this,t),arguments)},findIndex(n,e){return ni(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ni(this,"findLast",n,e,t=>Vn(this,t),arguments)},findLastIndex(n,e){return ni(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ni(this,"forEach",n,e,void 0,arguments)},includes(...n){return Da(this,"includes",n)},indexOf(...n){return Da(this,"indexOf",n)},join(n){return ms(this).join(n)},lastIndexOf(...n){return Da(this,"lastIndexOf",n)},map(n,e){return ni(this,"map",n,e,void 0,arguments)},pop(){return or(this,"pop")},push(...n){return or(this,"push",n)},reduce(n,...e){return Vc(this,"reduce",n,e)},reduceRight(n,...e){return Vc(this,"reduceRight",n,e)},shift(){return or(this,"shift")},some(n,e){return ni(this,"some",n,e,void 0,arguments)},splice(...n){return or(this,"splice",n)},toReversed(){return ms(this).toReversed()},toSorted(n){return ms(this).toSorted(n)},toSpliced(...n){return ms(this).toSpliced(...n)},unshift(...n){return or(this,"unshift",n)},values(){return Ia(this,"values",n=>Vn(this,n))}};function Ia(n,e,t){const i=fa(n),s=i[e],r=s.call(i);if(i!==n&&!Rn(n)){if(r[Symbol.toStringTag]==="Array Iterator"){const a=Object.create(Object.getPrototypeOf(r));return a.next=()=>Hc(r.next(),t),s!==bf[e]&&Object.defineProperties(a,{return:{get(){const o=r.return;return typeof o=="function"?o.bind(r):o}},throw:{get(){const o=r.throw;return typeof o=="function"?o.bind(r):o}}}),a}r._next=r.next,r.next=()=>Hc(r._next(),t)}return r}function Hc(n,e){return n.done||(n.value=e(n.value)),n}const bf=Array.prototype;function ni(n,e,t,i,s,r){const a=fa(n),o=a!==n&&!Rn(n),l=a[e];if(l!==bf[e]){const h=l.apply(n,r);return o?Cn(h):h}let u=t;a!==n&&(o?u=function(h,d){return t.call(this,Vn(n,h),d,n)}:t.length>2&&(u=function(h,d){return t.call(this,h,d,n)}));const c=l.call(a,u,i);return o&&s?s(c):c}function Vc(n,e,t,i){const s=fa(n),r=s!==n&&!Rn(n);let a=t,o=!1;s!==n&&(r?(o=i.length===0,a=function(u,c,h){return o&&(o=!1,u=Vn(n,u)),t.call(this,u,Vn(n,c),h,n)}):t.length>3&&(a=function(u,c,h){return t.call(this,u,c,h,n)}));const l=s[e](a,...i);return o?Vn(n,l):l}function Da(n,e,t){const i=st(n);Jt(i,"iterate",Fr);const s=i[e](...t);return(s===-1||s===!1)&&fc(t[0])?(t[0]=st(t[0]),i[e](...t)):s}function or(n,e,t=[]){Zn(),oc();const i=st(n)[e].apply(n,t);return ac(),Jn(),i}const Np=nc("__proto__,__v_isRef,__isVue"),wf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter($n));function Op(n){$n(n)||(n=String(n));const e=st(this);return Jt(e,"has",n),e.hasOwnProperty(n)}class Af{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?qp:Lf:r?Pf:Cf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Be(e);if(!s){let l;if(a&&(l=Up[t]))return l;if(t==="hasOwnProperty")return Op}const o=Reflect.get(e,t,sn(e)?e:i);if(($n(t)?wf.has(t):Np(t))||(s||Jt(e,"get",t),r))return o;if(sn(o)){const l=a&&sc(t)?o:o.value;return s&&at(l)?Il(l):l}return at(o)?s?Il(o):da(o):o}}class Rf extends Af{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const a=Be(e)&&sc(t);if(!this._isShallow){const u=Qn(r);if(!Rn(i)&&!Qn(i)&&(r=st(r),i=st(i)),!a&&sn(r)&&!sn(i))return u||(r.value=i),!0}const o=a?Number(t)<e.length:rt(e,t),l=Reflect.set(e,t,i,sn(e)?e:s);return e===st(s)&&l&&(o?qn(i,r)&&fi(e,"set",t,i):fi(e,"add",t,i)),l}deleteProperty(e,t){const i=rt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&fi(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!$n(t)||!wf.has(t))&&Jt(e,"has",t),i}ownKeys(e){return Jt(e,"iterate",Be(e)?"length":os),Reflect.ownKeys(e)}}class Fp extends Af{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Bp=new Rf,zp=new Fp,Gp=new Rf(!0);const Ll=n=>n,eo=n=>Reflect.getPrototypeOf(n);function Hp(n,e,t){return function(...i){const s=this.__v_raw,r=st(s),a=Li(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,u=s[n](...i),c=t?Ll:e?Ni:Cn;return!e&&Jt(r,"iterate",l?Pl:os),Pt(Object.create(u),{next(){const{value:h,done:d}=u.next();return d?{value:h,done:d}:{value:o?[c(h[0]),c(h[1])]:c(h),done:d}}})}}function to(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Vp(n,e){const t={get(s){const r=this.__v_raw,a=st(r),o=st(s);n||(qn(s,o)&&Jt(a,"get",s),Jt(a,"get",o));const{has:l}=eo(a),u=e?Ll:n?Ni:Cn;if(l.call(a,s))return u(r.get(s));if(l.call(a,o))return u(r.get(o));r!==a&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Jt(st(s),"iterate",os),s.size},has(s){const r=this.__v_raw,a=st(r),o=st(s);return n||(qn(s,o)&&Jt(a,"has",s),Jt(a,"has",o)),s===o?r.has(s):r.has(s)||r.has(o)},forEach(s,r){const a=this,o=a.__v_raw,l=st(o),u=e?Ll:n?Ni:Cn;return!n&&Jt(l,"iterate",os),o.forEach((c,h)=>s.call(r,u(c),u(h),a))}};return Pt(t,n?{add:to("add"),set:to("set"),delete:to("delete"),clear:to("clear")}:{add(s){const r=st(this),a=eo(r),o=st(s),l=!e&&!Rn(s)&&!Qn(s)?o:s;return a.has.call(r,l)||qn(s,l)&&a.has.call(r,s)||qn(o,l)&&a.has.call(r,o)||(r.add(l),fi(r,"add",l,l)),this},set(s,r){!e&&!Rn(r)&&!Qn(r)&&(r=st(r));const a=st(this),{has:o,get:l}=eo(a);let u=o.call(a,s);u||(s=st(s),u=o.call(a,s));const c=l.call(a,s);return a.set(s,r),u?qn(r,c)&&fi(a,"set",s,r):fi(a,"add",s,r),this},delete(s){const r=st(this),{has:a,get:o}=eo(r);let l=a.call(r,s);l||(s=st(s),l=a.call(r,s)),o&&o.call(r,s);const u=r.delete(s);return l&&fi(r,"delete",s,void 0),u},clear(){const s=st(this),r=s.size!==0,a=s.clear();return r&&fi(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Hp(s,n,e)}),t}function uc(n,e){const t=Vp(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_isShallow"?e:s==="__v_raw"?i:Reflect.get(rt(t,s)&&s in i?t:i,s,r)}const kp={get:uc(!1,!1)},Wp={get:uc(!1,!0)},Xp={get:uc(!0,!1)};const Cf=new WeakMap,Pf=new WeakMap,Lf=new WeakMap,qp=new WeakMap;function Yp(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function da(n){return Qn(n)?n:hc(n,!1,Bp,kp,Cf)}function jp(n){return hc(n,!1,Gp,Wp,Pf)}function Il(n){return hc(n,!0,zp,Xp,Lf)}function hc(n,e,t,i,s){if(!at(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const a=Yp(_p(n));if(a===0)return n;const o=new Proxy(n,a===2?i:t);return s.set(n,o),o}function Ii(n){return Qn(n)?Ii(n.__v_raw):!!(n&&n.__v_isReactive)}function Qn(n){return!!(n&&n.__v_isReadonly)}function Rn(n){return!!(n&&n.__v_isShallow)}function fc(n){return n?!!n.__v_raw:!1}function st(n){const e=n&&n.__v_raw;return e?st(e):n}function Kp(n){return!rt(n,"__v_skip")&&Object.isExtensible(n)&&df(n,"__v_skip",!0),n}const Cn=n=>at(n)?da(n):n,Ni=n=>at(n)?Il(n):n;function sn(n){return n?n.__v_isRef===!0:!1}function gs(n){return $p(n,!1)}function $p(n,e){return sn(n)?n:new Zp(n,e)}class Zp{constructor(e,t){this.dep=new cc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:st(e),this._value=t?e:Cn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Rn(e)||Qn(e);e=i?e:st(e),qn(e,t)&&(this._rawValue=e,this._value=i?e:Cn(e),this.dep.trigger())}}function Ve(n){return sn(n)?n.value:n}const Jp={get:(n,e,t)=>e==="__v_raw"?n:Ve(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return sn(s)&&!sn(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function If(n){return Ii(n)?n:new Proxy(n,Jp)}class Qp{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new cc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Or-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&pt!==this)return xf(this,!0),!0}get value(){const e=this.dep.track();return Sf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function em(n,e,t=!1){let i,s;return We(n)?i=n:(i=n.get,s=n.set),new Qp(i,s,t)}const no={},ko=new WeakMap;let es;function tm(n,e=!1,t=es){if(t){let i=ko.get(t);i||ko.set(t,i=[]),i.push(n)}}function nm(n,e,t=dt){const{immediate:i,deep:s,once:r,scheduler:a,augmentJob:o,call:l}=t,u=E=>s?E:Rn(E)||s===!1||s===0?di(E,1):di(E);let c,h,d,m,v=!1,g=!1;if(sn(n)?(h=()=>n.value,v=Rn(n)):Ii(n)?(h=()=>u(n),v=!0):Be(n)?(g=!0,v=n.some(E=>Ii(E)||Rn(E)),h=()=>n.map(E=>{if(sn(E))return E.value;if(Ii(E))return u(E);if(We(E))return l?l(E,2):E()})):We(n)?e?h=l?()=>l(n,2):n:h=()=>{if(d){Zn();try{d()}finally{Jn()}}const E=es;es=c;try{return l?l(n,3,[m]):n(m)}finally{es=E}}:h=Kn,e&&s){const E=h,U=s===!0?1/0:s;h=()=>di(E(),U)}const p=Lp(),f=()=>{c.stop(),p&&p.active&&ic(p.effects,c)};if(r&&e){const E=e;e=(...U)=>{try{return E(...U)}finally{f()}}}let M=g?new Array(n.length).fill(no):no;const x=E=>{if(!(!(c.flags&1)||!c.dirty&&!E))if(e){const U=c.run();if(E||s||v||(g?U.some((P,R)=>qn(P,M[R])):qn(U,M))){const P=es;Zn();try{d&&d(),es=c;const R=[U,M===no?void 0:g&&M[0]===no?[]:M,m];M=U,l?l(e,3,R):e(...R)}finally{es=P,Jn()}}}else c.run()};return o&&o(x),c=new vf(h),c.scheduler=a?()=>a(x,!1):x,m=E=>tm(E,!1,c),d=c.onStop=()=>{const E=ko.get(c);if(E){if(l)l(E,4);else for(const U of E)U();ko.delete(c)}},e?i?x(!0):M=c.run():a?a(x.bind(null,!0),!0):c.run(),f.pause=c.pause.bind(c),f.resume=c.resume.bind(c),f.stop=f,f}function di(n,e=1/0,t){if(e<=0||!at(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,sn(n))di(n.value,e,t);else if(Be(n))for(let i=0;i<n.length;i++)di(n[i],e,t);else if(Vo(n)||Li(n))n.forEach(i=>{di(i,e,t)});else if(hf(n)){for(const i in n)di(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&di(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function jr(n,e,t,i){try{return i?n(...i):n()}catch(s){pa(s,e,t)}}function Pn(n,e,t,i){if(We(n)){const s=jr(n,e,t,i);return s&&cf(s)&&s.catch(r=>{pa(r,e,t)}),s}if(Be(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Pn(n[r],e,t,i));return s}}function pa(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||dt;if(e){let o=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const c=o.ec;if(c){for(let h=0;h<c.length;h++)if(c[h](n,l,u)===!1)return}o=o.parent}if(r){Zn(),jr(r,null,10,[n,l,u]),Jn();return}}im(n,t,s,i,a)}function im(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const un=[];let Un=-1;const kn=[];let Ai=null,Vs=0;const Df=Promise.resolve();let Wo=null;function Uf(n){const e=Wo||Df;return n?e.then(this?n.bind(this):n):e}function sm(n){let e=Un+1,t=un.length;for(;e<t;){const i=e+t>>>1,s=un[i],r=Br(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function dc(n){if(!(n.flags&1)){const e=Br(n),t=un[un.length-1];!t||!(n.flags&2)&&e>=Br(t)?un.push(n):un.splice(sm(e),0,n),n.flags|=1,Nf()}}function Nf(){Wo||(Wo=Df.then(Bf))}function rm(n){if(!Be(n))Ai&&n.id===-1?Ai.splice(Vs+1,0,n):n.flags&1||(kn.push(n),n.flags|=1);else for(let e=0;e<n.length;e++)kn.push(n[e]);Nf()}function Of(n,e,t,i=Un+1){for(;i<un.length;i++){const s=un[i];if(s&&s.flags&2){if(n&&s.id!==n.uid||e!==void 0&&!(s.id>=e))continue;un.splice(i,1),i=n?i-1:Un,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Ff(n,e,t=0){if(kn.length){let i=kn,s=0;if(e){i=[];for(let a=0;a<kn.length;a++){const o=kn[a];(o.i!==void 0?!o.i||o.i.uid<t:e.has(o))?kn[s++]=o:i.push(o)}}const r=[...new Set(i)].sort((a,o)=>Br(a)-Br(o));if(kn.length=s,Ai){for(let a=0;a<r.length;a++)Ai.push(r[a]);return}for(Ai=r,Vs=0;Vs<Ai.length;Vs++){const a=Ai[Vs];a.flags&4&&(a.flags&=-2),a.flags&8||a(),a.flags&=-2}Ai=null,Vs=0}}let Ua=!1;function om(n,e){if(Ua){n();return}const t=e===void 0?void 0:new Set(kn);n(),Ua=!0;try{Of(void 0,e),Ff(void 0,t,e)}finally{Ua=!1}}const Br=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Bf(n){try{for(Un=0;Un<un.length;Un++){const e=un[Un];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),jr(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Un<un.length;Un++){const e=un[Un];e&&(e.flags&=-2)}Un=-1,un.length=0,Ff(),Wo=null,(un.length||kn.length)&&Bf()}}let An=null,zf=null;function Xo(n){const e=An;return An=n,zf=n&&n.type.__scopeId||null,e}function Bo(n,e=An,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Ko(-1);const r=Xo(e),a=as.length;let o;try{o=n(...s)}finally{for(let l=as.length;l>a;l--)fd();Xo(r),i._d&&Ko(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Na(n,e){if(An===null)return n;const t=ya(An),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,a,o,l=dt]=e[s];r&&(We(r)&&(r={mounted:r,updated:r}),r.deep&&di(a),i.push({dir:r,instance:t,value:a,oldValue:void 0,arg:o,modifiers:l}))}return n}function ki(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(Zn(),Pn(l,t,8,[n.el,o,n,e]),Jn())}}function am(n,e){if(hn){let t=hn.provides;const i=hn.parent&&hn.parent.provides;i===t&&(t=hn.provides=Object.create(i)),t[n]=e}}function zo(n,e,t=!1){const i=gd();if(i||Ys){let s=Ys?Ys._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&We(e)?e.call(i&&i.proxy):e}}const lm=Symbol.for("v-scx"),cm=()=>zo(lm);function Oa(n,e,t){return Gf(n,e,t)}function Gf(n,e,t=dt){const{immediate:i,deep:s,flush:r,once:a}=t,o=Pt({},t),l=e&&i||!e&&r!=="post";let u;if(kr){if(r==="sync"){const m=cm();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=Kn,m.resume=Kn,m.pause=Kn,m}}const c=hn;o.call=(m,v,g)=>Pn(m,c,v,g);let h=!1;r==="post"?o.scheduler=m=>{m.i=c,dn(m,c&&c.suspense)}:r!=="sync"&&(h=!0,o.scheduler=(m,v)=>{v?m():dc(m)}),o.augmentJob=m=>{e&&(m.flags|=4),h&&(m.flags|=2,c&&(m.id=c.uid,m.i=c))};const d=nm(n,e,o);return kr&&(u?u.push(d):l&&d()),d}function um(n,e,t){const i=this.proxy,s=Tt(n)?n.includes(".")?Hf(i,n):()=>i[n]:n.bind(i,i);let r;We(e)?r=e:(r=e.handler,t=e);const a=Kr(this),o=Gf(s,r.bind(i),t);return a(),o}function Hf(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const hm=Symbol("_vte"),ma=n=>n.__isTeleport,bn=Symbol("_leaveCb"),ar=Symbol("_enterCb");function fm(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return pc(()=>{n.isMounted=!0}),mc(()=>{n.isUnmounting=!0}),n}const En=[Function,Array],Vf={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:En,onEnter:En,onAfterEnter:En,onEnterCancelled:En,onBeforeLeave:En,onLeave:En,onAfterLeave:En,onLeaveCancelled:En,onBeforeAppear:En,onAppear:En,onAfterAppear:En,onAppearCancelled:En},dm={name:"BaseTransition",props:Vf,setup(n,{slots:e}){const t=gd(),i=fm();return()=>{const s=e.default&&Xf(e.default(),!0),r=s&&s.length?kf(s):t.subTree?ks():void 0;if(!r)return;const a=st(n),{mode:o}=a;if(i.isLeaving)return Fa(r);const l=qo(r);if(!l)return Fa(r);let u=Dl(l,a,i,t,h=>u=h);l.type!==tn&&Zs(l,u);let c=t.subTree&&qo(t.subTree);if(c&&c.type!==tn&&!ns(c,l)&&zr(t.subTree)){let h=Dl(c,a,i,t);if(Zs(c,h),o==="out-in"&&l.type!==tn)return i.isLeaving=!0,h.afterLeave=()=>{i.isLeaving=!1,t.job.flags&8||t.update(),delete h.afterLeave,c=void 0},Fa(r);o==="in-out"&&l.type!==tn?h.delayLeave=(d,m,v)=>{const g=Wf(i,c);g[String(c.key)]=c,d[bn]=()=>{m(),d[bn]=void 0,delete u.delayedLeave,c=void 0},u.delayedLeave=()=>{v(),delete u.delayedLeave,c=void 0}}:c=void 0}else c&&(c=void 0);return r}}};function kf(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==tn){e=t;break}}return e}const pm=dm;function Wf(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function Dl(n,e,t,i,s){const{appear:r,mode:a,persisted:o=!1,onBeforeEnter:l,onEnter:u,onAfterEnter:c,onEnterCancelled:h,onBeforeLeave:d,onLeave:m,onAfterLeave:v,onLeaveCancelled:g,onBeforeAppear:p,onAppear:f,onAfterAppear:M,onAppearCancelled:x}=e,E=String(n.key),U=Wf(t,n),P=(k,y)=>{k&&Pn(k,i,9,y)},R=(k,y)=>{const T=y[1];P(k,y),Be(k)?k.every(L=>L.length<=1)&&T():k.length<=1&&T()},O={mode:a,persisted:o,beforeEnter(k){let y=l;if(!t.isMounted)if(r)y=p||l;else return;k[bn]&&k[bn](!0);const T=U[E];if(T&&ns(n,T)){let L=T.el[bn];if(!L){const z=zr(T);L=z&&z.el[bn]}L&&L()}P(y,[k])},enter(k){if(U[E]===n)return;let y=u,T=c,L=h;if(!t.isMounted)if(r)y=f||u,T=M||c,L=x||h;else return;let z=!1;k[ar]=q=>{z||(z=!0,q?P(L,[k]):P(T,[k]),O.delayedLeave&&O.delayedLeave(),k[ar]=void 0)};const D=k[ar].bind(null,!1);y?R(y,[k,D]):D()},leave(k,y){const T=String(n.key);if(k[ar]&&k[ar](!0),t.isUnmounting)return y();P(d,[k]);let L=!1;k[bn]=D=>{L||(L=!0,y(),D?P(g,[k]):P(v,[k]),k[bn]=void 0,U[T]===n&&delete U[T])};const z=k[bn].bind(null,!1);U[T]=n,m?R(m,[k,z]):z()},clone(k){const y=Dl(k,e,t,i,s);return s&&s(y),y}};return O}function Fa(n){if(ga(n))return n=Oi(n),n.children=null,n}function qo(n){if(!ga(n))return ma(n.type)&&n.children?kf(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&We(t.default))return t.default()}}function Zs(n,e){if(n.shapeFlag&6&&n.component){n.transition=e;const t=n.component.subTree;Zs(ma(t.type)&&qo(t)||t,e)}else if(n.shapeFlag&128)n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback);else if(n.transition=e,n.type===Wt&&Be(n.children)){const t=Qf(n.children,!1);t&&Zs(t,e)}}function Xf(n,e=!1,t){let i=[],s=0;for(let r=0;r<n.length;r++){let a=n[r];const o=t==null?a.key:String(t)+String(a.key!=null?a.key:r);a.type===Wt?(a.patchFlag&128&&s++,i=i.concat(Xf(a.children,e,o))):(e||a.type!==tn)&&i.push(o!=null?Oi(a,{key:o}):a)}if(s>1)for(let r=0;r<i.length;r++)i[r].patchFlag=-2;return i}function zr(n){if(n.component)return zr(n.component.subTree);if(n.type===Wt){const e=Be(n.children)&&Qf(n.children,!1);return e?zr(e):void 0}if(n.type!==tn)return n}function mm(n,e){return We(n)?Pt({name:n.name},e,{setup:n}):n}function qf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function kc(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Yo=new WeakMap;function Pr(n,e,t,i,s=!1){if(Be(n)){n.forEach((g,p)=>Pr(g,e&&(Be(e)?e[p]:e),t,i,s));return}if(Lr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Pr(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?ya(i.component):i.el,a=s?null:r,{i:o,r:l}=n,u=e&&e.r,c=o.refs===dt?o.refs={}:o.refs,h=o.setupState,d=st(h),m=h===dt?lf:g=>kc(c,g)?!1:rt(d,g),v=(g,p)=>!(p&&kc(c,p));if(u!=null&&u!==l){if(Wc(e),Tt(u))c[u]=null,m(u)&&(h[u]=null);else if(sn(u)){const g=e;v(u,g.k)&&(u.value=null),g.k&&(c[g.k]=null)}}if(We(l))jr(l,o,12,[a,c]);else{const g=Tt(l),p=sn(l);if(g||p){const f=()=>{if(n.f){const M=g?m(l)?h[l]:c[l]:v()||!n.k?l.value:c[n.k];if(s)Be(M)&&ic(M,r);else if(Be(M))M.includes(r)||M.push(r);else if(g)c[l]=[r],m(l)&&(h[l]=c[l]);else{const x=[r];v(l,n.k)&&(l.value=x),n.k&&(c[n.k]=x)}}else g?(c[l]=a,m(l)&&(h[l]=a)):p&&(v(l,n.k)&&(l.value=a),n.k&&(c[n.k]=a))};if(a){const M=()=>{f(),Yo.delete(n)};M.id=-1,Yo.set(n,M),dn(M,t)}else Wc(n),f()}}}function Wc(n){const e=Yo.get(n);e&&(e.flags|=8,Yo.delete(n))}ua().requestIdleCallback;ua().cancelIdleCallback;const Lr=n=>!!n.type.__asyncLoader,ga=n=>n.type.__isKeepAlive;function gm(n,e){Yf(n,"a",e)}function vm(n,e){Yf(n,"da",e)}function Yf(n,e,t=hn){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(va(e,i,t),t){let s=t.parent;for(;s&&s.parent;)ga(s.parent.vnode)&&_m(i,e,t,s),s=s.parent}}function _m(n,e,t,i){const s=va(e,n,i,!0);jf(()=>{ic(i[e],s)},t)}function va(n,e,t=hn,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{Zn();const o=Kr(t),l=Pn(e,t,n,a);return o(),Jn(),l});return i?s.unshift(r):s.push(r),r}}const xi=n=>(e,t=hn)=>{(!kr||n==="sp")&&va(n,(...i)=>e(...i),t)},xm=xi("bm"),pc=xi("m"),ym=xi("bu"),Mm=xi("u"),mc=xi("bum"),jf=xi("um"),Sm=xi("sp"),Em=xi("rtg"),Tm=xi("rtc");function bm(n,e=hn){va("ec",n,e)}const wm=Symbol.for("v-ndc");function lr(n,e,t,i){let s;const r=t,a=Be(n);if(a||Tt(n)){const o=a&&Ii(n);let l=!1,u=!1;o&&(l=!Rn(n),u=Qn(n),n=fa(n)),s=new Array(n.length);for(let c=0,h=n.length;c<h;c++)s[c]=e(l?u?Ni(Cn(n[c])):Cn(n[c]):n[c],c,void 0,r)}else if(typeof n=="number")if(!Number.isInteger(n)||n<0)s=[];else{s=new Array(n);for(let o=0;o<n;o++)s[o]=e(o+1,o,void 0,r)}else if(at(n))if(n[Symbol.iterator])s=Array.from(n,(o,l)=>e(o,l,void 0,r));else{const o=Object.keys(n);s=new Array(o.length);for(let l=0,u=o.length;l<u;l++){const c=o[l];s[l]=e(n[c],c,l,r)}}else s=[];return s}const Ul=n=>n?vd(n)?ya(n):Ul(n.parent):null,Ir=Pt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ul(n.parent),$root:n=>Ul(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>$f(n),$forceUpdate:n=>n.f||(n.f=()=>{dc(n.update)}),$nextTick:n=>n.n||(n.n=Uf.bind(n.proxy)),$watch:n=>um.bind(n)}),Ba=(n,e)=>n!==dt&&!n.__isScriptSetup&&rt(n,e),Am={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;if(e[0]!=="$"){const d=a[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(Ba(i,e))return a[e]=1,i[e];if(s!==dt&&rt(s,e))return a[e]=2,s[e];if(rt(r,e))return a[e]=3,r[e];if(t!==dt&&rt(t,e))return a[e]=4,t[e];Nl&&(a[e]=0)}}const u=Ir[e];let c,h;if(u)return e==="$attrs"&&Jt(n.attrs,"get",""),u(n);if((c=o.__cssModules)&&(c=c[e]))return c;if(t!==dt&&rt(t,e))return a[e]=4,t[e];if(h=l.config.globalProperties,rt(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return Ba(s,e)?(s[e]=t,!0):i!==dt&&rt(i,e)?(i[e]=t,!0):rt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:a}},o){let l;return!!(t[o]||n!==dt&&o[0]!=="$"&&rt(n,o)||Ba(e,o)||rt(r,o)||rt(i,o)||rt(Ir,o)||rt(s.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:rt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Xc(n){return Be(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Nl=!0;function Rm(n){const e=$f(n),t=n.proxy,i=n.ctx;Nl=!1,e.beforeCreate&&qc(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:u,created:c,beforeMount:h,mounted:d,beforeUpdate:m,updated:v,activated:g,deactivated:p,beforeDestroy:f,beforeUnmount:M,destroyed:x,unmounted:E,render:U,renderTracked:P,renderTriggered:R,errorCaptured:O,serverPrefetch:k,expose:y,inheritAttrs:T,components:L,directives:z,filters:D}=e;if(u&&Cm(u,i,null),a)for(const J in a){const F=a[J];We(F)&&(i[J]=F.bind(t))}if(s){const J=s.call(t,t);at(J)&&(n.data=da(J))}if(Nl=!0,r)for(const J in r){const F=r[J],Q=We(F)?F.bind(t,t):We(F.get)?F.get.bind(t,t):Kn,oe=!We(F)&&We(F.set)?F.set.bind(t):Kn,fe=_c({get:Q,set:oe});Object.defineProperty(i,J,{enumerable:!0,configurable:!0,get:()=>fe.value,set:ye=>fe.value=ye})}if(o)for(const J in o)Kf(o[J],i,t,J);if(l){const J=We(l)?l.call(t):l;Reflect.ownKeys(J).forEach(F=>{am(F,J[F])})}c&&qc(c,n,"c");function G(J,F){Be(F)?F.forEach(Q=>J(Q.bind(t))):F&&J(F.bind(t))}if(G(xm,h),G(pc,d),G(ym,m),G(Mm,v),G(gm,g),G(vm,p),G(bm,O),G(Tm,P),G(Em,R),G(mc,M),G(jf,E),G(Sm,k),Be(y))if(y.length){const J=n.exposed||(n.exposed={});y.forEach(F=>{Object.defineProperty(J,F,{get:()=>t[F],set:Q=>t[F]=Q,enumerable:!0})})}else n.exposed||(n.exposed={});U&&n.render===Kn&&(n.render=U),T!=null&&(n.inheritAttrs=T),L&&(n.components=L),z&&(n.directives=z),k&&qf(n)}function Cm(n,e,t=Kn){Be(n)&&(n=Ol(n));for(const i in n){const s=n[i];let r;at(s)?"default"in s?r=zo(s.from||i,s.default,!0):r=zo(s.from||i):r=zo(s),sn(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[i]=r}}function qc(n,e,t){Pn(Be(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Kf(n,e,t,i){let s=i.includes(".")?Hf(t,i):()=>t[i];if(Tt(n)){const r=e[n];We(r)&&Oa(s,r)}else if(We(n))Oa(s,n.bind(t));else if(at(n))if(Be(n))n.forEach(r=>Kf(r,e,t,i));else{const r=We(n.handler)?n.handler.bind(t):e[n.handler];We(r)&&Oa(s,r,n)}}function $f(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(u=>jo(l,u,a,!0)),jo(l,e,a)),at(e)&&r.set(e,l),l}function jo(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&jo(n,r,t,!0),s&&s.forEach(a=>jo(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=Pm[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const Pm={data:Yc,props:jc,emits:jc,methods:Tr,computed:Tr,beforeCreate:on,created:on,beforeMount:on,mounted:on,beforeUpdate:on,updated:on,beforeDestroy:on,beforeUnmount:on,destroyed:on,unmounted:on,activated:on,deactivated:on,errorCaptured:on,serverPrefetch:on,components:Tr,directives:Tr,watch:Im,provide:Yc,inject:Lm};function Yc(n,e){return e?n?function(){return Pt(We(n)?n.call(this,this):n,We(e)?e.call(this,this):e)}:e:n}function Lm(n,e){return Tr(Ol(n),Ol(e))}function Ol(n){if(Be(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function on(n,e){return n?[...new Set([].concat(n,e))]:e}function Tr(n,e){return n?Pt(Object.create(null),n,e):e}function jc(n,e){return n?Be(n)&&Be(e)?[...new Set([...n,...e])]:Pt(Object.create(null),Xc(n),Xc(e??{})):e}function Im(n,e){if(!n)return e;if(!e)return n;const t=Pt(Object.create(null),n);for(const i in e)t[i]=on(n[i],e[i]);return t}function Zf(){return{app:null,config:{isNativeTag:lf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Dm=0;function Um(n,e){return function(i,s=null){We(i)||(i=Pt({},i)),s!=null&&!at(s)&&(s=null);const r=Zf(),a=new WeakSet,o=[];let l=!1;const u=r.app={_uid:Dm++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:fg,get config(){return r.config},set config(c){},use(c,...h){return a.has(c)||(c&&We(c.install)?(a.add(c),c.install(u,...h)):We(c)&&(a.add(c),c(u,...h))),u},mixin(c){return r.mixins.includes(c)||r.mixins.push(c),u},component(c,h){return h?(r.components[c]=h,u):r.components[c]},directive(c,h){return h?(r.directives[c]=h,u):r.directives[c]},mount(c,h,d){if(!l){const m=u._ceVNode||nn(i,s);return m.appContext=r,d===!0?d="svg":d===!1&&(d=void 0),n(m,c,d),l=!0,u._container=c,c.__vue_app__=u,ya(m.component)}},onUnmount(c){o.push(c)},unmount(){l&&(Pn(o,u._instance,16),n(null,u._container),delete u._container.__vue_app__)},provide(c,h){return r.provides[c]=h,u},runWithContext(c){const h=Ys;Ys=u;try{return c()}finally{Ys=h}}};return u}}let Ys=null;const Nm=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Bn(e)}Modifiers`]||n[`${hs(e)}Modifiers`];function Om(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||dt;let s=t;const r=e.startsWith("update:"),a=r&&Nm(i,e.slice(7));a&&(a.trim&&(s=t.map(c=>Tt(c)?c.trim():c)),a.number&&(s=s.map(rc)));let o,l=i[o=Ca(e)]||i[o=Ca(Bn(e))];!l&&r&&(l=i[o=Ca(hs(e))]),l&&Pn(l,n,6,s);const u=i[o+"Once"];if(u){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,Pn(u,n,6,s)}}const Fm=new WeakMap;function Jf(n,e,t=!1){const i=t?Fm:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!We(n)){const l=u=>{const c=Jf(u,e,!0);c&&(o=!0,Pt(a,c))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(at(n)&&i.set(n,null),null):(Be(r)?r.forEach(l=>a[l]=null):Pt(a,r),at(n)&&i.set(n,a),a)}function _a(n,e){return!n||!aa(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),rt(n,e[0].toLowerCase()+e.slice(1))||rt(n,hs(e))||rt(n,e))}function Kc(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:a,attrs:o,emit:l,render:u,renderCache:c,props:h,data:d,setupState:m,ctx:v,inheritAttrs:g}=n,p=Xo(n);let f,M;try{if(t.shapeFlag&4){const E=s||i,U=E;f=Wn(u.call(U,E,c,h,m,d,v)),M=o}else{const E=e;f=Wn(E.length>1?E(h,{attrs:o,slots:a,emit:l}):E(h,null)),M=e.props?o:Bm(o)}}catch(E){as.length=0,pa(E,n,1),f=nn(tn)}let x=f;if(M&&g!==!1){const E=Object.keys(M),{shapeFlag:U}=x;E.length&&U&7&&(r&&E.some(la)&&(M=zm(M,r)),x=Oi(x,M,!1,!0))}if(t.dirs&&(x=Oi(x,null,!1,!0),x.dirs=x.dirs?x.dirs.concat(t.dirs):t.dirs),t.transition){const E=ma(x.type)&&qo(x)||x;Zs(E,t.transition)}return f=x,Xo(p),f}function Qf(n,e=!0){let t;for(let i=0;i<n.length;i++){const s=n[i];if(Hr(s)){if(s.type!==tn||s.children==="v-if"){if(t)return;t=s}}else return}return t}const Bm=n=>{let e;for(const t in n)(t==="class"||t==="style"||aa(t))&&((e||(e={}))[t]=n[t]);return e},zm=(n,e)=>{const t={};for(const i in n)(!la(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Gm(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,u=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?$c(i,a,u):!!a;if(l&8){const c=e.dynamicProps;for(let h=0;h<c.length;h++){const d=c[h];if(ed(a,i,d)&&!_a(u,d))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?$c(i,a,u):!0:!!a;return!1}function $c(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(!rt(n,r)||ed(e,n,r)&&!_a(t,r))return!0}return!1}function ed(n,e,t){const i=n[t],s=e[t];return t==="style"&&at(i)&&at(s)?!ha(i,s):i!==s}function Hm({vnode:n,parent:e,suspense:t},i){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=e.vnode).el=i,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=i)}const td={},nd=()=>Object.create(td),id=n=>Object.getPrototypeOf(n)===td;function Vm(n,e,t,i=!1){const s={},r=nd();n.propsDefaults=Object.create(null),sd(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:jp(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function km(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=st(s),[l]=n.propsOptions;let u=!1;if((i||a>0)&&!(a&16)){if(a&8){const c=n.vnode.dynamicProps;for(let h=0;h<c.length;h++){let d=c[h];if(_a(n.emitsOptions,d))continue;const m=e[d];if(l)if(rt(r,d))m!==r[d]&&(r[d]=m,u=!0);else{const v=Bn(d);s[v]=Fl(l,o,v,m,n,!1)}else m!==r[d]&&(r[d]=m,u=!0)}}}else{sd(n,e,s,r)&&(u=!0);let c;for(const h in o)(!e||!rt(e,h)&&((c=hs(h))===h||!rt(e,c)))&&(l?t&&(t[h]!==void 0||t[c]!==void 0)&&(s[h]=Fl(l,o,h,void 0,n,!0)):delete s[h]);if(r!==o)for(const h in r)(!e||!rt(e,h))&&(delete r[h],u=!0)}u&&fi(n.attrs,"set","")}function sd(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(Ar(l))continue;const u=e[l];let c;s&&rt(s,c=Bn(l))?!r||!r.includes(c)?t[c]=u:(o||(o={}))[c]=u:_a(n.emitsOptions,l)||(!(l in i)||u!==i[l])&&(i[l]=u,a=!0)}if(r){const l=st(t),u=o||dt;for(let c=0;c<r.length;c++){const h=r[c];t[h]=Fl(s,l,h,u[h],n,!rt(u,h))}}return a}function Fl(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=rt(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&We(l)){const{propsDefaults:u}=s;if(t in u)i=u[t];else{const c=Kr(s);i=u[t]=l.call(null,e),c()}}else i=l;s.ce&&s.ce._setProp(t,i)}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===hs(t))&&(i=!0))}return i}const Wm=new WeakMap;function rd(n,e,t=!1){const i=t?Wm:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!We(n)){const c=h=>{l=!0;const[d,m]=rd(h,e,!0);Pt(a,d),m&&o.push(...m)};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}if(!r&&!l)return at(n)&&i.set(n,rs),rs;if(Be(r))for(let c=0;c<r.length;c++){const h=Bn(r[c]);Zc(h)&&(a[h]=dt)}else if(r)for(const c in r){const h=Bn(c);if(Zc(h)){const d=r[c],m=a[h]=Be(d)||We(d)?{type:d}:Pt({},d),v=m.type;let g=!1,p=!0;if(Be(v))for(let f=0;f<v.length;++f){const M=v[f],x=We(M)&&M.name;if(x==="Boolean"){g=!0;break}else x==="String"&&(p=!1)}else g=We(v)&&v.name==="Boolean";m[0]=g,m[1]=p,(g||rt(m,"default"))&&o.push(h)}}const u=[a,o];return at(n)&&i.set(n,u),u}function Zc(n){return n[0]!=="$"&&!Ar(n)}const gc=n=>n==="_"||n==="_ctx"||n==="$stable",vc=n=>Be(n)?n.map(Wn):[Wn(n)],Xm=(n,e,t)=>{if(e._n)return e;const i=Bo((...s)=>vc(e(...s)),t);return i._c=!1,i},od=(n,e,t)=>{const i=n._ctx;for(const s in n){if(gc(s))continue;const r=n[s];if(We(r))e[s]=Xm(s,r,i);else if(r!=null){const a=vc(r);e[s]=()=>a}}},ad=(n,e)=>{const t=vc(e);n.slots.default=()=>t},ld=(n,e,t)=>{for(const i in e)(t||!gc(i))&&(n[i]=e[i])},qm=(n,e,t)=>{const i=n.slots=nd();if(n.vnode.shapeFlag&32){const s=e._;s?(ld(i,e,t),t&&df(i,"_",s,!0)):od(e,i)}else e&&ad(n,e)},Ym=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=dt;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:ld(s,e,t):(r=!e.$stable,od(e,s)),a=e}else e&&(ad(n,e),a={default:1});if(r)for(const o in s)!gc(o)&&a[o]==null&&delete s[o]},dn=Jm;function jm(n){return Km(n)}function Km(n,e){const t=ua();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:u,setElementText:c,parentNode:h,nextSibling:d,setScopeId:m=Kn,insertStaticContent:v}=n,g=(A,S,K,Y=null,$=null,W=null,ue=void 0,le=null,ce=!!S.dynamicChildren)=>{if(A===S)return;A&&!ns(A,S)&&(Y=Ge(A),ye(A,$,W,!0),A=null),S.patchFlag===-2&&(ce=!1,S.dynamicChildren=null),S.dynamicChildren&&A&&A.dynamicChildren&&A.dynamicChildren.hasOnce&&(S.dynamicChildren===rs&&(S.dynamicChildren=[]),S.dynamicChildren.hasOnce=!0);const{type:ie,ref:b,shapeFlag:_}=S;switch(ie){case xa:p(A,S,K,Y);break;case tn:f(A,S,K,Y);break;case Ga:A==null&&M(S,K,Y,ue);break;case Wt:L(A,S,K,Y,$,W,ue,le,ce);break;default:_&1?U(A,S,K,Y,$,W,ue,le,ce):_&6?z(A,S,K,Y,$,W,ue,le,ce):(_&64||_&128)&&ie.process(A,S,K,Y,$,W,ue,le,ce,Re)}b!=null&&$?Pr(b,A&&A.ref,W,S||A,!S):b==null&&A&&A.ref!=null&&Pr(A.ref,null,W,A,!0)},p=(A,S,K,Y)=>{if(A==null)i(S.el=o(S.children),K,Y);else{const $=S.el=A.el;S.children!==A.children&&u($,S.children)}},f=(A,S,K,Y)=>{A==null?i(S.el=l(S.children||""),K,Y):S.el=A.el},M=(A,S,K,Y)=>{[A.el,A.anchor]=v(A.children,S,K,Y,A.el,A.anchor)},x=({el:A,anchor:S},K,Y)=>{let $;for(;A&&A!==S;)$=d(A),i(A,K,Y),A=$;i(S,K,Y)},E=({el:A,anchor:S})=>{let K;for(;A&&A!==S;)K=d(A),s(A),A=K;s(S)},U=(A,S,K,Y,$,W,ue,le,ce)=>{if(S.type==="svg"?ue="svg":S.type==="math"&&(ue="mathml"),A==null)P(S,K,Y,$,W,ue,le,ce);else{const ie=A.el&&A.el._isVueCE?A.el:null;try{ie&&ie._beginPatch(),k(A,S,$,W,ue,le,ce)}finally{ie&&ie._endPatch()}}},P=(A,S,K,Y,$,W,ue,le)=>{let ce,ie;const{props:b,shapeFlag:_,transition:B,dirs:V}=A;if(ce=A.el=a(A.type,W,b&&b.is,b),_&8?c(ce,A.children):_&16&&O(A.children,ce,null,Y,$,za(A,W),ue,le),V&&ki(A,null,Y,"created"),R(ce,A,A.scopeId,ue,Y),b){for(const re in b)re!=="value"&&!Ar(re)&&r(ce,re,null,b[re],W,Y);"value"in b&&r(ce,"value",null,b.value,W),(ie=b.onVnodeBeforeMount)&&Hn(ie,Y,A)}V&&ki(A,null,Y,"beforeMount");const ae=$m($,B);ae&&B.beforeEnter(ce),i(ce,S,K),((ie=b&&b.onVnodeMounted)||ae||V)&&dn(()=>{try{ie&&Hn(ie,Y,A),ae&&B.enter(ce),V&&ki(A,null,Y,"mounted")}finally{}},$)},R=(A,S,K,Y,$)=>{if(K&&m(A,K),Y)for(let W=0;W<Y.length;W++)m(A,Y[W]);if($){let W=$.subTree;if(S===W||hd(W.type)&&(W.ssContent===S||W.ssFallback===S)){const ue=$.vnode;R(A,ue,ue.scopeId,ue.slotScopeIds,$.parent)}}},O=(A,S,K,Y,$,W,ue,le,ce=0)=>{for(let ie=ce;ie<A.length;ie++){const b=A[ie]=le?hi(A[ie]):Wn(A[ie]);g(null,b,S,K,Y,$,W,ue,le)}},k=(A,S,K,Y,$,W,ue)=>{const le=S.el=A.el;let{patchFlag:ce,dynamicChildren:ie,dirs:b}=S;ce|=A.patchFlag&16;const _=A.props||dt,B=S.props||dt;let V;if(K&&Wi(K,!1),(V=B.onVnodeBeforeUpdate)&&Hn(V,K,S,A),b&&ki(S,A,K,"beforeUpdate"),K&&Wi(K,!0),ie&&(!A.dynamicChildren||A.dynamicChildren.length!==ie.length)&&(ce=0,ue=!1,ie=null),(_.innerHTML&&B.innerHTML==null||_.textContent&&B.textContent==null)&&c(le,""),ie?y(A.dynamicChildren,ie,le,K,Y,za(S,$),W):ue||F(A,S,le,null,K,Y,za(S,$),W,!1),ce>0){if(ce&16)T(le,_,B,K,$);else if(ce&2&&_.class!==B.class&&r(le,"class",null,B.class,$),ce&4&&r(le,"style",_.style,B.style,$),ce&8){const ae=S.dynamicProps;for(let re=0;re<ae.length;re++){const Ee=ae[re],we=_[Ee],pe=B[Ee];(pe!==we||Ee==="value")&&r(le,Ee,we,pe,$,K)}}ce&1&&A.children!==S.children&&c(le,S.children)}else!ue&&ie==null&&T(le,_,B,K,$);((V=B.onVnodeUpdated)||b)&&dn(()=>{V&&Hn(V,K,S,A),b&&ki(S,A,K,"updated")},Y)},y=(A,S,K,Y,$,W,ue)=>{for(let le=0;le<S.length;le++){const ce=A[le],ie=S[le],b=ce.el||Bl(ce),_=b&&(ce.type===Wt||!ns(ce,ie)||ce.shapeFlag&198)?h(b):K;g(ce,ie,_,null,Y,$,W,ue,!0)}},T=(A,S,K,Y,$)=>{if(S!==K){if(S!==dt)for(const W in S)!Ar(W)&&!(W in K)&&r(A,W,S[W],null,$,Y);for(const W in K){if(Ar(W))continue;const ue=K[W],le=S[W];ue!==le&&W!=="value"&&r(A,W,le,ue,$,Y)}"value"in K&&r(A,"value",S.value,K.value,$)}},L=(A,S,K,Y,$,W,ue,le,ce)=>{const ie=S.el=A?A.el:o(""),b=S.anchor=A?A.anchor:o("");let{patchFlag:_,dynamicChildren:B,slotScopeIds:V}=S;V&&(le=le?le.concat(V):V),A==null?(i(ie,K,Y),i(b,K,Y),O(S.children||[],K,b,$,W,ue,le,ce)):_>0&&_&64&&B&&A.dynamicChildren&&A.dynamicChildren.length===B.length?(y(A.dynamicChildren,B,K,$,W,ue,le),(S.key!=null||$&&S===$.subTree)&&cd(A,S,!0)):F(A,S,K,b,$,W,ue,le,ce)},z=(A,S,K,Y,$,W,ue,le,ce)=>{S.slotScopeIds=le,A==null?S.shapeFlag&512?$.ctx.activate(S,K,Y,ue,ce):D(S,K,Y,$,W,ue,ce):q(A,S,ce)},D=(A,S,K,Y,$,W,ue)=>{const le=A.component=rg(A,Y,$);if(ga(A)&&(le.ctx.renderer=Re),og(le,!1,ue),le.asyncDep){if($&&$.registerDep(le,G,ue,W),!A.el){const ce=le.subTree=nn(tn);f(null,ce,S,K),A.placeholder=ce.el}}else G(le,A,S,K,$,W,ue)},q=(A,S,K)=>{const Y=S.component=A.component;if(Gm(A,S,K))if(Y.asyncDep&&!Y.asyncResolved){S.el=A.el,S.placeholder=A.placeholder,J(Y,S,K);return}else Y.next=S,Y.update();else S.el=A.el,S.placeholder=A.placeholder,Y.vnode=S},G=(A,S,K,Y,$,W,ue)=>{const le=()=>{if(A.isMounted){let{next:_,bu:B,u:V,parent:ae,vnode:re}=A;{const Oe=ud(A);if(Oe){_&&(_.el=re.el,J(A,_,ue)),Oe.asyncDep.then(()=>{dn(()=>{A.isUnmounted||ie()},$)});return}}let Ee=_,we;Wi(A,!1),_?(_.el=re.el,J(A,_,ue)):_=re,B&&Fo(B),(we=_.props&&_.props.onVnodeBeforeUpdate)&&Hn(we,ae,_,re),Wi(A,!0);const pe=Kc(A),xe=A.subTree;A.subTree=pe,g(xe,pe,h(xe.el),Ge(xe),A,$,W),_.el=pe.el,Ee===null&&Hm(A,pe.el),V&&dn(V,$),(we=_.props&&_.props.onVnodeUpdated)&&dn(()=>Hn(we,ae,_,re),$)}else{let _;const{el:B,props:V}=S,{bm:ae,m:re,parent:Ee,root:we,type:pe}=A,xe=Lr(S);Wi(A,!1),ae&&Fo(ae),!xe&&(_=V&&V.onVnodeBeforeMount)&&Hn(_,Ee,S),Wi(A,!0);{we.ce&&we.ce._hasShadowRoot()&&we.ce._injectChildStyle(pe,A.parent?A.parent.type:void 0);const Oe=A.subTree=Kc(A);g(null,Oe,K,Y,A,$,W),S.el=Oe.el}if(re&&dn(re,$),!xe&&(_=V&&V.onVnodeMounted)){const Oe=S;dn(()=>Hn(_,Ee,Oe),$)}(S.shapeFlag&256||Ee&&Lr(Ee.vnode)&&Ee.vnode.shapeFlag&256)&&A.a&&dn(A.a,$),A.isMounted=!0,S=K=Y=null}};A.scope.on();const ce=A.effect=new vf(le);A.scope.off();const ie=A.update=ce.run.bind(ce),b=A.job=ce.runIfDirty.bind(ce);b.i=A,b.id=A.uid,ce.scheduler=()=>dc(b),Wi(A,!0),ie()},J=(A,S,K)=>{S.component=A;const Y=A.vnode.props;A.vnode=S,A.next=null,km(A,S.props,Y,K),Ym(A,S.children,K),Zn(),Of(A),Jn()},F=(A,S,K,Y,$,W,ue,le,ce=!1)=>{const ie=A&&A.children,b=A?A.shapeFlag:0,_=S.children,{patchFlag:B,shapeFlag:V}=S;if(B>0){if(B&128){oe(ie,_,K,Y,$,W,ue,le,ce);return}else if(B&256){Q(ie,_,K,Y,$,W,ue,le,ce);return}}V&8?(b&16&&Se(ie,$,W),_!==ie&&c(K,_)):b&16?V&16?oe(ie,_,K,Y,$,W,ue,le,ce):Se(ie,$,W,!0):(b&8&&c(K,""),V&16&&O(_,K,Y,$,W,ue,le,ce))},Q=(A,S,K,Y,$,W,ue,le,ce)=>{A=A||rs,S=S||rs;const ie=A.length,b=S.length,_=Math.min(ie,b);let B;for(B=0;B<_;B++){const V=S[B]=ce?hi(S[B]):Wn(S[B]);g(A[B],V,K,null,$,W,ue,le,ce)}ie>b?Se(A,$,W,!0,!1,_):O(S,K,Y,$,W,ue,le,ce,_)},oe=(A,S,K,Y,$,W,ue,le,ce)=>{let ie=0;const b=S.length;let _=A.length-1,B=b-1;for(;ie<=_&&ie<=B;){const V=A[ie],ae=S[ie]=ce?hi(S[ie]):Wn(S[ie]);if(ns(V,ae))g(V,ae,K,null,$,W,ue,le,ce);else break;ie++}for(;ie<=_&&ie<=B;){const V=A[_],ae=S[B]=ce?hi(S[B]):Wn(S[B]);if(ns(V,ae))g(V,ae,K,null,$,W,ue,le,ce);else break;_--,B--}if(ie>_){if(ie<=B){const V=B+1,ae=V<b?S[V].el:Y;for(;ie<=B;)g(null,S[ie]=ce?hi(S[ie]):Wn(S[ie]),K,ae,$,W,ue,le,ce),ie++}}else if(ie>B)for(;ie<=_;)ye(A[ie],$,W,!0),ie++;else{const V=ie,ae=ie,re=new Map;for(ie=ae;ie<=B;ie++){const Fe=S[ie]=ce?hi(S[ie]):Wn(S[ie]);Fe.key!=null&&re.set(Fe.key,ie)}let Ee,we=0;const pe=B-ae+1;let xe=!1,Oe=0;const ge=new Array(pe);for(ie=0;ie<pe;ie++)ge[ie]=0;for(ie=V;ie<=_;ie++){const Fe=A[ie];if(we>=pe){ye(Fe,$,W,!0);continue}let Le;if(Fe.key!=null)Le=re.get(Fe.key);else for(Ee=ae;Ee<=B;Ee++)if(ge[Ee-ae]===0&&ns(Fe,S[Ee])){Le=Ee;break}Le===void 0?ye(Fe,$,W,!0):(ge[Le-ae]=ie+1,Le>=Oe?Oe=Le:xe=!0,g(Fe,S[Le],K,null,$,W,ue,le,ce),we++)}const gt=xe?Zm(ge):rs;for(Ee=gt.length-1,ie=pe-1;ie>=0;ie--){const Fe=ae+ie,Le=S[Fe],Pe=S[Fe+1],De=Fe+1<b?Pe.el||Bl(Pe):Y;ge[ie]===0?g(null,Le,K,De,$,W,ue,le,ce):xe&&(Ee<0||ie!==gt[Ee]?fe(Le,K,De,2):Ee--)}}},fe=(A,S,K,Y,$=null)=>{const{el:W,type:ue,transition:le,children:ce,shapeFlag:ie}=A;if(ie&6){fe(A.component.subTree,S,K,Y);return}if(ie&128){A.suspense.move(S,K,Y);return}if(ie&64){ue.move(A,S,K,Re);return}if(ue===Wt){i(W,S,K);for(let _=0;_<ce.length;_++)fe(ce[_],S,K,Y);i(A.anchor,S,K);return}if(ue===Ga){x(A,S,K);return}if(Y!==2&&ie&1&&le)if(Y===0)le.persisted&&!W[bn]?i(W,S,K):(le.beforeEnter(W),i(W,S,K),dn(()=>le.enter(W),$));else{const{leave:_,delayLeave:B,afterLeave:V}=le,ae=()=>{A.ctx.isUnmounted?s(W):i(W,S,K)},re=()=>{const Ee=W._isLeaving||!!W[bn];W._isLeaving&&W[bn](!0),le.persisted&&!Ee?ae():_(W,()=>{ae(),V&&V()})};B?B(W,ae,re):re()}else i(W,S,K)},ye=(A,S,K,Y=!1,$=!1)=>{const{type:W,props:ue,ref:le,children:ce,dynamicChildren:ie,shapeFlag:b,patchFlag:_,dirs:B,cacheIndex:V,memo:ae}=A;if((_===-2||ie&&ie.hasOnce)&&($=!1),le!=null&&(Zn(),Pr(le,null,K,A,!0),Jn()),V!=null&&(!A.ctx||A.ctx===S)&&(S.renderCache[V]=void 0),b&256){S.ctx.deactivate(A);return}const re=b&1&&B,Ee=!Lr(A);let we;if(Ee&&(we=ue&&ue.onVnodeBeforeUnmount)&&Hn(we,S,A),b&6)de(A.component,K,Y);else{if(b&128){A.suspense.unmount(K,Y);return}re&&ki(A,null,S,"beforeUnmount"),b&64?A.type.remove(A,S,K,Re,Y):ie&&!ie.hasOnce&&(W!==Wt||_>0&&_&64)?Se(ie,S,K,!1,!0):(W===Wt&&_&384||!$&&b&16)&&Se(ce,S,K),Y&&ze(A)}const pe=ae!=null&&V==null;(Ee&&(we=ue&&ue.onVnodeUnmounted)||re||pe)&&dn(()=>{we&&Hn(we,S,A),re&&ki(A,null,S,"unmounted"),pe&&(A.el=null)},K)},ze=A=>{const{type:S,el:K,anchor:Y,transition:$}=A,W=S===Wt;if(W&&!$){te(K,Y);return}if(S===Ga){E(A),$&&!$.persisted&&$.afterLeave&&$.afterLeave();return}const ue=W?zr(A):A,le=()=>{W?h(K)&&te(K,Y):s(K),$&&!$.persisted&&$.afterLeave&&$.afterLeave()};if(ue&&ue.shapeFlag&1&&$&&!$.persisted){const{leave:ce,delayLeave:ie}=$,b=ue.el,_=()=>ce(b,le);ie?ie(b,le,_):_()}else le()},te=(A,S)=>{let K;for(;A!==S;)K=d(A),s(A),A=K;s(S)},de=(A,S,K)=>{const{bum:Y,scope:$,job:W,subTree:ue,um:le,m:ce,a:ie}=A;Jc(ce),Jc(ie),Y&&Fo(Y),$.stop(),W?(W.flags|=8,ye(ue,A,S,K)):A.vnode.el&&ue&&(ue.transition=A.vnode.transition,ye(ue,A,S,K)),le&&dn(le,S),dn(()=>{A.isUnmounted=!0},S)},Se=(A,S,K,Y=!1,$=!1,W=0)=>{for(let ue=W;ue<A.length;ue++)ye(A[ue],S,K,Y,$)},Ge=A=>{if(A.shapeFlag&6)return Ge(A.component.subTree);if(A.shapeFlag&128)return A.suspense.next();const S=d(A.anchor||A.el),K=S&&S[hm];return K?d(K):S},Ue=(A,S,K)=>{const Y=A&&S._vnode?void 0:A&&A.component?A.component.uid:sg();om(()=>{A==null?S._vnode&&ye(S._vnode,null,null,!0):g(S._vnode||null,A,S,null,null,null,K),S._vnode=A},Y)},Re={p:g,um:ye,m:fe,r:ze,mt:D,mc:O,pc:F,pbc:y,n:Ge,o:n};return{render:Ue,hydrate:void 0,createApp:Um(Ue)}}function za({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Wi({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function $m(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function cd(n,e,t=!1){const i=n.children,s=e.children;if(Be(i)&&Be(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=hi(s[r]),o.el=a.el),!t&&o.patchFlag!==-2&&cd(a,o)),o.type===xa&&(o.patchFlag===-1&&(o=s[r]=hi(o)),o.el=a.el),o.type===tn&&!o.el&&(o.el=a.el)}}function Zm(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const u=n[i];if(u!==0){if(s=t[t.length-1],n[s]<u){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<u?r=o+1:a=o;u<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function ud(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ud(e)}function Jc(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Bl(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Bl(e.subTree):null}const hd=n=>n.__isSuspense;function Jm(n,e){e&&e.pendingBranch?Be(n)?e.effects.push(...n):e.effects.push(n):rm(n)}const Wt=Symbol.for("v-fgt"),xa=Symbol.for("v-txt"),tn=Symbol.for("v-cmt"),Ga=Symbol.for("v-stc"),as=[];let Mn=null;function zt(n=!1){as.push(Mn=n?null:[])}function fd(){as.pop(),Mn=as[as.length-1]||null}let Gr=1;function Ko(n,e=!1){Gr+=n,n<0&&Mn&&e&&(Mn.hasOnce=!0)}function dd(n){return n.dynamicChildren=Gr>0?Mn||rs:null,fd(),Gr>0&&Mn&&Mn.push(n),n}function jt(n,e,t,i,s,r){return dd(se(n,e,t,i,s,r,!0))}function Qm(n,e,t,i,s){return dd(nn(n,e,t,i,s,!0))}function Hr(n){return n?n.__v_isVNode===!0:!1}function ns(n,e){return n.type===e.type&&n.key===e.key}const pd=({key:n})=>n??null,Go=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Tt(n)||sn(n)||We(n)?{i:An,r:n,k:e,f:!!t}:n:null);function se(n,e=null,t=null,i=0,s=null,r=n===Wt?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&pd(e),ref:e&&Go(e),scopeId:zf,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:An};return o?($o(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Tt(t)?8:16),Gr>0&&!a&&Mn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Mn.push(l),l}const nn=eg;function eg(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===wm)&&(n=tn),Hr(n)){const o=Oi(n,e,!0);return t&&$o(o,t),Gr>0&&!r&&Mn&&(o.shapeFlag&6?Mn[Mn.indexOf(n)]=o:Mn.push(o)),o.patchFlag=-2,o}if(ug(n)&&(n=n.__vccOpts),e){e=tg(e);let{class:o,style:l}=e;o&&!Tt(o)&&(e.class=Zt(o)),at(l)&&(fc(l)&&!Be(l)&&(l=Pt({},l)),e.style=Nr(l))}const a=Tt(n)?1:hd(n)?128:ma(n)?64:at(n)?4:We(n)?2:0;return se(n,e,t,i,s,a,r,!0)}function tg(n){return n?fc(n)||id(n)?Pt({},n):n:null}function Oi(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:a,children:o,transition:l}=n,u=e?ng(s||{},e):s,c={__v_isVNode:!0,__v_skip:!0,type:n.type,props:u,key:u&&pd(u),ref:e&&e.ref?t&&r?Be(r)?r.concat(Go(e)):[r,Go(e)]:Go(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Wt?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Oi(n.ssContent),ssFallback:n.ssFallback&&Oi(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce,cacheIndex:n.cacheIndex};return l&&i&&Zs(c,l.clone(c)),c}function br(n=" ",e=0){return nn(xa,null,n,e)}function ks(n="",e=!1){return e?(zt(),Qm(tn,null,n)):nn(tn,null,n)}function Wn(n){return n==null||typeof n=="boolean"?nn(tn):Be(n)?nn(Wt,null,n.slice()):Hr(n)?hi(n):nn(xa,null,String(n))}function hi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Oi(n)}function $o(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Be(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),$o(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!id(e)?e._ctx=An:s===3&&An&&(An.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(We(e)){if(i&65){$o(n,{default:e});return}e={default:e,_ctx:An},t=32}else e=String(e),i&64?(t=16,e=[br(e)]):t=8;n.children=e,n.shapeFlag|=t}function ng(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Zt([e.class,i.class]));else if(s==="style")e.style=Nr([e.style,i.style]);else if(aa(s)){const r=e[s],a=i[s];a&&r!==a&&!(Be(r)&&r.includes(a))?e[s]=r?[].concat(r,a):a:a==null&&r==null&&!la(s)&&(e[s]=a)}else s!==""&&(e[s]=i[s])}return e}function Hn(n,e,t,i=null){Pn(n,e,7,[t,i])}const ig=Zf();let md=0;function sg(){return md}function rg(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||ig,r={uid:md++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Pp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:rd(i,s),emitsOptions:Jf(i,s),emit:null,emitted:null,propsDefaults:dt,inheritAttrs:i.inheritAttrs,ctx:dt,data:dt,props:dt,attrs:dt,slots:dt,refs:dt,setupState:dt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Om.bind(null,r),n.ce&&n.ce(r),r}let hn=null;const gd=()=>hn||An;let Zo,Vr;{const n=ua(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};Zo=e("__VUE_INSTANCE_SETTERS__",t=>hn=t),Vr=e("__VUE_SSR_SETTERS__",t=>kr=t)}const Kr=n=>{const e=hn;return Zo(n),n.scope.on(),()=>{n.scope.off(),Zo(e)}},Qc=()=>{hn&&hn.scope.off(),Zo(null)};function vd(n){return n.vnode.shapeFlag&4}let kr=!1;function og(n,e=!1,t=!1){e&&Vr(e);const{props:i,children:s}=n.vnode,r=vd(n);Vm(n,i,r,e),qm(n,s,t||e);const a=r?ag(n,e):void 0;return e&&Vr(!1),a}function ag(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Am);const{setup:i}=t;if(i){Zn();const s=n.setupContext=i.length>1?cg(n):null,r=Kr(n),a=jr(i,n,0,[n.props,s]),o=cf(a);if(Jn(),r(),(o||n.sp)&&!Lr(n)&&qf(n),o){if(a.then(Qc,Qc),e)return a.then(l=>{Vr(!0);try{eu(n,l,e)}finally{Vr(!1)}}).catch(l=>{pa(l,n,0)});n.asyncDep=a}else eu(n,a)}else _d(n)}function eu(n,e,t){We(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:at(e)&&(n.setupState=If(e)),_d(n)}function _d(n,e,t){const i=n.type;n.render||(n.render=i.render||Kn);{const s=Kr(n);Zn();try{Rm(n)}finally{Jn(),s()}}}const lg={get(n,e){return Jt(n,"get",""),n[e]}};function cg(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,lg),slots:n.slots,emit:n.emit,expose:e}}function ya(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(If(Kp(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Ir)return Ir[t](n)},has(e,t){return t in e||t in Ir}})):n.proxy}function ug(n){return We(n)&&"__vccOpts"in n}const _c=(n,e)=>em(n,e,kr);function hg(n,e,t){try{Ko(-1);const i=arguments.length;return i===2?at(e)&&!Be(e)?Hr(e)?nn(n,null,[e]):nn(n,e):nn(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Hr(t)&&(t=[t]),nn(n,e,t))}finally{Ko(1)}}const fg="3.5.44";/**
* @vue/runtime-dom v3.5.44
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let zl;const tu=typeof window<"u"&&window.trustedTypes;if(tu)try{zl=tu.createPolicy("vue",{createHTML:n=>n})}catch{}const xd=zl?n=>zl.createHTML(n):n=>n,dg="http://www.w3.org/2000/svg",pg="http://www.w3.org/1998/Math/MathML",ui=typeof document<"u"?document:null,nu=ui&&ui.createElement("template"),mg={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?ui.createElementNS(dg,n):e==="mathml"?ui.createElementNS(pg,n):t?ui.createElement(n,{is:t}):ui.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ui.createTextNode(n),createComment:n=>ui.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ui.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{nu.innerHTML=xd(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=nu.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},yi="transition",cr="animation",Wr=Symbol("_vtc"),yd={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},gg=Pt({},Vf,yd),vg=n=>(n.displayName="Transition",n.props=gg,n),Ha=vg((n,{slots:e})=>hg(pm,_g(n),e)),Xi=(n,e=[])=>{Be(n)?n.forEach(t=>t(...e)):n&&n(...e)},iu=n=>n?Be(n)?n.some(e=>e.length>1):n.length>1:!1;function _g(n){const e={};for(const L in n)L in yd||(e[L]=n[L]);if(n.css===!1)return e;const{name:t="v",type:i,duration:s,enterFromClass:r=`${t}-enter-from`,enterActiveClass:a=`${t}-enter-active`,enterToClass:o=`${t}-enter-to`,appearFromClass:l=r,appearActiveClass:u=a,appearToClass:c=o,leaveFromClass:h=`${t}-leave-from`,leaveActiveClass:d=`${t}-leave-active`,leaveToClass:m=`${t}-leave-to`}=n,v=xg(s),g=v&&v[0],p=v&&v[1],{onBeforeEnter:f,onEnter:M,onEnterCancelled:x,onLeave:E,onLeaveCancelled:U,onBeforeAppear:P=f,onAppear:R=M,onAppearCancelled:O=x}=e,k=(L,z,D,q)=>{L._enterCancelled=q,qi(L,z?c:o),qi(L,z?u:a),D&&D()},y=(L,z)=>{L._isLeaving=!1,qi(L,h),qi(L,m),qi(L,d),z&&z()},T=L=>(z,D)=>{const q=L?R:M,G=()=>k(z,L,D);Xi(q,[z,G]),su(()=>{qi(z,L?l:r),ii(z,L?c:o),iu(q)||ru(z,i,g,G)})};return Pt(e,{onBeforeEnter(L){Xi(f,[L]),ii(L,r),ii(L,a)},onBeforeAppear(L){Xi(P,[L]),ii(L,l),ii(L,u)},onEnter:T(!1),onAppear:T(!0),onLeave(L,z){L._isLeaving=!0;const D=()=>y(L,z);ii(L,h),L._enterCancelled?(ii(L,d),lu(L)):(lu(L),ii(L,d)),su(()=>{L._isLeaving&&(qi(L,h),ii(L,m),iu(E)||ru(L,i,p,D))}),Xi(E,[L,D])},onEnterCancelled(L){k(L,!1,void 0,!0),Xi(x,[L])},onAppearCancelled(L){k(L,!0,void 0,!0),Xi(O,[L])},onLeaveCancelled(L){y(L),Xi(U,[L])}})}function xg(n){if(n==null)return null;if(at(n))return[Va(n.enter),Va(n.leave)];{const e=Va(n);return[e,e]}}function Va(n){return Mp(n)}function ii(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[Wr]||(n[Wr]=new Set)).add(e)}function qi(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[Wr];t&&(t.delete(e),t.size||(n[Wr]=void 0))}function su(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let yg=0;function ru(n,e,t,i){const s=n._endId=++yg,r=()=>{s===n._endId&&i()};if(t!=null)return setTimeout(r,t);const{type:a,timeout:o,propCount:l}=Mg(n,e);if(!a)return i();const u=a+"end";let c=0;const h=()=>{n.removeEventListener(u,d),r()},d=m=>{m.target===n&&++c>=l&&h()};setTimeout(()=>{c<l&&h()},o+1),n.addEventListener(u,d)}function Mg(n,e){const t=window.getComputedStyle(n),i=v=>(t[v]||"").split(", "),s=i(`${yi}Delay`),r=i(`${yi}Duration`),a=ou(s,r),o=i(`${cr}Delay`),l=i(`${cr}Duration`),u=ou(o,l);let c=null,h=0,d=0;e===yi?a>0&&(c=yi,h=a,d=r.length):e===cr?u>0&&(c=cr,h=u,d=l.length):(h=Math.max(a,u),c=h>0?a>u?yi:cr:null,d=c?c===yi?r.length:l.length:0);const m=c===yi&&/\b(?:transform|all)(?:,|$)/.test(i(`${yi}Property`).toString());return{type:c,timeout:h,propCount:d,hasTransform:m}}function ou(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>au(t)+au(n[i])))}function au(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function lu(n){return(n?n.ownerDocument:document).body.offsetHeight}function Sg(n,e,t){const i=n[Wr];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Jo=Symbol("_vod"),Md=Symbol("_vsh"),Eg={name:"show",beforeMount(n,{value:e},{transition:t}){n[Jo]=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):ur(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:i}){!e!=!t&&(i?e?(i.beforeEnter(n),ur(n,!0),i.enter(n)):i.leave(n,()=>{ur(n,!1)}):ur(n,e))},beforeUnmount(n,{value:e}){ur(n,e)}};function ur(n,e){n.style.display=e?n[Jo]:"none",n[Md]=!e}const Tg=Symbol(""),bg=/(?:^|;)\s*display\s*:/;function wg(n,e,t){const i=n.style,s=Tt(t);let r=!1;if(t&&!s){if(e)if(Tt(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&wr(i,o,"")}else for(const a in e)t[a]==null&&wr(i,a,"");for(const a in t){a==="display"&&(r=!0);const o=t[a];o!=null?Rg(n,a,!Tt(e)&&e?e[a]:void 0,o)||wr(i,a,o):wr(i,a,"")}}else if(s){if(e!==t){const a=i[Tg];a&&(t+=";"+a),i.cssText=t,r=bg.test(t)}}else e&&n.removeAttribute("style");Jo in n&&((!s||e!==t)&&(n[Jo]=r?i.display:""),n[Md]&&(i.display="none"))}const io=/\s*!important$/;function wr(n,e,t){if(Be(t))t.forEach(i=>wr(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))io.test(t)?n.setProperty(e,t.replace(io,""),"important"):n.setProperty(e,t);else{const i=Ag(n,e);io.test(t)?n.setProperty(hs(i),t.replace(io,""),"important"):n[i]=t}}const cu=["Webkit","Moz","ms"],ka={};function Ag(n,e){const t=ka[e];if(t)return t;let i=Bn(e);if(i!=="filter"&&i in n)return ka[e]=i;i=ff(i);for(let s=0;s<cu.length;s++){const r=cu[s]+i;if(r in n)return ka[e]=r}return e}function Rg(n,e,t,i){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Tt(i)&&t===i}const uu="http://www.w3.org/1999/xlink";function hu(n,e,t,i,s,r=Ap(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(uu,e.slice(6,e.length)):n.setAttributeNS(uu,e,t):t==null||r&&!pf(t)?n.removeAttribute(e):n.setAttribute(e,r?"":$n(t)?String(t):t)}function fu(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?xd(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const o=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=pf(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function Ws(n,e,t,i){n.addEventListener(e,t,i)}function Cg(n,e,t,i){n.removeEventListener(e,t,i)}const du=Symbol("_vei");function Pg(n,e,t,i,s=null){const r=n[du]||(n[du]={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=Dg(e);if(i){const u=r[e]=Og(i,s);Ws(n,o,u,l)}else a&&(Cg(n,o,a,l),r[e]=void 0)}}const Lg=/(Once|Passive|Capture)$/,Ig=/^on:?(?:Once|Passive|Capture)$/;function Dg(n){let e,t;for(;(t=n.match(Lg))&&!Ig.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):hs(n.slice(2)),e]}let Wa=0;const Ug=Promise.resolve(),Ng=()=>Wa||(Ug.then(()=>Wa=0),Wa=Date.now());function Og(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;const s=t.value;if(Be(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const a=s.slice(),o=[i];for(let l=0;l<a.length&&!i._stopped;l++){const u=a[l];u&&Pn(u,e,5,o)}}else Pn(s,e,5,[i])};return t.value=n,t.attached=Ng(),t}const pu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Fg=(n,e,t,i,s,r)=>{const a=s==="svg";e==="class"?Sg(n,i,a):e==="style"?wg(n,t,i):aa(e)?la(e)||Pg(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Bg(n,e,i,a))?(fu(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&hu(n,e,i,a,r,e!=="value")):n._isVueCE&&(zg(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!Tt(i)))?fu(n,Bn(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),hu(n,e,i,a))};function Bg(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&pu(e)&&We(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return pu(e)&&Tt(t)?!1:e in n}function zg(n,e){const t=n._def.props;if(!t)return!1;const i=Bn(e);return Array.isArray(t)?t.some(s=>Bn(s)===i):Object.keys(t).some(s=>Bn(s)===i)}const mu=n=>{const e=n.props["onUpdate:modelValue"]||!1;return Be(e)?t=>Fo(e,t):e};function Gg(n){n.target.composing=!0}function gu(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const so=Symbol("_assign"),ro=Symbol("_initialValue");function Xa(n,e,t){return e&&(n=n.trim()),t&&(n=rc(n)),n}const vu={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n.parentNode&&(n.type==="text"?n[ro]=n.defaultValue.replace(/[\r\n]/g,""):n.type==="textarea"&&(n[ro]=n.defaultValue.replace(/\r\n?/g,`
`))),n[so]=mu(s);const r=i||s.props&&s.props.type==="number";Ws(n,e?"change":"input",a=>{a.target.composing||n[so](Xa(n.value,t,r))}),(t||r)&&Ws(n,"change",()=>{n.value=Xa(n.value,t,r)}),e||(Ws(n,"compositionstart",Gg),Ws(n,"compositionend",gu),Ws(n,"change",gu))},mounted(n,{value:e,modifiers:{trim:t,number:i}}){const s=e??"",r=n[ro];delete n[ro],r!==void 0&&(n.type==="text"||n.type==="textarea")&&n.value!==r?n[so](Xa(n.value,t,i)):n.value=s},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},a){if(n[so]=mu(a),n.composing)return;const o=(r||n.type==="number")&&!/^0\d/.test(n.value)?rc(n.value):n.value,l=e??"";if(o===l)return;const u=n.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l)}},Hg=["ctrl","shift","alt","meta"],Vg={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>Hg.some(t=>n[`${t}Key`]&&!e.includes(t))},kg=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),i=e.join(".");return t[i]||(t[i]=(s,...r)=>{for(let a=0;a<e.length;a++){const o=Vg[e[a]];if(o&&o(s,e))return}return n(s,...r)})},Wg=Pt({patchProp:Fg},mg);let _u;function Xg(){return _u||(_u=jm(Wg))}const qg=(...n)=>{const e=Xg().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=jg(i);if(!s)return;const r=e._component;!We(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,Yg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function Yg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function jg(n){return Tt(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xc="162",vs={ROTATE:0,DOLLY:1,PAN:2},_s={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kg=0,xu=1,$g=2,Sd=1,Zg=2,ci=3,Fi=0,Ft=1,en=2,mi=0,js=1,cn=2,yu=3,Mu=4,Jg=5,is=100,Qg=101,e0=102,Su=103,Eu=104,t0=200,n0=201,i0=202,s0=203,Gl=204,Hl=205,r0=206,o0=207,a0=208,l0=209,c0=210,u0=211,h0=212,f0=213,d0=214,p0=0,m0=1,g0=2,Qo=3,v0=4,_0=5,x0=6,y0=7,Ed=0,M0=1,S0=2,Di=0,E0=1,T0=2,b0=3,Td=4,w0=5,A0=6,R0=7,bd=300,Js=301,Qs=302,Vl=303,kl=304,Ma=306,Ks=1e3,wn=1001,Wl=1002,kt=1003,Tu=1004,hr=1005,Vt=1006,qa=1007,jn=1008,Ui=1009,C0=1010,P0=1011,yc=1012,wd=1013,Pi=1014,Yn=1015,gi=1016,Ad=1017,Rd=1018,ls=1020,L0=1021,Nn=1023,I0=1024,D0=1025,cs=1026,er=1027,Cd=1028,Pd=1029,U0=1030,Ld=1031,Id=1033,Ya=33776,ja=33777,Ka=33778,$a=33779,bu=35840,wu=35841,Au=35842,Ru=35843,Dd=36196,Cu=37492,Pu=37496,Lu=37808,Iu=37809,Du=37810,Uu=37811,Nu=37812,Ou=37813,Fu=37814,Bu=37815,zu=37816,Gu=37817,Hu=37818,Vu=37819,ku=37820,Wu=37821,Za=36492,Xu=36494,qu=36495,N0=36283,Yu=36284,ju=36285,Ku=36286,O0=3200,F0=3201,Ud=0,B0=1,Ci="",xn="srgb",Bi="srgb-linear",Mc="display-p3",Sa="display-p3-linear",ea="linear",_t="srgb",ta="rec709",na="p3",xs=7680,$u=519,z0=512,G0=513,H0=514,Nd=515,V0=516,k0=517,W0=518,X0=519,Xl=35044,Zu="300 es",ql=1035,pi=2e3,ia=2001;class fs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ju=1234567;const Dr=Math.PI/180,Xr=180/Math.PI;function vi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Qt(n,e,t){return Math.max(e,Math.min(t,n))}function Sc(n,e){return(n%e+e)%e}function q0(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Y0(n,e,t){return n!==e?(t-n)/(e-n):0}function Ur(n,e,t){return(1-t)*n+t*e}function j0(n,e,t,i){return Ur(n,e,1-Math.exp(-t*i))}function K0(n,e=1){return e-Math.abs(Sc(n,e*2)-e)}function $0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Z0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function J0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Q0(n,e){return n+Math.random()*(e-n)}function ev(n){return n*(.5-Math.random())}function tv(n){n!==void 0&&(Ju=n);let e=Ju+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nv(n){return n*Dr}function iv(n){return n*Xr}function Yl(n){return(n&n-1)===0&&n!==0}function sv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function sa(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function rv(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),u=r((e+i)/2),c=a((e+i)/2),h=r((e-i)/2),d=a((e-i)/2),m=r((i-e)/2),v=a((i-e)/2);switch(s){case"XYX":n.set(o*c,l*h,l*d,o*u);break;case"YZY":n.set(l*d,o*c,l*h,o*u);break;case"ZXZ":n.set(l*h,l*d,o*c,o*u);break;case"XZX":n.set(o*c,l*v,l*m,o*u);break;case"YXY":n.set(l*m,o*c,l*v,o*u);break;case"ZYZ":n.set(l*v,l*m,o*c,o*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function On(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ct(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const jl={DEG2RAD:Dr,RAD2DEG:Xr,generateUUID:vi,clamp:Qt,euclideanModulo:Sc,mapLinear:q0,inverseLerp:Y0,lerp:Ur,damp:j0,pingpong:K0,smoothstep:$0,smootherstep:Z0,randInt:J0,randFloat:Q0,randFloatSpread:ev,seededRandom:tv,degToRad:nv,radToDeg:iv,isPowerOfTwo:Yl,ceilPowerOfTwo:sv,floorPowerOfTwo:sa,setQuaternionFromProperEuler:rv,normalize:ct,denormalize:On};class Ae{constructor(e=0,t=0){Ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,i,s,r,a,o,l,u){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,u)}set(e,t,i,s,r,a,o,l,u){const c=this.elements;return c[0]=e,c[1]=s,c[2]=o,c[3]=t,c[4]=r,c[5]=l,c[6]=i,c[7]=a,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],u=i[1],c=i[4],h=i[7],d=i[2],m=i[5],v=i[8],g=s[0],p=s[3],f=s[6],M=s[1],x=s[4],E=s[7],U=s[2],P=s[5],R=s[8];return r[0]=a*g+o*M+l*U,r[3]=a*p+o*x+l*P,r[6]=a*f+o*E+l*R,r[1]=u*g+c*M+h*U,r[4]=u*p+c*x+h*P,r[7]=u*f+c*E+h*R,r[2]=d*g+m*M+v*U,r[5]=d*p+m*x+v*P,r[8]=d*f+m*E+v*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8];return t*a*c-t*o*u-i*r*c+i*o*l+s*r*u-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8],h=c*a-o*u,d=o*l-c*r,m=u*r-a*l,v=t*h+i*d+s*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return e[0]=h*g,e[1]=(s*u-c*i)*g,e[2]=(o*i-s*a)*g,e[3]=d*g,e[4]=(c*t-s*l)*g,e[5]=(s*r-o*t)*g,e[6]=m*g,e[7]=(i*l-u*t)*g,e[8]=(a*t-i*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),u=Math.sin(r);return this.set(i*l,i*u,-i*(l*a+u*o)+a+e,-s*u,s*l,-s*(-u*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ja.makeScale(e,t)),this}rotate(e){return this.premultiply(Ja.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ja.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ja=new Ze;function Od(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function qr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ov(){const n=qr("canvas");return n.style.display="block",n}const Qu={};function Fd(n){n in Qu||(Qu[n]=!0,console.warn(n))}const eh=new Ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),th=new Ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),oo={[Bi]:{transfer:ea,primaries:ta,toReference:n=>n,fromReference:n=>n},[xn]:{transfer:_t,primaries:ta,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Sa]:{transfer:ea,primaries:na,toReference:n=>n.applyMatrix3(th),fromReference:n=>n.applyMatrix3(eh)},[Mc]:{transfer:_t,primaries:na,toReference:n=>n.convertSRGBToLinear().applyMatrix3(th),fromReference:n=>n.applyMatrix3(eh).convertLinearToSRGB()}},av=new Set([Bi,Sa]),ut={enabled:!0,_workingColorSpace:Bi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!av.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=oo[e].toReference,s=oo[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return oo[n].primaries},getTransfer:function(n){return n===Ci?ea:oo[n].transfer}};function $s(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ys;class Bd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ys===void 0&&(ys=qr("canvas")),ys.width=e.width,ys.height=e.height;const i=ys.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ys}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=$s(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor($s(t[i]/255)*255):t[i]=$s(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lv=0;class zd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lv++}),this.uuid=vi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(el(s[a].image)):r.push(el(s[a]))}else r=el(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function el(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Bd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let cv=0;class Xt extends fs{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,i=wn,s=wn,r=Vt,a=jn,o=Nn,l=Ui,u=Xt.DEFAULT_ANISOTROPY,c=Ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cv++}),this.uuid=vi(),this.name="",this.source=new zd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ks:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case Wl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ks:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case Wl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=bd;Xt.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,s=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,u=l[0],c=l[4],h=l[8],d=l[1],m=l[5],v=l[9],g=l[2],p=l[6],f=l[10];if(Math.abs(c-d)<.01&&Math.abs(h-g)<.01&&Math.abs(v-p)<.01){if(Math.abs(c+d)<.1&&Math.abs(h+g)<.1&&Math.abs(v+p)<.1&&Math.abs(u+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(u+1)/2,E=(m+1)/2,U=(f+1)/2,P=(c+d)/4,R=(h+g)/4,O=(v+p)/4;return x>E&&x>U?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=P/i,r=R/i):E>U?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=P/s,r=O/s):U<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(U),i=R/r,s=O/r),this.set(i,s,r,t),this}let M=Math.sqrt((p-v)*(p-v)+(h-g)*(h-g)+(d-c)*(d-c));return Math.abs(M)<.001&&(M=1),this.x=(p-v)/M,this.y=(h-g)/M,this.z=(d-c)/M,this.w=Math.acos((u+m+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class uv extends fs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},i);const r=new Xt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new zd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends uv{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gd extends Xt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hv extends Xt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _i{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],u=i[s+1],c=i[s+2],h=i[s+3];const d=r[a+0],m=r[a+1],v=r[a+2],g=r[a+3];if(o===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=v,e[t+3]=g;return}if(h!==g||l!==d||u!==m||c!==v){let p=1-o;const f=l*d+u*m+c*v+h*g,M=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const U=Math.sqrt(x),P=Math.atan2(U,f*M);p=Math.sin(p*P)/U,o=Math.sin(o*P)/U}const E=o*M;if(l=l*p+d*E,u=u*p+m*E,c=c*p+v*E,h=h*p+g*E,p===1-o){const U=1/Math.sqrt(l*l+u*u+c*c+h*h);l*=U,u*=U,c*=U,h*=U}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],u=i[s+2],c=i[s+3],h=r[a],d=r[a+1],m=r[a+2],v=r[a+3];return e[t]=o*v+c*h+l*m-u*d,e[t+1]=l*v+c*d+u*h-o*m,e[t+2]=u*v+c*m+o*d-l*h,e[t+3]=c*v-o*h-l*d-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,u=o(i/2),c=o(s/2),h=o(r/2),d=l(i/2),m=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=d*c*h+u*m*v,this._y=u*m*h-d*c*v,this._z=u*c*v+d*m*h,this._w=u*c*h-d*m*v;break;case"YXZ":this._x=d*c*h+u*m*v,this._y=u*m*h-d*c*v,this._z=u*c*v-d*m*h,this._w=u*c*h+d*m*v;break;case"ZXY":this._x=d*c*h-u*m*v,this._y=u*m*h+d*c*v,this._z=u*c*v+d*m*h,this._w=u*c*h-d*m*v;break;case"ZYX":this._x=d*c*h-u*m*v,this._y=u*m*h+d*c*v,this._z=u*c*v-d*m*h,this._w=u*c*h+d*m*v;break;case"YZX":this._x=d*c*h+u*m*v,this._y=u*m*h+d*c*v,this._z=u*c*v-d*m*h,this._w=u*c*h-d*m*v;break;case"XZY":this._x=d*c*h-u*m*v,this._y=u*m*h-d*c*v,this._z=u*c*v+d*m*h,this._w=u*c*h+d*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],u=t[2],c=t[6],h=t[10],d=i+o+h;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(c-l)*m,this._y=(r-u)*m,this._z=(a-s)*m}else if(i>o&&i>h){const m=2*Math.sqrt(1+i-o-h);this._w=(c-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+u)/m}else if(o>h){const m=2*Math.sqrt(1+o-i-h);this._w=(r-u)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+c)/m}else{const m=2*Math.sqrt(1+h-i-o);this._w=(a-s)/m,this._x=(r+u)/m,this._y=(l+c)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,u=t._z,c=t._w;return this._x=i*c+a*o+s*u-r*l,this._y=s*c+a*l+r*o-i*u,this._z=r*c+a*u+i*l-s*o,this._w=a*c-i*o-s*l-r*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,o),h=Math.sin((1-t)*c)/u,d=Math.sin(t*c)/u;return this._w=a*h+this._w*d,this._x=i*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,i=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,u=2*(a*s-o*i),c=2*(o*t-r*s),h=2*(r*i-a*t);return this.x=t+l*u+a*h-o*c,this.y=i+l*c+o*u-r*h,this.z=s+l*h+r*c-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return tl.copy(this).projectOnVector(e),this.sub(tl)}reflect(e){return this.sub(tl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const tl=new C,nh=new _i;class ds{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ln):Ln.fromBufferAttribute(r,a),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ao.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ao.copy(i.boundingBox)),ao.applyMatrix4(e.matrixWorld),this.union(ao)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fr),lo.subVectors(this.max,fr),Ms.subVectors(e.a,fr),Ss.subVectors(e.b,fr),Es.subVectors(e.c,fr),Mi.subVectors(Ss,Ms),Si.subVectors(Es,Ss),Yi.subVectors(Ms,Es);let t=[0,-Mi.z,Mi.y,0,-Si.z,Si.y,0,-Yi.z,Yi.y,Mi.z,0,-Mi.x,Si.z,0,-Si.x,Yi.z,0,-Yi.x,-Mi.y,Mi.x,0,-Si.y,Si.x,0,-Yi.y,Yi.x,0];return!nl(t,Ms,Ss,Es,lo)||(t=[1,0,0,0,1,0,0,0,1],!nl(t,Ms,Ss,Es,lo))?!1:(co.crossVectors(Mi,Si),t=[co.x,co.y,co.z],nl(t,Ms,Ss,Es,lo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const si=[new C,new C,new C,new C,new C,new C,new C,new C],Ln=new C,ao=new ds,Ms=new C,Ss=new C,Es=new C,Mi=new C,Si=new C,Yi=new C,fr=new C,lo=new C,co=new C,ji=new C;function nl(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ji.fromArray(n,r);const o=s.x*Math.abs(ji.x)+s.y*Math.abs(ji.y)+s.z*Math.abs(ji.z),l=e.dot(ji),u=t.dot(ji),c=i.dot(ji);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>o)return!1}return!0}const fv=new ds,dr=new C,il=new C;class ps{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):fv.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;dr.subVectors(e,this.center);const t=dr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(dr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(il.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(dr.copy(e.center).add(il)),this.expandByPoint(dr.copy(e.center).sub(il))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ri=new C,sl=new C,uo=new C,Ei=new C,rl=new C,ho=new C,ol=new C;class Ea{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,t),ri.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){sl.copy(e).add(t).multiplyScalar(.5),uo.copy(t).sub(e).normalize(),Ei.copy(this.origin).sub(sl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(uo),o=Ei.dot(this.direction),l=-Ei.dot(uo),u=Ei.lengthSq(),c=Math.abs(1-a*a);let h,d,m,v;if(c>0)if(h=a*l-o,d=a*o-l,v=r*c,h>=0)if(d>=-v)if(d<=v){const g=1/c;h*=g,d*=g,m=h*(h+a*d+2*o)+d*(a*h+d+2*l)+u}else d=r,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*l)+u;else d=-r,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*l)+u;else d<=-v?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),m=-h*h+d*(d+2*l)+u):d<=v?(h=0,d=Math.min(Math.max(-r,-l),r),m=d*(d+2*l)+u):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),m=-h*h+d*(d+2*l)+u);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(sl).addScaledVector(uo,d),m}intersectSphere(e,t){ri.subVectors(e.center,this.origin);const i=ri.dot(this.direction),s=ri.dot(ri)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const u=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,d=this.origin;return u>=0?(i=(e.min.x-d.x)*u,s=(e.max.x-d.x)*u):(i=(e.max.x-d.x)*u,s=(e.min.x-d.x)*u),c>=0?(r=(e.min.y-d.y)*c,a=(e.max.y-d.y)*c):(r=(e.max.y-d.y)*c,a=(e.min.y-d.y)*c),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,t,i,s,r){rl.subVectors(t,e),ho.subVectors(i,e),ol.crossVectors(rl,ho);let a=this.direction.dot(ol),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ei.subVectors(this.origin,e);const l=o*this.direction.dot(ho.crossVectors(Ei,ho));if(l<0)return null;const u=o*this.direction.dot(rl.cross(Ei));if(u<0||l+u>a)return null;const c=-o*Ei.dot(ol);return c<0?null:this.at(c/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,t,i,s,r,a,o,l,u,c,h,d,m,v,g,p){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,u,c,h,d,m,v,g,p)}set(e,t,i,s,r,a,o,l,u,c,h,d,m,v,g,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=u,f[6]=c,f[10]=h,f[14]=d,f[3]=m,f[7]=v,f[11]=g,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ts.setFromMatrixColumn(e,0).length(),r=1/Ts.setFromMatrixColumn(e,1).length(),a=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),u=Math.sin(s),c=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*c,m=a*h,v=o*c,g=o*h;t[0]=l*c,t[4]=-l*h,t[8]=u,t[1]=m+v*u,t[5]=d-g*u,t[9]=-o*l,t[2]=g-d*u,t[6]=v+m*u,t[10]=a*l}else if(e.order==="YXZ"){const d=l*c,m=l*h,v=u*c,g=u*h;t[0]=d+g*o,t[4]=v*o-m,t[8]=a*u,t[1]=a*h,t[5]=a*c,t[9]=-o,t[2]=m*o-v,t[6]=g+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*c,m=l*h,v=u*c,g=u*h;t[0]=d-g*o,t[4]=-a*h,t[8]=v+m*o,t[1]=m+v*o,t[5]=a*c,t[9]=g-d*o,t[2]=-a*u,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*c,m=a*h,v=o*c,g=o*h;t[0]=l*c,t[4]=v*u-m,t[8]=d*u+g,t[1]=l*h,t[5]=g*u+d,t[9]=m*u-v,t[2]=-u,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,m=a*u,v=o*l,g=o*u;t[0]=l*c,t[4]=g-d*h,t[8]=v*h+m,t[1]=h,t[5]=a*c,t[9]=-o*c,t[2]=-u*c,t[6]=m*h+v,t[10]=d-g*h}else if(e.order==="XZY"){const d=a*l,m=a*u,v=o*l,g=o*u;t[0]=l*c,t[4]=-h,t[8]=u*c,t[1]=d*h+g,t[5]=a*c,t[9]=m*h-v,t[2]=v*h-m,t[6]=o*c,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dv,e,pv)}lookAt(e,t,i){const s=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),Ti.crossVectors(i,gn),Ti.lengthSq()===0&&(Math.abs(i.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),Ti.crossVectors(i,gn)),Ti.normalize(),fo.crossVectors(gn,Ti),s[0]=Ti.x,s[4]=fo.x,s[8]=gn.x,s[1]=Ti.y,s[5]=fo.y,s[9]=gn.y,s[2]=Ti.z,s[6]=fo.z,s[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],u=i[12],c=i[1],h=i[5],d=i[9],m=i[13],v=i[2],g=i[6],p=i[10],f=i[14],M=i[3],x=i[7],E=i[11],U=i[15],P=s[0],R=s[4],O=s[8],k=s[12],y=s[1],T=s[5],L=s[9],z=s[13],D=s[2],q=s[6],G=s[10],J=s[14],F=s[3],Q=s[7],oe=s[11],fe=s[15];return r[0]=a*P+o*y+l*D+u*F,r[4]=a*R+o*T+l*q+u*Q,r[8]=a*O+o*L+l*G+u*oe,r[12]=a*k+o*z+l*J+u*fe,r[1]=c*P+h*y+d*D+m*F,r[5]=c*R+h*T+d*q+m*Q,r[9]=c*O+h*L+d*G+m*oe,r[13]=c*k+h*z+d*J+m*fe,r[2]=v*P+g*y+p*D+f*F,r[6]=v*R+g*T+p*q+f*Q,r[10]=v*O+g*L+p*G+f*oe,r[14]=v*k+g*z+p*J+f*fe,r[3]=M*P+x*y+E*D+U*F,r[7]=M*R+x*T+E*q+U*Q,r[11]=M*O+x*L+E*G+U*oe,r[15]=M*k+x*z+E*J+U*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],u=e[13],c=e[2],h=e[6],d=e[10],m=e[14],v=e[3],g=e[7],p=e[11],f=e[15];return v*(+r*l*h-s*u*h-r*o*d+i*u*d+s*o*m-i*l*m)+g*(+t*l*m-t*u*d+r*a*d-s*a*m+s*u*c-r*l*c)+p*(+t*u*h-t*o*m-r*a*h+i*a*m+r*o*c-i*u*c)+f*(-s*o*c-t*l*h+t*o*d+s*a*h-i*a*d+i*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8],h=e[9],d=e[10],m=e[11],v=e[12],g=e[13],p=e[14],f=e[15],M=h*p*u-g*d*u+g*l*m-o*p*m-h*l*f+o*d*f,x=v*d*u-c*p*u-v*l*m+a*p*m+c*l*f-a*d*f,E=c*g*u-v*h*u+v*o*m-a*g*m-c*o*f+a*h*f,U=v*h*l-c*g*l-v*o*d+a*g*d+c*o*p-a*h*p,P=t*M+i*x+s*E+r*U;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/P;return e[0]=M*R,e[1]=(g*d*r-h*p*r-g*s*m+i*p*m+h*s*f-i*d*f)*R,e[2]=(o*p*r-g*l*r+g*s*u-i*p*u-o*s*f+i*l*f)*R,e[3]=(h*l*r-o*d*r-h*s*u+i*d*u+o*s*m-i*l*m)*R,e[4]=x*R,e[5]=(c*p*r-v*d*r+v*s*m-t*p*m-c*s*f+t*d*f)*R,e[6]=(v*l*r-a*p*r-v*s*u+t*p*u+a*s*f-t*l*f)*R,e[7]=(a*d*r-c*l*r+c*s*u-t*d*u-a*s*m+t*l*m)*R,e[8]=E*R,e[9]=(v*h*r-c*g*r-v*i*m+t*g*m+c*i*f-t*h*f)*R,e[10]=(a*g*r-v*o*r+v*i*u-t*g*u-a*i*f+t*o*f)*R,e[11]=(c*o*r-a*h*r-c*i*u+t*h*u+a*i*m-t*o*m)*R,e[12]=U*R,e[13]=(c*g*s-v*h*s+v*i*d-t*g*d-c*i*p+t*h*p)*R,e[14]=(v*o*s-a*g*s-v*i*l+t*g*l+a*i*p-t*o*p)*R,e[15]=(a*h*s-c*o*s+c*i*l-t*h*l-a*i*d+t*o*d)*R,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,u=r*a,c=r*o;return this.set(u*a+i,u*o-s*l,u*l+s*o,0,u*o+s*l,c*o+i,c*l-s*a,0,u*l-s*o,c*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,u=r+r,c=a+a,h=o+o,d=r*u,m=r*c,v=r*h,g=a*c,p=a*h,f=o*h,M=l*u,x=l*c,E=l*h,U=i.x,P=i.y,R=i.z;return s[0]=(1-(g+f))*U,s[1]=(m+E)*U,s[2]=(v-x)*U,s[3]=0,s[4]=(m-E)*P,s[5]=(1-(d+f))*P,s[6]=(p+M)*P,s[7]=0,s[8]=(v+x)*R,s[9]=(p-M)*R,s[10]=(1-(d+g))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Ts.set(s[0],s[1],s[2]).length();const a=Ts.set(s[4],s[5],s[6]).length(),o=Ts.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],In.copy(this);const u=1/r,c=1/a,h=1/o;return In.elements[0]*=u,In.elements[1]*=u,In.elements[2]*=u,In.elements[4]*=c,In.elements[5]*=c,In.elements[6]*=c,In.elements[8]*=h,In.elements[9]*=h,In.elements[10]*=h,t.setFromRotationMatrix(In),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=pi){const l=this.elements,u=2*r/(t-e),c=2*r/(i-s),h=(t+e)/(t-e),d=(i+s)/(i-s);let m,v;if(o===pi)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===ia)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=pi){const l=this.elements,u=1/(t-e),c=1/(i-s),h=1/(a-r),d=(t+e)*u,m=(i+s)*c;let v,g;if(o===pi)v=(a+r)*h,g=-2*h;else if(o===ia)v=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=g,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ts=new C,In=new ht,dv=new C(0,0,0),pv=new C(1,1,1),Ti=new C,fo=new C,gn=new C,ih=new ht,sh=new _i;class ei{constructor(e=0,t=0,i=0,s=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],u=s[5],c=s[9],h=s[2],d=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ih.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ih,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sh.setFromEuler(this),this.setFromQuaternion(sh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Hd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mv=0;const rh=new C,bs=new _i,oi=new ht,po=new C,pr=new C,gv=new C,vv=new _i,oh=new C(1,0,0),ah=new C(0,1,0),lh=new C(0,0,1),_v={type:"added"},xv={type:"removed"},al={type:"childadded",child:null},ll={type:"childremoved",child:null};class wt extends fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mv++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new C,t=new ei,i=new _i,s=new C(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Ze}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return bs.setFromAxisAngle(e,t),this.quaternion.multiply(bs),this}rotateOnWorldAxis(e,t){return bs.setFromAxisAngle(e,t),this.quaternion.premultiply(bs),this}rotateX(e){return this.rotateOnAxis(oh,e)}rotateY(e){return this.rotateOnAxis(ah,e)}rotateZ(e){return this.rotateOnAxis(lh,e)}translateOnAxis(e,t){return rh.copy(e).applyQuaternion(this.quaternion),this.position.add(rh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(oh,e)}translateY(e){return this.translateOnAxis(ah,e)}translateZ(e){return this.translateOnAxis(lh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(oi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?po.copy(e):po.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?oi.lookAt(pr,po,this.up):oi.lookAt(po,pr,this.up),this.quaternion.setFromRotationMatrix(oi),s&&(oi.extractRotation(s.matrixWorld),bs.setFromRotationMatrix(oi),this.quaternion.premultiply(bs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(_v),al.child=e,this.dispatchEvent(al),al.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xv),ll.child=e,this.dispatchEvent(ll),ll.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(oi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,e,gv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,vv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const h=l[u];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,u=this.material.length;l<u;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),u=a(e.textures),c=a(e.images),h=a(e.shapes),d=a(e.skeletons),m=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){const l=[];for(const u in o){const c=o[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}wt.DEFAULT_UP=new C(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Dn=new C,ai=new C,cl=new C,li=new C,ws=new C,As=new C,ch=new C,ul=new C,hl=new C,fl=new C;class Fn{constructor(e=new C,t=new C,i=new C){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Dn.subVectors(e,t),s.cross(Dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Dn.subVectors(s,t),ai.subVectors(i,t),cl.subVectors(e,t);const a=Dn.dot(Dn),o=Dn.dot(ai),l=Dn.dot(cl),u=ai.dot(ai),c=ai.dot(cl),h=a*u-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,m=(u*l-o*c)*d,v=(a*c-o*l)*d;return r.set(1-m-v,v,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,li.x),l.addScaledVector(a,li.y),l.addScaledVector(o,li.z),l)}static isFrontFacing(e,t,i,s){return Dn.subVectors(i,t),ai.subVectors(e,t),Dn.cross(ai).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Dn.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Fn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;ws.subVectors(s,i),As.subVectors(r,i),ul.subVectors(e,i);const l=ws.dot(ul),u=As.dot(ul);if(l<=0&&u<=0)return t.copy(i);hl.subVectors(e,s);const c=ws.dot(hl),h=As.dot(hl);if(c>=0&&h<=c)return t.copy(s);const d=l*h-c*u;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),t.copy(i).addScaledVector(ws,a);fl.subVectors(e,r);const m=ws.dot(fl),v=As.dot(fl);if(v>=0&&m<=v)return t.copy(r);const g=m*u-l*v;if(g<=0&&u>=0&&v<=0)return o=u/(u-v),t.copy(i).addScaledVector(As,o);const p=c*v-m*h;if(p<=0&&h-c>=0&&m-v>=0)return ch.subVectors(r,s),o=(h-c)/(h-c+(m-v)),t.copy(s).addScaledVector(ch,o);const f=1/(p+g+d);return a=g*f,o=d*f,t.copy(i).addScaledVector(ws,a).addScaledVector(As,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},mo={h:0,s:0,l:0};function dl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=ut.workingColorSpace){return this.r=e,this.g=t,this.b=i,ut.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=ut.workingColorSpace){if(e=Sc(e,1),t=Qt(t,0,1),i=Qt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=dl(a,r,e+1/3),this.g=dl(a,r,e),this.b=dl(a,r,e-1/3)}return ut.toWorkingColorSpace(this,s),this}setStyle(e,t=xn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xn){const i=Vd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$s(e.r),this.g=$s(e.g),this.b=$s(e.b),this}copyLinearToSRGB(e){return this.r=Qa(e.r),this.g=Qa(e.g),this.b=Qa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return ut.fromWorkingColorSpace($t.copy(this),e),Math.round(Qt($t.r*255,0,255))*65536+Math.round(Qt($t.g*255,0,255))*256+Math.round(Qt($t.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace($t.copy(this),t);const i=$t.r,s=$t.g,r=$t.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,u;const c=(o+a)/2;if(o===a)l=0,u=0;else{const h=a-o;switch(u=c<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=xn){ut.fromWorkingColorSpace($t.copy(this),e);const t=$t.r,i=$t.g,s=$t.b;return e!==xn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+t,bi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(bi),e.getHSL(mo);const i=Ur(bi.h,mo.h,t),s=Ur(bi.s,mo.s,t),r=Ur(bi.l,mo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new je;je.NAMES=Vd;let yv=0;class zi extends fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yv++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=js,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gl,this.blendDst=Hl,this.blendEquation=is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=Qo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$u,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==js&&(i.blending=this.blending),this.side!==Fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Gl&&(i.blendSrc=this.blendSrc),this.blendDst!==Hl&&(i.blendDst=this.blendDst),this.blendEquation!==is&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Qo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$u&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ln extends zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Ed,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new C,go=new Ae;class Ot{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Xl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Fd("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)go.fromBufferAttribute(this,t),go.applyMatrix3(e),this.setXY(t,go.x,go.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=On(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ct(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=On(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=On(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=On(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=On(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),s=ct(s,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xl&&(e.usage=this.usage),e}}class kd extends Ot{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Wd extends Ot{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class xt extends Ot{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Mv=0;const Tn=new ht,pl=new wt,Rs=new C,vn=new ds,mr=new ds,Ut=new C;class Ct extends fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mv++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Od(e)?Wd:kd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,i){return Tn.makeTranslation(e,t,i),this.applyMatrix4(Tn),this}scale(e,t,i){return Tn.makeScale(e,t,i),this.applyMatrix4(Tn),this}lookAt(e){return pl.lookAt(e),pl.updateMatrix(),this.applyMatrix4(pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rs).negate(),this.translate(Rs.x,Rs.y,Rs.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new xt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];vn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ps);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];mr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(vn.min,mr.min),vn.expandByPoint(Ut),Ut.addVectors(vn.max,mr.max),vn.expandByPoint(Ut)):(vn.expandByPoint(mr.min),vn.expandByPoint(mr.max))}vn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ut));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let u=0,c=o.count;u<c;u++)Ut.fromBufferAttribute(o,u),l&&(Rs.fromBufferAttribute(e,u),Ut.add(Rs)),s=Math.max(s,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ot(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let O=0;O<i.count;O++)o[O]=new C,l[O]=new C;const u=new C,c=new C,h=new C,d=new Ae,m=new Ae,v=new Ae,g=new C,p=new C;function f(O,k,y){u.fromBufferAttribute(i,O),c.fromBufferAttribute(i,k),h.fromBufferAttribute(i,y),d.fromBufferAttribute(r,O),m.fromBufferAttribute(r,k),v.fromBufferAttribute(r,y),c.sub(u),h.sub(u),m.sub(d),v.sub(d);const T=1/(m.x*v.y-v.x*m.y);isFinite(T)&&(g.copy(c).multiplyScalar(v.y).addScaledVector(h,-m.y).multiplyScalar(T),p.copy(h).multiplyScalar(m.x).addScaledVector(c,-v.x).multiplyScalar(T),o[O].add(g),o[k].add(g),o[y].add(g),l[O].add(p),l[k].add(p),l[y].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let O=0,k=M.length;O<k;++O){const y=M[O],T=y.start,L=y.count;for(let z=T,D=T+L;z<D;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const x=new C,E=new C,U=new C,P=new C;function R(O){U.fromBufferAttribute(s,O),P.copy(U);const k=o[O];x.copy(k),x.sub(U.multiplyScalar(U.dot(k))).normalize(),E.crossVectors(P,k);const T=E.dot(l[O])<0?-1:1;a.setXYZW(O,x.x,x.y,x.z,T)}for(let O=0,k=M.length;O<k;++O){const y=M[O],T=y.start,L=y.count;for(let z=T,D=T+L;z<D;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ot(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,u=new C,c=new C,h=new C;if(e)for(let d=0,m=e.count;d<m;d+=3){const v=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),c.subVectors(a,r),h.subVectors(s,r),c.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),u.fromBufferAttribute(i,p),o.add(c),l.add(c),u.add(c),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(p,u.x,u.y,u.z)}else for(let d=0,m=t.count;d<m;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),c.subVectors(a,r),h.subVectors(s,r),c.cross(h),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){const u=o.array,c=o.itemSize,h=o.normalized,d=new u.constructor(l.length*c);let m=0,v=0;for(let g=0,p=l.length;g<p;g++){o.isInterleavedBufferAttribute?m=l[g]*o.data.stride+o.offset:m=l[g]*c;for(let f=0;f<c;f++)d[v++]=u[m++]}return new Ot(d,c,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],u=e(l,i);t.setAttribute(o,u)}const r=this.morphAttributes;for(const o in r){const l=[],u=r[o];for(let c=0,h=u.length;c<h;c++){const d=u[c],m=e(d,i);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const u=a[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let h=0,d=u.length;h<d;h++){const m=u[h];c.push(m.toJSON(e.data))}c.length>0&&(s[l]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const u in s){const c=s[u];this.setAttribute(u,c.clone(t))}const r=e.morphAttributes;for(const u in r){const c=[],h=r[u];for(let d=0,m=h.length;d<m;d++)c.push(h[d].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,c=a.length;u<c;u++){const h=a[u];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uh=new ht,Ki=new Ea,vo=new ps,hh=new C,Cs=new C,Ps=new C,Ls=new C,ml=new C,_o=new C,xo=new Ae,yo=new Ae,Mo=new Ae,fh=new C,dh=new C,ph=new C,So=new C,Eo=new C;class _e extends wt{constructor(e=new Ct,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){_o.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const c=o[l],h=r[l];c!==0&&(ml.fromBufferAttribute(h,e),a?_o.addScaledVector(ml,c):_o.addScaledVector(ml.sub(t),c))}t.add(_o)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vo.copy(i.boundingSphere),vo.applyMatrix4(r),Ki.copy(e.ray).recast(e.near),!(vo.containsPoint(Ki.origin)===!1&&(Ki.intersectSphere(vo,hh)===null||Ki.origin.distanceToSquared(hh)>(e.far-e.near)**2))&&(uh.copy(r).invert(),Ki.copy(e.ray).applyMatrix4(uh),!(i.boundingBox!==null&&Ki.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ki)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,u=r.attributes.uv,c=r.attributes.uv1,h=r.attributes.normal,d=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,g=d.length;v<g;v++){const p=d[v],f=a[p.materialIndex],M=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=M,U=x;E<U;E+=3){const P=o.getX(E),R=o.getX(E+1),O=o.getX(E+2);s=To(this,f,e,i,u,c,h,P,R,O),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const v=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let p=v,f=g;p<f;p+=3){const M=o.getX(p),x=o.getX(p+1),E=o.getX(p+2);s=To(this,a,e,i,u,c,h,M,x,E),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,g=d.length;v<g;v++){const p=d[v],f=a[p.materialIndex],M=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let E=M,U=x;E<U;E+=3){const P=E,R=E+1,O=E+2;s=To(this,f,e,i,u,c,h,P,R,O),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const v=Math.max(0,m.start),g=Math.min(l.count,m.start+m.count);for(let p=v,f=g;p<f;p+=3){const M=p,x=p+1,E=p+2;s=To(this,a,e,i,u,c,h,M,x,E),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Sv(n,e,t,i,s,r,a,o){let l;if(e.side===Ft?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Fi,o),l===null)return null;Eo.copy(o),Eo.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(Eo);return u<t.near||u>t.far?null:{distance:u,point:Eo.clone(),object:n}}function To(n,e,t,i,s,r,a,o,l,u){n.getVertexPosition(o,Cs),n.getVertexPosition(l,Ps),n.getVertexPosition(u,Ls);const c=Sv(n,e,t,i,Cs,Ps,Ls,So);if(c){s&&(xo.fromBufferAttribute(s,o),yo.fromBufferAttribute(s,l),Mo.fromBufferAttribute(s,u),c.uv=Fn.getInterpolation(So,Cs,Ps,Ls,xo,yo,Mo,new Ae)),r&&(xo.fromBufferAttribute(r,o),yo.fromBufferAttribute(r,l),Mo.fromBufferAttribute(r,u),c.uv1=Fn.getInterpolation(So,Cs,Ps,Ls,xo,yo,Mo,new Ae)),a&&(fh.fromBufferAttribute(a,o),dh.fromBufferAttribute(a,l),ph.fromBufferAttribute(a,u),c.normal=Fn.getInterpolation(So,Cs,Ps,Ls,fh,dh,ph,new C),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const h={a:o,b:l,c:u,normal:new C,materialIndex:0};Fn.getNormal(Cs,Ps,Ls,h.normal),c.face=h}return c}class Ht extends Ct{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],u=[],c=[],h=[];let d=0,m=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new xt(u,3)),this.setAttribute("normal",new xt(c,3)),this.setAttribute("uv",new xt(h,2));function v(g,p,f,M,x,E,U,P,R,O,k){const y=E/R,T=U/O,L=E/2,z=U/2,D=P/2,q=R+1,G=O+1;let J=0,F=0;const Q=new C;for(let oe=0;oe<G;oe++){const fe=oe*T-z;for(let ye=0;ye<q;ye++){const ze=ye*y-L;Q[g]=ze*M,Q[p]=fe*x,Q[f]=D,u.push(Q.x,Q.y,Q.z),Q[g]=0,Q[p]=0,Q[f]=P>0?1:-1,c.push(Q.x,Q.y,Q.z),h.push(ye/R),h.push(1-oe/O),J+=1}}for(let oe=0;oe<O;oe++)for(let fe=0;fe<R;fe++){const ye=d+fe+q*oe,ze=d+fe+q*(oe+1),te=d+(fe+1)+q*(oe+1),de=d+(fe+1)+q*oe;l.push(ye,ze,de),l.push(ze,te,de),F+=6}o.addGroup(m,F,k),m+=F,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ht(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function tr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function an(n){const e={};for(let t=0;t<n.length;t++){const i=tr(n[t]);for(const s in i)e[s]=i[s]}return e}function Ev(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Xd(n){return n.getRenderTarget()===null?n.outputColorSpace:ut.workingColorSpace}const ra={clone:tr,merge:an};var Tv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mt extends zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tv,this.fragmentShader=bv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=tr(e.uniforms),this.uniformsGroups=Ev(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class qd extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=pi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const wi=new C,mh=new Ae,gh=new Ae;class yn extends qd{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xr*2*Math.atan(Math.tan(Dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wi.x,wi.y).multiplyScalar(-e/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(wi.x,wi.y).multiplyScalar(-e/wi.z)}getViewSize(e,t){return this.getViewBounds(e,mh,gh),t.subVectors(gh,mh)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Dr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,u=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/u,s*=a.width/l,i*=a.height/u}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Is=-90,Ds=1;class wv extends wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yn(Is,Ds,e,t);s.layers=this.layers,this.add(s);const r=new yn(Is,Ds,e,t);r.layers=this.layers,this.add(r);const a=new yn(Is,Ds,e,t);a.layers=this.layers,this.add(a);const o=new yn(Is,Ds,e,t);o.layers=this.layers,this.add(o);const l=new yn(Is,Ds,e,t);l.layers=this.layers,this.add(l);const u=new yn(Is,Ds,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const u of t)this.remove(u);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ia)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,u,c]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,u),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,s),e.render(t,c),e.setRenderTarget(h,d,m),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Yd extends Xt{constructor(e,t,i,s,r,a,o,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:Js,super(e,t,i,s,r,a,o,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Av extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Yd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Vt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ht(5,5,5),r=new mt({name:"CubemapFromEquirect",uniforms:tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ft,blending:mi});r.uniforms.tEquirect.value=t;const a=new _e(s,r),o=t.minFilter;return t.minFilter===jn&&(t.minFilter=Vt),new wv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const gl=new C,Rv=new C,Cv=new Ze;class Ri{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=gl.subVectors(i,t).cross(Rv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(gl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Cv.getNormalMatrix(e),s=this.coplanarPoint(gl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new ps,bo=new C;class Ec{constructor(e=new Ri,t=new Ri,i=new Ri,s=new Ri,r=new Ri,a=new Ri){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=pi){const i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],u=s[4],c=s[5],h=s[6],d=s[7],m=s[8],v=s[9],g=s[10],p=s[11],f=s[12],M=s[13],x=s[14],E=s[15];if(i[0].setComponents(l-r,d-u,p-m,E-f).normalize(),i[1].setComponents(l+r,d+u,p+m,E+f).normalize(),i[2].setComponents(l+a,d+c,p+v,E+M).normalize(),i[3].setComponents(l-a,d-c,p-v,E-M).normalize(),i[4].setComponents(l-o,d-h,p-g,E-x).normalize(),t===pi)i[5].setComponents(l+o,d+h,p+g,E+x).normalize();else if(t===ia)i[5].setComponents(o,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(bo.x=s.normal.x>0?e.max.x:e.min.x,bo.y=s.normal.y>0?e.max.y:e.min.y,bo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(bo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Pv(n,e){const t=e.isWebGL2,i=new WeakMap;function s(u,c){const h=u.array,d=u.usage,m=h.byteLength,v=n.createBuffer();n.bindBuffer(c,v),n.bufferData(c,h,d),u.onUploadCallback();let g;if(h instanceof Float32Array)g=n.FLOAT;else if(h instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=n.SHORT;else if(h instanceof Uint32Array)g=n.UNSIGNED_INT;else if(h instanceof Int32Array)g=n.INT;else if(h instanceof Int8Array)g=n.BYTE;else if(h instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:u.version,size:m}}function r(u,c,h){const d=c.array,m=c._updateRange,v=c.updateRanges;if(n.bindBuffer(h,u),m.count===-1&&v.length===0&&n.bufferSubData(h,0,d),v.length!==0){for(let g=0,p=v.length;g<p;g++){const f=v[g];t?n.bufferSubData(h,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):n.bufferSubData(h,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}c.clearUpdateRanges()}m.count!==-1&&(t?n.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),c.onUploadCallback()}function a(u){return u.isInterleavedBufferAttribute&&(u=u.data),i.get(u)}function o(u){u.isInterleavedBufferAttribute&&(u=u.data);const c=i.get(u);c&&(n.deleteBuffer(c.buffer),i.delete(u))}function l(u,c){if(u.isGLBufferAttribute){const d=i.get(u);(!d||d.version<u.version)&&i.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const h=i.get(u);if(h===void 0)i.set(u,s(u,c));else if(h.version<u.version){if(h.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,u,c),h.version=u.version}}return{get:a,remove:o,update:l}}class ir extends Ct{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),u=o+1,c=l+1,h=e/o,d=t/l,m=[],v=[],g=[],p=[];for(let f=0;f<c;f++){const M=f*d-a;for(let x=0;x<u;x++){const E=x*h-r;v.push(E,-M,0),g.push(0,0,1),p.push(x/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){const x=M+u*f,E=M+u*(f+1),U=M+1+u*(f+1),P=M+1+u*f;m.push(x,E,P),m.push(E,U,P)}this.setIndex(m),this.setAttribute("position",new xt(v,3)),this.setAttribute("normal",new xt(g,3)),this.setAttribute("uv",new xt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ir(e.width,e.height,e.widthSegments,e.heightSegments)}}var Lv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Iv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Dv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ov=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zv=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Hv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Wv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Xv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Kv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$v=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Qv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,e_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,t_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,n_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,i_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,s_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,r_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,a_="gl_FragColor = linearToOutputTexel( gl_FragColor );",l_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,c_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,u_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,h_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,f_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,d_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,p_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,m_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,g_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,v_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,__=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,x_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,y_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,M_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,S_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,E_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,T_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,b_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,w_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,A_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,R_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,C_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,P_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,L_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,I_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,D_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,N_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,F_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,B_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,z_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,G_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,H_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,V_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,k_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,W_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,X_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Y_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,j_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,K_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Z_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Q_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ex=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ix=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ox=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ax=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ux=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,px=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,mx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,gx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_x=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,xx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ex=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ax=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Px=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ix=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ux=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ox=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Bx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,zx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,qx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$x=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Qx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ey=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ty=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ny=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ry=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,oy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ay=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ly=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,cy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:Lv,alphahash_pars_fragment:Iv,alphamap_fragment:Dv,alphamap_pars_fragment:Uv,alphatest_fragment:Nv,alphatest_pars_fragment:Ov,aomap_fragment:Fv,aomap_pars_fragment:Bv,batching_pars_vertex:zv,batching_vertex:Gv,begin_vertex:Hv,beginnormal_vertex:Vv,bsdfs:kv,iridescence_fragment:Wv,bumpmap_pars_fragment:Xv,clipping_planes_fragment:qv,clipping_planes_pars_fragment:Yv,clipping_planes_pars_vertex:jv,clipping_planes_vertex:Kv,color_fragment:$v,color_pars_fragment:Zv,color_pars_vertex:Jv,color_vertex:Qv,common:e_,cube_uv_reflection_fragment:t_,defaultnormal_vertex:n_,displacementmap_pars_vertex:i_,displacementmap_vertex:s_,emissivemap_fragment:r_,emissivemap_pars_fragment:o_,colorspace_fragment:a_,colorspace_pars_fragment:l_,envmap_fragment:c_,envmap_common_pars_fragment:u_,envmap_pars_fragment:h_,envmap_pars_vertex:f_,envmap_physical_pars_fragment:T_,envmap_vertex:d_,fog_vertex:p_,fog_pars_vertex:m_,fog_fragment:g_,fog_pars_fragment:v_,gradientmap_pars_fragment:__,lightmap_fragment:x_,lightmap_pars_fragment:y_,lights_lambert_fragment:M_,lights_lambert_pars_fragment:S_,lights_pars_begin:E_,lights_toon_fragment:b_,lights_toon_pars_fragment:w_,lights_phong_fragment:A_,lights_phong_pars_fragment:R_,lights_physical_fragment:C_,lights_physical_pars_fragment:P_,lights_fragment_begin:L_,lights_fragment_maps:I_,lights_fragment_end:D_,logdepthbuf_fragment:U_,logdepthbuf_pars_fragment:N_,logdepthbuf_pars_vertex:O_,logdepthbuf_vertex:F_,map_fragment:B_,map_pars_fragment:z_,map_particle_fragment:G_,map_particle_pars_fragment:H_,metalnessmap_fragment:V_,metalnessmap_pars_fragment:k_,morphinstance_vertex:W_,morphcolor_vertex:X_,morphnormal_vertex:q_,morphtarget_pars_vertex:Y_,morphtarget_vertex:j_,normal_fragment_begin:K_,normal_fragment_maps:$_,normal_pars_fragment:Z_,normal_pars_vertex:J_,normal_vertex:Q_,normalmap_pars_fragment:ex,clearcoat_normal_fragment_begin:tx,clearcoat_normal_fragment_maps:nx,clearcoat_pars_fragment:ix,iridescence_pars_fragment:sx,opaque_fragment:rx,packing:ox,premultiplied_alpha_fragment:ax,project_vertex:lx,dithering_fragment:cx,dithering_pars_fragment:ux,roughnessmap_fragment:hx,roughnessmap_pars_fragment:fx,shadowmap_pars_fragment:dx,shadowmap_pars_vertex:px,shadowmap_vertex:mx,shadowmask_pars_fragment:gx,skinbase_vertex:vx,skinning_pars_vertex:_x,skinning_vertex:xx,skinnormal_vertex:yx,specularmap_fragment:Mx,specularmap_pars_fragment:Sx,tonemapping_fragment:Ex,tonemapping_pars_fragment:Tx,transmission_fragment:bx,transmission_pars_fragment:wx,uv_pars_fragment:Ax,uv_pars_vertex:Rx,uv_vertex:Cx,worldpos_vertex:Px,background_vert:Lx,background_frag:Ix,backgroundCube_vert:Dx,backgroundCube_frag:Ux,cube_vert:Nx,cube_frag:Ox,depth_vert:Fx,depth_frag:Bx,distanceRGBA_vert:zx,distanceRGBA_frag:Gx,equirect_vert:Hx,equirect_frag:Vx,linedashed_vert:kx,linedashed_frag:Wx,meshbasic_vert:Xx,meshbasic_frag:qx,meshlambert_vert:Yx,meshlambert_frag:jx,meshmatcap_vert:Kx,meshmatcap_frag:$x,meshnormal_vert:Zx,meshnormal_frag:Jx,meshphong_vert:Qx,meshphong_frag:ey,meshphysical_vert:ty,meshphysical_frag:ny,meshtoon_vert:iy,meshtoon_frag:sy,points_vert:ry,points_frag:oy,shadow_vert:ay,shadow_frag:ly,sprite_vert:cy,sprite_frag:uy},Me={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Xn={basic:{uniforms:an([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:an([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new je(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:an([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:an([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:an([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new je(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:an([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:an([Me.points,Me.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:an([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:an([Me.common,Me.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:an([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:an([Me.sprite,Me.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:an([Me.common,Me.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:an([Me.lights,Me.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Xn.physical={uniforms:an([Xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const wo={r:0,b:0,g:0},Zi=new ei,hy=new ht;function fy(n,e,t,i,s,r,a){const o=new je(0);let l=r===!0?0:1,u,c,h=null,d=0,m=null;function v(p,f){let M=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?t:e).get(x)),x===null?g(o,l):x&&x.isColor&&(g(x,1),M=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Ma)?(c===void 0&&(c=new _e(new Ht(1,1,1),new mt({name:"BackgroundCubeMaterial",uniforms:tr(Xn.backgroundCube.uniforms),vertexShader:Xn.backgroundCube.vertexShader,fragmentShader:Xn.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(U,P,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),Zi.copy(f.backgroundRotation),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(hy.makeRotationFromEuler(Zi)),c.material.toneMapped=ut.getTransfer(x.colorSpace)!==_t,(h!==x||d!==x.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,m=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(u===void 0&&(u=new _e(new ir(2,2),new mt({name:"BackgroundMaterial",uniforms:tr(Xn.background.uniforms),vertexShader:Xn.background.vertexShader,fragmentShader:Xn.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=x,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=ut.getTransfer(x.colorSpace)!==_t,x.matrixAutoUpdate===!0&&x.updateMatrix(),u.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,h=x,d=x.version,m=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null))}function g(p,f){p.getRGB(wo,Xd(n)),i.buffers.color.setClear(wo.r,wo.g,wo.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(p,f=1){o.set(p),l=f,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,g(o,l)},render:v}}function dy(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=p(null);let u=l,c=!1;function h(D,q,G,J,F){let Q=!1;if(a){const oe=g(J,G,q);u!==oe&&(u=oe,m(u.object)),Q=f(D,J,G,F),Q&&M(D,J,G,F)}else{const oe=q.wireframe===!0;(u.geometry!==J.id||u.program!==G.id||u.wireframe!==oe)&&(u.geometry=J.id,u.program=G.id,u.wireframe=oe,Q=!0)}F!==null&&t.update(F,n.ELEMENT_ARRAY_BUFFER),(Q||c)&&(c=!1,O(D,q,G,J),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function d(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function m(D){return i.isWebGL2?n.bindVertexArray(D):r.bindVertexArrayOES(D)}function v(D){return i.isWebGL2?n.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function g(D,q,G){const J=G.wireframe===!0;let F=o[D.id];F===void 0&&(F={},o[D.id]=F);let Q=F[q.id];Q===void 0&&(Q={},F[q.id]=Q);let oe=Q[J];return oe===void 0&&(oe=p(d()),Q[J]=oe),oe}function p(D){const q=[],G=[],J=[];for(let F=0;F<s;F++)q[F]=0,G[F]=0,J[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:G,attributeDivisors:J,object:D,attributes:{},index:null}}function f(D,q,G,J){const F=u.attributes,Q=q.attributes;let oe=0;const fe=G.getAttributes();for(const ye in fe)if(fe[ye].location>=0){const te=F[ye];let de=Q[ye];if(de===void 0&&(ye==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),ye==="instanceColor"&&D.instanceColor&&(de=D.instanceColor)),te===void 0||te.attribute!==de||de&&te.data!==de.data)return!0;oe++}return u.attributesNum!==oe||u.index!==J}function M(D,q,G,J){const F={},Q=q.attributes;let oe=0;const fe=G.getAttributes();for(const ye in fe)if(fe[ye].location>=0){let te=Q[ye];te===void 0&&(ye==="instanceMatrix"&&D.instanceMatrix&&(te=D.instanceMatrix),ye==="instanceColor"&&D.instanceColor&&(te=D.instanceColor));const de={};de.attribute=te,te&&te.data&&(de.data=te.data),F[ye]=de,oe++}u.attributes=F,u.attributesNum=oe,u.index=J}function x(){const D=u.newAttributes;for(let q=0,G=D.length;q<G;q++)D[q]=0}function E(D){U(D,0)}function U(D,q){const G=u.newAttributes,J=u.enabledAttributes,F=u.attributeDivisors;G[D]=1,J[D]===0&&(n.enableVertexAttribArray(D),J[D]=1),F[D]!==q&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,q),F[D]=q)}function P(){const D=u.newAttributes,q=u.enabledAttributes;for(let G=0,J=q.length;G<J;G++)q[G]!==D[G]&&(n.disableVertexAttribArray(G),q[G]=0)}function R(D,q,G,J,F,Q,oe){oe===!0?n.vertexAttribIPointer(D,q,G,F,Q):n.vertexAttribPointer(D,q,G,J,F,Q)}function O(D,q,G,J){if(i.isWebGL2===!1&&(D.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const F=J.attributes,Q=G.getAttributes(),oe=q.defaultAttributeValues;for(const fe in Q){const ye=Q[fe];if(ye.location>=0){let ze=F[fe];if(ze===void 0&&(fe==="instanceMatrix"&&D.instanceMatrix&&(ze=D.instanceMatrix),fe==="instanceColor"&&D.instanceColor&&(ze=D.instanceColor)),ze!==void 0){const te=ze.normalized,de=ze.itemSize,Se=t.get(ze);if(Se===void 0)continue;const Ge=Se.buffer,Ue=Se.type,Re=Se.bytesPerElement,et=i.isWebGL2===!0&&(Ue===n.INT||Ue===n.UNSIGNED_INT||ze.gpuType===wd);if(ze.isInterleavedBufferAttribute){const A=ze.data,S=A.stride,K=ze.offset;if(A.isInstancedInterleavedBuffer){for(let Y=0;Y<ye.locationSize;Y++)U(ye.location+Y,A.meshPerAttribute);D.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=A.meshPerAttribute*A.count)}else for(let Y=0;Y<ye.locationSize;Y++)E(ye.location+Y);n.bindBuffer(n.ARRAY_BUFFER,Ge);for(let Y=0;Y<ye.locationSize;Y++)R(ye.location+Y,de/ye.locationSize,Ue,te,S*Re,(K+de/ye.locationSize*Y)*Re,et)}else{if(ze.isInstancedBufferAttribute){for(let A=0;A<ye.locationSize;A++)U(ye.location+A,ze.meshPerAttribute);D.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let A=0;A<ye.locationSize;A++)E(ye.location+A);n.bindBuffer(n.ARRAY_BUFFER,Ge);for(let A=0;A<ye.locationSize;A++)R(ye.location+A,de/ye.locationSize,Ue,te,de*Re,de/ye.locationSize*A*Re,et)}}else if(oe!==void 0){const te=oe[fe];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(ye.location,te);break;case 3:n.vertexAttrib3fv(ye.location,te);break;case 4:n.vertexAttrib4fv(ye.location,te);break;default:n.vertexAttrib1fv(ye.location,te)}}}}P()}function k(){L();for(const D in o){const q=o[D];for(const G in q){const J=q[G];for(const F in J)v(J[F].object),delete J[F];delete q[G]}delete o[D]}}function y(D){if(o[D.id]===void 0)return;const q=o[D.id];for(const G in q){const J=q[G];for(const F in J)v(J[F].object),delete J[F];delete q[G]}delete o[D.id]}function T(D){for(const q in o){const G=o[q];if(G[D.id]===void 0)continue;const J=G[D.id];for(const F in J)v(J[F].object),delete J[F];delete G[D.id]}}function L(){z(),c=!0,u!==l&&(u=l,m(u.object))}function z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:L,resetDefaultState:z,dispose:k,releaseStatesOfGeometry:y,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:E,disableUnusedAttributes:P}}function py(n,e,t,i){const s=i.isWebGL2;let r;function a(c){r=c}function o(c,h){n.drawArrays(r,c,h),t.update(h,r,1)}function l(c,h,d){if(d===0)return;let m,v;if(s)m=n,v="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[v](r,c,h,d),t.update(h,r,d)}function u(c,h,d){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<d;v++)this.render(c[v],h[v]);else{m.multiDrawArraysWEBGL(r,c,0,h,0,d);let v=0;for(let g=0;g<d;g++)v+=h[g];t.update(v,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=u}function my(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const u=a||e.has("WEBGL_draw_buffers"),c=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,E=a||e.has("OES_texture_float"),U=x&&E,P=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:u,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:c,maxTextures:h,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:v,maxAttributes:g,maxVertexUniforms:p,maxVaryings:f,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:E,floatVertexTextures:U,maxSamples:P}}function gy(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Ri,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const m=h.length!==0||d||i!==0||s;return s=d,i=h.length,m},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=c(h,d,0)},this.setState=function(h,d,m){const v=h.clippingPlanes,g=h.clipIntersection,p=h.clipShadows,f=n.get(h);if(!s||v===null||v.length===0||r&&!p)r?c(null):u();else{const M=r?0:i,x=M*4;let E=f.clippingState||null;l.value=E,E=c(v,d,x,m);for(let U=0;U!==x;++U)E[U]=t[U];f.clippingState=E,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=M}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(h,d,m,v){const g=h!==null?h.length:0;let p=null;if(g!==0){if(p=l.value,v!==!0||p===null){const f=m+g*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<f)&&(p=new Float32Array(f));for(let x=0,E=m;x!==g;++x,E+=4)a.copy(h[x]).applyMatrix4(M,o),a.normal.toArray(p,E),p[E+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function vy(n){let e=new WeakMap;function t(a,o){return o===Vl?a.mapping=Js:o===kl&&(a.mapping=Qs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Vl||o===kl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const u=new Av(l.height);return u.fromEquirectangularTexture(n,a),e.set(a,u),a.addEventListener("dispose",s),t(u.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Tc extends qd{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,a=r+u*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Xs=4,vh=[.125,.215,.35,.446,.526,.582],ss=20,vl=new Tc,_h=new je;let _l=null,xl=0,yl=0;const ts=(1+Math.sqrt(5))/2,Us=1/ts,xh=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,ts,Us),new C(0,ts,-Us),new C(Us,0,ts),new C(-Us,0,ts),new C(ts,Us,0),new C(-ts,Us,0)];class Kl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){_l=this._renderer.getRenderTarget(),xl=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_l,xl,yl),e.scissorTest=!1,Ao(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Js||e.mapping===Qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_l=this._renderer.getRenderTarget(),xl=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:gi,format:Nn,colorSpace:Bi,depthBuffer:!1},s=yh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yh(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_y(r)),this._blurMaterial=xy(r,e,t)}return s}_compileMaterial(e){const t=new _e(this._lodPlanes[0],e);this._renderer.compile(t,vl)}_sceneToCubeUV(e,t,i,s){const o=new yn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,d=c.toneMapping;c.getClearColor(_h),c.toneMapping=Di,c.autoClear=!1;const m=new ln({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),v=new _e(new Ht,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(_h),g=!0);for(let f=0;f<6;f++){const M=f%3;M===0?(o.up.set(0,l[f],0),o.lookAt(u[f],0,0)):M===1?(o.up.set(0,0,l[f]),o.lookAt(0,u[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,u[f]));const x=this._cubeSize;Ao(s,M*x,f>2?x:0,x,x),c.setRenderTarget(s),g&&c.render(v,o),c.render(e,o)}v.geometry.dispose(),v.material.dispose(),c.toneMapping=d,c.autoClear=h,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Js||e.mapping===Qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new _e(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ao(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,vl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=xh[(s-1)%xh.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,h=new _e(this._lodPlanes[s],u),d=u.uniforms,m=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ss-1),g=r/v,p=isFinite(r)?1+Math.floor(c*g):ss;p>ss&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ss}`);const f=[];let M=0;for(let R=0;R<ss;++R){const O=R/g,k=Math.exp(-O*O/2);f.push(k),R===0?M+=k:R<p&&(M+=2*k)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=v,d.mipInt.value=x-i;const E=this._sizeLods[s],U=3*E*(s>x-Xs?s-x+Xs:0),P=4*(this._cubeSize-E);Ao(t,U,P,3*E,2*E),l.setRenderTarget(t),l.render(h,vl)}}function _y(n){const e=[],t=[],i=[];let s=n;const r=n-Xs+1+vh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-Xs?l=vh[a-n+Xs-1]:a===0&&(l=0),i.push(l);const u=1/(o-2),c=-u,h=1+u,d=[c,c,h,c,h,h,c,c,h,h,c,h],m=6,v=6,g=3,p=2,f=1,M=new Float32Array(g*v*m),x=new Float32Array(p*v*m),E=new Float32Array(f*v*m);for(let P=0;P<m;P++){const R=P%3*2/3-1,O=P>2?0:-1,k=[R,O,0,R+2/3,O,0,R+2/3,O+1,0,R,O,0,R+2/3,O+1,0,R,O+1,0];M.set(k,g*v*P),x.set(d,p*v*P);const y=[P,P,P,P,P,P];E.set(y,f*v*P)}const U=new Ct;U.setAttribute("position",new Ot(M,g)),U.setAttribute("uv",new Ot(x,p)),U.setAttribute("faceIndex",new Ot(E,f)),e.push(U),s>Xs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function yh(n,e,t){const i=new Gn(n,e,t);return i.texture.mapping=Ma,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ao(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function xy(n,e,t){const i=new Float32Array(ss),s=new C(0,1,0);return new mt({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Mh(){return new mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Sh(){return new mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function bc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function yy(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,u=l===Vl||l===kl,c=l===Js||l===Qs;if(u||c)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Kl(n)),h=u?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(u&&h&&h.height>0||c&&h&&s(h)){t===null&&(t=new Kl(n));const d=u?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function s(o){let l=0;const u=6;for(let c=0;c<u;c++)o[c]!==void 0&&l++;return l===u}function r(o){const l=o.target;l.removeEventListener("dispose",r);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function My(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Sy(n,e,t,i){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);for(const v in d.morphAttributes){const g=d.morphAttributes[v];for(let p=0,f=g.length;p<f;p++)e.remove(g[p])}d.removeEventListener("dispose",a),delete s[d.id];const m=r.get(d);m&&(e.remove(m),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)e.update(d[v],n.ARRAY_BUFFER);const m=h.morphAttributes;for(const v in m){const g=m[v];for(let p=0,f=g.length;p<f;p++)e.update(g[p],n.ARRAY_BUFFER)}}function u(h){const d=[],m=h.index,v=h.attributes.position;let g=0;if(m!==null){const M=m.array;g=m.version;for(let x=0,E=M.length;x<E;x+=3){const U=M[x+0],P=M[x+1],R=M[x+2];d.push(U,P,P,R,R,U)}}else if(v!==void 0){const M=v.array;g=v.version;for(let x=0,E=M.length/3-1;x<E;x+=3){const U=x+0,P=x+1,R=x+2;d.push(U,P,P,R,R,U)}}else return;const p=new(Od(d)?Wd:kd)(d,1);p.version=g;const f=r.get(h);f&&e.remove(f),r.set(h,p)}function c(h){const d=r.get(h);if(d){const m=h.index;m!==null&&d.version<m.version&&u(h)}else u(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:c}}function Ey(n,e,t,i){const s=i.isWebGL2;let r;function a(m){r=m}let o,l;function u(m){o=m.type,l=m.bytesPerElement}function c(m,v){n.drawElements(r,v,o,m*l),t.update(v,r,1)}function h(m,v,g){if(g===0)return;let p,f;if(s)p=n,f="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[f](r,v,o,m*l,g),t.update(v,r,g)}function d(m,v,g){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<g;f++)this.render(m[f]/l,v[f]);else{p.multiDrawElementsWEBGL(r,v,0,o,m,0,g);let f=0;for(let M=0;M<g;M++)f+=v[M];t.update(f,r,1)}}this.setMode=a,this.setIndex=u,this.render=c,this.renderInstances=h,this.renderMultiDraw=d}function Ty(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function by(n,e){return n[0]-e[0]}function wy(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Ay(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,a=new St,o=[];for(let u=0;u<8;u++)o[u]=[u,0];function l(u,c,h){const d=u.morphTargetInfluences;if(e.isWebGL2===!0){const v=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,g=v!==void 0?v.length:0;let p=r.get(c);if(p===void 0||p.count!==g){let z=function(){T.dispose(),r.delete(c),c.removeEventListener("dispose",z)};var m=z;p!==void 0&&p.texture.dispose();const f=c.morphAttributes.position!==void 0,M=c.morphAttributes.normal!==void 0,x=c.morphAttributes.color!==void 0,E=c.morphAttributes.position||[],U=c.morphAttributes.normal||[],P=c.morphAttributes.color||[];let R=0;f===!0&&(R=1),M===!0&&(R=2),x===!0&&(R=3);let O=c.attributes.position.count*R,k=1;O>e.maxTextureSize&&(k=Math.ceil(O/e.maxTextureSize),O=e.maxTextureSize);const y=new Float32Array(O*k*4*g),T=new Gd(y,O,k,g);T.type=Yn,T.needsUpdate=!0;const L=R*4;for(let D=0;D<g;D++){const q=E[D],G=U[D],J=P[D],F=O*k*4*D;for(let Q=0;Q<q.count;Q++){const oe=Q*L;f===!0&&(a.fromBufferAttribute(q,Q),y[F+oe+0]=a.x,y[F+oe+1]=a.y,y[F+oe+2]=a.z,y[F+oe+3]=0),M===!0&&(a.fromBufferAttribute(G,Q),y[F+oe+4]=a.x,y[F+oe+5]=a.y,y[F+oe+6]=a.z,y[F+oe+7]=0),x===!0&&(a.fromBufferAttribute(J,Q),y[F+oe+8]=a.x,y[F+oe+9]=a.y,y[F+oe+10]=a.z,y[F+oe+11]=J.itemSize===4?a.w:1)}}p={count:g,texture:T,size:new Ae(O,k)},r.set(c,p),c.addEventListener("dispose",z)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",u.morphTexture,t);else{let f=0;for(let x=0;x<d.length;x++)f+=d[x];const M=c.morphTargetsRelative?1:1-f;h.getUniforms().setValue(n,"morphTargetBaseInfluence",M),h.getUniforms().setValue(n,"morphTargetInfluences",d)}h.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const v=d===void 0?0:d.length;let g=i[c.id];if(g===void 0||g.length!==v){g=[];for(let E=0;E<v;E++)g[E]=[E,0];i[c.id]=g}for(let E=0;E<v;E++){const U=g[E];U[0]=E,U[1]=d[E]}g.sort(wy);for(let E=0;E<8;E++)E<v&&g[E][1]?(o[E][0]=g[E][0],o[E][1]=g[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(by);const p=c.morphAttributes.position,f=c.morphAttributes.normal;let M=0;for(let E=0;E<8;E++){const U=o[E],P=U[0],R=U[1];P!==Number.MAX_SAFE_INTEGER&&R?(p&&c.getAttribute("morphTarget"+E)!==p[P]&&c.setAttribute("morphTarget"+E,p[P]),f&&c.getAttribute("morphNormal"+E)!==f[P]&&c.setAttribute("morphNormal"+E,f[P]),s[E]=R,M+=R):(p&&c.hasAttribute("morphTarget"+E)===!0&&c.deleteAttribute("morphTarget"+E),f&&c.hasAttribute("morphNormal"+E)===!0&&c.deleteAttribute("morphNormal"+E),s[E]=0)}const x=c.morphTargetsRelative?1:1-M;h.getUniforms().setValue(n,"morphTargetBaseInfluence",x),h.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function Ry(n,e,t,i){let s=new WeakMap;function r(l){const u=i.render.frame,c=l.geometry,h=e.get(l,c);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function a(){s=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:r,dispose:a}}class Kd extends Xt{constructor(e,t,i,s,r,a,o,l,u,c){if(c=c!==void 0?c:cs,c!==cs&&c!==er)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===cs&&(i=Pi),i===void 0&&c===er&&(i=ls),super(null,s,r,a,o,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:kt,this.minFilter=l!==void 0?l:kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const $d=new Xt,Zd=new Kd(1,1);Zd.compareFunction=Nd;const Jd=new Gd,Qd=new hv,ep=new Yd,Eh=[],Th=[],bh=new Float32Array(16),wh=new Float32Array(9),Ah=new Float32Array(4);function sr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Eh[s];if(r===void 0&&(r=new Float32Array(s),Eh[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ta(n,e){let t=Th[e];t===void 0&&(t=new Int32Array(e),Th[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Cy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Py(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function Ly(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function Iy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function Dy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Ah.set(i),n.uniformMatrix2fv(this.addr,!1,Ah),It(t,i)}}function Uy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;wh.set(i),n.uniformMatrix3fv(this.addr,!1,wh),It(t,i)}}function Ny(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;bh.set(i),n.uniformMatrix4fv(this.addr,!1,bh),It(t,i)}}function Oy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Fy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function By(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function zy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function Gy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Hy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function Vy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function ky(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function Wy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?Zd:$d;t.setTexture2D(e||r,s)}function Xy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Qd,s)}function qy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||ep,s)}function Yy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Jd,s)}function jy(n){switch(n){case 5126:return Cy;case 35664:return Py;case 35665:return Ly;case 35666:return Iy;case 35674:return Dy;case 35675:return Uy;case 35676:return Ny;case 5124:case 35670:return Oy;case 35667:case 35671:return Fy;case 35668:case 35672:return By;case 35669:case 35673:return zy;case 5125:return Gy;case 36294:return Hy;case 36295:return Vy;case 36296:return ky;case 35678:case 36198:case 36298:case 36306:case 35682:return Wy;case 35679:case 36299:case 36307:return Xy;case 35680:case 36300:case 36308:case 36293:return qy;case 36289:case 36303:case 36311:case 36292:return Yy}}function Ky(n,e){n.uniform1fv(this.addr,e)}function $y(n,e){const t=sr(e,this.size,2);n.uniform2fv(this.addr,t)}function Zy(n,e){const t=sr(e,this.size,3);n.uniform3fv(this.addr,t)}function Jy(n,e){const t=sr(e,this.size,4);n.uniform4fv(this.addr,t)}function Qy(n,e){const t=sr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function eM(n,e){const t=sr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function tM(n,e){const t=sr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function nM(n,e){n.uniform1iv(this.addr,e)}function iM(n,e){n.uniform2iv(this.addr,e)}function sM(n,e){n.uniform3iv(this.addr,e)}function rM(n,e){n.uniform4iv(this.addr,e)}function oM(n,e){n.uniform1uiv(this.addr,e)}function aM(n,e){n.uniform2uiv(this.addr,e)}function lM(n,e){n.uniform3uiv(this.addr,e)}function cM(n,e){n.uniform4uiv(this.addr,e)}function uM(n,e,t){const i=this.cache,s=e.length,r=Ta(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),It(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||$d,r[a])}function hM(n,e,t){const i=this.cache,s=e.length,r=Ta(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),It(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Qd,r[a])}function fM(n,e,t){const i=this.cache,s=e.length,r=Ta(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),It(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||ep,r[a])}function dM(n,e,t){const i=this.cache,s=e.length,r=Ta(t,s);Lt(i,r)||(n.uniform1iv(this.addr,r),It(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Jd,r[a])}function pM(n){switch(n){case 5126:return Ky;case 35664:return $y;case 35665:return Zy;case 35666:return Jy;case 35674:return Qy;case 35675:return eM;case 35676:return tM;case 5124:case 35670:return nM;case 35667:case 35671:return iM;case 35668:case 35672:return sM;case 35669:case 35673:return rM;case 5125:return oM;case 36294:return aM;case 36295:return lM;case 36296:return cM;case 35678:case 36198:case 36298:case 36306:case 35682:return uM;case 35679:case 36299:case 36307:return hM;case 35680:case 36300:case 36308:case 36293:return fM;case 36289:case 36303:case 36311:case 36292:return dM}}class mM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=jy(t.type)}}class gM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pM(t.type)}}class vM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Ml=/(\w+)(\])?(\[|\.)?/g;function Rh(n,e){n.seq.push(e),n.map[e.id]=e}function _M(n,e,t){const i=n.name,s=i.length;for(Ml.lastIndex=0;;){const r=Ml.exec(i),a=Ml.lastIndex;let o=r[1];const l=r[2]==="]",u=r[3];if(l&&(o=o|0),u===void 0||u==="["&&a+2===s){Rh(t,u===void 0?new mM(o,n,e):new gM(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new vM(o),Rh(t,h)),t=h}}}class Ho{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);_M(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Ch(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const xM=37297;let yM=0;function MM(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function SM(n){const e=ut.getPrimaries(ut.workingColorSpace),t=ut.getPrimaries(n);let i;switch(e===t?i="":e===na&&t===ta?i="LinearDisplayP3ToLinearSRGB":e===ta&&t===na&&(i="LinearSRGBToLinearDisplayP3"),n){case Bi:case Sa:return[i,"LinearTransferOETF"];case xn:case Mc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ph(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+MM(n.getShaderSource(e),a)}else return s}function EM(n,e){const t=SM(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function TM(n,e){let t;switch(e){case E0:t="Linear";break;case T0:t="Reinhard";break;case b0:t="OptimizedCineon";break;case Td:t="ACESFilmic";break;case A0:t="AgX";break;case R0:t="Neutral";break;case w0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function bM(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.alphaToCoverage||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(qs).join(`
`)}function wM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qs).join(`
`)}function AM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function RM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function qs(n){return n!==""}function Lh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ih(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const CM=/^[ \t]*#include +<([\w\d./]+)>/gm;function $l(n){return n.replace(CM,LM)}const PM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function LM(n,e){let t=$e[e];if(t===void 0){const i=PM.get(e);if(i!==void 0)t=$e[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return $l(t)}const IM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dh(n){return n.replace(IM,DM)}function DM(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Uh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	`;return n.isWebGL2&&(e+=`precision ${n.precision} sampler3D;
		precision ${n.precision} sampler2DArray;
		precision ${n.precision} sampler2DShadow;
		precision ${n.precision} samplerCubeShadow;
		precision ${n.precision} sampler2DArrayShadow;
		precision ${n.precision} isampler2D;
		precision ${n.precision} isampler3D;
		precision ${n.precision} isamplerCube;
		precision ${n.precision} isampler2DArray;
		precision ${n.precision} usampler2D;
		precision ${n.precision} usampler3D;
		precision ${n.precision} usamplerCube;
		precision ${n.precision} usampler2DArray;
		`),n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function UM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sd?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Zg?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ci&&(e="SHADOWMAP_TYPE_VSM"),e}function NM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Js:case Qs:e="ENVMAP_TYPE_CUBE";break;case Ma:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Qs:e="ENVMAP_MODE_REFRACTION";break}return e}function FM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ed:e="ENVMAP_BLENDING_MULTIPLY";break;case M0:e="ENVMAP_BLENDING_MIX";break;case S0:e="ENVMAP_BLENDING_ADD";break}return e}function BM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function zM(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=UM(t),u=NM(t),c=OM(t),h=FM(t),d=BM(t),m=t.isWebGL2?"":bM(t),v=wM(t),g=AM(r),p=s.createProgram();let f,M,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qs).join(`
`),f.length>0&&(f+=`
`),M=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(qs).join(`
`),M.length>0&&(M+=`
`)):(f=[Uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qs).join(`
`),M=[m,Uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Di?"#define TONE_MAPPING":"",t.toneMapping!==Di?$e.tonemapping_pars_fragment:"",t.toneMapping!==Di?TM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,EM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qs).join(`
`)),a=$l(a),a=Lh(a,t),a=Ih(a,t),o=$l(o),o=Lh(o,t),o=Ih(o,t),a=Dh(a),o=Dh(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Zu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const E=x+f+a,U=x+M+o,P=Ch(s,s.VERTEX_SHADER,E),R=Ch(s,s.FRAGMENT_SHADER,U);s.attachShader(p,P),s.attachShader(p,R),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function O(L){if(n.debug.checkShaderErrors){const z=s.getProgramInfoLog(p).trim(),D=s.getShaderInfoLog(P).trim(),q=s.getShaderInfoLog(R).trim();let G=!0,J=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,P,R);else{const F=Ph(s,P,"vertex"),Q=Ph(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+z+`
`+F+`
`+Q)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(D===""||q==="")&&(J=!1);J&&(L.diagnostics={runnable:G,programLog:z,vertexShader:{log:D,prefix:f},fragmentShader:{log:q,prefix:M}})}s.deleteShader(P),s.deleteShader(R),k=new Ho(s,p),y=RM(s,p)}let k;this.getUniforms=function(){return k===void 0&&O(this),k};let y;this.getAttributes=function(){return y===void 0&&O(this),y};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(p,xM)),T},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yM++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=P,this.fragmentShader=R,this}let GM=0;class HM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new VM(e),t.set(e,i)),i}}class VM{constructor(e){this.id=GM++,this.code=e,this.usedTimes=0}}function kM(n,e,t,i,s,r,a){const o=new Hd,l=new HM,u=new Set,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,m=s.vertexTextures;let v=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return u.add(y),y===0?"uv":`uv${y}`}function f(y,T,L,z,D){const q=z.fog,G=D.geometry,J=y.isMeshStandardMaterial?z.environment:null,F=(y.isMeshStandardMaterial?t:e).get(y.envMap||J),Q=F&&F.mapping===Ma?F.image.height:null,oe=g[y.type];y.precision!==null&&(v=s.getMaxPrecision(y.precision),v!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",v,"instead."));const fe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ye=fe!==void 0?fe.length:0;let ze=0;G.morphAttributes.position!==void 0&&(ze=1),G.morphAttributes.normal!==void 0&&(ze=2),G.morphAttributes.color!==void 0&&(ze=3);let te,de,Se,Ge;if(oe){const lt=Xn[oe];te=lt.vertexShader,de=lt.fragmentShader}else te=y.vertexShader,de=y.fragmentShader,l.update(y),Se=l.getVertexShaderID(y),Ge=l.getFragmentShaderID(y);const Ue=n.getRenderTarget(),Re=D.isInstancedMesh===!0,et=D.isBatchedMesh===!0,A=!!y.map,S=!!y.matcap,K=!!F,Y=!!y.aoMap,$=!!y.lightMap,W=!!y.bumpMap,ue=!!y.normalMap,le=!!y.displacementMap,ce=!!y.emissiveMap,ie=!!y.metalnessMap,b=!!y.roughnessMap,_=y.anisotropy>0,B=y.clearcoat>0,V=y.iridescence>0,ae=y.sheen>0,re=y.transmission>0,Ee=_&&!!y.anisotropyMap,we=B&&!!y.clearcoatMap,pe=B&&!!y.clearcoatNormalMap,xe=B&&!!y.clearcoatRoughnessMap,Oe=V&&!!y.iridescenceMap,ge=V&&!!y.iridescenceThicknessMap,gt=ae&&!!y.sheenColorMap,Fe=ae&&!!y.sheenRoughnessMap,Le=!!y.specularMap,Pe=!!y.specularColorMap,De=!!y.specularIntensityMap,I=re&&!!y.transmissionMap,he=re&&!!y.thicknessMap,Ie=!!y.gradientMap,N=!!y.alphaMap,ve=y.alphaTest>0,j=!!y.alphaHash,me=!!y.extensions;let Te=Di;y.toneMapped&&(Ue===null||Ue.isXRRenderTarget===!0)&&(Te=n.toneMapping);const Qe={isWebGL2:h,shaderID:oe,shaderType:y.type,shaderName:y.name,vertexShader:te,fragmentShader:de,defines:y.defines,customVertexShaderID:Se,customFragmentShaderID:Ge,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:v,batching:et,instancing:Re,instancingColor:Re&&D.instanceColor!==null,instancingMorph:Re&&D.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Ue===null?n.outputColorSpace:Ue.isXRRenderTarget===!0?Ue.texture.colorSpace:Bi,alphaToCoverage:!!y.alphaToCoverage,map:A,matcap:S,envMap:K,envMapMode:K&&F.mapping,envMapCubeUVHeight:Q,aoMap:Y,lightMap:$,bumpMap:W,normalMap:ue,displacementMap:m&&le,emissiveMap:ce,normalMapObjectSpace:ue&&y.normalMapType===B0,normalMapTangentSpace:ue&&y.normalMapType===Ud,metalnessMap:ie,roughnessMap:b,anisotropy:_,anisotropyMap:Ee,clearcoat:B,clearcoatMap:we,clearcoatNormalMap:pe,clearcoatRoughnessMap:xe,iridescence:V,iridescenceMap:Oe,iridescenceThicknessMap:ge,sheen:ae,sheenColorMap:gt,sheenRoughnessMap:Fe,specularMap:Le,specularColorMap:Pe,specularIntensityMap:De,transmission:re,transmissionMap:I,thicknessMap:he,gradientMap:Ie,opaque:y.transparent===!1&&y.blending===js&&y.alphaToCoverage===!1,alphaMap:N,alphaTest:ve,alphaHash:j,combine:y.combine,mapUv:A&&p(y.map.channel),aoMapUv:Y&&p(y.aoMap.channel),lightMapUv:$&&p(y.lightMap.channel),bumpMapUv:W&&p(y.bumpMap.channel),normalMapUv:ue&&p(y.normalMap.channel),displacementMapUv:le&&p(y.displacementMap.channel),emissiveMapUv:ce&&p(y.emissiveMap.channel),metalnessMapUv:ie&&p(y.metalnessMap.channel),roughnessMapUv:b&&p(y.roughnessMap.channel),anisotropyMapUv:Ee&&p(y.anisotropyMap.channel),clearcoatMapUv:we&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:pe&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&p(y.sheenRoughnessMap.channel),specularMapUv:Le&&p(y.specularMap.channel),specularColorMapUv:Pe&&p(y.specularColorMap.channel),specularIntensityMapUv:De&&p(y.specularIntensityMap.channel),transmissionMapUv:I&&p(y.transmissionMap.channel),thicknessMapUv:he&&p(y.thicknessMap.channel),alphaMapUv:N&&p(y.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ue||_),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!G.attributes.uv&&(A||N),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:D.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:ze,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Te,useLegacyLights:n._useLegacyLights,decodeVideoTexture:A&&y.map.isVideoTexture===!0&&ut.getTransfer(y.map.colorSpace)===_t,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===en,flipSided:y.side===Ft,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:me&&y.extensions.derivatives===!0,extensionFragDepth:me&&y.extensions.fragDepth===!0,extensionDrawBuffers:me&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:me&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:me&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:me&&y.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Qe.vertexUv1s=u.has(1),Qe.vertexUv2s=u.has(2),Qe.vertexUv3s=u.has(3),u.clear(),Qe}function M(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)T.push(L),T.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(x(T,y),E(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function x(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function E(y,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.instancingMorph&&o.enable(4),T.matcap&&o.enable(5),T.envMap&&o.enable(6),T.normalMapObjectSpace&&o.enable(7),T.normalMapTangentSpace&&o.enable(8),T.clearcoat&&o.enable(9),T.iridescence&&o.enable(10),T.alphaTest&&o.enable(11),T.vertexColors&&o.enable(12),T.vertexAlphas&&o.enable(13),T.vertexUv1s&&o.enable(14),T.vertexUv2s&&o.enable(15),T.vertexUv3s&&o.enable(16),T.vertexTangents&&o.enable(17),T.anisotropy&&o.enable(18),T.alphaHash&&o.enable(19),T.batching&&o.enable(20),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.alphaToCoverage&&o.enable(20),y.push(o.mask)}function U(y){const T=g[y.type];let L;if(T){const z=Xn[T];L=ra.clone(z.uniforms)}else L=y.uniforms;return L}function P(y,T){let L;for(let z=0,D=c.length;z<D;z++){const q=c[z];if(q.cacheKey===T){L=q,++L.usedTimes;break}}return L===void 0&&(L=new zM(n,T,y,r),c.push(L)),L}function R(y){if(--y.usedTimes===0){const T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),y.destroy()}}function O(y){l.remove(y)}function k(){l.dispose()}return{getParameters:f,getProgramCacheKey:M,getUniforms:U,acquireProgram:P,releaseProgram:R,releaseShaderCache:O,programs:c,dispose:k}}function WM(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function XM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Nh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Oh(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h,d,m,v,g,p){let f=n[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:m,groupOrder:v,renderOrder:h.renderOrder,z:g,group:p},n[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=m,f.groupOrder=v,f.renderOrder=h.renderOrder,f.z=g,f.group=p),e++,f}function o(h,d,m,v,g,p){const f=a(h,d,m,v,g,p);m.transmission>0?i.push(f):m.transparent===!0?s.push(f):t.push(f)}function l(h,d,m,v,g,p){const f=a(h,d,m,v,g,p);m.transmission>0?i.unshift(f):m.transparent===!0?s.unshift(f):t.unshift(f)}function u(h,d){t.length>1&&t.sort(h||XM),i.length>1&&i.sort(d||Nh),s.length>1&&s.sort(d||Nh)}function c(){for(let h=e,d=n.length;h<d;h++){const m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:c,sort:u}}function qM(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Oh,n.set(i,[a])):s>=r.length?(a=new Oh,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function YM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new je};break;case"SpotLight":t={position:new C,direction:new C,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new C,halfWidth:new C,halfHeight:new C};break}return n[e.id]=t,t}}}function jM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let KM=0;function $M(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ZM(n,e){const t=new YM,i=jM(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)s.probe.push(new C);const r=new C,a=new ht,o=new ht;function l(c,h){let d=0,m=0,v=0;for(let L=0;L<9;L++)s.probe[L].set(0,0,0);let g=0,p=0,f=0,M=0,x=0,E=0,U=0,P=0,R=0,O=0,k=0;c.sort($M);const y=h===!0?Math.PI:1;for(let L=0,z=c.length;L<z;L++){const D=c[L],q=D.color,G=D.intensity,J=D.distance,F=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=q.r*G*y,m+=q.g*G*y,v+=q.b*G*y;else if(D.isLightProbe){for(let Q=0;Q<9;Q++)s.probe[Q].addScaledVector(D.sh.coefficients[Q],G);k++}else if(D.isDirectionalLight){const Q=t.get(D);if(Q.color.copy(D.color).multiplyScalar(D.intensity*y),D.castShadow){const oe=D.shadow,fe=i.get(D);fe.shadowBias=oe.bias,fe.shadowNormalBias=oe.normalBias,fe.shadowRadius=oe.radius,fe.shadowMapSize=oe.mapSize,s.directionalShadow[g]=fe,s.directionalShadowMap[g]=F,s.directionalShadowMatrix[g]=D.shadow.matrix,E++}s.directional[g]=Q,g++}else if(D.isSpotLight){const Q=t.get(D);Q.position.setFromMatrixPosition(D.matrixWorld),Q.color.copy(q).multiplyScalar(G*y),Q.distance=J,Q.coneCos=Math.cos(D.angle),Q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Q.decay=D.decay,s.spot[f]=Q;const oe=D.shadow;if(D.map&&(s.spotLightMap[R]=D.map,R++,oe.updateMatrices(D),D.castShadow&&O++),s.spotLightMatrix[f]=oe.matrix,D.castShadow){const fe=i.get(D);fe.shadowBias=oe.bias,fe.shadowNormalBias=oe.normalBias,fe.shadowRadius=oe.radius,fe.shadowMapSize=oe.mapSize,s.spotShadow[f]=fe,s.spotShadowMap[f]=F,P++}f++}else if(D.isRectAreaLight){const Q=t.get(D);Q.color.copy(q).multiplyScalar(G),Q.halfWidth.set(D.width*.5,0,0),Q.halfHeight.set(0,D.height*.5,0),s.rectArea[M]=Q,M++}else if(D.isPointLight){const Q=t.get(D);if(Q.color.copy(D.color).multiplyScalar(D.intensity*y),Q.distance=D.distance,Q.decay=D.decay,D.castShadow){const oe=D.shadow,fe=i.get(D);fe.shadowBias=oe.bias,fe.shadowNormalBias=oe.normalBias,fe.shadowRadius=oe.radius,fe.shadowMapSize=oe.mapSize,fe.shadowCameraNear=oe.camera.near,fe.shadowCameraFar=oe.camera.far,s.pointShadow[p]=fe,s.pointShadowMap[p]=F,s.pointShadowMatrix[p]=D.shadow.matrix,U++}s.point[p]=Q,p++}else if(D.isHemisphereLight){const Q=t.get(D);Q.skyColor.copy(D.color).multiplyScalar(G*y),Q.groundColor.copy(D.groundColor).multiplyScalar(G*y),s.hemi[x]=Q,x++}}M>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Me.LTC_FLOAT_1,s.rectAreaLTC2=Me.LTC_FLOAT_2):(s.rectAreaLTC1=Me.LTC_HALF_1,s.rectAreaLTC2=Me.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Me.LTC_FLOAT_1,s.rectAreaLTC2=Me.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=Me.LTC_HALF_1,s.rectAreaLTC2=Me.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=m,s.ambient[2]=v;const T=s.hash;(T.directionalLength!==g||T.pointLength!==p||T.spotLength!==f||T.rectAreaLength!==M||T.hemiLength!==x||T.numDirectionalShadows!==E||T.numPointShadows!==U||T.numSpotShadows!==P||T.numSpotMaps!==R||T.numLightProbes!==k)&&(s.directional.length=g,s.spot.length=f,s.rectArea.length=M,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=E,s.directionalShadowMap.length=E,s.pointShadow.length=U,s.pointShadowMap.length=U,s.spotShadow.length=P,s.spotShadowMap.length=P,s.directionalShadowMatrix.length=E,s.pointShadowMatrix.length=U,s.spotLightMatrix.length=P+R-O,s.spotLightMap.length=R,s.numSpotLightShadowsWithMaps=O,s.numLightProbes=k,T.directionalLength=g,T.pointLength=p,T.spotLength=f,T.rectAreaLength=M,T.hemiLength=x,T.numDirectionalShadows=E,T.numPointShadows=U,T.numSpotShadows=P,T.numSpotMaps=R,T.numLightProbes=k,s.version=KM++)}function u(c,h){let d=0,m=0,v=0,g=0,p=0;const f=h.matrixWorldInverse;for(let M=0,x=c.length;M<x;M++){const E=c[M];if(E.isDirectionalLight){const U=s.directional[d];U.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),U.direction.sub(r),U.direction.transformDirection(f),d++}else if(E.isSpotLight){const U=s.spot[v];U.position.setFromMatrixPosition(E.matrixWorld),U.position.applyMatrix4(f),U.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),U.direction.sub(r),U.direction.transformDirection(f),v++}else if(E.isRectAreaLight){const U=s.rectArea[g];U.position.setFromMatrixPosition(E.matrixWorld),U.position.applyMatrix4(f),o.identity(),a.copy(E.matrixWorld),a.premultiply(f),o.extractRotation(a),U.halfWidth.set(E.width*.5,0,0),U.halfHeight.set(0,E.height*.5,0),U.halfWidth.applyMatrix4(o),U.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const U=s.point[m];U.position.setFromMatrixPosition(E.matrixWorld),U.position.applyMatrix4(f),m++}else if(E.isHemisphereLight){const U=s.hemi[p];U.direction.setFromMatrixPosition(E.matrixWorld),U.direction.transformDirection(f),p++}}}return{setup:l,setupView:u,state:s}}function Fh(n,e){const t=new ZM(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(h){i.push(h)}function o(h){s.push(h)}function l(h){t.setup(i,h)}function u(h){t.setupView(i,h)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o}}function JM(n,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Fh(n,e),t.set(r,[l])):a>=o.length?(l=new Fh(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class QM extends zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=O0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eS extends zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const tS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function iS(n,e,t){let i=new Ec;const s=new Ae,r=new Ae,a=new St,o=new QM({depthPacking:F0}),l=new eS,u={},c=t.maxTextureSize,h={[Fi]:Ft,[Ft]:Fi,[en]:en},d=new mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:tS,fragmentShader:nS}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const v=new Ct;v.setAttribute("position",new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new _e(v,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sd;let f=this.type;this.render=function(P,R,O){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;const k=n.getRenderTarget(),y=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),L=n.state;L.setBlending(mi),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const z=f!==ci&&this.type===ci,D=f===ci&&this.type!==ci;for(let q=0,G=P.length;q<G;q++){const J=P[q],F=J.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const Q=F.getFrameExtents();if(s.multiply(Q),r.copy(F.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/Q.x),s.x=r.x*Q.x,F.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/Q.y),s.y=r.y*Q.y,F.mapSize.y=r.y)),F.map===null||z===!0||D===!0){const fe=this.type!==ci?{minFilter:kt,magFilter:kt}:{};F.map!==null&&F.map.dispose(),F.map=new Gn(s.x,s.y,fe),F.map.texture.name=J.name+".shadowMap",F.camera.updateProjectionMatrix()}n.setRenderTarget(F.map),n.clear();const oe=F.getViewportCount();for(let fe=0;fe<oe;fe++){const ye=F.getViewport(fe);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),L.viewport(a),F.updateMatrices(J,fe),i=F.getFrustum(),E(R,O,F.camera,J,this.type)}F.isPointLightShadow!==!0&&this.type===ci&&M(F,O),F.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(k,y,T)};function M(P,R){const O=e.update(g);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,m.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Gn(s.x,s.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(R,null,O,d,g,null),m.uniforms.shadow_pass.value=P.mapPass.texture,m.uniforms.resolution.value=P.mapSize,m.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(R,null,O,m,g,null)}function x(P,R,O,k){let y=null;const T=O.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(T!==void 0)y=T;else if(y=O.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const L=y.uuid,z=R.uuid;let D=u[L];D===void 0&&(D={},u[L]=D);let q=D[z];q===void 0&&(q=y.clone(),D[z]=q,R.addEventListener("dispose",U)),y=q}if(y.visible=R.visible,y.wireframe=R.wireframe,k===ci?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:h[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,O.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const L=n.properties.get(y);L.light=O}return y}function E(P,R,O,k,y){if(P.visible===!1)return;if(P.layers.test(R.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&y===ci)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,P.matrixWorld);const z=e.update(P),D=P.material;if(Array.isArray(D)){const q=z.groups;for(let G=0,J=q.length;G<J;G++){const F=q[G],Q=D[F.materialIndex];if(Q&&Q.visible){const oe=x(P,Q,k,y);P.onBeforeShadow(n,P,R,O,z,oe,F),n.renderBufferDirect(O,null,z,oe,P,F),P.onAfterShadow(n,P,R,O,z,oe,F)}}}else if(D.visible){const q=x(P,D,k,y);P.onBeforeShadow(n,P,R,O,z,q,null),n.renderBufferDirect(O,null,z,q,P,null),P.onAfterShadow(n,P,R,O,z,q,null)}}const L=P.children;for(let z=0,D=L.length;z<D;z++)E(L[z],R,O,k,y)}function U(P){P.target.removeEventListener("dispose",U);for(const O in u){const k=u[O],y=P.target.uuid;y in k&&(k[y].dispose(),delete k[y])}}}function sS(n,e,t){const i=t.isWebGL2;function s(){let N=!1;const ve=new St;let j=null;const me=new St(0,0,0,0);return{setMask:function(Te){j!==Te&&!N&&(n.colorMask(Te,Te,Te,Te),j=Te)},setLocked:function(Te){N=Te},setClear:function(Te,Qe,lt,ft,bt){bt===!0&&(Te*=ft,Qe*=ft,lt*=ft),ve.set(Te,Qe,lt,ft),me.equals(ve)===!1&&(n.clearColor(Te,Qe,lt,ft),me.copy(ve))},reset:function(){N=!1,j=null,me.set(-1,0,0,0)}}}function r(){let N=!1,ve=null,j=null,me=null;return{setTest:function(Te){Te?Re(n.DEPTH_TEST):et(n.DEPTH_TEST)},setMask:function(Te){ve!==Te&&!N&&(n.depthMask(Te),ve=Te)},setFunc:function(Te){if(j!==Te){switch(Te){case p0:n.depthFunc(n.NEVER);break;case m0:n.depthFunc(n.ALWAYS);break;case g0:n.depthFunc(n.LESS);break;case Qo:n.depthFunc(n.LEQUAL);break;case v0:n.depthFunc(n.EQUAL);break;case _0:n.depthFunc(n.GEQUAL);break;case x0:n.depthFunc(n.GREATER);break;case y0:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=Te}},setLocked:function(Te){N=Te},setClear:function(Te){me!==Te&&(n.clearDepth(Te),me=Te)},reset:function(){N=!1,ve=null,j=null,me=null}}}function a(){let N=!1,ve=null,j=null,me=null,Te=null,Qe=null,lt=null,ft=null,bt=null;return{setTest:function(tt){N||(tt?Re(n.STENCIL_TEST):et(n.STENCIL_TEST))},setMask:function(tt){ve!==tt&&!N&&(n.stencilMask(tt),ve=tt)},setFunc:function(tt,vt,qt){(j!==tt||me!==vt||Te!==qt)&&(n.stencilFunc(tt,vt,qt),j=tt,me=vt,Te=qt)},setOp:function(tt,vt,qt){(Qe!==tt||lt!==vt||ft!==qt)&&(n.stencilOp(tt,vt,qt),Qe=tt,lt=vt,ft=qt)},setLocked:function(tt){N=tt},setClear:function(tt){bt!==tt&&(n.clearStencil(tt),bt=tt)},reset:function(){N=!1,ve=null,j=null,me=null,Te=null,Qe=null,lt=null,ft=null,bt=null}}}const o=new s,l=new r,u=new a,c=new WeakMap,h=new WeakMap;let d={},m={},v=new WeakMap,g=[],p=null,f=!1,M=null,x=null,E=null,U=null,P=null,R=null,O=null,k=new je(0,0,0),y=0,T=!1,L=null,z=null,D=null,q=null,G=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,Q=0;const oe=n.getParameter(n.VERSION);oe.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(oe)[1]),F=Q>=1):oe.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),F=Q>=2);let fe=null,ye={};const ze=n.getParameter(n.SCISSOR_BOX),te=n.getParameter(n.VIEWPORT),de=new St().fromArray(ze),Se=new St().fromArray(te);function Ge(N,ve,j,me){const Te=new Uint8Array(4),Qe=n.createTexture();n.bindTexture(N,Qe),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let lt=0;lt<j;lt++)i&&(N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY)?n.texImage3D(ve,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,Te):n.texImage2D(ve+lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Te);return Qe}const Ue={};Ue[n.TEXTURE_2D]=Ge(n.TEXTURE_2D,n.TEXTURE_2D,1),Ue[n.TEXTURE_CUBE_MAP]=Ge(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ue[n.TEXTURE_2D_ARRAY]=Ge(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ue[n.TEXTURE_3D]=Ge(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),u.setClear(0),Re(n.DEPTH_TEST),l.setFunc(Qo),le(!1),ce(xu),Re(n.CULL_FACE),W(mi);function Re(N){d[N]!==!0&&(n.enable(N),d[N]=!0)}function et(N){d[N]!==!1&&(n.disable(N),d[N]=!1)}function A(N,ve){return m[N]!==ve?(n.bindFramebuffer(N,ve),m[N]=ve,i&&(N===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=ve),N===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=ve)),!0):!1}function S(N,ve){let j=g,me=!1;if(N){j=v.get(ve),j===void 0&&(j=[],v.set(ve,j));const Te=N.textures;if(j.length!==Te.length||j[0]!==n.COLOR_ATTACHMENT0){for(let Qe=0,lt=Te.length;Qe<lt;Qe++)j[Qe]=n.COLOR_ATTACHMENT0+Qe;j.length=Te.length,me=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,me=!0);if(me)if(t.isWebGL2)n.drawBuffers(j);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(j);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function K(N){return p!==N?(n.useProgram(N),p=N,!0):!1}const Y={[is]:n.FUNC_ADD,[Qg]:n.FUNC_SUBTRACT,[e0]:n.FUNC_REVERSE_SUBTRACT};if(i)Y[Su]=n.MIN,Y[Eu]=n.MAX;else{const N=e.get("EXT_blend_minmax");N!==null&&(Y[Su]=N.MIN_EXT,Y[Eu]=N.MAX_EXT)}const $={[t0]:n.ZERO,[n0]:n.ONE,[i0]:n.SRC_COLOR,[Gl]:n.SRC_ALPHA,[c0]:n.SRC_ALPHA_SATURATE,[a0]:n.DST_COLOR,[r0]:n.DST_ALPHA,[s0]:n.ONE_MINUS_SRC_COLOR,[Hl]:n.ONE_MINUS_SRC_ALPHA,[l0]:n.ONE_MINUS_DST_COLOR,[o0]:n.ONE_MINUS_DST_ALPHA,[u0]:n.CONSTANT_COLOR,[h0]:n.ONE_MINUS_CONSTANT_COLOR,[f0]:n.CONSTANT_ALPHA,[d0]:n.ONE_MINUS_CONSTANT_ALPHA};function W(N,ve,j,me,Te,Qe,lt,ft,bt,tt){if(N===mi){f===!0&&(et(n.BLEND),f=!1);return}if(f===!1&&(Re(n.BLEND),f=!0),N!==Jg){if(N!==M||tt!==T){if((x!==is||P!==is)&&(n.blendEquation(n.FUNC_ADD),x=is,P=is),tt)switch(N){case js:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cn:n.blendFunc(n.ONE,n.ONE);break;case yu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Mu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case js:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case yu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Mu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}E=null,U=null,R=null,O=null,k.set(0,0,0),y=0,M=N,T=tt}return}Te=Te||ve,Qe=Qe||j,lt=lt||me,(ve!==x||Te!==P)&&(n.blendEquationSeparate(Y[ve],Y[Te]),x=ve,P=Te),(j!==E||me!==U||Qe!==R||lt!==O)&&(n.blendFuncSeparate($[j],$[me],$[Qe],$[lt]),E=j,U=me,R=Qe,O=lt),(ft.equals(k)===!1||bt!==y)&&(n.blendColor(ft.r,ft.g,ft.b,bt),k.copy(ft),y=bt),M=N,T=!1}function ue(N,ve){N.side===en?et(n.CULL_FACE):Re(n.CULL_FACE);let j=N.side===Ft;ve&&(j=!j),le(j),N.blending===js&&N.transparent===!1?W(mi):W(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),o.setMask(N.colorWrite);const me=N.stencilWrite;u.setTest(me),me&&(u.setMask(N.stencilWriteMask),u.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),u.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),b(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Re(n.SAMPLE_ALPHA_TO_COVERAGE):et(n.SAMPLE_ALPHA_TO_COVERAGE)}function le(N){L!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),L=N)}function ce(N){N!==Kg?(Re(n.CULL_FACE),N!==z&&(N===xu?n.cullFace(n.BACK):N===$g?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):et(n.CULL_FACE),z=N}function ie(N){N!==D&&(F&&n.lineWidth(N),D=N)}function b(N,ve,j){N?(Re(n.POLYGON_OFFSET_FILL),(q!==ve||G!==j)&&(n.polygonOffset(ve,j),q=ve,G=j)):et(n.POLYGON_OFFSET_FILL)}function _(N){N?Re(n.SCISSOR_TEST):et(n.SCISSOR_TEST)}function B(N){N===void 0&&(N=n.TEXTURE0+J-1),fe!==N&&(n.activeTexture(N),fe=N)}function V(N,ve,j){j===void 0&&(fe===null?j=n.TEXTURE0+J-1:j=fe);let me=ye[j];me===void 0&&(me={type:void 0,texture:void 0},ye[j]=me),(me.type!==N||me.texture!==ve)&&(fe!==j&&(n.activeTexture(j),fe=j),n.bindTexture(N,ve||Ue[N]),me.type=N,me.texture=ve)}function ae(){const N=ye[fe];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function re(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pe(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Oe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ge(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function gt(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Fe(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Le(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(N){de.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),de.copy(N))}function De(N){Se.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Se.copy(N))}function I(N,ve){let j=h.get(ve);j===void 0&&(j=new WeakMap,h.set(ve,j));let me=j.get(N);me===void 0&&(me=n.getUniformBlockIndex(ve,N.name),j.set(N,me))}function he(N,ve){const me=h.get(ve).get(N);c.get(ve)!==me&&(n.uniformBlockBinding(ve,me,N.__bindingPointIndex),c.set(ve,me))}function Ie(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},fe=null,ye={},m={},v=new WeakMap,g=[],p=null,f=!1,M=null,x=null,E=null,U=null,P=null,R=null,O=null,k=new je(0,0,0),y=0,T=!1,L=null,z=null,D=null,q=null,G=null,de.set(0,0,n.canvas.width,n.canvas.height),Se.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),u.reset()}return{buffers:{color:o,depth:l,stencil:u},enable:Re,disable:et,bindFramebuffer:A,drawBuffers:S,useProgram:K,setBlending:W,setMaterial:ue,setFlipSided:le,setCullFace:ce,setLineWidth:ie,setPolygonOffset:b,setScissorTest:_,activeTexture:B,bindTexture:V,unbindTexture:ae,compressedTexImage2D:re,compressedTexImage3D:Ee,texImage2D:Fe,texImage3D:Le,updateUBOMapping:I,uniformBlockBinding:he,texStorage2D:ge,texStorage3D:gt,texSubImage2D:we,texSubImage3D:pe,compressedTexSubImage2D:xe,compressedTexSubImage3D:Oe,scissor:Pe,viewport:De,reset:Ie}}function rS(n,e,t,i,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ae,h=new WeakMap;let d;const m=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return v?new OffscreenCanvas(b,_):qr("canvas")}function p(b,_,B,V){let ae=1;const re=ie(b);if((re.width>V||re.height>V)&&(ae=V/Math.max(re.width,re.height)),ae<1||_===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Ee=_?sa:Math.floor,we=Ee(ae*re.width),pe=Ee(ae*re.height);d===void 0&&(d=g(we,pe));const xe=B?g(we,pe):d;return xe.width=we,xe.height=pe,xe.getContext("2d").drawImage(b,0,0,we,pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+we+"x"+pe+")."),xe}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),b;return b}function f(b){const _=ie(b);return Yl(_.width)&&Yl(_.height)}function M(b){return o?!1:b.wrapS!==wn||b.wrapT!==wn||b.minFilter!==kt&&b.minFilter!==Vt}function x(b,_){return b.generateMipmaps&&_&&b.minFilter!==kt&&b.minFilter!==Vt}function E(b){n.generateMipmap(b)}function U(b,_,B,V,ae=!1){if(o===!1)return _;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let re=_;if(_===n.RED&&(B===n.FLOAT&&(re=n.R32F),B===n.HALF_FLOAT&&(re=n.R16F),B===n.UNSIGNED_BYTE&&(re=n.R8)),_===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(re=n.R8UI),B===n.UNSIGNED_SHORT&&(re=n.R16UI),B===n.UNSIGNED_INT&&(re=n.R32UI),B===n.BYTE&&(re=n.R8I),B===n.SHORT&&(re=n.R16I),B===n.INT&&(re=n.R32I)),_===n.RG&&(B===n.FLOAT&&(re=n.RG32F),B===n.HALF_FLOAT&&(re=n.RG16F),B===n.UNSIGNED_BYTE&&(re=n.RG8)),_===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(re=n.RG8UI),B===n.UNSIGNED_SHORT&&(re=n.RG16UI),B===n.UNSIGNED_INT&&(re=n.RG32UI),B===n.BYTE&&(re=n.RG8I),B===n.SHORT&&(re=n.RG16I),B===n.INT&&(re=n.RG32I)),_===n.RGBA){const Ee=ae?ea:ut.getTransfer(V);B===n.FLOAT&&(re=n.RGBA32F),B===n.HALF_FLOAT&&(re=n.RGBA16F),B===n.UNSIGNED_BYTE&&(re=Ee===_t?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(re=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(re=n.RGB5_A1)}return(re===n.R16F||re===n.R32F||re===n.RG16F||re===n.RG32F||re===n.RGBA16F||re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function P(b,_,B){return x(b,B)===!0||b.isFramebufferTexture&&b.minFilter!==kt&&b.minFilter!==Vt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function R(b){return b===kt||b===Tu||b===hr?n.NEAREST:n.LINEAR}function O(b){const _=b.target;_.removeEventListener("dispose",O),y(_),_.isVideoTexture&&h.delete(_)}function k(b){const _=b.target;_.removeEventListener("dispose",k),L(_)}function y(b){const _=i.get(b);if(_.__webglInit===void 0)return;const B=b.source,V=m.get(B);if(V){const ae=V[_.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&T(b),Object.keys(V).length===0&&m.delete(B)}i.remove(b)}function T(b){const _=i.get(b);n.deleteTexture(_.__webglTexture);const B=b.source,V=m.get(B);delete V[_.__cacheKey],a.memory.textures--}function L(b){const _=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let ae=0;ae<_.__webglFramebuffer[V].length;ae++)n.deleteFramebuffer(_.__webglFramebuffer[V][ae]);else n.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)n.deleteFramebuffer(_.__webglFramebuffer[V]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=b.textures;for(let V=0,ae=B.length;V<ae;V++){const re=i.get(B[V]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),a.memory.textures--),i.remove(B[V])}i.remove(b)}let z=0;function D(){z=0}function q(){const b=z;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),z+=1,b}function G(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function J(b,_){const B=i.get(b);if(b.isVideoTexture&&le(b),b.isRenderTargetTexture===!1&&b.version>0&&B.__version!==b.version){const V=b.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(B,b,_);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+_)}function F(b,_){const B=i.get(b);if(b.version>0&&B.__version!==b.version){Se(B,b,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+_)}function Q(b,_){const B=i.get(b);if(b.version>0&&B.__version!==b.version){Se(B,b,_);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+_)}function oe(b,_){const B=i.get(b);if(b.version>0&&B.__version!==b.version){Ge(B,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+_)}const fe={[Ks]:n.REPEAT,[wn]:n.CLAMP_TO_EDGE,[Wl]:n.MIRRORED_REPEAT},ye={[kt]:n.NEAREST,[Tu]:n.NEAREST_MIPMAP_NEAREST,[hr]:n.NEAREST_MIPMAP_LINEAR,[Vt]:n.LINEAR,[qa]:n.LINEAR_MIPMAP_NEAREST,[jn]:n.LINEAR_MIPMAP_LINEAR},ze={[z0]:n.NEVER,[X0]:n.ALWAYS,[G0]:n.LESS,[Nd]:n.LEQUAL,[H0]:n.EQUAL,[W0]:n.GEQUAL,[V0]:n.GREATER,[k0]:n.NOTEQUAL};function te(b,_,B){if(_.type===Yn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Vt||_.magFilter===qa||_.magFilter===hr||_.magFilter===jn||_.minFilter===Vt||_.minFilter===qa||_.minFilter===hr||_.minFilter===jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),B?(n.texParameteri(b,n.TEXTURE_WRAP_S,fe[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,fe[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,fe[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,ye[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,ye[_.minFilter])):(n.texParameteri(b,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(b,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(_.wrapS!==wn||_.wrapT!==wn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,n.TEXTURE_MAG_FILTER,R(_.magFilter)),n.texParameteri(b,n.TEXTURE_MIN_FILTER,R(_.minFilter)),_.minFilter!==kt&&_.minFilter!==Vt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,ze[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===kt||_.minFilter!==hr&&_.minFilter!==jn||_.type===Yn&&e.has("OES_texture_float_linear")===!1||o===!1&&_.type===gi&&e.has("OES_texture_half_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function de(b,_){let B=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",O));const V=_.source;let ae=m.get(V);ae===void 0&&(ae={},m.set(V,ae));const re=G(_);if(re!==b.__cacheKey){ae[re]===void 0&&(ae[re]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ae[re].usedTimes++;const Ee=ae[b.__cacheKey];Ee!==void 0&&(ae[b.__cacheKey].usedTimes--,Ee.usedTimes===0&&T(_)),b.__cacheKey=re,b.__webglTexture=ae[re].texture}return B}function Se(b,_,B){let V=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=n.TEXTURE_3D);const ae=de(b,_),re=_.source;t.bindTexture(V,b.__webglTexture,n.TEXTURE0+B);const Ee=i.get(re);if(re.version!==Ee.__version||ae===!0){t.activeTexture(n.TEXTURE0+B);const we=ut.getPrimaries(ut.workingColorSpace),pe=_.colorSpace===Ci?null:ut.getPrimaries(_.colorSpace),xe=_.colorSpace===Ci||we===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Oe=M(_)&&f(_.image)===!1;let ge=p(_.image,Oe,!1,s.maxTextureSize);ge=ce(_,ge);const gt=f(ge)||o,Fe=r.convert(_.format,_.colorSpace);let Le=r.convert(_.type),Pe=U(_.internalFormat,Fe,Le,_.colorSpace,_.isVideoTexture);te(V,_,gt);let De;const I=_.mipmaps,he=o&&_.isVideoTexture!==!0&&Pe!==Dd,Ie=Ee.__version===void 0||ae===!0,N=re.dataReady,ve=P(_,ge,gt);if(_.isDepthTexture)Pe=n.DEPTH_COMPONENT,o?_.type===Yn?Pe=n.DEPTH_COMPONENT32F:_.type===Pi?Pe=n.DEPTH_COMPONENT24:_.type===ls?Pe=n.DEPTH24_STENCIL8:Pe=n.DEPTH_COMPONENT16:_.type===Yn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===cs&&Pe===n.DEPTH_COMPONENT&&_.type!==yc&&_.type!==Pi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=Pi,Le=r.convert(_.type)),_.format===er&&Pe===n.DEPTH_COMPONENT&&(Pe=n.DEPTH_STENCIL,_.type!==ls&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=ls,Le=r.convert(_.type))),Ie&&(he?t.texStorage2D(n.TEXTURE_2D,1,Pe,ge.width,ge.height):t.texImage2D(n.TEXTURE_2D,0,Pe,ge.width,ge.height,0,Fe,Le,null));else if(_.isDataTexture)if(I.length>0&&gt){he&&Ie&&t.texStorage2D(n.TEXTURE_2D,ve,Pe,I[0].width,I[0].height);for(let j=0,me=I.length;j<me;j++)De=I[j],he?N&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,De.width,De.height,Fe,Le,De.data):t.texImage2D(n.TEXTURE_2D,j,Pe,De.width,De.height,0,Fe,Le,De.data);_.generateMipmaps=!1}else he?(Ie&&t.texStorage2D(n.TEXTURE_2D,ve,Pe,ge.width,ge.height),N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge.width,ge.height,Fe,Le,ge.data)):t.texImage2D(n.TEXTURE_2D,0,Pe,ge.width,ge.height,0,Fe,Le,ge.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){he&&Ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,Pe,I[0].width,I[0].height,ge.depth);for(let j=0,me=I.length;j<me;j++)De=I[j],_.format!==Nn?Fe!==null?he?N&&t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,De.width,De.height,ge.depth,Fe,De.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,Pe,De.width,De.height,ge.depth,0,De.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,De.width,De.height,ge.depth,Fe,Le,De.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,Pe,De.width,De.height,ge.depth,0,Fe,Le,De.data)}else{he&&Ie&&t.texStorage2D(n.TEXTURE_2D,ve,Pe,I[0].width,I[0].height);for(let j=0,me=I.length;j<me;j++)De=I[j],_.format!==Nn?Fe!==null?he?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,De.width,De.height,Fe,De.data):t.compressedTexImage2D(n.TEXTURE_2D,j,Pe,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?N&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,De.width,De.height,Fe,Le,De.data):t.texImage2D(n.TEXTURE_2D,j,Pe,De.width,De.height,0,Fe,Le,De.data)}else if(_.isDataArrayTexture)he?(Ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,Pe,ge.width,ge.height,ge.depth),N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Fe,Le,ge.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Pe,ge.width,ge.height,ge.depth,0,Fe,Le,ge.data);else if(_.isData3DTexture)he?(Ie&&t.texStorage3D(n.TEXTURE_3D,ve,Pe,ge.width,ge.height,ge.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Fe,Le,ge.data)):t.texImage3D(n.TEXTURE_3D,0,Pe,ge.width,ge.height,ge.depth,0,Fe,Le,ge.data);else if(_.isFramebufferTexture){if(Ie)if(he)t.texStorage2D(n.TEXTURE_2D,ve,Pe,ge.width,ge.height);else{let j=ge.width,me=ge.height;for(let Te=0;Te<ve;Te++)t.texImage2D(n.TEXTURE_2D,Te,Pe,j,me,0,Fe,Le,null),j>>=1,me>>=1}}else if(I.length>0&&gt){if(he&&Ie){const j=ie(I[0]);t.texStorage2D(n.TEXTURE_2D,ve,Pe,j.width,j.height)}for(let j=0,me=I.length;j<me;j++)De=I[j],he?N&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,Fe,Le,De):t.texImage2D(n.TEXTURE_2D,j,Pe,Fe,Le,De);_.generateMipmaps=!1}else if(he){if(Ie){const j=ie(ge);t.texStorage2D(n.TEXTURE_2D,ve,Pe,j.width,j.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Fe,Le,ge)}else t.texImage2D(n.TEXTURE_2D,0,Pe,Fe,Le,ge);x(_,gt)&&E(V),Ee.__version=re.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Ge(b,_,B){if(_.image.length!==6)return;const V=de(b,_),ae=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+B);const re=i.get(ae);if(ae.version!==re.__version||V===!0){t.activeTexture(n.TEXTURE0+B);const Ee=ut.getPrimaries(ut.workingColorSpace),we=_.colorSpace===Ci?null:ut.getPrimaries(_.colorSpace),pe=_.colorSpace===Ci||Ee===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const xe=_.isCompressedTexture||_.image[0].isCompressedTexture,Oe=_.image[0]&&_.image[0].isDataTexture,ge=[];for(let j=0;j<6;j++)!xe&&!Oe?ge[j]=p(_.image[j],!1,!0,s.maxCubemapSize):ge[j]=Oe?_.image[j].image:_.image[j],ge[j]=ce(_,ge[j]);const gt=ge[0],Fe=f(gt)||o,Le=r.convert(_.format,_.colorSpace),Pe=r.convert(_.type),De=U(_.internalFormat,Le,Pe,_.colorSpace),I=o&&_.isVideoTexture!==!0,he=re.__version===void 0||V===!0,Ie=ae.dataReady;let N=P(_,gt,Fe);te(n.TEXTURE_CUBE_MAP,_,Fe);let ve;if(xe){I&&he&&t.texStorage2D(n.TEXTURE_CUBE_MAP,N,De,gt.width,gt.height);for(let j=0;j<6;j++){ve=ge[j].mipmaps;for(let me=0;me<ve.length;me++){const Te=ve[me];_.format!==Nn?Le!==null?I?Ie&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,Te.width,Te.height,Le,Te.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,De,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,Te.width,Te.height,Le,Pe,Te.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,De,Te.width,Te.height,0,Le,Pe,Te.data)}}}else{if(ve=_.mipmaps,I&&he){ve.length>0&&N++;const j=ie(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,N,De,j.width,j.height)}for(let j=0;j<6;j++)if(Oe){I?Ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ge[j].width,ge[j].height,Le,Pe,ge[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,De,ge[j].width,ge[j].height,0,Le,Pe,ge[j].data);for(let me=0;me<ve.length;me++){const Qe=ve[me].image[j].image;I?Ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,Qe.width,Qe.height,Le,Pe,Qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,De,Qe.width,Qe.height,0,Le,Pe,Qe.data)}}else{I?Ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Le,Pe,ge[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,De,Le,Pe,ge[j]);for(let me=0;me<ve.length;me++){const Te=ve[me];I?Ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,Le,Pe,Te.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,De,Le,Pe,Te.image[j])}}}x(_,Fe)&&E(n.TEXTURE_CUBE_MAP),re.__version=ae.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Ue(b,_,B,V,ae,re){const Ee=r.convert(B.format,B.colorSpace),we=r.convert(B.type),pe=U(B.internalFormat,Ee,we,B.colorSpace);if(!i.get(_).__hasExternalTextures){const Oe=Math.max(1,_.width>>re),ge=Math.max(1,_.height>>re);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,re,pe,Oe,ge,_.depth,0,Ee,we,null):t.texImage2D(ae,re,pe,Oe,ge,0,Ee,we,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ue(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,ae,i.get(B).__webglTexture,0,W(_)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,ae,i.get(B).__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(b,_,B){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer&&!_.stencilBuffer){let V=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(B||ue(_)){const ae=_.depthTexture;ae&&ae.isDepthTexture&&(ae.type===Yn?V=n.DEPTH_COMPONENT32F:ae.type===Pi&&(V=n.DEPTH_COMPONENT24));const re=W(_);ue(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,V,_.width,_.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,re,V,_.width,_.height)}else n.renderbufferStorage(n.RENDERBUFFER,V,_.width,_.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,b)}else if(_.depthBuffer&&_.stencilBuffer){const V=W(_);B&&ue(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,V,n.DEPTH24_STENCIL8,_.width,_.height):ue(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,V,n.DEPTH24_STENCIL8,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b)}else{const V=_.textures;for(let ae=0;ae<V.length;ae++){const re=V[ae],Ee=r.convert(re.format,re.colorSpace),we=r.convert(re.type),pe=U(re.internalFormat,Ee,we,re.colorSpace),xe=W(_);B&&ue(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,pe,_.width,_.height):ue(_)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe,pe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,pe,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function et(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),J(_.depthTexture,0);const V=i.get(_.depthTexture).__webglTexture,ae=W(_);if(_.depthTexture.format===cs)ue(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,V,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,V,0);else if(_.depthTexture.format===er)ue(_)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,V,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,V,0);else throw new Error("Unknown depthTexture format")}function A(b){const _=i.get(b),B=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");et(_.__webglFramebuffer,b)}else if(B){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]=n.createRenderbuffer(),Re(_.__webglDepthbuffer[V],b,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),Re(_.__webglDepthbuffer,b,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function S(b,_,B){const V=i.get(b);_!==void 0&&Ue(V.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&A(b)}function K(b){const _=b.texture,B=i.get(b),V=i.get(_);b.addEventListener("dispose",k);const ae=b.textures,re=b.isWebGLCubeRenderTarget===!0,Ee=ae.length>1,we=f(b)||o;if(Ee||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=_.version,a.memory.textures++),re){B.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(o&&_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[pe]=[];for(let xe=0;xe<_.mipmaps.length;xe++)B.__webglFramebuffer[pe][xe]=n.createFramebuffer()}else B.__webglFramebuffer[pe]=n.createFramebuffer()}else{if(o&&_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let pe=0;pe<_.mipmaps.length;pe++)B.__webglFramebuffer[pe]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(Ee)if(s.drawBuffers)for(let pe=0,xe=ae.length;pe<xe;pe++){const Oe=i.get(ae[pe]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=n.createTexture(),a.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&b.samples>0&&ue(b)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let pe=0;pe<ae.length;pe++){const xe=ae[pe];B.__webglColorRenderbuffer[pe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[pe]);const Oe=r.convert(xe.format,xe.colorSpace),ge=r.convert(xe.type),gt=U(xe.internalFormat,Oe,ge,xe.colorSpace,b.isXRRenderTarget===!0),Fe=W(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,gt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,B.__webglColorRenderbuffer[pe])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Re(B.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),te(n.TEXTURE_CUBE_MAP,_,we);for(let pe=0;pe<6;pe++)if(o&&_.mipmaps&&_.mipmaps.length>0)for(let xe=0;xe<_.mipmaps.length;xe++)Ue(B.__webglFramebuffer[pe][xe],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,xe);else Ue(B.__webglFramebuffer[pe],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);x(_,we)&&E(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let pe=0,xe=ae.length;pe<xe;pe++){const Oe=ae[pe],ge=i.get(Oe);t.bindTexture(n.TEXTURE_2D,ge.__webglTexture),te(n.TEXTURE_2D,Oe,we),Ue(B.__webglFramebuffer,b,Oe,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,0),x(Oe,we)&&E(n.TEXTURE_2D)}t.unbindTexture()}else{let pe=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(o?pe=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(pe,V.__webglTexture),te(pe,_,we),o&&_.mipmaps&&_.mipmaps.length>0)for(let xe=0;xe<_.mipmaps.length;xe++)Ue(B.__webglFramebuffer[xe],b,_,n.COLOR_ATTACHMENT0,pe,xe);else Ue(B.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,pe,0);x(_,we)&&E(pe),t.unbindTexture()}b.depthBuffer&&A(b)}function Y(b){const _=f(b)||o,B=b.textures;for(let V=0,ae=B.length;V<ae;V++){const re=B[V];if(x(re,_)){const Ee=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,we=i.get(re).__webglTexture;t.bindTexture(Ee,we),E(Ee),t.unbindTexture()}}}function $(b){if(o&&b.samples>0&&ue(b)===!1){const _=b.textures,B=b.width,V=b.height;let ae=n.COLOR_BUFFER_BIT;const re=[],Ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,we=i.get(b),pe=_.length>1;if(pe)for(let xe=0;xe<_.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let xe=0;xe<_.length;xe++){re.push(n.COLOR_ATTACHMENT0+xe),b.depthBuffer&&re.push(Ee);const Oe=we.__ignoreDepthValues!==void 0?we.__ignoreDepthValues:!1;if(Oe===!1&&(b.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),pe&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,we.__webglColorRenderbuffer[xe]),Oe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Ee]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Ee])),pe){const ge=i.get(_[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ge,0)}n.blitFramebuffer(0,0,B,V,0,0,B,V,ae,n.NEAREST),u&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,re)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pe)for(let xe=0;xe<_.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,we.__webglColorRenderbuffer[xe]);const Oe=i.get(_[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,Oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}}function W(b){return Math.min(s.maxSamples,b.samples)}function ue(b){const _=i.get(b);return o&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function le(b){const _=a.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function ce(b,_){const B=b.colorSpace,V=b.format,ae=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===ql||B!==Bi&&B!==Ci&&(ut.getTransfer(B)===_t?o===!1?e.has("EXT_sRGB")===!0&&V===Nn?(b.format=ql,b.minFilter=Vt,b.generateMipmaps=!1):_=Bd.sRGBToLinear(_):(V!==Nn||ae!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),_}function ie(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=D,this.setTexture2D=J,this.setTexture2DArray=F,this.setTexture3D=Q,this.setTextureCube=oe,this.rebindTextures=S,this.setupRenderTarget=K,this.updateRenderTargetMipmap=Y,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=A,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=ue}function oS(n,e,t){const i=t.isWebGL2;function s(r,a=Ci){let o;const l=ut.getTransfer(a);if(r===Ui)return n.UNSIGNED_BYTE;if(r===Ad)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Rd)return n.UNSIGNED_SHORT_5_5_5_1;if(r===C0)return n.BYTE;if(r===P0)return n.SHORT;if(r===yc)return n.UNSIGNED_SHORT;if(r===wd)return n.INT;if(r===Pi)return n.UNSIGNED_INT;if(r===Yn)return n.FLOAT;if(r===gi)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===L0)return n.ALPHA;if(r===Nn)return n.RGBA;if(r===I0)return n.LUMINANCE;if(r===D0)return n.LUMINANCE_ALPHA;if(r===cs)return n.DEPTH_COMPONENT;if(r===er)return n.DEPTH_STENCIL;if(r===ql)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Cd)return n.RED;if(r===Pd)return n.RED_INTEGER;if(r===U0)return n.RG;if(r===Ld)return n.RG_INTEGER;if(r===Id)return n.RGBA_INTEGER;if(r===Ya||r===ja||r===Ka||r===$a)if(l===_t)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ya)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ja)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ka)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===$a)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ya)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ja)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ka)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===$a)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===bu||r===wu||r===Au||r===Ru)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===bu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===wu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Au)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ru)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Dd)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Cu||r===Pu)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Cu)return l===_t?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Pu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Lu||r===Iu||r===Du||r===Uu||r===Nu||r===Ou||r===Fu||r===Bu||r===zu||r===Gu||r===Hu||r===Vu||r===ku||r===Wu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Lu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Iu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Du)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Uu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Nu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ou)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Fu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Bu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===zu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Gu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Hu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Vu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ku)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Wu)return l===_t?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Za||r===Xu||r===qu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Za)return l===_t?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Xu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===qu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===N0||r===Yu||r===ju||r===Ku)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Za)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Yu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ju)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ku)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ls?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class aS extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Mt extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lS={type:"move"};class Sl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,i),f=this._getHandJoint(u,g);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const c=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],d=c.position.distanceTo(h.position),m=.02,v=.005;u.inputState.pinching&&d>m+v?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=m-v&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(lS)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Mt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const cS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class hS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Xt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}render(e,t){if(this.texture!==null){if(this.mesh===null){const i=t.cameras[0].viewport,s=new mt({extensions:{fragDepth:!0},vertexShader:cS,fragmentShader:uS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new _e(new ir(20,20),s)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class fS extends fs{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,u=null,c=null,h=null,d=null,m=null,v=null;const g=new hS,p=t.getContextAttributes();let f=null,M=null;const x=[],E=[],U=new Ae;let P=null;const R=new yn;R.layers.enable(1),R.viewport=new St;const O=new yn;O.layers.enable(2),O.viewport=new St;const k=[R,O],y=new aS;y.layers.enable(1),y.layers.enable(2);let T=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let de=x[te];return de===void 0&&(de=new Sl,x[te]=de),de.getTargetRaySpace()},this.getControllerGrip=function(te){let de=x[te];return de===void 0&&(de=new Sl,x[te]=de),de.getGripSpace()},this.getHand=function(te){let de=x[te];return de===void 0&&(de=new Sl,x[te]=de),de.getHandSpace()};function z(te){const de=E.indexOf(te.inputSource);if(de===-1)return;const Se=x[de];Se!==void 0&&(Se.update(te.inputSource,te.frame,u||a),Se.dispatchEvent({type:te.type,data:te.inputSource}))}function D(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",q);for(let te=0;te<x.length;te++){const de=E[te];de!==null&&(E[te]=null,x[te].disconnect(de))}T=null,L=null,g.reset(),e.setRenderTarget(f),m=null,d=null,h=null,s=null,M=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(U.width,U.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(te){u=te},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",D),s.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(U),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const de={antialias:s.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),M=new Gn(m.framebufferWidth,m.framebufferHeight,{format:Nn,type:Ui,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let de=null,Se=null,Ge=null;p.depth&&(Ge=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=p.stencil?er:cs,Se=p.stencil?ls:Pi);const Ue={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Ue),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Gn(d.textureWidth,d.textureHeight,{format:Nn,type:Ui,depthTexture:new Kd(d.textureWidth,d.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const Re=e.properties.get(M);Re.__ignoreDepthValues=d.ignoreDepthValues}M.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await s.requestReferenceSpace(o),ze.setContext(s),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function q(te){for(let de=0;de<te.removed.length;de++){const Se=te.removed[de],Ge=E.indexOf(Se);Ge>=0&&(E[Ge]=null,x[Ge].disconnect(Se))}for(let de=0;de<te.added.length;de++){const Se=te.added[de];let Ge=E.indexOf(Se);if(Ge===-1){for(let Re=0;Re<x.length;Re++)if(Re>=E.length){E.push(Se),Ge=Re;break}else if(E[Re]===null){E[Re]=Se,Ge=Re;break}if(Ge===-1)break}const Ue=x[Ge];Ue&&Ue.connect(Se)}}const G=new C,J=new C;function F(te,de,Se){G.setFromMatrixPosition(de.matrixWorld),J.setFromMatrixPosition(Se.matrixWorld);const Ge=G.distanceTo(J),Ue=de.projectionMatrix.elements,Re=Se.projectionMatrix.elements,et=Ue[14]/(Ue[10]-1),A=Ue[14]/(Ue[10]+1),S=(Ue[9]+1)/Ue[5],K=(Ue[9]-1)/Ue[5],Y=(Ue[8]-1)/Ue[0],$=(Re[8]+1)/Re[0],W=et*Y,ue=et*$,le=Ge/(-Y+$),ce=le*-Y;de.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(ce),te.translateZ(le),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert();const ie=et+le,b=A+le,_=W-ce,B=ue+(Ge-ce),V=S*A/b*ie,ae=K*A/b*ie;te.projectionMatrix.makePerspective(_,B,V,ae,ie,b),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}function Q(te,de){de===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(de.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;g.texture!==null&&(te.near=g.depthNear,te.far=g.depthFar),y.near=O.near=R.near=te.near,y.far=O.far=R.far=te.far,(T!==y.near||L!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,L=y.far,R.near=T,R.far=L,O.near=T,O.far=L,R.updateProjectionMatrix(),O.updateProjectionMatrix(),te.updateProjectionMatrix());const de=te.parent,Se=y.cameras;Q(y,de);for(let Ge=0;Ge<Se.length;Ge++)Q(Se[Ge],de);Se.length===2?F(y,R,O):y.projectionMatrix.copy(R.projectionMatrix),oe(te,y,de)};function oe(te,de,Se){Se===null?te.matrix.copy(de.matrixWorld):(te.matrix.copy(Se.matrixWorld),te.matrix.invert(),te.matrix.multiply(de.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(de.projectionMatrix),te.projectionMatrixInverse.copy(de.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Xr*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(te){l=te,d!==null&&(d.fixedFoveation=te),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null};let fe=null;function ye(te,de){if(c=de.getViewerPose(u||a),v=de,c!==null){const Se=c.views;m!==null&&(e.setRenderTargetFramebuffer(M,m.framebuffer),e.setRenderTarget(M));let Ge=!1;Se.length!==y.cameras.length&&(y.cameras.length=0,Ge=!0);for(let Re=0;Re<Se.length;Re++){const et=Se[Re];let A=null;if(m!==null)A=m.getViewport(et);else{const K=h.getViewSubImage(d,et);A=K.viewport,Re===0&&(e.setRenderTargetTextures(M,K.colorTexture,d.ignoreDepthValues?void 0:K.depthStencilTexture),e.setRenderTarget(M))}let S=k[Re];S===void 0&&(S=new yn,S.layers.enable(Re),S.viewport=new St,k[Re]=S),S.matrix.fromArray(et.transform.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale),S.projectionMatrix.fromArray(et.projectionMatrix),S.projectionMatrixInverse.copy(S.projectionMatrix).invert(),S.viewport.set(A.x,A.y,A.width,A.height),Re===0&&(y.matrix.copy(S.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Ge===!0&&y.cameras.push(S)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")){const Re=h.getDepthInformation(Se[0]);Re&&Re.isValid&&Re.texture&&g.init(e,Re,s.renderState)}}for(let Se=0;Se<x.length;Se++){const Ge=E[Se],Ue=x[Se];Ge!==null&&Ue!==void 0&&Ue.update(Ge,de,u||a)}g.render(e,y),fe&&fe(te,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),v=null}const ze=new jd;ze.setAnimationLoop(ye),this.setAnimationLoop=function(te){fe=te},this.dispose=function(){}}}const Ji=new ei,dS=new ht;function pS(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Xd(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,M,x,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(p,f):f.isMeshToonMaterial?(r(p,f),h(p,f)):f.isMeshPhongMaterial?(r(p,f),c(p,f)):f.isMeshStandardMaterial?(r(p,f),d(p,f),f.isMeshPhysicalMaterial&&m(p,f,E)):f.isMeshMatcapMaterial?(r(p,f),v(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),g(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,M,x):f.isSpriteMaterial?u(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ft&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ft&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const M=e.get(f),x=M.envMap,E=M.envMapRotation;if(x&&(p.envMap.value=x,Ji.copy(E),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),p.envMapRotation.value.setFromMatrix4(dS.makeRotationFromEuler(Ji)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap){p.lightMap.value=f.lightMap;const U=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=f.lightMapIntensity*U,t(f.lightMap,p.lightMapTransform)}f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,M,x){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*M,p.scale.value=x*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function h(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),e.get(f).envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,M){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ft&&p.clearcoatNormalScale.value.negate())),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,f){f.matcap&&(p.matcap.value=f.matcap)}function g(p,f){const M=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function mS(n,e,t,i){let s={},r={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,x){const E=x.program;i.uniformBlockBinding(M,E)}function u(M,x){let E=s[M.id];E===void 0&&(v(M),E=c(M),s[M.id]=E,M.addEventListener("dispose",p));const U=x.program;i.updateUBOMapping(M,U);const P=e.render.frame;r[M.id]!==P&&(d(M),r[M.id]=P)}function c(M){const x=h();M.__bindingPointIndex=x;const E=n.createBuffer(),U=M.__size,P=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,U,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,E),E}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const x=s[M.id],E=M.uniforms,U=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let P=0,R=E.length;P<R;P++){const O=Array.isArray(E[P])?E[P]:[E[P]];for(let k=0,y=O.length;k<y;k++){const T=O[k];if(m(T,P,k,U)===!0){const L=T.__offset,z=Array.isArray(T.value)?T.value:[T.value];let D=0;for(let q=0;q<z.length;q++){const G=z[q],J=g(G);typeof G=="number"||typeof G=="boolean"?(T.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,L+D,T.__data)):G.isMatrix3?(T.__data[0]=G.elements[0],T.__data[1]=G.elements[1],T.__data[2]=G.elements[2],T.__data[3]=0,T.__data[4]=G.elements[3],T.__data[5]=G.elements[4],T.__data[6]=G.elements[5],T.__data[7]=0,T.__data[8]=G.elements[6],T.__data[9]=G.elements[7],T.__data[10]=G.elements[8],T.__data[11]=0):(G.toArray(T.__data,D),D+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(M,x,E,U){const P=M.value,R=x+"_"+E;if(U[R]===void 0)return typeof P=="number"||typeof P=="boolean"?U[R]=P:U[R]=P.clone(),!0;{const O=U[R];if(typeof P=="number"||typeof P=="boolean"){if(O!==P)return U[R]=P,!0}else if(O.equals(P)===!1)return O.copy(P),!0}return!1}function v(M){const x=M.uniforms;let E=0;const U=16;for(let R=0,O=x.length;R<O;R++){const k=Array.isArray(x[R])?x[R]:[x[R]];for(let y=0,T=k.length;y<T;y++){const L=k[y],z=Array.isArray(L.value)?L.value:[L.value];for(let D=0,q=z.length;D<q;D++){const G=z[D],J=g(G),F=E%U;F!==0&&U-F<J.boundary&&(E+=U-F),L.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=J.storage}}}const P=E%U;return P>0&&(E+=U-P),M.__size=E,M.__cache={},this}function g(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function p(M){const x=M.target;x.removeEventListener("dispose",p);const E=a.indexOf(x.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function f(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:u,dispose:f}}class tp{constructor(e={}){const{canvas:t=ov(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const f=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xn,this._useLegacyLights=!1,this.toneMapping=Di,this.toneMappingExposure=1;const x=this;let E=!1,U=0,P=0,R=null,O=-1,k=null;const y=new St,T=new St;let L=null;const z=new je(0);let D=0,q=t.width,G=t.height,J=1,F=null,Q=null;const oe=new St(0,0,q,G),fe=new St(0,0,q,G);let ye=!1;const ze=new Ec;let te=!1,de=!1,Se=null;const Ge=new ht,Ue=new Ae,Re=new C,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function A(){return R===null?J:1}let S=i;function K(w,H){for(let ee=0;ee<w.length;ee++){const ne=w[ee],Z=t.getContext(ne,H);if(Z!==null)return Z}return null}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xc}`),t.addEventListener("webglcontextlost",Ie,!1),t.addEventListener("webglcontextrestored",N,!1),t.addEventListener("webglcontextcreationerror",ve,!1),S===null){const H=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&H.shift(),S=K(H,w),S===null)throw K(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&S instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),S.getShaderPrecisionFormat===void 0&&(S.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Y,$,W,ue,le,ce,ie,b,_,B,V,ae,re,Ee,we,pe,xe,Oe,ge,gt,Fe,Le,Pe,De;function I(){Y=new My(S),$=new my(S,Y,e),Y.init($),Le=new oS(S,Y,$),W=new sS(S,Y,$),ue=new Ty(S),le=new WM,ce=new rS(S,Y,W,le,$,Le,ue),ie=new vy(x),b=new yy(x),_=new Pv(S,$),Pe=new dy(S,Y,_,$),B=new Sy(S,_,ue,Pe),V=new Ry(S,B,_,ue),ge=new Ay(S,$,ce),pe=new gy(le),ae=new kM(x,ie,b,Y,$,Pe,pe),re=new pS(x,le),Ee=new qM,we=new JM(Y,$),Oe=new fy(x,ie,b,W,V,d,l),xe=new iS(x,V,$),De=new mS(S,ue,$,W),gt=new py(S,Y,ue,$),Fe=new Ey(S,Y,ue,$),ue.programs=ae.programs,x.capabilities=$,x.extensions=Y,x.properties=le,x.renderLists=Ee,x.shadowMap=xe,x.state=W,x.info=ue}I();const he=new fS(x,S);this.xr=he,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){const w=Y.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Y.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(w){w!==void 0&&(J=w,this.setSize(q,G,!1))},this.getSize=function(w){return w.set(q,G)},this.setSize=function(w,H,ee=!0){if(he.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=w,G=H,t.width=Math.floor(w*J),t.height=Math.floor(H*J),ee===!0&&(t.style.width=w+"px",t.style.height=H+"px"),this.setViewport(0,0,w,H)},this.getDrawingBufferSize=function(w){return w.set(q*J,G*J).floor()},this.setDrawingBufferSize=function(w,H,ee){q=w,G=H,J=ee,t.width=Math.floor(w*ee),t.height=Math.floor(H*ee),this.setViewport(0,0,w,H)},this.getCurrentViewport=function(w){return w.copy(y)},this.getViewport=function(w){return w.copy(oe)},this.setViewport=function(w,H,ee,ne){w.isVector4?oe.set(w.x,w.y,w.z,w.w):oe.set(w,H,ee,ne),W.viewport(y.copy(oe).multiplyScalar(J).round())},this.getScissor=function(w){return w.copy(fe)},this.setScissor=function(w,H,ee,ne){w.isVector4?fe.set(w.x,w.y,w.z,w.w):fe.set(w,H,ee,ne),W.scissor(T.copy(fe).multiplyScalar(J).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(w){W.setScissorTest(ye=w)},this.setOpaqueSort=function(w){F=w},this.setTransparentSort=function(w){Q=w},this.getClearColor=function(w){return w.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor.apply(Oe,arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha.apply(Oe,arguments)},this.clear=function(w=!0,H=!0,ee=!0){let ne=0;if(w){let Z=!1;if(R!==null){const Ce=R.texture.format;Z=Ce===Id||Ce===Ld||Ce===Pd}if(Z){const Ce=R.texture.type,Ne=Ce===Ui||Ce===Pi||Ce===yc||Ce===ls||Ce===Ad||Ce===Rd,He=Oe.getClearColor(),ke=Oe.getClearAlpha(),Je=He.r,Xe=He.g,Ye=He.b;Ne?(m[0]=Je,m[1]=Xe,m[2]=Ye,m[3]=ke,S.clearBufferuiv(S.COLOR,0,m)):(v[0]=Je,v[1]=Xe,v[2]=Ye,v[3]=ke,S.clearBufferiv(S.COLOR,0,v))}else ne|=S.COLOR_BUFFER_BIT}H&&(ne|=S.DEPTH_BUFFER_BIT),ee&&(ne|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ie,!1),t.removeEventListener("webglcontextrestored",N,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),Ee.dispose(),we.dispose(),le.dispose(),ie.dispose(),b.dispose(),V.dispose(),Pe.dispose(),De.dispose(),ae.dispose(),he.dispose(),he.removeEventListener("sessionstart",bt),he.removeEventListener("sessionend",tt),Se&&(Se.dispose(),Se=null),vt.stop()};function Ie(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const w=ue.autoReset,H=xe.enabled,ee=xe.autoUpdate,ne=xe.needsUpdate,Z=xe.type;I(),ue.autoReset=w,xe.enabled=H,xe.autoUpdate=ee,xe.needsUpdate=ne,xe.type=Z}function ve(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function j(w){const H=w.target;H.removeEventListener("dispose",j),me(H)}function me(w){Te(w),le.remove(w)}function Te(w){const H=le.get(w).programs;H!==void 0&&(H.forEach(function(ee){ae.releaseProgram(ee)}),w.isShaderMaterial&&ae.releaseShaderCache(w))}this.renderBufferDirect=function(w,H,ee,ne,Z,Ce){H===null&&(H=et);const Ne=Z.isMesh&&Z.matrixWorld.determinant()<0,He=hp(w,H,ee,ne,Z);W.setMaterial(ne,Ne);let ke=ee.index,Je=1;if(ne.wireframe===!0){if(ke=B.getWireframeAttribute(ee),ke===void 0)return;Je=2}const Xe=ee.drawRange,Ye=ee.attributes.position;let At=Xe.start*Je,mn=(Xe.start+Xe.count)*Je;Ce!==null&&(At=Math.max(At,Ce.start*Je),mn=Math.min(mn,(Ce.start+Ce.count)*Je)),ke!==null?(At=Math.max(At,0),mn=Math.min(mn,ke.count)):Ye!=null&&(At=Math.max(At,0),mn=Math.min(mn,Ye.count));const Dt=mn-At;if(Dt<0||Dt===1/0)return;Pe.setup(Z,ne,He,ee,ke);let ti,Et=gt;if(ke!==null&&(ti=_.get(ke),Et=Fe,Et.setIndex(ti)),Z.isMesh)ne.wireframe===!0?(W.setLineWidth(ne.wireframeLinewidth*A()),Et.setMode(S.LINES)):Et.setMode(S.TRIANGLES);else if(Z.isLine){let Ke=ne.linewidth;Ke===void 0&&(Ke=1),W.setLineWidth(Ke*A()),Z.isLineSegments?Et.setMode(S.LINES):Z.isLineLoop?Et.setMode(S.LINE_LOOP):Et.setMode(S.LINE_STRIP)}else Z.isPoints?Et.setMode(S.POINTS):Z.isSprite&&Et.setMode(S.TRIANGLES);if(Z.isBatchedMesh)Et.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)Et.renderInstances(At,Dt,Z.count);else if(ee.isInstancedBufferGeometry){const Ke=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,ba=Math.min(ee.instanceCount,Ke);Et.renderInstances(At,Dt,ba)}else Et.render(At,Dt)};function Qe(w,H,ee){w.transparent===!0&&w.side===en&&w.forceSinglePass===!1?(w.side=Ft,w.needsUpdate=!0,Qr(w,H,ee),w.side=Fi,w.needsUpdate=!0,Qr(w,H,ee),w.side=en):Qr(w,H,ee)}this.compile=function(w,H,ee=null){ee===null&&(ee=w),p=we.get(ee),p.init(),M.push(p),ee.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(p.pushLight(Z),Z.castShadow&&p.pushShadow(Z))}),w!==ee&&w.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(p.pushLight(Z),Z.castShadow&&p.pushShadow(Z))}),p.setupLights(x._useLegacyLights);const ne=new Set;return w.traverse(function(Z){const Ce=Z.material;if(Ce)if(Array.isArray(Ce))for(let Ne=0;Ne<Ce.length;Ne++){const He=Ce[Ne];Qe(He,ee,Z),ne.add(He)}else Qe(Ce,ee,Z),ne.add(Ce)}),M.pop(),p=null,ne},this.compileAsync=function(w,H,ee=null){const ne=this.compile(w,H,ee);return new Promise(Z=>{function Ce(){if(ne.forEach(function(Ne){le.get(Ne).currentProgram.isReady()&&ne.delete(Ne)}),ne.size===0){Z(w);return}setTimeout(Ce,10)}Y.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let lt=null;function ft(w){lt&&lt(w)}function bt(){vt.stop()}function tt(){vt.start()}const vt=new jd;vt.setAnimationLoop(ft),typeof self<"u"&&vt.setContext(self),this.setAnimationLoop=function(w){lt=w,he.setAnimationLoop(w),w===null?vt.stop():vt.start()},he.addEventListener("sessionstart",bt),he.addEventListener("sessionend",tt),this.render=function(w,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(he.cameraAutoUpdate===!0&&he.updateCamera(H),H=he.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,H,R),p=we.get(w,M.length),p.init(),M.push(p),Ge.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ze.setFromProjectionMatrix(Ge),de=this.localClippingEnabled,te=pe.init(this.clippingPlanes,de),g=Ee.get(w,f.length),g.init(),f.push(g),qt(w,H,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(F,Q),this.info.render.frame++,te===!0&&pe.beginShadows();const ee=p.state.shadowsArray;if(xe.render(ee,w,H),te===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1)&&Oe.render(g,w),p.setupLights(x._useLegacyLights),H.isArrayCamera){const ne=H.cameras;for(let Z=0,Ce=ne.length;Z<Ce;Z++){const Ne=ne[Z];Gi(g,w,Ne,Ne.viewport)}}else Gi(g,w,H);R!==null&&(ce.updateMultisampleRenderTarget(R),ce.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(x,w,H),Pe.resetDefaultState(),O=-1,k=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,f.pop(),f.length>0?g=f[f.length-1]:g=null};function qt(w,H,ee,ne){if(w.visible===!1)return;if(w.layers.test(H.layers)){if(w.isGroup)ee=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(H);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||ze.intersectsSprite(w)){ne&&Re.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ge);const Ne=V.update(w),He=w.material;He.visible&&g.push(w,Ne,He,ee,Re.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||ze.intersectsObject(w))){const Ne=V.update(w),He=w.material;if(ne&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Re.copy(w.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Re.copy(Ne.boundingSphere.center)),Re.applyMatrix4(w.matrixWorld).applyMatrix4(Ge)),Array.isArray(He)){const ke=Ne.groups;for(let Je=0,Xe=ke.length;Je<Xe;Je++){const Ye=ke[Je],At=He[Ye.materialIndex];At&&At.visible&&g.push(w,Ne,At,ee,Re.z,Ye)}}else He.visible&&g.push(w,Ne,He,ee,Re.z,null)}}const Ce=w.children;for(let Ne=0,He=Ce.length;Ne<He;Ne++)qt(Ce[Ne],H,ee,ne)}function Gi(w,H,ee,ne){const Z=w.opaque,Ce=w.transmissive,Ne=w.transparent;p.setupLightsView(ee),te===!0&&pe.setGlobalState(x.clippingPlanes,ee),Ce.length>0&&Zr(Z,Ce,H,ee),ne&&W.viewport(y.copy(ne)),Z.length>0&&Jr(Z,H,ee),Ce.length>0&&Jr(Ce,H,ee),Ne.length>0&&Jr(Ne,H,ee),W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),W.setPolygonOffset(!1)}function Zr(w,H,ee,ne){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;const Ce=$.isWebGL2;Se===null&&(Se=new Gn(1,1,{generateMipmaps:!0,type:Y.has("EXT_color_buffer_half_float")?gi:Ui,minFilter:jn,samples:Ce?4:0})),x.getDrawingBufferSize(Ue),Ce?Se.setSize(Ue.x,Ue.y):Se.setSize(sa(Ue.x),sa(Ue.y));const Ne=x.getRenderTarget();x.setRenderTarget(Se),x.getClearColor(z),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear();const He=x.toneMapping;x.toneMapping=Di,Jr(w,ee,ne),ce.updateMultisampleRenderTarget(Se),ce.updateRenderTargetMipmap(Se);let ke=!1;for(let Je=0,Xe=H.length;Je<Xe;Je++){const Ye=H[Je],At=Ye.object,mn=Ye.geometry,Dt=Ye.material,ti=Ye.group;if(Dt.side===en&&At.layers.test(ne.layers)){const Et=Dt.side;Dt.side=Ft,Dt.needsUpdate=!0,Lc(At,ee,ne,mn,Dt,ti),Dt.side=Et,Dt.needsUpdate=!0,ke=!0}}ke===!0&&(ce.updateMultisampleRenderTarget(Se),ce.updateRenderTargetMipmap(Se)),x.setRenderTarget(Ne),x.setClearColor(z,D),x.toneMapping=He}function Jr(w,H,ee){const ne=H.isScene===!0?H.overrideMaterial:null;for(let Z=0,Ce=w.length;Z<Ce;Z++){const Ne=w[Z],He=Ne.object,ke=Ne.geometry,Je=ne===null?Ne.material:ne,Xe=Ne.group;He.layers.test(ee.layers)&&Lc(He,H,ee,ke,Je,Xe)}}function Lc(w,H,ee,ne,Z,Ce){w.onBeforeRender(x,H,ee,ne,Z,Ce),w.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),Z.onBeforeRender(x,H,ee,ne,w,Ce),Z.transparent===!0&&Z.side===en&&Z.forceSinglePass===!1?(Z.side=Ft,Z.needsUpdate=!0,x.renderBufferDirect(ee,H,ne,Z,w,Ce),Z.side=Fi,Z.needsUpdate=!0,x.renderBufferDirect(ee,H,ne,Z,w,Ce),Z.side=en):x.renderBufferDirect(ee,H,ne,Z,w,Ce),w.onAfterRender(x,H,ee,ne,Z,Ce)}function Qr(w,H,ee){H.isScene!==!0&&(H=et);const ne=le.get(w),Z=p.state.lights,Ce=p.state.shadowsArray,Ne=Z.state.version,He=ae.getParameters(w,Z.state,Ce,H,ee),ke=ae.getProgramCacheKey(He);let Je=ne.programs;ne.environment=w.isMeshStandardMaterial?H.environment:null,ne.fog=H.fog,ne.envMap=(w.isMeshStandardMaterial?b:ie).get(w.envMap||ne.environment),ne.envMapRotation=ne.environment!==null&&w.envMap===null?H.environmentRotation:w.envMapRotation,Je===void 0&&(w.addEventListener("dispose",j),Je=new Map,ne.programs=Je);let Xe=Je.get(ke);if(Xe!==void 0){if(ne.currentProgram===Xe&&ne.lightsStateVersion===Ne)return Dc(w,He),Xe}else He.uniforms=ae.getUniforms(w),w.onBuild(ee,He,x),w.onBeforeCompile(He,x),Xe=ae.acquireProgram(He,ke),Je.set(ke,Xe),ne.uniforms=He.uniforms;const Ye=ne.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ye.clippingPlanes=pe.uniform),Dc(w,He),ne.needsLights=dp(w),ne.lightsStateVersion=Ne,ne.needsLights&&(Ye.ambientLightColor.value=Z.state.ambient,Ye.lightProbe.value=Z.state.probe,Ye.directionalLights.value=Z.state.directional,Ye.directionalLightShadows.value=Z.state.directionalShadow,Ye.spotLights.value=Z.state.spot,Ye.spotLightShadows.value=Z.state.spotShadow,Ye.rectAreaLights.value=Z.state.rectArea,Ye.ltc_1.value=Z.state.rectAreaLTC1,Ye.ltc_2.value=Z.state.rectAreaLTC2,Ye.pointLights.value=Z.state.point,Ye.pointLightShadows.value=Z.state.pointShadow,Ye.hemisphereLights.value=Z.state.hemi,Ye.directionalShadowMap.value=Z.state.directionalShadowMap,Ye.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ye.spotShadowMap.value=Z.state.spotShadowMap,Ye.spotLightMatrix.value=Z.state.spotLightMatrix,Ye.spotLightMap.value=Z.state.spotLightMap,Ye.pointShadowMap.value=Z.state.pointShadowMap,Ye.pointShadowMatrix.value=Z.state.pointShadowMatrix),ne.currentProgram=Xe,ne.uniformsList=null,Xe}function Ic(w){if(w.uniformsList===null){const H=w.currentProgram.getUniforms();w.uniformsList=Ho.seqWithValue(H.seq,w.uniforms)}return w.uniformsList}function Dc(w,H){const ee=le.get(w);ee.outputColorSpace=H.outputColorSpace,ee.batching=H.batching,ee.instancing=H.instancing,ee.instancingColor=H.instancingColor,ee.instancingMorph=H.instancingMorph,ee.skinning=H.skinning,ee.morphTargets=H.morphTargets,ee.morphNormals=H.morphNormals,ee.morphColors=H.morphColors,ee.morphTargetsCount=H.morphTargetsCount,ee.numClippingPlanes=H.numClippingPlanes,ee.numIntersection=H.numClipIntersection,ee.vertexAlphas=H.vertexAlphas,ee.vertexTangents=H.vertexTangents,ee.toneMapping=H.toneMapping}function hp(w,H,ee,ne,Z){H.isScene!==!0&&(H=et),ce.resetTextureUnits();const Ce=H.fog,Ne=ne.isMeshStandardMaterial?H.environment:null,He=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Bi,ke=(ne.isMeshStandardMaterial?b:ie).get(ne.envMap||Ne),Je=ne.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,Xe=!!ee.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Ye=!!ee.morphAttributes.position,At=!!ee.morphAttributes.normal,mn=!!ee.morphAttributes.color;let Dt=Di;ne.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Dt=x.toneMapping);const ti=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,Et=ti!==void 0?ti.length:0,Ke=le.get(ne),ba=p.state.lights;if(te===!0&&(de===!0||w!==k)){const Sn=w===k&&ne.id===O;pe.setState(ne,w,Sn)}let yt=!1;ne.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==ba.state.version||Ke.outputColorSpace!==He||Z.isBatchedMesh&&Ke.batching===!1||!Z.isBatchedMesh&&Ke.batching===!0||Z.isInstancedMesh&&Ke.instancing===!1||!Z.isInstancedMesh&&Ke.instancing===!0||Z.isSkinnedMesh&&Ke.skinning===!1||!Z.isSkinnedMesh&&Ke.skinning===!0||Z.isInstancedMesh&&Ke.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ke.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ke.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ke.instancingMorph===!1&&Z.morphTexture!==null||Ke.envMap!==ke||ne.fog===!0&&Ke.fog!==Ce||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==pe.numPlanes||Ke.numIntersection!==pe.numIntersection)||Ke.vertexAlphas!==Je||Ke.vertexTangents!==Xe||Ke.morphTargets!==Ye||Ke.morphNormals!==At||Ke.morphColors!==mn||Ke.toneMapping!==Dt||$.isWebGL2===!0&&Ke.morphTargetsCount!==Et)&&(yt=!0):(yt=!0,Ke.__version=ne.version);let Hi=Ke.currentProgram;yt===!0&&(Hi=Qr(ne,H,Z));let Uc=!1,rr=!1,wa=!1;const Yt=Hi.getUniforms(),Vi=Ke.uniforms;if(W.useProgram(Hi.program)&&(Uc=!0,rr=!0,wa=!0),ne.id!==O&&(O=ne.id,rr=!0),Uc||k!==w){Yt.setValue(S,"projectionMatrix",w.projectionMatrix),Yt.setValue(S,"viewMatrix",w.matrixWorldInverse);const Sn=Yt.map.cameraPosition;Sn!==void 0&&Sn.setValue(S,Re.setFromMatrixPosition(w.matrixWorld)),$.logarithmicDepthBuffer&&Yt.setValue(S,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Yt.setValue(S,"isOrthographic",w.isOrthographicCamera===!0),k!==w&&(k=w,rr=!0,wa=!0)}if(Z.isSkinnedMesh){Yt.setOptional(S,Z,"bindMatrix"),Yt.setOptional(S,Z,"bindMatrixInverse");const Sn=Z.skeleton;Sn&&($.floatVertexTextures?(Sn.boneTexture===null&&Sn.computeBoneTexture(),Yt.setValue(S,"boneTexture",Sn.boneTexture,ce)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Z.isBatchedMesh&&(Yt.setOptional(S,Z,"batchingTexture"),Yt.setValue(S,"batchingTexture",Z._matricesTexture,ce));const Aa=ee.morphAttributes;if((Aa.position!==void 0||Aa.normal!==void 0||Aa.color!==void 0&&$.isWebGL2===!0)&&ge.update(Z,ee,Hi),(rr||Ke.receiveShadow!==Z.receiveShadow)&&(Ke.receiveShadow=Z.receiveShadow,Yt.setValue(S,"receiveShadow",Z.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(Vi.envMap.value=ke,Vi.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),rr&&(Yt.setValue(S,"toneMappingExposure",x.toneMappingExposure),Ke.needsLights&&fp(Vi,wa),Ce&&ne.fog===!0&&re.refreshFogUniforms(Vi,Ce),re.refreshMaterialUniforms(Vi,ne,J,G,Se),Ho.upload(S,Ic(Ke),Vi,ce)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Ho.upload(S,Ic(Ke),Vi,ce),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Yt.setValue(S,"center",Z.center),Yt.setValue(S,"modelViewMatrix",Z.modelViewMatrix),Yt.setValue(S,"normalMatrix",Z.normalMatrix),Yt.setValue(S,"modelMatrix",Z.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){const Sn=ne.uniformsGroups;for(let Ra=0,pp=Sn.length;Ra<pp;Ra++)if($.isWebGL2){const Nc=Sn[Ra];De.update(Nc,Hi),De.bind(Nc,Hi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Hi}function fp(w,H){w.ambientLightColor.needsUpdate=H,w.lightProbe.needsUpdate=H,w.directionalLights.needsUpdate=H,w.directionalLightShadows.needsUpdate=H,w.pointLights.needsUpdate=H,w.pointLightShadows.needsUpdate=H,w.spotLights.needsUpdate=H,w.spotLightShadows.needsUpdate=H,w.rectAreaLights.needsUpdate=H,w.hemisphereLights.needsUpdate=H}function dp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,H,ee){le.get(w.texture).__webglTexture=H,le.get(w.depthTexture).__webglTexture=ee;const ne=le.get(w);ne.__hasExternalTextures=!0,ne.__autoAllocateDepthBuffer=ee===void 0,ne.__autoAllocateDepthBuffer||Y.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ne.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,H){const ee=le.get(w);ee.__webglFramebuffer=H,ee.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(w,H=0,ee=0){R=w,U=H,P=ee;let ne=!0,Z=null,Ce=!1,Ne=!1;if(w){const ke=le.get(w);ke.__useDefaultFramebuffer!==void 0?(W.bindFramebuffer(S.FRAMEBUFFER,null),ne=!1):ke.__webglFramebuffer===void 0?ce.setupRenderTarget(w):ke.__hasExternalTextures&&ce.rebindTextures(w,le.get(w.texture).__webglTexture,le.get(w.depthTexture).__webglTexture);const Je=w.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(Ne=!0);const Xe=le.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Xe[H])?Z=Xe[H][ee]:Z=Xe[H],Ce=!0):$.isWebGL2&&w.samples>0&&ce.useMultisampledRTT(w)===!1?Z=le.get(w).__webglMultisampledFramebuffer:Array.isArray(Xe)?Z=Xe[ee]:Z=Xe,y.copy(w.viewport),T.copy(w.scissor),L=w.scissorTest}else y.copy(oe).multiplyScalar(J).floor(),T.copy(fe).multiplyScalar(J).floor(),L=ye;if(W.bindFramebuffer(S.FRAMEBUFFER,Z)&&$.drawBuffers&&ne&&W.drawBuffers(w,Z),W.viewport(y),W.scissor(T),W.setScissorTest(L),Ce){const ke=le.get(w.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+H,ke.__webglTexture,ee)}else if(Ne){const ke=le.get(w.texture),Je=H||0;S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,ke.__webglTexture,ee||0,Je)}O=-1},this.readRenderTargetPixels=function(w,H,ee,ne,Z,Ce,Ne){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=le.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ne!==void 0&&(He=He[Ne]),He){W.bindFramebuffer(S.FRAMEBUFFER,He);try{const ke=w.texture,Je=ke.format,Xe=ke.type;if(Je!==Nn&&Le.convert(Je)!==S.getParameter(S.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ye=Xe===gi&&(Y.has("EXT_color_buffer_half_float")||$.isWebGL2&&Y.has("EXT_color_buffer_float"));if(Xe!==Ui&&Le.convert(Xe)!==S.getParameter(S.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Xe===Yn&&($.isWebGL2||Y.has("OES_texture_float")||Y.has("WEBGL_color_buffer_float")))&&!Ye){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=w.width-ne&&ee>=0&&ee<=w.height-Z&&S.readPixels(H,ee,ne,Z,Le.convert(Je),Le.convert(Xe),Ce)}finally{const ke=R!==null?le.get(R).__webglFramebuffer:null;W.bindFramebuffer(S.FRAMEBUFFER,ke)}}},this.copyFramebufferToTexture=function(w,H,ee=0){const ne=Math.pow(2,-ee),Z=Math.floor(H.image.width*ne),Ce=Math.floor(H.image.height*ne);ce.setTexture2D(H,0),S.copyTexSubImage2D(S.TEXTURE_2D,ee,0,0,w.x,w.y,Z,Ce),W.unbindTexture()},this.copyTextureToTexture=function(w,H,ee,ne=0){const Z=H.image.width,Ce=H.image.height,Ne=Le.convert(ee.format),He=Le.convert(ee.type);ce.setTexture2D(ee,0),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,ee.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,ee.unpackAlignment),H.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,ne,w.x,w.y,Z,Ce,Ne,He,H.image.data):H.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,ne,w.x,w.y,H.mipmaps[0].width,H.mipmaps[0].height,Ne,H.mipmaps[0].data):S.texSubImage2D(S.TEXTURE_2D,ne,w.x,w.y,Ne,He,H.image),ne===0&&ee.generateMipmaps&&S.generateMipmap(S.TEXTURE_2D),W.unbindTexture()},this.copyTextureToTexture3D=function(w,H,ee,ne,Z=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ce=Math.round(w.max.x-w.min.x),Ne=Math.round(w.max.y-w.min.y),He=w.max.z-w.min.z+1,ke=Le.convert(ne.format),Je=Le.convert(ne.type);let Xe;if(ne.isData3DTexture)ce.setTexture3D(ne,0),Xe=S.TEXTURE_3D;else if(ne.isDataArrayTexture||ne.isCompressedArrayTexture)ce.setTexture2DArray(ne,0),Xe=S.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,ne.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ne.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,ne.unpackAlignment);const Ye=S.getParameter(S.UNPACK_ROW_LENGTH),At=S.getParameter(S.UNPACK_IMAGE_HEIGHT),mn=S.getParameter(S.UNPACK_SKIP_PIXELS),Dt=S.getParameter(S.UNPACK_SKIP_ROWS),ti=S.getParameter(S.UNPACK_SKIP_IMAGES),Et=ee.isCompressedTexture?ee.mipmaps[Z]:ee.image;S.pixelStorei(S.UNPACK_ROW_LENGTH,Et.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Et.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,w.min.x),S.pixelStorei(S.UNPACK_SKIP_ROWS,w.min.y),S.pixelStorei(S.UNPACK_SKIP_IMAGES,w.min.z),ee.isDataTexture||ee.isData3DTexture?S.texSubImage3D(Xe,Z,H.x,H.y,H.z,Ce,Ne,He,ke,Je,Et.data):ne.isCompressedArrayTexture?S.compressedTexSubImage3D(Xe,Z,H.x,H.y,H.z,Ce,Ne,He,ke,Et.data):S.texSubImage3D(Xe,Z,H.x,H.y,H.z,Ce,Ne,He,ke,Je,Et),S.pixelStorei(S.UNPACK_ROW_LENGTH,Ye),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,At),S.pixelStorei(S.UNPACK_SKIP_PIXELS,mn),S.pixelStorei(S.UNPACK_SKIP_ROWS,Dt),S.pixelStorei(S.UNPACK_SKIP_IMAGES,ti),Z===0&&ne.generateMipmaps&&S.generateMipmap(Xe),W.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?ce.setTextureCube(w,0):w.isData3DTexture?ce.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?ce.setTexture2DArray(w,0):ce.setTexture2D(w,0),W.unbindTexture()},this.resetState=function(){U=0,P=0,R=null,W.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Mc?"display-p3":"srgb",t.unpackColorSpace=ut.workingColorSpace===Sa?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class gS extends tp{}gS.prototype.isWebGL1Renderer=!0;class np extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class vS{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=vi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Fd("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const rn=new C;class oa{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=On(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ct(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=On(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=On(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=On(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=On(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),s=ct(s,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new oa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Zl extends zi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ns;const gr=new C,Os=new C,Fs=new C,Bs=new Ae,vr=new Ae,ip=new ht,Ro=new C,_r=new C,Co=new C,Bh=new Ae,El=new Ae,zh=new Ae;class Gh extends wt{constructor(e=new Zl){if(super(),this.isSprite=!0,this.type="Sprite",Ns===void 0){Ns=new Ct;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new vS(t,5);Ns.setIndex([0,1,2,0,2,3]),Ns.setAttribute("position",new oa(i,3,0,!1)),Ns.setAttribute("uv",new oa(i,2,3,!1))}this.geometry=Ns,this.material=e,this.center=new Ae(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Os.setFromMatrixScale(this.matrixWorld),ip.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Fs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Os.multiplyScalar(-Fs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;Po(Ro.set(-.5,-.5,0),Fs,a,Os,s,r),Po(_r.set(.5,-.5,0),Fs,a,Os,s,r),Po(Co.set(.5,.5,0),Fs,a,Os,s,r),Bh.set(0,0),El.set(1,0),zh.set(1,1);let o=e.ray.intersectTriangle(Ro,_r,Co,!1,gr);if(o===null&&(Po(_r.set(-.5,.5,0),Fs,a,Os,s,r),El.set(0,1),o=e.ray.intersectTriangle(Ro,Co,_r,!1,gr),o===null))return;const l=e.ray.origin.distanceTo(gr);l<e.near||l>e.far||t.push({distance:l,point:gr.clone(),uv:Fn.getInterpolation(gr,Ro,_r,Co,Bh,El,zh,new Ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Po(n,e,t,i,s,r){Bs.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(vr.x=r*Bs.x-s*Bs.y,vr.y=s*Bs.x+r*Bs.y):vr.copy(Bs),n.copy(e),n.x+=vr.x,n.y+=vr.y,n.applyMatrix4(ip)}class _S extends Xt{constructor(e=null,t=1,i=1,s,r,a,o,l,u=kt,c=kt,h,d){super(null,a,o,l,u,c,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jl extends Ot{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const zs=new ht,Hh=new ht,Lo=[],Vh=new ds,xS=new ht,xr=new _e,yr=new ps;class kh extends _e{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,xS)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ds),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,zs),Vh.copy(e.boundingBox).applyMatrix4(zs),this.boundingBox.union(Vh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ps),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,zs),yr.copy(e.boundingSphere).applyMatrix4(zs),this.boundingSphere.union(yr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(xr.geometry=this.geometry,xr.material=this.material,xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yr.copy(this.boundingSphere),yr.applyMatrix4(i),e.ray.intersectsSphere(yr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zs),Hh.multiplyMatrices(i,zs),xr.matrixWorld=Hh,xr.raycast(e,Lo);for(let a=0,o=Lo.length;a<o;a++){const l=Lo[a];l.instanceId=r,l.object=this,t.push(l)}Lo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jl(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new _S(new Float32Array(s*this.count),s,this.count,Cd,Yn));const r=this.morphTexture.source.data.data;let a=0;for(let u=0;u<i.length;u++)a+=i[u];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class sp extends zi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Wh=new C,Xh=new C,qh=new ht,Tl=new Ea,Io=new ps;class yS extends wt{constructor(e=new Ct,t=new sp){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Wh.fromBufferAttribute(t,s-1),Xh.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Wh.distanceTo(Xh);e.setAttribute("lineDistance",new xt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Io.copy(i.boundingSphere),Io.applyMatrix4(s),Io.radius+=r,e.ray.intersectsSphere(Io)===!1)return;qh.copy(s).invert(),Tl.copy(e.ray).applyMatrix4(qh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=new C,c=new C,h=new C,d=new C,m=this.isLineSegments?2:1,v=i.index,p=i.attributes.position;if(v!==null){const f=Math.max(0,a.start),M=Math.min(v.count,a.start+a.count);for(let x=f,E=M-1;x<E;x+=m){const U=v.getX(x),P=v.getX(x+1);if(u.fromBufferAttribute(p,U),c.fromBufferAttribute(p,P),Tl.distanceSqToSegment(u,c,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const O=e.ray.origin.distanceTo(d);O<e.near||O>e.far||t.push({distance:O,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,a.start),M=Math.min(p.count,a.start+a.count);for(let x=f,E=M-1;x<E;x+=m){if(u.fromBufferAttribute(p,x),c.fromBufferAttribute(p,x+1),Tl.distanceSqToSegment(u,c,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(d);P<e.near||P>e.far||t.push({distance:P,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}class MS extends yS{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ql extends zi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Yh=new ht,ec=new Ea,Do=new ps,Uo=new C;class tc extends wt{constructor(e=new Ct,t=new Ql){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Do.copy(i.boundingSphere),Do.applyMatrix4(s),Do.radius+=r,e.ray.intersectsSphere(Do)===!1)return;Yh.copy(s).invert(),ec.copy(e.ray).applyMatrix4(Yh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let v=d,g=m;v<g;v++){const p=u.getX(v);Uo.fromBufferAttribute(h,p),jh(Uo,p,l,s,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=d,g=m;v<g;v++)Uo.fromBufferAttribute(h,v),jh(Uo,v,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function jh(n,e,t,i,s,r,a){const o=ec.distanceSqToPoint(n);if(o<t){const l=new C;ec.closestPointToPoint(n,l),l.applyMatrix4(i);const u=s.ray.origin.distanceTo(l);if(u<s.near||u>s.far)return;r.push({distance:u,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class fn extends Xt{constructor(e,t,i,s,r,a,o,l,u){super(e,t,i,s,r,a,o,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wc extends Ct{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],u=new C,c=new Ae;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const m=i+h/t*s;u.x=e*Math.cos(m),u.y=e*Math.sin(m),a.push(u.x,u.y,u.z),o.push(0,0,1),c.x=(a[d]/e+1)/2,c.y=(a[d+1]/e+1)/2,l.push(c.x,c.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(o,3)),this.setAttribute("uv",new xt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ot extends Ct{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const u=this;s=Math.floor(s),r=Math.floor(r);const c=[],h=[],d=[],m=[];let v=0;const g=[],p=i/2;let f=0;M(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(c),this.setAttribute("position",new xt(h,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(m,2));function M(){const E=new C,U=new C;let P=0;const R=(t-e)/i;for(let O=0;O<=r;O++){const k=[],y=O/r,T=y*(t-e)+e;for(let L=0;L<=s;L++){const z=L/s,D=z*l+o,q=Math.sin(D),G=Math.cos(D);U.x=T*q,U.y=-y*i+p,U.z=T*G,h.push(U.x,U.y,U.z),E.set(q,R,G).normalize(),d.push(E.x,E.y,E.z),m.push(z,1-y),k.push(v++)}g.push(k)}for(let O=0;O<s;O++)for(let k=0;k<r;k++){const y=g[k][O],T=g[k+1][O],L=g[k+1][O+1],z=g[k][O+1];c.push(y,T,z),c.push(T,L,z),P+=6}u.addGroup(f,P,0),f+=P}function x(E){const U=v,P=new Ae,R=new C;let O=0;const k=E===!0?e:t,y=E===!0?1:-1;for(let L=1;L<=s;L++)h.push(0,p*y,0),d.push(0,y,0),m.push(.5,.5),v++;const T=v;for(let L=0;L<=s;L++){const D=L/s*l+o,q=Math.cos(D),G=Math.sin(D);R.x=k*G,R.y=p*y,R.z=k*q,h.push(R.x,R.y,R.z),d.push(0,y,0),P.x=q*.5+.5,P.y=G*.5*y+.5,m.push(P.x,P.y),v++}for(let L=0;L<s;L++){const z=U+L,D=T+L;E===!0?c.push(D,D+1,z):c.push(D+1,D,z),O+=3}u.addGroup(f,O,E===!0?1:2),f+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ot(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ac extends ot{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ac(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Rc extends Ct{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],u=[],c=[];let h=e;const d=(t-e)/s,m=new C,v=new Ae;for(let g=0;g<=s;g++){for(let p=0;p<=i;p++){const f=r+p/i*a;m.x=h*Math.cos(f),m.y=h*Math.sin(f),l.push(m.x,m.y,m.z),u.push(0,0,1),v.x=(m.x/t+1)/2,v.y=(m.y/t+1)/2,c.push(v.x,v.y)}h+=d}for(let g=0;g<s;g++){const p=g*(i+1);for(let f=0;f<i;f++){const M=f+p,x=M,E=M+i+1,U=M+i+2,P=M+1;o.push(x,E,P),o.push(E,U,P)}}this.setIndex(o),this.setAttribute("position",new xt(l,3)),this.setAttribute("normal",new xt(u,3)),this.setAttribute("uv",new xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pn extends Ct{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let u=0;const c=[],h=new C,d=new C,m=[],v=[],g=[],p=[];for(let f=0;f<=i;f++){const M=[],x=f/i;let E=0;f===0&&a===0?E=.5/t:f===i&&l===Math.PI&&(E=-.5/t);for(let U=0;U<=t;U++){const P=U/t;h.x=-e*Math.cos(s+P*r)*Math.sin(a+x*o),h.y=e*Math.cos(a+x*o),h.z=e*Math.sin(s+P*r)*Math.sin(a+x*o),v.push(h.x,h.y,h.z),d.copy(h).normalize(),g.push(d.x,d.y,d.z),p.push(P+E,1-x),M.push(u++)}c.push(M)}for(let f=0;f<i;f++)for(let M=0;M<t;M++){const x=c[f][M+1],E=c[f][M],U=c[f+1][M],P=c[f+1][M+1];(f!==0||a>0)&&m.push(x,E,P),(f!==i-1||l<Math.PI)&&m.push(E,U,P)}this.setIndex(m),this.setAttribute("position",new xt(v,3)),this.setAttribute("normal",new xt(g,3)),this.setAttribute("uv",new xt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class _n extends Ct{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],u=[],c=new C,h=new C,d=new C;for(let m=0;m<=i;m++)for(let v=0;v<=s;v++){const g=v/s*r,p=m/i*Math.PI*2;h.x=(e+t*Math.cos(p))*Math.cos(g),h.y=(e+t*Math.cos(p))*Math.sin(g),h.z=t*Math.sin(p),o.push(h.x,h.y,h.z),c.x=e*Math.cos(g),c.y=e*Math.sin(g),d.subVectors(h,c).normalize(),l.push(d.x,d.y,d.z),u.push(v/s),u.push(m/i)}for(let m=1;m<=i;m++)for(let v=1;v<=s;v++){const g=(s+1)*m+v-1,p=(s+1)*(m-1)+v-1,f=(s+1)*(m-1)+v,M=(s+1)*m+v;a.push(g,p,M),a.push(p,f,M)}this.setIndex(a),this.setAttribute("position",new xt(o,3)),this.setAttribute("normal",new xt(l,3)),this.setAttribute("uv",new xt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Nt extends zi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ud,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Kh={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class SS{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(c){o++,r===!1&&s.onStart!==void 0&&s.onStart(c,a,o),r=!0},this.itemEnd=function(c){a++,s.onProgress!==void 0&&s.onProgress(c,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(c){s.onError!==void 0&&s.onError(c)},this.resolveURL=function(c){return l?l(c):c},this.setURLModifier=function(c){return l=c,this},this.addHandler=function(c,h){return u.push(c,h),this},this.removeHandler=function(c){const h=u.indexOf(c);return h!==-1&&u.splice(h,2),this},this.getHandler=function(c){for(let h=0,d=u.length;h<d;h+=2){const m=u[h],v=u[h+1];if(m.global&&(m.lastIndex=0),m.test(c))return v}return null}}}const ES=new SS;class Cc{constructor(e){this.manager=e!==void 0?e:ES,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Cc.DEFAULT_MATERIAL_NAME="__DEFAULT";class TS extends Cc{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Kh.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=qr("img");function l(){c(),Kh.add(e,this),t&&t(this),r.manager.itemEnd(e)}function u(h){c(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function c(){o.removeEventListener("load",l,!1),o.removeEventListener("error",u,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class rp extends Cc{constructor(e){super(e)}load(e,t,i,s){const r=new Xt,a=new TS(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class Pc extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class bS extends Pc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const bl=new ht,$h=new C,Zh=new C;class op{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ec,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;$h.setFromMatrixPosition(e.matrixWorld),t.position.copy($h),Zh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zh),t.updateMatrixWorld(),bl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(bl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Jh=new ht,Mr=new C,wl=new C;class wS extends op{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ae(4,2),this._viewportCount=6,this._viewports=[new St(2,1,1,1),new St(0,1,1,1),new St(3,1,1,1),new St(1,1,1,1),new St(3,0,1,1),new St(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Mr.setFromMatrixPosition(e.matrixWorld),i.position.copy(Mr),wl.copy(i.position),wl.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(wl),i.updateMatrixWorld(),s.makeTranslation(-Mr.x,-Mr.y,-Mr.z),Jh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jh)}}class AS extends Pc{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new wS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class RS extends op{constructor(){super(new Tc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qh extends Pc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new RS}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ap{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ef(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ef();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ef(){return(typeof performance>"u"?Date:performance).now()}class tf{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Qt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xc);const nf={type:"change"},Al={type:"start"},sf={type:"end"},No=new Ea,rf=new Ri,CS=Math.cos(70*jl.DEG2RAD);class PS extends fs{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:vs.ROTATE,MIDDLE:vs.DOLLY,RIGHT:vs.PAN},this.touches={ONE:_s.ROTATE,TWO:_s.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",we),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",we),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(nf),i.update(),r=s.NONE},this.update=function(){const I=new C,he=new _i().setFromUnitVectors(e.up,new C(0,1,0)),Ie=he.clone().invert(),N=new C,ve=new _i,j=new C,me=2*Math.PI;return function(Qe=null){const lt=i.object.position;I.copy(lt).sub(i.target),I.applyQuaternion(he),o.setFromVector3(I),i.autoRotate&&r===s.NONE&&L(y(Qe)),i.enableDamping?(o.theta+=l.theta*i.dampingFactor,o.phi+=l.phi*i.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let ft=i.minAzimuthAngle,bt=i.maxAzimuthAngle;isFinite(ft)&&isFinite(bt)&&(ft<-Math.PI?ft+=me:ft>Math.PI&&(ft-=me),bt<-Math.PI?bt+=me:bt>Math.PI&&(bt-=me),ft<=bt?o.theta=Math.max(ft,Math.min(bt,o.theta)):o.theta=o.theta>(ft+bt)/2?Math.max(ft,o.theta):Math.min(bt,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(c,i.dampingFactor):i.target.add(c),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor);let tt=!1;if(i.zoomToCursor&&P||i.object.isOrthographicCamera)o.radius=oe(o.radius);else{const vt=o.radius;o.radius=oe(o.radius*u),tt=vt!=o.radius}if(I.setFromSpherical(o),I.applyQuaternion(Ie),lt.copy(i.target).add(I),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,c.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),c.set(0,0,0)),i.zoomToCursor&&P){let vt=null;if(i.object.isPerspectiveCamera){const qt=I.length();vt=oe(qt*u);const Gi=qt-vt;i.object.position.addScaledVector(E,Gi),i.object.updateMatrixWorld(),tt=!!Gi}else if(i.object.isOrthographicCamera){const qt=new C(U.x,U.y,0);qt.unproject(i.object);const Gi=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/u)),i.object.updateProjectionMatrix(),tt=Gi!==i.object.zoom;const Zr=new C(U.x,U.y,0);Zr.unproject(i.object),i.object.position.sub(Zr).add(qt),i.object.updateMatrixWorld(),vt=I.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;vt!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(vt).add(i.object.position):(No.origin.copy(i.object.position),No.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(No.direction))<CS?e.lookAt(i.target):(rf.setFromNormalAndCoplanarPoint(i.object.up,i.target),No.intersectPlane(rf,i.target))))}else if(i.object.isOrthographicCamera){const vt=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/u)),vt!==i.object.zoom&&(i.object.updateProjectionMatrix(),tt=!0)}return u=1,P=!1,tt||N.distanceToSquared(i.object.position)>a||8*(1-ve.dot(i.object.quaternion))>a||j.distanceToSquared(i.target)>a?(i.dispatchEvent(nf),N.copy(i.object.position),ve.copy(i.object.quaternion),j.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Oe),i.domElement.removeEventListener("pointerdown",ce),i.domElement.removeEventListener("pointercancel",b),i.domElement.removeEventListener("wheel",V),i.domElement.removeEventListener("pointermove",ie),i.domElement.removeEventListener("pointerup",b),i.domElement.getRootNode().removeEventListener("keydown",re,{capture:!0}),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",we),i._domElementKeyEvents=null)};const i=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new tf,l=new tf;let u=1;const c=new C,h=new Ae,d=new Ae,m=new Ae,v=new Ae,g=new Ae,p=new Ae,f=new Ae,M=new Ae,x=new Ae,E=new C,U=new Ae;let P=!1;const R=[],O={};let k=!1;function y(I){return I!==null?2*Math.PI/60*i.autoRotateSpeed*I:2*Math.PI/60/60*i.autoRotateSpeed}function T(I){const he=Math.abs(I*.01);return Math.pow(.95,i.zoomSpeed*he)}function L(I){l.theta-=I}function z(I){l.phi-=I}const D=function(){const I=new C;return function(Ie,N){I.setFromMatrixColumn(N,0),I.multiplyScalar(-Ie),c.add(I)}}(),q=function(){const I=new C;return function(Ie,N){i.screenSpacePanning===!0?I.setFromMatrixColumn(N,1):(I.setFromMatrixColumn(N,0),I.crossVectors(i.object.up,I)),I.multiplyScalar(Ie),c.add(I)}}(),G=function(){const I=new C;return function(Ie,N){const ve=i.domElement;if(i.object.isPerspectiveCamera){const j=i.object.position;I.copy(j).sub(i.target);let me=I.length();me*=Math.tan(i.object.fov/2*Math.PI/180),D(2*Ie*me/ve.clientHeight,i.object.matrix),q(2*N*me/ve.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(D(Ie*(i.object.right-i.object.left)/i.object.zoom/ve.clientWidth,i.object.matrix),q(N*(i.object.top-i.object.bottom)/i.object.zoom/ve.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function J(I){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?u/=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function F(I){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?u*=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function Q(I,he){if(!i.zoomToCursor)return;P=!0;const Ie=i.domElement.getBoundingClientRect(),N=I-Ie.left,ve=he-Ie.top,j=Ie.width,me=Ie.height;U.x=N/j*2-1,U.y=-(ve/me)*2+1,E.set(U.x,U.y,1).unproject(i.object).sub(i.object.position).normalize()}function oe(I){return Math.max(i.minDistance,Math.min(i.maxDistance,I))}function fe(I){h.set(I.clientX,I.clientY)}function ye(I){Q(I.clientX,I.clientX),f.set(I.clientX,I.clientY)}function ze(I){v.set(I.clientX,I.clientY)}function te(I){d.set(I.clientX,I.clientY),m.subVectors(d,h).multiplyScalar(i.rotateSpeed);const he=i.domElement;L(2*Math.PI*m.x/he.clientHeight),z(2*Math.PI*m.y/he.clientHeight),h.copy(d),i.update()}function de(I){M.set(I.clientX,I.clientY),x.subVectors(M,f),x.y>0?J(T(x.y)):x.y<0&&F(T(x.y)),f.copy(M),i.update()}function Se(I){g.set(I.clientX,I.clientY),p.subVectors(g,v).multiplyScalar(i.panSpeed),G(p.x,p.y),v.copy(g),i.update()}function Ge(I){Q(I.clientX,I.clientY),I.deltaY<0?F(T(I.deltaY)):I.deltaY>0&&J(T(I.deltaY)),i.update()}function Ue(I){let he=!1;switch(I.code){case i.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?z(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(0,i.keyPanSpeed),he=!0;break;case i.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?z(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(0,-i.keyPanSpeed),he=!0;break;case i.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?L(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(i.keyPanSpeed,0),he=!0;break;case i.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?L(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(-i.keyPanSpeed,0),he=!0;break}he&&(I.preventDefault(),i.update())}function Re(I){if(R.length===1)h.set(I.pageX,I.pageY);else{const he=Pe(I),Ie=.5*(I.pageX+he.x),N=.5*(I.pageY+he.y);h.set(Ie,N)}}function et(I){if(R.length===1)v.set(I.pageX,I.pageY);else{const he=Pe(I),Ie=.5*(I.pageX+he.x),N=.5*(I.pageY+he.y);v.set(Ie,N)}}function A(I){const he=Pe(I),Ie=I.pageX-he.x,N=I.pageY-he.y,ve=Math.sqrt(Ie*Ie+N*N);f.set(0,ve)}function S(I){i.enableZoom&&A(I),i.enablePan&&et(I)}function K(I){i.enableZoom&&A(I),i.enableRotate&&Re(I)}function Y(I){if(R.length==1)d.set(I.pageX,I.pageY);else{const Ie=Pe(I),N=.5*(I.pageX+Ie.x),ve=.5*(I.pageY+Ie.y);d.set(N,ve)}m.subVectors(d,h).multiplyScalar(i.rotateSpeed);const he=i.domElement;L(2*Math.PI*m.x/he.clientHeight),z(2*Math.PI*m.y/he.clientHeight),h.copy(d)}function $(I){if(R.length===1)g.set(I.pageX,I.pageY);else{const he=Pe(I),Ie=.5*(I.pageX+he.x),N=.5*(I.pageY+he.y);g.set(Ie,N)}p.subVectors(g,v).multiplyScalar(i.panSpeed),G(p.x,p.y),v.copy(g)}function W(I){const he=Pe(I),Ie=I.pageX-he.x,N=I.pageY-he.y,ve=Math.sqrt(Ie*Ie+N*N);M.set(0,ve),x.set(0,Math.pow(M.y/f.y,i.zoomSpeed)),J(x.y),f.copy(M);const j=(I.pageX+he.x)*.5,me=(I.pageY+he.y)*.5;Q(j,me)}function ue(I){i.enableZoom&&W(I),i.enablePan&&$(I)}function le(I){i.enableZoom&&W(I),i.enableRotate&&Y(I)}function ce(I){i.enabled!==!1&&(R.length===0&&(i.domElement.setPointerCapture(I.pointerId),i.domElement.addEventListener("pointermove",ie),i.domElement.addEventListener("pointerup",b)),!Fe(I)&&(ge(I),I.pointerType==="touch"?pe(I):_(I)))}function ie(I){i.enabled!==!1&&(I.pointerType==="touch"?xe(I):B(I))}function b(I){switch(gt(I),R.length){case 0:i.domElement.releasePointerCapture(I.pointerId),i.domElement.removeEventListener("pointermove",ie),i.domElement.removeEventListener("pointerup",b),i.dispatchEvent(sf),r=s.NONE;break;case 1:const he=R[0],Ie=O[he];pe({pointerId:he,pageX:Ie.x,pageY:Ie.y});break}}function _(I){let he;switch(I.button){case 0:he=i.mouseButtons.LEFT;break;case 1:he=i.mouseButtons.MIDDLE;break;case 2:he=i.mouseButtons.RIGHT;break;default:he=-1}switch(he){case vs.DOLLY:if(i.enableZoom===!1)return;ye(I),r=s.DOLLY;break;case vs.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enablePan===!1)return;ze(I),r=s.PAN}else{if(i.enableRotate===!1)return;fe(I),r=s.ROTATE}break;case vs.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enableRotate===!1)return;fe(I),r=s.ROTATE}else{if(i.enablePan===!1)return;ze(I),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(Al)}function B(I){switch(r){case s.ROTATE:if(i.enableRotate===!1)return;te(I);break;case s.DOLLY:if(i.enableZoom===!1)return;de(I);break;case s.PAN:if(i.enablePan===!1)return;Se(I);break}}function V(I){i.enabled===!1||i.enableZoom===!1||r!==s.NONE||(I.preventDefault(),i.dispatchEvent(Al),Ge(ae(I)),i.dispatchEvent(sf))}function ae(I){const he=I.deltaMode,Ie={clientX:I.clientX,clientY:I.clientY,deltaY:I.deltaY};switch(he){case 1:Ie.deltaY*=16;break;case 2:Ie.deltaY*=100;break}return I.ctrlKey&&!k&&(Ie.deltaY*=10),Ie}function re(I){I.key==="Control"&&(k=!0,i.domElement.getRootNode().addEventListener("keyup",Ee,{passive:!0,capture:!0}))}function Ee(I){I.key==="Control"&&(k=!1,i.domElement.getRootNode().removeEventListener("keyup",Ee,{passive:!0,capture:!0}))}function we(I){i.enabled===!1||i.enablePan===!1||Ue(I)}function pe(I){switch(Le(I),R.length){case 1:switch(i.touches.ONE){case _s.ROTATE:if(i.enableRotate===!1)return;Re(I),r=s.TOUCH_ROTATE;break;case _s.PAN:if(i.enablePan===!1)return;et(I),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(i.touches.TWO){case _s.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;S(I),r=s.TOUCH_DOLLY_PAN;break;case _s.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;K(I),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(Al)}function xe(I){switch(Le(I),r){case s.TOUCH_ROTATE:if(i.enableRotate===!1)return;Y(I),i.update();break;case s.TOUCH_PAN:if(i.enablePan===!1)return;$(I),i.update();break;case s.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ue(I),i.update();break;case s.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;le(I),i.update();break;default:r=s.NONE}}function Oe(I){i.enabled!==!1&&I.preventDefault()}function ge(I){R.push(I.pointerId)}function gt(I){delete O[I.pointerId];for(let he=0;he<R.length;he++)if(R[he]==I.pointerId){R.splice(he,1);return}}function Fe(I){for(let he=0;he<R.length;he++)if(R[he]==I.pointerId)return!0;return!1}function Le(I){let he=O[I.pointerId];he===void 0&&(he=new Ae,O[I.pointerId]=he),he.set(I.pageX,I.pageY)}function Pe(I){const he=I.pointerId===R[0]?R[1]:R[0];return O[he]}i.domElement.addEventListener("contextmenu",Oe),i.domElement.addEventListener("pointerdown",ce),i.domElement.addEventListener("pointercancel",b),i.domElement.addEventListener("wheel",V,{passive:!1}),i.domElement.getRootNode().addEventListener("keydown",re,{passive:!0,capture:!0}),this.update()}}const lp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class $r{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const LS=new Tc(-1,1,1,-1,0,1);class IS extends Ct{constructor(){super(),this.setAttribute("position",new xt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new xt([0,2,0,0,2,0],2))}}const DS=new IS;class cp{constructor(e){this._mesh=new _e(DS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,LS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class up extends $r{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof mt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ra.clone(e.uniforms),this.material=new mt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new cp(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class of extends $r{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class US extends $r{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class NS{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Ae);this._width=i.width,this._height=i.height,t=new Gn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:gi}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new up(lp),this.copyPass.material.blending=mi,this.clock=new ap}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}of!==void 0&&(a instanceof of?i=!0:a instanceof US&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class OS extends $r{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new je}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const FS={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new je(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class nr extends $r{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new Ae(e.x,e.y):new Ae(256,256),this.clearColor=new je(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Gn(r,a,{type:gi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new Gn(r,a,{type:gi});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const m=new Gn(r,a,{type:gi});m.texture.name="UnrealBloomPass.v"+h,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),a=Math.round(a/2)}const o=FS;this.highPassUniforms=ra.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new mt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ae(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=lp;this.copyUniforms=ra.clone(c.uniforms),this.blendMaterial=new mt({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:cn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new je,this.oldClearAlpha=1,this.basic=new ln,this.fsQuad=new cp(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ae(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=nr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=nr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new mt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ae(.5,.5)},direction:{value:new Ae(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new mt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}nr.BlurDirectionX=new Ae(1,0);nr.BlurDirectionY=new Ae(0,1);const us=[{id:"EARTH",labelEn:"EARTH",labelZh:"地球全景",titleEn:"EARTH",titleZh:"地球 · 行星方舟",subEn:"HOME — EN ROUTE TO ALPHA CENTAURI",subZh:"人类家园 · 正在驶向 4.2 光年外的半人马座 α 星",altitudeTag:"ALT: GLOBAL ORBIT"},{id:"ENGINE_ARRAY",labelEn:"ENGINES",labelZh:"推进阵列",titleEn:"ENGINE ARRAY 01",titleZh:"一号行星发动机阵列",subEn:"PLANETARY THRUST UNIT — NORTHERN CAP",subZh:"北半球重元素聚变推进单元 · 11 公里级等离子巨塔",altitudeTag:"ALT: 11.2 KM MSL"},{id:"EQUATORIAL",labelEn:"STEERING",labelZh:"赤道转向",titleEn:"EQUATORIAL STEERING ARRAY",titleZh:"赤道转向发动机阵列",subEn:"ROTATIONAL TORQUE CONTROL",subZh:"行星自转制动扭矩控制阵列 · 切向等离子齐射",altitudeTag:"LAT: 00°00′ EQUATOR"},{id:"ANCHOR",labelEn:"ELEVATOR",labelZh:"太空电梯",titleEn:"EQUATORIAL ANCHOR",titleZh:"加蓬太空电梯地面锚点",subEn:"SPACE ELEVATOR BASE STATION — GABON",subZh:"太空电梯赤道地面基座 · 电磁导轨与碳纳米管天梯索道",altitudeTag:"ALT: 45 KM STRATOSPHERE"},{id:"TIANZHU",labelEn:"APEX",labelZh:"天柱空间站",titleEn:"TIANZHU APEX STATION",titleZh:"“天柱号”同步轨道终端站",subEn:"COUNTERWEIGHT TERMINAL — 35,786 KM",subZh:"地球同步轨道配重终端 · 海拔 35,786 公里",altitudeTag:"ALT: 35,786 KM GEO"},{id:"HABITAT",labelEn:"HABITAT",labelZh:"极光殖民环",titleEn:"HABITAT RING AURORA",titleZh:"“极光号”双环旋转殖民城",subEn:"ROTATING COLONY — LEO",subZh:"近地轨道斯坦福双环旋转生态领航城",altitudeTag:"ORB: 52,400 KM HEO"},{id:"DEEP_SPACE",labelEn:"DEEP SPACE",labelZh:"深空阵列",titleEn:"DEEP SPACE ARRAY",titleZh:"深空太阳帆激光中继网",subEn:"SOLAR SAIL RELAY NETWORK",subZh:"日心轨道镀金折反射镜与相控阵激光中继阵列",altitudeTag:"DIST: 1.42M KM L1"},{id:"LUNA",labelEn:"LUNA",labelZh:"月球放逐",titleEn:"LUNA",titleZh:"月球 · 放逐伴星",subEn:"ABANDONED ORBITAL COMPANION",subZh:"静海核聚变放逐阵列 · 已解除地月引力锁定",altitudeTag:"DIST: 384,400 KM"},{id:"IGNITION_NODE",labelEn:"IGNITION",labelZh:"喷口特写",titleEn:"IGNITION",titleZh:"苍穹点火 · 主喷口矩阵",subEn:"PRIMARY THRUST NOZZLE MATRIX",subZh:"主推进高炉仰视特写 · 等离子光柱刺穿平流层",altitudeTag:"ALT: 2.4 KM SURFACE"}],X=da({lang:"ZH",audioEnabled:!0,hudVisible:!0,bloomEnabled:!0,mossOpen:!1,thrustPercent:95.8,twelveStrikeActive:!1,heliosOverdrive:!1,strikeCount:0,elapsedSeconds:4829104,jitter:0,accumulatedVelocityKmS:29.07,accumulatedSolarDistAU:1.0475,sunRecessionUnits:0,currentMode:"CINEMATIC",currentNode:"EARTH",storyActive:!1,storyChapter:"",storyTitle:"",storySubtitle:"",reticles:[]});function BS(n){const e=X.thrustPercent/100,t=X.twelveStrikeActive?1.45:X.heliosOverdrive?1.25:1,i=e*t;i>.02?X.accumulatedVelocityKmS=Math.min(85,X.accumulatedVelocityKmS+i*.045*n):X.accumulatedVelocityKmS=Math.max(12,X.accumulatedVelocityKmS-.015*n);const s=X.accumulatedVelocityKmS/29.07*i;X.accumulatedSolarDistAU+=s*38e-5*n,X.sunRecessionUnits=(X.sunRecessionUnits+s*9.5*n)%320}const Bt=_c(()=>{const n=X.thrustPercent/100,e=X.twelveStrikeActive?1.25:X.heliosOverdrive?1.15:1,i=`${(128.4*n*e+(n>0?X.jitter*.35:0)).toFixed(1)} MT/s`,r=`${(4.85*n*e+(n>0?X.jitter*.01:0)).toFixed(3)}e8 K`,a=X.thrustPercent<2?0:Math.min(1e4,Math.round(9985+n*15)),o=X.twelveStrikeActive||X.heliosOverdrive?"10,000 / 10,000 [120% OVERCLOCK]":`${a.toLocaleString()} / 10,000`,l=Math.min(99.99,99.84+X.jitter*.02).toFixed(2)+"%",c=`${(X.accumulatedVelocityKmS+X.jitter*.01).toFixed(2)} km/s`,h=X.accumulatedSolarDistAU.toFixed(4)+" AU",d=X.elapsedSeconds,m=Math.floor(d/86400),v=String(Math.floor(d%86400/3600)).padStart(2,"0"),g=String(Math.floor(d%3600/60)).padStart(2,"0"),p=String(d%60).padStart(2,"0"),f=`Y04 D${m} ${v}:${g}:${p}`,M=Math.min(1,(X.accumulatedSolarDistAU-1.0475)/.12),x=-.25+M*1.85,E=24+M*30,U=66+Math.cos(x)*E,P=66+Math.sin(x)*E,R=us.find(O=>O.id===X.currentNode)||us[0];return{fuelRate:i,coreTemp:r,activeEngines:o,torqueBalance:l,earthVelocity:c,solarDistance:h,timeElapsed:f,radarEarthX:U,radarEarthY:P,nodeMeta:R}});class zS extends np{constructor(e=null){super();const t=new Ht;t.deleteAttribute("uv");const i=new Nt({side:Ft}),s=new Nt;let r=5;e!==null&&e._useLegacyLights===!1&&(r=900);const a=new AS(16777215,r,28,2);a.position.set(.418,16.199,.3),this.add(a);const o=new _e(t,i);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const l=new _e(t,s);l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),this.add(l);const u=new _e(t,s);u.position.set(-5.607,-.754,-.758),u.rotation.set(0,.994,0),u.scale.set(1.97,1.534,3.955),this.add(u);const c=new _e(t,s);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const h=new _e(t,s);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);const d=new _e(t,s);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);const m=new _e(t,s);m.position.set(-2.193,-.369,-5.547),m.rotation.set(0,.516,0),m.scale.set(3.875,3.487,2.986),this.add(m);const v=new _e(t,Gs(50));v.position.set(-16.116,14.37,8.208),v.scale.set(.1,2.428,2.739),this.add(v);const g=new _e(t,Gs(50));g.position.set(-16.109,18.021,-8.207),g.scale.set(.1,2.425,2.751),this.add(g);const p=new _e(t,Gs(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);const f=new _e(t,Gs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const M=new _e(t,Gs(20));M.position.set(3.235,11.486,-12.541),M.scale.set(2.5,2,.1),this.add(M);const x=new _e(t,Gs(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Gs(n){const e=new ln;return e.color.setScalar(n),e}class af{constructor(){be(this,"steelAlbedo");be(this,"steelNormal");be(this,"steelRoughness");be(this,"furnaceWindowTex");be(this,"champagneHullTex");be(this,"solarWingTex");be(this,"frozenEarthDayTex");be(this,"frozenEarthBumpTex");be(this,"frozenEarthWaterTex");be(this,"frozenEarthNightTex");be(this,"fluffyCloudsTex");be(this,"moonRegolithTex");be(this,"softGlowSprite");be(this,"mistSpriteTex");const e=this.createHeavyIndustrialPBRMaps();this.steelAlbedo=e.albedo,this.steelNormal=e.normal,this.steelRoughness=e.roughness,this.furnaceWindowTex=this.createWarmOrangeGantryTexture(),this.champagneHullTex=this.createChampagneBevelTexture(),this.solarWingTex=this.createSapphireSiliconSolarTexture();const t=this.createSmoothFrozenEarthTextures();this.frozenEarthDayTex=t.day,this.frozenEarthBumpTex=t.bump,this.frozenEarthWaterTex=t.water,this.frozenEarthNightTex=t.night,this.fluffyCloudsTex=this.createSilkyCycloneCloudsTexture(),this.moonRegolithTex=this.createApolloLunarRegolithTexture(),this.softGlowSprite=this.createSoftRadialGlowSprite(),this.mistSpriteTex=this.createVolumetricMistTexture()}static createStudioSpaceHDRI(e){const t=new Kl(e);t.compileEquirectangularShader();const i=new zS,s=new mt({side:Ft,vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vDir;
        void main() {
          vec3 d = normalize(vDir);
          vec3 darkSpace = vec3(0.04, 0.08, 0.15);
          vec3 horizonStrip = vec3(0.28, 0.68, 1.35) * exp(-pow((d.y + 0.25) * 3.2, 2.0));
          float sunSpec = pow(max(0.0, dot(d, normalize(vec3(0.68, 0.35, 0.64)))), 28.0);
          vec3 col = darkSpace + horizonStrip + vec3(2.4, 2.2, 1.9) * sunSpec;
          gl_FragColor = vec4(col, 1.0);
        }
      `});i.add(new _e(new pn(45,32,16),s));const r=t.fromScene(i,.025).texture;return t.dispose(),r}configureSmoothTexture(e,t=!1){return e.generateMipmaps=!0,e.minFilter=jn,e.magFilter=Vt,t?(e.wrapS=Ks,e.wrapT=Ks):(e.wrapS=Ks,e.wrapT=wn),e.needsUpdate=!0,e}createHeavyIndustrialPBRMaps(){const t=new Float32Array(262144),i=document.createElement("canvas");i.width=512,i.height=512;const s=i.getContext("2d"),r=document.createElement("canvas");r.width=512,r.height=512;const a=r.getContext("2d");for(let d=0;d<512;d++)for(let m=0;m<512;m++){const v=Math.floor(d/64),g=v%2*48,p=(m+g)%96,f=d%64,M=p<3||f<3,x=f>18&&f<46&&p%16<4,E=Math.hypot(p-10,f-10)<3||Math.hypot(p-86,f-10)<3||Math.hypot(p-10,f-54)<3||Math.hypot(p-86,f-54)<3,U=Math.sin(m*12.9898+d*78.233)*43758.5453%1;let P=.5+U*.06;M?P=.08:E?P=.92:x&&(P=.72),t[d*512+m]=P;let O=40+(v+Math.floor((m+g)/96))%3*7+U*7;M?O=15:E?O=72:(p<6||f<6)&&(O+=16),s.fillStyle=`rgb(${O}, ${O+6}, ${O+14})`,s.fillRect(m,d,1,1);let k=110+U*20;M?k=230:(E||p<6||f<6)&&(k=50),a.fillStyle=`rgb(${k}, ${k}, ${k})`,a.fillRect(m,d,1,1)}const o=document.createElement("canvas");o.width=512,o.height=512;const l=o.getContext("2d"),u=l.createImageData(512,512),c=5;for(let d=0;d<512;d++)for(let m=0;m<512;m++){const v=(m-1+512)%512,g=(m+1)%512,p=(d-1+512)%512,f=(d+1)%512,M=t[p*512+g]+2*t[d*512+g]+t[f*512+g]-(t[p*512+v]+2*t[d*512+v]+t[f*512+v]),x=t[f*512+v]+2*t[f*512+m]+t[f*512+g]-(t[p*512+v]+2*t[p*512+m]+t[p*512+g]),E=-M*c,U=-x*c,P=1,R=Math.hypot(E,U,P),O=(d*512+m)*4;u.data[O]=Math.round((E/R*.5+.5)*255),u.data[O+1]=Math.round((U/R*.5+.5)*255),u.data[O+2]=Math.round((P/R*.5+.5)*255),u.data[O+3]=255}l.putImageData(u,0,0);const h=(d,m,v)=>(this.configureSmoothTexture(d,!0),d.repeat.set(m,v),d);return{albedo:h(new fn(i),4,4),normal:h(new fn(o),4,4),roughness:h(new fn(r),4,4)}}createSoftRadialGlowSprite(){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d"),i=t.createRadialGradient(64,64,0,64,64,64);return i.addColorStop(0,"rgba(255, 255, 255, 1.0)"),i.addColorStop(.25,"rgba(210, 252, 255, 0.95)"),i.addColorStop(.58,"rgba(0, 195, 255, 0.35)"),i.addColorStop(1,"rgba(0, 0, 0, 0.0)"),t.fillStyle=i,t.fillRect(0,0,128,128),this.configureSmoothTexture(new fn(e),!1)}createVolumetricMistTexture(){const e=document.createElement("canvas");e.width=256,e.height=128;const t=e.getContext("2d"),i=t.createRadialGradient(128,64,6,128,64,118);return i.addColorStop(0,"rgba(180, 235, 255, 0.42)"),i.addColorStop(.5,"rgba(60, 145, 225, 0.14)"),i.addColorStop(1,"rgba(0, 0, 0, 0.0)"),t.fillStyle=i,t.fillRect(0,0,256,128),this.configureSmoothTexture(new fn(e),!1)}createWarmOrangeGantryTexture(){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.fillStyle="#070a0f",t.fillRect(0,0,512,128);for(let s=14;s<114;s+=18)for(let r=4;r<506;r+=8)Math.random()>.2&&(t.fillStyle=Math.random()>.25?"#ff8811":"#ffdd88",t.fillRect(r,s,5,4));const i=this.configureSmoothTexture(new fn(e),!0);return i.repeat.set(8,1),i}createChampagneBevelTexture(){const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d");t.fillStyle="#c8cfd8",t.fillRect(0,0,512,512),t.strokeStyle="#647080",t.lineWidth=2;for(let s=0;s<512;s+=64)for(let r=0;r<512;r+=96)t.fillStyle=(r+s)%128===0?"#d8dfe8":"#b8c0cc",t.fillRect(r+2,s+2,92,60),t.strokeRect(r,s,96,64);const i=this.configureSmoothTexture(new fn(e),!0);return i.repeat.set(6,2),i}createSapphireSiliconSolarTexture(){const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d");t.fillStyle="#182b49",t.fillRect(0,0,512,512),t.strokeStyle="#365d94",t.lineWidth=1.5;for(let s=0;s<=512;s+=24)t.beginPath(),t.moveTo(s,0),t.lineTo(s,512),t.stroke(),t.beginPath(),t.moveTo(0,s),t.lineTo(512,s),t.stroke();t.strokeStyle="#94a3b8",t.lineWidth=3;for(let s=64;s<512;s+=128)t.beginPath(),t.moveTo(s,0),t.lineTo(s,512),t.stroke();const i=this.configureSmoothTexture(new fn(e),!0);return i.repeat.set(3,1),i}createSmoothFrozenEarthTextures(){const i=document.createElement("canvas");i.width=1024,i.height=512;const s=i.getContext("2d"),r=s.createLinearGradient(0,0,0,512);r.addColorStop(0,"#b8d4ee"),r.addColorStop(.15,"#184278"),r.addColorStop(.5,"#0e2d56"),r.addColorStop(.85,"#184278"),r.addColorStop(1,"#c5ddf2"),s.fillStyle=r,s.fillRect(0,0,1024,512);const a=document.createElement("canvas");a.width=1024,a.height=512;const o=a.getContext("2d");o.fillStyle="#080808",o.fillRect(0,0,1024,512);const l=document.createElement("canvas");l.width=1024,l.height=512;const u=l.getContext("2d");u.fillStyle="#ffffff",u.fillRect(0,0,1024,512);const c=document.createElement("canvas");c.width=1024,c.height=512;const h=c.getContext("2d");h.fillStyle="#000000",h.fillRect(0,0,1024,512),[{x:675,y:135,rx:210,ry:75},{x:775,y:185,rx:105,ry:58},{x:550,y:255,rx:92,ry:88},{x:215,y:145,rx:132,ry:68},{x:315,y:325,rx:72,ry:84},{x:835,y:348,rx:72,ry:42}].forEach(v=>{for(let g=0;g<110;g++){const p=g/110*Math.PI*2,f=.5+.45*Math.sin(g*3.7)*Math.cos(g*2.3),M=v.x+Math.cos(p)*v.rx*f,x=v.y+Math.sin(p)*v.ry*f,E=28+g%38,U=s.createRadialGradient(M,x,2,M,x,E);U.addColorStop(0,"rgba(235, 244, 255, 0.68)"),U.addColorStop(.5,"rgba(165, 195, 225, 0.45)"),U.addColorStop(1,"rgba(24, 66, 120, 0.0)"),s.fillStyle=U,s.beginPath(),s.arc(M,x,E,0,Math.PI*2),s.fill();const P=o.createRadialGradient(M,x,1,M,x,E*.85);P.addColorStop(0,"rgba(220, 220, 220, 0.35)"),P.addColorStop(.5,"rgba(110, 110, 110, 0.18)"),P.addColorStop(1,"rgba(0, 0, 0, 0.0)"),o.fillStyle=P,o.beginPath(),o.arc(M,x,E*.85,0,Math.PI*2),o.fill();const R=u.createRadialGradient(M,x,4,M,x,E*.9);R.addColorStop(0,"rgba(0, 0, 0, 0.85)"),R.addColorStop(.7,"rgba(0, 0, 0, 0.4)"),R.addColorStop(1,"rgba(0, 0, 0, 0.0)"),u.fillStyle=R,o.beginPath(),u.arc(M,x,E*.9,0,Math.PI*2),u.fill()}for(let g=0;g<75;g++){const p=v.x+(Math.random()-.5)*v.rx*1.3,f=v.y+(Math.random()-.5)*v.ry*1.2,M=4+Math.random()*7.5,x=h.createRadialGradient(p,f,.2,p,f,M);x.addColorStop(0,"rgba(255, 215, 130, 0.95)"),x.addColorStop(.4,"rgba(255, 165, 60, 0.45)"),x.addColorStop(1,"rgba(0, 0, 0, 0.0)"),h.fillStyle=x,h.beginPath(),h.arc(p,f,M,0,Math.PI*2),h.fill()}});const m=this.configureSmoothTexture(new fn(i),!1);return m.colorSpace=xn,{day:m,bump:this.configureSmoothTexture(new fn(a),!1),water:this.configureSmoothTexture(new fn(l),!1),night:this.configureSmoothTexture(new fn(c),!1)}}createSilkyCycloneCloudsTexture(){const i=document.createElement("canvas");i.width=1024,i.height=512;const s=i.getContext("2d");return s.fillStyle="#000000",s.fillRect(0,0,1024,512),this.configureSmoothTexture(new fn(i),!1)}createApolloLunarRegolithTexture(){const e=document.createElement("canvas");e.width=1024,e.height=512;const t=e.getContext("2d");t.fillStyle="#757980",t.fillRect(0,0,1024,512),[{x:340,y:200,r:125},{x:490,y:235,r:110},{x:660,y:215,r:90},{x:245,y:315,r:82}].forEach(s=>{const r=t.createRadialGradient(s.x,s.y,10,s.x,s.y,s.r);r.addColorStop(0,"#363a40"),r.addColorStop(.7,"#50545c"),r.addColorStop(1,"rgba(117, 121, 128, 0)"),t.fillStyle=r,t.beginPath(),t.arc(s.x,s.y,s.r,0,Math.PI*2),t.fill()});for(let s=0;s<1500;s++){const r=Math.random()*1024,a=Math.random()*512,o=1.5+Math.pow(Math.random(),3)*34;t.strokeStyle="rgba(210, 215, 222, 0.55)",t.lineWidth=1.5,t.beginPath(),t.arc(r,a,o,0,Math.PI*2),t.stroke(),t.fillStyle="rgba(24, 27, 32, 0.68)",t.beginPath(),t.arc(r+.9,a+.9,o*.84,0,Math.PI*2),t.fill()}return this.configureSmoothTexture(new fn(e),!1)}createCollimatedLaserCoreShader(e=0){return new mt({uniforms:{uTime:{value:0},uThrust:{value:1},uOverclock:{value:0},uIgnitionProgress:{value:1},uIgnitionThreshold:{value:e}},vertexShader:`
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform float uThrust;
        uniform float uOverclock;
        uniform float uIgnitionProgress;
        uniform float uIgnitionThreshold;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;

          float cosView = abs(dot(normalize(vNormal), normalize(vViewDir)));
          // 提高最低保底可见度 (0.35 + 0.65 * cosView)，使圆柱从侧面或远景看也绝不会变暗消失！
          float coreWhite = pow(cosView, 2.2);
          float solidPresence = 0.38 + 0.62 * pow(cosView, 1.1);

          // 10 节高对比度超音速马赫激波环
          float machWave = sin(vUv.y * 85.0 - uTime * 30.0);
          float shockDiamond = exp(-pow(machWave, 2.0) * 10.0) * smoothstep(0.65, 0.0, vUv.y);

          float flow = 0.90 + 0.10 * sin(vUv.y * 42.0 - uTime * 45.0);
          float vFade = pow(max(0.0, 1.0 - vUv.y), 0.95) * smoothstep(0.0, 0.01, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.1, ig);

          // HDR 级高亮白青核心 (#f0ffff * 1.8) + 亮电光蓝外缘 (#00b8ff)
          vec3 cyanBeam = mix(vec3(0.05, 0.75, 1.0), vec3(1.35, 1.75, 2.1), coreWhite * 0.85 + shockDiamond * 0.65);
          vec3 goldBeam = mix(vec3(1.0, 0.58, 0.10), vec3(1.85, 1.65, 1.2), coreWhite * 0.85 + shockDiamond * 0.65);
          vec3 finalCol = mix(cyanBeam, goldBeam, uOverclock) * flow;

          float alpha = clamp((solidPresence * 0.92 + shockDiamond * 0.65) * vFade * growMask * clamp(uThrust, 0.35, 1.25), 0.0, 0.98);
          gl_FragColor = vec4(finalCol, alpha);
        }
      `,transparent:!0,blending:cn,depthWrite:!1,side:en})}createHelicalVortexSheathShader(e=0){return new mt({uniforms:{uTime:{value:0},uThrust:{value:1},uOverclock:{value:0},uIgnitionProgress:{value:1},uIgnitionThreshold:{value:e}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform float uThrust;
        uniform float uOverclock;
        uniform float uIgnitionProgress;
        uniform float uIgnitionThreshold;
        varying vec2 vUv;

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;

          float centerDist = abs(vUv.x - 0.5) * 2.0;
          float gaussX = exp(-pow(centerDist * 2.1, 2.0));
          float coreX = exp(-pow(centerDist * 4.5, 2.0));

          float featherY = pow(max(0.0, 1.0 - vUv.y), 1.1) * smoothstep(0.0, 0.015, vUv.y);
          float growMask = smoothstep(vUv.y, vUv.y - 0.12, ig);
          float pulse = 0.88 + 0.12 * sin(vUv.y * 28.0 - uTime * 22.0);

          vec3 colBlue = mix(vec3(0.05, 0.72, 1.0), vec3(1.2, 1.6, 1.9), coreX);
          vec3 colGold = mix(vec3(1.0, 0.48, 0.08), vec3(1.6, 1.4, 1.0), coreX);
          vec3 col = mix(colBlue, colGold, uOverclock) * pulse;

          float alpha = clamp(gaussX * 0.65 * featherY * growMask * clamp(uThrust, 0.35, 1.25), 0.0, 0.72);
          gl_FragColor = vec4(col, alpha);
        }
      `,transparent:!0,blending:cn,depthWrite:!1,side:en})}createRisingIonParticlesShader(e,t=0){return new mt({uniforms:{uTime:{value:0},uThrust:{value:1},uOverclock:{value:0},uIgnitionProgress:{value:1},uIgnitionThreshold:{value:t},uSprite:{value:this.softGlowSprite},uPlumeHeight:{value:e}},vertexShader:`
        attribute float aOffset;
        attribute float aSpeed;
        attribute float aRadial;
        uniform float uTime;
        uniform float uPlumeHeight;
        varying float vLife;

        void main() {
          float life = mod(aOffset + uTime * aSpeed, 1.0);
          vLife = life;

          vec3 pos = position;
          pos.y = life * uPlumeHeight;
          float spread = (1.0 + life * 1.35) * aRadial;
          pos.x *= spread;
          pos.z *= spread;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = clamp((1.0 - life * 0.6) * (68.0 / -mvPos.z), 2.0, 11.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        uniform sampler2D uSprite;
        uniform float uThrust;
        uniform float uOverclock;
        uniform float uIgnitionProgress;
        uniform float uIgnitionThreshold;
        varying float vLife;

        void main() {
          float ig = clamp((uIgnitionProgress - uIgnitionThreshold) * 4.5, 0.0, 1.0);
          if (ig <= 0.01 || uThrust <= 0.01) discard;
          if (vLife > ig) discard;

          vec4 tex = texture2D(uSprite, gl_PointCoord);
          vec3 normalCol = mix(vec3(1.2, 1.5, 1.8), vec3(0.0, 0.75, 1.0), smoothstep(0.0, 0.4, vLife));
          vec3 overCol = mix(vec3(1.5, 1.4, 1.0), vec3(1.0, 0.5, 0.05), smoothstep(0.0, 0.4, vLife));
          vec3 col = mix(normalCol, overCol, uOverclock);

          float alpha = tex.a * pow(1.0 - vLife, 1.2) * 0.9 * ig;
          gl_FragColor = vec4(col, alpha);
        }
      `,transparent:!0,blending:cn,depthWrite:!1})}buildBrutalistPlanetaryEngine(e=1,t=24,i=0){const s=new Mt,r=[],a=[],o=new Nt({color:4082526,map:this.steelAlbedo,normalMap:this.steelNormal,normalScale:new Ae(1.5,1.5),roughnessMap:this.steelRoughness,metalness:.86,roughness:.38,envMapIntensity:2.2}),l=new Nt({color:2239030,normalMap:this.steelNormal,roughnessMap:this.steelRoughness,metalness:.88,roughness:.34,envMapIntensity:2}),u=new Nt({color:14870768,metalness:.94,roughness:.14,envMapIntensity:2.4}),c=new ln({map:this.furnaceWindowTex,color:16750882}),h=new ln({color:61695}),d=new ln({color:16722509}),m=new _e(new ot(1.15,1.45,.52,8),l);m.position.y=-.08,s.add(m);const v=new _e(new ot(.92,1.18,.22,8),o);v.position.y=.16,s.add(v);const g=new _e(new ot(.52,.84,.42,8),o);g.position.y=.38;const p=new _e(new ot(.44,.52,.28,16),o);p.position.y=.7,s.add(g,p);for(let F=0;F<6;F++){const Q=.78-F*.052,oe=.22+F*.095,fe=new _e(new ot(Q,Q+.01,.025,16,1,!0),c);fe.position.y=oe;const ye=new _e(new _n(Q+.02,.016,8,24),l);ye.rotation.x=Math.PI*.5,ye.position.y=oe+.015,s.add(fe,ye)}for(let F=0;F<24;F++){const Q=F/24*Math.PI*2,oe=new _e(new Ht(.026,.65,.14),o);oe.position.set(Math.cos(Q)*.58,.48,Math.sin(Q)*.58),oe.rotation.y=-Q,oe.rotation.x=-.26,s.add(oe);const fe=new _e(new Ht(.02,.18,.035),h);fe.position.set(Math.cos(Q)*.48,.72,Math.sin(Q)*.48),fe.rotation.y=-Q,fe.rotation.x=-.15,s.add(fe)}for(let F=0;F<8;F++){const Q=F/8*Math.PI*2,oe=new Mt;oe.rotation.y=Q;const fe=new _e(new Ht(.16,.92,.22),o);fe.position.set(0,.36,.78),fe.rotation.x=-.72,oe.add(fe);for(const te of[-.085,.085]){const de=new _e(new ot(.022,.022,.65,10),u);de.position.set(te,.32,.86),de.rotation.x=-.72,oe.add(de)}const ye=new _e(new Ht(.34,.24,.38),l);ye.position.set(0,.02,1.12),oe.add(ye);const ze=new _e(new pn(.028,8,8),d);ze.position.set(0,.18,1.24),oe.add(ze),r.push(ze),s.add(oe)}const f=new _e(new _n(.45,.05,12,32),l);f.rotation.x=Math.PI*.5,f.position.y=.84,s.add(f);const M=new _e(new wc(.42,32),new ln({color:16777215}));M.rotation.x=-Math.PI*.5,M.position.y=.82,s.add(M);const x=new Mt;x.position.y=.82;const E=this.createCollimatedLaserCoreShader(i),U=this.createHelicalVortexSheathShader(i),P=this.createRisingIonParticlesShader(t,i),R=new ot(.62,.38,t,32,32,!0);R.translate(0,t*.5,0),x.add(new _e(R,E));const O=new ir(2.4,t,1,24);O.translate(0,t*.5,0);for(let F=0;F<4;F++){const Q=new _e(O,U);Q.rotation.y=F*Math.PI/4,x.add(Q)}const k=new Zl({map:this.softGlowSprite,color:12121343,transparent:!0,opacity:.95,blending:cn,depthWrite:!1}),y=new Gh(k);y.position.set(0,.35,0),y.scale.set(3.2,3.2,1),x.add(y);const T=new Zl({map:this.mistSpriteTex,color:10087423,transparent:!0,opacity:.42,blending:cn,depthWrite:!1});for(let F=0;F<10;F++){const Q=new Gh(T),oe=F/10*Math.PI*2;Q.position.set(Math.cos(oe)*.45,.18+F%3*.14,Math.sin(oe)*.45),Q.scale.set(1.4,.65,1),x.add(Q),a.push(Q)}const L=900,z=new Float32Array(L*3),D=new Float32Array(L),q=new Float32Array(L),G=new Float32Array(L);for(let F=0;F<L;F++){const Q=Math.random()*Math.PI*2,oe=.06+Math.random()*.38;z[F*3]=Math.cos(Q)*oe,z[F*3+1]=0,z[F*3+2]=Math.sin(Q)*oe,D[F]=Math.random(),q[F]=.5+Math.random()*.7,G[F]=.75+Math.random()*.6}const J=new Ct;return J.setAttribute("position",new Ot(z,3)),J.setAttribute("aOffset",new Ot(D,1)),J.setAttribute("aSpeed",new Ot(q,1)),J.setAttribute("aRadial",new Ot(G,1)),x.add(new tc(J,P)),s.add(x),s.scale.setScalar(e),{group:s,plumeAssembly:x,coreLaserMat:E,vortexSheathMat:U,ionSparksMat:P,strobes:r,mistSprites:a,nozzleFlare:y}}buildGimbalSteeringEngineUnit(e=1,t=22){const i=new Mt,s=new Nt({color:2897478,map:this.steelAlbedo,normalMap:this.steelNormal,roughnessMap:this.steelRoughness,metalness:.86,roughness:.38,envMapIntensity:2}),r=new _e(new ot(1.15,1.45,.55,8),s);r.position.y=-.1,i.add(r);for(const o of[-.62,.62]){const l=new _e(new Ht(.24,.82,.55),s);l.position.set(o,.42,0),i.add(l)}const a=this.buildBrutalistPlanetaryEngine(.95,t,0);return a.group.position.set(0,.32,0),a.group.rotation.x=Math.PI*.5-.42,i.add(a.group),i.scale.setScalar(e),{group:i,plumeAssembly:a.plumeAssembly,coreLaserMat:a.coreLaserMat,vortexSheathMat:a.vortexSheathMat,ionSparksMat:a.ionSparksMat,strobes:a.strobes,mistSprites:a.mistSprites,nozzleFlare:a.nozzleFlare}}buildIntegratedSpaceElevatorSystem(e=100,t=138){const i=new Mt,s=[],r=[],a=new Nt({color:11846356,normalMap:this.steelNormal,roughnessMap:this.steelRoughness,metalness:.86,roughness:.26,envMapIntensity:2.1}),o=new Nt({color:2634564,map:this.steelAlbedo,normalMap:this.steelNormal,metalness:.88,roughness:.34,envMapIntensity:2}),l=new Nt({color:14476526,map:this.champagneHullTex,normalMap:this.steelNormal,metalness:.8,roughness:.24,envMapIntensity:2}),u=new Nt({map:this.solarWingTex,bumpMap:this.solarWingTex,bumpScale:.015,color:6333946,metalness:.88,roughness:.16,envMapIntensity:2.2,side:en}),c=new ln({map:this.furnaceWindowTex,color:16772019}),h=new ln({color:58879}),d=new ln({color:16722509}),m=new Mt;m.position.y=e-.15;const v=new _e(new ot(1.55,1.95,.45,8),o);v.position.y=.05;const g=new _e(new ot(1.05,1.42,.35,8),a);g.position.y=.42;const p=new _e(new ot(1.25,1.25,.1,16,1,!0),c);p.position.y=.32,m.add(v,g,p);for(let L=0;L<4;L++){const z=L/4*Math.PI*2+Math.PI*.25,D=new Mt;D.rotation.y=z;const q=new _e(new Ht(.14,1.35,.18),a);q.position.set(0,.85,.72),q.rotation.x=-.12;const G=new _e(new Ht(.03,1.3,.03),h);G.position.set(0,.85,.62),G.rotation.x=-.12,D.add(q,G),m.add(D)}i.add(m);const f=t-e+4,M=new Nt({color:14412542,emissive:165063,emissiveIntensity:.5,metalness:.92,roughness:.15});for(let L=0;L<3;L++){const z=L/3*Math.PI*2,D=new ot(.022,.022,f,8);D.translate(0,f*.5,0);const q=new _e(D,M);q.position.set(Math.cos(z)*.22,e,Math.sin(z)*.22),i.add(q)}for(let L=0;L<2;L++){const z=new Mt;z.position.y=e+2+L*16;const D=new _e(new ot(.32,.35,.85,12),l),q=new _e(new ot(.34,.34,.2,12,1,!0),c),G=new _e(new _n(.35,.025,8,24),h);G.rotation.x=Math.PI*.5,G.position.y=-.35,z.add(D,q,G);const J=new _e(new Ac(.16,1.1,12),new ln({color:6353151,transparent:!0,opacity:.85,blending:cn}));J.rotation.x=Math.PI,J.position.y=-.95,z.add(J),i.add(z),s.push(z)}const x=new Mt;x.position.y=t;const E=new _e(new ot(.55,.68,1.2,16,1,!0),o);E.position.y=-2.8;const U=new _e(new _n(.66,.035,8,32),h);U.rotation.x=Math.PI*.5,U.position.y=-3.4,x.add(E,U);const P=12;[[-.22,-.22],[.22,-.22],[-.22,.22],[.22,.22]].forEach(([L,z])=>{const D=new _e(new ot(.025,.025,P,8),a);D.position.set(L,1.5,z),x.add(D)});for(let L=-8;L<=14;L++){const z=L*.5,D=new _e(new Ht(.46,.03,.46),a);if(D.position.y=z,x.add(D),L%3===0&&L>=-3){const q=new _e(new ot(.22,.22,.85,16),l);q.position.y=z,x.add(q)}}const O=L=>{const z=new Mt,D=new _e(new _n(L,.12,16,72),l);D.rotation.x=Math.PI*.5,D.scale.set(1,1,.65),z.add(D);const q=new _e(new _n(L-.1,.035,8,72),c);q.rotation.x=Math.PI*.5,z.add(q);for(let G=0;G<6;G++){const J=new _e(new ot(.024,.024,L*2,8),a);J.rotation.z=Math.PI*.5,J.rotation.y=G/6*Math.PI,z.add(J)}return z},k=O(2.2);k.position.y=.4;const y=O(1.75);y.position.y=-.9,x.add(k,y);const T=new _e(new Ht(11.5,.12,.12),a);T.position.y=2.4,x.add(T);for(const L of[-1,1])for(let z=0;z<2;z++){const D=L*(1.85+z*1.55);for(const q of[-1,1]){const G=new _e(new ot(.02,.02,4.4,8),a);G.rotation.x=Math.PI*.5,G.position.set(D,2.4,q*2.35),x.add(G);for(const J of[-.18,.18]){const F=new _e(new Ht(.28,.012,4.2),u);F.position.set(D+J,2.4,q*2.35),F.rotation.z=.08,x.add(F)}}}for(const L of[-3.4,.4,4.5,7.5]){const z=new _e(new pn(.055,8,8),d);z.position.set(0,L,.32),x.add(z),r.push(z)}return i.add(x),{systemGroup:i,climberPods:s,ringUpper:k,ringLower:y,strobes:r}}buildHabitatRingAurora(){const e=new Mt,t=new Nt({color:14476526,map:this.champagneHullTex,normalMap:this.steelNormal,normalScale:new Ae(1,1),roughnessMap:this.steelRoughness,metalness:.85,roughness:.24,envMapIntensity:2.1}),i=new Nt({color:3884630,normalMap:this.steelNormal,roughnessMap:this.steelRoughness,metalness:.88,roughness:.3,envMapIntensity:2}),s=new ln({map:this.furnaceWindowTex,color:16772019}),r=new _e(new _n(4.8,.55,24,96),t);r.scale.set(1,1,.32);const a=new _e(new _n(5.32,.08,12,96),i);a.scale.set(1,1,.4);const o=new _e(new _n(3.35,.36,20,80),t);o.scale.set(1,1,.32),e.add(r,a,o);const l=new _e(new _n(4.28,.14,12,96),s);l.scale.set(1,1,.45);const u=new _e(new _n(3.02,.09,12,80),s);u.scale.set(1,1,.45),e.add(l,u);for(let d=0;d<8;d++){const m=d/8*Math.PI,v=new _e(new ot(.03,.03,9.6,8),i);v.rotation.z=m,e.add(v)}const c=new _e(new ot(.65,.52,.42,32),t);c.rotation.x=Math.PI*.5,e.add(c);const h=new _e(new pn(.36,24,16),i);return h.scale.set(1,1,.45),e.add(h),e}buildDeepSpaceRelayFleet(){const e=new Mt,t=new Nt({color:16498468,metalness:.94,roughness:.12,envMapIntensity:2.2}),i=new Nt({color:13358561,normalMap:this.steelNormal,metalness:.86,roughness:.22,envMapIntensity:1.9,side:en}),s=new Nt({color:1976635,metalness:.85,roughness:.3}),r=new mt({uniforms:{uTime:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float pulse = pow(0.5 + 0.5 * sin(vUv.y * 36.0 - uTime * 14.0), 6.0);
          vec3 col = mix(vec3(0.0, 0.72, 1.0), vec3(0.9, 1.0, 1.0), pulse);
          gl_FragColor = vec4(col, 0.28 + pulse * 0.45);
        }
      `,transparent:!0,blending:cn,depthWrite:!1}),a=(u=1)=>{const c=new Mt,h=.24,d=new ot(h*.94,h*.94,.04,6);d.rotateX(Math.PI*.5);const m=[[0,0]];for(let g=0;g<6;g++){const p=g/6*Math.PI*2;m.push([Math.cos(p)*h*1.75,Math.sin(p)*h*1.75])}for(let g=0;g<12;g++){const p=g/12*Math.PI*2;m.push([Math.cos(p)*h*3.42,Math.sin(p)*h*3.42])}m.forEach(([g,p])=>{const f=new _e(d,t);f.position.set(g,p,0),c.add(f)});for(let g=0;g<3;g++){const p=g/3*Math.PI*2+Math.PI/6,f=new _e(new ot(.018,.018,1.18,6),s);f.position.set(Math.cos(p)*.44,Math.sin(p)*.44,.55),f.lookAt(0,0,1.1),f.rotateX(Math.PI*.5),c.add(f)}const v=new _e(new ot(.15,.15,.05,6),t);v.rotation.x=Math.PI*.5,v.position.z=1.1,c.add(v);for(let g=0;g<4;g++){const p=new _e(new Ht(2.1-g*.08,1.25-g*.05,.012),i);p.position.set(0,-.55-g*.08,-.22),p.rotation.x=Math.PI*.47,p.rotation.z=Math.PI*.25,c.add(p)}return c.scale.setScalar(u),c},o=[new C(0,0,0),new C(-3.2,1.1,-2.4),new C(3.5,-.85,-2.1),new C(-6,-1.2,-5),new C(6.2,1.4,-4.8)];return o.forEach((u,c)=>{const h=a(c===0?1.15:.85);h.position.copy(u),h.rotation.y=.22,e.add(h)}),[[0,1],[0,2],[1,3],[2,4]].forEach(([u,c])=>{const h=o[u],d=o[c],m=h.distanceTo(d),v=new _e(new ot(.012,.012,m,6),r);v.position.copy(h).lerp(d,.5),v.quaternion.setFromUnitVectors(new C(0,1,0),d.clone().sub(h).normalize()),e.add(v)}),{group:e,laserShaderMat:r}}buildPhotorealisticLuna(e=27){const t=new Mt,i=[],s=new Nt({map:this.moonRegolithTex,bumpMap:this.moonRegolithTex,bumpScale:.65,color:7501438,roughness:.94,metalness:.02,envMapIntensity:.35}),r=new rp;r.setCrossOrigin("anonymous"),r.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg",l=>{l.minFilter=jn,l.magFilter=Vt,s.map=l,s.bumpMap=l,s.needsUpdate=!0});const a=new _e(new pn(e,96,96),s);return t.add(a),[new C(.32,.18,.93).normalize(),new C(.42,.28,.86).normalize(),new C(.22,.08,.97).normalize()].forEach((l,u)=>{const c=this.buildBrutalistPlanetaryEngine(u===0?.42:.35,14,0);c.group.position.copy(l.clone().multiplyScalar(e-.12)),c.group.quaternion.setFromUnitVectors(new C(0,1,0),l),t.add(c.group),i.push(c)}),{group:t,lunarRigs:i}}}class GS{constructor(){be(this,"ctx",null);be(this,"lastPlayTime",0);be(this,"bgmPlaying",!1);be(this,"bgmTimer",null);be(this,"masterBgmGain",null);be(this,"chordIndex",0)}ensureContext(){if(!this.ctx&&typeof window<"u"){const e=window.AudioContext||window.webkitAudioContext;this.ctx=new e}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}toggleBGM(){return this.bgmPlaying?this.stopBGM():this.startBGM(),this.bgmPlaying}startBGM(){if(this.bgmPlaying||(this.ensureContext(),!this.ctx))return;this.bgmPlaying=!0,this.masterBgmGain=this.ctx.createGain(),this.masterBgmGain.gain.setValueAtTime(.01,this.ctx.currentTime),this.masterBgmGain.gain.linearRampToValueAtTime(.22,this.ctx.currentTime+2.5),this.masterBgmGain.connect(this.ctx.destination);const e=[{bass:36.71,notes:[146.83,174.61,220,293.66,329.63]},{bass:29.14,notes:[116.54,174.61,220,261.63,349.23]},{bass:49,notes:[146.83,196,233.08,293.66,392]},{bass:55,notes:[138.59,164.81,220,293.66,329.63]}],t=()=>{if(!this.bgmPlaying||!this.ctx||!this.masterBgmGain||!X.audioEnabled)return;const i=this.ctx.currentTime,s=e[this.chordIndex%e.length];this.chordIndex++;const r=6,a=this.ctx.createOscillator(),o=this.ctx.createBiquadFilter(),l=this.ctx.createGain();a.type="sawtooth",a.frequency.setValueAtTime(s.bass,i),o.type="lowpass",o.frequency.setValueAtTime(110,i),o.frequency.linearRampToValueAtTime(160,i+r*.5),o.frequency.linearRampToValueAtTime(95,i+r),l.gain.setValueAtTime(.001,i),l.gain.linearRampToValueAtTime(.28,i+1.8),l.gain.setValueAtTime(.28,i+r-1.8),l.gain.exponentialRampToValueAtTime(.001,i+r+.5),a.connect(o),o.connect(l),l.connect(this.masterBgmGain),a.start(i),a.stop(i+r+.6),s.notes.forEach((h,d)=>{if(!this.ctx||!this.masterBgmGain)return;const m=this.ctx.createOscillator(),v=this.ctx.createOscillator(),g=this.ctx.createBiquadFilter(),p=this.ctx.createGain();m.type=d%2===0?"sawtooth":"triangle",v.type="sine",m.frequency.setValueAtTime(h*.997,i),v.frequency.setValueAtTime(h*1.003,i),g.type="lowpass";const f=X.twelveStrikeActive||X.heliosOverdrive?1.6:1;g.frequency.setValueAtTime(320*f,i),g.frequency.exponentialRampToValueAtTime(950*f,i+r*.55),g.frequency.exponentialRampToValueAtTime(280*f,i+r),p.gain.setValueAtTime(.001,i),p.gain.linearRampToValueAtTime(.065,i+2),p.gain.setValueAtTime(.065,i+r-2),p.gain.exponentialRampToValueAtTime(.001,i+r+.8),m.connect(g),v.connect(g),g.connect(p),p.connect(this.masterBgmGain),m.start(i),v.start(i),m.stop(i+r+.9),v.stop(i+r+.9)});const u=8,c=r/u;for(let h=0;h<u;h++){const d=s.notes[h%s.notes.length]*2,m=i+h*c,v=this.ctx.createOscillator(),g=this.ctx.createGain();v.type="sine",v.frequency.setValueAtTime(d,m),g.gain.setValueAtTime(1e-4,m),g.gain.linearRampToValueAtTime(.032,m+.04),g.gain.exponentialRampToValueAtTime(1e-4,m+c*1.4),v.connect(g),g.connect(this.masterBgmGain),v.start(m),v.stop(m+c*1.5)}};t(),this.bgmTimer=window.setInterval(t,5600)}stopBGM(){if(this.bgmPlaying=!1,this.bgmTimer&&(clearInterval(this.bgmTimer),this.bgmTimer=null),this.ctx&&this.masterBgmGain){const e=this.ctx.currentTime;this.masterBgmGain.gain.setValueAtTime(this.masterBgmGain.gain.value,e),this.masterBgmGain.gain.exponentialRampToValueAtTime(1e-4,e+.8)}}playTick(){}playConfirm(){if(!X.audioEnabled)return;const e=performance.now();if(e-this.lastPlayTime<120||(this.lastPlayTime=e,this.ensureContext(),!this.ctx))return;const t=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(680,t),i.frequency.exponentialRampToValueAtTime(1080,t+.08),s.gain.setValueAtTime(1e-4,t),s.gain.linearRampToValueAtTime(.035,t+.015),s.gain.exponentialRampToValueAtTime(1e-4,t+.12),i.connect(s),s.connect(this.ctx.destination),i.start(t),i.stop(t+.13)}playIgnitionBoom(e=0){if(!X.audioEnabled||(this.ensureContext(),!this.ctx))return;const t=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(65+e*4,t),i.frequency.exponentialRampToValueAtTime(28,t+.75),s.gain.setValueAtTime(1e-4,t),s.gain.linearRampToValueAtTime(.12,t+.04),s.gain.exponentialRampToValueAtTime(1e-4,t+.8),i.connect(s),s.connect(this.ctx.destination),i.start(t),i.stop(t+.82)}playTwelveStrikeShockwave(){X.audioEnabled&&this.playIgnitionBoom(2)}speak(e,t){if(!X.audioEnabled||typeof window>"u"||!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const i=X.lang==="ZH"?t:e,s=new SpeechSynthesisUtterance(i);s.lang=X.lang==="ZH"?"zh-CN":"en-US",s.rate=.95,s.pitch=.76,window.speechSynthesis.speak(s)}}const it=new GS,nt=100,Sr=138,Er=new C(.55,0,.835).normalize(),Qi=new C(-.52,.54,.662).normalize(),Hs=new C(-.58,0,.814).normalize(),Oo=new C(-.38,.66,.648).normalize();class HS{constructor(e){be(this,"container");be(this,"scene");be(this,"camera");be(this,"renderer");be(this,"composer");be(this,"bloomPass");be(this,"anamorphicPass");be(this,"controls");be(this,"sunLight");be(this,"currentSunDir",new C(-.48,.28,.83).normalize());be(this,"builder");be(this,"earthGroup");be(this,"earthMaterial");be(this,"cloudDeckMaterial");be(this,"atmosHaloMat");be(this,"cloudsMesh");be(this,"globalNeedlesMat");be(this,"engineArrayGroup");be(this,"engineArrayRigs",[]);be(this,"subMatrixBeamMat");be(this,"steeringArrayGroup");be(this,"steeringRigs",[]);be(this,"ignitionStageGroup");be(this,"ignitionStageRigs",[]);be(this,"elevatorSystemGroup");be(this,"climberPods",[]);be(this,"tianzhuAnim");be(this,"habitatGroup");be(this,"deepSpaceGroup");be(this,"deepSpaceLaserMat");be(this,"lunaGroup");be(this,"lunarRigs",[]);be(this,"dyingSunGroup");be(this,"dyingSunMat");be(this,"prominenceShellMat");be(this,"coronaLayerMats",[]);be(this,"coronaBillboards",[]);be(this,"eclipseOccluderSphere");be(this,"camAnim",{active:!1,startTime:0,duration:2600,startPos:new C,endPos:new C,startLook:new C,endLook:new C,useSphericalArc:!1});be(this,"lookAtTarget",new C(0,0,0));be(this,"baseCamPos",new C(0,16,265));be(this,"clock",new ap);be(this,"lastFrameTime",performance.now());be(this,"rafId",0);be(this,"cinematicInterval",null);be(this,"storyTimers",[]);be(this,"dominoIgnitionProgress",1);be(this,"globalWaveProgress",1);be(this,"isEclipseShotActive",!1);be(this,"orbitalTravelAngle",0);be(this,"animate",()=>{this.rafId=requestAnimationFrame(this.animate);const e=performance.now(),t=Math.min(.1,(e-this.lastFrameTime)/1e3);this.lastFrameTime=e;const i=this.clock.getElapsedTime();BS(t),this.updateCameraTransition(e);const s=X.thrustPercent/100,r=X.twelveStrikeActive||X.heliosOverdrive||X.thrustPercent>105?1:0,a=s*(r>.5?1.65:1);if(this.orbitalTravelAngle+=t*.032*a,this.isEclipseShotActive)this.eclipseOccluderSphere&&this.eclipseOccluderSphere.position.lerp(new C(-2,-1.2,10),.025);else{const g=360+X.sunRecessionUnits*.65,p=-2.25-Math.sin(this.orbitalTravelAngle)*.45,f=.28+Math.cos(this.orbitalTravelAngle*.7)*.1;this.dyingSunGroup.position.set(Math.cos(p)*g,f*g,Math.sin(p)*g);const M=new C(-.48+Math.sin(this.orbitalTravelAngle)*.25,.28+Math.cos(this.orbitalTravelAngle*.5)*.08,.82).normalize();this.currentSunDir.copy(M),this.sunLight.position.copy(this.currentSunDir.clone().multiplyScalar(420)),this.earthMaterial.uniforms.uSunDir.value.copy(this.currentSunDir),this.cloudDeckMaterial.uniforms.uSunDir.value.copy(this.currentSunDir),this.atmosHaloMat.uniforms.uSunDir.value.copy(this.currentSunDir)}if(X.currentNode!=="LUNA"){const g=-.68+Math.sin(this.orbitalTravelAngle*.85)*.42,p=295;this.lunaGroup.position.set(Math.cos(g)*p,26+Math.sin(this.orbitalTravelAngle*.5)*12,Math.sin(g)*p)}this.lunaGroup.rotation.y=i*.02,this.engineArrayGroup.visible=!0,this.steeringArrayGroup.visible=!0,this.ignitionStageGroup.visible=!0;const o=this.camera.position.length(),l=jl.clamp((o-115)/140,0,1),u=1+l*1.15,c=(r>.5?1.25:1)*(1+l*.45),h=o<=135;this.dominoIgnitionProgress<1&&(this.dominoIgnitionProgress=Math.min(1,this.dominoIgnitionProgress+.0028)),this.globalWaveProgress<1&&(this.globalWaveProgress=Math.min(1,this.globalWaveProgress+.0042));const d=i*.004;this.cloudsMesh.rotation.y=d,this.earthMaterial.uniforms.uTime.value=i,this.earthMaterial.uniforms.uCloudRotation.value=d,this.cloudDeckMaterial.uniforms.uCloudRotation.value=d,this.globalNeedlesMat.uniforms.uTime.value=i,this.globalNeedlesMat.uniforms.uThrust.value=s,this.globalNeedlesMat.uniforms.uWaveProgress.value=this.globalWaveProgress,this.globalNeedlesMat.uniforms.uOverclock.value=r,this.subMatrixBeamMat&&(this.subMatrixBeamMat.uniforms.uTime.value=i,this.subMatrixBeamMat.uniforms.uThrust.value=s,this.subMatrixBeamMat.uniforms.uOverclock.value=r,this.subMatrixBeamMat.uniforms.uIgnitionProgress.value=this.dominoIgnitionProgress);const m=Math.sin(i*7.5)>.1,v=(g,p,f=!0)=>{g.forEach(M=>{var x;M.coreLaserMat.uniforms.uTime.value=i,M.coreLaserMat.uniforms.uThrust.value=s,M.coreLaserMat.uniforms.uOverclock.value=r,M.coreLaserMat.uniforms.uIgnitionProgress.value=p,M.vortexSheathMat.uniforms.uTime.value=i,M.vortexSheathMat.uniforms.uThrust.value=s,M.vortexSheathMat.uniforms.uOverclock.value=r,M.vortexSheathMat.uniforms.uIgnitionProgress.value=p,M.ionSparksMat.uniforms.uTime.value=i,M.ionSparksMat.uniforms.uThrust.value=h?s:0,M.ionSparksMat.uniforms.uOverclock.value=r,M.ionSparksMat.uniforms.uIgnitionProgress.value=p,f?(M.plumeAssembly.scale.set(u,c,u),(x=M.mistSprites)==null||x.forEach(E=>E.visible=h)):M.plumeAssembly.scale.set(1,r>.5?1.25:1,1),M.nozzleFlare&&(M.nozzleFlare.visible=s>.02),M.strobes.forEach(E=>E.visible=m)})};if(v(this.engineArrayRigs,this.dominoIgnitionProgress,!0),v(this.steeringRigs,1,!0),v(this.ignitionStageRigs,this.dominoIgnitionProgress,!0),v(this.lunarRigs,1,!1),this.climberPods.forEach((g,p)=>{const f=(i*.065+p*.5)%1,M=f*f*(3-2*f);g.position.y=nt+1+M*(Sr-nt-2.2)}),this.tianzhuAnim&&(this.tianzhuAnim.upper.rotation.y=i*.32,this.tianzhuAnim.lower.rotation.y=-i*.25,this.tianzhuAnim.strobes.forEach(g=>g.visible=m)),this.habitatGroup.rotation.z=i*.15,this.deepSpaceLaserMat.uniforms.uTime.value=i,this.dyingSunMat.uniforms.uTime.value=i,this.prominenceShellMat.uniforms.uTime.value=i,this.coronaLayerMats.forEach(g=>g.uniforms.uTime.value=i),this.coronaBillboards.forEach(g=>g.lookAt(this.camera.position)),X.currentMode!=="EXPLORE"){const g=Math.sin(i*.65)*.1,p=Math.cos(i*.52)*.08,M=X.currentNode==="ENGINE_ARRAY"||X.currentNode==="EQUATORIAL"||X.currentNode==="IGNITION_NODE"||r>.5?r>.5?.12:.03:0;this.camera.position.set(this.baseCamPos.x+g+(Math.random()-.5)*M,this.baseCamPos.y+p+(Math.random()-.5)*M,this.baseCamPos.z)}else this.controls.update(),this.baseCamPos.copy(this.camera.position);this.bloomPass.strength=X.bloomEnabled?r>.5?.76:.54:0,this.anamorphicPass.uniforms.uTime.value=i,this.anamorphicPass.uniforms.uStreakIntensity.value=X.bloomEnabled?r>.5?.48:.28:0,this.anamorphicPass.uniforms.uAberration.value=r>.5?.0026:.0011,this.camera.lookAt(this.lookAtTarget),this.updateProjectedReticles(),this.composer.render()});this.container=e,this.builder=new af,this.initRendererAndLighting(),this.createQuietDeepSpaceStarfield(),this.createPhotorealisticFrozenEarth(),this.createDenseGlobalEngineMatrix(),this.createOrbitalTrajectoryRings(),this.createAllEightDetailedMegastructures(),this.createBoilingRedGiantSun(),this.setupResize(),this.animate(),this.startAutoCinematicCycle()}initRendererAndLighting(){this.scene=new np;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera=new yn(38,e/t,.15,6e3),this.camera.position.copy(this.baseCamPos),this.renderer=new tp({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=Td,this.renderer.toneMappingExposure=1.38,this.renderer.outputColorSpace=xn,this.container.appendChild(this.renderer.domElement),this.scene.environment=af.createStudioSpaceHDRI(this.renderer),this.controls=new PS(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=1.2,this.controls.maxDistance=1400,this.sunLight=new Qh(16775405,4.4),this.sunLight.position.copy(this.currentSunDir.clone().multiplyScalar(420)),this.scene.add(this.sunLight);const i=new Qh(3718648,2);i.position.set(-220,140,120),this.scene.add(i);const s=new bS(10875900,1976635,1.15);this.scene.add(s),this.composer=new NS(this.renderer),this.composer.addPass(new OS(this.scene,this.camera)),this.bloomPass=new nr(new Ae(e,t),.56,.42,.65),this.composer.addPass(this.bloomPass),this.anamorphicPass=new up({uniforms:{tDiffuse:{value:null},uResolution:{value:new Ae(e,t)},uTime:{value:0},uStreakIntensity:{value:.32},uAberration:{value:.0011}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform sampler2D tDiffuse;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uStreakIntensity;
        uniform float uAberration;
        varying vec2 vUv;

        void main() {
          vec2 centerOffset = vUv - 0.5;
          float dist = length(centerOffset);

          vec2 caOffset = centerOffset * dist * uAberration;
          float r = texture2D(tDiffuse, vUv + caOffset).r;
          float g = texture2D(tDiffuse, vUv).g;
          float b = texture2D(tDiffuse, vUv - caOffset).b;
          vec3 baseCol = vec3(r, g, b);

          vec3 streakAccum = vec3(0.0);
          float stepX = 1.0 / uResolution.x;
          for (int i = -6; i <= 6; i++) {
            if (i == 0) continue;
            float offset = float(i) * stepX * 9.5;
            vec3 sampleCol = texture2D(tDiffuse, vec2(clamp(vUv.x + offset, 0.0, 1.0), vUv.y)).rgb;
            float luma = dot(sampleCol, vec3(0.299, 0.587, 0.114));
            float highlight = smoothstep(0.72, 1.2, luma);
            float weight = exp(-abs(float(i)) * 0.36);
            streakAccum += sampleCol * highlight * weight;
          }
          vec3 anamorphicTint = vec3(0.22, 0.75, 1.0);
          vec3 finalCol = baseCol + streakAccum * anamorphicTint * uStreakIntensity * 0.15;

          float vignette = smoothstep(1.12, 0.32, dist);
          finalCol *= mix(0.76, 1.0, vignette);

          gl_FragColor = vec4(finalCol, 1.0);
        }
      `}),this.composer.addPass(this.anamorphicPass),this.earthGroup=new Mt,this.scene.add(this.earthGroup)}createQuietDeepSpaceStarfield(){[{count:4200,size:.9,color:14870768,radius:2200},{count:1800,size:1.35,color:9684477,radius:1900},{count:900,size:1.75,color:16639626,radius:1750}].forEach(s=>{const r=new Float32Array(s.count*3);for(let o=0;o<s.count;o++){const l=Math.random()*Math.PI*2,u=Math.acos(2*Math.random()-1);r[o*3]=s.radius*Math.sin(u)*Math.cos(l),r[o*3+1]=s.radius*Math.cos(u),r[o*3+2]=s.radius*Math.sin(u)*Math.sin(l)}const a=new Ct;a.setAttribute("position",new Ot(r,3)),this.scene.add(new tc(a,new Ql({color:s.color,size:s.size,map:this.builder.softGlowSprite,transparent:!0,opacity:.85,depthWrite:!1})))});const t=new Mt;t.position.set(480,110,-780),t.add(new _e(new pn(24,48,48),new Nt({color:10125922,roughness:.88})));const i=new _e(new Rc(32,54,64),new ln({color:9741240,side:en,transparent:!0,opacity:.38}));i.rotation.x=Math.PI/2.2,t.add(i),this.scene.add(t)}applyMaxAnisotropy(e){e.generateMipmaps=!0,e.minFilter=jn,e.magFilter=Vt,e.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),e.needsUpdate=!0}createPhotorealisticFrozenEarth(){const e=new rp;e.setCrossOrigin("anonymous"),this.applyMaxAnisotropy(this.builder.frozenEarthDayTex),this.applyMaxAnisotropy(this.builder.frozenEarthBumpTex),this.applyMaxAnisotropy(this.builder.frozenEarthWaterTex),this.applyMaxAnisotropy(this.builder.frozenEarthNightTex);const t=`
      vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 1.0 / 7.0;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      const mat3 m3 = mat3(0.00,  0.80,  0.60,
                          -0.80,  0.36, -0.48,
                          -0.60, -0.48,  0.64);

      float fbm5(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * snoise(p);
          p = m3 * p * 2.06;
          a *= 0.5;
        }
        return v;
      }

      vec3 rotateY(vec3 v, float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z);
      }

      float evaluateSilkyCloudDensity(vec3 unitPos, float rotAngle) {
        vec3 p = rotateY(normalize(unitPos), rotAngle);
        vec3 bandPos = vec3(p.x * 2.4, p.y * 3.8, p.z * 2.4);
        vec3 warp = vec3(
          fbm5(bandPos + vec3(1.3, 4.1, 2.7)),
          fbm5(bandPos + vec3(6.2, 1.9, 5.4)),
          fbm5(bandPos + vec3(3.7, 7.3, 1.1))
        );
        float macroSwirl = fbm5(bandPos * 1.35 + warp * 0.95);
        float fineWisps = fbm5(p * 16.0 + warp * 1.4);
        float raw = macroSwirl * 0.76 + fineWisps * 0.24;
        return smoothstep(0.10, 0.56, raw);
      }
    `;this.earthMaterial=new mt({uniforms:{uDayTex:{value:this.builder.frozenEarthDayTex},uTopoTex:{value:this.builder.frozenEarthBumpTex},uWaterTex:{value:this.builder.frozenEarthWaterTex},uNightTex:{value:this.builder.frozenEarthNightTex},uCloudRotation:{value:0},uSunDir:{value:this.currentSunDir},uTime:{value:0}},vertexShader:`
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        varying vec3 vUnitPos;

        void main() {
          vUv = uv;
          vUnitPos = normalize(position);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,fragmentShader:`
        uniform sampler2D uDayTex;
        uniform sampler2D uTopoTex;
        uniform sampler2D uWaterTex;
        uniform sampler2D uNightTex;
        uniform float uCloudRotation;
        uniform vec3 uSunDir;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        varying vec3 vUnitPos;

        ${t}

        vec4 textureBicubic(sampler2D tex, vec2 uv) {
          vec2 texSize = vec2(2048.0, 1024.0);
          vec2 invTexSize = 1.0 / texSize;
          uv = uv * texSize - 0.5;
          vec2 fxy = fract(uv);
          uv -= fxy;
          vec4 xcubic = vec4(
            (1.0 - fxy.x) * (1.0 - fxy.x) * (1.0 - fxy.x),
            4.0 - 6.0 * fxy.x * fxy.x + 3.0 * fxy.x * fxy.x * fxy.x,
            1.0 + 3.0 * fxy.x + 3.0 * fxy.x * fxy.x - 3.0 * fxy.x * fxy.x * fxy.x,
            fxy.x * fxy.x * fxy.x
          ) / 6.0;
          vec4 ycubic = vec4(
            (1.0 - fxy.y) * (1.0 - fxy.y) * (1.0 - fxy.y),
            4.0 - 6.0 * fxy.y * fxy.y + 3.0 * fxy.y * fxy.y * fxy.y,
            1.0 + 3.0 * fxy.y + 3.0 * fxy.y * fxy.y - 3.0 * fxy.y * fxy.y * fxy.y,
            fxy.y * fxy.y * fxy.y
          ) / 6.0;
          vec4 c = uv.xxyy + vec2(-0.5, 1.5).xyxy;
          vec4 s = vec4(xcubic.xz + xcubic.yw, ycubic.xz + ycubic.yw);
          vec4 offset = c + vec4(xcubic.yw, ycubic.yw) / s;
          offset *= invTexSize.xxyy;
          vec4 sample0 = texture2D(tex, offset.xz);
          vec4 sample1 = texture2D(tex, offset.yz);
          vec4 sample2 = texture2D(tex, offset.xw);
          vec4 sample3 = texture2D(tex, offset.yw);
          float sx = s.x / (s.x + s.y);
          float sy = s.z / (s.z + s.w);
          return mix(mix(sample3, sample2, sx), mix(sample1, sample0, sx), sy);
        }

        void main() {
          vec3 dayColor = textureBicubic(uDayTex, vUv).rgb;
          vec3 nightSample = texture2D(uNightTex, vUv).rgb;
          float topo = textureBicubic(uTopoTex, vUv).r;
          float waterMask = textureBicubic(uWaterTex, vUv).r;

          float microRelief = fbm5(vUnitPos * 32.0) * 0.025;
          vec2 texel = vec2(1.0 / 2048.0, 1.0 / 1024.0);
          float hL = texture2D(uTopoTex, vUv - vec2(texel.x, 0.0)).r;
          float hR = texture2D(uTopoTex, vUv + vec2(texel.x, 0.0)).r;
          float hD = texture2D(uTopoTex, vUv - vec2(0.0, texel.y)).r;
          float hU = texture2D(uTopoTex, vUv + vec2(0.0, texel.y)).r;

          vec3 N0 = normalize(vNormalWorld);
          vec3 upVec = abs(N0.y) < 0.999 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
          vec3 T = normalize(cross(upVec, N0));
          vec3 B = cross(N0, T);

          float isLand = 1.0 - smoothstep(0.30, 0.70, waterMask);
          float bumpScale = mix(0.18, 2.2, isLand);
          vec3 N = normalize(N0 + (T * (hL - hR + microRelief) + B * (hD - hU + microRelief)) * bumpScale);
          vec3 V = normalize(vViewDir);
          vec3 L = normalize(uSunDir);

          // 全面提亮地球陆地与海洋基底色 (Gamma 提亮 + 冰封高反照率加成)
          float latAbs = abs(vUnitPos.y);
          float frostMask = smoothstep(0.38, 0.82, topo * 0.65 + latAbs * 0.55);
          vec3 brightLand = pow(dayColor, vec3(0.78)) * vec3(1.18, 1.24, 1.32);
          vec3 alpineSnow = vec3(0.88, 0.94, 1.0);
          vec3 landAlbedo = mix(brightLand, alpineSnow, frostMask * 0.45);

          float shelf = smoothstep(0.0, 0.35, topo);
          vec3 brightOcean = mix(vec3(0.06, 0.22, 0.46), pow(dayColor, vec3(0.82)) * vec3(0.95, 1.15, 1.42), 0.72 + shelf * 0.28);
          vec3 surfaceAlbedo = mix(brightOcean, landAlbedo, isLand);

          vec3 shadowSamplePos = normalize(vUnitPos - L * 0.012);
          float shadowCloud = evaluateSilkyCloudDensity(shadowSamplePos, -uCloudRotation);
          float cloudShadowFactor = 1.0 - shadowCloud * 0.28;

          float NdotL = dot(N, L);
          float sphereNdotL = dot(N0, L);
          float dayFactor = smoothstep(-0.26, 0.22, sphereNdotL);
          float diffuse = max(0.0, NdotL) * cloudShadowFactor;

          vec3 H = normalize(L + V);
          float spec = pow(max(0.0, dot(N0, H)), 32.0) * (1.0 - isLand) * 0.03 * dayFactor * cloudShadowFactor;

          // 提高白昼环境底光 (0.24) 与漫反射系数 (0.72)，使地球明亮清澈！
          vec3 litDay = clamp(surfaceAlbedo * (0.24 + diffuse * 0.72) + vec3(spec), 0.0, 0.66);

          // 提亮夜半球的深蓝冰川环境色与金色城市灯网，使背光面也具备丰富地形细节
          vec3 nightAmbient = surfaceAlbedo * vec3(0.10, 0.16, 0.28) * (1.0 - dayFactor);
          vec3 nightCities = nightSample * vec3(1.55, 1.15, 0.65) * 1.25 * (1.0 - dayFactor);

          float fresnel = pow(1.0 - max(0.0, dot(V, N0)), 3.2);
          vec3 rayleighLimb = mix(vec3(0.18, 0.58, 1.0), vec3(0.55, 0.88, 1.0), fresnel) * fresnel * (0.25 + 0.52 * dayFactor);

          vec3 finalCol = mix(nightAmbient + nightCities, litDay, dayFactor) + rayleighLimb;
          gl_FragColor = vec4(finalCol, 1.0);
        }
      `}),e.load("https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg",s=>{s.colorSpace=xn,this.applyMaxAnisotropy(s),this.earthMaterial.uniforms.uDayTex.value=s}),e.load("https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png",s=>{this.applyMaxAnisotropy(s),this.earthMaterial.uniforms.uTopoTex.value=s}),e.load("https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png",s=>{this.applyMaxAnisotropy(s),this.earthMaterial.uniforms.uWaterTex.value=s}),e.load("https://unpkg.com/three-globe@2.31.0/example/img/earth-night.jpg",s=>{this.applyMaxAnisotropy(s),this.earthMaterial.uniforms.uNightTex.value=s});const i=new _e(new pn(nt,192,192),this.earthMaterial);this.earthGroup.add(i),this.cloudDeckMaterial=new mt({uniforms:{uSunDir:{value:this.currentSunDir},uCloudRotation:{value:0},uEngineSiteA:{value:Qi},uEngineSiteB:{value:Hs}},vertexShader:`
        varying vec3 vNormalWorld;
        varying vec3 vUnitPos;
        void main() {
          vUnitPos = normalize(position);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 uSunDir;
        uniform float uCloudRotation;
        uniform vec3 uEngineSiteA;
        uniform vec3 uEngineSiteB;
        varying vec3 vNormalWorld;
        varying vec3 vUnitPos;

        ${t}

        void main() {
          float cloudAlpha = evaluateSilkyCloudDensity(vUnitPos, 0.0);

          vec3 worldDir = normalize(vNormalWorld);
          float dA = distance(worldDir, normalize(uEngineSiteA));
          float dB = distance(worldDir, normalize(uEngineSiteB));
          float eyeCavitation = smoothstep(0.04, 0.14, dA) * smoothstep(0.04, 0.14, dB);
          float shockWall = (exp(-pow((dA - 0.11) * 28.0, 2.0)) + exp(-pow((dB - 0.11) * 28.0, 2.0))) * 0.5;

          cloudAlpha = clamp(cloudAlpha * eyeCavitation + shockWall * 0.4, 0.0, 1.0);
          if (cloudAlpha < 0.01) discard;

          vec3 L = normalize(uSunDir);
          float sphereDot = dot(worldDir, L);
          float dayFactor = smoothstep(-0.26, 0.24, sphereDot);

          vec3 dayCloudCol = vec3(0.96, 0.98, 1.0) * (0.34 + max(0.0, sphereDot) * 0.54);
          vec3 twilightTint = vec3(0.88, 0.50, 0.26) * exp(-pow(sphereDot * 4.5, 2.0)) * 0.25;
          vec3 nightCloudCol = vec3(0.06, 0.11, 0.20);
          vec3 plasmaRimGlow = vec3(0.20, 0.82, 1.0) * shockWall * 0.85;

          vec3 col = mix(nightCloudCol, dayCloudCol, dayFactor) + twilightTint + plasmaRimGlow;

          gl_FragColor = vec4(col, cloudAlpha * 0.65);
        }
      `,transparent:!0,depthWrite:!1}),this.cloudsMesh=new _e(new pn(nt*1.004,160,160),this.cloudDeckMaterial),this.earthGroup.add(this.cloudsMesh),this.atmosHaloMat=new mt({uniforms:{uSunDir:{value:this.currentSunDir},uInnerColor:{value:new je(2659071)},uOuterColor:{value:new je(8970495)}},vertexShader:`
        varying vec3 vNormalView;
        varying vec3 vNormalWorld;
        varying vec3 vViewPos;
        void main() {
          vNormalView = normalize(normalMatrix * normal);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        uniform vec3 uSunDir;
        uniform vec3 uInnerColor;
        uniform vec3 uOuterColor;
        varying vec3 vNormalView;
        varying vec3 vNormalWorld;
        varying vec3 vViewPos;

        void main() {
          float viewDot = dot(vNormalView, vViewPos);
          float limb = pow(clamp(0.68 - viewDot, 0.0, 1.0), 2.8);
          float sunFacing = dot(vNormalWorld, normalize(uSunDir));
          float dayMix = smoothstep(-0.35, 0.45, sunFacing);
          vec3 col = mix(uInnerColor, uOuterColor, limb);
          gl_FragColor = vec4(col, limb * (0.28 + dayMix * 0.54));
        }
      `,side:Ft,transparent:!0,blending:cn,depthWrite:!1}),this.earthGroup.add(new _e(new pn(nt*1.015,128,128),this.atmosHaloMat))}createDenseGlobalEngineMatrix(){const t=new ot(.045,.14,6.8,6,1,!0);t.translate(0,3.4,0),this.globalNeedlesMat=new mt({uniforms:{uTime:{value:0},uThrust:{value:1},uWaveProgress:{value:1},uOverclock:{value:0}},vertexShader:`
        attribute float aWaveOrder;
        varying vec2 vUv;
        varying float vWaveOrder;
        void main() {
          vUv = uv;
          vWaveOrder = aWaveOrder;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform float uThrust;
        uniform float uWaveProgress;
        uniform float uOverclock;
        varying vec2 vUv;
        varying float vWaveOrder;

        void main() {
          float activeMask = smoothstep(vWaveOrder - 0.06, vWaveOrder + 0.02, uWaveProgress);
          if (activeMask <= 0.01 || uThrust <= 0.01) discard;

          float rootCore = exp(-vUv.y * 7.5);
          float laserDecay = pow(max(0.0, 1.0 - vUv.y), 1.45);
          float pulse = 0.88 + 0.12 * sin(uTime * 14.0 + vWaveOrder * 80.0);

          vec3 iceBlue = mix(vec3(0.05, 0.78, 1.0), vec3(1.35, 1.75, 2.1), rootCore);
          vec3 whiteGold = mix(vec3(1.0, 0.58, 0.12), vec3(1.8, 1.6, 1.1), rootCore);
          vec3 col = mix(iceBlue, whiteGold, uOverclock) * pulse;

          float alpha = clamp((laserDecay * 0.78 + rootCore * 0.65) * activeMask * clamp(uThrust, 0.3, 1.25), 0.0, 0.92);
          gl_FragColor = vec4(col, alpha);
        }
      `,transparent:!0,blending:cn,depthWrite:!1,side:en});const i=new kh(t,this.globalNeedlesMat,3600),s=new Float32Array(3600),r=new wt,a=new C(0,1,0),o=new Float32Array(3600*3),l=[{latMin:18,latMax:68,lonMin:12,lonMax:145},{latMin:22,latMax:64,lonMin:-130,lonMax:-62},{latMin:16,latMax:54,lonMin:-10,lonMax:48}];for(let c=0;c<3600;c++){let h=0,d=0,m=1;if(c<360)h=(Math.random()-.5)*.6,d=c/360*360-180,m=.85+Math.random()*.35;else{const E=l[c%l.length];h=E.latMin+Math.random()*(E.latMax-E.latMin),d=E.lonMin+Math.random()*(E.lonMax-E.lonMin),m=.85+Math.random()*.85}const v=(90-h)*(Math.PI/180),g=(d+180)*(Math.PI/180),p=-nt*Math.sin(v)*Math.cos(g),f=nt*Math.cos(v),M=nt*Math.sin(v)*Math.sin(g);r.position.set(p,f,M);const x=r.position.clone().normalize();r.quaternion.setFromUnitVectors(a,x),r.scale.set(1,m,1),r.updateMatrix(),i.setMatrixAt(c,r.matrix),o[c*3]=p*1.002,o[c*3+1]=f*1.002,o[c*3+2]=M*1.002,s[c]=(d+180)/360}i.geometry.setAttribute("aWaveOrder",new Jl(s,1)),this.earthGroup.add(i);const u=new Ct;u.setAttribute("position",new Ot(o,3)),this.earthGroup.add(new tc(u,new Ql({color:14744319,size:1.28,map:this.builder.softGlowSprite,transparent:!0,opacity:.96,blending:cn,depthWrite:!1})))}createOrbitalTrajectoryRings(){const e=(t,i,s,r)=>{const a=[];for(let l=0;l<180;l++){const u=l/180*Math.PI*2;a.push(new C(Math.cos(u)*t,0,Math.sin(u)*t))}const o=new MS(new Ct().setFromPoints(a),new sp({color:5089023,transparent:!0,opacity:r}));return o.rotation.set(i,0,s),o};this.earthGroup.add(e(Sr,0,0,.14)),this.earthGroup.add(e(156,.24,-.15,.12))}createAllEightDetailedMegastructures(){const e=new C(0,1,0);this.engineArrayGroup=new Mt;const t=new C().crossVectors(e,Qi).normalize(),i=new C().crossVectors(Qi,t).normalize(),s=[];for(let g=0;g<5;g++)for(let p=-2;p<=2;p++){const f=g*3.2+Math.abs(p)%2*1.1,M=p*2.8+(g%2-.5)*.8,x=Math.max(.88,1.48-g*.11);s.push({f,r:M,s:x})}s.forEach((g,p)=>{const f=p/s.length*.68,M=this.builder.buildBrutalistPlanetaryEngine(g.s,24,f),x=Qi.clone().multiplyScalar(nt).addScaledVector(i,g.r).addScaledVector(t,g.f).normalize();M.group.position.copy(x.clone().multiplyScalar(nt-.15)),M.group.quaternion.setFromUnitVectors(e,x),this.engineArrayGroup.add(M.group),this.engineArrayRigs.push(M)});const r=48,a=new ot(.45,.28,22,16,1,!0);a.translate(0,11,0),this.subMatrixBeamMat=this.builder.createCollimatedLaserCoreShader(.2);const o=new kh(a,this.subMatrixBeamMat,r),l=new wt;for(let g=0;g<r;g++){const p=Math.floor(g/8),f=g%8-3.5,M=6+p*4.2,x=f*4.2+p%2*1.8,E=Qi.clone().multiplyScalar(nt).addScaledVector(i,x).addScaledVector(t,M).normalize();l.position.copy(E.clone().multiplyScalar(nt+.3)),l.quaternion.setFromUnitVectors(e,E),l.scale.setScalar(Math.max(.55,1-p*.06)),l.updateMatrix(),o.setMatrixAt(g,l.matrix)}this.engineArrayGroup.add(o),this.earthGroup.add(this.engineArrayGroup),this.steeringArrayGroup=new Mt;const u=Math.atan2(Hs.x,Hs.z);for(let g=0;g<14;g++){const p=u+g*.018,f=new C(Math.sin(p),(g%2-.5)*.006,Math.cos(p)).normalize(),M=this.builder.buildGimbalSteeringEngineUnit(1.25,22);M.group.position.copy(f.clone().multiplyScalar(nt-.15)),M.group.quaternion.setFromUnitVectors(e,f),this.steeringArrayGroup.add(M.group),this.steeringRigs.push(M)}this.earthGroup.add(this.steeringArrayGroup),this.ignitionStageGroup=new Mt;const c=new C().crossVectors(e,Oo).normalize(),h=new C().crossVectors(Oo,c).normalize();for(let g=-3;g<=3;g++){const p=g===0?1.55:Math.abs(g)===1?1.28:1.02,f=this.builder.buildBrutalistPlanetaryEngine(p,25,(g+3)*.1),M=Oo.clone().multiplyScalar(nt).addScaledVector(h,g*2.05).addScaledVector(c,Math.abs(g)*.8).normalize();f.group.position.copy(M.clone().multiplyScalar(nt-.15)),f.group.quaternion.setFromUnitVectors(e,M),this.ignitionStageGroup.add(f.group),this.ignitionStageRigs.push(f)}this.earthGroup.add(this.ignitionStageGroup);const d=this.builder.buildIntegratedSpaceElevatorSystem(nt,Sr);this.elevatorSystemGroup=d.systemGroup,this.climberPods=d.climberPods,this.tianzhuAnim={upper:d.ringUpper,lower:d.ringLower,strobes:d.strobes},this.elevatorSystemGroup.quaternion.setFromUnitVectors(e,Er),this.earthGroup.add(this.elevatorSystemGroup),this.habitatGroup=this.builder.buildHabitatRingAurora(),this.habitatGroup.position.set(-76,42,132),this.habitatGroup.lookAt(0,0,0),this.earthGroup.add(this.habitatGroup);const m=this.builder.buildDeepSpaceRelayFleet();this.deepSpaceGroup=m.group,this.deepSpaceLaserMat=m.laserShaderMat,this.deepSpaceGroup.position.set(-185,65,195),this.deepSpaceGroup.lookAt(480,110,-780),this.scene.add(this.deepSpaceGroup);const v=this.builder.buildPhotorealisticLuna(27);this.lunaGroup=v.group,this.lunarRigs=v.lunarRigs,this.lunaGroup.position.set(220,28,-185),this.scene.add(this.lunaGroup)}createBoilingRedGiantSun(){this.dyingSunGroup=new Mt,this.dyingSunGroup.position.set(-280,95,-240);const e=36;this.dyingSunMat=new mt({uniforms:{uTime:{value:0}},vertexShader:`
        varying vec3 vUnitPos;
        varying vec3 vNormalView;
        varying vec3 vViewDir;
        void main() {
          vUnitPos = normalize(position);
          vNormalView = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        uniform float uTime;
        varying vec3 vUnitPos;
        varying vec3 vNormalView;
        varying vec3 vViewDir;

        vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 1.0 / 7.0;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        const mat3 rotM = mat3(0.00,  0.80,  0.60,
                              -0.80,  0.36, -0.48,
                              -0.60, -0.48,  0.64);

        float fbmSimplex(vec3 p) {
          float f = 0.0;
          float amp = 0.5;
          for (int i = 0; i < 5; i++) {
            f += amp * snoise(p);
            p = rotM * p * 2.05;
            amp *= 0.5;
          }
          return f;
        }

        void main() {
          vec3 p = vUnitPos * 4.5 + vec3(0.0, uTime * 0.08, uTime * 0.06);

          vec3 q = vec3(
            fbmSimplex(p),
            fbmSimplex(p + vec3(5.2, 1.3, 2.8)),
            fbmSimplex(p + vec3(1.7, 9.2, 4.1))
          );
          vec3 r = vec3(
            fbmSimplex(p + 1.8 * q + vec3(1.7, 9.2, 0.5) + uTime * 0.12),
            fbmSimplex(p + 1.8 * q + vec3(8.3, 2.8, 3.1) - uTime * 0.10),
            0.0
          );
          float convection = fbmSimplex(p + 2.2 * r);

          float granules = 1.0 - abs(snoise(vUnitPos * 26.0 + q * 2.5 - uTime * 0.35));

          float macroMag = snoise(vUnitPos * 3.2 + q * 0.6);
          float sunspotUmbra = smoothstep(-0.42, -0.68, macroMag);
          float activeFlareRing = exp(-pow((macroMag + 0.36) * 7.5, 2.0)) * smoothstep(0.3, 0.9, granules);
          float flareFilaments = pow(max(0.0, convection + granules * 0.5), 2.4);

          float mu = clamp(dot(normalize(vNormalView), normalize(vViewDir)), 0.0, 1.0);
          float limbDarkening = pow(mu, 0.52);
          float chromosphereRim = pow(1.0 - mu, 4.2);

          vec3 deepCrimson = vec3(0.40, 0.04, 0.0);
          vec3 lavaOrange = vec3(1.0, 0.27, 0.0);
          vec3 whiteGold = vec3(1.45, 1.28, 0.85);

          vec3 surfaceCol = mix(deepCrimson, lavaOrange, smoothstep(-0.35, 0.38, convection + granules * 0.35));
          surfaceCol = mix(surfaceCol, whiteGold, clamp(flareFilaments * 0.65 + activeFlareRing * 0.9, 0.0, 1.0));
          surfaceCol = mix(surfaceCol, vec3(0.10, 0.01, 0.0), sunspotUmbra * 0.88);
          surfaceCol = surfaceCol * (0.32 + 0.68 * limbDarkening) + vec3(1.5, 0.55, 0.12) * chromosphereRim * 0.95;

          gl_FragColor = vec4(surfaceCol, 1.0);
        }
      `});const t=new _e(new pn(e,128,128),this.dyingSunMat);this.dyingSunGroup.add(t),this.prominenceShellMat=new mt({uniforms:{uTime:{value:0}},vertexShader:`
        uniform float uTime;
        varying vec3 vUnitPos;
        varying vec3 vNormalView;
        varying vec3 vViewDir;

        vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 1.0 / 7.0;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        void main() {
          vUnitPos = normalize(position);
          float tongue = max(0.0, snoise(vUnitPos * 6.5 - vec3(0.0, uTime * 0.45, 0.0)))
                       + max(0.0, snoise(vUnitPos * 14.0 + vec3(uTime * 0.6, 0.0, 0.0))) * 0.5;
          vec3 displaced = position + normal * (tongue * 2.4);
          vNormalView = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,fragmentShader:`
        uniform float uTime;
        varying vec3 vUnitPos;
        varying vec3 vNormalView;
        varying vec3 vViewDir;

        void main() {
          float mu = abs(dot(normalize(vNormalView), normalize(vViewDir)));
          float rimFlame = pow(1.0 - mu, 2.6);
          float flicker = 0.7 + 0.3 * sin(vUnitPos.x * 25.0 + vUnitPos.y * 25.0 - uTime * 5.0);
          vec3 col = mix(vec3(1.0, 0.25, 0.02), vec3(1.6, 1.15, 0.45), rimFlame);
          gl_FragColor = vec4(col, rimFlame * flicker * 0.75);
        }
      `,side:Ft,transparent:!0,blending:cn,depthWrite:!1});const i=new _e(new pn(e*1.03,128,128),this.prominenceShellMat);this.dyingSunGroup.add(i),[{scale:1.35,falloff:3.2,opacity:.72,speed:.35},{scale:1.85,falloff:3.8,opacity:.48,speed:-.25},{scale:2.85,falloff:4.5,opacity:.32,speed:.18}].forEach(r=>{const a=new mt({uniforms:{uTime:{value:0},uFalloff:{value:r.falloff},uOpacity:{value:r.opacity},uSpeed:{value:r.speed}},vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform float uTime;
          uniform float uFalloff;
          uniform float uOpacity;
          uniform float uSpeed;
          varying vec2 vUv;

          void main() {
            vec2 p = (vUv - 0.5) * 2.0;
            float r = length(p);
            if (r > 1.0) discard;

            float ang = atan(p.y, p.x);
            float streamer1 = 0.5 + 0.5 * sin(ang * 7.0 + uTime * uSpeed + sin(r * 6.0 - uTime * 1.2));
            float streamer2 = 0.5 + 0.5 * cos(ang * 13.0 - uTime * uSpeed * 1.4 + cos(r * 10.0));
            float streamer3 = 0.5 + 0.5 * sin(ang * 23.0 + r * 8.0 - uTime * 1.8);
            float cmeRays = 0.55 + 0.25 * pow(streamer1, 2.0) + 0.12 * pow(streamer2, 3.0) + 0.08 * streamer3;

            float expDecay = exp(-r * uFalloff) * smoothstep(1.0, 0.35, r);
            float innerMask = smoothstep(0.18, 0.38, r);

            vec3 innerGold = vec3(1.55, 1.05, 0.42);
            vec3 outerCrimson = vec3(0.92, 0.22, 0.03);
            vec3 col = mix(innerGold, outerCrimson, clamp((r - 0.2) / 0.8, 0.0, 1.0));

            float alpha = expDecay * innerMask * cmeRays * uOpacity;
            gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.85));
          }
        `,transparent:!0,blending:cn,depthWrite:!1,side:en}),o=e*2*r.scale,l=new _e(new ir(o,o),a);this.dyingSunGroup.add(l),this.coronaLayerMats.push(a),this.coronaBillboards.push(l)}),this.eclipseOccluderSphere=new _e(new pn(35.4,64,64),new ln({color:0})),this.eclipseOccluderSphere.position.set(-110,-22,50),this.dyingSunGroup.add(this.eclipseOccluderSphere),this.scene.add(this.dyingSunGroup)}getNodeCameraPose(e){const t=new C(0,1,0);switch(e){case"EARTH":return{pos:new C(0,16,265),look:new C(0,0,0)};case"ENGINE_ARRAY":{const i=Qi,s=new C().crossVectors(t,i).normalize(),r=new C().crossVectors(i,s).normalize(),a=i.clone().multiplyScalar(nt+1.05).addScaledVector(s,-3.4).addScaledVector(r,1.15),o=i.clone().multiplyScalar(nt+6.5).addScaledVector(s,6.2);return{pos:a,look:o}}case"EQUATORIAL":{const i=Math.atan2(Hs.x,Hs.z),s=i-.028,r=i+.055,a=new C(Math.sin(s)*(nt+.85),-.38,Math.cos(s)*(nt+.85)),o=new C(Math.sin(r)*(nt+5.2),1.2,Math.cos(r)*(nt+5.2));return{pos:a,look:o}}case"ANCHOR":{const i=Er,s=new C(-i.z,.16,i.x).normalize(),r=i.clone().multiplyScalar(nt+1.45).addScaledVector(s,4.2),a=i.clone().multiplyScalar(nt+2.8);return{pos:r,look:a}}case"TIANZHU":{const i=Er,s=new C(-i.z,.18,i.x).normalize(),r=i.clone().multiplyScalar(Sr),a=r.clone().addScaledVector(i,5.2).addScaledVector(s,6.8),o=r.clone().addScaledVector(i,-1.5);return{pos:a,look:o}}case"HABITAT":{const i=this.habitatGroup.position.clone(),s=i.clone().normalize(),r=new C().crossVectors(s,t).normalize(),a=i.clone().addScaledVector(s,8.8).addScaledVector(r,6.2).add(new C(0,2.4,0)),o=i.clone().addScaledVector(s,-6.5);return{pos:a,look:o}}case"DEEP_SPACE":{const i=this.deepSpaceGroup.position.clone();return{pos:i.clone().add(new C(3.8,1.6,6.2)),look:i.clone().add(new C(-2,-.4,-3.5))}}case"LUNA":{const i=this.lunaGroup.position.clone();return{pos:i.clone().add(new C(18,10,48)),look:i.clone().add(new C(2,1,4))}}case"IGNITION_NODE":{const i=Oo,s=new C().crossVectors(t,i).normalize(),r=i.clone().multiplyScalar(nt+.65).addScaledVector(s,-4.8),a=i.clone().multiplyScalar(nt+3.6).addScaledVector(s,2.2);return{pos:r,look:a}}}}flyToNode(e,t=2.6){X.currentNode=e;const{pos:i,look:s}=this.getNodeCameraPose(e);this.camAnim.startPos.copy(this.camera.position),this.camAnim.endPos.copy(i),this.camAnim.startLook.copy(this.lookAtTarget),this.camAnim.endLook.copy(s),this.camAnim.startTime=performance.now(),this.camAnim.duration=t*1e3,this.camAnim.active=!0;const r=this.camAnim.startPos.clone().lerp(this.camAnim.endPos,.5);this.camAnim.useSphericalArc=r.length()<nt*1.12,this.controls.enabled=!1}updateCameraTransition(e){if(!this.camAnim.active)return;const t=Math.min(1,(e-this.camAnim.startTime)/this.camAnim.duration),i=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;if(this.camAnim.useSphericalArc){const s=this.camAnim.startPos.clone().normalize(),r=this.camAnim.endPos.clone().normalize(),a=new _i().setFromUnitVectors(new C(0,0,1),s),o=new _i().setFromUnitVectors(new C(0,0,1),r);a.slerp(o,i);const l=new C(0,0,1).applyQuaternion(a).normalize(),u=this.camAnim.startPos.length(),c=this.camAnim.endPos.length(),h=jl.lerp(u,c,i),d=Math.sin(i*Math.PI)*32,m=Math.max(nt*1.15,h+d);this.baseCamPos.copy(l.multiplyScalar(m))}else this.baseCamPos.lerpVectors(this.camAnim.startPos,this.camAnim.endPos,i);this.lookAtTarget.lerpVectors(this.camAnim.startLook,this.camAnim.endLook,i),this.controls.target.copy(this.lookAtTarget),t>=1&&(this.camAnim.active=!1,X.currentMode==="EXPLORE"&&(this.controls.enabled=!0))}startThreeChapterStorySequence(){this.clearStoryTimers(),X.storyActive=!0,this.controls.enabled=!1,it.bgmPlaying||it.startBGM();const e=()=>X.lang==="ZH",t=this.dyingSunGroup.position.clone(),i=t.clone().negate().normalize();this.isEclipseShotActive=!0,X.storyChapter=e()?"第一章 // CHAPTER I":"CHAPTER I",X.storyTitle=e()?"垂死之日 THE DYING SUN":"THE DYING SUN",X.storySubtitle=e()?"太阳正在死去，急速膨胀的红巨星即将吞噬地球。":"And the Sun is dying.",it.speak("Chapter One: The Dying Sun.","第一章，垂死之日。太阳正在死去。"),this.eclipseOccluderSphere.position.set(-85,-18,40);const s=t.clone().addScaledVector(i,135).add(new C(12,4,-8)),r=t.clone().addScaledVector(i,122);this.camera.position.copy(s),this.baseCamPos.copy(s),this.lookAtTarget.copy(t),this.camAnim.startPos.copy(s),this.camAnim.endPos.copy(r),this.camAnim.startLook.copy(t),this.camAnim.endLook.copy(t),this.camAnim.startTime=performance.now(),this.camAnim.duration=8800,this.camAnim.useSphericalArc=!1,this.camAnim.active=!0,this.storyTimers.push(window.setTimeout(()=>{X.storyChapter="",X.storyTitle="",X.storySubtitle=e()?"所以我们决定，带着地球一起离开。":"So we will take the Earth with us.",it.speak("So we will take the Earth with us.","所以我们决定，带着地球一起离开。")},4200)),this.storyTimers.push(window.setTimeout(()=>{this.isEclipseShotActive=!1,this.eclipseOccluderSphere.position.set(-110,-22,50),X.storyChapter=e()?"第二章 // CHAPTER II":"CHAPTER II",X.storyTitle=e()?"苍穹点火 IGNITION":"IGNITION",X.storySubtitle=e()?"行星发动机矩阵同步点火，白青色高斯等离子光柱直冲苍穹。":"Planetary engine matrix ignites across the horizon as plasma lasers pierce the heavens.",it.speak("Chapter Two: Ignition.","第二章，苍穹点火。"),this.dominoIgnitionProgress=0;for(let o=0;o<5;o++)this.storyTimers.push(window.setTimeout(()=>{it.playIgnitionBoom(o)},o*1200));const a=this.getNodeCameraPose("IGNITION_NODE");this.camera.position.copy(a.pos),this.baseCamPos.copy(a.pos),this.lookAtTarget.copy(a.look),this.camAnim.startPos.copy(a.pos),this.camAnim.endPos.copy(a.pos.clone().add(new C(.5,.35,.5))),this.camAnim.startLook.copy(a.look),this.camAnim.endLook.copy(a.look.clone().add(new C(0,1.8,0))),this.camAnim.startTime=performance.now(),this.camAnim.duration=9600,this.camAnim.useSphericalArc=!1,this.camAnim.active=!0},9e3)),this.storyTimers.push(window.setTimeout(()=>{X.storyChapter="",X.storyTitle="",X.storySubtitle=e()?"一万座行星发动机，按各大洲版图依次点亮。":"10,000 planetary engines light up, continent by continent.",it.speak("10,000 planetary engines light up, continent by continent.","一万座行星发动机，按各大洲版图依次点亮。"),this.globalWaveProgress=0;const a=this.getNodeCameraPose("EARTH");this.camAnim.startPos.copy(this.camera.position),this.camAnim.endPos.copy(a.pos),this.camAnim.startLook.copy(this.lookAtTarget),this.camAnim.endLook.copy(a.look),this.camAnim.startTime=performance.now(),this.camAnim.duration=5200,this.camAnim.useSphericalArc=!0,this.camAnim.active=!0},19e3)),this.storyTimers.push(window.setTimeout(()=>{X.storyChapter=e()?"第三章 // CHAPTER III":"CHAPTER III",X.storyTitle=e()?"刹住世界 TURNING THE WORLD":"TURNING THE WORLD",X.storySubtitle=e()?"去刹住我们这个世界的自转。":"To brake our world's rotation.",it.speak("To brake our world's rotation.","去刹住我们这个世界的自转。");const a=this.getNodeCameraPose("EQUATORIAL");this.camera.position.copy(a.pos),this.baseCamPos.copy(a.pos),this.lookAtTarget.copy(a.look),this.camAnim.startPos.copy(a.pos),this.camAnim.endPos.copy(a.pos.clone().add(new C(.4,.3,-.6))),this.camAnim.startLook.copy(a.look),this.camAnim.endLook.copy(a.look.clone().add(new C(0,1.4,0))),this.camAnim.startTime=performance.now(),this.camAnim.duration=5200,this.camAnim.useSphericalArc=!1,this.camAnim.active=!0},24500)),this.storyTimers.push(window.setTimeout(()=>{X.storyActive=!1,X.currentMode="CINEMATIC",this.dominoIgnitionProgress=1,this.globalWaveProgress=1,this.flyToNode("EARTH",2.8)},3e4))}clearStoryTimers(){this.storyTimers.forEach(e=>clearTimeout(e)),this.storyTimers=[],X.storyActive=!1,this.isEclipseShotActive=!1,this.eclipseOccluderSphere&&this.eclipseOccluderSphere.position.set(-110,-22,50),this.dominoIgnitionProgress=1,this.globalWaveProgress=1}setMode(e){X.currentMode=e,this.clearStoryTimers(),e==="JOURNEY"?this.startThreeChapterStorySequence():e==="FIRST_PERSON"?this.flyToNode("IGNITION_NODE",2.2):e==="EXPLORE"?this.controls.enabled=!0:e==="CINEMATIC"&&this.flyToNode(X.currentNode,2.4)}startAutoCinematicCycle(){let e=0;this.cinematicInterval=window.setInterval(()=>{X.currentMode==="CINEMATIC"&&!X.storyActive&&!this.camAnim.active&&(e=(e+1)%us.length,this.flyToNode(us[e].id,3))},8e3)}updateProjectedReticles(){if(X.currentNode!=="EARTH"||X.storyActive||!X.hudVisible){X.reticles=[];return}const e=[{id:"ENGINE_ARRAY",name:X.lang==="ZH"?"一号推进阵列 (73座)":"ENGINE ARRAY 01",alt:"ALT: 11.2 KM",pos:Qi.clone().multiplyScalar(nt)},{id:"EQUATORIAL",name:X.lang==="ZH"?"赤道转向带":"EQUATORIAL TORQUE",alt:"LAT: 00°00′",pos:Hs.clone().multiplyScalar(nt)},{id:"ANCHOR",name:X.lang==="ZH"?"太空电梯基座":"ELEVATOR ANCHOR",alt:"ALT: 0.0 KM",pos:Er.clone().multiplyScalar(nt)},{id:"TIANZHU",name:X.lang==="ZH"?"天柱号空间站":"TIANZHU APEX",alt:"GEO: 35,786 KM",pos:Er.clone().multiplyScalar(Sr)},{id:"HABITAT",name:X.lang==="ZH"?"极光殖民环":"HABITAT AURORA",alt:"HEO: 52,400 KM",pos:this.habitatGroup.position.clone()}],t=this.container.clientWidth,i=this.container.clientHeight;X.reticles=e.map(s=>{const r=s.pos.clone().project(this.camera),a=(r.x*.5+.5)*t,o=(-r.y*.5+.5)*i,l=r.z<1&&a>80&&a<t-80&&o>60&&o<i-80;return{id:s.id,name:s.name,alt:s.alt,x:a,y:o,visible:l}})}setupResize(){window.addEventListener("resize",()=>{const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.composer.setSize(e,t),this.anamorphicPass.uniforms.uResolution.value.set(e,t)})}dispose(){cancelAnimationFrame(this.rafId),this.cinematicInterval&&clearInterval(this.cinematicInterval),this.clearStoryTimers(),this.renderer.dispose()}}const VS=["onClick"],kS={class:"reticle-tag"},WS={class:"reticle-alt"},XS={key:0,class:"widescreen-cinema-layer"},qS={class:"letterbox-bar top"},YS={key:0,class:"cinema-chapter-card"},jS={class:"c-chapter"},KS={class:"c-title"},$S={key:1,class:"cinema-subtitle"},ZS={key:0,class:"hud-master-layer"},JS={class:"top-left-hud"},QS={class:"brand-header"},eE={class:"project-sub"},tE={class:"fui-box telemetry-card"},nE={class:"fui-section-title"},iE={class:"thrust-control-block"},sE={class:"thrust-header-row"},rE={class:"readout-grid"},oE={class:"readout-row"},aE={class:"readout-row"},lE={class:"readout-row"},cE={class:"cyan-val"},uE={class:"readout-row"},hE={class:"readout-row"},fE={class:"readout-row"},dE={class:"spectrum-block"},pE={class:"spec-header"},mE={class:"spec-hz"},gE={class:"spectrum-bars"},vE={class:"top-right-hud"},_E={class:"control-pills-bar"},xE={key:0,class:"fui-box moss-modal"},yE={class:"moss-modal-header"},ME={class:"moss-lens-group"},SE={class:"moss-sub"},EE={class:"tag"},TE={class:"moss-action-buttons"},bE=["placeholder"],wE={class:"fui-box radar-card"},AE={class:"fui-section-title"},RE={class:"readout-grid orbital-mini-grid"},CE={class:"readout-row"},PE={class:"gold-val"},LE={class:"readout-row"},IE={class:"cyan-val"},DE={class:"fui-section-title radar-sub-header"},UE={class:"mini-radar-wrap"},NE={width:"128",height:"128",viewBox:"0 0 132 132"},OE=["x2","y2"],FE=["cx","cy"],BE={class:"bottom-nav-dock"},zE={class:"node-banner"},GE={class:"node-title-line"},HE={class:"node-main-title"},VE={class:"node-sub-title"},kE={class:"alt-pill"},WE={class:"nav-strip mode-strip"},XE=["onClick"],qE={class:"nav-strip node-strip"},YE=["onClick"],jE={class:"key-hint"},KE=mm({__name:"App",setup(n){const e=gs(null),t=gs(null);let i=null,s=0,r=null;const a=_c(()=>X.lang==="ZH"),o=gs(!1),l=gs(Array.from({length:24},()=>45)),u=[{id:"CINEMATIC",labelEn:"CINEMATIC",labelZh:"CINEMATIC 自动巡航"},{id:"EXPLORE",labelEn:"EXPLORE",labelZh:"EXPLORE 自由探索"},{id:"FIRST_PERSON",labelEn:"FIRST PERSON",labelZh:"FIRST PERSON 地表视角"},{id:"JOURNEY",labelEn:"JOURNEY",labelZh:"JOURNEY 史诗航程"}],c=()=>{o.value=it.toggleBGM()},h=y=>{it.playConfirm(),i==null||i.setMode(y),y==="JOURNEY"&&(o.value=it.bgmPlaying)},d=y=>{it.playConfirm(),X.currentMode==="JOURNEY"&&(X.currentMode="CINEMATIC"),i==null||i.flyToNode(y)},m=()=>{it.playConfirm(),i==null||i.setMode("CINEMATIC")},v=()=>{X.audioEnabled=!X.audioEnabled,!X.audioEnabled&&it.bgmPlaying?(it.stopBGM(),o.value=!1):X.audioEnabled&&it.playConfirm()},g=()=>{X.lang=X.lang==="EN"?"ZH":"EN",it.playConfirm()},p=()=>{X.bloomEnabled=!X.bloomEnabled,it.playConfirm()},f=()=>{X.mossOpen=!X.mossOpen,it.playConfirm()},M=gs(""),x=gs([{role:"moss",text:"550W 量子核心在线。可点击右上角 [BGM: ON] 开启太空管风琴交响配乐。"}]),E=(y,T)=>{x.value.push({role:y,text:T}),Uf(()=>{t.value&&(t.value.scrollTop=t.value.scrollHeight)})},U=()=>{if(X.twelveStrikeActive){X.twelveStrikeActive=!1,X.thrustPercent=95.8,r&&clearInterval(r),it.playConfirm(),E("moss",a.value?"已退出“春节十二响”超频序列，恢复标准巡航推力。":"SPRING FESTIVAL 12-STRIKE ABORTED. THRUST NOMINAL.");return}it.bgmPlaying||(it.startBGM(),o.value=!0),X.twelveStrikeActive=!0,X.heliosOverdrive=!1,X.thrustPercent=120,X.strikeCount=1,it.playTwelveStrikeShockwave(),it.speak("Spring Festival Twelve-Strike engaged. Planetary escape acceleration at maximum.","春节十二响已启动，行星逃逸加速度达到峰值。"),E("moss",a.value?"🔥 [120% OVERCLOCK] 春节十二响已激活！反冲加速度提升 45%，加速远离太阳！":"🔥 [120% OVERCLOCK] 12-STRIKE ENGAGED! ESCAPE ACCELERATION +45%!"),r&&clearInterval(r),r=window.setInterval(()=>{X.twelveStrikeActive&&(X.strikeCount=X.strikeCount%12+1)},1800)},P=()=>{X.heliosOverdrive=!X.heliosOverdrive,X.heliosOverdrive?(X.twelveStrikeActive=!1,X.thrustPercent=115,it.playIgnitionBoom(3),it.speak("Helios Overdrive engaged. Planetary thrust at maximum output.","赫利俄斯超载模式已激活，行星推力全功率输出。"),E("moss",a.value?"⚡ HELIOS OVERDRIVE 已启动，推力锁定 115%。":"⚡ HELIOS OVERDRIVE ACTIVE. THRUST AT 115%.")):(X.thrustPercent=95.8,it.playConfirm(),E("moss",a.value?"赫利俄斯超载已解除。":"HELIOS OVERDRIVE DISENGAGED."))},R=()=>{it.playIgnitionBoom(1),d("LUNA");const y="Alert. Lunar exile engines firing at maximum thrust to decouple from Earth gravity.",T="警告：地月引力解耦进入临界阶段，静海核聚变放逐阵列正在全功率喷射。";E("moss",a.value?T:y),it.speak(y,T)},O=()=>{const y=M.value.trim();if(!y)return;M.value="",E("user",y);const T=y.toLowerCase();if(T==="help")E("moss","COMMANDS: status | bgm | truth | 12strike | helios | luna | journey | reset");else if(T==="bgm")c(),E("moss",o.value?"EPIC SYMPHONIC BGM: ENABLED":"EPIC SYMPHONIC BGM: MUTED");else if(T==="status")E("moss",`THRUST: ${X.thrustPercent}% | VELOCITY: ${Bt.value.earthVelocity} | DIST: ${Bt.value.solarDistance}`);else if(T.includes("truth")){const L="To expect humans to always remain rational is truly a luxury.",z="让人类永远保持理智，确实是一种奢求。";E("moss",a.value?z:L),it.speak(L,z)}else T==="12strike"?U():T==="helios"?P():T==="luna"?R():T==="journey"||T==="story"?h("JOURNEY"):T==="reset"?(X.twelveStrikeActive=!1,X.heliosOverdrive=!1,X.thrustPercent=95.8,X.accumulatedVelocityKmS=29.07,X.accumulatedSolarDistAU=1.0475,X.sunRecessionUnits=0,d("EARTH")):E("moss",a.value?`指令 [${y}] 已记录至 550W 量子核心。`:`DIRECTIVE [${y}] LOGGED IN 550W QUANTUM MATRIX.`)},k=y=>{var z;if(y.key==="Escape"&&X.storyActive){m();return}const T=(z=y.target)==null?void 0:z.tagName;if(T==="INPUT"||T==="TEXTAREA")return;const L=parseInt(y.key,10);L>=1&&L<=us.length&&d(us[L-1].id)};return pc(()=>{e.value&&(i=new HS(e.value)),window.addEventListener("keydown",k),s=window.setInterval(()=>{X.jitter=(Math.random()-.5)*2,Math.random()>.2&&X.elapsedSeconds++;const y=X.thrustPercent/120*72;l.value=l.value.map((T,L)=>{const z=Math.sin(performance.now()*.008+L*.55)*16,D=Math.random()*14;return Math.max(8,Math.min(98,Math.round(y+z+D)))})},140)}),mc(()=>{window.removeEventListener("keydown",k),clearInterval(s),r&&clearInterval(r),it.stopBGM(),i==null||i.dispose()}),(y,T)=>(zt(),jt("div",{class:Zt(["earth-migration-app",{"overclock-mode":Ve(X).twelveStrikeActive||Ve(X).heliosOverdrive}])},[se("div",{ref_key:"viewportRef",ref:e,class:"webgl-canvas"},null,512),(zt(!0),jt(Wt,null,lr(Ve(X).reticles,L=>Na((zt(),jt("div",{key:L.id,class:"spatial-reticle",style:Nr({left:L.x+"px",top:L.y+"px"}),onClick:z=>d(L.id)},[T[3]||(T[3]=se("svg",{class:"reticle-svg",viewBox:"0 0 32 32"},[se("circle",{cx:"16",cy:"16",r:"11",stroke:"currentColor","stroke-width":"1","stroke-dasharray":"4 3",fill:"none"}),se("path",{d:"M16 2 L16 7 M16 25 L16 30 M2 16 L7 16 M25 16 L30 16",stroke:"currentColor","stroke-width":"1.2"}),se("circle",{cx:"16",cy:"16",r:"2",fill:"currentColor"})],-1)),se("div",kS,[se("span",null,qe(L.name),1),se("span",WS,qe(L.alt),1)])],12,VS)),[[Eg,L.visible]])),128)),nn(Ha,{name:"fade"},{default:Bo(()=>[Ve(X).storyActive?(zt(),jt("div",XS,[se("div",qS,[se("button",{class:"exit-story-btn",onClick:m},qe(a.value?"退出叙事序列 [ESC]":"EXIT SEQUENCE [ESC]"),1)]),Ve(X).storyTitle?(zt(),jt("div",YS,[se("div",jS,qe(Ve(X).storyChapter),1),se("div",KS,qe(Ve(X).storyTitle),1)])):ks("",!0),Ve(X).storySubtitle?(zt(),jt("div",$S,qe(Ve(X).storySubtitle),1)):ks("",!0),T[4]||(T[4]=se("div",{class:"letterbox-bar bottom"},null,-1))])):ks("",!0)]),_:1}),nn(Ha,{name:"fade"},{default:Bo(()=>[!Ve(X).storyActive&&Ve(X).hudVisible?(zt(),jt("div",ZS,[se("aside",JS,[se("div",QS,[T[5]||(T[5]=se("h1",{class:"project-title"},"THE EARTH MIGRATION PROJECT",-1)),se("div",eE,qe(a.value?"地球联合政府 (UEG) · 流浪地球全球推进遥测终端":"UNITED EARTH GOVERNMENT — HUMANITY'S LAST JOURNEY"),1)]),se("div",tE,[se("div",nE,qe(a.value?"行星推进遥测 // PROPULSION TELEMETRY":"PLANETARY PROPULSION TELEMETRY"),1),se("div",iE,[se("div",sE,[se("span",null,qe(a.value?"总推力节流阀 THRUST OUTPUT":"THRUST OUTPUT"),1),se("span",{class:Zt(["thrust-pct-val",{overclock:Ve(X).thrustPercent>102}])},qe(Ve(X).thrustPercent.toFixed(1))+"% ",3)]),Na(se("input",{type:"range",min:"0",max:"120",step:"0.5","onUpdate:modelValue":T[0]||(T[0]=L=>Ve(X).thrustPercent=L),class:"thrust-slider"},null,512),[[vu,Ve(X).thrustPercent,void 0,{number:!0}]]),T[6]||(T[6]=se("div",{class:"slider-scale"},[se("span",null,"0%"),se("span",null,"50%"),se("span",null,"100%"),se("span",{class:"overclock-tag"},"120% OVERCLOCK")],-1))]),se("div",rE,[se("div",oE,[se("span",null,qe(a.value?"核心聚变炉温 CORE TEMP":"CORE TEMP"),1),se("strong",null,qe(Ve(Bt).coreTemp),1)]),se("div",aE,[se("span",null,qe(a.value?"重元素聚变状态 HEAVY FUSION":"HEAVY ELEMENT FUSION"),1),T[7]||(T[7]=se("strong",{class:"green-val"},"ACTIVE",-1))]),se("div",lE,[se("span",null,qe(a.value?"在线发动机 ACTIVE ENGINES":"ACTIVE ENGINES"),1),se("strong",cE,qe(Ve(Bt).activeEngines),1)]),se("div",uE,[se("span",null,qe(a.value?"扭矩平衡度 TORQUE BALANCE":"TORQUE BALANCE"),1),se("strong",null,qe(Ve(Bt).torqueBalance),1)]),se("div",hE,[se("span",null,qe(a.value?"聚变燃料消耗率 FUEL RATE":"FUEL RATE"),1),se("strong",null,qe(Ve(Bt).fuelRate),1)]),se("div",fE,[se("span",null,qe(a.value?"地下城总人口 POPULATION":"POPULATION"),1),T[8]||(T[8]=se("strong",null,"3.52B (UNDERGROUND)",-1))])]),se("div",dE,[se("div",pE,[se("span",null,qe(a.value?"等离子磁约束谐振频谱":"PLASMA HARMONIC SPECTRUM"),1),se("span",mE,qe((42.8+Ve(X).thrustPercent/100*18.4).toFixed(1))+" THz",1)]),se("div",gE,[(zt(!0),jt(Wt,null,lr(l.value,(L,z)=>(zt(),jt("span",{key:z,class:Zt(["spec-bar",{hot:L>78}]),style:Nr({height:L+"%"})},null,6))),128))])])])]),se("aside",vE,[se("div",_E,[se("button",{class:Zt(["ctrl-pill bgm-pill",{active:o.value}]),onClick:c},[se("span",{class:Zt(["bgm-dot",{playing:o.value}])},null,2),br(" BGM: "+qe(o.value?"ON":"OFF"),1)],2),se("button",{class:Zt(["ctrl-pill",{active:Ve(X).audioEnabled}]),onClick:v}," SFX: "+qe(Ve(X).audioEnabled?"ON":"OFF"),3),se("button",{class:"ctrl-pill",onClick:g},qe(Ve(X).lang==="EN"?"ENG / 中文":"中文 / ENG"),1),se("button",{class:Zt(["ctrl-pill moss-pill",{active:Ve(X).mossOpen,alert:Ve(X).twelveStrikeActive}]),onClick:f},[...T[9]||(T[9]=[se("span",{class:"moss-dot"},null,-1),br(" MOSS: ONLINE ",-1)])],2),se("button",{class:Zt(["ctrl-pill",{active:Ve(X).bloomEnabled}]),onClick:p}," FX ",2)]),nn(Ha,{name:"fade"},{default:Bo(()=>[Ve(X).mossOpen?(zt(),jt("div",xE,[se("div",yE,[se("div",ME,[T[11]||(T[11]=se("svg",{width:"34",height:"34",viewBox:"0 0 60 60",class:"moss-eye-svg"},[se("circle",{cx:"30",cy:"30",r:"26",stroke:"rgba(255,42,77,0.45)","stroke-width":"1.5","stroke-dasharray":"6 4",fill:"none",class:"spin-cw"}),se("circle",{cx:"30",cy:"30",r:"18",stroke:"#ff2a4d","stroke-width":"1.2","stroke-dasharray":"10 5",fill:"none",class:"spin-ccw"}),se("circle",{cx:"30",cy:"30",r:"9",fill:"#ff2a4d"}),se("circle",{cx:"27",cy:"27",r:"2.5",fill:"#ffffff"})],-1)),se("div",null,[T[10]||(T[10]=se("div",{class:"moss-title"},"MOSS // 550W QUANTUM CONSOLE",-1)),se("div",SE,qe(a.value?"量子自主决策矩阵 · 算力在线":"AUTONOMOUS QUANTUM DECISION MATRIX"),1)])]),se("button",{class:"moss-close",onClick:T[1]||(T[1]=L=>Ve(X).mossOpen=!1)},"×")]),se("div",{class:"moss-terminal-log",ref_key:"mossLogRef",ref:t},[(zt(!0),jt(Wt,null,lr(x.value,(L,z)=>(zt(),jt("div",{key:z,class:Zt(["log-item",L.role])},[se("span",EE,qe(L.role==="user"?">":"[550W]"),1),se("span",null,qe(L.text),1)],2))),128))],512),se("div",TE,[se("button",{class:Zt(["moss-action-btn danger",{active:Ve(X).twelveStrikeActive}]),onClick:U},qe(Ve(X).twelveStrikeActive?`[ 12-STRIKE ACTIVE #${Ve(X).strikeCount}/12 — CLICK TO ABORT ]`:"[ TRIGGER SPRING FESTIVAL 12-STRIKE ]"),3),se("button",{class:Zt(["moss-action-btn warn",{active:Ve(X).heliosOverdrive}]),onClick:P},qe(Ve(X).heliosOverdrive?"[ HELIOS OVERDRIVE ENGAGED — CLICK TO RESET ]":"[ ENGAGE HELIOS OVERDRIVE ]"),3),se("button",{class:"moss-action-btn cyan",onClick:R},qe(a.value?"[ 模拟地月洛希极限引力危机 // ROCHE DRILL ]":"[ SIMULATE LUNAR ROCHE LIMIT CRISIS ]"),1)]),se("form",{class:"moss-cli-form",onSubmit:kg(O,["prevent"])},[T[12]||(T[12]=se("span",null,">",-1)),Na(se("input",{"onUpdate:modelValue":T[2]||(T[2]=L=>M.value=L),type:"text",placeholder:a.value?"输入指令 (help / bgm / truth)...":"Type command (help / bgm / truth)..."},null,8,bE),[[vu,M.value]])],32)])):ks("",!0)]),_:1}),se("div",wE,[se("div",AE,qe(a.value?"轨道位置参数 // ORBITAL POSITION":"ORBITAL POSITION"),1),se("div",RE,[se("div",CE,[T[13]||(T[13]=se("span",null,"HELIO DIST",-1)),se("strong",PE,qe(Ve(Bt).solarDistance)+" ↑",1)]),se("div",LE,[T[14]||(T[14]=se("span",null,"ESCAPE VEL",-1)),se("strong",IE,qe(Ve(Bt).earthVelocity)+" ↑",1)]),T[15]||(T[15]=se("div",{class:"readout-row"},[se("span",null,"EARTH MASS"),se("strong",null,"5.972e24 kg")],-1)),T[16]||(T[16]=se("div",{class:"readout-row"},[se("span",null,"ROTATION"),se("strong",null,"HALTED (0.000 rad/s)")],-1)),T[17]||(T[17]=se("div",{class:"readout-row"},[se("span",null,"PHASE"),se("strong",{class:"cyan-val"},"1 — BRAKING ERA")],-1))]),se("div",DE,qe(a.value?"太阳系逃逸航迹 // SOLAR SYSTEM TRAJECTORY":"SOLAR SYSTEM TRAJECTORY"),1),se("div",UE,[(zt(),jt("svg",NE,[T[18]||(T[18]=se("circle",{cx:"66",cy:"66",r:"56",stroke:"rgba(100,190,255,0.14)",fill:"none"},null,-1)),T[19]||(T[19]=se("circle",{cx:"66",cy:"66",r:"38",stroke:"rgba(100,190,255,0.2)","stroke-dasharray":"3 3",fill:"none"},null,-1)),T[20]||(T[20]=se("circle",{cx:"66",cy:"66",r:"20",stroke:"rgba(100,190,255,0.14)",fill:"none"},null,-1)),T[21]||(T[21]=se("line",{x1:"66",y1:"6",x2:"66",y2:"126",stroke:"rgba(100,190,255,0.1)"},null,-1)),T[22]||(T[22]=se("line",{x1:"6",y1:"66",x2:"126",y2:"66",stroke:"rgba(100,190,255,0.1)"},null,-1)),se("line",{x1:"66",y1:"66",x2:Ve(Bt).radarEarthX,y2:Ve(Bt).radarEarthY,stroke:"rgba(251,191,36,0.35)","stroke-dasharray":"2 2"},null,8,OE),T[23]||(T[23]=se("path",{d:"M 66 46 Q 94 48 98 76 T 54 116",stroke:"#00d8ff","stroke-width":"1.3",fill:"none"},null,-1)),T[24]||(T[24]=se("circle",{cx:"66",cy:"66",r:"4.5",fill:"#fbbf24"},null,-1)),se("circle",{cx:Ve(Bt).radarEarthX,cy:Ve(Bt).radarEarthY,r:"4",fill:"#00d8ff"},null,8,FE),T[25]||(T[25]=se("circle",{cx:"42",cy:"102",r:"3",fill:"#94a3b8"},null,-1))]))])])]),se("footer",BE,[se("div",zE,[se("div",GE,[T[26]||(T[26]=se("span",{class:"wing-line"},null,-1)),se("h2",HE,qe(a.value?Ve(Bt).nodeMeta.titleZh:Ve(Bt).nodeMeta.titleEn),1),T[27]||(T[27]=se("span",{class:"wing-line"},null,-1))]),se("div",VE,[br(qe(a.value?Ve(Bt).nodeMeta.subZh:Ve(Bt).nodeMeta.subEn)+" ",1),se("span",kE,qe(Ve(Bt).nodeMeta.altitudeTag),1)])]),se("div",WE,[(zt(),jt(Wt,null,lr(u,L=>se("button",{key:L.id,class:Zt(["strip-btn",{active:Ve(X).currentMode===L.id}]),onClick:z=>h(L.id)},qe(a.value?L.labelZh:L.labelEn),11,XE)),64))]),se("div",qE,[(zt(!0),jt(Wt,null,lr(Ve(us),(L,z)=>(zt(),jt("button",{key:L.id,class:Zt(["strip-btn",{active:Ve(X).currentNode===L.id}]),onClick:D=>d(L.id)},[se("small",jE,"["+qe(z+1)+"]",1),br(" "+qe(a.value?L.labelZh:L.labelEn),1)],10,YE))),128))])])])):ks("",!0)]),_:1})],2))}}),$E=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},ZE=$E(KE,[["__scopeId","data-v-cd3e8f78"]]);qg(ZE).mount("#app");

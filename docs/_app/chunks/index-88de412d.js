function v(){}function Q(t,n){for(const e in n)t[e]=n[e];return t}function O(t){return t()}function M(){return Object.create(null)}function g(t){t.forEach(O)}function P(t){return typeof t=="function"}function dt(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function ht(t,n){return t!=t?n==n:t!==n}function U(t){return Object.keys(t).length===0}function B(t,...n){if(t==null)return v;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function mt(t){let n;return B(t,e=>n=e)(),n}function pt(t,n,e){t.$$.on_destroy.push(B(n,e))}function gt(t,n,e,i){if(t){const s=q(t,n,e,i);return t[0](s)}}function q(t,n,e,i){return t[1]&&i?Q(e.ctx.slice(),t[1](i(n))):e.ctx}function yt(t,n,e,i){if(t[2]&&i){const s=t[2](i(e));if(n.dirty===void 0)return s;if(typeof s=="object"){const u=[],c=Math.max(n.dirty.length,s.length);for(let o=0;o<c;o+=1)u[o]=n.dirty[o]|s[o];return u}return n.dirty|s}return n.dirty}function xt(t,n,e,i,s,u){if(s){const c=q(n,e,i,u);t.p(c,s)}}function bt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function $t(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function wt(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}function vt(t,n,e){return t.set(e),n}function Et(t){return t&&P(t.destroy)?t.destroy:v}let E=!1;function V(){E=!0}function X(){E=!1}function Y(t,n,e,i){for(;t<n;){const s=t+(n-t>>1);e(s)<=i?t=s+1:n=s}return t}function Z(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let l=0;l<n.length;l++){const f=n[l];f.claim_order!==void 0&&r.push(f)}n=r}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let s=0;for(let r=0;r<n.length;r++){const l=n[r].claim_order,f=(s>0&&n[e[s]].claim_order<=l?s+1:Y(1,s,y=>n[e[y]].claim_order,l))-1;i[r]=e[f]+1;const a=f+1;e[a]=r,s=Math.max(a,s)}const u=[],c=[];let o=n.length-1;for(let r=e[s]+1;r!=0;r=i[r-1]){for(u.push(n[r-1]);o>=r;o--)c.push(n[o]);o--}for(;o>=0;o--)c.push(n[o]);u.reverse(),c.sort((r,l)=>r.claim_order-l.claim_order);for(let r=0,l=0;r<c.length;r++){for(;l<u.length&&c[r].claim_order>=u[l].claim_order;)l++;const f=l<u.length?u[l]:null;t.insertBefore(c[r],f)}}function tt(t,n){if(E){for(Z(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function nt(t,n,e){t.insertBefore(n,e||null)}function et(t,n,e){E&&!e?tt(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function w(t){t.parentNode.removeChild(t)}function Tt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function G(t){return document.createElement(t)}function it(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function kt(){return S(" ")}function At(){return S("")}function Nt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function St(t){return function(n){return n.preventDefault(),t.call(this,n)}}function jt(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function z(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Ct(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in n)n[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=n[i]:i==="__value"?t.value=t[i]=n[i]:e[i]&&e[i].set?t[i]=n[i]:z(t,i,n[i])}function Mt(t,n){for(const e in n)z(t,e,n[e])}function st(t){return Array.from(t.childNodes)}function F(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function I(t,n,e,i,s=!1){F(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(n(o)){const r=e(o);return r===void 0?t.splice(c,1):t[c]=r,s||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(n(o)){const r=e(o);return r===void 0?t.splice(c,1):t[c]=r,s?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function R(t,n,e,i){return I(t,s=>s.nodeName===n,s=>{const u=[];for(let c=0;c<s.attributes.length;c++){const o=s.attributes[c];e[o.name]||u.push(o.name)}u.forEach(c=>s.removeAttribute(c))},()=>i(n))}function Ht(t,n,e){return R(t,n,e,G)}function Lt(t,n,e){return R(t,n,e,it)}function rt(t,n){return I(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>S(n),!0)}function Dt(t){return rt(t," ")}function H(t,n,e){for(let i=e;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===n)return i}return t.length}function Ot(t){const n=H(t,"HTML_TAG_START",0),e=H(t,"HTML_TAG_END",n);if(n===e)return new L;F(t);const i=t.splice(n,e-n+1);w(i[0]),w(i[i.length-1]);const s=i.slice(1,i.length-1);for(const u of s)u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new L(s)}function Pt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Bt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function qt(t,n,e){t.classList[e?"add":"remove"](n)}function ct(t,n,e=!1){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,e,!1,n),i}class ot{constructor(){this.e=this.n=null}c(n){this.h(n)}m(n,e,i=null){this.e||(this.e=G(e.nodeName),this.t=e,this.c(n)),this.i(i)}h(n){this.e.innerHTML=n,this.n=Array.from(this.e.childNodes)}i(n){for(let e=0;e<this.n.length;e+=1)nt(this.t,this.n[e],n)}p(n){this.d(),this.h(n),this.i(this.a)}d(){this.n.forEach(w)}}class L extends ot{constructor(n){super(),this.e=this.n=null,this.l=n}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let e=0;e<this.n.length;e+=1)et(this.t,this.n[e],n)}}let p;function m(t){p=t}function d(){if(!p)throw new Error("Function called outside component initialization");return p}function Gt(t){d().$$.on_mount.push(t)}function zt(t){d().$$.after_update.push(t)}function Ft(t){d().$$.on_destroy.push(t)}function It(){const t=d();return(n,e)=>{const i=t.$$.callbacks[n];if(i){const s=ct(n,e);i.slice().forEach(u=>{u.call(t,s)})}}}function Rt(t,n){d().$$.context.set(t,n)}function Wt(t){return d().$$.context.get(t)}function Jt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const h=[],D=[],b=[],k=[],W=Promise.resolve();let A=!1;function J(){A||(A=!0,W.then(K))}function Kt(){return J(),W}function N(t){b.push(t)}function Qt(t){k.push(t)}const T=new Set;let x=0;function K(){const t=p;do{for(;x<h.length;){const n=h[x];x++,m(n),lt(n.$$)}for(m(null),h.length=0,x=0;D.length;)D.pop()();for(let n=0;n<b.length;n+=1){const e=b[n];T.has(e)||(T.add(e),e())}b.length=0}while(h.length);for(;k.length;)k.pop()();A=!1,T.clear(),m(t)}function lt(t){if(t.fragment!==null){t.update(),g(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const $=new Set;let _;function Ut(){_={r:0,c:[],p:_}}function Vt(){_.r||g(_.c),_=_.p}function ut(t,n){t&&t.i&&($.delete(t),t.i(n))}function Xt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}}const Yt=typeof window!="undefined"?window:typeof globalThis!="undefined"?globalThis:global;function Zt(t,n){const e={},i={},s={$$scope:1};let u=t.length;for(;u--;){const c=t[u],o=n[u];if(o){for(const r in c)r in o||(i[r]=1);for(const r in o)s[r]||(e[r]=o[r],s[r]=1);t[u]=o}else for(const r in c)s[r]=1}for(const c in i)c in e||(e[c]=void 0);return e}function tn(t){return typeof t=="object"&&t!==null?t:{}}function nn(t,n,e){const i=t.$$.props[n];i!==void 0&&(t.$$.bound[i]=e,e(t.$$.ctx[i]))}function en(t){t&&t.c()}function sn(t,n){t&&t.l(n)}function at(t,n,e,i){const{fragment:s,on_mount:u,on_destroy:c,after_update:o}=t.$$;s&&s.m(n,e),i||N(()=>{const r=u.map(O).filter(P);c?c.push(...r):g(r),t.$$.on_mount=[]}),o.forEach(N)}function ft(t,n){const e=t.$$;e.fragment!==null&&(g(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function _t(t,n){t.$$.dirty[0]===-1&&(h.push(t),J(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function rn(t,n,e,i,s,u,c,o=[-1]){const r=p;m(t);const l=t.$$={fragment:null,ctx:null,props:u,update:v,not_equal:s,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(r?r.$$.context:[])),callbacks:M(),dirty:o,skip_bound:!1,root:n.target||r.$$.root};c&&c(l.root);let f=!1;if(l.ctx=e?e(t,n.props||{},(a,y,...j)=>{const C=j.length?j[0]:y;return l.ctx&&s(l.ctx[a],l.ctx[a]=C)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](C),f&&_t(t,a)),y}):[],l.update(),f=!0,g(l.before_update),l.fragment=i?i(l.ctx):!1,n.target){if(n.hydrate){V();const a=st(n.target);l.fragment&&l.fragment.l(a),a.forEach(w)}else l.fragment&&l.fragment.c();n.intro&&ut(t.$$.fragment),at(t,n.target,n.anchor,n.customElement),X(),K()}m(r)}class cn{$destroy(){ft(this,1),this.$destroy=v}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}$set(n){this.$$set&&!U(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{Wt as $,tn as A,ft as B,Q as C,Kt as D,v as E,gt as F,Ct as G,Nt as H,Et as I,xt as J,bt as K,yt as L,P as M,g as N,wt as O,d as P,$t as Q,Yt as R,cn as S,D as T,B as U,ht as V,tt as W,It as X,Ft as Y,nn as Z,Qt as _,st as a,pt as a0,Tt as a1,Jt as a2,St as a3,jt as a4,it as a5,Lt as a6,Mt as a7,L as a8,Ot as a9,mt as aa,qt as ab,vt as ac,z as b,Ht as c,w as d,G as e,Bt as f,et as g,rt as h,rn as i,Pt as j,kt as k,At as l,Dt as m,Ut as n,Xt as o,Vt as p,ut as q,Rt as r,dt as s,S as t,zt as u,Gt as v,en as w,sn as x,at as y,Zt as z};

import{S as t,i as e,s as n,G as s,e as a,c as o,a as c,d as l,b as r,f as i,H as u,v as f,r as h,t as $,k as d,j as m,g as p,n as v,m as g,O as w,o as y,h as x,w as b,a6 as E,l as A,B as C,u as I,X as N,ab as _,z as j,ac as k,C as O,ad as B,ae as D,U as V,af as q}from"./vendor-7cf69992.js";import{C as z}from"./CopyButton-3d8cd8d4.js";function S(t){let e,n;const $=t[1].default,d=s($,t,t[0],null);return{c(){e=a("div"),d&&d.c(),this.h()},l(t){e=o(t,"DIV",{class:!0});var n=c(e);d&&d.l(n),n.forEach(l),this.h()},h(){r(e,"class","svelte-uzctd")},m(t,s){i(t,e,s),d&&d.m(e,null),n=!0},p(t,[e]){d&&d.p&&(!n||1&e)&&u(d,$,t,t[0],n?e:-1,null,null)},i(t){n||(f(d,t),n=!0)},o(t){h(d,t),n=!1},d(t){t&&l(e),d&&d.d(t)}}}function T(t,e,n){let{$$slots:s={},$$scope:a}=e;return t.$$set=t=>{"$$scope"in t&&n(0,a=t.$$scope)},[a,s]}class L extends t{constructor(t){super(),e(this,t,T,S,n,{})}}function M(t){let e,n,s,u,E,A;return E=new z({props:{lang:t[0],source:t[1]}}),{c(){e=a("div"),n=a("code"),s=$(t[2]),u=d(),m(E.$$.fragment),this.h()},l(a){e=o(a,"DIV",{class:!0});var r=c(e);n=o(r,"CODE",{class:!0});var i=c(n);s=p(i,t[2]),i.forEach(l),u=v(r),g(E.$$.fragment,r),r.forEach(l),this.h()},h(){r(n,"class","svelte-ihxb8l"),r(e,"class","svelte-ihxb8l")},m(t,a){i(t,e,a),w(e,n),w(n,s),w(e,u),y(E,e,null),A=!0},p(t,[e]){(!A||4&e)&&x(s,t[2]);const n={};1&e&&(n.lang=t[0]),2&e&&(n.source=t[1]),E.$set(n)},i(t){A||(f(E.$$.fragment,t),A=!0)},o(t){h(E.$$.fragment,t),A=!1},d(t){t&&l(e),b(E)}}}function P(t,e,n){let{lang:s}=e,{source:a}=e,{fileName:o}=e;if(!s){const t=o.match(/\.(\w+$)/)[1];"ts"!==t&&"svelte"!==t||(s=t)}return t.$$set=t=>{"lang"in t&&n(0,s=t.lang),"source"in t&&n(1,a=t.source),"fileName"in t&&n(2,o=t.fileName)},[s,a,o]}class U extends t{constructor(t){super(),e(this,t,P,M,n,{lang:0,source:1,fileName:2})}}function F(t,e,n){const s=t.slice();return s[7]=e[n][0],s[8]=e[n][1],s}function G(t){let e;return{c(){e=$("Contents")},l(t){e=p(t,"Contents")},m(t,n){i(t,e,n)},d(t){t&&l(e)}}}function H(t){let e,n,s=[...t[0]],a=[];for(let c=0;c<s.length;c+=1)a[c]=X(F(t,s,c));const o=t=>h(a[t],1,1,(()=>{a[t]=null}));return{c(){for(let t=0;t<a.length;t+=1)a[t].c();e=A()},l(t){for(let e=0;e<a.length;e+=1)a[e].l(t);e=A()},m(t,s){for(let e=0;e<a.length;e+=1)a[e].m(t,s);i(t,e,s),n=!0},p(t,n){if(3&n){let c;for(s=[...t[0]],c=0;c<s.length;c+=1){const o=F(t,s,c);a[c]?(a[c].p(o,n),f(a[c],1)):(a[c]=X(o),a[c].c(),f(a[c],1),a[c].m(e.parentNode,e))}for(C(),c=s.length;c<a.length;c+=1)o(c);I()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)f(a[t]);n=!0}},o(t){a=a.filter(Boolean);for(let e=0;e<a.length;e+=1)h(a[e]);n=!1},d(t){N(a,t),t&&l(e)}}}function R(t){let e,n,s=t[8]+"";return{c(){e=$(s),n=d()},l(t){e=p(t,s),n=v(t)},m(t,s){i(t,e,s),i(t,n,s)},p(t,n){1&n&&s!==(s=t[8]+"")&&x(e,s)},d(t){t&&l(e),t&&l(n)}}}function X(t){let e,n;return e=new nt({props:{hash:t[7],$$slots:{default:[R]},$$scope:{ctx:t}}}),e.$on("click",(function(){return t[3](t[7])})),{c(){m(e.$$.fragment)},l(t){g(e.$$.fragment,t)},m(t,s){y(e,t,s),n=!0},p(n,s){t=n;const a={};1&s&&(a.hash=t[7]),2049&s&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){n||(f(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function J(t){let e,n,s,u,$,p;s=new E({props:{id:"page-contents-nav__heading",variant:"overline",$$slots:{default:[G]},$$scope:{ctx:t}}});let x=t[0]&&H(t);return{c(){e=a("div"),n=a("nav"),m(s.$$.fragment),u=d(),$=a("ul"),x&&x.c(),this.h()},l(t){e=o(t,"DIV",{class:!0,"aria-labelledby":!0});var a=c(e);n=o(a,"NAV",{class:!0});var r=c(n);g(s.$$.fragment,r),u=v(r),$=o(r,"UL",{class:!0});var i=c($);x&&x.l(i),i.forEach(l),r.forEach(l),a.forEach(l),this.h()},h(){r($,"class","svelte-1o21c7h"),r(n,"class","svelte-1o21c7h"),r(e,"class","page-contents-nav"),r(e,"aria-labelledby","page-contents-nav__heading")},m(t,a){i(t,e,a),w(e,n),y(s,n,null),w(n,u),w(n,$),x&&x.m($,null),p=!0},p(t,[e]){const n={};2048&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n),t[0]?x?(x.p(t,e),1&e&&f(x,1)):(x=H(t),x.c(),f(x,1),x.m($,null)):x&&(C(),h(x,1,1,(()=>{x=null})),I())},i(t){p||(f(s.$$.fragment,t),f(x),p=!0)},o(t){h(s.$$.fragment,t),h(x),p=!1},d(t){t&&l(e),b(s),x&&x.d()}}}const[K,Q]=k();function W(t){return Array.isArray(t)?t[0]:t}function Y(t,e,n){var s=this&&this.__awaiter||function(t,e,n,s){return new(n||(n=Promise))((function(a,o){function c(t){try{r(s.next(t))}catch(e){o(e)}}function l(t){try{r(s.throw(t))}catch(e){o(e)}}function r(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,l)}r((s=s.apply(t,e||[])).next())}))};const a=K(function(){const t=O(void 0);let e,n=null,s=!1;function a(e){n=e,s||t.set(n)}return Object.assign(Object.assign({},t),{set:a,update(e){a(e(_(t)))},force(t){s=!1,clearTimeout(e),a(t),s=!0,e=setTimeout((()=>{s=!1}),500)}})}());let o,{items:c}=e;function l(t){return W([...o.keys()].find((e=>e===t)))}function r(t){a.force(t)}j((()=>s(void 0,void 0,void 0,(function*(){const t=new Set;n(0,o=new Map(c.map((t=>{const e=W(t);let n=function(t){return Array.isArray(t)?t[1]:null}(t);return n||(n=document.getElementById(e).textContent),[e,n]}))));const e=new IntersectionObserver((e=>{e.forEach((e=>{const n=l(e.target.id);e.isIntersecting?t.add(n):e.boundingClientRect.y>0&&t.delete(n),a.set([...t][t.size-1])}))}),{root:null,rootMargin:"0% 0% -10% 0%",threshold:1});[...o.keys()].forEach((t=>{e.observe(window.document.querySelector(`#${t}`))})),setTimeout((()=>s(void 0,void 0,void 0,(function*(){window.location.hash&&a.set(l(window.location.hash.replace("#","")))}))))}))));return t.$$set=t=>{"items"in t&&n(2,c=t.items)},[o,r,c,t=>r(t)]}class Z extends t{constructor(t){super(),e(this,t,Y,J,n,{items:2})}}function tt(t){let e,n,$,d,m;const p=t[6].default,v=s(p,t,t[5],null);return{c(){e=a("li"),n=a("a"),v&&v.c(),this.h()},l(t){e=o(t,"LI",{class:!0});var s=c(e);n=o(s,"A",{href:!0,class:!0});var a=c(n);v&&v.l(a),a.forEach(l),s.forEach(l),this.h()},h(){r(n,"href",t[1]),r(n,"class","svelte-tl9mqh"),r(e,"class","svelte-tl9mqh"),B(e,"isActive",t[0])},m(s,a){i(s,e,a),w(e,n),v&&v.m(n,null),$=!0,d||(m=D(n,"click",t[7]),d=!0)},p(t,[n]){v&&v.p&&(!$||32&n)&&u(v,p,t,t[5],$?n:-1,null,null),1&n&&B(e,"isActive",t[0])},i(t){$||(f(v,t),$=!0)},o(t){h(v,t),$=!1},d(t){t&&l(e),v&&v.d(t),d=!1,m()}}}function et(t,e,n){let s,a,{$$slots:o={},$$scope:c}=e,{hash:l}=e;const r=l?`#${l}`:void 0,i=Q();return V(t,i,(t=>n(4,a=t))),t.$$set=t=>{"hash"in t&&n(3,l=t.hash),"$$scope"in t&&n(5,c=t.$$scope)},t.$$.update=()=>{24&t.$$.dirty&&n(0,s=l===a)},[s,r,i,l,a,c,o,function(e){q.call(this,t,e)}]}class nt extends t{constructor(t){super(),e(this,t,et,tt,n,{hash:3})}}export{L as E,U as F,Z as P};

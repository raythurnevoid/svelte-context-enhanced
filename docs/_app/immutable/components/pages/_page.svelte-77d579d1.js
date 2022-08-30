import{S as j,i as z,V as D,v as u,w as c,x as _,f as g,t as w,y as b,a as v,k as F,q as T,c as x,l as H,m as J,r as h,h as o,b as f,W as q}from"../../chunks/index-e0b68c65.js";import{M as K,P as L,a as N,S as V,C as W,F as O}from"../../chunks/CopyButton-c60f131f.js";import"../../chunks/ModulePage.svelte_svelte_type_style_lang-c2b3f2b3.js";import{b as Q}from"../../chunks/paths-6cd3a76e.js";function X(a){let t;return{c(){t=T("Svelte Typed Context")},l(n){t=h(n,"Svelte Typed Context")},m(n,s){f(n,t,s)},d(n){n&&o(t)}}}function Y(a){let t;return{c(){t=T("How to use")},l(n){t=h(n,"How to use")},m(n,s){f(n,t,s)},d(n){n&&o(t)}}}function Z(a){let t;return{c(){t=T("Installation")},l(n){t=h(n,"Installation")},m(n,s){f(n,t,s)},d(n){n&&o(t)}}}function ee(a){let t,n,s,r,l,A,E,C,m,P,i,y,p,B,d,I,S,U;return t=new N({props:{$$slots:{default:[X]},$$scope:{ctx:a}}}),m=new V({props:{$$slots:{default:[Y]},$$scope:{ctx:a}}}),i=new W({props:{lang:"ts",source:a[0].howToUseSource}}),p=new V({props:{$$slots:{default:[Z]},$$scope:{ctx:a}}}),d=new W({props:{lang:"shell",source:"npm i @raythurnevoid/svelte-context-enhanced"}}),S=new O({props:{next:{label:"BASIC USAGE",href:`${Q}/basic`}}}),{c(){u(t.$$.fragment),n=v(),s=F("p"),r=T(`The problem with Svelte's out of the box context system is the missing of\r
			typings support for values. `),l=F("br"),A=F("br"),E=T(` This library wants to address this\r
			feature.`),C=v(),u(m.$$.fragment),P=v(),u(i.$$.fragment),y=v(),u(p.$$.fragment),B=v(),u(d.$$.fragment),I=v(),u(S.$$.fragment)},l(e){c(t.$$.fragment,e),n=x(e),s=H(e,"P",{});var $=J(s);r=h($,`The problem with Svelte's out of the box context system is the missing of\r
			typings support for values. `),l=H($,"BR",{}),A=H($,"BR",{}),E=h($,` This library wants to address this\r
			feature.`),$.forEach(o),C=x(e),c(m.$$.fragment,e),P=x(e),c(i.$$.fragment,e),y=x(e),c(p.$$.fragment,e),B=x(e),c(d.$$.fragment,e),I=x(e),c(S.$$.fragment,e)},m(e,$){_(t,e,$),f(e,n,$),f(e,s,$),q(s,r),q(s,l),q(s,A),q(s,E),f(e,C,$),_(m,e,$),f(e,P,$),_(i,e,$),f(e,y,$),_(p,e,$),f(e,B,$),_(d,e,$),f(e,I,$),_(S,e,$),U=!0},p(e,$){const M={};$&2&&(M.$$scope={dirty:$,ctx:e}),t.$set(M);const R={};$&2&&(R.$$scope={dirty:$,ctx:e}),m.$set(R);const k={};$&1&&(k.source=e[0].howToUseSource),i.$set(k);const G={};$&2&&(G.$$scope={dirty:$,ctx:e}),p.$set(G)},i(e){U||(g(t.$$.fragment,e),g(m.$$.fragment,e),g(i.$$.fragment,e),g(p.$$.fragment,e),g(d.$$.fragment,e),g(S.$$.fragment,e),U=!0)},o(e){w(t.$$.fragment,e),w(m.$$.fragment,e),w(i.$$.fragment,e),w(p.$$.fragment,e),w(d.$$.fragment,e),w(S.$$.fragment,e),U=!1},d(e){b(t,e),e&&o(n),e&&o(s),e&&o(C),b(m,e),e&&o(P),b(i,e),e&&o(y),b(p,e),e&&o(B),b(d,e),e&&o(I),b(S,e)}}}function te(a){let t,n;return t=new L({props:{$$slots:{default:[ee]},$$scope:{ctx:a}}}),{c(){u(t.$$.fragment)},l(s){c(t.$$.fragment,s)},m(s,r){_(t,s,r),n=!0},p(s,r){const l={};r&3&&(l.$$scope={dirty:r,ctx:s}),t.$set(l)},i(s){n||(g(t.$$.fragment,s),n=!0)},o(s){w(t.$$.fragment,s),n=!1},d(s){b(t,s)}}}function se(a){let t,n;return t=new K({props:{$$slots:{default:[te]},$$scope:{ctx:a}}}),{c(){u(t.$$.fragment)},l(s){c(t.$$.fragment,s)},m(s,r){_(t,s,r),n=!0},p(s,[r]){const l={};r&3&&(l.$$scope={dirty:r,ctx:s}),t.$set(l)},i(s){n||(g(t.$$.fragment,s),n=!0)},o(s){w(t.$$.fragment,s),n=!1},d(s){b(t,s)}}}function ne(a,t,n){let{data:s}=t;return a.$$set=r=>{"data"in r&&n(0,s=r.data)},[s]}class fe extends j{constructor(t){super(),z(this,t,ne,se,D,{data:0})}}export{fe as default};

import{S as be,i as we,s as ye,t as _,k as b,e as v,h as C,m as w,c as d,a as R,d as a,g as i,W as S,H as Ae,j as ge,E as Ee,a1 as fe,ac as De,w as P,x as B,y as A,q as D,o as T,B as k,V as Te}from"../../chunks/index-565a60eb.js";import{g as ae,M as ke,P as We,a as Ie,S as ve,C as Oe,F as Re}from"../../chunks/CopyButton-06291b5b.js";import{s as Pe,g as Be,P as Ne,F as Se,E as Ve}from"../../chunks/PageContentsNavItem-b903a6d1.js";import"../../chunks/ModulePage.svelte_svelte_type_style_lang-b472ed71.js";import{b as de}from"../../chunks/paths-396f020f.js";import{r as Fe,w as Ue}from"../../chunks/index-7978aa5e.js";import"../../chunks/preload-helper-413b0d67.js";function qe(){const l={};function t(n,f){const s=Ue(n,f);return Pe(l,s),s}function r(){return Be(l)}return[t,r]}function Ge(){const l={},t=new Proxy(Fe,{apply(n,f,s){const m=n(...s);return Pe(l,m),m}});function r(){return Be(l)}return[t,r]}const[Me,je]=qe(),[He,Le]=Ge();function ze(l){let t,r,n,f,s,m,c,x;return{c(){t=_(l[0]),r=b(),n=v("br"),f=b(),s=v("button"),m=_("add")},l($){t=C($,l[0]),r=w($),n=d($,"BR",{}),f=w($),s=d($,"BUTTON",{});var g=R(s);m=C(g,"add"),g.forEach(a)},m($,g){i($,t,g),i($,r,g),i($,n,g),i($,f,g),i($,s,g),S(s,m),c||(x=Ae(s,"click",l[4]),c=!0)},p($,[g]){g&1&&ge(t,$[0])},i:Ee,o:Ee,d($){$&&a(t),$&&a(r),$&&a(n),$&&a(f),$&&a(s),c=!1,x()}}}function Je(l,t,r){let n,f;const s=je();fe(l,s,x=>r(1,f=x));const m=Le();return fe(l,m,x=>r(0,n=x)),[n,f,s,m,()=>De(s,f++,f)]}class Ke extends be{constructor(t){super(),we(this,t,Je,ze,ye,{})}}function Qe(l){let t,r,n,f,s,m,c,x,$,g,N,W,O,E;return O=new Ke({}),{c(){t=_(l[0]),r=b(),n=v("br"),f=b(),s=_(l[1]),m=b(),c=v("br"),x=b(),$=v("br"),g=_(`\r
Child:\r
`),N=v("br"),W=b(),P(O.$$.fragment)},l(o){t=C(o,l[0]),r=w(o),n=d(o,"BR",{}),f=w(o),s=C(o,l[1]),m=w(o),c=d(o,"BR",{}),x=w(o),$=d(o,"BR",{}),g=C(o,`\r
Child:\r
`),N=d(o,"BR",{}),W=w(o),B(O.$$.fragment,o)},m(o,p){i(o,t,p),i(o,r,p),i(o,n,p),i(o,f,p),i(o,s,p),i(o,m,p),i(o,c,p),i(o,x,p),i(o,$,p),i(o,g,p),i(o,N,p),i(o,W,p),A(O,o,p),E=!0},p(o,[p]){(!E||p&1)&&ge(t,o[0]),(!E||p&2)&&ge(s,o[1])},i(o){E||(D(O.$$.fragment,o),E=!0)},o(o){T(O.$$.fragment,o),E=!1},d(o){o&&a(t),o&&a(r),o&&a(n),o&&a(f),o&&a(s),o&&a(m),o&&a(c),o&&a(x),o&&a($),o&&a(g),o&&a(N),o&&a(W),k(O,o)}}}function Xe(l,t,r){let n,f;const s=()=>typeof window!="undefined"&&new Date().toLocaleTimeString(navigator.language,{timeStyle:"medium"}),m=He(s(),x=>{const $=setInterval(()=>x(s()),1e3);return()=>clearInterval($)});fe(l,m,x=>r(0,n=x));const c=Me(0);return fe(l,c,x=>r(1,f=x)),[n,f,m,c]}class Ye extends be{constructor(t){super(),we(this,t,Xe,Qe,ye,{})}}function Ze(l){let t;return{c(){t=_("Context Store")},l(r){t=C(r,"Context Store")},m(r,n){i(r,t,n)},d(r){r&&a(t)}}}function he(l){let t;return{c(){t=_("Result")},l(r){t=C(r,"Result")},m(r,n){i(r,t,n)},d(r){r&&a(t)}}}function et(l){let t,r;return t=new Ye({}),{c(){P(t.$$.fragment)},l(n){B(t.$$.fragment,n)},m(n,f){A(t,n,f),r=!0},i(n){r||(D(t.$$.fragment,n),r=!0)},o(n){T(t.$$.fragment,n),r=!1},d(n){k(t,n)}}}function tt(l){let t;return{c(){t=_("API")},l(r){t=C(r,"API")},m(r,n){i(r,t,n)},d(r){r&&a(t)}}}function nt(l){let t,r,n,f,s,m,c,x,$,g,N,W,O,E,o,p,ee,V,te,F,ne,U,re,y,ue,j,ie,me,H,$e,ce,L,pe,xe,z,_e,Ce,se,M,q,oe,G,le;return t=new Ie({props:{id:"usage",$$slots:{default:[Ze]},$$scope:{ctx:l}}}),W=new Se({props:{fileName:"BasicExample.svelte",source:l[0]}}),E=new Se({props:{fileName:"BasicExampleChild.svelte",source:l[1]}}),p=new Se({props:{fileName:"BasicExampleContext.ts",source:l[2]}}),V=new ve({props:{id:"result",$$slots:{default:[he]},$$scope:{ctx:l}}}),F=new Ve({props:{$$slots:{default:[et]},$$scope:{ctx:l}}}),U=new ve({props:{id:"api",$$slots:{default:[tt]},$$scope:{ctx:l}}}),q=new Oe({props:{lang:"ts",source:l[3]}}),G=new Re({props:{prev:{label:"BASIC USAGE",href:`${de}/basic`},next:{label:"ADVANCED USAGE",href:`${de}/advanced`}}}),{c(){P(t.$$.fragment),r=b(),n=v("p"),f=_("With "),s=v("code"),m=_("createContextStore"),c=_(` and\r
			`),x=v("code"),$=_("createContextWritableStore"),g=_(` you can can take advantage of typings\r
			when using Svelte's store as context value.`),N=b(),P(W.$$.fragment),O=b(),P(E.$$.fragment),o=b(),P(p.$$.fragment),ee=b(),P(V.$$.fragment),te=b(),P(F.$$.fragment),ne=b(),P(U.$$.fragment),re=b(),y=v("p"),ue=_("Both "),j=v("code"),ie=_("createContextStore"),me=_(` and\r
			`),H=v("code"),$e=_("createContextWritableStore"),ce=_(` are proxies to Svelte's\r
			`),L=v("code"),pe=_("readable"),xe=_(`\r
			and `),z=v("code"),_e=_("writable"),Ce=_(" stores, because of that they share the same API."),se=b(),M=v("p"),P(q.$$.fragment),oe=b(),P(G.$$.fragment)},l(e){B(t.$$.fragment,e),r=w(e),n=d(e,"P",{});var u=R(n);f=C(u,"With "),s=d(u,"CODE",{});var J=R(s);m=C(J,"createContextStore"),J.forEach(a),c=C(u,` and\r
			`),x=d(u,"CODE",{});var K=R(x);$=C(K,"createContextWritableStore"),K.forEach(a),g=C(u,` you can can take advantage of typings\r
			when using Svelte's store as context value.`),u.forEach(a),N=w(e),B(W.$$.fragment,e),O=w(e),B(E.$$.fragment,e),o=w(e),B(p.$$.fragment,e),ee=w(e),B(V.$$.fragment,e),te=w(e),B(F.$$.fragment,e),ne=w(e),B(U.$$.fragment,e),re=w(e),y=d(e,"P",{});var I=R(y);ue=C(I,"Both "),j=d(I,"CODE",{});var Q=R(j);ie=C(Q,"createContextStore"),Q.forEach(a),me=C(I,` and\r
			`),H=d(I,"CODE",{});var X=R(H);$e=C(X,"createContextWritableStore"),X.forEach(a),ce=C(I,` are proxies to Svelte's\r
			`),L=d(I,"CODE",{});var Y=R(L);pe=C(Y,"readable"),Y.forEach(a),xe=C(I,`\r
			and `),z=d(I,"CODE",{});var Z=R(z);_e=C(Z,"writable"),Z.forEach(a),Ce=C(I," stores, because of that they share the same API."),I.forEach(a),se=w(e),M=d(e,"P",{});var h=R(M);B(q.$$.fragment,h),h.forEach(a),oe=w(e),B(G.$$.fragment,e)},m(e,u){A(t,e,u),i(e,r,u),i(e,n,u),S(n,f),S(n,s),S(s,m),S(n,c),S(n,x),S(x,$),S(n,g),i(e,N,u),A(W,e,u),i(e,O,u),A(E,e,u),i(e,o,u),A(p,e,u),i(e,ee,u),A(V,e,u),i(e,te,u),A(F,e,u),i(e,ne,u),A(U,e,u),i(e,re,u),i(e,y,u),S(y,ue),S(y,j),S(j,ie),S(y,me),S(y,H),S(H,$e),S(y,ce),S(y,L),S(L,pe),S(y,xe),S(y,z),S(z,_e),S(y,Ce),i(e,se,u),i(e,M,u),A(q,M,null),i(e,oe,u),A(G,e,u),le=!0},p(e,u){const J={};u&16&&(J.$$scope={dirty:u,ctx:e}),t.$set(J);const K={};u&1&&(K.source=e[0]),W.$set(K);const I={};u&2&&(I.source=e[1]),E.$set(I);const Q={};u&4&&(Q.source=e[2]),p.$set(Q);const X={};u&16&&(X.$$scope={dirty:u,ctx:e}),V.$set(X);const Y={};u&16&&(Y.$$scope={dirty:u,ctx:e}),F.$set(Y);const Z={};u&16&&(Z.$$scope={dirty:u,ctx:e}),U.$set(Z);const h={};u&8&&(h.source=e[3]),q.$set(h)},i(e){le||(D(t.$$.fragment,e),D(W.$$.fragment,e),D(E.$$.fragment,e),D(p.$$.fragment,e),D(V.$$.fragment,e),D(F.$$.fragment,e),D(U.$$.fragment,e),D(q.$$.fragment,e),D(G.$$.fragment,e),le=!0)},o(e){T(t.$$.fragment,e),T(W.$$.fragment,e),T(E.$$.fragment,e),T(p.$$.fragment,e),T(V.$$.fragment,e),T(F.$$.fragment,e),T(U.$$.fragment,e),T(q.$$.fragment,e),T(G.$$.fragment,e),le=!1},d(e){k(t,e),e&&a(r),e&&a(n),e&&a(N),k(W,e),e&&a(O),k(E,e),e&&a(o),k(p,e),e&&a(ee),k(V,e),e&&a(te),k(F,e),e&&a(ne),k(U,e),e&&a(re),e&&a(y),e&&a(se),e&&a(M),k(q),e&&a(oe),k(G,e)}}}function rt(l){let t,r,n,f;return t=new We({props:{$$slots:{default:[nt]},$$scope:{ctx:l}}}),n=new Ne({props:{items:[["usage","Usage"],"result","api"]}}),{c(){P(t.$$.fragment),r=b(),P(n.$$.fragment)},l(s){B(t.$$.fragment,s),r=w(s),B(n.$$.fragment,s)},m(s,m){A(t,s,m),i(s,r,m),A(n,s,m),f=!0},p(s,m){const c={};m&31&&(c.$$scope={dirty:m,ctx:s}),t.$set(c)},i(s){f||(D(t.$$.fragment,s),D(n.$$.fragment,s),f=!0)},o(s){T(t.$$.fragment,s),T(n.$$.fragment,s),f=!1},d(s){k(t,s),s&&a(r),k(n,s)}}}function st(l){let t,r;return t=new ke({props:{$$slots:{default:[rt]},$$scope:{ctx:l}}}),{c(){P(t.$$.fragment)},l(n){B(t.$$.fragment,n)},m(n,f){A(t,n,f),r=!0},p(n,[f]){const s={};f&31&&(s.$$scope={dirty:f,ctx:n}),t.$set(s)},i(n){r||(D(t.$$.fragment,n),r=!0)},o(n){T(t.$$.fragment,n),r=!1},d(n){k(t,n)}}}const ct=async function({fetch:l}){async function t(){return await ae(l,"node_modules/@raythurnevoid/svelte-context-enhanced/store.d.ts")}async function r(){return await ae(l,"src/lib/components/examples/store/StoreExample.svelte")}async function n(){return await ae(l,"src/lib/components/examples/store/StoreExampleChild.svelte")}async function f(){return await ae(l,"src/lib/components/examples/store/StoreExampleContext.ts")}return{props:{typingsSource:await t(),exampleSource:await r(),exampleChildSource:await n(),exampleContextSource:await f()}}};function ot(l,t,r){let{exampleSource:n}=t,{exampleChildSource:f}=t,{exampleContextSource:s}=t,{typingsSource:m}=t;return l.$$set=c=>{"exampleSource"in c&&r(0,n=c.exampleSource),"exampleChildSource"in c&&r(1,f=c.exampleChildSource),"exampleContextSource"in c&&r(2,s=c.exampleContextSource),"typingsSource"in c&&r(3,m=c.typingsSource)},[n,f,s,m]}class pt extends be{constructor(t){super(),we(this,t,ot,st,Te,{exampleSource:0,exampleChildSource:1,exampleContextSource:2,typingsSource:3})}}export{pt as default,ct as load};

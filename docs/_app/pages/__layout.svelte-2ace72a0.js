import{S as t,i as e,D as s,T as n,e as $,j as o,c as a,a as c,m as r,d as l,b as f,f as i,o as p,v as m,r as u,w as d,E as g,F as h,G as x,H as v,I as w,k as y,n as b,B as M,u as k,N as B,J as C,t as E,g as I,K as j,L,M as N,O as D,P as K,z as S,Q as T,R as V,U as O,V as P,W as R,l as U,X as _,Y as q,Z as z,_ as A,h as F,s as G,$ as H}from"../chunks/vendor-490f2367.js";/* empty css                                                         */import{p as J}from"../chunks/stores-050d9686.js";import{b as Q}from"../chunks/paths-45dac81d.js";const W=t=>({class:32&t}),X=t=>({slot:"content",class:t[5]});function Y(t){let e,s;return e=new B({props:{$$slots:{default:[tt]},$$scope:{ctx:t}}}),e.$on("click",t[3]),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,n){p(e,t,n),s=!0},p(t,s){const n={};16&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function Z(t){let e;return{c(){e=E("menu")},l(t){e=I(t,"menu")},m(t,s){i(t,e,s)},d(t){t&&l(e)}}}function tt(t){let e,s;return e=new C({props:{$$slots:{default:[Z]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,n){p(e,t,n),s=!0},p(t,s){const n={};16&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function et(t){let e;return{c(){e=E("Svelte Typed Context")},l(t){e=I(t,"Svelte Typed Context")},m(t,s){i(t,e,s)},d(t){t&&l(e)}}}function st(t){let e,s,n,$=t[0]&&Y(t);return s=new w({props:{$$slots:{default:[et]},$$scope:{ctx:t}}}),{c(){$&&$.c(),e=y(),o(s.$$.fragment)},l(t){$&&$.l(t),e=b(t),r(s.$$.fragment,t)},m(t,o){$&&$.m(t,o),i(t,e,o),p(s,t,o),n=!0},p(t,n){t[0]?$?($.p(t,n),1&n&&m($,1)):($=Y(t),$.c(),m($,1),$.m(e.parentNode,e)):$&&(M(),u($,1,1,(()=>{$=null})),k());const o={};16&n&&(o.$$scope={dirty:n,ctx:t}),s.$set(o)},i(t){n||(m($),m(s.$$.fragment,t),n=!0)},o(t){u($),u(s.$$.fragment,t),n=!1},d(t){$&&$.d(t),t&&l(e),d(s,t)}}}function nt(t){let e,s;return e=new h({props:{$$slots:{default:[st]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,n){p(e,t,n),s=!0},p(t,s){const n={};17&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function $t(t){let e;const s=t[2].default,n=x(s,t,t[4],X);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,s){n&&n.m(t,s),e=!0},p(t,$){n&&n.p&&(!e||48&$)&&v(n,s,t,t[4],e?$:-1,W,X)},i(t){e||(m(n,t),e=!0)},o(t){u(n,t),e=!1},d(t){n&&n.d(t)}}}function ot(t){let e,s,g;return s=new n({props:{class:"top-app-bar",$$slots:{content:[$t,({contentClass:t})=>({5:t}),({contentClass:t})=>t?32:0],default:[nt,({contentClass:t})=>({5:t}),({contentClass:t})=>t?32:0]},$$scope:{ctx:t}}}),{c(){e=$("div"),o(s.$$.fragment),this.h()},l(t){e=a(t,"DIV",{class:!0});var n=c(e);r(s.$$.fragment,n),n.forEach(l),this.h()},h(){f(e,"class","svelte-wmpop3")},m(t,n){i(t,e,n),p(s,e,null),g=!0},p(t,[e]){const n={};49&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n)},i(t){g||(m(s.$$.fragment,t),g=!0)},o(t){u(s.$$.fragment,t),g=!1},d(t){t&&l(e),d(s)}}}function at(t,e,s){let{$$slots:n={},$$scope:$}=e;const o=g();let{showMenuBtn:a=!1}=e;return t.$$set=t=>{"showMenuBtn"in t&&s(0,a=t.showMenuBtn),"$$scope"in t&&s(4,$=t.$$scope)},[a,o,n,()=>o("navButtonClick"),$]}class ct extends t{constructor(t){super(),e(this,t,at,ot,s,{showMenuBtn:0})}}function rt(t){let e,s,n;const o=t[2].default,r=x(o,t,t[5],null);return{c(){e=$("div"),r&&r.c(),this.h()},l(t){e=a(t,"DIV",{class:!0});var s=c(e);r&&r.l(s),s.forEach(l),this.h()},h(){f(e,"class",s=t[8])},m(t,s){i(t,e,s),r&&r.m(e,null),n=!0},p(t,$){r&&r.p&&(!n||32&$)&&v(r,o,t,t[5],n?$:-1,null,null),(!n||256&$&&s!==(s=t[8]))&&f(e,"class",s)},i(t){n||(m(r,t),n=!0)},o(t){u(r,t),n=!1},d(t){t&&l(e),r&&r.d(t)}}}function lt(t){let e,s;return e=new ct({props:{showMenuBtn:t[1],$$slots:{default:[rt,({class:t})=>({8:t}),({class:t})=>t?256:0]},$$scope:{ctx:t}}}),e.$on("navButtonClick",t[4]),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,n){p(e,t,n),s=!0},p(t,s){const n={};2&s&&(n.showMenuBtn=t[1]),288&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function ft(t){let e,s,n,f,g,h;function x(e){t[3](e)}let v={dismissible:t[1]};return void 0!==t[0]&&(v.open=t[0]),s=new Mt({props:v}),j.push((()=>L(s,"open",x))),g=new N({props:{$$slots:{default:[lt]},$$scope:{ctx:t}}}),{c(){e=$("div"),o(s.$$.fragment),f=y(),o(g.$$.fragment)},l(t){e=a(t,"DIV",{});var n=c(e);r(s.$$.fragment,n),f=b(n),r(g.$$.fragment,n),n.forEach(l)},m(t,n){i(t,e,n),p(s,e,null),D(e,f),p(g,e,null),h=!0},p(t,[e]){const $={};2&e&&($.dismissible=t[1]),!n&&1&e&&(n=!0,$.open=t[0],K((()=>n=!1))),s.$set($);const o={};35&e&&(o.$$scope={dirty:e,ctx:t}),g.$set(o)},i(t){h||(m(s.$$.fragment,t),m(g.$$.fragment,t),h=!0)},o(t){u(s.$$.fragment,t),u(g.$$.fragment,t),h=!1},d(t){t&&l(e),d(s),d(g)}}}function it(t,e,s){let n,{$$slots:$={},$$scope:o}=e,a=!0,c=!1;function r(){n.matches?s(1,c=!0):s(1,c=!1)}S((()=>{n=window.matchMedia("(max-width: 960px)"),n.addEventListener("change",r),r()})),T((()=>{null==n||n.removeEventListener("change",r)}));return t.$$set=t=>{"$$scope"in t&&s(5,o=t.$$scope)},[a,c,$,function(t){a=t,s(0,a)},()=>s(0,a=!0),o]}class pt extends t{constructor(t){super(),e(this,t,it,ft,s,{})}}function mt(t,e,s){const n=t.slice();return n[5]=e[s],n}function ut(t){let e,s=t[5].label+"";return{c(){e=E(s)},l(t){e=I(t,s)},m(t,s){i(t,e,s)},p(t,n){4&n&&s!==(s=t[5].label+"")&&F(e,s)},d(t){t&&l(e)}}}function dt(t){let e,s;return e=new A({props:{$$slots:{default:[ut]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,n){p(e,t,n),s=!0},p(t,s){const n={};260&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function gt(t){let e,s,n;return e=new z({props:{$$slots:{default:[dt]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment),s=y()},l(t){r(e.$$.fragment,t),s=b(t)},m(t,$){p(e,t,$),i(t,s,$),n=!0},p(t,s){const n={};260&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){u(e.$$.fragment,t),n=!1},d(t){d(e,t),t&&l(s)}}}function ht(t){let e,s;return e=new q({props:{href:t[5].href,activated:t[5].activated,$$slots:{default:[gt]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,n){p(e,t,n),s=!0},p(t,s){const n={};4&s&&(n.href=t[5].href),4&s&&(n.activated=t[5].activated),260&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function xt(t){let e,s,n=t[2],$=[];for(let a=0;a<n.length;a+=1)$[a]=ht(mt(t,n,a));const o=t=>u($[t],1,1,(()=>{$[t]=null}));return{c(){for(let t=0;t<$.length;t+=1)$[t].c();e=U()},l(t){for(let e=0;e<$.length;e+=1)$[e].l(t);e=U()},m(t,n){for(let e=0;e<$.length;e+=1)$[e].m(t,n);i(t,e,n),s=!0},p(t,s){if(4&s){let a;for(n=t[2],a=0;a<n.length;a+=1){const o=mt(t,n,a);$[a]?($[a].p(o,s),m($[a],1)):($[a]=ht(o),$[a].c(),m($[a],1),$[a].m(e.parentNode,e))}for(M(),a=n.length;a<$.length;a+=1)o(a);k()}},i(t){if(!s){for(let t=0;t<n.length;t+=1)m($[t]);s=!0}},o(t){$=$.filter(Boolean);for(let e=0;e<$.length;e+=1)u($[e]);s=!1},d(t){_($,t),t&&l(e)}}}function vt(t){let e,s;return e=new R({props:{$$slots:{default:[xt]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,n){p(e,t,n),s=!0},p(t,s){const n={};260&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function wt(t){let e,s;return e=new P({props:{$$slots:{default:[vt]},$$scope:{ctx:t}}}),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,n){p(e,t,n),s=!0},p(t,s){const n={};260&s&&(n.$$scope={dirty:s,ctx:t}),e.$set(n)},i(t){s||(m(e.$$.fragment,t),s=!0)},o(t){u(e.$$.fragment,t),s=!1},d(t){d(e,t)}}}function yt(t){let e,s,n;function $(e){t[4](e)}let a={class:"svmd-site-drawer",variant:t[1]?"modal":"permanent",$$slots:{default:[wt]},$$scope:{ctx:t}};return void 0!==t[0]&&(a.open=t[0]),e=new V({props:a}),j.push((()=>L(e,"open",$))),{c(){o(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,s){p(e,t,s),n=!0},p(t,[n]){const $={};2&n&&($.variant=t[1]?"modal":"permanent"),260&n&&($.$$scope={dirty:n,ctx:t}),!s&&1&n&&(s=!0,$.open=t[0],K((()=>s=!1))),e.$set($)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){u(e.$$.fragment,t),n=!1},d(t){d(e,t)}}}function bt(t,e,s){let n,$;O(t,J,(t=>s(3,$=t)));let{open:o=!1}=e,{dismissible:a=!1}=e;return t.$$set=t=>{"open"in t&&s(0,o=t.open),"dismissible"in t&&s(1,a=t.dismissible)},t.$$.update=()=>{8&t.$$.dirty&&s(2,n=[{href:`${Q}/`,label:"Main Page"},{href:`${Q}/basic`,label:"Basic Usage"},{href:`${Q}/store`,label:"Context Store"},{href:`${Q}/advanced`,label:"Advanced Usage"}].map((t=>Object.assign(Object.assign({},t),{activated:Q+$.path===t.href}))))},[o,a,n,$,function(t){o=t,s(0,o)}]}class Mt extends t{constructor(t){super(),e(this,t,bt,yt,s,{open:0,dismissible:1})}}function kt(t){let e;const s=t[0].default,n=x(s,t,t[1],null);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,s){n&&n.m(t,s),e=!0},p(t,$){n&&n.p&&(!e||2&$)&&v(n,s,t,t[1],e?$:-1,null,null)},i(t){e||(m(n,t),e=!0)},o(t){u(n,t),e=!1},d(t){n&&n.d(t)}}}function Bt(t){let e,s,n,c,g,h;return g=new pt({props:{$$slots:{default:[kt]},$$scope:{ctx:t}}}),{c(){e=$("link"),s=$("link"),n=$("link"),c=y(),o(g.$$.fragment),this.h()},l(t){const $=H('[data-svelte="svelte-lptq74"]',document.head);e=a($,"LINK",{rel:!0,href:!0}),s=a($,"LINK",{rel:!0,href:!0}),n=a($,"LINK",{rel:!0,href:!0}),$.forEach(l),c=b(t),r(g.$$.fragment,t),this.h()},h(){f(e,"rel","stylesheet"),f(e,"href","https://fonts.googleapis.com/icon?family=Material+Icons"),f(s,"rel","stylesheet"),f(s,"href","https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"),f(n,"rel","stylesheet"),f(n,"href","https://fonts.googleapis.com/css?family=Roboto+Mono")},m(t,$){D(document.head,e),D(document.head,s),D(document.head,n),i(t,c,$),p(g,t,$),h=!0},p(t,[e]){const s={};2&e&&(s.$$scope={dirty:e,ctx:t}),g.$set(s)},i(t){h||(m(g.$$.fragment,t),h=!0)},o(t){u(g.$$.fragment,t),h=!1},d(t){l(e),l(s),l(n),t&&l(c),d(g,t)}}}function Ct(t,e,s){let{$$slots:n={},$$scope:$}=e;return S((()=>{setTimeout((()=>{window.document.firstElementChild.classList.add("smooth-scroll")}))})),t.$$set=t=>{"$$scope"in t&&s(1,$=t.$$scope)},[n,$]}export default class extends t{constructor(t){super(),e(this,t,Ct,Bt,G,{})}}

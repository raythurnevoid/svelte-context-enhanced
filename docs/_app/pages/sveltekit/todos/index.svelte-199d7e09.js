import{S as t,i as e,s as a,e as o,k as n,c as s,a as l,n as d,d as r,b as i,aa as c,f as u,O as h,af as f,ag as m,ah as v,ai as p,aj as x,ak as g,al as y,ad as b,t as k,$ as j,g as w,am as E,u as T,v as q,r as O,an as _,ao as M,B as N,ap as U,a1 as B}from"../../../chunks/vendor-4b28337c.js";function D(t,{pending:e,error:a,result:o}){let n;async function s(s){const l=n={};s.preventDefault();const d=new FormData(t);e&&e(d,t);try{const e=await fetch(t.action,{method:t.method,headers:{accept:"application/json"},body:d});if(l!==n)return;e.ok?o(e,t):a?a(e,null,t):console.error(await e.text())}catch(r){if(!a)throw r;a(null,r,t)}}return t.addEventListener("submit",s),{destroy(){t.removeEventListener("submit",s)}}}function F(t,e,a){const o=t.slice();return o[6]=e[a],o[7]=e,o[8]=a,o}function I(t,e){let a,k,j,w,E,T,q,O,N,U,F,I,P,R,$,L,S,V,A,C,H,z,G,J,K,Q,W,X=B;function Y(...t){return e[3](e[6],e[7],e[8],...t)}function Z(){return e[4](e[6])}return{key:t,first:null,c(){a=o("div"),k=o("form"),j=o("input"),E=n(),T=o("button"),U=n(),F=o("form"),I=o("input"),R=n(),$=o("button"),S=n(),V=o("form"),A=o("button"),z=n(),this.h()},l(t){a=s(t,"DIV",{class:!0});var e=l(a);k=s(e,"FORM",{action:!0,method:!0});var o=l(k);j=s(o,"INPUT",{type:!0,name:!0,class:!0}),E=d(o),T=s(o,"BUTTON",{class:!0,"aria-label":!0}),l(T).forEach(r),o.forEach(r),U=d(e),F=s(e,"FORM",{class:!0,action:!0,method:!0});var n=l(F);I=s(n,"INPUT",{"aria-label":!0,type:!0,name:!0,class:!0}),R=d(n),$=s(n,"BUTTON",{class:!0,"aria-label":!0}),l($).forEach(r),n.forEach(r),S=d(e),V=s(e,"FORM",{action:!0,method:!0});var i=l(V);A=s(i,"BUTTON",{class:!0,"aria-label":!0}),l(A).forEach(r),i.forEach(r),z=d(e),e.forEach(r),this.h()},h(){i(j,"type","hidden"),i(j,"name","done"),j.value=w=e[6].done?"":"true",i(j,"class","svelte-dmxqmd"),i(T,"class","toggle svelte-dmxqmd"),i(T,"aria-label",q="Mark todo as "+(e[6].done?"not done":"done")),i(k,"action",O="/sveltekit/todos/"+e[6].uid+".json?_method=patch"),i(k,"method","post"),i(I,"aria-label","Edit todo"),i(I,"type","text"),i(I,"name","text"),I.value=P=e[6].text,i(I,"class","svelte-dmxqmd"),i($,"class","save svelte-dmxqmd"),i($,"aria-label","Save todo"),i(F,"class","text svelte-dmxqmd"),i(F,"action",L="/sveltekit/todos/"+e[6].uid+".json?_method=patch"),i(F,"method","post"),i(A,"class","delete svelte-dmxqmd"),i(A,"aria-label","Delete todo"),i(V,"action",C="/sveltekit/todos/"+e[6].uid+".json?_method=delete"),i(V,"method","post"),i(a,"class","todo svelte-dmxqmd"),c(a,"done",e[6].done),this.first=a},m(t,o){u(t,a,o),h(a,k),h(k,j),h(k,E),h(k,T),h(a,U),h(a,F),h(F,I),h(F,R),h(F,$),h(a,S),h(a,V),h(V,A),h(a,z),K=!0,Q||(W=[f(N=D.call(null,k,{pending:Y,result:e[1]})),f(D.call(null,F,{result:e[1]})),f(H=D.call(null,V,{result:Z}))],Q=!0)},p(t,o){e=t,(!K||1&o&&w!==(w=e[6].done?"":"true"))&&(j.value=w),(!K||1&o&&q!==(q="Mark todo as "+(e[6].done?"not done":"done")))&&i(T,"aria-label",q),(!K||1&o&&O!==(O="/sveltekit/todos/"+e[6].uid+".json?_method=patch"))&&i(k,"action",O),N&&m(N.update)&&1&o&&N.update.call(null,{pending:Y,result:e[1]}),(!K||1&o&&P!==(P=e[6].text)&&I.value!==P)&&(I.value=P),(!K||1&o&&L!==(L="/sveltekit/todos/"+e[6].uid+".json?_method=patch"))&&i(F,"action",L),(!K||1&o&&C!==(C="/sveltekit/todos/"+e[6].uid+".json?_method=delete"))&&i(V,"action",C),H&&m(H.update)&&1&o&&H.update.call(null,{result:Z}),1&o&&c(a,"done",e[6].done)},r(){J=a.getBoundingClientRect()},f(){v(a),X(),p(a,J)},a(){X(),X=x(a,J,_,{duration:200})},i(t){K||(t&&g((()=>{G||(G=y(a,M,{start:.7},!0)),G.run(1)})),K=!0)},o(t){t&&(G||(G=y(a,M,{start:.7},!1)),G.run(0)),K=!1},d(t){t&&r(a),t&&G&&G.end(),Q=!1,b(W)}}}function P(t){let e,a,c,v,p,x,g,y,b,_,M,B,P=[],R=new Map,$=t[0];const L=t=>t[6].uid;for(let o=0;o<$.length;o+=1){let e=F(t,$,o),a=L(e);R.set(a,P[o]=I(a,e))}return{c(){e=n(),a=o("div"),c=o("h1"),v=k("Todos"),p=n(),x=o("form"),g=o("input"),b=n();for(let t=0;t<P.length;t+=1)P[t].c();this.h()},l(t){j('[data-svelte="svelte-181o7gf"]',document.head).forEach(r),e=d(t),a=s(t,"DIV",{class:!0});var o=l(a);c=s(o,"H1",{});var n=l(c);v=w(n,"Todos"),n.forEach(r),p=d(o),x=s(o,"FORM",{class:!0,action:!0,method:!0});var i=l(x);g=s(i,"INPUT",{name:!0,"aria-label":!0,placeholder:!0,class:!0}),i.forEach(r),b=d(o);for(let e=0;e<P.length;e+=1)P[e].l(o);o.forEach(r),this.h()},h(){document.title="Todos",i(g,"name","text"),i(g,"aria-label","Add todo"),i(g,"placeholder","+ tap to add a todo"),i(g,"class","svelte-dmxqmd"),i(x,"class","new svelte-dmxqmd"),i(x,"action","/sveltekit/todos.json"),i(x,"method","post"),i(a,"class","todos svelte-dmxqmd")},m(o,n){u(o,e,n),u(o,a,n),h(a,c),h(c,v),h(a,p),h(a,x),h(x,g),h(a,b);for(let t=0;t<P.length;t+=1)P[t].m(a,null);_=!0,M||(B=f(y=D.call(null,x,{result:t[2]})),M=!0)},p(t,[e]){if(y&&m(y.update)&&1&e&&y.update.call(null,{result:t[2]}),3&e){$=t[0],N();for(let t=0;t<P.length;t+=1)P[t].r();P=E(P,e,L,1,t,$,R,a,U,I,null,F);for(let t=0;t<P.length;t+=1)P[t].a();T()}},i(t){if(!_){for(let t=0;t<$.length;t+=1)q(P[t]);_=!0}},o(t){for(let e=0;e<P.length;e+=1)O(P[e]);_=!1},d(t){t&&r(e),t&&r(a);for(let e=0;e<P.length;e+=1)P[e].d();M=!1,B()}}}var R=function(t,e,a,o){return new(a||(a=Promise))((function(n,s){function l(t){try{r(o.next(t))}catch(e){s(e)}}function d(t){try{r(o.throw(t))}catch(e){s(e)}}function r(t){var e;t.done?n(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(l,d)}r((o=o.apply(t,e||[])).next())}))};const $=({fetch:t})=>R(void 0,void 0,void 0,(function*(){const e=yield t("/sveltekit/todos.json");if(e.ok){return{props:{todos:yield e.json()}}}const{message:a}=yield e.json();return{error:new Error(a)}}));function L(t,e,a){var o=this&&this.__awaiter||function(t,e,a,o){return new(a||(a=Promise))((function(n,s){function l(t){try{r(o.next(t))}catch(e){s(e)}}function d(t){try{r(o.throw(t))}catch(e){s(e)}}function r(t){var e;t.done?n(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(l,d)}r((o=o.apply(t,e||[])).next())}))};let{todos:n}=e;return t.$$set=t=>{"todos"in t&&a(0,n=t.todos)},[n,function(t){return o(this,void 0,void 0,(function*(){const e=yield t.json();a(0,n=n.map((t=>t.uid===e.uid?e:t)))}))},async(t,e)=>{const o=await t.json();a(0,n=[...n,o]),e.reset()},(t,e,o,s)=>{a(0,e[o].done=!!s.get("done"),n)},t=>{a(0,n=n.filter((e=>e.uid!==t.uid)))}]}export default class extends t{constructor(t){super(),e(this,t,L,P,a,{todos:0})}}export{$ as load};
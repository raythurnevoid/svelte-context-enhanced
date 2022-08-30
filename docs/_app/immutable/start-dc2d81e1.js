var Ke=Object.defineProperty;var Fe=(a,e,t)=>e in a?Ke(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var fe=(a,e,t)=>(Fe(a,typeof e!="symbol"?e+"":e,t),t);import{_ as M}from"./chunks/preload-helper-aa6bc0ce.js";import{S as Je,i as He,s as Me,a as We,e as z,c as xe,b as W,g as ne,t as B,d as re,f as K,h as F,j as Ge,o as he,k as Xe,l as Ye,m as Qe,n as ue,p as V,q as Ze,r as et,u as tt,v as G,w as we,x as X,y as Y,z as Ae}from"./chunks/index-e0b68c65.js";import{g as Ie,f as Ue,a as De,s as H,b as _e,i as nt}from"./chunks/singletons-de7740bd.js";import{s as rt}from"./chunks/paths-6cd3a76e.js";import"./chunks/index-18094f8b.js";class te{constructor(e,t){fe(this,"name","HttpError");fe(this,"stack");this.status=e,this.message=t!=null?t:`Error: ${e}`}toString(){return this.message}}class Te{constructor(e,t){this.status=e,this.location=t}}function at(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function st(a){for(const e in a)a[e]=a[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return a}const it=["href","pathname","search","searchParams","toString","toJSON"];function ot(a,e){const t=new URL(a);for(const i of it){let o=t[i];Object.defineProperty(t,i,{get(){return e(),o},enumerable:!0,configurable:!0})}return t[Symbol.for("nodejs.util.inspect.custom")]=(i,o,d)=>d(a,o),lt(t),t}function lt(a){Object.defineProperty(a,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function ct(a){let e=5381,t=a.length;if(typeof a=="string")for(;t;)e=e*33^a.charCodeAt(--t);else for(;t;)e=e*33^a[--t];return(e>>>0).toString(36)}const ze=window.fetch;function ft(a,e){let i=`script[sveltekit\\:data-type="data"][sveltekit\\:data-url=${JSON.stringify(typeof a=="string"?a:a.url)}]`;e&&typeof e.body=="string"&&(i+=`[sveltekit\\:data-body="${ct(e.body)}"]`);const o=document.querySelector(i);if(o&&o.textContent){const{body:d,...n}=JSON.parse(o.textContent);return Promise.resolve(new Response(d,n))}return ze(a,e)}const ut=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function dt(a){const e=[],t=[];let i=!0;if(/\]\[/.test(a))throw new Error(`Invalid route ${a} \u2014 parameters must be separated`);if(Ne("[",a)!==Ne("]",a))throw new Error(`Invalid route ${a} \u2014 brackets are unbalanced`);return{pattern:a===""?/^\/$/:new RegExp(`^${a.split(/(?:\/|$)/).filter(pt).map((d,n,f)=>{const g=decodeURIComponent(d),h=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(g);if(h)return e.push(h[1]),t.push(h[2]),"(?:/(.*))?";const w=n===f.length-1;return g&&"/"+g.split(/\[(.+?)\]/).map((L,S)=>{if(S%2){const D=ut.exec(L);if(!D)throw new Error(`Invalid param: ${L}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,j,N,C]=D;return e.push(N),t.push(C),j?"(.*?)":"([^/]+?)"}return w&&L.includes(".")&&(i=!1),L.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${i?"/?":""}$`),names:e,types:t}}function pt(a){return!/^\([^)]+\)$/.test(a)}function ht(a,e,t,i){const o={};for(let d=0;d<e.length;d+=1){const n=e[d],f=t[d],g=a[d+1]||"";if(f){const h=i[f];if(!h)throw new Error(`Missing "${f}" param matcher`);if(!h(g))return}o[n]=g}return o}function Ne(a,e){let t=0;for(let i=0;i<e.length;i+=1)e[i]===a&&(t+=1);return t}function _t(a,e,t,i){const o=new Set(e);return Object.entries(t).map(([f,[g,h,w]])=>{const{pattern:L,names:S,types:D}=dt(f),j={id:f,exec:N=>{const C=L.exec(N);if(C)return ht(C,S,D,i)},errors:[1,...w||[]].map(N=>a[N]),layouts:[0,...h||[]].map(n),leaf:d(g)};return j.errors.length=j.layouts.length=Math.max(j.errors.length,j.layouts.length),j});function d(f){const g=f<0;return g&&(f=~f),[g,a[f]]}function n(f){return f===void 0?f:[o.has(f),a[f]]}}function mt(a,e){return new te(a,e)}function gt(a){let e,t,i;var o=a[0][0];function d(n){return{props:{data:n[1],errors:n[3]}}}return o&&(e=new o(d(a))),{c(){e&&G(e.$$.fragment),t=z()},l(n){e&&we(e.$$.fragment,n),t=z()},m(n,f){e&&X(e,n,f),W(n,t,f),i=!0},p(n,f){const g={};if(f&2&&(g.data=n[1]),f&8&&(g.errors=n[3]),o!==(o=n[0][0])){if(e){ne();const h=e;B(h.$$.fragment,1,0,()=>{Y(h,1)}),re()}o?(e=new o(d(n)),G(e.$$.fragment),K(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(g)},i(n){i||(e&&K(e.$$.fragment,n),i=!0)},o(n){e&&B(e.$$.fragment,n),i=!1},d(n){n&&F(t),e&&Y(e,n)}}}function wt(a){let e,t,i;var o=a[0][0];function d(n){return{props:{data:n[1],errors:n[3],$$slots:{default:[yt]},$$scope:{ctx:n}}}}return o&&(e=new o(d(a))),{c(){e&&G(e.$$.fragment),t=z()},l(n){e&&we(e.$$.fragment,n),t=z()},m(n,f){e&&X(e,n,f),W(n,t,f),i=!0},p(n,f){const g={};if(f&2&&(g.data=n[1]),f&8&&(g.errors=n[3]),f&525&&(g.$$scope={dirty:f,ctx:n}),o!==(o=n[0][0])){if(e){ne();const h=e;B(h.$$.fragment,1,0,()=>{Y(h,1)}),re()}o?(e=new o(d(n)),G(e.$$.fragment),K(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(g)},i(n){i||(e&&K(e.$$.fragment,n),i=!0)},o(n){e&&B(e.$$.fragment,n),i=!1},d(n){n&&F(t),e&&Y(e,n)}}}function yt(a){let e,t,i;var o=a[0][1];function d(n){return{props:{data:n[2],errors:n[3]}}}return o&&(e=new o(d(a))),{c(){e&&G(e.$$.fragment),t=z()},l(n){e&&we(e.$$.fragment,n),t=z()},m(n,f){e&&X(e,n,f),W(n,t,f),i=!0},p(n,f){const g={};if(f&4&&(g.data=n[2]),f&8&&(g.errors=n[3]),o!==(o=n[0][1])){if(e){ne();const h=e;B(h.$$.fragment,1,0,()=>{Y(h,1)}),re()}o?(e=new o(d(n)),G(e.$$.fragment),K(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else o&&e.$set(g)},i(n){i||(e&&K(e.$$.fragment,n),i=!0)},o(n){e&&B(e.$$.fragment,n),i=!1},d(n){n&&F(t),e&&Y(e,n)}}}function Ve(a){let e,t=a[5]&&Ce(a);return{c(){e=Xe("div"),t&&t.c(),this.h()},l(i){e=Ye(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var o=Qe(e);t&&t.l(o),o.forEach(F),this.h()},h(){ue(e,"id","svelte-announcer"),ue(e,"aria-live","assertive"),ue(e,"aria-atomic","true"),V(e,"position","absolute"),V(e,"left","0"),V(e,"top","0"),V(e,"clip","rect(0 0 0 0)"),V(e,"clip-path","inset(50%)"),V(e,"overflow","hidden"),V(e,"white-space","nowrap"),V(e,"width","1px"),V(e,"height","1px")},m(i,o){W(i,e,o),t&&t.m(e,null)},p(i,o){i[5]?t?t.p(i,o):(t=Ce(i),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(i){i&&F(e),t&&t.d()}}}function Ce(a){let e;return{c(){e=Ze(a[6])},l(t){e=et(t,a[6])},m(t,i){W(t,e,i)},p(t,i){i&64&&tt(e,t[6])},d(t){t&&F(e)}}}function bt(a){let e,t,i,o,d;const n=[wt,gt],f=[];function g(w,L){return w[0][1]?0:1}e=g(a),t=f[e]=n[e](a);let h=a[4]&&Ve(a);return{c(){t.c(),i=We(),h&&h.c(),o=z()},l(w){t.l(w),i=xe(w),h&&h.l(w),o=z()},m(w,L){f[e].m(w,L),W(w,i,L),h&&h.m(w,L),W(w,o,L),d=!0},p(w,[L]){let S=e;e=g(w),e===S?f[e].p(w,L):(ne(),B(f[S],1,1,()=>{f[S]=null}),re(),t=f[e],t?t.p(w,L):(t=f[e]=n[e](w),t.c()),K(t,1),t.m(i.parentNode,i)),w[4]?h?h.p(w,L):(h=Ve(w),h.c(),h.m(o.parentNode,o)):h&&(h.d(1),h=null)},i(w){d||(K(t),d=!0)},o(w){B(t),d=!1},d(w){f[e].d(w),w&&F(i),h&&h.d(w),w&&F(o)}}}function vt(a,e,t){let{stores:i}=e,{page:o}=e,{components:d}=e,{data_0:n=null}=e,{data_1:f=null}=e,{errors:g}=e;Ge(i.page.notify);let h=!1,w=!1,L=null;return he(()=>{const S=i.page.subscribe(()=>{h&&(t(5,w=!0),t(6,L=document.title||"untitled page"))});return t(4,h=!0),S}),a.$$set=S=>{"stores"in S&&t(7,i=S.stores),"page"in S&&t(8,o=S.page),"components"in S&&t(0,d=S.components),"data_0"in S&&t(1,n=S.data_0),"data_1"in S&&t(2,f=S.data_1),"errors"in S&&t(3,g=S.errors)},a.$$.update=()=>{a.$$.dirty&384&&i.page.set(o)},[d,n,f,g,h,w,L,i,o]}class kt extends Je{constructor(e){super(),He(this,e,vt,bt,Me,{stores:7,page:8,components:0,data_0:1,data_1:2,errors:3})}}const Et={},ae=[()=>M(()=>import("./chunks/0-e5b59221.js"),["chunks\\0-e5b59221.js","components\\pages\\_layout.svelte-67404562.js","assets\\_layout-43c20851.css","chunks\\index-e0b68c65.js","chunks\\ModulePage.svelte_svelte_type_style_lang-c2b3f2b3.js","assets\\ModulePage-afae4170.css","chunks\\index-18094f8b.js","chunks\\stores-fd0cf661.js","chunks\\singletons-de7740bd.js","chunks\\paths-6cd3a76e.js"],import.meta.url),()=>M(()=>import("./chunks/1-34966420.js"),["chunks\\1-34966420.js","components\\error.svelte-4c1700c4.js","chunks\\index-e0b68c65.js","chunks\\stores-fd0cf661.js","chunks\\singletons-de7740bd.js","chunks\\index-18094f8b.js","chunks\\paths-6cd3a76e.js"],import.meta.url),()=>M(()=>import("./chunks/2-a4bc6d9f.js"),["chunks\\2-a4bc6d9f.js","chunks\\_page-8d1b7da6.js","chunks\\utils-a2f3d065.js","chunks\\preload-helper-aa6bc0ce.js","chunks\\paths-6cd3a76e.js","components\\pages\\_page.svelte-77d579d1.js","chunks\\index-e0b68c65.js","chunks\\CopyButton-c60f131f.js","assets\\CopyButton-965e4405.css","chunks\\ModulePage.svelte_svelte_type_style_lang-c2b3f2b3.js","assets\\ModulePage-afae4170.css"],import.meta.url),()=>M(()=>import("./chunks/3-67f9205b.js"),["chunks\\3-67f9205b.js","chunks\\_page-7ec42d9b.js","chunks\\utils-a2f3d065.js","chunks\\preload-helper-aa6bc0ce.js","chunks\\paths-6cd3a76e.js","components\\pages\\advanced\\_page.svelte-1c02163d.js","chunks\\index-e0b68c65.js","chunks\\CopyButton-c60f131f.js","assets\\CopyButton-965e4405.css","chunks\\ModulePage.svelte_svelte_type_style_lang-c2b3f2b3.js","assets\\ModulePage-afae4170.css","chunks\\PageContentsNavItem-b9f280b7.js","assets\\PageContentsNavItem-70506eb3.css","chunks\\index-18094f8b.js"],import.meta.url),()=>M(()=>import("./chunks/4-84046469.js"),["chunks\\4-84046469.js","chunks\\_page-cd4766c3.js","chunks\\utils-a2f3d065.js","chunks\\preload-helper-aa6bc0ce.js","chunks\\paths-6cd3a76e.js","components\\pages\\basic\\_page.svelte-530830b0.js","chunks\\index-e0b68c65.js","chunks\\CopyButton-c60f131f.js","assets\\CopyButton-965e4405.css","chunks\\ModulePage.svelte_svelte_type_style_lang-c2b3f2b3.js","assets\\ModulePage-afae4170.css","chunks\\PageContentsNavItem-b9f280b7.js","assets\\PageContentsNavItem-70506eb3.css","chunks\\index-18094f8b.js"],import.meta.url),()=>M(()=>import("./chunks/5-497076e4.js"),["chunks\\5-497076e4.js","chunks\\_page-5a68da39.js","chunks\\utils-a2f3d065.js","chunks\\preload-helper-aa6bc0ce.js","chunks\\paths-6cd3a76e.js","components\\pages\\store\\_page.svelte-1c6d55b0.js","chunks\\index-e0b68c65.js","chunks\\CopyButton-c60f131f.js","assets\\CopyButton-965e4405.css","chunks\\ModulePage.svelte_svelte_type_style_lang-c2b3f2b3.js","assets\\ModulePage-afae4170.css","chunks\\PageContentsNavItem-b9f280b7.js","assets\\PageContentsNavItem-70506eb3.css","chunks\\index-18094f8b.js"],import.meta.url)],Rt=[],St={"":[2],advanced:[3],basic:[4],store:[5]},Lt="/__data.js",Be="sveltekit:scroll",q="sveltekit:index",de=_t(ae,Rt,St,Et),me=ae[0],ge=ae[1];me();ge();let Q={};try{Q=JSON.parse(sessionStorage[Be])}catch{}function pe(a){Q[a]=_e()}function $t({target:a,base:e,trailing_slash:t}){var $e;const i=[],o={id:null,promise:null},d={before_navigate:[],after_navigate:[]};let n={branch:[],error:null,session_id:0,url:null},f=!1,g=!0,h=!1,w=1,L=null,S,D=!0,j=($e=history.state)==null?void 0:$e[q];j||(j=Date.now(),history.replaceState({...history.state,[q]:j},"",location.href));const N=Q[j];N&&(history.scrollRestoration="manual",scrollTo(N.x,N.y));let C=!1,x,ye;async function be(r,{noscroll:c=!1,replaceState:u=!1,keepfocus:s=!1,state:l={}},E){if(typeof r=="string"&&(r=new URL(r,Ie(document))),D)return oe({url:r,scroll:c?_e():null,keepfocus:s,redirect_chain:E,details:{state:l,replaceState:u},accepted:()=>{},blocked:()=>{}});await J(r)}async function ve(r){const c=Le(r);if(!c)throw new Error("Attempted to prefetch a URL that does not belong to this app");return o.promise=Se(c),o.id=c.id,o.promise}async function ke(r,c,u,s){var v,b,y;const l=Le(r),E=ye={};let p=l&&await Se(l);if(!p&&r.origin===location.origin&&r.pathname===location.pathname&&(p=await ee({status:404,error:new Error(`Not found: ${r.pathname}`),url:r,routeId:null})),!p)return await J(r),!1;if(r=(l==null?void 0:l.url)||r,ye!==E)return!1;if(i.length=0,p.type==="redirect")if(c.length>10||c.includes(r.pathname))p=await ee({status:500,error:new Error("Redirect loop"),url:r,routeId:null});else return D?be(new URL(p.location,r).href,{},[...c,r.pathname]):await J(new URL(p.location,location.href)),!1;else((b=(v=p.props)==null?void 0:v.page)==null?void 0:b.status)>=400&&await H.updated.check()&&await J(r);if(h=!0,u&&u.details){const{details:P}=u,I=P.replaceState?0:1;P.state[q]=j+=I,history[P.replaceState?"replaceState":"pushState"](P.state,"",r)}if(f?(n=p.state,p.props.page&&(p.props.page.url=r),S.$set(p.props)):Ee(p),u){const{scroll:P,keepfocus:I}=u;if(!I){const k=document.body,O=k.getAttribute("tabindex");k.tabIndex=-1,k.focus({preventScroll:!0}),setTimeout(()=>{var _;(_=getSelection())==null||_.removeAllRanges()}),O!==null?k.setAttribute("tabindex",O):k.removeAttribute("tabindex")}if(await Ae(),g){const k=r.hash&&document.getElementById(r.hash.slice(1));P?scrollTo(P.x,P.y):k?k.scrollIntoView():scrollTo(0,0)}}else await Ae();o.promise=null,o.id=null,g=!0,p.props.page&&(x=p.props.page);const R=p.state.branch[p.state.branch.length-1];D=((y=R==null?void 0:R.node.shared)==null?void 0:y.router)!==!1,s&&s(),h=!1}function Ee(r){n=r.state;const c=document.querySelector("style[data-sveltekit]");if(c&&c.remove(),x=r.props.page,S=new kt({target:a,props:{...r.props,stores:H},hydrate:!0}),D){const u={from:null,to:new URL(location.href)};d.after_navigate.forEach(s=>s(u))}f=!0}async function Z({url:r,params:c,branch:u,status:s,error:l,routeId:E,validation_errors:p}){var I;const R=u.filter(Boolean),v={type:"loaded",state:{url:r,params:c,branch:u,error:l,session_id:w},props:{components:R.map(k=>k.node.component),errors:p}};let b={},y=!x;for(let k=0;k<R.length;k+=1){const O=R[k];b={...b,...O.data},(y||!n.branch.some(_=>_===O))&&(v.props[`data_${k}`]=b,y=y||Object.keys((I=O.data)!=null?I:{}).length>0)}if(y||(y=Object.keys(x.data).length!==Object.keys(b).length),!n.url||r.href!==n.url.href||n.error!==l||y){v.props.page={error:l,params:c,routeId:E,status:s,url:r,data:y?b:x.data};const k=(O,_)=>{Object.defineProperty(v.props.page,O,{get:()=>{throw new Error(`$page.${O} has been replaced by $page.url.${_}`)}})};k("origin","origin"),k("path","pathname"),k("query","searchParams")}return v}async function se({loader:r,parent:c,url:u,params:s,routeId:l,server_data_node:E}){var b,y,P,I,k;let p=null;const R={dependencies:new Set,params:new Set,parent:!1,url:!1},v=await r();if((b=v.shared)!=null&&b.load){let O=function(...m){for(const $ of m){const{href:U}=new URL($,u);R.dependencies.add(U)}};const _={};for(const m in s)Object.defineProperty(_,m,{get(){return R.params.add(m),s[m]},enumerable:!0});const A={routeId:l,params:_,data:(y=E==null?void 0:E.data)!=null?y:null,url:ot(u,()=>{R.url=!0}),async fetch(m,$){let U;typeof m=="string"?U=m:(U=m.url,$={body:m.method==="GET"||m.method==="HEAD"?void 0:await m.blob(),cache:m.cache,credentials:m.credentials,headers:m.headers,integrity:m.integrity,keepalive:m.keepalive,method:m.method,mode:m.mode,redirect:m.redirect,referrer:m.referrer,referrerPolicy:m.referrerPolicy,signal:m.signal,...$});const T=new URL(U,u).href;return O(T),f?ze(T,$):ft(U,$)},setHeaders:()=>{},depends:O,parent(){return R.parent=!0,c()}};Object.defineProperties(A,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),p=(P=await v.shared.load.call(null,A))!=null?P:null}return{node:v,loader:r,server:E,shared:(I=v.shared)!=null&&I.load?{type:"data",data:p,uses:R}:null,data:(k=p!=null?p:E==null?void 0:E.data)!=null?k:null}}function Re(r,c,u){if(!u)return!1;if(u.parent&&c||r.url&&u.url)return!0;for(const s of r.params)if(u.params.has(s))return!0;for(const s of u.dependencies)if(i.some(l=>l(s)))return!0;return!1}function ie(r,c){var u,s;return(r==null?void 0:r.type)==="data"?{type:"data",data:r.data,uses:{dependencies:new Set((u=r.uses.dependencies)!=null?u:[]),params:new Set((s=r.uses.params)!=null?s:[]),parent:!!r.uses.parent,url:!!r.uses.url}}:(r==null?void 0:r.type)==="skip"&&c!=null?c:null}async function Se({id:r,url:c,params:u,route:s}){if(o.id===r&&o.promise)return o.promise;const{errors:l,layouts:E,leaf:p}=s,R=n.url&&{url:r!==n.url.pathname+n.url.search,params:Object.keys(u).filter(_=>n.params[_]!==u[_])},v=[...E,p];l.forEach(_=>_==null?void 0:_().catch(()=>{})),v.forEach(_=>_==null?void 0:_[1]().catch(()=>{}));let b=null;const y=v.reduce((_,A,m)=>{var T;const $=n.branch[m],U=!!(A!=null&&A[0])&&(($==null?void 0:$.loader)!==A[1]||Re(R,_.some(Boolean),(T=$.server)==null?void 0:T.uses));return _.push(U),_},[]);if(y.some(Boolean)){try{b=await qe(c,y)}catch(_){return ee({status:500,error:_,url:c,routeId:s.id})}if(b.type==="redirect")return b}const P=b==null?void 0:b.nodes;let I=!1;const k=v.map(async(_,A)=>{var le,Pe;if(!_)return;const m=n.branch[A],$=(le=P==null?void 0:P[A])!=null?le:null;if((!$||$.type==="skip")&&_[1]===(m==null?void 0:m.loader)&&!Re(R,I,(Pe=m.shared)==null?void 0:Pe.uses))return m;if(I=!0,($==null?void 0:$.type)==="error")throw $.httperror?mt($.httperror.status,$.httperror.message):$.error;return se({loader:_[1],url:c,params:u,routeId:s.id,parent:async()=>{var je;const Oe={};for(let ce=0;ce<A;ce+=1)Object.assign(Oe,(je=await k[ce])==null?void 0:je.data);return Oe},server_data_node:ie($,m==null?void 0:m.server)})});for(const _ of k)_.catch(()=>{});const O=[];for(let _=0;_<v.length;_+=1)if(v[_])try{O.push(await k[_])}catch(A){const m=A;if(m instanceof Te)return{type:"redirect",location:m.location};const $=A instanceof te?A.status:500;for(;_--;)if(l[_]){let U,T=_;for(;!O[T];)T-=1;try{return U={node:await l[_](),loader:l[_],data:{},server:null,shared:null},await Z({url:c,params:u,branch:O.slice(0,T+1).concat(U),status:$,error:m,routeId:s.id})}catch{continue}}J(c);return}else O.push(void 0);return await Z({url:c,params:u,branch:O,status:200,error:null,routeId:s.id})}async function ee({status:r,error:c,url:u,routeId:s}){var b;const l={},E=await me();let p=null;if(E.server)try{const y=await qe(u,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;p=(b=y.nodes[0])!=null?b:null}catch{J(u);return}const R=await se({loader:me,url:u,params:l,routeId:s,parent:()=>Promise.resolve({}),server_data_node:ie(p)}),v={node:await ge(),loader:ge,shared:null,server:null,data:null};return await Z({url:u,params:l,branch:[R,v],status:r,error:c,routeId:s})}function Le(r){if(r.origin!==location.origin||!r.pathname.startsWith(e))return;const c=decodeURI(r.pathname.slice(e.length)||"/");for(const u of de){const s=u.exec(c);if(s){const l=new URL(r.origin+at(r.pathname,t)+r.search+r.hash);return{id:l.pathname+l.search,route:u,params:st(s),url:l}}}}async function oe({url:r,scroll:c,keepfocus:u,redirect_chain:s,details:l,accepted:E,blocked:p}){const R=n.url;let v=!1;const b={from:R,to:r,cancel:()=>v=!0};if(d.before_navigate.forEach(y=>y(b)),v){p();return}pe(j),E(),f&&H.navigating.set({from:n.url,to:r}),await ke(r,s,{scroll:c,keepfocus:u,details:l},()=>{const y={from:R,to:r};d.after_navigate.forEach(P=>P(y)),H.navigating.set(null)})}function J(r){return location.href=r.href,new Promise(()=>{})}return{after_navigate:r=>{he(()=>(d.after_navigate.push(r),()=>{const c=d.after_navigate.indexOf(r);d.after_navigate.splice(c,1)}))},before_navigate:r=>{he(()=>(d.before_navigate.push(r),()=>{const c=d.before_navigate.indexOf(r);d.before_navigate.splice(c,1)}))},disable_scroll_handling:()=>{(h||!f)&&(g=!1)},goto:(r,c={})=>be(r,c,[]),invalidate:r=>{var c,u;if(r===void 0){for(const s of n.branch)(c=s==null?void 0:s.server)==null||c.uses.dependencies.add(""),(u=s==null?void 0:s.shared)==null||u.uses.dependencies.add("");i.push(()=>!0)}else if(typeof r=="function")i.push(r);else{const{href:s}=new URL(r,location.href);i.push(l=>l===s)}return L||(L=Promise.resolve().then(async()=>{await ke(new URL(location.href),[]),L=null})),L},prefetch:async r=>{const c=new URL(r,Ie(document));await ve(c)},prefetch_routes:async r=>{const u=(r?de.filter(s=>r.some(l=>s.exec(l))):de).map(s=>Promise.all([...s.layouts,s.leaf].map(l=>l==null?void 0:l[1]())));await Promise.all(u)},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",s=>{let l=!1;const E={from:n.url,to:null,cancel:()=>l=!0};d.before_navigate.forEach(p=>p(E)),l?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){pe(j);try{sessionStorage[Be]=JSON.stringify(Q)}catch{}}});const r=s=>{const l=Ue(s);l&&l.href&&l.hasAttribute("sveltekit:prefetch")&&ve(De(l))};let c;const u=s=>{clearTimeout(c),c=setTimeout(()=>{var l;(l=s.target)==null||l.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",r),addEventListener("mousemove",u),addEventListener("sveltekit:trigger_prefetch",r),addEventListener("click",s=>{if(!D||s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const l=Ue(s);if(!l||!l.href)return;const E=l instanceof SVGAElement,p=De(l);if(!E&&!(p.protocol==="https:"||p.protocol==="http:"))return;const R=(l.getAttribute("rel")||"").split(/\s+/);if(l.hasAttribute("download")||R.includes("external")||l.hasAttribute("sveltekit:reload")||(E?l.target.baseVal:l.target))return;const[v,b]=p.href.split("#");if(b!==void 0&&v===location.href.split("#")[0]){C=!0,pe(j),H.page.set({...x,url:p}),H.page.notify();return}oe({url:p,scroll:l.hasAttribute("sveltekit:noscroll")?_e():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:p.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault()})}),addEventListener("popstate",s=>{if(s.state&&D){if(s.state[q]===j)return;oe({url:new URL(location.href),scroll:Q[s.state[q]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{j=s.state[q]},blocked:()=>{const l=j-s.state[q];history.go(l)}})}}),addEventListener("hashchange",()=>{C&&(C=!1,history.replaceState({...history.state,[q]:++j},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&H.navigating.set(null)})},_hydrate:async({status:r,error:c,node_ids:u,params:s,routeId:l,data:E,errors:p})=>{const R=new URL(location.href);let v;try{const b=u.map(async(y,P)=>{const I=E[P];return se({loader:ae[y],url:R,params:s,routeId:l,parent:async()=>{const k={};for(let O=0;O<P;O+=1)Object.assign(k,(await b[O]).data);return k},server_data_node:ie(I)})});v=await Z({url:R,params:s,branch:await Promise.all(b),status:r,error:c!=null&&c.__is_http_error?new te(c.status,c.message):c,validation_errors:p,routeId:l})}catch(b){const y=b;if(y instanceof Te){await J(new URL(b.location,location.href));return}v=await ee({status:y instanceof te?y.status:500,error:y,url:R,routeId:l})}Ee(v)}}}let Pt=1;async function qe(a,e){const t=new URL(a);t.pathname=a.pathname.replace(/\/$/,"")+Lt,t.searchParams.set("__invalid",e.map(o=>o?"y":"n").join("")),t.searchParams.set("__id",String(Pt++)),await M(()=>import(t.href),[],import.meta.url);const i=window.__sveltekit_data;return delete window.__sveltekit_data,i}function Tt(a){}async function Nt({paths:a,target:e,route:t,spa:i,trailing_slash:o,hydrate:d}){const n=$t({target:e,base:a.base,trailing_slash:o});nt({client:n}),rt(a),d&&await n._hydrate(d),t&&(i&&n.goto(location.href,{replaceState:!0}),n._start_router()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{Tt as set_public_env,Nt as start};
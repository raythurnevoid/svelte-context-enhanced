import{_ as P}from"./preload-helper.41c905a7.js";import{S as w,i as V,E as F,k as T,q as B,a as x,y as U,l as S,m as C,r as G,h as _,c as K,z as $,n as p,b as k,F as h,A as H,u as j,g as q,d as X,B as Y,_ as z,o as W,$ as Z,H as J,e as y,C as Q,D as tt,w as et}from"./index.aea17a7c.js";import{_ as R,a as N,M as nt,e as v,c as it,I as at}from"./Snackbars.2688482f.js";/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var l={CLOSING:"mdc-snackbar--closing",OPEN:"mdc-snackbar--open",OPENING:"mdc-snackbar--opening"},r={ACTION_SELECTOR:".mdc-snackbar__action",ARIA_LIVE_LABEL_TEXT_ATTR:"data-mdc-snackbar-label-text",CLOSED_EVENT:"MDCSnackbar:closed",CLOSING_EVENT:"MDCSnackbar:closing",DISMISS_SELECTOR:".mdc-snackbar__dismiss",LABEL_SELECTOR:".mdc-snackbar__label",OPENED_EVENT:"MDCSnackbar:opened",OPENING_EVENT:"MDCSnackbar:opening",REASON_ACTION:"action",REASON_DISMISS:"dismiss",SURFACE_SELECTOR:".mdc-snackbar__surface"},u={DEFAULT_AUTO_DISMISS_TIMEOUT_MS:5e3,INDETERMINATE:-1,MAX_AUTO_DISMISS_TIMEOUT_MS:1e4,MIN_AUTO_DISMISS_TIMEOUT_MS:4e3,SNACKBAR_ANIMATION_CLOSE_TIME_MS:75,SNACKBAR_ANIMATION_OPEN_TIME_MS:150,ARIA_LIVE_DELAY_MS:1e3};/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var ot=u.ARIA_LIVE_DELAY_MS,b=r.ARIA_LIVE_LABEL_TEXT_ATTR;function st(a,e){e===void 0&&(e=a);var t=a.getAttribute("aria-live"),n=e.textContent.trim();if(!(!n||!t)){a.setAttribute("aria-live","off"),e.textContent="";var i=document.createElement("span");i.setAttribute("style","display: inline-block; width: 0; height: 1px;"),i.textContent=" ",e.appendChild(i),e.setAttribute(b,n),setTimeout(function(){a.setAttribute("aria-live",t),e.removeAttribute(b),e.textContent=n},ot)}}/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var g=l.OPENING,D=l.OPEN,M=l.CLOSING,rt=r.REASON_ACTION,A=r.REASON_DISMISS,ct=function(a){R(e,a);function e(t){var n=a.call(this,N(N({},e.defaultAdapter),t))||this;return n.opened=!1,n.animationFrame=0,n.animationTimer=0,n.autoDismissTimer=0,n.autoDismissTimeoutMs=u.DEFAULT_AUTO_DISMISS_TIMEOUT_MS,n.closeOnEscape=!0,n}return Object.defineProperty(e,"cssClasses",{get:function(){return l},enumerable:!1,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return r},enumerable:!1,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return u},enumerable:!1,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},announce:function(){},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},removeClass:function(){}}},enumerable:!1,configurable:!0}),e.prototype.destroy=function(){this.clearAutoDismissTimer(),cancelAnimationFrame(this.animationFrame),this.animationFrame=0,clearTimeout(this.animationTimer),this.animationTimer=0,this.adapter.removeClass(g),this.adapter.removeClass(D),this.adapter.removeClass(M)},e.prototype.open=function(){var t=this;this.clearAutoDismissTimer(),this.opened=!0,this.adapter.notifyOpening(),this.adapter.removeClass(M),this.adapter.addClass(g),this.adapter.announce(),this.runNextAnimationFrame(function(){t.adapter.addClass(D),t.animationTimer=setTimeout(function(){var n=t.getTimeoutMs();t.handleAnimationTimerEnd(),t.adapter.notifyOpened(),n!==u.INDETERMINATE&&(t.autoDismissTimer=setTimeout(function(){t.close(A)},n))},u.SNACKBAR_ANIMATION_OPEN_TIME_MS)})},e.prototype.close=function(t){var n=this;t===void 0&&(t=""),this.opened&&(cancelAnimationFrame(this.animationFrame),this.animationFrame=0,this.clearAutoDismissTimer(),this.opened=!1,this.adapter.notifyClosing(t),this.adapter.addClass(l.CLOSING),this.adapter.removeClass(l.OPEN),this.adapter.removeClass(l.OPENING),clearTimeout(this.animationTimer),this.animationTimer=setTimeout(function(){n.handleAnimationTimerEnd(),n.adapter.notifyClosed(t)},u.SNACKBAR_ANIMATION_CLOSE_TIME_MS))},e.prototype.isOpen=function(){return this.opened},e.prototype.getTimeoutMs=function(){return this.autoDismissTimeoutMs},e.prototype.setTimeoutMs=function(t){var n=u.MIN_AUTO_DISMISS_TIMEOUT_MS,i=u.MAX_AUTO_DISMISS_TIMEOUT_MS,c=u.INDETERMINATE;if(t===u.INDETERMINATE||t<=i&&t>=n)this.autoDismissTimeoutMs=t;else throw new Error(`
        timeoutMs must be an integer in the range `+n+"–"+i+`
        (or `+c+" to disable), but got '"+t+"'")},e.prototype.getCloseOnEscape=function(){return this.closeOnEscape},e.prototype.setCloseOnEscape=function(t){this.closeOnEscape=t},e.prototype.handleKeyDown=function(t){var n=t.key==="Escape"||t.keyCode===27;n&&this.getCloseOnEscape()&&this.close(A)},e.prototype.handleActionButtonClick=function(t){this.close(rt)},e.prototype.handleActionIconClick=function(t){this.close(A)},e.prototype.clearAutoDismissTimer=function(){clearTimeout(this.autoDismissTimer),this.autoDismissTimer=0},e.prototype.handleAnimationTimerEnd=function(){this.animationTimer=0,this.adapter.removeClass(l.OPENING),this.adapter.removeClass(l.CLOSING)},e.prototype.runNextAnimationFrame=function(t){var n=this;cancelAnimationFrame(this.animationFrame),this.animationFrame=requestAnimationFrame(function(){n.animationFrame=0,clearTimeout(n.animationTimer),n.animationTimer=setTimeout(t,0)})},e}(nt);/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var ut=r.SURFACE_SELECTOR,lt=r.LABEL_SELECTOR,L=r.ACTION_SELECTOR,dt=r.DISMISS_SELECTOR,ft=r.OPENING_EVENT,mt=r.OPENED_EVENT,pt=r.CLOSING_EVENT,_t=r.CLOSED_EVENT,Et=function(a){R(e,a);function e(){return a!==null&&a.apply(this,arguments)||this}return e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t){t===void 0&&(t=function(){return st}),this.announce=t()},e.prototype.initialSyncWithDOM=function(){var t=this;this.surfaceEl=this.root.querySelector(ut),this.labelEl=this.root.querySelector(lt),this.actionEl=this.root.querySelector(L),this.handleKeyDown=function(n){t.foundation.handleKeyDown(n)},this.handleSurfaceClick=function(n){var i=n.target;t.isActionButton(i)?t.foundation.handleActionButtonClick(n):t.isActionIcon(i)&&t.foundation.handleActionIconClick(n)},this.registerKeyDownHandler(this.handleKeyDown),this.registerSurfaceClickHandler(this.handleSurfaceClick)},e.prototype.destroy=function(){a.prototype.destroy.call(this),this.deregisterKeyDownHandler(this.handleKeyDown),this.deregisterSurfaceClickHandler(this.handleSurfaceClick)},e.prototype.open=function(){this.foundation.open()},e.prototype.close=function(t){t===void 0&&(t=""),this.foundation.close(t)},e.prototype.getDefaultFoundation=function(){var t=this,n={addClass:function(i){t.root.classList.add(i)},announce:function(){t.announce(t.labelEl)},notifyClosed:function(i){return t.emit(_t,i?{reason:i}:{})},notifyClosing:function(i){return t.emit(pt,i?{reason:i}:{})},notifyOpened:function(){return t.emit(mt,{})},notifyOpening:function(){return t.emit(ft,{})},removeClass:function(i){return t.root.classList.remove(i)}};return new ct(n)},Object.defineProperty(e.prototype,"timeoutMs",{get:function(){return this.foundation.getTimeoutMs()},set:function(t){this.foundation.setTimeoutMs(t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"closeOnEscape",{get:function(){return this.foundation.getCloseOnEscape()},set:function(t){this.foundation.setCloseOnEscape(t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isOpen",{get:function(){return this.foundation.isOpen()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"labelText",{get:function(){return this.labelEl.textContent},set:function(t){this.labelEl.textContent=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"actionButtonText",{get:function(){return this.actionEl.textContent},set:function(t){this.actionEl.textContent=t},enumerable:!1,configurable:!0}),e.prototype.registerKeyDownHandler=function(t){this.listen("keydown",t)},e.prototype.deregisterKeyDownHandler=function(t){this.unlisten("keydown",t)},e.prototype.registerSurfaceClickHandler=function(t){this.surfaceEl.addEventListener("click",t)},e.prototype.deregisterSurfaceClickHandler=function(t){this.surfaceEl.removeEventListener("click",t)},e.prototype.isActionButton=function(t){return!!v(t,L)},e.prototype.isActionIcon=function(t){return!!v(t,dt)},e}(it);const ht='<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>';function Tt(a){let e,t;return{c(){e=new J(!1),t=y(),this.h()},l(n){e=Q(n,!1),t=y(),this.h()},h(){e.a=t},m(n,i){e.m(ht,n,i),k(n,t,i)},p:tt,d(n){n&&_(t),n&&e.d()}}}function St(a){let e,t,n,i,c,d,o,E;return o=new at({props:{class:"mdc-snackbar__dismiss",title:"Dismiss",notIstantiate:!0,$$slots:{default:[Tt]},$$scope:{ctx:a}}}),{c(){e=T("div"),t=T("div"),n=T("div"),i=B(a[0]),c=x(),d=T("div"),U(o.$$.fragment),this.h()},l(s){e=S(s,"DIV",{class:!0});var f=C(e);t=S(f,"DIV",{class:!0,role:!0,"aria-relevant":!0});var m=C(t);n=S(m,"DIV",{class:!0,"aria-atomic":!0});var O=C(n);i=G(O,a[0]),O.forEach(_),c=K(m),d=S(m,"DIV",{class:!0});var I=C(d);$(o.$$.fragment,I),I.forEach(_),m.forEach(_),f.forEach(_),this.h()},h(){p(n,"class","mdc-snackbar__label"),p(n,"aria-atomic","false"),p(d,"class","mdc-snackbar__actions"),p(t,"class","mdc-snackbar__surface"),p(t,"role","status"),p(t,"aria-relevant","additions"),p(e,"class","Snackbar mdc-snackbar mdc-snackbar--leading svelte-1mg79r2")},m(s,f){k(s,e,f),h(e,t),h(t,n),h(n,i),h(t,c),h(t,d),H(o,d,null),a[2](e),E=!0},p(s,[f]){(!E||f&1)&&j(i,s[0]);const m={};f&32&&(m.$$scope={dirty:f,ctx:s}),o.$set(m)},i(s){E||(q(o.$$.fragment,s),E=!0)},o(s){X(o.$$.fragment,s),E=!1},d(s){s&&_(e),Y(o),a[2](null)}}}function Ct(a,e,t){let{content:n=""}=e;const i=z();let c;W(async()=>{await P(()=>Promise.resolve({}),["..\\assets\\Snackbar.38398429.css"],import.meta.url);const o=new Et(c);o.timeoutMs=4e3,o.open(),o.listen("MDCSnackbar:closed",()=>{i("closed")})}),Z(()=>{});function d(o){et[o?"unshift":"push"](()=>{c=o,t(1,c)})}return a.$$set=o=>{"content"in o&&t(0,n=o.content)},[n,c,d]}class yt extends w{constructor(e){super(),V(this,e,Ct,St,F,{content:0})}}export{yt as default};

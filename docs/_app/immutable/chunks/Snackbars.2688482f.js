import{_ as et}from"./preload-helper.41c905a7.js";import{S as nt,i as it,E as at,k as S,a as H,l as D,m as k,h as m,c as I,n as M,b as U,F as A,g as b,v as rt,d as C,f as ot,o as gt,G as yt,N as bt,q as _t,r as wt,O as P,T as W,U as At,u as Ct,J as St,K as Dt,L as kt,P as Rt,V as st,e as Z,W as ut,X as Ft,w as lt,D as d,y as ct,z as dt,A as ft,B as pt,Y as Ht,M as It,p as J,Z as Lt}from"./index.aea17a7c.js";import{w as Mt}from"./paths.d62f1a46.js";var G;function Ut(a,e){e===void 0&&(e=!1);var t=a.CSS,n=G;if(typeof G=="boolean"&&!e)return G;var i=t&&typeof t.supports=="function";if(!i)return!1;var r=t.supports("--css-vars","yes"),o=t.supports("(--css-vars: yes)")&&t.supports("color","#00000000");return n=r||o,e||(G=n),n}function Bt(a,e,t){if(!a)return{x:0,y:0};var n=e.x,i=e.y,r=n+t.left,o=i+t.top,s,u;if(a.type==="touchstart"){var f=a;s=f.changedTouches[0].pageX-r,u=f.changedTouches[0].pageY-o}else{var p=a;s=p.pageX-r,u=p.pageY-o}return{x:s,y:u}}var X=function(a,e){return X=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])},X(a,e)};function ht(a,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");X(a,e);function t(){this.constructor=a}a.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var L=function(){return L=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++){t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},L.apply(this,arguments)};function z(a){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&a[e],n=0;if(t)return t.call(a);if(a&&typeof a.length=="number")return{next:function(){return a&&n>=a.length&&(a=void 0),{value:a&&a[n++],done:!a}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Gt(a,e){var t=typeof Symbol=="function"&&a[Symbol.iterator];if(!t)return a;var n=t.call(a),i,r=[],o;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)r.push(i.value)}catch(s){o={error:s}}finally{try{i&&!i.done&&(t=n.return)&&t.call(n)}finally{if(o)throw o.error}}return r}function zt(a,e,t){if(t||arguments.length===2)for(var n=0,i=e.length,r;n<i;n++)(r||!(n in e))&&(r||(r=Array.prototype.slice.call(e,0,n)),r[n]=e[n]);return a.concat(r||Array.prototype.slice.call(e))}/**
 * @license
 * Copyright 2016 Google Inc.
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
 */var vt=function(){function a(e){e===void 0&&(e={}),this.adapter=e}return Object.defineProperty(a,"cssClasses",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(a,"strings",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(a,"numbers",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(a,"defaultAdapter",{get:function(){return{}},enumerable:!1,configurable:!0}),a.prototype.init=function(){},a.prototype.destroy=function(){},a}();/**
 * @license
 * Copyright 2016 Google Inc.
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
 */var Ot=function(){function a(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];this.root=e,this.initialize.apply(this,zt([],Gt(n))),this.foundation=t===void 0?this.getDefaultFoundation():t,this.foundation.init(),this.initialSyncWithDOM()}return a.attachTo=function(e){return new a(e,new vt({}))},a.prototype.initialize=function(){},a.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")},a.prototype.initialSyncWithDOM=function(){},a.prototype.destroy=function(){this.foundation.destroy()},a.prototype.listen=function(e,t,n){this.root.addEventListener(e,t,n)},a.prototype.unlisten=function(e,t,n){this.root.removeEventListener(e,t,n)},a.prototype.emit=function(e,t,n){n===void 0&&(n=!1);var i;typeof CustomEvent=="function"?i=new CustomEvent(e,{bubbles:n,detail:t}):(i=document.createEvent("CustomEvent"),i.initCustomEvent(e,n,!1,t)),this.root.dispatchEvent(i)},a}();/**
 * @license
 * Copyright 2019 Google Inc.
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
 */function O(a){return a===void 0&&(a=window),Et(a)?{passive:!0}:!1}function Et(a){a===void 0&&(a=window);var e=!1;try{var t={get passive(){return e=!0,!1}},n=function(){};a.document.addEventListener("test",n,t),a.document.removeEventListener("test",n,t)}catch{e=!1}return e}/**
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
 */function oe(a,e){if(a.closest)return a.closest(e);for(var t=a;t;){if(mt(t,e))return t;t=t.parentElement}return null}function mt(a,e){var t=a.matches||a.webkitMatchesSelector||a.msMatchesSelector;return t.call(a,e)}/**
 * @license
 * Copyright 2016 Google Inc.
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
 */var jt={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},qt={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},K={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300};/**
 * @license
 * Copyright 2016 Google Inc.
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
 */var Q=["touchstart","pointerdown","mousedown","keydown"],T=["touchend","pointerup","mouseup","contextmenu"],E=[],Xt=function(a){ht(e,a);function e(t){var n=a.call(this,L(L({},e.defaultAdapter),t))||this;return n.activationAnimationHasEnded=!1,n.activationTimer=0,n.fgDeactivationRemovalTimer=0,n.fgScale="0",n.frame={width:0,height:0},n.initialSize=0,n.layoutFrame=0,n.maxRadius=0,n.unboundedCoords={left:0,top:0},n.activationState=n.defaultActivationState(),n.activationTimerCallback=function(){n.activationAnimationHasEnded=!0,n.runDeactivationUXLogicIfReady()},n.activateHandler=function(i){n.activateImpl(i)},n.deactivateHandler=function(){n.deactivateImpl()},n.focusHandler=function(){n.handleFocus()},n.blurHandler=function(){n.handleBlur()},n.resizeHandler=function(){n.layout()},n}return Object.defineProperty(e,"cssClasses",{get:function(){return jt},enumerable:!1,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return qt},enumerable:!1,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return K},enumerable:!1,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!1,configurable:!0}),e.prototype.init=function(){var t=this,n=this.supportsPressRipple();if(this.registerRootHandlers(n),n){var i=e.cssClasses,r=i.ROOT,o=i.UNBOUNDED;requestAnimationFrame(function(){t.adapter.addClass(r),t.adapter.isUnbounded()&&(t.adapter.addClass(o),t.layoutInternal())})}},e.prototype.destroy=function(){var t=this;if(this.supportsPressRipple()){this.activationTimer&&(clearTimeout(this.activationTimer),this.activationTimer=0,this.adapter.removeClass(e.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer&&(clearTimeout(this.fgDeactivationRemovalTimer),this.fgDeactivationRemovalTimer=0,this.adapter.removeClass(e.cssClasses.FG_DEACTIVATION));var n=e.cssClasses,i=n.ROOT,r=n.UNBOUNDED;requestAnimationFrame(function(){t.adapter.removeClass(i),t.adapter.removeClass(r),t.removeCssVars()})}this.deregisterRootHandlers(),this.deregisterDeactivationHandlers()},e.prototype.activate=function(t){this.activateImpl(t)},e.prototype.deactivate=function(){this.deactivateImpl()},e.prototype.layout=function(){var t=this;this.layoutFrame&&cancelAnimationFrame(this.layoutFrame),this.layoutFrame=requestAnimationFrame(function(){t.layoutInternal(),t.layoutFrame=0})},e.prototype.setUnbounded=function(t){var n=e.cssClasses.UNBOUNDED;t?this.adapter.addClass(n):this.adapter.removeClass(n)},e.prototype.handleFocus=function(){var t=this;requestAnimationFrame(function(){return t.adapter.addClass(e.cssClasses.BG_FOCUSED)})},e.prototype.handleBlur=function(){var t=this;requestAnimationFrame(function(){return t.adapter.removeClass(e.cssClasses.BG_FOCUSED)})},e.prototype.supportsPressRipple=function(){return this.adapter.browserSupportsCssVars()},e.prototype.defaultActivationState=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},e.prototype.registerRootHandlers=function(t){var n,i;if(t){try{for(var r=z(Q),o=r.next();!o.done;o=r.next()){var s=o.value;this.adapter.registerInteractionHandler(s,this.activateHandler)}}catch(u){n={error:u}}finally{try{o&&!o.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}this.adapter.isUnbounded()&&this.adapter.registerResizeHandler(this.resizeHandler)}this.adapter.registerInteractionHandler("focus",this.focusHandler),this.adapter.registerInteractionHandler("blur",this.blurHandler)},e.prototype.registerDeactivationHandlers=function(t){var n,i;if(t.type==="keydown")this.adapter.registerInteractionHandler("keyup",this.deactivateHandler);else try{for(var r=z(T),o=r.next();!o.done;o=r.next()){var s=o.value;this.adapter.registerDocumentInteractionHandler(s,this.deactivateHandler)}}catch(u){n={error:u}}finally{try{o&&!o.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}},e.prototype.deregisterRootHandlers=function(){var t,n;try{for(var i=z(Q),r=i.next();!r.done;r=i.next()){var o=r.value;this.adapter.deregisterInteractionHandler(o,this.activateHandler)}}catch(s){t={error:s}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}this.adapter.deregisterInteractionHandler("focus",this.focusHandler),this.adapter.deregisterInteractionHandler("blur",this.blurHandler),this.adapter.isUnbounded()&&this.adapter.deregisterResizeHandler(this.resizeHandler)},e.prototype.deregisterDeactivationHandlers=function(){var t,n;this.adapter.deregisterInteractionHandler("keyup",this.deactivateHandler);try{for(var i=z(T),r=i.next();!r.done;r=i.next()){var o=r.value;this.adapter.deregisterDocumentInteractionHandler(o,this.deactivateHandler)}}catch(s){t={error:s}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}},e.prototype.removeCssVars=function(){var t=this,n=e.strings,i=Object.keys(n);i.forEach(function(r){r.indexOf("VAR_")===0&&t.adapter.updateCssVariable(n[r],null)})},e.prototype.activateImpl=function(t){var n=this;if(!this.adapter.isSurfaceDisabled()){var i=this.activationState;if(!i.isActivated){var r=this.previousActivationEvent,o=r&&t!==void 0&&r.type!==t.type;if(!o){i.isActivated=!0,i.isProgrammatic=t===void 0,i.activationEvent=t,i.wasActivatedByPointer=i.isProgrammatic?!1:t!==void 0&&(t.type==="mousedown"||t.type==="touchstart"||t.type==="pointerdown");var s=t!==void 0&&E.length>0&&E.some(function(u){return n.adapter.containsEventTarget(u)});if(s){this.resetActivationState();return}t!==void 0&&(E.push(t.target),this.registerDeactivationHandlers(t)),i.wasElementMadeActive=this.checkElementMadeActive(t),i.wasElementMadeActive&&this.animateActivation(),requestAnimationFrame(function(){E=[],!i.wasElementMadeActive&&t!==void 0&&(t.key===" "||t.keyCode===32)&&(i.wasElementMadeActive=n.checkElementMadeActive(t),i.wasElementMadeActive&&n.animateActivation()),i.wasElementMadeActive||(n.activationState=n.defaultActivationState())})}}}},e.prototype.checkElementMadeActive=function(t){return t!==void 0&&t.type==="keydown"?this.adapter.isSurfaceActive():!0},e.prototype.animateActivation=function(){var t=this,n=e.strings,i=n.VAR_FG_TRANSLATE_START,r=n.VAR_FG_TRANSLATE_END,o=e.cssClasses,s=o.FG_DEACTIVATION,u=o.FG_ACTIVATION,f=e.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal();var p="",_="";if(!this.adapter.isUnbounded()){var w=this.getFgTranslationCoordinates(),g=w.startPoint,v=w.endPoint;p=g.x+"px, "+g.y+"px",_=v.x+"px, "+v.y+"px"}this.adapter.updateCssVariable(i,p),this.adapter.updateCssVariable(r,_),clearTimeout(this.activationTimer),clearTimeout(this.fgDeactivationRemovalTimer),this.rmBoundedActivationClasses(),this.adapter.removeClass(s),this.adapter.computeBoundingRect(),this.adapter.addClass(u),this.activationTimer=setTimeout(function(){t.activationTimerCallback()},f)},e.prototype.getFgTranslationCoordinates=function(){var t=this.activationState,n=t.activationEvent,i=t.wasActivatedByPointer,r;i?r=Bt(n,this.adapter.getWindowPageOffset(),this.adapter.computeBoundingRect()):r={x:this.frame.width/2,y:this.frame.height/2},r={x:r.x-this.initialSize/2,y:r.y-this.initialSize/2};var o={x:this.frame.width/2-this.initialSize/2,y:this.frame.height/2-this.initialSize/2};return{startPoint:r,endPoint:o}},e.prototype.runDeactivationUXLogicIfReady=function(){var t=this,n=e.cssClasses.FG_DEACTIVATION,i=this.activationState,r=i.hasDeactivationUXRun,o=i.isActivated,s=r||!o;s&&this.activationAnimationHasEnded&&(this.rmBoundedActivationClasses(),this.adapter.addClass(n),this.fgDeactivationRemovalTimer=setTimeout(function(){t.adapter.removeClass(n)},K.FG_DEACTIVATION_MS))},e.prototype.rmBoundedActivationClasses=function(){var t=e.cssClasses.FG_ACTIVATION;this.adapter.removeClass(t),this.activationAnimationHasEnded=!1,this.adapter.computeBoundingRect()},e.prototype.resetActivationState=function(){var t=this;this.previousActivationEvent=this.activationState.activationEvent,this.activationState=this.defaultActivationState(),setTimeout(function(){return t.previousActivationEvent=void 0},e.numbers.TAP_DELAY_MS)},e.prototype.deactivateImpl=function(){var t=this,n=this.activationState;if(n.isActivated){var i=L({},n);n.isProgrammatic?(requestAnimationFrame(function(){t.animateDeactivation(i)}),this.resetActivationState()):(this.deregisterDeactivationHandlers(),requestAnimationFrame(function(){t.activationState.hasDeactivationUXRun=!0,t.animateDeactivation(i),t.resetActivationState()}))}},e.prototype.animateDeactivation=function(t){var n=t.wasActivatedByPointer,i=t.wasElementMadeActive;(n||i)&&this.runDeactivationUXLogicIfReady()},e.prototype.layoutInternal=function(){var t=this;this.frame=this.adapter.computeBoundingRect();var n=Math.max(this.frame.height,this.frame.width),i=function(){var o=Math.sqrt(Math.pow(t.frame.width,2)+Math.pow(t.frame.height,2));return o+e.numbers.PADDING};this.maxRadius=this.adapter.isUnbounded()?n:i();var r=Math.floor(n*e.numbers.INITIAL_ORIGIN_SCALE);this.adapter.isUnbounded()&&r%2!==0?this.initialSize=r-1:this.initialSize=r,this.fgScale=""+this.maxRadius/this.initialSize,this.updateLayoutCssVars()},e.prototype.updateLayoutCssVars=function(){var t=e.strings,n=t.VAR_FG_SIZE,i=t.VAR_LEFT,r=t.VAR_TOP,o=t.VAR_FG_SCALE;this.adapter.updateCssVariable(n,this.initialSize+"px"),this.adapter.updateCssVariable(o,this.fgScale),this.adapter.isUnbounded()&&(this.unboundedCoords={left:Math.round(this.frame.width/2-this.initialSize/2),top:Math.round(this.frame.height/2-this.initialSize/2)},this.adapter.updateCssVariable(i,this.unboundedCoords.left+"px"),this.adapter.updateCssVariable(r,this.unboundedCoords.top+"px"))},e}(vt);/**
 * @license
 * Copyright 2016 Google Inc.
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
 */var Vt=function(a){ht(e,a);function e(){var t=a!==null&&a.apply(this,arguments)||this;return t.disabled=!1,t}return e.attachTo=function(t,n){n===void 0&&(n={isUnbounded:void 0});var i=new e(t);return n.isUnbounded!==void 0&&(i.unbounded=n.isUnbounded),i},e.createAdapter=function(t){return{addClass:function(n){return t.root.classList.add(n)},browserSupportsCssVars:function(){return Ut(window)},computeBoundingRect:function(){return t.root.getBoundingClientRect()},containsEventTarget:function(n){return t.root.contains(n)},deregisterDocumentInteractionHandler:function(n,i){return document.documentElement.removeEventListener(n,i,O())},deregisterInteractionHandler:function(n,i){return t.root.removeEventListener(n,i,O())},deregisterResizeHandler:function(n){return window.removeEventListener("resize",n)},getWindowPageOffset:function(){return{x:window.pageXOffset,y:window.pageYOffset}},isSurfaceActive:function(){return mt(t.root,":active")},isSurfaceDisabled:function(){return!!t.disabled},isUnbounded:function(){return!!t.unbounded},registerDocumentInteractionHandler:function(n,i){return document.documentElement.addEventListener(n,i,O())},registerInteractionHandler:function(n,i){return t.root.addEventListener(n,i,O())},registerResizeHandler:function(n){return window.addEventListener("resize",n)},removeClass:function(n){return t.root.classList.remove(n)},updateCssVariable:function(n,i){return t.root.style.setProperty(n,i)}}},Object.defineProperty(e.prototype,"unbounded",{get:function(){return!!this.isUnbounded},set:function(t){this.isUnbounded=!!t,this.setUnbounded()},enumerable:!1,configurable:!0}),e.prototype.activate=function(){this.foundation.activate()},e.prototype.deactivate=function(){this.foundation.deactivate()},e.prototype.layout=function(){this.foundation.layout()},e.prototype.getDefaultFoundation=function(){return new Xt(e.createAdapter(this))},e.prototype.initialSyncWithDOM=function(){var t=this.root;this.isUnbounded="mdcRippleIsUnbounded"in t.dataset},e.prototype.setUnbounded=function(){this.foundation.setUnbounded(!!this.isUnbounded)},e}(Ot);function x(a){a[16]=a[17].default}function Pt(a){let e,t,n,i,r,o,s,u,f,p,_,w;const g=a[12].default,v=yt(g,a,a[11],null);let R=[{class:u="mdc-icon-button mdc-icon-button--touch "+a[0]+" svelte-14nt9rj"},{href:a[3]},{target:f=a[3]?a[4]:void 0},{"aria-describedby":a[7]},{"aria-labelledby":a[7]}],F={};for(let l=0;l<R.length;l+=1)F=bt(F,R[l]);return{c(){e=S(a[8]),t=S("div"),n=H(),i=S("div"),r=H(),o=_t(a[1]),s=H(),v&&v.c(),this.h()},l(l){e=D(l,(a[8]||"null").toUpperCase(),{class:!0,href:!0,target:!0,"aria-describedby":!0,"aria-labelledby":!0});var h=k(e);t=D(h,"DIV",{class:!0}),k(t).forEach(m),n=I(h),i=D(h,"DIV",{class:!0}),k(i).forEach(m),r=I(h),o=wt(h,a[1]),s=I(h),v&&v.l(h),h.forEach(m),this.h()},h(){M(t,"class","mdc-icon-button__ripple"),M(i,"class","mdc-icon-button__touch"),P(a[8])(e,F),W(e,"material-icons",!!a[1])},m(l,h){U(l,e,h),A(e,t),A(e,n),A(e,i),A(e,r),A(e,o),A(e,s),v&&v.m(e,null),a[14](e),p=!0,_||(w=At(e,"click",a[13]),_=!0)},p(l,h){(!p||h&2)&&Ct(o,l[1]),v&&v.p&&(!p||h&2048)&&St(v,g,l,l[11],p?kt(g,l[11],h,null):Dt(l[11]),null),P(l[8])(e,F=Rt(R,[(!p||h&1&&u!==(u="mdc-icon-button mdc-icon-button--touch "+l[0]+" svelte-14nt9rj"))&&{class:u},(!p||h&8)&&{href:l[3]},(!p||h&24&&f!==(f=l[3]?l[4]:void 0))&&{target:f},(!p||h&128)&&{"aria-describedby":l[7]},(!p||h&128)&&{"aria-labelledby":l[7]}])),W(e,"material-icons",!!l[1])},i(l){p||(b(v,l),p=!0)},o(l){C(v,l),p=!1},d(l){l&&m(e),v&&v.d(l),a[14](null),_=!1,w()}}}function N(a){let e,t,n={ctx:a,current:null,token:null,hasCatch:!1,pending:Jt,then:Zt,catch:Wt,value:17,blocks:[,,,]};return st(et(()=>import("./Tooltip.130bc3e2.js"),["./Tooltip.130bc3e2.js","./preload-helper.41c905a7.js","./index.aea17a7c.js"],import.meta.url),n),{c(){e=Z(),n.block.c()},l(i){e=Z(),n.block.l(i)},m(i,r){U(i,e,r),n.block.m(i,n.anchor=r),n.mount=()=>e.parentNode,n.anchor=e,t=!0},p(i,r){a=i,ut(n,a,r)},i(i){t||(b(n.block),t=!0)},o(i){for(let r=0;r<3;r+=1){const o=n.blocks[r];C(o)}t=!1},d(i){i&&m(e),n.block.d(i),n.token=null,n=null}}}function Wt(a){return{c:d,l:d,m:d,p:d,i:d,o:d,d}}function Zt(a){x(a);let e,t;return e=new a[16]({props:{id:a[7],text:a[2]}}),{c(){ct(e.$$.fragment)},l(n){dt(e.$$.fragment,n)},m(n,i){ft(e,n,i),t=!0},p(n,i){x(n);const r={};i&128&&(r.id=n[7]),i&4&&(r.text=n[2]),e.$set(r)},i(n){t||(b(e.$$.fragment,n),t=!0)},o(n){C(e.$$.fragment,n),t=!1},d(n){pt(e,n)}}}function Jt(a){return{c:d,l:d,m:d,p:d,i:d,o:d,d}}function Kt(a){let e,t,n,i,r=a[8]&&Pt(a),o=a[2]&&a[6]&&N(a);return{c(){e=S("div"),t=S("div"),r&&r.c(),n=H(),o&&o.c(),this.h()},l(s){e=D(s,"DIV",{class:!0});var u=k(e);t=D(u,"DIV",{class:!0});var f=k(t);r&&r.l(f),f.forEach(m),n=I(u),o&&o.l(u),u.forEach(m),this.h()},h(){M(t,"class","mdc-touch-target-wrapper"),M(e,"class","IconButton svelte-14nt9rj")},m(s,u){U(s,e,u),A(e,t),r&&r.m(t,null),A(e,n),o&&o.m(e,null),i=!0},p(s,[u]){s[8]&&r.p(s,u),s[2]&&s[6]?o?(o.p(s,u),u&68&&b(o,1)):(o=N(s),o.c(),b(o,1),o.m(e,null)):o&&(rt(),C(o,1,1,()=>{o=null}),ot())},i(s){i||(b(r),b(o),i=!0)},o(s){C(r),C(o),i=!1},d(s){s&&m(e),r&&r.d(s),o&&o.d()}}}let Qt=0;function Tt(a,e,t){let n,{$$slots:i={},$$scope:r}=e,{id:o=`IconButton--${Qt++}`}=e,{class:s=""}=e,{icon:u=""}=e,{title:f=""}=e,{href:p=void 0}=e,{target:_=void 0}=e,{notIstantiate:w=!1}=e,g,v=p?"a":"button",R=!1;gt(()=>{if(w)return;const c=new Vt(g);c.unbounded=!0;const j=F();return()=>{j(),c.destroy()}});function F(){const c=[];function j(){function y(){const q=setTimeout(()=>t(6,R=!0),100);c.push(()=>clearTimeout(q))}if("requestIdleCallback"in window){const q=requestIdleCallback(y);c.push(()=>cancelIdleCallback(q))}else y()}function B(){function y(){console.log("INTERACTION"),j(),window.removeEventListener("pointermove",y),window.removeEventListener("pointerdown",y)}window.addEventListener("pointermove",y),window.addEventListener("pointerdown",y),c.push(()=>{window.removeEventListener("pointermove",y),window.removeEventListener("pointerdown",y)}),window.removeEventListener("load",B)}return document.readyState==="complete"?B():(window.addEventListener("load",B),c.push(()=>window.removeEventListener("load",B))),()=>{c.forEach(y=>y())}}function l(c){Ft.call(this,a,c)}function h(c){lt[c?"unshift":"push"](()=>{g=c,t(5,g)})}return a.$$set=c=>{"id"in c&&t(9,o=c.id),"class"in c&&t(0,s=c.class),"icon"in c&&t(1,u=c.icon),"title"in c&&t(2,f=c.title),"href"in c&&t(3,p=c.href),"target"in c&&t(4,_=c.target),"notIstantiate"in c&&t(10,w=c.notIstantiate),"$$scope"in c&&t(11,r=c.$$scope)},a.$$.update=()=>{a.$$.dirty&512&&t(7,n=`${o}__tooltip`)},[s,u,f,p,_,g,R,n,v,o,w,r,i,l,h]}class se extends nt{constructor(e){super(),it(this,e,Tt,Kt,at,{id:9,class:0,icon:1,title:2,href:3,target:4,notIstantiate:10})}}function Y(a,e,t){const n=a.slice();return n[4]=e[t],n[6]=t,n}function $(a){a[7]=a[8].default}function xt(a){return{c:d,l:d,m:d,p:d,i:d,o:d,d}}function Nt(a){$(a);let e,t;function n(){return a[2](a[4])}return e=new a[7]({props:{content:a[4].content}}),e.$on("closed",n),{c(){ct(e.$$.fragment)},l(i){dt(e.$$.fragment,i)},m(i,r){ft(e,i,r),t=!0},p(i,r){a=i,$(a);const o={};r&2&&(o.content=a[4].content),e.$set(o)},i(i){t||(b(e.$$.fragment,i),t=!0)},o(i){C(e.$$.fragment,i),t=!1},d(i){pt(e,i)}}}function Yt(a){return{c:d,l:d,m:d,p:d,i:d,o:d,d}}function tt(a,e){let t,n,i,r={ctx:e,current:null,token:null,hasCatch:!1,pending:Yt,then:Nt,catch:xt,value:8,blocks:[,,,]};return st(et(()=>import("./Snackbar.30b4cd55.js"),["./Snackbar.30b4cd55.js","./preload-helper.41c905a7.js","./index.aea17a7c.js","..\\assets\\Snackbar.28bf1251.css"],import.meta.url),r),{key:a,first:null,c(){t=S("div"),r.block.c(),n=H(),this.h()},l(o){t=D(o,"DIV",{});var s=k(t);r.block.l(s),n=I(s),s.forEach(m),this.h()},h(){J(t,"--Snackbar-position",e[1].length-e[6]-1),this.first=t},m(o,s){U(o,t,s),r.block.m(t,r.anchor=null),r.mount=()=>t,r.anchor=n,A(t,n),i=!0},p(o,s){e=o,ut(r,e,s),s&2&&J(t,"--Snackbar-position",e[1].length-e[6]-1)},i(o){i||(b(r.block),i=!0)},o(o){for(let s=0;s<3;s+=1){const u=r.blocks[s];C(u)}i=!1},d(o){o&&m(t),r.block.d(),r.token=null,r=null}}}function $t(a){let e,t=[],n=new Map,i,r=a[1];const o=s=>s[4];for(let s=0;s<r.length;s+=1){let u=Y(a,r,s),f=o(u);n.set(f,t[s]=tt(f,u))}return{c(){e=S("aside");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=D(s,"ASIDE",{class:!0});var u=k(e);for(let f=0;f<t.length;f+=1)t[f].l(u);u.forEach(m),this.h()},h(){M(e,"class","Snackbars")},m(s,u){U(s,e,u);for(let f=0;f<t.length;f+=1)t[f]&&t[f].m(e,null);a[3](e),i=!0},p(s,[u]){u&2&&(r=s[1],rt(),t=Ht(t,u,o,1,s,r,n,e,Lt,tt,null,Y),ot())},i(s){if(!i){for(let u=0;u<r.length;u+=1)b(t[u]);i=!0}},o(s){for(let u=0;u<t.length;u+=1)C(t[u]);i=!1},d(s){s&&m(e);for(let u=0;u<t.length;u+=1)t[u].d();a[3](null)}}}let V=Mt([]);function ue(a){V.update(e=>[...e,{content:a}])}function te(a){V.update(e=>e.filter(t=>t!==a))}function ee(a,e,t){let n;It(a,V,s=>t(1,n=s));let i;const r=s=>{te(s)};function o(s){lt[s?"unshift":"push"](()=>{i=s,t(0,i)})}return[i,n,r,o]}class le extends nt{constructor(e){super(),it(this,e,ee,$t,at,{})}}export{se as I,vt as M,le as S,ht as _,L as a,z as b,Ot as c,Vt as d,oe as e,ue as o};
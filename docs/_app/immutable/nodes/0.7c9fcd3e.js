import{S as M,i as k,s as Y,k as g,y as D,l as v,m as A,z as R,h as u,n as d,b as C,A as $,g as E,d as b,B as H,H as q,e as F,C as W,D as V,E as G,q as U,a as L,r as Z,c as w,F as S,o as J,w as K,G as Q,I as tt,J as et,K as nt,L as at}from"../chunks/index.aea17a7c.js";import{b as ot}from"../chunks/paths.d62f1a46.js";import{I as rt,_ as I,a as x,M as st,b as it,c as lt,d as ct,S as pt}from"../chunks/Snackbars.2688482f.js";const ut=!0,Ot=Object.freeze(Object.defineProperty({__proto__:null,prerender:ut},Symbol.toStringTag,{value:"Module"}));const dt=`<svg width="100%" height="100%" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
		fill="#fff"
	/>
</svg>
`;function ht(s){let e,t;return{c(){e=new q(!1),t=F(),this.h()},l(n){e=W(n,!1),t=F(),this.h()},h(){e.a=t},m(n,o){e.m(dt,n,o),C(n,t,o)},p:V,d(n){n&&u(t),n&&e.d()}}}function ft(s){let e,t,n;return t=new rt({props:{href:"https://github.com/raythurnevoid/svelte-group-components",target:"_blank",title:"GitHub Repository",$$slots:{default:[ht]},$$scope:{ctx:s}}}),{c(){e=g("div"),D(t.$$.fragment),this.h()},l(o){e=v(o,"DIV",{class:!0});var a=A(e);R(t.$$.fragment,a),a.forEach(u),this.h()},h(){d(e,"class","GitHubLink svelte-16xxvjx")},m(o,a){C(o,e,a),$(t,e,null),n=!0},p(o,[a]){const i={};a&1&&(i.$$scope={dirty:a,ctx:o}),t.$set(i)},i(o){n||(E(t.$$.fragment,o),n=!0)},o(o){b(t.$$.fragment,o),n=!1},d(o){o&&u(e),H(t)}}}class _t extends M{constructor(e){super(),k(this,e,null,ft,Y,{})}}/**
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
 */var T={FIXED_CLASS:"mdc-top-app-bar--fixed",FIXED_SCROLLED_CLASS:"mdc-top-app-bar--fixed-scrolled",SHORT_CLASS:"mdc-top-app-bar--short",SHORT_COLLAPSED_CLASS:"mdc-top-app-bar--short-collapsed",SHORT_HAS_ACTION_ITEM_CLASS:"mdc-top-app-bar--short-has-action-item"},B={DEBOUNCE_THROTTLE_RESIZE_TIME_MS:100,MAX_TOP_APP_BAR_HEIGHT:128},y={ACTION_ITEM_SELECTOR:".mdc-top-app-bar__action-item",NAVIGATION_EVENT:"MDCTopAppBar:nav",NAVIGATION_ICON_SELECTOR:".mdc-top-app-bar__navigation-icon",ROOT_SELECTOR:".mdc-top-app-bar",TITLE_SELECTOR:".mdc-top-app-bar__title"};/**
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
 */var j=function(s){I(e,s);function e(t){return s.call(this,x(x({},e.defaultAdapter),t))||this}return Object.defineProperty(e,"strings",{get:function(){return y},enumerable:!1,configurable:!0}),Object.defineProperty(e,"cssClasses",{get:function(){return T},enumerable:!1,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return B},enumerable:!1,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},getTopAppBarHeight:function(){return 0},notifyNavigationIconClicked:function(){},getViewportScrollY:function(){return 0},getTotalActionItems:function(){return 0}}},enumerable:!1,configurable:!0}),e.prototype.handleTargetScroll=function(){},e.prototype.handleWindowResize=function(){},e.prototype.handleNavigationClick=function(){this.adapter.notifyNavigationIconClicked()},e}(st);/**
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
 */var O=0,X=function(s){I(e,s);function e(t){var n=s.call(this,t)||this;return n.wasDocked=!0,n.isDockedShowing=!0,n.currentAppBarOffsetTop=0,n.isCurrentlyBeingResized=!1,n.resizeThrottleId=O,n.resizeDebounceId=O,n.lastScrollPosition=n.adapter.getViewportScrollY(),n.topAppBarHeight=n.adapter.getTopAppBarHeight(),n}return e.prototype.destroy=function(){s.prototype.destroy.call(this),this.adapter.setStyle("top","")},e.prototype.handleTargetScroll=function(){var t=Math.max(this.adapter.getViewportScrollY(),0),n=t-this.lastScrollPosition;this.lastScrollPosition=t,this.isCurrentlyBeingResized||(this.currentAppBarOffsetTop-=n,this.currentAppBarOffsetTop>0?this.currentAppBarOffsetTop=0:Math.abs(this.currentAppBarOffsetTop)>this.topAppBarHeight&&(this.currentAppBarOffsetTop=-this.topAppBarHeight),this.moveTopAppBar())},e.prototype.handleWindowResize=function(){var t=this;this.resizeThrottleId||(this.resizeThrottleId=setTimeout(function(){t.resizeThrottleId=O,t.throttledResizeHandler()},B.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),this.isCurrentlyBeingResized=!0,this.resizeDebounceId&&clearTimeout(this.resizeDebounceId),this.resizeDebounceId=setTimeout(function(){t.handleTargetScroll(),t.isCurrentlyBeingResized=!1,t.resizeDebounceId=O},B.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)},e.prototype.checkForUpdate=function(){var t=-this.topAppBarHeight,n=this.currentAppBarOffsetTop<0,o=this.currentAppBarOffsetTop>t,a=n&&o;if(a)this.wasDocked=!1;else if(this.wasDocked){if(this.isDockedShowing!==o)return this.isDockedShowing=o,!0}else return this.wasDocked=!0,!0;return a},e.prototype.moveTopAppBar=function(){if(this.checkForUpdate()){var t=this.currentAppBarOffsetTop;Math.abs(t)>=this.topAppBarHeight&&(t=-B.MAX_TOP_APP_BAR_HEIGHT),this.adapter.setStyle("top",t+"px")}},e.prototype.throttledResizeHandler=function(){var t=this.adapter.getTopAppBarHeight();this.topAppBarHeight!==t&&(this.wasDocked=!1,this.currentAppBarOffsetTop-=this.topAppBarHeight-t,this.topAppBarHeight=t),this.handleTargetScroll()},e}(j);/**
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
 */var Tt=function(s){I(e,s);function e(){var t=s!==null&&s.apply(this,arguments)||this;return t.wasScrolled=!1,t}return e.prototype.handleTargetScroll=function(){var t=this.adapter.getViewportScrollY();t<=0?this.wasScrolled&&(this.adapter.removeClass(T.FIXED_SCROLLED_CLASS),this.wasScrolled=!1):this.wasScrolled||(this.adapter.addClass(T.FIXED_SCROLLED_CLASS),this.wasScrolled=!0)},e}(X);/**
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
 */var mt=function(s){I(e,s);function e(t){var n=s.call(this,t)||this;return n.collapsed=!1,n.isAlwaysCollapsed=!1,n}return Object.defineProperty(e.prototype,"isCollapsed",{get:function(){return this.collapsed},enumerable:!1,configurable:!0}),e.prototype.init=function(){s.prototype.init.call(this),this.adapter.getTotalActionItems()>0&&this.adapter.addClass(T.SHORT_HAS_ACTION_ITEM_CLASS),this.setAlwaysCollapsed(this.adapter.hasClass(T.SHORT_COLLAPSED_CLASS))},e.prototype.setAlwaysCollapsed=function(t){this.isAlwaysCollapsed=!!t,this.isAlwaysCollapsed?this.collapse():this.maybeCollapseBar()},e.prototype.getAlwaysCollapsed=function(){return this.isAlwaysCollapsed},e.prototype.handleTargetScroll=function(){this.maybeCollapseBar()},e.prototype.maybeCollapseBar=function(){if(!this.isAlwaysCollapsed){var t=this.adapter.getViewportScrollY();t<=0?this.collapsed&&this.uncollapse():this.collapsed||this.collapse()}},e.prototype.uncollapse=function(){this.adapter.removeClass(T.SHORT_COLLAPSED_CLASS),this.collapsed=!1},e.prototype.collapse=function(){this.adapter.addClass(T.SHORT_COLLAPSED_CLASS),this.collapsed=!0},e}(j);/**
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
 */var St=function(s){I(e,s);function e(){return s!==null&&s.apply(this,arguments)||this}return e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t){t===void 0&&(t=function(o){return ct.attachTo(o)}),this.navIcon=this.root.querySelector(y.NAVIGATION_ICON_SELECTOR);var n=[].slice.call(this.root.querySelectorAll(y.ACTION_ITEM_SELECTOR));this.navIcon&&n.push(this.navIcon),this.iconRipples=n.map(function(o){var a=t(o);return a.unbounded=!0,a}),this.scrollTarget=window},e.prototype.initialSyncWithDOM=function(){this.handleNavigationClick=this.foundation.handleNavigationClick.bind(this.foundation),this.handleWindowResize=this.foundation.handleWindowResize.bind(this.foundation),this.handleTargetScroll=this.foundation.handleTargetScroll.bind(this.foundation),this.scrollTarget.addEventListener("scroll",this.handleTargetScroll),this.navIcon&&this.navIcon.addEventListener("click",this.handleNavigationClick);var t=this.root.classList.contains(T.FIXED_CLASS),n=this.root.classList.contains(T.SHORT_CLASS);!n&&!t&&window.addEventListener("resize",this.handleWindowResize)},e.prototype.destroy=function(){var t,n;try{for(var o=it(this.iconRipples),a=o.next();!a.done;a=o.next()){var i=a.value;i.destroy()}}catch(p){t={error:p}}finally{try{a&&!a.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}this.scrollTarget.removeEventListener("scroll",this.handleTargetScroll),this.navIcon&&this.navIcon.removeEventListener("click",this.handleNavigationClick);var m=this.root.classList.contains(T.FIXED_CLASS),h=this.root.classList.contains(T.SHORT_CLASS);!h&&!m&&window.removeEventListener("resize",this.handleWindowResize),s.prototype.destroy.call(this)},e.prototype.setScrollTarget=function(t){this.scrollTarget.removeEventListener("scroll",this.handleTargetScroll),this.scrollTarget=t,this.handleTargetScroll=this.foundation.handleTargetScroll.bind(this.foundation),this.scrollTarget.addEventListener("scroll",this.handleTargetScroll)},e.prototype.getDefaultFoundation=function(){var t=this,n={hasClass:function(a){return t.root.classList.contains(a)},addClass:function(a){return t.root.classList.add(a)},removeClass:function(a){return t.root.classList.remove(a)},setStyle:function(a,i){return t.root.style.setProperty(a,i)},getTopAppBarHeight:function(){return t.root.clientHeight},notifyNavigationIconClicked:function(){return t.emit(y.NAVIGATION_EVENT,{})},getViewportScrollY:function(){var a=t.scrollTarget,i=t.scrollTarget;return a.pageYOffset!==void 0?a.pageYOffset:i.scrollTop},getTotalActionItems:function(){return t.root.querySelectorAll(y.ACTION_ITEM_SELECTOR).length}},o;return this.root.classList.contains(T.SHORT_CLASS)?o=new mt(n):this.root.classList.contains(T.FIXED_CLASS)?o=new Tt(n):o=new X(n),o},e}(lt);function gt(s){let e,t,n,o,a,i,m,h,p,f;return p=new _t({}),{c(){e=g("div"),t=g("header"),n=g("div"),o=g("section"),a=g("a"),i=U("Svelte Typed Context"),m=L(),h=g("section"),D(p.$$.fragment),this.h()},l(_){e=v(_,"DIV",{class:!0});var c=A(e);t=v(c,"HEADER",{class:!0});var r=A(t);n=v(r,"DIV",{class:!0});var l=A(n);o=v(l,"SECTION",{class:!0});var N=A(o);a=v(N,"A",{class:!0,href:!0});var z=A(a);i=Z(z,"Svelte Typed Context"),z.forEach(u),N.forEach(u),m=w(l),h=v(l,"SECTION",{class:!0,role:!0});var P=A(h);R(p.$$.fragment,P),P.forEach(u),l.forEach(u),r.forEach(u),c.forEach(u),this.h()},h(){d(a,"class","TopAppBar__title mdc-top-app-bar__title svelte-yv5eed"),d(a,"href",ot+"/"),d(o,"class","mdc-top-app-bar__section mdc-top-app-bar__section--align-start"),d(h,"class","mdc-top-app-bar__section mdc-top-app-bar__section--align-end"),d(h,"role","toolbar"),d(n,"class","mdc-top-app-bar__row"),d(t,"class","mdc-top-app-bar mdc-top-app-bar--fixed svelte-yv5eed"),d(e,"class","TopAppBar svelte-yv5eed")},m(_,c){C(_,e,c),S(e,t),S(t,n),S(n,o),S(o,a),S(a,i),S(n,m),S(n,h),$(p,h,null),s[1](t),f=!0},p:V,i(_){f||(E(p.$$.fragment,_),f=!0)},o(_){b(p.$$.fragment,_),f=!1},d(_){_&&u(e),H(p),s[1](null)}}}function vt(s,e,t){let n;J(()=>{const a=new St(n);return()=>{a.destroy()}});function o(a){K[a?"unshift":"push"](()=>{n=a,t(0,n)})}return[n,o]}class At extends M{constructor(e){super(),k(this,e,vt,gt,G,{})}}function Ct(s){let e,t,n,o,a,i,m,h,p,f;i=new At({});const _=s[2].default,c=Q(_,s,s[1],null);return p=new pt({}),{c(){e=g("meta"),n=g("meta"),a=L(),D(i.$$.fragment),m=L(),c&&c.c(),h=L(),D(p.$$.fragment),this.h()},l(r){const l=tt("svelte-p8qzr9",document.head);e=v(l,"META",{name:!0,content:!0}),n=v(l,"META",{name:!0,content:!0}),l.forEach(u),a=w(r),R(i.$$.fragment,r),m=w(r),c&&c.l(r),h=w(r),R(p.$$.fragment,r),this.h()},h(){d(e,"name","description"),d(e,"content",t=s[0].meta.description),d(n,"name","keywords"),d(n,"content",o=s[0].meta.keywords.join(", "))},m(r,l){S(document.head,e),S(document.head,n),C(r,a,l),$(i,r,l),C(r,m,l),c&&c.m(r,l),C(r,h,l),$(p,r,l),f=!0},p(r,[l]){(!f||l&1&&t!==(t=r[0].meta.description))&&d(e,"content",t),(!f||l&1&&o!==(o=r[0].meta.keywords.join(", ")))&&d(n,"content",o),c&&c.p&&(!f||l&2)&&et(c,_,r,r[1],f?at(_,r[1],l,null):nt(r[1]),null)},i(r){f||(E(i.$$.fragment,r),E(c,r),E(p.$$.fragment,r),f=!0)},o(r){b(i.$$.fragment,r),b(c,r),b(p.$$.fragment,r),f=!1},d(r){u(e),u(n),r&&u(a),H(i,r),r&&u(m),c&&c.d(r),r&&u(h),H(p,r)}}}function yt(s,e,t){let{$$slots:n={},$$scope:o}=e,{data:a}=e;return s.$$set=i=>{"data"in i&&t(0,a=i.data),"$$scope"in i&&t(1,o=i.$$scope)},[a,o,n]}class Lt extends M{constructor(e){super(),k(this,e,yt,Ct,G,{data:0})}}export{Lt as component,Ot as universal};

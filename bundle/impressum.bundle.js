/*! For license information please see impressum.bundle.js.LICENSE.txt */
(()=>{"use strict";const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;class s{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=n.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&n.set(i,e))}return e}toString(){return this.cssText}}const r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var o;const l=window,a=l.trustedTypes,d=a?a.emptyScript:"",h=l.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},c=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:c};class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const n=this._$Ep(i,t);void 0!==n&&(this._$Ev.set(n,i),e.push(n))})),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const s=this[e];this[t]=n,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var i;const n=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{t?i.adoptedStyleSheets=n.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,i.appendChild(n)}))})(n,this.constructor.elementStyles),n}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=p){var n;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$El=null}}_$AK(e,t){var i;const n=this.constructor,s=n._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=n.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=s,this[s]=r.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let n=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||c)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var m;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:g}),(null!==(o=l.reactiveElementVersions)&&void 0!==o?o:l.reactiveElementVersions=[]).push("1.6.1");const v=window,b=v.trustedTypes,f=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,_="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,A="?"+w,y=`<${A}>`,E=document,S=()=>E.createComment(""),k=e=>null===e||"object"!=typeof e&&"function"!=typeof e,z=Array.isArray,C="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,P=/>/g,I=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,x=/"/g,H=/^(?:script|style|textarea|title)$/i,T=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),R=T(1),W=(T(2),Symbol.for("lit-noChange")),D=Symbol.for("lit-nothing"),O=new WeakMap,V=E.createTreeWalker(E,129,null,!1),L=(e,t)=>{const i=e.length-1,n=[];let s,r=2===t?"<svg>":"",o=U;for(let t=0;t<i;t++){const i=e[t];let l,a,d=-1,h=0;for(;h<i.length&&(o.lastIndex=h,a=o.exec(i),null!==a);)h=o.lastIndex,o===U?"!--"===a[1]?o=M:void 0!==a[1]?o=P:void 0!==a[2]?(H.test(a[2])&&(s=RegExp("</"+a[2],"g")),o=I):void 0!==a[3]&&(o=I):o===I?">"===a[0]?(o=null!=s?s:U,d=-1):void 0===a[1]?d=-2:(d=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?I:'"'===a[3]?x:N):o===x||o===N?o=I:o===M||o===P?o=U:(o=I,s=void 0);const u=o===I&&e[t+1].startsWith("/>")?" ":"";r+=o===U?i+y:d>=0?(n.push(l),i.slice(0,d)+_+i.slice(d)+w+u):i+w+(-2===d?(n.push(void 0),t):u)}const l=r+(e[i]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==f?f.createHTML(l):l,n]};class B{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,r=0;const o=e.length-1,l=this.parts,[a,d]=L(e,t);if(this.el=B.createElement(a,i),V.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(n=V.nextNode())&&l.length<o;){if(1===n.nodeType){if(n.hasAttributes()){const e=[];for(const t of n.getAttributeNames())if(t.endsWith(_)||t.startsWith(w)){const i=d[r++];if(e.push(t),void 0!==i){const e=n.getAttribute(i.toLowerCase()+_).split(w),t=/([.?@])?(.*)/.exec(i);l.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?K:"?"===t[1]?J:"@"===t[1]?Q:Z})}else l.push({type:6,index:s})}for(const t of e)n.removeAttribute(t)}if(H.test(n.tagName)){const e=n.textContent.split(w),t=e.length-1;if(t>0){n.textContent=b?b.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],S()),V.nextNode(),l.push({type:2,index:++s});n.append(e[t],S())}}}else if(8===n.nodeType)if(n.data===A)l.push({type:2,index:s});else{let e=-1;for(;-1!==(e=n.data.indexOf(w,e+1));)l.push({type:7,index:s}),e+=w.length-1}s++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function j(e,t,i=e,n){var s,r,o,l;if(t===W)return t;let a=void 0!==n?null===(s=i._$Co)||void 0===s?void 0:s[n]:i._$Cl;const d=k(t)?void 0:t._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===d?a=void 0:(a=new d(e),a._$AT(e,i,n)),void 0!==n?(null!==(o=(l=i)._$Co)&&void 0!==o?o:l._$Co=[])[n]=a:i._$Cl=a),void 0!==a&&(t=j(e,a._$AS(e,t.values),a,n)),t}class F{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:n}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:E).importNode(i,!0);V.currentNode=s;let r=V.nextNode(),o=0,l=0,a=n[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new G(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new X(r,this,e)),this._$AV.push(t),a=n[++l]}o!==(null==a?void 0:a.index)&&(r=V.nextNode(),o++)}return V.currentNode=E,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{constructor(e,t,i,n){var s;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cp=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=j(this,e,t),k(e)?e===D||null==e||""===e?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>z(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==D&&k(this._$AH)?this._$AA.nextSibling.data=e:this.$(E.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:n}=e,s="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=B.createElement(n.h,this.options)),n);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new F(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=O.get(e.strings);return void 0===t&&O.set(e.strings,t=new B(e)),t}T(e){z(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new G(this.k(S()),this.k(S()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Z{constructor(e,t,i,n,s){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,n){const s=this.strings;let r=!1;if(void 0===s)e=j(this,e,t,0),r=!k(e)||e!==this._$AH&&e!==W,r&&(this._$AH=e);else{const n=e;let o,l;for(e=s[0],o=0;o<s.length-1;o++)l=j(this,n[i+o],t,o),l===W&&(l=this._$AH[o]),r||(r=!k(l)||l!==this._$AH[o]),l===D?e=D:e!==D&&(e+=(null!=l?l:"")+s[o+1]),this._$AH[o]=l}r&&!n&&this.j(e)}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class K extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===D?void 0:e}}const q=b?b.emptyScript:"";class J extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==D?this.element.setAttribute(this.name,q):this.element.removeAttribute(this.name)}}class Q extends Z{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=j(this,e,t,0))&&void 0!==i?i:D)===W)return;const n=this._$AH,s=e===D&&n!==D||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==D&&(n===D||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class X{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}}const Y=v.litHtmlPolyfillSupport;var ee,te;null==Y||Y(B,G),(null!==(m=v.litHtmlVersions)&&void 0!==m?m:v.litHtmlVersions=[]).push("2.7.4");class ie extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var n,s;const r=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:t;let o=r._$litPart$;if(void 0===o){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;r._$litPart$=o=new G(t.insertBefore(S(),e),e,void 0,null!=i?i:{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return W}}ie.finalized=!0,ie._$litElement$=!0,null===(ee=globalThis.litElementHydrateSupport)||void 0===ee||ee.call(globalThis,{LitElement:ie});const ne=globalThis.litElementPolyfillSupport;var se;null==ne||ne({LitElement:ie}),(null!==(te=globalThis.litElementVersions)&&void 0!==te?te:globalThis.litElementVersions=[]).push("3.3.2"),null===(se=window.HTMLSlotElement)||void 0===se||se.prototype.assignedElements;let re=class extends ie{createRenderRoot(){return this}constructor(){super(),this.resources=[],this.lcid="en",this.resources=function(){var e=new Array,t=new Array;e.hello_world="سلام جهان",e.direction="rtl",e.copyright="کلیه حقوق مادی و معنوی این سایت محفوظ می باشد.",e.nav_link_home="صفحه اصلی",e.nav_link_login="ورود",e.nav_link_register="ثبت نام",e.nav_link_logout="خروج",e.nav_link_admin_dashboard="داشبورد مدیریت",e.nav_link_forget_password="فراموشی کلمه عبور",e["/"]="صفحه اصلی",e["/index.html"]="صفحه اصلی",e["/login.html"]="ورود",e["/access-denied.html"]="ورود غیر مجاز",e["/register.html"]="ثبت نام",e["/my-home.html"]="صفحه من",e["/contact-us.html"]="ارتباط با ما",e["/about-us.html"]="درباره ما",e["/impressum.html"]="اثر",e.title_login="ورود به سامانه",e.subtitle_login="وارد شوید!",e.label_username="نام کاربری (پست الکترونیک):",e.label_password="کلمه عبور:",e.label_password_confirm="تکرار کلمه عبور:",e.label_remember_me="مرا به خاطر بسپار",e.label_firstname="نام:",e.label_lastname="نام خانوادگی:",e.label_mobile="موبایل:",e.label_email="پست الکترونیک:",e.msg_unauthorized="شما به این صفحه دسترسی ندارید.",e.msg_unauthorized_desc="در صورت نیاز با مدیریت تماس بگیرید.",e.msgIsRequired="اجباری است",e.msgLessThan8Chars="حداقل 8 کاراکتر باشد",e.msgInvalidUsernameOrPassword="نام کاربری یا کلمه عبور اشتباه است",e.msgPassAndPassConfirmNotSame="کلمه عبور و تایید آن یکی نیست",e.msgUsernameExists="نام کاربری تکراری است",e.msgTitleExists="عنوان تکراری است",e.msgInvalidCaptchaInput="کد امنیتی اشتباه است",e.msgSuccessfulCUD="عملیات با موفقیت انجام شد",t.hello_world="Hello World",t.direction="ltr",t.copyright="All rights reserved.",t.nav_link_home="Home",t.nav_link_login="Login",t.nav_link_register="Register",t.nav_link_logout="Sign out",t.nav_link_admin_dashboard="Admin dashboard",t.nav_link_forget_password="Forget Password",t["/"]="Home",t["/index.html"]="Home",t["/login.html"]="Login",t["/access-denied.html"]="Access Denied",t["/register.html"]="Register",t["/my-home.html"]="My Page",t["/contact-us.html"]="Contact Us",t["/about-us.html"]="About Us",t["/impressum.html"]="Impressum",t.title_login="Login to system",t.subtitle_login="login!",t.label_username="Username (Email):",t.label_password="Password:",t.label_password_confirm="Repeat Password:",t.label_remember_me="Remember Me",t.label_firstname="First Name:",t.label_lastname="Last Name:",t.label_mobile="Mobile:",t.label_email="Email:",t.msg_unauthorized="Unauthorized request.",t.msg_unauthorized_desc="Contact to admin team.",t.msgIsRequired="Required",t.msgLessThan8Chars="Minimum 8 characters",t.msgInvalidUsernameOrPassword="Username or Password is invalid",t.msgPassAndPassConfirmNotSame="Password and Repeat Password is not match",t.msgUsernameExists="Username is duplicated",t.msgTitleExists="Title is duplicated",t.msgInvalidCaptchaInput="Invalid captcha code input",t.msgSuccessfulCUD="Successfully submited";var i=new Array;return i.fa=e,i.en=t,i}()[this.lcid]}firstUpdated(e){$((()=>{}))}render(){return R`
<!-- Page Header Start -->
<div class="container-fluid page-header py-5">
    <div class="container text-center py-5">
        <h1 class="display-2 text-white mb-4 animated slideInDown">Impressum</h1>
    </div>
</div>
<!-- Page Header End -->

<div class="container-fluid text-center p-5">

    <p>
        <b>
            Offenlegung laut § 25 Mediengesetz
        </b>
    </p>
    <p>
        <b>
            Medieninhaber
        </b>
    </p>
    <p>
        MegaTech Co 
    </p>
    <p>
        <b>
            Die Adresse
        </b>
    </p>
    <p>
        Ludersdorf 247/2 / Bürozentrum 8200 Ludersdorf (Gleisdorf)
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Geschäftsführer:
        </b>
         Milad Tehrani
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Unternehmensgegenstand
        </b>
    </p>
    <p>
        &nbsp;Betrieb eines Onlinedienstes (Internet-Anzeigen-Portal und)
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Telefonnummer :&nbsp;
            <a href="tel:+4366499657071">
                +4366499657071
            </a>
        </b>
    </p>
    <p>
        <b>
            E-mail:
        </b>
         admin@megatechapp.at
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Kammer: 
        </b>
        Wirtschaftskammer Wien; Fachgruppe UBIT; Fachgruppe der gewerblichen Finanzdienstleister.
    </p>
    <p>
        <br>
    </p>
    <p>
        Anwendbare Vorschriften: Österr. Gewerbeordnung 
        <a href="https://www.ris.bka.gv.at/">
            https://www.ris.bka.gv.at/
        </a>
    </p>
    <p>
        Sofern die MegaTech im Zuge von "MegaTech" in Ausübung des Gewerbes unter 
    </p>
    <p>
        <a href="https://www.ris.bka.gv.at/">
            https://www.ris.bka.gv.at/
        </a>
    </p>
    <p>
        <br>
    </p>
    <p>
        MegaTech ist an folgendem Unternehmen unmittelbar beteiligt:
        <b>
             Mega Tech, Weiz
        </b>
    </p>
    <p>
        <b>
            <br>
        </b>
    </p>
    <p>
        <b>
            Kontakt:
        </b>
         Klick hier bzw. per E-Mail unter 
         <b>
            admin@Megatechapp.at
        </b>
    </p>
    <p>
        <b>
            <br>
        </b>
    </p>
    <p>
        Informationen für gewerbliche Kunden zur Mediation: Im Falle einer freiwilligen außergerichtlichen Beilegung von Streitigkeiten mit gewerblichen Nutzern ist MegaTech bereit mit verschiedene Mediationsstellen zusammenzuarbeiten. 
    </p>
    <p>
        <br>
    </p>
    <p>
        <b>
            Dem Stiftungsvorstand gehören an: Vorsitzender Generaldirektor
        </b>
    </p>
    <p>
        <b>
            1. Einverständnis
        </b>
    </p>
    <p>
        Megatech stellt Ihnen diese Website MegaTech Website“) und die Serviceleistungen auf Grundlage der folgenden Nutzungsbedingungen zur Verfügung. Durch Zugriff auf irgendeine Seite dieser MegaTech Website erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.
    </p>
    <p>
        <b>
            2. Geltungsbereich
        </b>
    </p>
    <p>
        MegaTech ist ausschließlich für Inhalte verantwortlich, die selbst erstellt, veröffentlicht und verbreitet werden. Die Nutzungsbedingungen gelten für die Inhalte der Website 
        <a href="http://www.Megatech.at">
            www.Megatech.at
        </a>
         sowie aller zu dieser Domain gehörenden Subdomains.
    </p>
    <p>
        <b>
            3. Copyright
        </b>
    </p>
    <p>
        Der gesamte Inhalt (Texte, Bilder, Illustrationen, Grafiken) der Megatech Website (sowie deren Subdomains) unterliegt dem Urheberrecht und anderen Gesetzen zum Schutze geistigen Eigentums. Falls nichts anders angegeben, ist niemand berechtigt, irgendwelche Informationen dieser Website zu kopieren oder wieder zu veröffentlichen. Die dargestellten Inhalte dieser Website dürfen in keiner Weise kopiert, reproduziert, wieder veröffentlicht, herunterladen, verschickt, übertragen oder verteilt werden. Ausschließlich für den nicht kommerziellen Eigengebrauch ist das Herunterladen von Informationen auf einen Computer gestattet, unter der Bedingung, dass das Urheberrecht und die anderen Eigentumsvorbehalte beachtet werden. Ausnahmen von der Regelung sind ausdrücklich durch den Hinweis „Download“ gekennzeichnet und sind mit der entsprechenden Download-Funktionalität hinterlegt.
    </p>
    <p>
        <b>
            4. Nutzung
        </b>
    </p>
    <p>
        Die Megatech Website steht Ihnen kostenlos zur Verfügung und darf nur für private, nicht kommerzielle Zwecke benutzt werden. Jede Art von Support zu Ihrer Unterstützung erfolgt ausschließlich um Sie zu informieren. Megatech behält sich das Recht vor, Änderungen an der Megatech Website vorzunehmen oder auf Anfragen nicht zu antworten oder keinen Support in Verbindung mit der Megatech Website anzubieten. Es ist nicht gestattet, Websites mit anstößigem oder anderweitig ungeeignetem Inhalt mit der Megatech Website zu verknüpfen oder zu verlinken. Auf Aufforderung von Megatech sind Sie verpflichtet, eine solche Verknüpfung rückgängig zu machen.
    </p>
    <p>
        <b>
            5. Haftungsbeschränkung
        </b>
    </p>
    <p>
        Megatech hat keinerlei Kontrolle über den Inhalt von Websites die außerhalb der Megatech Website liegen auf welche direkt oder indirekt durch „Hyperlinks“ Verweisen wurde. Ewand erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten hat Ewand keinerlei Einfluss. Deshalb distanziert Ewand sich hiermit ausdrücklich von allen Inhalten aller verlinkten /verknüpften Seiten, die nach der Linksetzung verändert wurden. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
    </p>
    <p>
        Die Ewand Website wird von Ihnen auf Ihr eigenes Risiko genutzt. Ewand ist nicht für Schäden verantwortlich, die Ihnen oder Dritten durch die Verwendung der Website entstehen. In jedem Fall ist die Haftung von Ewand für Einkommensausfälle oder entgangenen Gewinn, Verlust von Daten für direkte oder indirekte Schäden, gleich welcher Art, ausgeschlossen. Ewand haftet nicht für Schäden, die sich aus der Nutzung der Ewand Website oder in Verbindung mit der Nutzung, der Unmöglichkeit der Nutzung oder den Ergebnissen der Nutzung dieser Ewand Website, aller mit dieser Ewand Website verbundenen Websites oder dem Inhalt solcher Websites, einschließlich, jedoch nicht beschränkt auf Schäden die durch Fehler, Verzögerungen oder Unterbrechungen in der Übermittlung, bei Störungen der technischen Anlagen und des Services, unrichtige Inhalte, Verlust oder Löschung von Daten entstehen. Sowie Verluste oder Schäden durch Virenbefall Ihrer Computerausstattung, Software, Daten oder anderer Vermögenswerte, die durch Zugriff, Nutzung oder Browsen auf dieser Ewand Website oder durch das Herunterladen von Inhalten dieser Ewand Website oder anderen, mit dieser Ewand Website verbundenen Websites verursacht werden. Dies gilt nicht, soweit z.B. nach dem Produkthaftungsgesetz oder in Fällen des Vorsatzes zwingend gehaftet wird.
    </p>
    <p>
        Ewand schließt hiermit alle Zusicherungen, Gewährleistungen, Garantien oder sonstige Erklärungen in Bezug auf das Anbieten oder das beabsichtigte Anbieten, eine nicht erfolgte Ausführung oder eine verspätete Ausführung von Serviceleistungen in Verbindung mit der Ewand Website oder in Bezug auf Richtigkeit, Vollständigkeit oder Aktualität der Megatech Website aus.
    </p>
    <p>
        <b>
            6. Widerspruch Werbe-Mails
        </b>
    </p>
    <p>
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
    </p>
    <p>
        <b>
            7. Zugriffsdaten
        </b>
    </p>
    <p>
        Der Websitebetreiber bzw. Seitenprovider erhebt Daten über Zugriffe auf die Seite und speichert diese als „Server-Logfiles“ ab. Folgende Daten werden so protokolliert: Besuchte Website, Uhrzeit zum Zeitpunkt des Zugriffes, Menge der gesendeten Daten in Byte, Quelle/Verweis, von welchem Sie auf die Seite gelangten, Verwendeter Browser, Verwendetes Betriebssystem, Verwendete IP-Adresse (ggf.: in anonymisierter Form). Die erhobenen Daten dienen lediglich statistischen Auswertungen und zur Verbesserung der Website. Der Websitebetreiber behält sich allerdings vor, die Server-Logfiles nachträglich zu überprüfen, sollten konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
    </p>
    <p>
        <b>
            8. Anwendbares Recht
        </b>
    </p>
    <p>
        Diese Nutzungsbedingungen unterliegen österreichischem Recht. Ausschließlicher Gerichtsstand bei Streitfragen in Zusammenhang mit diesen Nutzungsbedingungen ist Wien, Österreich
    </p>

</div>
        `}};var oe;re=function(e,t,i,n){var s,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}([(oe="cms-impressum",e=>"function"==typeof e?((e,t)=>(customElements.define(e,t),t))(oe,e):((e,t)=>{const{kind:i,elements:n}=t;return{kind:i,elements:n,finisher(t){customElements.define(e,t)}}})(oe,e))],re)})();
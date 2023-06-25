(()=>{"use strict";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;class a{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}}const r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l;const n=window,o=n.trustedTypes,d=o?o.emptyScript:"",c=n.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},u=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:u};class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const a=this[t];this[e]=i,this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),a=t.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=p){var i;const a=this.constructor._$Ep(t,s);if(void 0!==a&&!0===s.reflect){const r=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:h).toAttribute(e,s.type);this._$El=t,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,a=i._$Ev.get(t);if(void 0!==a&&this._$El!==a){const t=i.getPropertyOptions(a),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:h;this._$El=a,this[a]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var v;m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:m}),(null!==(l=n.reactiveElementVersions)&&void 0!==l?l:n.reactiveElementVersions=[]).push("1.6.1");const f=window,g=f.trustedTypes,_=g?g.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,w="?"+y,x=`<${w}>`,A=document,S=()=>A.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,P=t=>C(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),U="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,N=/>/g,T=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,O=/"/g,k=/^(?:script|style|textarea|title)$/i,L=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),M=L(1),q=(L(2),Symbol.for("lit-noChange")),j=Symbol.for("lit-nothing"),D=new WeakMap,z=A.createTreeWalker(A,129,null,!1),B=(t,e)=>{const s=t.length-1,i=[];let a,r=2===e?"<svg>":"",l=I;for(let e=0;e<s;e++){const s=t[e];let n,o,d=-1,c=0;for(;c<s.length&&(l.lastIndex=c,o=l.exec(s),null!==o);)c=l.lastIndex,l===I?"!--"===o[1]?l=R:void 0!==o[1]?l=N:void 0!==o[2]?(k.test(o[2])&&(a=RegExp("</"+o[2],"g")),l=T):void 0!==o[3]&&(l=T):l===T?">"===o[0]?(l=null!=a?a:I,d=-1):void 0===o[1]?d=-2:(d=l.lastIndex-o[2].length,n=o[1],l=void 0===o[3]?T:'"'===o[3]?O:H):l===O||l===H?l=T:l===R||l===N?l=I:(l=T,a=void 0);const h=l===T&&t[e+1].startsWith("/>")?" ":"";r+=l===I?s+x:d>=0?(i.push(n),s.slice(0,d)+b+s.slice(d)+y+h):s+y+(-2===d?(i.push(void 0),e):h)}const n=r+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==_?_.createHTML(n):n,i]};class W{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let a=0,r=0;const l=t.length-1,n=this.parts,[o,d]=B(t,e);if(this.el=W.createElement(o,s),z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=z.nextNode())&&n.length<l;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(b)||e.startsWith(y)){const s=d[r++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+b).split(y),e=/([.?@])?(.*)/.exec(s);n.push({type:1,index:a,name:e[2],strings:t,ctor:"."===e[1]?Y:"?"===e[1]?Q:"@"===e[1]?X:K})}else n.push({type:6,index:a})}for(const e of t)i.removeAttribute(e)}if(k.test(i.tagName)){const t=i.textContent.split(y),e=t.length-1;if(e>0){i.textContent=g?g.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],S()),z.nextNode(),n.push({type:2,index:++a});i.append(t[e],S())}}}else if(8===i.nodeType)if(i.data===w)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=i.data.indexOf(y,t+1));)n.push({type:7,index:a}),t+=y.length-1}a++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function V(t,e,s=t,i){var a,r,l,n;if(e===q)return e;let o=void 0!==i?null===(a=s._$Co)||void 0===a?void 0:a[i]:s._$Cl;const d=E(e)?void 0:e._$litDirective$;return(null==o?void 0:o.constructor)!==d&&(null===(r=null==o?void 0:o._$AO)||void 0===r||r.call(o,!1),void 0===d?o=void 0:(o=new d(t),o._$AT(t,s,i)),void 0!==i?(null!==(l=(n=s)._$Co)&&void 0!==l?l:n._$Co=[])[i]=o:s._$Cl=o),void 0!==o&&(e=V(t,o._$AS(t,e.values),o,i)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,a=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(s,!0);z.currentNode=a;let r=z.nextNode(),l=0,n=0,o=i[0];for(;void 0!==o;){if(l===o.index){let e;2===o.type?e=new J(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new G(r,this,t)),this._$AV.push(e),o=i[++n]}l!==(null==o?void 0:o.index)&&(r=z.nextNode(),l++)}return z.currentNode=A,a}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class J{constructor(t,e,s,i){var a;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(a=null==i?void 0:i.isConnected)||void 0===a||a}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),E(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):P(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&E(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=W.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===a)this._$AH.v(s);else{const t=new F(a,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=D.get(t.strings);return void 0===e&&D.set(t.strings,e=new W(t)),e}T(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const a of t)i===e.length?e.push(s=new J(this.k(S()),this.k(S()),this,this.options)):s=e[i],s._$AI(a),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,s,i,a){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const a=this.strings;let r=!1;if(void 0===a)t=V(this,t,e,0),r=!E(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const i=t;let l,n;for(t=a[0],l=0;l<a.length-1;l++)n=V(this,i[s+l],e,l),n===q&&(n=this._$AH[l]),r||(r=!E(n)||n!==this._$AH[l]),n===j?t=j:t!==j&&(t+=(null!=n?n:"")+a[l+1]),this._$AH[l]=n}r&&!i&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Y extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Z=g?g.emptyScript:"";class Q extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class X extends K{constructor(t,e,s,i,a){super(t,e,s,i,a),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=V(this,t,e,0))&&void 0!==s?s:j)===q)return;const i=this._$AH,a=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==j&&(i===j||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class G{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const tt=f.litHtmlPolyfillSupport;null==tt||tt(W,J),(null!==(v=f.litHtmlVersions)&&void 0!==v?v:f.litHtmlVersions=[]).push("2.7.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,st;class it extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,a;const r=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let l=r._$litPart$;if(void 0===l){const t=null!==(a=null==s?void 0:s.renderBefore)&&void 0!==a?a:null;r._$litPart$=l=new J(e.insertBefore(S(),t),t,void 0,null!=s?s:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return q}}it.finalized=!0,it._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:it});const at=globalThis.litElementPolyfillSupport;null==at||at({LitElement:it});(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt;null===(rt=window.HTMLSlotElement)||void 0===rt||rt.prototype.assignedElements;var lt=function(t,e,s,i){var a,r=arguments.length,l=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,s,i);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(l=(r<3?a(l):r>3?a(e,s,l):a(e,s))||l);return r>3&&l&&Object.defineProperty(e,s,l),l};let nt=class extends it{createRenderRoot(){return this}constructor(){super(),this.resources=[],this.lcid="en",this.resources=function(){var t=new Array,e=new Array;t.hello_world="سلام جهان",t.direction="rtl",t.copyright="کلیه حقوق مادی و معنوی این سایت محفوظ می باشد.",t.nav_link_home="صفحه اصلی",t.nav_link_login="ورود",t.nav_link_register="ثبت نام",t.nav_link_logout="خروج",t.nav_link_admin_dashboard="داشبورد مدیریت",t.nav_link_profile="پروفایل",t.nav_link_forget_password="فراموشی کلمه عبور",t["/"]="صفحه اصلی",t["/index.html"]="صفحه اصلی",t["/login.html"]="ورود",t["/access-denied.html"]="ورود غیر مجاز",t["/register.html"]="ثبت نام",t["/profile.html"]="پروفایل",t["/my-home.html"]="صفحه من",t["/contact-us.html"]="ارتباط با ما",t["/about-us.html"]="درباره ما",t["/impressum.html"]="اثر",t.title_login="ورود به سامانه",t.subtitle_login="وارد شوید!",t.tab_title_editprofile="ویرایش پروفایل",t.tab_title_resetpassword="تغییر کلمه عبور",t.label_username="نام کاربری (پست الکترونیک):",t.label_password="کلمه عبور:",t.label_password_confirm="تکرار کلمه عبور:",t.label_remember_me="مرا به خاطر بسپار",t.label_firstname="نام:",t.label_lastname="نام خانوادگی:",t.label_mobile="موبایل:",t.label_email="پست الکترونیک:",t.label_currentpassword="کلمه عبور فعلی:",t.btn_submit="ثبت",t.btn_edit="ویرایش",t.msg_unauthorized="شما به این صفحه دسترسی ندارید.",t.msg_unauthorized_desc="در صورت نیاز با مدیریت تماس بگیرید.",t.msgIsRequired="اجباری است",t.msgLessThan8Chars="حداقل 8 کاراکتر باشد",t.msgInvalidUsernameOrPassword="نام کاربری یا کلمه عبور اشتباه است",t.msgPassAndPassConfirmNotSame="کلمه عبور و تایید آن یکی نیست",t.msgUsernameExists="نام کاربری تکراری است",t.msgTitleExists="عنوان تکراری است",t.msgInvalidCaptchaInput="کد امنیتی اشتباه است",t.msgSuccessfulCUD="عملیات با موفقیت انجام شد",e.hello_world="Hello World",e.direction="ltr",e.copyright="All rights reserved.",e.nav_link_home="Home",e.nav_link_login="Login",e.nav_link_register="Register",e.nav_link_logout="Sign out",e.nav_link_admin_dashboard="Admin dashboard",e.nav_link_profile="Profile",e.nav_link_forget_password="Forget Password",e["/"]="Home",e["/index.html"]="Home",e["/login.html"]="Login",e["/access-denied.html"]="Access Denied",e["/register.html"]="Register",e["/profile.html"]="Profile",e["/my-home.html"]="My Page",e["/contact-us.html"]="Contact Us",e["/about-us.html"]="About Us",e["/impressum.html"]="Impressum",e.title_login="Login to system",e.subtitle_login="login!",e.tab_title_editprofile="Edit Profile",e.tab_title_resetpassword="Reset Password",e.label_username="Username (Email):",e.label_password="Password:",e.label_password_confirm="Repeat Password:",e.label_remember_me="Remember Me",e.label_firstname="First Name:",e.label_lastname="Last Name:",e.label_mobile="Mobile:",e.label_email="Email:",e.label_currentpassword="Current Password:",e.btn_submit="Submit",e.btn_edit="Edit",e.msg_unauthorized="Unauthorized request.",e.msg_unauthorized_desc="Contact to admin team.",e.msgIsRequired="Required",e.msgLessThan8Chars="Minimum 8 characters",e.msgInvalidUsernameOrPassword="Username or Password is invalid",e.msgPassAndPassConfirmNotSame="Password and Repeat Password is not match",e.msgUsernameExists="Username is duplicated",e.msgTitleExists="Title is duplicated",e.msgInvalidCaptchaInput="Invalid captcha code input",e.msgSuccessfulCUD="Successfully submited";var s=new Array;return s.fa=t,s.en=e,s}()[this.lcid]}firstUpdated(t){$((()=>{$(".owl-carousel").owlCarousel()}))}render(){return M`
<!-- Carousel Start -->
<div class="container-fluid px-0">
    <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li data-bs-target="#carouselId" data-bs-slide-to="0" class="active" aria-current="true" aria-label="First slide"></li>
            <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
                <img src="/images/carousel-1.jpg" class="img-fluid" alt="First slide">
                <div class="carousel-caption">
                    <div class="container carousel-content">
                        <h6 class="text-secondary h4 animated fadeInUp">Best IT Solutions</h6>
                        <h1 class="text-white display-1 mb-4 animated fadeInRight">An Innovative IT Solutions Agency</h1>
                        <p class="mb-4 text-white fs-5 animated fadeInDown">
                            IT-Outsourcing, Strong Design, Network & Webstie Security, Advantages, Low Price, High Speed, Support 24/7
                        </p>
                        <a href="/about-us.html" class="me-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">About Us</button></a>
                        <a href="/contact-us.html" class="ms-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Contact Us</button></a>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/images/carousel-2.jpg" class="img-fluid" alt="Second slide">
                <div class="carousel-caption">
                    <div class="container carousel-content">
                        <h6 class="text-secondary h4 animated fadeInUp">Best IT Solutions</h6>
                        <h1 class="text-white display-1 mb-4 animated fadeInLeft">Quality Digital Services You Really Need!</h1>
                        <p class="mb-4 text-white fs-5 animated fadeInDown">
                            IT-Outsourcing, Strong Design, Network & Webstie Security, Advantages, Low Price, High Speed, Support 24/7
                        </p>
                        <a href="/about-us.html" class="me-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">About Us</button></a>
                        <a href="/contact-us.html" class="ms-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Contact Us</button></a>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>
<!-- Carousel End -->

<!-- Fact Start -->
<div class="container-fluid bg-secondary py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".1s">
                <div class="d-flex counter">
                    <h1 class="me-3 text-primary counter-value">99</h1>
                    <h5 class="text-white mt-1">Success in getting happy customer</h5>
                </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".3s">
                <div class="d-flex counter">
                    <h1 class="me-3 text-primary counter-value">25</h1>
                    <h5 class="text-white mt-1">Thousands of successful business</h5>
                </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".5s">
                <div class="d-flex counter">
                    <h1 class="me-3 text-primary counter-value">120</h1>
                    <h5 class="text-white mt-1">Total clients who love HighTech</h5>
                </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".7s">
                <div class="d-flex counter">
                    <h1 class="me-3 text-primary counter-value">5</h1>
                    <h5 class="text-white mt-1">Stars reviews given by satisfied clients</h5>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Fact End -->

<!-- Services Start -->
<div class="container-fluid services py-5 mb-5">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Services</h5>
            <h1>Services Built Specifically For Your Business</h1>
        </div>
        <div class="row g-5 services-inner">
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fa fa-code fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Web Design</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fa fa-file-code fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Web Development</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fa fa-external-link-alt fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">UI/UX Design</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fas fa-user-secret fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Web Security</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fa fa-envelope-open fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Digital Marketing</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fas fa-laptop fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Programming</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Services End -->

<!-- Project Start -->
<div class="container-fluid project py-5 mb-5">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Project</h5>
            <h1>Our Recently Completed Projects</h1>
        </div>
        <div class="row g-5">
            <div class="col-md-6 wow fadeIn" data-wow-delay=".5s">
                <div class="project-item">
                    <div class="project-img">
                        <img src="/images/project-2.jpg" class="img-fluid w-100 rounded" alt="">
                        <div class="project-content">
                            <a href="#" class="text-center">
                                <h4 class="text-secondary">Web design</h4>
                                <p class="m-0 text-white">Web Analysis</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 wow fadeIn" data-wow-delay=".5s">
                <div class="project-item">
                    <div class="project-img">
                        <img src="/images/project-1.jpg" class="img-fluid w-100 rounded" alt="">
                        <div class="project-content">
                            <a href="#" class="text-center">
                                <h4 class="text-secondary">Cyber Security</h4>
                                <p class="m-0 text-white">Cyber Security Core</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Project End -->

<!-- Testimonial Start -->
<div class="container-fluid testimonial py-5 mb-5">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Testimonial</h5>
            <h1>Our Client Saying!</h1>
        </div>
        <div class="owl-carousel testimonial-carousel wow fadeIn" data-wow-delay=".5s">
            <div class="testimonial-item border p-4">
                <div class="d-flex align-items-center">
                    <div class="">
                        <img src="/images/avatar.png" alt="">
                    </div>
                    <div class="ms-4">
                        <h4 class="text-secondary">Client Name</h4>
                        <p class="m-0 pb-3">Profession</p>
                        <div class="d-flex pe-5">
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="border-top mt-4 pt-3">
                    <!-- <p class="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p> -->
                </div>
            </div>
            <div class="testimonial-item border p-4">
                <div class=" d-flex align-items-center">
                    <div class="">
                        <img src="/images/avatar.png" alt="">
                    </div>
                    <div class="ms-4">
                        <h4 class="text-secondary">Client Name</h4>
                        <p class="m-0 pb-3">Profession</p>
                        <div class="d-flex pe-5">
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="border-top mt-4 pt-3">
                    <!-- <p class="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p> -->
                </div>
            </div>
            <div class="testimonial-item border p-4">
                <div class=" d-flex align-items-center">
                    <div class="">
                        <img src="/images/avatar.png" alt="">
                    </div>
                    <div class="ms-4">
                        <h4 class="text-secondary">Client Name</h4>
                        <p class="m-0 pb-3">Profession</p>
                        <div class="d-flex pe-5">
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="border-top mt-4 pt-3">
                    <!-- <p class="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p> -->
                </div>
            </div>
            <div class="testimonial-item border p-4">
                <div class=" d-flex align-items-center">
                    <div class="">
                        <img src="/images/avatar.png" alt="">
                    </div>
                    <div class="ms-4">
                        <h4 class="text-secondary">Client Name</h4>
                        <p class="m-0 pb-3">Profession</p>
                        <div class="d-flex pe-5">
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="border-top mt-4 pt-3">
                    <!-- <p class="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p> -->
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Testimonial End -->
        `}};nt=lt([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){customElements.define(t,e)}}})(t,e))("cms-index")],nt)})();
(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{149:function(t,e,n){"use strict";function r(t,p){return(r=Object.setPrototypeOf||function(t,p){return t.__proto__=p,t})(t,p)}n.d(e,"a",(function(){return r}))},150:function(t,e,n){var content=n(161);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(53).default)("46b7259b",content,!0,{sourceMap:!1})},151:function(t,e,n){"use strict";function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.d(e,"a",(function(){return r}))},152:function(t,e,n){"use strict";function r(t){this.wrapped=t}n.d(e,"a",(function(){return r}))},153:function(t,e,n){"use strict";function r(t){return function(t){if(Array.isArray(t)){for(var i=0,e=new Array(t.length);i<t.length;i++)e[i]=t[i];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(e,"a",(function(){return r}))},154:function(t,e,n){"use strict";n(54),n(27),n(18),n(37);var r=n(156),o=n(153),c=n(20),d=(n(26),n(11),n(157)),f=n(175),l=n(151),h=n(158),m=n(174),v=n(159),w=n(176);function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y,k=window.chrome,j=function(t){function e(t){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Object(d.a)(this,e),(n=Object(f.a)(this,Object(l.a)(e).call(this,r))).status=t,n.error=r,n.message="InstagramError ".concat(t,": ").concat(r.response?r.response.message:r.message),n.response=r.response,n}return Object(h.a)(e,t),e}(Object(m.a)(Error)),O=function(t){function e(){return Object(d.a)(this,e),Object(f.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(h.a)(e,t),e}(Object(m.a)(Error)),R=function(t){function e(){return Object(d.a)(this,e),Object(f.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(h.a)(e,t),e}(Object(m.a)(Error)),S=(y=Date.now(),function(){return y++}),P=new function t(){var e,n,c=this;Object(d.a)(this,t),this._currend_id="",this._instaweb_dev_id="cpdladhooojkckopdeojpmlmchhafpbi",this._instaweb_id="njonkbhnmmjgancfbncekpgkmidhbbpo",this._instaweb_crx_id="dnedbabonakgpmjfljhcbbilaecnincc",this._instaweb_zane_id="pojjhkcplleefbpdoigadcamejkpakbk",this._instaweb_beta_id="jghojnhopgonfbjbgbdmojpeilcmdajp",this.isStopped=!1,this.isConnected=!1,this.port=null,this.info={},this._check_working_id=function(){return new Promise((function(t,e){setTimeout((function(){return e(new R("Cant find any working extension"))}),500),k.runtime.sendMessage(c._instaweb_zane_id,{method:"ping"},null,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.status,r=e.pong;return"ok"===n&&r&&t(c._instaweb_zane_id)})),k.runtime.sendMessage(c._instaweb_dev_id,{method:"ping"},null,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.status,r=e.pong;return"ok"===n&&r&&t(c._instaweb_dev_id)})),k.runtime.sendMessage(c._instaweb_beta_id,{method:"ping"},null,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.status,r=e.pong;return"ok"===n&&r&&t(c._instaweb_beta_id)})),k.runtime.sendMessage(c._instaweb_crx_id,{method:"ping"},null,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.status,r=e.pong;return"ok"===n&&r&&t(c._instaweb_crx_id)})),k.runtime.sendMessage(c._instaweb_id,{method:"ping"},null,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.status,r=e.pong;return"ok"===n&&r&&t(c._instaweb_id)}))}))},this._try_connect_port=function(){return new Promise((function(t,e){var n=k.runtime.connect(c._currend_id);n.onDisconnect.addListener((function(){return t(null)})),setTimeout((function(){t(n)}),100)}))},this.init=function(){return regeneratorRuntime.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,regeneratorRuntime.awrap(c._check_working_id());case 3:return c._currend_id=t.sent,t.next=6,regeneratorRuntime.awrap(c._try_connect_port());case 6:return c.port=t.sent,c.isConnected=!0,t.next=10,regeneratorRuntime.awrap(c.request({method:"version"},!0));case 10:c.info=t.sent,t.next=19;break;case 13:if(t.prev=13,t.t0=t.catch(0),!(t.t0 instanceof O)){t.next=18;break}return c.isConnected=!1,t.abrupt("return");case 18:throw t.t0;case 19:case"end":return t.stop()}}),null,null,[[0,13]])},this.start=function(){return c.isStopped=!1},this.kill=function(){return c.isStopped=!0},this.request=function(data){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise((function(e,n){var r=!c.isStopped;if(t&&!r&&c.start(),c.isStopped)return n(new Error("Request was skipped"));if(!c.isConnected)return n(new R);setTimeout((function(){return n(new O("Request timeout"))}),1e4);var o=S(),d=function t(r){if(!r)return n(new R);var d=r.status,f=r.error;if(o===r.req_id){if(console.log("request",data.method,"->",d,r),"ok"!==d){P.kill();var l=new j(d,f);console.log("error",l),n(l)}else e(r);c.port&&c.port.onMessage.removeListener(t)}};if(console.log("send_message",c._currend_id,data),c.port){var f=function(){c.port.onMessage.addListener(d),c.port.postMessage(_({req_id:o},data))};try{f()}catch(t){c.init().then((function(){return f()}))}}else k.runtime.sendMessage(c._currend_id,data,null,d);t&&!r&&c.kill()}))},this.request_generator=(e=Object(w.a)(regeneratorRuntime.mark((function t(e){var n,r,c,d,f,l,h,m=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.method,r=e.params,c=m.length>1&&void 0!==m[1]?m[1]:1/0,d=[],f=this.page_generator({method:n,params:r});case 4:return l=f.next(),h=l.users,console.log("users",h),d=[].concat(Object(o.a)(d),Object(o.a)(h)),t.next=9,h;case 9:if(t.sent,!(d.length>c)){t.next=12;break}return t.abrupt("return",d);case 12:t.next=4;break;case 13:case"end":return t.stop()}}),t,this)}))),function(t){return e.apply(this,arguments)}),this.page_generator=(n=Object(w.a)(regeneratorRuntime.mark((function t(e){var n,c,d,f,l,h,m,w;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.method,c=e.params,d=c;case 2:return f={method:n,params:d},t.next=5,Object(v.a)(P.request(f));case 5:return l=t.sent,h=l.big_list,m=l.next_max_id,w=Object(r.a)(l,["big_list","next_max_id"]),console.log("big_list",h,"next_max_id",m),t.next=12,w;case 12:if(!t.sent&&m){t.next=15;break}return t.abrupt("return");case 15:d=[].concat(Object(o.a)(c),[m]);case 16:t.next=2;break;case 17:case"end":return t.stop()}}),t)}))),function(t){return n.apply(this,arguments)})};window.instagram=P;var E=P,M=function(t){return regeneratorRuntime.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",E.request({method:"get_user_info",params:[t]},!0));case 1:case"end":return e.stop()}}))},C=function(t){return regeneratorRuntime.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",E.request({method:"get_inbox",params:[t]},!0));case 1:case"end":return e.stop()}}))},L=function(t,e){return regeneratorRuntime.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(t){n.next=2;break}return n.abrupt("return",{thread:null});case 2:return n.abrupt("return",E.request({method:"get_thread",params:[t,e]},!0));case 3:case"end":return n.stop()}}))},z=function(t,text){var e,n,r,o,c,d;return regeneratorRuntime.async((function(f){for(;;)switch(f.prev=f.next){case 0:if(e=t.thread,n=t.users,!(r=t.username)){f.next=7;break}return f.next=4,regeneratorRuntime.awrap(M(r));case 4:o=f.sent,c=o.user.pk,n=[c];case 7:return d=["text",{text:text,users:n,thread:e}],f.abrupt("return",E.request({method:"send_direct_item",params:d},!0));case 9:case"end":return f.stop()}}))},D=function(){return regeneratorRuntime.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,regeneratorRuntime.awrap(E.request({method:"get_presence"},!0));case 3:return t.abrupt("return",t.sent);case 6:return t.prev=6,t.t0=t.catch(0),t.abrupt("return",{user_presence:{},status:"not_available"});case 9:case"end":return t.stop()}}),null,null,[[0,6]])},I=function(t,e){return regeneratorRuntime.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",E.request({method:"mark_direct_seen",params:[t,e]},!0));case 1:case"end":return n.stop()}}))};n.d(e,"b",(function(){return C})),n.d(e,"d",(function(){return L})),n.d(e,"c",(function(){return D})),n.d(e,"f",(function(){return z})),n.d(e,"e",(function(){return I}));e.a=E},155:function(t,e,n){"use strict";n(69),n(70);var r={props:{label:{type:String},type:{type:String,default:"default"},isLoading:{type:Boolean,default:!1},design:{type:String,default:"primary",validator:function(t){return["primary","text"].includes(t)}}},methods:{handleClick:function(t){this.$emit("click",t)}}},o=(n(160),n(17)),component=Object(o.a)(r,(function(){var t,e=this,n=e.$createElement;return(e._self._c||n)("button",{class:(t={loading:e.isLoading},t[e.design]=!0,t),attrs:{type:e.type,disabled:e.isLoading},on:{click:e.handleClick}},[e._v("\n  "+e._s(e.label)+"\n")])}),[],!1,null,"fe1f914c",null);e.a=component.exports},156:function(t,e,n){"use strict";function r(source,t){if(null==source)return{};var e,i,n=function(source,t){if(null==source)return{};var e,i,n={},r=Object.keys(source);for(i=0;i<r.length;i++)e=r[i],t.indexOf(e)>=0||(n[e]=source[e]);return n}(source,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(source);for(i=0;i<r.length;i++)e=r[i],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(source,e)&&(n[e]=source[e])}return n}n.d(e,"a",(function(){return r}))},157:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",(function(){return r}))},158:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(149);function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Object(r.a)(t,e)}},159:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(152);function o(t){return new r.a(t)}},160:function(t,e,n){"use strict";var r=n(150);n.n(r).a},161:function(t,e,n){(t.exports=n(52)(!1)).push([t.i,"button[data-v-fe1f914c]{-webkit-appearance:none;text-transform:uppercase;text-align:center;line-height:38px;height:40px;font-weight:500;font-size:12px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;text-decoration:none;padding:0 25px;border-radius:5px;border-width:1px;border-style:solid;-webkit-transition:all .2s ease 0s;transition:all .2s ease 0s;overflow:hidden;outline:none}button.primary[data-v-fe1f914c]{color:#fff;background-color:#000;border-color:#000}button.primary[data-v-fe1f914c]:hover{color:#000;background:#fff}button.text[data-v-fe1f914c]{line-height:22px;height:35px;color:#666;background-color:transparent;padding:0 10px;border-color:transparent}button.text[data-v-fe1f914c]:hover{color:#000}button.loading[data-v-fe1f914c]{color:#ccc;cursor:default;pointer-events:none;background:#fafafa;border-color:#eaeaea}",""])},162:function(t,e,n){var content=n(308);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(53).default)("3c4cbc48",content,!0,{sourceMap:!1})},174:function(t,e,n){"use strict";var r=n(151),o=n(149);function c(t,e,n){return(c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,n){var a=[null];a.push.apply(a,e);var r=new(Function.bind.apply(t,a));return n&&Object(o.a)(r,n.prototype),r}).apply(null,arguments)}function d(t){var e="function"==typeof Map?new Map:void 0;return(d=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,d)}function d(){return c(t,arguments,Object(r.a)(this).constructor)}return d.prototype=Object.create(t.prototype,{constructor:{value:d,enumerable:!1,writable:!0,configurable:!0}}),Object(o.a)(d,t)})(t)}n.d(e,"a",(function(){return d}))},175:function(t,e,n){"use strict";var r=n(24);function o(t,e){return!e||"object"!==Object(r.a)(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}n.d(e,"a",(function(){return o}))},176:function(t,e,n){"use strict";var r=n(152);function o(t){var e,n;function o(e,n){try{var d=t[e](n),f=d.value,l=f instanceof r.a;Promise.resolve(l?f.wrapped:f).then((function(t){l?o("next",t):c(d.done?"return":"normal",t)}),(function(t){o("throw",t)}))}catch(t){c("throw",t)}}function c(t,r){switch(t){case"return":e.resolve({value:r,done:!0});break;case"throw":e.reject(r);break;default:e.resolve({value:r,done:!1})}(e=e.next)?o(e.key,e.arg):n=null}this._invoke=function(t,r){return new Promise((function(c,d){var f={key:t,arg:r,resolve:c,reject:d,next:null};n?n=n.next=f:(e=n=f,o(t,r))}))},"function"!=typeof t.return&&(this.return=void 0)}function c(t){return function(){return new o(t.apply(this,arguments))}}"function"==typeof Symbol&&Symbol.asyncIterator&&(o.prototype[Symbol.asyncIterator]=function(){return this}),o.prototype.next=function(t){return this._invoke("next",t)},o.prototype.throw=function(t){return this._invoke("throw",t)},o.prototype.return=function(t){return this._invoke("return",t)},n.d(e,"a",(function(){return c}))},307:function(t,e,n){"use strict";var r=n(162);n.n(r).a},308:function(t,e,n){(t.exports=n(52)(!1)).push([t.i,".container[data-v-49d84fd9]{height:calc(100vh - 100px);width:100vw;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}h1[data-v-49d84fd9]{margin-bottom:60px;font-weight:400;font-size:36px;text-align:center}form[data-v-49d84fd9]{background-color:#fff;box-shadow:0 2px 5px 0 rgba(0,0,0,.12);border-radius:5px;padding:30px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;max-width:90vw;width:360px}input[data-v-49d84fd9]{border:1px solid #e1e1e1;border-radius:5px;margin-bottom:20px;font-size:14px;line-height:27px;padding:4px 10px;-webkit-transition:border .3s ease;transition:border .3s ease;-webkit-appearance:none}input[data-v-49d84fd9]:focus{border:1px solid #888}input[data-v-49d84fd9]::-webkit-input-placeholder{color:#ccc}input[data-v-49d84fd9]::-moz-placeholder{color:#ccc}input[data-v-49d84fd9]:-ms-input-placeholder{color:#ccc}input[data-v-49d84fd9]::-ms-input-placeholder{color:#ccc}input[data-v-49d84fd9]::placeholder{color:#ccc}input[data-v-49d84fd9]:disabled{cursor:not-allowed;background-color:hsla(0,0%,71.8%,.15);color:#999}.error[data-v-49d84fd9]{color:#ff001f;text-align:center;margin-bottom:20px}.alert[data-v-49d84fd9]{border:1px solid #f48121;padding:16px 24px;border-radius:4px;background:var(--geist-background);font-size:14px;line-height:1.8;max-width:90vw;width:360px;margin-top:20px}.alert span[data-v-49d84fd9]{color:#f5a623;text-transform:uppercase;font-weight:500}footer[data-v-49d84fd9]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:100%;height:100px}footer a[data-v-49d84fd9]{color:#999;text-decoration:none;-webkit-transition:all .2s ease 0s;transition:all .2s ease 0s}footer a[data-v-49d84fd9]:not(:last-child){padding-right:15px;margin-right:15px;border-right:1px solid #d6d6d6}footer a[data-v-49d84fd9]:hover{color:#000}footer a svg[data-v-49d84fd9]{fill:currentColor}@media (max-width:700px){.container[data-v-49d84fd9]{height:calc(100vh - 60px)}h1[data-v-49d84fd9]{font-size:24px;margin-bottom:30px}form[data-v-49d84fd9]{padding:20px}.alert[data-v-49d84fd9]{padding:10px 12px}footer[data-v-49d84fd9]{height:60px}}",""])},344:function(t,e,n){"use strict";n.r(e);n(26);var r=n(154),o=n(155);window.instagram=r.a;var c={components:{Button:o.a},head:function(){return{title:"Login - Instagram Direct Messaging"}},created:function(){var t=this;return regeneratorRuntime.async((function(e){for(;;)switch(e.prev=e.next){case 0:r.a.init().then((function(){return r.a.request({method:"check_login"},!0)})).then((function(e){var n=e.user;n&&(t.username=n.username)}));case 1:case"end":return e.stop()}}))},data:function(){return{username:null,password:null,isLoading:!1,error:null}},methods:{onSubmit:function(){var t,e;return regeneratorRuntime.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,this.isLoading=!0,n.next=4,regeneratorRuntime.awrap(r.a.init());case 4:return n.next=6,regeneratorRuntime.awrap(r.a.request({method:"check_login"},!0));case 6:t=n.sent,(e=t.user)?(this.username=e.username,window.location.href="/"):this.error="Not logged in at Gram Up!",n.next=14;break;case 11:n.prev=11,n.t0=n.catch(0),this.error="Not installed Gram Up! or not logged in. Press Gram Up! logo in Chrome bar";case 14:return n.prev=14,this.isLoading=!1,n.finish(14);case 17:case"end":return n.stop()}}),null,this,[[0,11,14,17]])}}},d=(n(307),n(17)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("section",{staticClass:"container"},[n("h1",[t._v("Direct Messages in Browser")]),t._v(" "),n("form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[t._m(0),t._v(" "),n("i",[t._v("\n        (Requires v1.5)\n      ")]),t._v(" "),n("br"),t._v(" "),t.error?n("div",{staticClass:"error"},[t._v(t._s(t.error))]):t._e(),t._v(" "),n("p",[t._v("\n        Connected:\n        "),t.username?n("strong",[t._v("@"+t._s(t.username))]):t._e()]),t._v(" "),n("br"),t._v(" "),n("Button",{attrs:{type:"submit","is-loading":t.isLoading,label:t.isLoading?"...":"LOGIN"}})],1)]),t._v(" "),n("footer",[n("a",{attrs:{href:"https://github.com/instagrambot/gramup-dm",target:"_blank","aria-label":"GitHub"}},[n("svg",{attrs:{width:"20px",height:"20px",viewBox:"0 0 14 14","aria-label":"github"}},[n("path",{attrs:{d:"M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"}})])]),t._v(" "),t._m(1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h3",[this._v("\n        Log in via "),e("a",{attrs:{href:"https://get.gramup.me",target:"_blank"}},[this._v("Gram Up!")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{attrs:{href:"https://patreon.com/morejust",target:"_blank"}},[e("img",{attrs:{width:"20",src:"https://www.vectorlogo.zone/logos/patreon/patreon-tile.svg"}})])}],!1,null,"49d84fd9",null);e.default=component.exports}}]);
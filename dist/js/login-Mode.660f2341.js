(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login-Mode"],{"0caa":function(t,e,n){"use strict";var a=n("d131"),o=n.n(a);o.a},"37fd":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("head-nav",{attrs:{name:t.title,to:t.path}}),n("div",{attrs:{id:"content"}},[n("div",{staticClass:"center"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{id:"mobile",type:"password",placeholder:"请输入密码"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),n("span",{staticClass:"forgetPass"},[t._v("忘记密码？")])]),n("div",{staticClass:"next",on:{touchstart:t.touchStart,touchend:t.touchend}},[t._v("登录")])])],1)},o=[],r=(n("96cf"),n("1da1")),i=n("ca0b"),s=n("4eeb"),c=n("ae88"),u={data:function(){return{title:"手机号登录",path:{name:"MobileLoginTel"},password:""}},methods:{touchStart:function(t){var e=t||window.event,n=e.target||e.srcElement;n.style.opacity="0.5"},touchend:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var a,o,r,i,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t||window.event,o=a.target||a.srcElement,o.style.opacity="1",r={},r.phone=e.$store.state.loginTel,r.password=e.password,n.next=8,s["b"].mobileLogin(r);case 8:if(i=n.sent,u=i.data,void 0!==u){n.next=15;break}return n.abrupt("return",!1);case 15:502===u.code||400===u.code?e.$toast("用户名或密码错误"):(e.$store.commit(c["j"],u.token),e.$store.commit(c["f"],u.account),e.$store.commit(c["g"],u.profile),e.$router.push({name:"Find"}));case 16:case"end":return n.stop()}}),n)})))()}},components:{HeadNav:i["a"]}},l=u,d=(n("5c92"),n("2877")),p=Object(d["a"])(l,a,o,!1,null,"353f967d",null);e["default"]=p.exports},"4d63":function(t,e,n){var a=n("83ab"),o=n("da84"),r=n("94ca"),i=n("7156"),s=n("9bf2").f,c=n("241c").f,u=n("44e7"),l=n("ad6d"),d=n("9f7f"),p=n("6eeb"),m=n("d039"),v=n("69f3").set,f=n("2626"),h=n("b622"),b=h("match"),g=o.RegExp,w=g.prototype,x=/a/g,_=/a/g,y=new g(x)!==x,E=d.UNSUPPORTED_Y,N=a&&r("RegExp",!y||E||m((function(){return _[b]=!1,g(x)!=x||g(_)==_||"/a/i"!=g(x,"i")})));if(N){var $=function(t,e){var n,a=this instanceof $,o=u(t),r=void 0===e;if(!a&&o&&t.constructor===$&&r)return t;y?o&&!r&&(t=t.source):t instanceof $&&(r&&(e=l.call(t)),t=t.source),E&&(n=!!e&&e.indexOf("y")>-1,n&&(e=e.replace(/y/g,"")));var s=i(y?new g(t,e):g(t,e),a?this:w,$);return E&&n&&v(s,{sticky:n}),s},R=function(t){t in $||s($,t,{configurable:!0,get:function(){return g[t]},set:function(e){g[t]=e}})},k=c(g),C=0;while(k.length>C)R(k[C++]);w.constructor=$,$.prototype=w,p(o,"RegExp",$)}f("RegExp")},5527:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("head-nav",{attrs:{name:t.title,to:t.path}}),n("div",{attrs:{id:"content"}},[n("p",{attrs:{id:"tips"}},[t._v("未登录手机号登录后将自动创建账号")]),n("div",{staticClass:"center"},[t._m(0),n("input",{directives:[{name:"model",rawName:"v-model",value:t.mobileNumber,expression:"mobileNumber"}],attrs:{id:"mobile",type:"tel",placeholder:"请输入手机号",maxlength:"11",oninput:"this.value=this.value.replace(/[^\\d]/g,'') "},domProps:{value:t.mobileNumber},on:{input:function(e){e.target.composing||(t.mobileNumber=e.target.value)}}}),n("span",{staticClass:" errorIcon iconfont",on:{click:t.removeMobile}},[t._v("")])]),n("div",{staticClass:"next",on:{touchstart:t.touchStart,touchend:t.touchend}},[t._v(" 下一步 ")])])],1)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("select",{attrs:{id:"select",disabled:""}},[n("option",{attrs:{value:"伦敦"}},[t._v("英国")]),n("option",{attrs:{value:"北京",selected:""}},[t._v("+86")]),n("option",{attrs:{value:"华盛顿"}},[t._v("美国")])])}],r=(n("4d63"),n("ac1f"),n("25f0"),n("ca0b")),i=n("ae88"),s={data:function(){return{title:"手机号登录",path:{name:"Login"},mobileNumber:""}},methods:{removeMobile:function(){this.mobileNumber=""},touchStart:function(t){var e=t||window.event,n=e.target||e.srcElement;n.style.opacity="0.5"},touchend:function(t){var e=t||window.event,n=e.target||e.srcElement;n.style.opacity="1";var a=new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);if(a.test(this.mobileNumber))this.$store.commit(i["a"],this.mobileNumber),this.$router.push({name:"MobileLoginPass"});else{var o="请输入正确的手机号";this.$toast(o)}}},components:{HeadNav:r["a"]}},c=s,u=(n("0caa"),n("2877")),l=Object(u["a"])(c,a,o,!1,null,"ad495c1a",null);e["default"]=l.exports},"5c92":function(t,e,n){"use strict";var a=n("e659"),o=n.n(a);o.a},d131:function(t,e,n){},e659:function(t,e,n){}}]);
//# sourceMappingURL=login-Mode.660f2341.js.map
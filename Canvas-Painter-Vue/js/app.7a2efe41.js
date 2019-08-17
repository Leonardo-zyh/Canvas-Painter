(function(t){function e(e){for(var i,o,c=e[0],h=e[1],r=e[2],l=0,d=[];l<c.length;l++)o=c[l],s[o]&&d.push(s[o][0]),s[o]=0;for(i in h)Object.prototype.hasOwnProperty.call(h,i)&&(t[i]=h[i]);u&&u(e);while(d.length)d.shift()();return a.push.apply(a,r||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,c=1;c<n.length;c++){var h=n[c];0!==s[h]&&(i=!1)}i&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},s={app:0},a=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/canvas/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],h=c.push.bind(c);c.push=e,c=c.slice();for(var r=0;r<c.length;r++)e(c[r]);var u=h;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0466":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("a586"),n("450d");var i=n("7464"),s=n.n(i),a=(n("1951"),n("eedf")),o=n.n(a),c=(n("b5c2"),n("20cf")),h=n.n(c),r=(n("cadf"),n("551c"),n("f751"),n("097d"),n("2b0e")),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Sidebar"),n("canvas",{attrs:{id:"myCanvas"}})],1)},l=[],d=(n("ac6a"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{on:{click:function(t){t.stopPropagation()}}},[n("div",{staticClass:"controller"},[n("svg",{staticClass:"icon",class:{open:t.open},on:{click:function(e){t.open=!t.open}}},[n("use",{attrs:{"xlink:href":"#icon-open"}})])]),n("div",{staticClass:"bar",class:{open:t.open}},[n("div",{staticClass:"width"},[n("span",[t._v("大小：")]),n("el-slider",{staticClass:"slider",attrs:{"input-size":"mini",value:t.lineWidth,min:4,max:48},on:{input:t.setLineWidth}})],1),n("div",{staticClass:"color"},[n("span",[t._v("颜色：")]),n("el-color-picker",{staticClass:"picker",attrs:{size:"small","show-alpha":"",predefine:t.predefineColors,value:t.color},on:{change:t.setColor}})],1),n("div",{staticClass:"back"},[n("span",[t._v("撤销：")]),n("svg",{staticClass:"icon",on:{click:t.$parent.back}},[n("use",{attrs:{"xlink:href":"#icon-back"}})])]),n("div",{staticClass:"back"},[n("span",[t._v("清除：")]),n("svg",{staticClass:"icon",on:{click:t.setClean}},[n("use",{attrs:{"xlink:href":"#icon-clear"}})])]),n("div",{staticClass:"save"},[n("span",[t._v("保存：")]),n("svg",{staticClass:"icon",on:{click:t.savePng}},[n("use",{attrs:{"xlink:href":"#icon-save"}})])]),n("div",{staticClass:"play"},[n("span",[t._v("播放：")]),n("svg",{staticClass:"icon",on:{click:t.animation}},[n("use",{attrs:{"xlink:href":"#icon-play"}})])])])])}),p=[],f=(n("4917"),{data:function(){return{open:!1,predefineColors:["#fff","#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgba(255, 69, 0, 0.68)","rgb(255, 120, 0)","hsv(51, 100, 98)","hsva(120, 40, 94, 0.5)","hsl(181, 100%, 37%)","hsla(209, 100%, 56%, 0.73)","#c7158577"]}},computed:{lineWidth:function(){return this.$parent.lineWidth},color:function(){return this.$parent.color}},mounted:function(){this.canvas=document.getElementById("myCanvas"),this.context=this.canvas.getContext("2d")},methods:{setLineWidth:function(t){this.$bus.$emit("setLineWidth",t)},setColor:function(t){this.$bus.$emit("setColor",t)},setClean:function(){this.$bus.$emit("setClean")},savePng:function(){var t=document.createElement("a");t.href=this.canvas.toDataURL("image/png");var e=window.navigator.userAgent.toLowerCase();e.match(/iphone|android|ipad/)?t.target="_blank":t.download="myCanvas",t.click()},animation:function(){var t=this,e=this.$parent.stack.reduce(function(t,e){return t.concat(e)}),n=e.length,i=2,s=function s(){if(t.context.clearRect(0,0,t.canvas.width,t.canvas.height),i<=n)for(var o=0;o<i;o++){var c=e[o];if(c.width)t.context.lineWidth=c.width,t.context.strokeStyle=c.style;else{if(e[o-1].width)t.context.beginPath(),t.context.moveTo(c.x,c.y),t.context.lineTo(c.x,c.y);else{var h=e[o-1].x,r=e[o-1].y,u=c.x,l=c.y,d=h/2+u/2,p=r/2+l/2;t.context.quadraticCurveTo(h,r,d,p)}(o===i-1||e[o+1].width)&&(t.context.lineTo(c.x,c.y),t.context.stroke())}}if(i+=1,!(i>n))return t.$parent.drawing?(cancelAnimationFrame(a),void t.$parent.drawLine()):void requestAnimationFrame(s);cancelAnimationFrame(a)},a=requestAnimationFrame(s)}}}),v=f,m=(n("f203"),n("2877")),g=Object(m["a"])(v,d,p,!1,null,null,null),x=g.exports,y={components:{Sidebar:x},data:function(){return{canvas:void 0,context:void 0,drawing:!1,myTimeStamp:void 0,minTimeDiff:8,minPointDistance:8,lineWidth:10,strokeStyle:"rgba(0,0,0,0.6)",color:"rgba(0,0,0,0.6)",stack:[],path:[]}},mounted:function(){var t=this;this.canvas=document.getElementById("myCanvas"),this.context=this.canvas.getContext("2d"),this.initCanvas(),this.initContext(),this.sideBarListen(),window.onresize=function(){t.initCanvas()},this.canvas.addEventListener("mousedown",this.handleMousedown),this.canvas.addEventListener("touchstart",this.handleTouchstart)},methods:{handleMousedown:function(t){this.drawing=!0,this.myTimeStamp=(new Date).getTime();var e=t.clientX,n=t.clientY;this.path.push({width:this.lineWidth,style:this.strokeStyle}),this.path.push({x:e,y:n}),this.stack.push(this.path),this.drawLine(),this.canvas.addEventListener("mousemove",this.handleMousemove),this.canvas.addEventListener("mouseup",this.handleMouseup)},handleMousemove:function(t){if(!((new Date).getTime()-this.myTimeStamp<this.minTimeDiff)){var e=t.clientX,n=t.clientY,i=this.path[this.path.length-1].x,s=this.path[this.path.length-1].y;Math.abs(e-i)<this.minPointDistance&&Math.abs(n-s)<this.minPointDistance||(this.path.push({x:e,y:n}),this.stack.pop(),this.stack.push(this.path),this.drawLine(),this.myTimeStamp=(new Date).getTime())}},handleMouseup:function(){this.drawing=!1,this.path=[],this.canvas.removeEventListener("mousemove",this.handleMousemove),this.canvas.removeEventListener("mouseup",this.handleMouseup)},handleTouchstart:function(t){t.preventDefault(),this.drawing=!0,this.myTimeStamp=(new Date).getTime();var e=t.touches[0].clientX,n=t.touches[0].clientY;this.path.push({width:this.lineWidth,style:this.strokeStyle}),this.path.push({x:e,y:n}),this.stack.push(this.path),this.drawLine(),this.canvas.addEventListener("touchmove",this.handleTouchmove),this.canvas.addEventListener("touchend",this.handleTouchend)},handleTouchmove:function(t){if(t.preventDefault(),!((new Date).getTime()-this.myTimeStamp<this.minTimeDiff)){var e=t.touches[0].clientX,n=t.touches[0].clientY,i=this.path[this.path.length-1].x,s=this.path[this.path.length-1].y;Math.abs(e-i)<this.minPointDistance&&Math.abs(n-s)<this.minPointDistance||(this.path.push({x:e,y:n}),this.stack.pop(),this.stack.push(this.path),this.drawLine(),this.myTimeStamp=(new Date).getTime())}},handleTouchend:function(t){t.preventDefault(),this.drawing=!1,this.path=[],document.removeEventListener("mousemove",this.handleTouchmove),document.removeEventListener("mouseup",this.handleTouchend)},drawLine:function(){var t=this;this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.stack.forEach(function(e){var n=e.length;e.forEach(function(e,i,s){if(0===i)t.context.lineWidth=e.width,t.context.strokeStyle=e.style;else if(1===i)t.context.beginPath(),t.context.moveTo(e.x,e.y),t.context.lineTo(e.x,e.y);else{var a=s[i-1].x,o=s[i-1].y,c=e.x,h=e.y,r=a/2+c/2,u=o/2+h/2;t.context.quadraticCurveTo(a,o,r,u)}i===n-1&&(t.context.lineTo(e.x,e.y),t.context.stroke())})})},initCanvas:function(){this.canvas.width=document.documentElement.clientWidth,this.canvas.height=document.documentElement.clientHeight},initContext:function(){this.context.lineCap="round",this.context.lineJoin="round"},back:function(){this.stack.pop(),this.drawLine()},sideBarListen:function(){var t=this;this.$bus.$on("setLineWidth",function(e){t.lineWidth=e,t.strokeStyle=t.color}),this.$bus.$on("setColor",function(e){t.color=e,t.strokeStyle=t.color}),this.$bus.$on("setClean",function(e){t.stack=[],t.context.clearRect(0,0,document.documentElement.clientWidth,document.documentElement.clientHeight)})}}},w=y,b=(n("5c0b"),Object(m["a"])(w,u,l,!1,null,null,null)),k=b.exports;n("0fae");r["default"].use(h.a),r["default"].use(o.a),r["default"].use(s.a),r["default"].config.productionTip=!1,r["default"].prototype.$bus=new r["default"],new r["default"]({render:function(t){return t(k)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var i=n("5e27"),s=n.n(i);s.a},"5e27":function(t,e,n){},f203:function(t,e,n){"use strict";var i=n("0466"),s=n.n(i);s.a}});
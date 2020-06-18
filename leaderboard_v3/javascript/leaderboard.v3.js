/*
 COMPETITION LABS LTD v1.0.5
 (c) 2015-2020 Aleksandr Bernotas
 License: www.competitionlabs.com/terms-of-service
*/
(function() {
	'use strict';
	
	if (!window.console) { window.console = function(){}; if (typeof XDomainRequest !== "undefined") { window.console.prototype.log = function(err){ throw new SyntaxError(err); }; window.console.prototype.warn = function(err){ throw new SyntaxError(err); }; window.console.prototype.error = function(err){ throw new SyntaxError(err); }; } }
	try{Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1})}catch(err){console.log(err)}
	try{Event.prototype.stopPropagation||(Event.prototype.stopPropagation=function(){this.cancelBubble=!0})}catch(err){console.log(err)}
	try{"function"!=typeof mapObject&&(window.mapObject=function(e,t){if(null!==e){var n=0;for(var r in e)e.hasOwnProperty(r)&&(t(e[r],r,n),n++);return!0}return console.log("returned object is null",typeof e),!1})}catch(err){console.log(err)}
	try{if(!Element.prototype.addEventListener){var eventListeners=[],addEventListener=function(e,t){var n,r=this;if(n=function(e){e.target=e.srcElement,e.currentTarget=r,e.pageX=event.clientX+document.body.scrollLeft,e.pageY=event.clientY+document.body.scrollTop,t.handleEvent?t.handleEvent(e):t.call(r,e)},"DOMContentLoaded"===e){var o=function(e){"complete"===document.readyState&&n(e)};if(document.attachEvent("onreadystatechange",o),eventListeners.push({object:this,type:e,listener:t,wrapper:o}),"complete"==document.readyState){var i=new Event;i.srcElement=window,o(i)}}else this.attachEvent("on"+e,n),eventListeners.push({object:this,type:e,listener:t,wrapper:n})},removeEventListener=function(e,t){for(var n=0;n<eventListeners.length;){var r=eventListeners[n];if(r.object==this&&r.type==e&&r.listener==t){"DOMContentLoaded"==e?this.detachEvent("onreadystatechange",r.wrapper):this.detachEvent("on"+e,r.wrapper);break}++n}};Element.prototype.addEventListener=addEventListener,Element.prototype.removeEventListener=removeEventListener,HTMLDocument&&(HTMLDocument.prototype.addEventListener=addEventListener,HTMLDocument.prototype.removeEventListener=removeEventListener),Window&&(Window.prototype.addEventListener=addEventListener,Window.prototype.removeEventListener=removeEventListener)}Element.prototype.remove||(Element.prototype.remove=function(){this.parentElement.removeChild(this)},NodeList.prototype.remove=HTMLCollection.prototype.remove=function(){for(var e=0,t=this.length;t>e;e++)this[e]&&this[e].parentElement&&this[e].parentElement.removeChild(this[e])})}catch(err){console.log(err)}"undefined"!=typeof XDomainRequest&&("object"!=typeof window.JSON&&(window.JSON={}),function(){"use strict";function f(e){return 10>e?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,o,i,a,p=gap,u=t[e];switch(u&&"object"==typeof u&&"function"==typeof u.toJSON&&(u=u.toJSON(e)),"function"==typeof rep&&(u=rep.call(t,e,u)),typeof u){case"string":return quote(u);case"number":return isFinite(u)?String(u):"null";case"boolean":case"null":return String(u);case"object":if(!u)return"null";if(gap+=indent,a=[],"[object Array]"===Object.prototype.toString.apply(u)){for(i=u.length,n=0;i>n;n+=1)a[n]=str(n,u)||"null";return o=0===a.length?"[]":gap?"[\n"+gap+a.join(",\n"+gap)+"\n"+p+"]":"["+a.join(",")+"]",gap=p,o}if(rep&&"object"==typeof rep)for(i=rep.length,n=0;i>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,u),o&&a.push(quote(r)+(gap?": ":":")+o));else for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(o=str(r,u),o&&a.push(quote(r)+(gap?": ":":")+o));return o=0===a.length?"{}":gap?"{\n"+gap+a.join(",\n"+gap)+"\n"+p+"}":"{"+a.join(",")+"}",gap=p,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof window.JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},window.JSON.stringify=function(e,t,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof window.JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,window.JSON.parse=function(text,reviver){function walk(e,t){var n,r,o=e[t];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(e,t,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}());
	var _slice=Array.prototype.slice;
	try{_slice.call(document.documentElement)}catch(e){Array.prototype.slice=function(t,e){if(e="undefined"!=typeof e?e:this.length,"[object Array]"===Object.prototype.toString.call(this))return _slice.call(this,t,e);var r,i,c=[],l=this.length,o=t||0;o=o>=0?o:l+o;var a=e?e:l;if(0>e&&(a=l+e),i=a-o,i>0)if(c=new Array(i),this.charAt)for(r=0;i>r;r++)c[r]=this.charAt(o+r);else for(r=0;i>r;r++)c[r]=this[o+r];return c}}

	//[EventSource] Polyfill fix: https://github.com/remy/polyfills/blob/master/EventSource.js
	(function (global) { if ("EventSource" in global) return; var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g; var EventSource = function (url) { var eventsource = this, interval = 500, /* polling interval  */ lastEventId = null, cache = ''; if (!url || typeof url != 'string') { throw new SyntaxError('Not enough arguments'); } this.URL = url; this.readyState = this.CONNECTING; this._pollTimer = null; this._xhr = null; function pollAgain(interval) { eventsource._pollTimer = setTimeout(function () { poll.call(eventsource); }, interval); } function poll() { try { /* force hiding of the error message... insane?*/ if (eventsource.readyState == eventsource.CLOSED) return; /* NOTE: IE7 and upwards support*/ var xhr = new XMLHttpRequest(); xhr.open('GET', eventsource.URL, true); xhr.setRequestHeader('Accept', 'text/event-stream'); xhr.setRequestHeader('Cache-Control', 'no-cache'); /* we must make use of this on the server side if we're working with Android - because they don't trigger readychange until the server connection is closed*/ xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); if (lastEventId != null) xhr.setRequestHeader('Last-Event-ID', lastEventId); cache = ''; xhr.timeout = 50000; xhr.onreadystatechange = function () { if (this.readyState == 3 || (this.readyState == 4 && this.status == 200)) { /* on success*/ if (eventsource.readyState == eventsource.CONNECTING) { eventsource.readyState = eventsource.OPEN; eventsource.dispatchEvent('open', { type: 'open' }); } var responseText = ''; try { responseText = this.responseText || ''; } catch (e) {} /* process this.responseText*/ var parts = responseText.substr(cache.length).split("\n"), eventType = 'message', data = [], i = 0, line = ''; cache = responseText; /* TODO handle 'event' (for buffer name), retry*/ for (; i < parts.length; i++) { line = parts[i].replace(reTrim, ''); if (line.indexOf('event') == 0) { eventType = line.replace(/event:?\s*/, ''); } else if (line.indexOf('retry') == 0) { var retry = parseInt(line.replace(/retry:?\s*/, '')); if (!isNaN(retry)) { interval = retry; } } else if (line.indexOf('data') == 0) { data.push(line.replace(/data:?\s*/, '')); } else if (line.indexOf('id:') == 0) { lastEventId = line.replace(/id:?\s*/, ''); } else if (line.indexOf('id') == 0) { /* this resets the id*/ lastEventId = null; } else if (line == '') { if (data.length) { var event = new MessageEvent(data.join('\n'), eventsource.url, lastEventId); eventsource.dispatchEvent(eventType, event); data = []; eventType = 'message'; } } } if (this.readyState == 4) pollAgain(interval); /* don't need to poll again, because we're long-loading*/ } else if (eventsource.readyState !== eventsource.CLOSED) { if (this.readyState == 4) { /* and some other status dispatch error*/ eventsource.readyState = eventsource.CONNECTING; eventsource.dispatchEvent('error', { type: 'error' }); pollAgain(interval); } else if (this.readyState == 0) { /* likely aborted*/ pollAgain(interval); } else { } } }; xhr.send(); setTimeout(function () { if (true || xhr.readyState == 3) xhr.abort(); }, xhr.timeout); eventsource._xhr = xhr; } catch (e) { /* in an attempt to silence the errors*/ eventsource.dispatchEvent('error', { type: 'error', data: e.message }); /* ???*/ } }; poll(); /* init now*/ }; EventSource.prototype = { close: function () { /* closes the connection - disabling the polling*/ this.readyState = this.CLOSED; clearInterval(this._pollTimer); this._xhr.abort(); }, CONNECTING: 0, OPEN: 1, CLOSED: 2, dispatchEvent: function (type, event) { var handlers = this['_' + type + 'Handlers']; if (handlers) { for (var i = 0; i < handlers.length; i++) { handlers[i].call(this, event); } } if (this['on' + type]) { this['on' + type].call(this, event); } }, addEventListener: function (type, handler) { if (!this['_' + type + 'Handlers']) { this['_' + type + 'Handlers'] = []; } this['_' + type + 'Handlers'].push(handler); }, removeEventListener: function (type, handler) { var handlers = this['_' + type + 'Handlers']; if (!handlers) { return; } for (var i = handlers.length - 1; i >= 0; --i) { if (handlers[i] === handler) { handlers.splice(i, 1); break; } } }, onerror: null, onmessage: null, onopen: null, readyState: 0, URL: ''}; var MessageEvent = function (data, origin, lastEventId) { this.data = data; this.origin = origin; this.lastEventId = lastEventId || ''; }; MessageEvent.prototype = { data: null, type: 'message', lastEventId: '', origin: ''}; if ('module' in global) module.exports = EventSource; global.EventSource = EventSource; })(window);

	//! moment.js
	var moment;
	try{!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):moment=t()}(this,function(){"use strict";var e,t;function n(){return e.apply(null,arguments)}function s(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function i(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function r(e){return void 0===e}function a(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function o(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function u(e,t){var n,s=[];for(n=0;n<e.length;++n)s.push(t(e[n],n));return s}function l(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function h(e,t){for(var n in t)l(t,n)&&(e[n]=t[n]);return l(t,"toString")&&(e.toString=t.toString),l(t,"valueOf")&&(e.valueOf=t.valueOf),e}function d(e,t,n,s){return bt(e,t,n,s,!0).utc()}function c(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function f(e){if(null==e._isValid){var n=c(e),s=t.call(n.parsedDateParts,function(e){return null!=e}),i=!isNaN(e._d.getTime())&&n.overflow<0&&!n.empty&&!n.invalidMonth&&!n.invalidWeekday&&!n.weekdayMismatch&&!n.nullInput&&!n.invalidFormat&&!n.userInvalidated&&(!n.meridiem||n.meridiem&&s);if(e._strict&&(i=i&&0===n.charsLeftOver&&0===n.unusedTokens.length&&void 0===n.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return i;e._isValid=i}return e._isValid}function m(e){var t=d(NaN);return null!=e?h(c(t),e):c(t).userInvalidated=!0,t}t=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;s<n;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var _=n.momentProperties=[];function y(e,t){var n,s,i;if(r(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),r(t._i)||(e._i=t._i),r(t._f)||(e._f=t._f),r(t._l)||(e._l=t._l),r(t._strict)||(e._strict=t._strict),r(t._tzm)||(e._tzm=t._tzm),r(t._isUTC)||(e._isUTC=t._isUTC),r(t._offset)||(e._offset=t._offset),r(t._pf)||(e._pf=c(t)),r(t._locale)||(e._locale=t._locale),_.length>0)for(n=0;n<_.length;n++)r(i=t[s=_[n]])||(e[s]=i);return e}var g=!1;function v(e){y(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===g&&(g=!0,n.updateOffset(this),g=!1)}function p(e){return e instanceof v||null!=e&&null!=e._isAMomentObject}function w(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function M(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=w(t)),n}function k(e,t,n){var s,i=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),a=0;for(s=0;s<i;s++)(n&&e[s]!==t[s]||!n&&M(e[s])!==M(t[s]))&&a++;return a+r}function S(e){!1===n.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function D(e,t){var s=!0;return h(function(){if(null!=n.deprecationHandler&&n.deprecationHandler(null,e),s){for(var i,r=[],a=0;a<arguments.length;a++){if(i="","object"==typeof arguments[a]){for(var o in i+="\n["+a+"] ",arguments[0])i+=o+": "+arguments[0][o]+", ";i=i.slice(0,-2)}else i=arguments[a];r.push(i)}S(e+"\nArguments: "+Array.prototype.slice.call(r).join("")+"\n"+(new Error).stack),s=!1}return t.apply(this,arguments)},t)}var Y,O={};function T(e,t){null!=n.deprecationHandler&&n.deprecationHandler(e,t),O[e]||(S(t),O[e]=!0)}function b(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function x(e,t){var n,s=h({},e);for(n in t)l(t,n)&&(i(e[n])&&i(t[n])?(s[n]={},h(s[n],e[n]),h(s[n],t[n])):null!=t[n]?s[n]=t[n]:delete s[n]);for(n in e)l(e,n)&&!l(t,n)&&i(e[n])&&(s[n]=h({},s[n]));return s}function P(e){null!=e&&this.set(e)}n.suppressDeprecationWarnings=!1,n.deprecationHandler=null,Y=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)l(e,t)&&n.push(t);return n};var W={};function C(e,t){var n=e.toLowerCase();W[n]=W[n+"s"]=W[t]=e}function H(e){return"string"==typeof e?W[e]||W[e.toLowerCase()]:void 0}function R(e){var t,n,s={};for(n in e)l(e,n)&&(t=H(n))&&(s[t]=e[n]);return s}var U={};function F(e,t){U[e]=t}function L(e,t,n){var s=""+Math.abs(e),i=t-s.length;return(e>=0?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}var N=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,G=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,V={},E={};function I(e,t,n,s){var i=s;"string"==typeof s&&(i=function(){return this[s]()}),e&&(E[e]=i),t&&(E[t[0]]=function(){return L(i.apply(this,arguments),t[1],t[2])}),n&&(E[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function A(e,t){return e.isValid()?(t=j(t,e.localeData()),V[t]=V[t]||function(e){var t,n,s,i=e.match(N);for(t=0,n=i.length;t<n;t++)E[i[t]]?i[t]=E[i[t]]:i[t]=(s=i[t]).match(/\[[\s\S]/)?s.replace(/^\[|\]$/g,""):s.replace(/\\/g,"");return function(t){var s,r="";for(s=0;s<n;s++)r+=b(i[s])?i[s].call(t,e):i[s];return r}}(t),V[t](e)):e.localeData().invalidDate()}function j(e,t){var n=5;function s(e){return t.longDateFormat(e)||e}for(G.lastIndex=0;n>=0&&G.test(e);)e=e.replace(G,s),G.lastIndex=0,n-=1;return e}var Z=/\d/,z=/\d\d/,$=/\d{3}/,q=/\d{4}/,J=/[+-]?\d{6}/,B=/\d\d?/,Q=/\d\d\d\d?/,X=/\d\d\d\d\d\d?/,K=/\d{1,3}/,ee=/\d{1,4}/,te=/[+-]?\d{1,6}/,ne=/\d+/,se=/[+-]?\d+/,ie=/Z|[+-]\d\d:?\d\d/gi,re=/Z|[+-]\d\d(?::?\d\d)?/gi,ae=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,oe={};function ue(e,t,n){oe[e]=b(t)?t:function(e,s){return e&&n?n:t}}function le(e,t){return l(oe,e)?oe[e](t._strict,t._locale):new RegExp(he(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i})))}function he(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var de={};function ce(e,t){var n,s=t;for("string"==typeof e&&(e=[e]),a(t)&&(s=function(e,n){n[t]=M(e)}),n=0;n<e.length;n++)de[e[n]]=s}function fe(e,t){ce(e,function(e,n,s,i){s._w=s._w||{},t(e,s._w,s,i)})}function me(e,t,n){null!=t&&l(de,e)&&de[e](t,n._a,n,e)}var _e=0,ye=1,ge=2,ve=3,pe=4,we=5,Me=6,ke=7,Se=8;function De(e){return Ye(e)?366:365}function Ye(e){return e%4==0&&e%100!=0||e%400==0}I("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),I(0,["YY",2],0,function(){return this.year()%100}),I(0,["YYYY",4],0,"year"),I(0,["YYYYY",5],0,"year"),I(0,["YYYYYY",6,!0],0,"year"),C("year","y"),F("year",1),ue("Y",se),ue("YY",B,z),ue("YYYY",ee,q),ue("YYYYY",te,J),ue("YYYYYY",te,J),ce(["YYYYY","YYYYYY"],_e),ce("YYYY",function(e,t){t[_e]=2===e.length?n.parseTwoDigitYear(e):M(e)}),ce("YY",function(e,t){t[_e]=n.parseTwoDigitYear(e)}),ce("Y",function(e,t){t[_e]=parseInt(e,10)}),n.parseTwoDigitYear=function(e){return M(e)+(M(e)>68?1900:2e3)};var Oe,Te=be("FullYear",!0);function be(e,t){return function(s){return null!=s?(Pe(this,e,s),n.updateOffset(this,t),this):xe(this,e)}}function xe(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function Pe(e,t,n){e.isValid()&&!isNaN(n)&&("FullYear"===t&&Ye(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),We(n,e.month())):e._d["set"+(e._isUTC?"UTC":"")+t](n))}function We(e,t){if(isNaN(e)||isNaN(t))return NaN;var n,s=(t%(n=12)+n)%n;return e+=(t-s)/12,1===s?Ye(e)?29:28:31-s%7%2}Oe=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},I("M",["MM",2],"Mo",function(){return this.month()+1}),I("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),I("MMMM",0,0,function(e){return this.localeData().months(this,e)}),C("month","M"),F("month",8),ue("M",B),ue("MM",B,z),ue("MMM",function(e,t){return t.monthsShortRegex(e)}),ue("MMMM",function(e,t){return t.monthsRegex(e)}),ce(["M","MM"],function(e,t){t[ye]=M(e)-1}),ce(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[ye]=i:c(n).invalidMonth=e});var Ce=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,He="January_February_March_April_May_June_July_August_September_October_November_December".split("_");var Re="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function Ue(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=M(t);else if(!a(t=e.localeData().monthsParse(t)))return e;return n=Math.min(e.date(),We(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function Fe(e){return null!=e?(Ue(this,e),n.updateOffset(this,!0),this):xe(this,"Month")}var Le=ae;var Ne=ae;function Ge(){function e(e,t){return t.length-e.length}var t,n,s=[],i=[],r=[];for(t=0;t<12;t++)n=d([2e3,t]),s.push(this.monthsShort(n,"")),i.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(s.sort(e),i.sort(e),r.sort(e),t=0;t<12;t++)s[t]=he(s[t]),i[t]=he(i[t]);for(t=0;t<24;t++)r[t]=he(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function Ve(e){var t;if(e<100&&e>=0){var n=Array.prototype.slice.call(arguments);n[0]=e+400,t=new Date(Date.UTC.apply(null,n)),isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e)}else t=new Date(Date.UTC.apply(null,arguments));return t}function Ee(e,t,n){var s=7+t-n;return-((7+Ve(e,0,s).getUTCDay()-t)%7)+s-1}function Ie(e,t,n,s,i){var r,a,o=1+7*(t-1)+(7+n-s)%7+Ee(e,s,i);return o<=0?a=De(r=e-1)+o:o>De(e)?(r=e+1,a=o-De(e)):(r=e,a=o),{year:r,dayOfYear:a}}function Ae(e,t,n){var s,i,r=Ee(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return a<1?s=a+je(i=e.year()-1,t,n):a>je(e.year(),t,n)?(s=a-je(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function je(e,t,n){var s=Ee(e,t,n),i=Ee(e+1,t,n);return(De(e)-s+i)/7}I("w",["ww",2],"wo","week"),I("W",["WW",2],"Wo","isoWeek"),C("week","w"),C("isoWeek","W"),F("week",5),F("isoWeek",5),ue("w",B),ue("ww",B,z),ue("W",B),ue("WW",B,z),fe(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=M(e)});function Ze(e,t){return e.slice(t,7).concat(e.slice(0,t))}I("d",0,"do","day"),I("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),I("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),I("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),I("e",0,0,"weekday"),I("E",0,0,"isoWeekday"),C("day","d"),C("weekday","e"),C("isoWeekday","E"),F("day",11),F("weekday",11),F("isoWeekday",11),ue("d",B),ue("e",B),ue("E",B),ue("dd",function(e,t){return t.weekdaysMinRegex(e)}),ue("ddd",function(e,t){return t.weekdaysShortRegex(e)}),ue("dddd",function(e,t){return t.weekdaysRegex(e)}),fe(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:c(n).invalidWeekday=e}),fe(["d","e","E"],function(e,t,n,s){t[s]=M(e)});var ze="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");var $e="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");var qe="Su_Mo_Tu_We_Th_Fr_Sa".split("_");var Je=ae;var Be=ae;var Qe=ae;function Xe(){function e(e,t){return t.length-e.length}var t,n,s,i,r,a=[],o=[],u=[],l=[];for(t=0;t<7;t++)n=d([2e3,1]).day(t),s=this.weekdaysMin(n,""),i=this.weekdaysShort(n,""),r=this.weekdays(n,""),a.push(s),o.push(i),u.push(r),l.push(s),l.push(i),l.push(r);for(a.sort(e),o.sort(e),u.sort(e),l.sort(e),t=0;t<7;t++)o[t]=he(o[t]),u[t]=he(u[t]),l[t]=he(l[t]);this._weekdaysRegex=new RegExp("^("+l.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+a.join("|")+")","i")}function Ke(){return this.hours()%12||12}function et(e,t){I(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function tt(e,t){return t._meridiemParse}I("H",["HH",2],0,"hour"),I("h",["hh",2],0,Ke),I("k",["kk",2],0,function(){return this.hours()||24}),I("hmm",0,0,function(){return""+Ke.apply(this)+L(this.minutes(),2)}),I("hmmss",0,0,function(){return""+Ke.apply(this)+L(this.minutes(),2)+L(this.seconds(),2)}),I("Hmm",0,0,function(){return""+this.hours()+L(this.minutes(),2)}),I("Hmmss",0,0,function(){return""+this.hours()+L(this.minutes(),2)+L(this.seconds(),2)}),et("a",!0),et("A",!1),C("hour","h"),F("hour",13),ue("a",tt),ue("A",tt),ue("H",B),ue("h",B),ue("k",B),ue("HH",B,z),ue("hh",B,z),ue("kk",B,z),ue("hmm",Q),ue("hmmss",X),ue("Hmm",Q),ue("Hmmss",X),ce(["H","HH"],ve),ce(["k","kk"],function(e,t,n){var s=M(e);t[ve]=24===s?0:s}),ce(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),ce(["h","hh"],function(e,t,n){t[ve]=M(e),c(n).bigHour=!0}),ce("hmm",function(e,t,n){var s=e.length-2;t[ve]=M(e.substr(0,s)),t[pe]=M(e.substr(s)),c(n).bigHour=!0}),ce("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ve]=M(e.substr(0,s)),t[pe]=M(e.substr(s,2)),t[we]=M(e.substr(i)),c(n).bigHour=!0}),ce("Hmm",function(e,t,n){var s=e.length-2;t[ve]=M(e.substr(0,s)),t[pe]=M(e.substr(s))}),ce("Hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[ve]=M(e.substr(0,s)),t[pe]=M(e.substr(s,2)),t[we]=M(e.substr(i))});var nt,st=be("Hours",!0),it={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:He,monthsShort:Re,week:{dow:0,doy:6},weekdays:ze,weekdaysMin:qe,weekdaysShort:$e,meridiemParse:/[ap]\.?m?\.?/i},rt={},at={};function ot(e){return e?e.toLowerCase().replace("_","-"):e}function ut(e){var t=null;if(!rt[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=nt._abbr,require("./locale/"+e),lt(t)}catch(e){}return rt[e]}function lt(e,t){var n;return e&&((n=r(t)?dt(e):ht(e,t))?nt=n:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),nt._abbr}function ht(e,t){if(null!==t){var n,s=it;if(t.abbr=e,null!=rt[e])T("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),s=rt[e]._config;else if(null!=t.parentLocale)if(null!=rt[t.parentLocale])s=rt[t.parentLocale]._config;else{if(null==(n=ut(t.parentLocale)))return at[t.parentLocale]||(at[t.parentLocale]=[]),at[t.parentLocale].push({name:e,config:t}),null;s=n._config}return rt[e]=new P(x(s,t)),at[e]&&at[e].forEach(function(e){ht(e.name,e.config)}),lt(e),rt[e]}return delete rt[e],null}function dt(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return nt;if(!s(e)){if(t=ut(e))return t;e=[e]}return function(e){for(var t,n,s,i,r=0;r<e.length;){for(t=(i=ot(e[r]).split("-")).length,n=(n=ot(e[r+1]))?n.split("-"):null;t>0;){if(s=ut(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&k(i,n,!0)>=t-1)break;t--}r++}return nt}(e)}function ct(e){var t,n=e._a;return n&&-2===c(e).overflow&&(t=n[ye]<0||n[ye]>11?ye:n[ge]<1||n[ge]>We(n[_e],n[ye])?ge:n[ve]<0||n[ve]>24||24===n[ve]&&(0!==n[pe]||0!==n[we]||0!==n[Me])?ve:n[pe]<0||n[pe]>59?pe:n[we]<0||n[we]>59?we:n[Me]<0||n[Me]>999?Me:-1,c(e)._overflowDayOfYear&&(t<_e||t>ge)&&(t=ge),c(e)._overflowWeeks&&-1===t&&(t=ke),c(e)._overflowWeekday&&-1===t&&(t=Se),c(e).overflow=t),e}function ft(e,t,n){return null!=e?e:null!=t?t:n}function mt(e){var t,s,i,r,a,o=[];if(!e._d){for(i=function(e){var t=new Date(n.now());return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}(e),e._w&&null==e._a[ge]&&null==e._a[ye]&&function(e){var t,n,s,i,r,a,o,u;if(null!=(t=e._w).GG||null!=t.W||null!=t.E)r=1,a=4,n=ft(t.GG,e._a[_e],Ae(xt(),1,4).year),s=ft(t.W,1),((i=ft(t.E,1))<1||i>7)&&(u=!0);else{r=e._locale._week.dow,a=e._locale._week.doy;var l=Ae(xt(),r,a);n=ft(t.gg,e._a[_e],l.year),s=ft(t.w,l.week),null!=t.d?((i=t.d)<0||i>6)&&(u=!0):null!=t.e?(i=t.e+r,(t.e<0||t.e>6)&&(u=!0)):i=r}s<1||s>je(n,r,a)?c(e)._overflowWeeks=!0:null!=u?c(e)._overflowWeekday=!0:(o=Ie(n,s,i,r,a),e._a[_e]=o.year,e._dayOfYear=o.dayOfYear)}(e),null!=e._dayOfYear&&(a=ft(e._a[_e],i[_e]),(e._dayOfYear>De(a)||0===e._dayOfYear)&&(c(e)._overflowDayOfYear=!0),s=Ve(a,0,e._dayOfYear),e._a[ye]=s.getUTCMonth(),e._a[ge]=s.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=o[t]=i[t];for(;t<7;t++)e._a[t]=o[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[ve]&&0===e._a[pe]&&0===e._a[we]&&0===e._a[Me]&&(e._nextDay=!0,e._a[ve]=0),e._d=(e._useUTC?Ve:function(e,t,n,s,i,r,a){var o;return e<100&&e>=0?(o=new Date(e+400,t,n,s,i,r,a),isFinite(o.getFullYear())&&o.setFullYear(e)):o=new Date(e,t,n,s,i,r,a),o}).apply(null,o),r=e._useUTC?e._d.getUTCDay():e._d.getDay(),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[ve]=24),e._w&&void 0!==e._w.d&&e._w.d!==r&&(c(e).weekdayMismatch=!0)}}var _t=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,yt=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,gt=/Z|[+-]\d\d(?::?\d\d)?/,vt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],pt=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],wt=/^\/?Date\((\-?\d+)/i;function Mt(e){var t,n,s,i,r,a,o=e._i,u=_t.exec(o)||yt.exec(o);if(u){for(c(e).iso=!0,t=0,n=vt.length;t<n;t++)if(vt[t][1].exec(u[1])){i=vt[t][0],s=!1!==vt[t][2];break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=pt.length;t<n;t++)if(pt[t][1].exec(u[3])){r=(u[2]||" ")+pt[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!gt.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),Ot(e)}else e._isValid=!1}var kt=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function St(e){var t=parseInt(e,10);return t<=49?2e3+t:t<=999?1900+t:t}var Dt={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Yt(e){var t,n,s,i,r,a,o,u=kt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,""));if(u){var l=(t=u[4],n=u[3],s=u[2],i=u[5],r=u[6],a=u[7],o=[St(t),Re.indexOf(n),parseInt(s,10),parseInt(i,10),parseInt(r,10)],a&&o.push(parseInt(a,10)),o);if(!function(e,t,n){return!e||$e.indexOf(e)===new Date(t[0],t[1],t[2]).getDay()||(c(n).weekdayMismatch=!0,n._isValid=!1,!1)}(u[1],l,e))return;e._a=l,e._tzm=function(e,t,n){if(e)return Dt[e];if(t)return 0;var s=parseInt(n,10),i=s%100;return(s-i)/100*60+i}(u[8],u[9],u[10]),e._d=Ve.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),c(e).rfc2822=!0}else e._isValid=!1}function Ot(e){if(e._f!==n.ISO_8601)if(e._f!==n.RFC_2822){e._a=[],c(e).empty=!0;var t,s,i,r,a,o=""+e._i,u=o.length,l=0;for(i=j(e._f,e._locale).match(N)||[],t=0;t<i.length;t++)r=i[t],(s=(o.match(le(r,e))||[])[0])&&((a=o.substr(0,o.indexOf(s))).length>0&&c(e).unusedInput.push(a),o=o.slice(o.indexOf(s)+s.length),l+=s.length),E[r]?(s?c(e).empty=!1:c(e).unusedTokens.push(r),me(r,s,e)):e._strict&&!s&&c(e).unusedTokens.push(r);c(e).charsLeftOver=u-l,o.length>0&&c(e).unusedInput.push(o),e._a[ve]<=12&&!0===c(e).bigHour&&e._a[ve]>0&&(c(e).bigHour=void 0),c(e).parsedDateParts=e._a.slice(0),c(e).meridiem=e._meridiem,e._a[ve]=function(e,t,n){var s;if(null==n)return t;return null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?((s=e.isPM(n))&&t<12&&(t+=12),s||12!==t||(t=0),t):t}(e._locale,e._a[ve],e._meridiem),mt(e),ct(e)}else Yt(e);else Mt(e)}function Tt(e){var t=e._i,l=e._f;return e._locale=e._locale||dt(e._l),null===t||void 0===l&&""===t?m({nullInput:!0}):("string"==typeof t&&(e._i=t=e._locale.preparse(t)),p(t)?new v(ct(t)):(o(t)?e._d=t:s(l)?function(e){var t,n,s,i,r;if(0===e._f.length)return c(e).invalidFormat=!0,void(e._d=new Date(NaN));for(i=0;i<e._f.length;i++)r=0,t=y({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],Ot(t),f(t)&&(r+=c(t).charsLeftOver,r+=10*c(t).unusedTokens.length,c(t).score=r,(null==s||r<s)&&(s=r,n=t));h(e,n||t)}(e):l?Ot(e):function(e){var t=e._i;r(t)?e._d=new Date(n.now()):o(t)?e._d=new Date(t.valueOf()):"string"==typeof t?function(e){var t=wt.exec(e._i);null===t?(Mt(e),!1===e._isValid&&(delete e._isValid,Yt(e),!1===e._isValid&&(delete e._isValid,n.createFromInputFallback(e)))):e._d=new Date(+t[1])}(e):s(t)?(e._a=u(t.slice(0),function(e){return parseInt(e,10)}),mt(e)):i(t)?function(e){if(!e._d){var t=R(e._i);e._a=u([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),mt(e)}}(e):a(t)?e._d=new Date(t):n.createFromInputFallback(e)}(e),f(e)||(e._d=null),e))}function bt(e,t,n,r,a){var o,u={};return!0!==n&&!1!==n||(r=n,n=void 0),(i(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0}(e)||s(e)&&0===e.length)&&(e=void 0),u._isAMomentObject=!0,u._useUTC=u._isUTC=a,u._l=n,u._i=e,u._f=t,u._strict=r,(o=new v(ct(Tt(u))))._nextDay&&(o.add(1,"d"),o._nextDay=void 0),o}function xt(e,t,n,s){return bt(e,t,n,s,!1)}n.createFromInputFallback=D("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),n.ISO_8601=function(){},n.RFC_2822=function(){};var Pt=D("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=xt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:m()}),Wt=D("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=xt.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:m()});function Ct(e,t){var n,i;if(1===t.length&&s(t[0])&&(t=t[0]),!t.length)return xt();for(n=t[0],i=1;i<t.length;++i)t[i].isValid()&&!t[i][e](n)||(n=t[i]);return n}var Ht=["year","quarter","month","week","day","hour","minute","second","millisecond"];function Rt(e){var t=R(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||t.isoWeek||0,a=t.day||0,o=t.hour||0,u=t.minute||0,l=t.second||0,h=t.millisecond||0;this._isValid=function(e){for(var t in e)if(-1===Oe.call(Ht,t)||null!=e[t]&&isNaN(e[t]))return!1;for(var n=!1,s=0;s<Ht.length;++s)if(e[Ht[s]]){if(n)return!1;parseFloat(e[Ht[s]])!==M(e[Ht[s]])&&(n=!0)}return!0}(t),this._milliseconds=+h+1e3*l+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=dt(),this._bubble()}function Ut(e){return e instanceof Rt}function Ft(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Lt(e,t){I(e,0,0,function(){var e=this.utcOffset(),n="+";return e<0&&(e=-e,n="-"),n+L(~~(e/60),2)+t+L(~~e%60,2)})}Lt("Z",":"),Lt("ZZ",""),ue("Z",re),ue("ZZ",re),ce(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Gt(re,e)});var Nt=/([\+\-]|\d\d)/gi;function Gt(e,t){var n=(t||"").match(e);if(null===n)return null;var s=((n[n.length-1]||[])+"").match(Nt)||["-",0,0],i=60*s[1]+M(s[2]);return 0===i?0:"+"===s[0]?i:-i}function Vt(e,t){var s,i;return t._isUTC?(s=t.clone(),i=(p(e)||o(e)?e.valueOf():xt(e).valueOf())-s.valueOf(),s._d.setTime(s._d.valueOf()+i),n.updateOffset(s,!1),s):xt(e).local()}function Et(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function It(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}n.updateOffset=function(){};var At=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,jt=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function Zt(e,t){var n,s,i,r=e,o=null;return Ut(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:a(e)?(r={},t?r[t]=e:r.milliseconds=e):(o=At.exec(e))?(n="-"===o[1]?-1:1,r={y:0,d:M(o[ge])*n,h:M(o[ve])*n,m:M(o[pe])*n,s:M(o[we])*n,ms:M(Ft(1e3*o[Me]))*n}):(o=jt.exec(e))?(n="-"===o[1]?-1:1,r={y:zt(o[2],n),M:zt(o[3],n),w:zt(o[4],n),d:zt(o[5],n),h:zt(o[6],n),m:zt(o[7],n),s:zt(o[8],n)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(i=function(e,t){var n;if(!e.isValid()||!t.isValid())return{milliseconds:0,months:0};t=Vt(t,e),e.isBefore(t)?n=$t(e,t):((n=$t(t,e)).milliseconds=-n.milliseconds,n.months=-n.months);return n}(xt(r.from),xt(r.to)),(r={}).ms=i.milliseconds,r.M=i.months),s=new Rt(r),Ut(e)&&l(e,"_locale")&&(s._locale=e._locale),s}function zt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function $t(e,t){var n={};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function qt(e,t){return function(n,s){var i;return null===s||isNaN(+s)||(T(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),i=n,n=s,s=i),Jt(this,Zt(n="string"==typeof n?+n:n,s),e),this}}function Jt(e,t,s,i){var r=t._milliseconds,a=Ft(t._days),o=Ft(t._months);e.isValid()&&(i=null==i||i,o&&Ue(e,xe(e,"Month")+o*s),a&&Pe(e,"Date",xe(e,"Date")+a*s),r&&e._d.setTime(e._d.valueOf()+r*s),i&&n.updateOffset(e,a||o))}Zt.fn=Rt.prototype,Zt.invalid=function(){return Zt(NaN)};var Bt=qt(1,"add"),Qt=qt(-1,"subtract");function Xt(e,t){var n=12*(t.year()-e.year())+(t.month()-e.month()),s=e.clone().add(n,"months");return-(n+(t-s<0?(t-s)/(s-e.clone().add(n-1,"months")):(t-s)/(e.clone().add(n+1,"months")-s)))||0}function Kt(e){var t;return void 0===e?this._locale._abbr:(null!=(t=dt(e))&&(this._locale=t),this)}n.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",n.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var en=D("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});function tn(){return this._locale}var nn=1e3,sn=60*nn,rn=60*sn,an=3506328*rn;function on(e,t){return(e%t+t)%t}function un(e,t,n){return e<100&&e>=0?new Date(e+400,t,n)-an:new Date(e,t,n).valueOf()}function ln(e,t,n){return e<100&&e>=0?Date.UTC(e+400,t,n)-an:Date.UTC(e,t,n)}function hn(e,t){I(0,[e,e.length],0,t)}function dn(e,t,n,s,i){var r;return null==e?Ae(this,s,i).year:(t>(r=je(e,s,i))&&(t=r),function(e,t,n,s,i){var r=Ie(e,t,n,s,i),a=Ve(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}.call(this,e,t,n,s,i))}I(0,["gg",2],0,function(){return this.weekYear()%100}),I(0,["GG",2],0,function(){return this.isoWeekYear()%100}),hn("gggg","weekYear"),hn("ggggg","weekYear"),hn("GGGG","isoWeekYear"),hn("GGGGG","isoWeekYear"),C("weekYear","gg"),C("isoWeekYear","GG"),F("weekYear",1),F("isoWeekYear",1),ue("G",se),ue("g",se),ue("GG",B,z),ue("gg",B,z),ue("GGGG",ee,q),ue("gggg",ee,q),ue("GGGGG",te,J),ue("ggggg",te,J),fe(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=M(e)}),fe(["gg","GG"],function(e,t,s,i){t[i]=n.parseTwoDigitYear(e)}),I("Q",0,"Qo","quarter"),C("quarter","Q"),F("quarter",7),ue("Q",Z),ce("Q",function(e,t){t[ye]=3*(M(e)-1)}),I("D",["DD",2],"Do","date"),C("date","D"),F("date",9),ue("D",B),ue("DD",B,z),ue("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),ce(["D","DD"],ge),ce("Do",function(e,t){t[ge]=M(e.match(B)[0])});var cn=be("Date",!0);I("DDD",["DDDD",3],"DDDo","dayOfYear"),C("dayOfYear","DDD"),F("dayOfYear",4),ue("DDD",K),ue("DDDD",$),ce(["DDD","DDDD"],function(e,t,n){n._dayOfYear=M(e)}),I("m",["mm",2],0,"minute"),C("minute","m"),F("minute",14),ue("m",B),ue("mm",B,z),ce(["m","mm"],pe);var fn=be("Minutes",!1);I("s",["ss",2],0,"second"),C("second","s"),F("second",15),ue("s",B),ue("ss",B,z),ce(["s","ss"],we);var mn,_n=be("Seconds",!1);for(I("S",0,0,function(){return~~(this.millisecond()/100)}),I(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),I(0,["SSS",3],0,"millisecond"),I(0,["SSSS",4],0,function(){return 10*this.millisecond()}),I(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),I(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),I(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),I(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),I(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),C("millisecond","ms"),F("millisecond",16),ue("S",K,Z),ue("SS",K,z),ue("SSS",K,$),mn="SSSS";mn.length<=9;mn+="S")ue(mn,ne);function yn(e,t){t[Me]=M(1e3*("0."+e))}for(mn="S";mn.length<=9;mn+="S")ce(mn,yn);var gn=be("Milliseconds",!1);I("z",0,0,"zoneAbbr"),I("zz",0,0,"zoneName");var vn=v.prototype;function pn(e){return e}vn.add=Bt,vn.calendar=function(e,t){var s=e||xt(),i=Vt(s,this).startOf("day"),r=n.calendarFormat(this,i)||"sameElse",a=t&&(b(t[r])?t[r].call(this,s):t[r]);return this.format(a||this.localeData().calendar(r,this,xt(s)))},vn.clone=function(){return new v(this)},vn.diff=function(e,t,n){var s,i,r;if(!this.isValid())return NaN;if(!(s=Vt(e,this)).isValid())return NaN;switch(i=6e4*(s.utcOffset()-this.utcOffset()),t=H(t)){case"year":r=Xt(this,s)/12;break;case"month":r=Xt(this,s);break;case"quarter":r=Xt(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-i)/864e5;break;case"week":r=(this-s-i)/6048e5;break;default:r=this-s}return n?r:w(r)},vn.endOf=function(e){var t;if(void 0===(e=H(e))||"millisecond"===e||!this.isValid())return this;var s=this._isUTC?ln:un;switch(e){case"year":t=s(this.year()+1,0,1)-1;break;case"quarter":t=s(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":t=s(this.year(),this.month()+1,1)-1;break;case"week":t=s(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":t=s(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":t=s(this.year(),this.month(),this.date()+1)-1;break;case"hour":t=this._d.valueOf(),t+=rn-on(t+(this._isUTC?0:this.utcOffset()*sn),rn)-1;break;case"minute":t=this._d.valueOf(),t+=sn-on(t,sn)-1;break;case"second":t=this._d.valueOf(),t+=nn-on(t,nn)-1}return this._d.setTime(t),n.updateOffset(this,!0),this},vn.format=function(e){e||(e=this.isUtc()?n.defaultFormatUtc:n.defaultFormat);var t=A(this,e);return this.localeData().postformat(t)},vn.from=function(e,t){return this.isValid()&&(p(e)&&e.isValid()||xt(e).isValid())?Zt({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},vn.fromNow=function(e){return this.from(xt(),e)},vn.to=function(e,t){return this.isValid()&&(p(e)&&e.isValid()||xt(e).isValid())?Zt({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},vn.toNow=function(e){return this.to(xt(),e)},vn.get=function(e){return b(this[e=H(e)])?this[e]():this},vn.invalidAt=function(){return c(this).overflow},vn.isAfter=function(e,t){var n=p(e)?e:xt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())},vn.isBefore=function(e,t){var n=p(e)?e:xt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())},vn.isBetween=function(e,t,n,s){var i=p(e)?e:xt(e),r=p(t)?t:xt(t);return!!(this.isValid()&&i.isValid()&&r.isValid())&&("("===(s=s||"()")[0]?this.isAfter(i,n):!this.isBefore(i,n))&&(")"===s[1]?this.isBefore(r,n):!this.isAfter(r,n))},vn.isSame=function(e,t){var n,s=p(e)?e:xt(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(t=H(t)||"millisecond")?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))},vn.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},vn.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},vn.isValid=function(){return f(this)},vn.lang=en,vn.locale=Kt,vn.localeData=tn,vn.max=Wt,vn.min=Pt,vn.parsingFlags=function(){return h({},c(this))},vn.set=function(e,t){if("object"==typeof e)for(var n=function(e){var t=[];for(var n in e)t.push({unit:n,priority:U[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}(e=R(e)),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit]);else if(b(this[e=H(e)]))return this[e](t);return this},vn.startOf=function(e){var t;if(void 0===(e=H(e))||"millisecond"===e||!this.isValid())return this;var s=this._isUTC?ln:un;switch(e){case"year":t=s(this.year(),0,1);break;case"quarter":t=s(this.year(),this.month()-this.month()%3,1);break;case"month":t=s(this.year(),this.month(),1);break;case"week":t=s(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":t=s(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":t=s(this.year(),this.month(),this.date());break;case"hour":t=this._d.valueOf(),t-=on(t+(this._isUTC?0:this.utcOffset()*sn),rn);break;case"minute":t=this._d.valueOf(),t-=on(t,sn);break;case"second":t=this._d.valueOf(),t-=on(t,nn)}return this._d.setTime(t),n.updateOffset(this,!0),this},vn.subtract=Qt,vn.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},vn.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},vn.toDate=function(){return new Date(this.valueOf())},vn.toISOString=function(e){if(!this.isValid())return null;var t=!0!==e,n=t?this.clone().utc():this;return n.year()<0||n.year()>9999?A(n,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):b(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",A(n,"Z")):A(n,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},vn.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i=t+'[")]';return this.format(n+s+"-MM-DD[T]HH:mm:ss.SSS"+i)},vn.toJSON=function(){return this.isValid()?this.toISOString():null},vn.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},vn.unix=function(){return Math.floor(this.valueOf()/1e3)},vn.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},vn.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},vn.year=Te,vn.isLeapYear=function(){return Ye(this.year())},vn.weekYear=function(e){return dn.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},vn.isoWeekYear=function(e){return dn.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},vn.quarter=vn.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},vn.month=Fe,vn.daysInMonth=function(){return We(this.year(),this.month())},vn.week=vn.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},vn.isoWeek=vn.isoWeeks=function(e){var t=Ae(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},vn.weeksInYear=function(){var e=this.localeData()._week;return je(this.year(),e.dow,e.doy)},vn.isoWeeksInYear=function(){return je(this.year(),1,4)},vn.date=cn,vn.day=vn.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=function(e,t){return"string"!=typeof e?e:isNaN(e)?"number"==typeof(e=t.weekdaysParse(e))?e:null:parseInt(e,10)}(e,this.localeData()),this.add(e-t,"d")):t},vn.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},vn.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=function(e,t){return"string"==typeof e?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}(e,this.localeData());return this.day(this.day()%7?t:t-7)}return this.day()||7},vn.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},vn.hour=vn.hours=st,vn.minute=vn.minutes=fn,vn.second=vn.seconds=_n,vn.millisecond=vn.milliseconds=gn,vn.utcOffset=function(e,t,s){var i,r=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null!=e){if("string"==typeof e){if(null===(e=Gt(re,e)))return this}else Math.abs(e)<16&&!s&&(e*=60);return!this._isUTC&&t&&(i=Et(this)),this._offset=e,this._isUTC=!0,null!=i&&this.add(i,"m"),r!==e&&(!t||this._changeInProgress?Jt(this,Zt(e-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,n.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?r:Et(this)},vn.utc=function(e){return this.utcOffset(0,e)},vn.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Et(this),"m")),this},vn.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=Gt(ie,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},vn.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?xt(e).utcOffset():0,(this.utcOffset()-e)%60==0)},vn.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},vn.isLocal=function(){return!!this.isValid()&&!this._isUTC},vn.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},vn.isUtc=It,vn.isUTC=It,vn.zoneAbbr=function(){return this._isUTC?"UTC":""},vn.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},vn.dates=D("dates accessor is deprecated. Use date instead.",cn),vn.months=D("months accessor is deprecated. Use month instead",Fe),vn.years=D("years accessor is deprecated. Use year instead",Te),vn.zone=D("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),vn.isDSTShifted=D("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!r(this._isDSTShifted))return this._isDSTShifted;var e={};if(y(e,this),(e=Tt(e))._a){var t=e._isUTC?d(e._a):xt(e._a);this._isDSTShifted=this.isValid()&&k(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted});var wn=P.prototype;function Mn(e,t,n,s){var i=dt(),r=d().set(s,t);return i[n](r,e)}function kn(e,t,n){if(a(e)&&(t=e,e=void 0),e=e||"",null!=t)return Mn(e,t,n,"month");var s,i=[];for(s=0;s<12;s++)i[s]=Mn(e,s,n,"month");return i}function Sn(e,t,n,s){"boolean"==typeof e?(a(t)&&(n=t,t=void 0),t=t||""):(n=t=e,e=!1,a(t)&&(n=t,t=void 0),t=t||"");var i,r=dt(),o=e?r._week.dow:0;if(null!=n)return Mn(t,(n+o)%7,s,"day");var u=[];for(i=0;i<7;i++)u[i]=Mn(t,(i+o)%7,s,"day");return u}wn.calendar=function(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return b(s)?s.call(t,n):s},wn.longDateFormat=function(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},wn.invalidDate=function(){return this._invalidDate},wn.ordinal=function(e){return this._ordinal.replace("%d",e)},wn.preparse=pn,wn.postformat=pn,wn.relativeTime=function(e,t,n,s){var i=this._relativeTime[n];return b(i)?i(e,t,n,s):i.replace(/%d/i,e)},wn.pastFuture=function(e,t){var n=this._relativeTime[e>0?"future":"past"];return b(n)?n(t):n.replace(/%s/i,t)},wn.set=function(e){var t,n;for(n in e)b(t=e[n])?this[n]=t:this["_"+n]=t;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},wn.months=function(e,t){return e?s(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||Ce).test(t)?"format":"standalone"][e.month()]:s(this._months)?this._months:this._months.standalone},wn.monthsShort=function(e,t){return e?s(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[Ce.test(t)?"format":"standalone"][e.month()]:s(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},wn.monthsParse=function(e,t,n){var s,i,r;if(this._monthsParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=d([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?-1!==(i=Oe.call(this._shortMonthsParse,a))?i:null:-1!==(i=Oe.call(this._longMonthsParse,a))?i:null:"MMM"===t?-1!==(i=Oe.call(this._shortMonthsParse,a))?i:-1!==(i=Oe.call(this._longMonthsParse,a))?i:null:-1!==(i=Oe.call(this._longMonthsParse,a))?i:-1!==(i=Oe.call(this._shortMonthsParse,a))?i:null}.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(i=d([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}},wn.monthsRegex=function(e){return this._monthsParseExact?(l(this,"_monthsRegex")||Ge.call(this),e?this._monthsStrictRegex:this._monthsRegex):(l(this,"_monthsRegex")||(this._monthsRegex=Ne),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},wn.monthsShortRegex=function(e){return this._monthsParseExact?(l(this,"_monthsRegex")||Ge.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(l(this,"_monthsShortRegex")||(this._monthsShortRegex=Le),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},wn.week=function(e){return Ae(e,this._week.dow,this._week.doy).week},wn.firstDayOfYear=function(){return this._week.doy},wn.firstDayOfWeek=function(){return this._week.dow},wn.weekdays=function(e,t){var n=s(this._weekdays)?this._weekdays:this._weekdays[e&&!0!==e&&this._weekdays.isFormat.test(t)?"format":"standalone"];return!0===e?Ze(n,this._week.dow):e?n[e.day()]:n},wn.weekdaysMin=function(e){return!0===e?Ze(this._weekdaysMin,this._week.dow):e?this._weekdaysMin[e.day()]:this._weekdaysMin},wn.weekdaysShort=function(e){return!0===e?Ze(this._weekdaysShort,this._week.dow):e?this._weekdaysShort[e.day()]:this._weekdaysShort},wn.weekdaysParse=function(e,t,n){var s,i,r;if(this._weekdaysParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=d([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?-1!==(i=Oe.call(this._weekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Oe.call(this._shortWeekdaysParse,a))?i:null:-1!==(i=Oe.call(this._minWeekdaysParse,a))?i:null:"dddd"===t?-1!==(i=Oe.call(this._weekdaysParse,a))?i:-1!==(i=Oe.call(this._shortWeekdaysParse,a))?i:-1!==(i=Oe.call(this._minWeekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Oe.call(this._shortWeekdaysParse,a))?i:-1!==(i=Oe.call(this._weekdaysParse,a))?i:-1!==(i=Oe.call(this._minWeekdaysParse,a))?i:null:-1!==(i=Oe.call(this._minWeekdaysParse,a))?i:-1!==(i=Oe.call(this._weekdaysParse,a))?i:-1!==(i=Oe.call(this._shortWeekdaysParse,a))?i:null}.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(i=d([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}},wn.weekdaysRegex=function(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Xe.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(l(this,"_weekdaysRegex")||(this._weekdaysRegex=Je),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},wn.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Xe.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(l(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Be),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},wn.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(l(this,"_weekdaysRegex")||Xe.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(l(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Qe),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},wn.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},wn.meridiem=function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},lt("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===M(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th")}}),n.lang=D("moment.lang is deprecated. Use moment.locale instead.",lt),n.langData=D("moment.langData is deprecated. Use moment.localeData instead.",dt);var Dn=Math.abs;function Yn(e,t,n,s){var i=Zt(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,e._bubble()}function On(e){return e<0?Math.floor(e):Math.ceil(e)}function Tn(e){return 4800*e/146097}function bn(e){return 146097*e/4800}function xn(e){return function(){return this.as(e)}}var Pn=xn("ms"),Wn=xn("s"),Cn=xn("m"),Hn=xn("h"),Rn=xn("d"),Un=xn("w"),Fn=xn("M"),Ln=xn("Q"),Nn=xn("y");function Gn(e){return function(){return this.isValid()?this._data[e]:NaN}}var Vn=Gn("milliseconds"),En=Gn("seconds"),In=Gn("minutes"),An=Gn("hours"),jn=Gn("days"),Zn=Gn("months"),zn=Gn("years");var $n=Math.round,qn={ss:44,s:45,m:45,h:22,d:26,M:11};var Jn=Math.abs;function Bn(e){return(e>0)-(e<0)||+e}function Qn(){if(!this.isValid())return this.localeData().invalidDate();var e,t,n=Jn(this._milliseconds)/1e3,s=Jn(this._days),i=Jn(this._months);e=w(n/60),t=w(e/60),n%=60,e%=60;var r=w(i/12),a=i%=12,o=s,u=t,l=e,h=n?n.toFixed(3).replace(/\.?0+$/,""):"",d=this.asSeconds();if(!d)return"P0D";var c=d<0?"-":"",f=Bn(this._months)!==Bn(d)?"-":"",m=Bn(this._days)!==Bn(d)?"-":"",_=Bn(this._milliseconds)!==Bn(d)?"-":"";return c+"P"+(r?f+r+"Y":"")+(a?f+a+"M":"")+(o?m+o+"D":"")+(u||l||h?"T":"")+(u?_+u+"H":"")+(l?_+l+"M":"")+(h?_+h+"S":"")}var Xn=Rt.prototype;return Xn.isValid=function(){return this._isValid},Xn.abs=function(){var e=this._data;return this._milliseconds=Dn(this._milliseconds),this._days=Dn(this._days),this._months=Dn(this._months),e.milliseconds=Dn(e.milliseconds),e.seconds=Dn(e.seconds),e.minutes=Dn(e.minutes),e.hours=Dn(e.hours),e.months=Dn(e.months),e.years=Dn(e.years),this},Xn.add=function(e,t){return Yn(this,e,t,1)},Xn.subtract=function(e,t){return Yn(this,e,t,-1)},Xn.as=function(e){if(!this.isValid())return NaN;var t,n,s=this._milliseconds;if("month"===(e=H(e))||"quarter"===e||"year"===e)switch(t=this._days+s/864e5,n=this._months+Tn(t),e){case"month":return n;case"quarter":return n/3;case"year":return n/12}else switch(t=this._days+Math.round(bn(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}},Xn.asMilliseconds=Pn,Xn.asSeconds=Wn,Xn.asMinutes=Cn,Xn.asHours=Hn,Xn.asDays=Rn,Xn.asWeeks=Un,Xn.asMonths=Fn,Xn.asQuarters=Ln,Xn.asYears=Nn,Xn.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*M(this._months/12):NaN},Xn._bubble=function(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return r>=0&&a>=0&&o>=0||r<=0&&a<=0&&o<=0||(r+=864e5*On(bn(o)+a),a=0,o=0),u.milliseconds=r%1e3,e=w(r/1e3),u.seconds=e%60,t=w(e/60),u.minutes=t%60,n=w(t/60),u.hours=n%24,a+=w(n/24),o+=i=w(Tn(a)),a-=On(bn(i)),s=w(o/12),o%=12,u.days=a,u.months=o,u.years=s,this},Xn.clone=function(){return Zt(this)},Xn.get=function(e){return e=H(e),this.isValid()?this[e+"s"]():NaN},Xn.milliseconds=Vn,Xn.seconds=En,Xn.minutes=In,Xn.hours=An,Xn.days=jn,Xn.weeks=function(){return w(this.days()/7)},Xn.months=Zn,Xn.years=zn,Xn.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var t=this.localeData(),n=function(e,t,n){var s=Zt(e).abs(),i=$n(s.as("s")),r=$n(s.as("m")),a=$n(s.as("h")),o=$n(s.as("d")),u=$n(s.as("M")),l=$n(s.as("y")),h=i<=qn.ss&&["s",i]||i<qn.s&&["ss",i]||r<=1&&["m"]||r<qn.m&&["mm",r]||a<=1&&["h"]||a<qn.h&&["hh",a]||o<=1&&["d"]||o<qn.d&&["dd",o]||u<=1&&["M"]||u<qn.M&&["MM",u]||l<=1&&["y"]||["yy",l];return h[2]=t,h[3]=+e>0,h[4]=n,function(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}.apply(null,h)}(this,!e,t);return e&&(n=t.pastFuture(+this,n)),t.postformat(n)},Xn.toISOString=Qn,Xn.toString=Qn,Xn.toJSON=Qn,Xn.locale=Kt,Xn.localeData=tn,Xn.toIsoString=D("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Qn),Xn.lang=en,I("X",0,0,"unix"),I("x",0,0,"valueOf"),ue("x",se),ue("X",/[+-]?\d+(\.\d{1,3})?/),ce("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),ce("x",function(e,t,n){n._d=new Date(M(e))}),n.version="2.24.0",e=xt,n.fn=vn,n.min=function(){return Ct("isBefore",[].slice.call(arguments,0))},n.max=function(){return Ct("isAfter",[].slice.call(arguments,0))},n.now=function(){return Date.now?Date.now():+new Date},n.utc=d,n.unix=function(e){return xt(1e3*e)},n.months=function(e,t){return kn(e,t,"months")},n.isDate=o,n.locale=lt,n.invalid=m,n.duration=Zt,n.isMoment=p,n.weekdays=function(e,t,n){return Sn(e,t,n,"weekdays")},n.parseZone=function(){return xt.apply(null,arguments).parseZone()},n.localeData=dt,n.isDuration=Ut,n.monthsShort=function(e,t){return kn(e,t,"monthsShort")},n.weekdaysMin=function(e,t,n){return Sn(e,t,n,"weekdaysMin")},n.defineLocale=ht,n.updateLocale=function(e,t){if(null!=t){var n,s,i=it;null!=(s=ut(e))&&(i=s._config),(n=new P(t=x(i,t))).parentLocale=rt[e],rt[e]=n,lt(e)}else null!=rt[e]&&(null!=rt[e].parentLocale?rt[e]=rt[e].parentLocale:null!=rt[e]&&delete rt[e]);return rt[e]},n.locales=function(){return Y(rt)},n.weekdaysShort=function(e,t,n){return Sn(e,t,n,"weekdaysShort")},n.normalizeUnits=H,n.relativeTimeRounding=function(e){return void 0===e?$n:"function"==typeof e&&($n=e,!0)},n.relativeTimeThreshold=function(e,t){return void 0!==qn[e]&&(void 0===t?qn[e]:(qn[e]=t,"s"===e&&(qn.ss=t-1),!0))},n.calendarFormat=function(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"},n.prototype=vn,n.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"},n});}catch(e){}

	// PNG lib
	try{!function(){function i(i,t){for(var s=2;s<arguments.length;s++)for(var h=0;h<arguments[s].length;h++)i[t++]=arguments[s].charAt(h)}function t(i){return String.fromCharCode(i>>24&255,i>>16&255,i>>8&255,255&i)}function s(i){return String.fromCharCode(255&i,i>>8&255)}var h=function(h,f,e){this.width=h,this.height=f,this.depth=e,this.pix_size=f*(h+1),this.data_size=2+this.pix_size+5*Math.floor((65534+this.pix_size)/65535)+4,this.ihdr_offs=0,this.ihdr_size=25,this.plte_offs=this.ihdr_offs+this.ihdr_size,this.plte_size=8+3*e+4,this.trns_offs=this.plte_offs+this.plte_size,this.trns_size=8+e+4,this.idat_offs=this.trns_offs+this.trns_size,this.idat_size=8+this.data_size+4,this.iend_offs=this.idat_offs+this.idat_size,this.iend_size=12,this.buffer_size=this.iend_offs+this.iend_size,this.buffer=new Array,this.palette=new Object,this.pindex=0;for(var r=new Array,o=0;o<this.buffer_size;o++)this.buffer[o]="\0";i(this.buffer,this.ihdr_offs,t(this.ihdr_size-12),"IHDR",t(h),t(f),"\b"),i(this.buffer,this.plte_offs,t(this.plte_size-12),"PLTE"),i(this.buffer,this.trns_offs,t(this.trns_size-12),"tRNS"),i(this.buffer,this.idat_offs,t(this.idat_size-12),"IDAT"),i(this.buffer,this.iend_offs,t(this.iend_size-12),"IEND");var n,d=30912;d+=31-d%31,i(this.buffer,this.idat_offs+8,(n=d,String.fromCharCode(n>>8&255,255&n)));for(o=0;(o<<16)-1<this.pix_size;o++){var a,_;o+65535<this.pix_size?(a=65535,_="\0"):(a=this.pix_size-(o<<16)-o,_=""),i(this.buffer,this.idat_offs+8+2+(o<<16)+(o<<2),_,s(a),s(~a))}for(o=0;o<256;o++){for(var u=o,p=0;p<8;p++)u=1&u?-306674912^u>>1&2147483647:u>>1&2147483647;r[o]=u}this.index=function(i,t){var s=t*(this.width+1)+i+1;return this.idat_offs+8+2+5*Math.floor(s/65535+1)+s},this.color=function(i,t,s,h){var f=(((h=h>=0?h:255)<<8|i)<<8|t)<<8|s;if(void 0===this.palette[f]){if(this.pindex==this.depth)return"\0";var e=this.plte_offs+8+3*this.pindex;this.buffer[e+0]=String.fromCharCode(i),this.buffer[e+1]=String.fromCharCode(t),this.buffer[e+2]=String.fromCharCode(s),this.buffer[this.trns_offs+8+this.pindex]=String.fromCharCode(h),this.palette[f]=String.fromCharCode(this.pindex++)}return this.palette[f]},this.getBase64=function(){var i,t,s,h,f,e,r,o=this.getDump(),n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",d=o.length,a=0,_="";do{h=(i=o.charCodeAt(a))>>2,f=(3&i)<<4|(t=o.charCodeAt(a+1))>>4,s=o.charCodeAt(a+2),e=d<a+2?64:(15&t)<<2|s>>6,r=d<a+3?64:63&s,_+=n.charAt(h)+n.charAt(f)+n.charAt(e)+n.charAt(r)}while((a+=3)<d);return _},this.getDump=function(){for(var s=1,h=0,f=5552,e=0;e<this.height;e++)for(var o=-1;o<this.width;o++)h+=s+=this.buffer[this.index(o,e)].charCodeAt(0),0==(f-=1)&&(s%=65521,h%=65521,f=5552);function n(s,h,f){for(var e=-1,o=4;o<f-4;o+=1)e=r[255&(e^s[h+o].charCodeAt(0))]^e>>8&16777215;i(s,h+f-4,t(-1^e))}return s%=65521,h%=65521,i(this.buffer,this.idat_offs+this.idat_size-8,t(h<<16|s)),n(this.buffer,this.ihdr_offs,this.ihdr_size),n(this.buffer,this.plte_offs,this.plte_size),n(this.buffer,this.trns_offs,this.trns_size),n(this.buffer,this.idat_offs,this.idat_size),n(this.buffer,this.iend_offs,this.iend_size),"Â‰PNG\r\n\n"+this.buffer.join("")}};"undefined"!=typeof module&&void 0!==module.exports?module.exports=h:window.PNGlib=h}();}catch(e){}
	//Identicon
	try{!function(){var t;t="undefined"!=typeof module&&void 0!==module.exports?require("./pnglib"):window.PNGlib;var i=function(t,i){if("string"!=typeof t||t.length<15)throw"A hash of at least 15 characters is required.";this.defaults={background:[240,240,240,255],margin:.08,size:64,saturation:.7,brightness:.5,format:"png"},this.options="object"==typeof i?i:this.defaults,"number"==typeof arguments[1]&&(this.options.size=arguments[1]),arguments[2]&&(this.options.margin=arguments[2]),this.hash=t,this.background=this.options.background||this.defaults.background,this.size=this.options.size||this.defaults.size,this.format=this.options.format||this.defaults.format,this.margin=void 0!==this.options.margin?this.options.margin:this.defaults.margin;var s=parseInt(this.hash.substr(-7),16)/268435455,r=this.options.saturation||this.defaults.saturation,o=this.options.brightness||this.defaults.brightness;this.foreground=this.options.foreground||this.hsl2rgb(s,r,o)};i.prototype={background:null,foreground:null,hash:null,margin:null,size:null,format:null,image:function(){return this.isSvg()?new s(this.size,this.foreground,this.background):new t(this.size,this.size,256)},render:function(){var t,i,s=this.image(),r=this.size,o=Math.floor(r*this.margin),e=Math.floor((r-2*o)/5),n=Math.floor((r-5*e)/2),h=s.color.apply(s,this.background),a=s.color.apply(s,this.foreground);for(t=0;t<15;t++)i=parseInt(this.hash.charAt(t),16)%2?h:a,t<5?this.rectangle(2*e+n,t*e+n,e,e,i,s):t<10?(this.rectangle(1*e+n,(t-5)*e+n,e,e,i,s),this.rectangle(3*e+n,(t-5)*e+n,e,e,i,s)):t<15&&(this.rectangle(0*e+n,(t-10)*e+n,e,e,i,s),this.rectangle(4*e+n,(t-10)*e+n,e,e,i,s));return s},rectangle:function(t,i,s,r,o,e){var n,h;if(this.isSvg())e.rectangles.push({x:t,y:i,w:s,h:r,color:o});else for(n=t;n<t+s;n++)for(h=i;h<i+r;h++)e.buffer[e.index(n,h)]=o},hsl2rgb:function(t,i,s){return[255*(i=[s+=i*=s<.5?s:1-s,s-(t*=6)%1*i*2,s-=i*=2,s,s+t%1*i,s+i])[~~t%6],255*i[(16|t)%6],255*i[(8|t)%6]]},toString:function(t){return t?this.render().getDump():this.render().getBase64()},isSvg:function(){return this.format.match(/svg/i)}};var s=function(t,i,s){this.size=t,this.foreground=this.color.apply(this,i),this.background=this.color.apply(this,s),this.rectangles=[]};s.prototype={size:null,foreground:null,background:null,rectangles:null,color:function(t,i,s,r){var o=[t,i,s].map(Math.round);return o.push(r>=0&&r<=255?r/255:1),"rgba("+o.join(",")+")"},getDump:function(){var t,i,s,r=this.foreground,o=this.background,e=.005*this.size;for(i="<svg xmlns='http://www.w3.org/2000/svg' width='"+this.size+"' height='"+this.size+"' style='background-color:"+o+";'><g style='fill:"+r+"; stroke:"+r+"; stroke-width:"+e+";'>",t=0;t<this.rectangles.length;t++)(s=this.rectangles[t]).color!=o&&(i+="<rect  x='"+s.x+"' y='"+s.y+"' width='"+s.w+"' height='"+s.h+"'/>");return i+="</g></svg>"},getBase64:function(){if("function"==typeof btoa)return btoa(this.getDump());if(Buffer)return new Buffer(this.getDump(),"binary").toString("base64");throw"Cannot generate base64 output"}},"undefined"!=typeof module&&void 0!==module.exports?module.exports=i:window.Identicon=i}();}catch(e){}
	// encoding
	try{!function(n){function e(n,e,t){var f=0,b=[0],c="",s=null;if("UTF8"!==(c=t||"UTF8")&&"UTF16"!==c)throw"encoding must be UTF8 or UTF16";if("HEX"===e){if(0!=n.length%2)throw"srcString of HEX type must be in byte increments";s=a(n),f=s.binLen,b=s.value}else if("ASCII"===e||"TEXT"===e)s=r(n,c),f=s.binLen,b=s.value;else{if("B64"!==e)throw"inputFormat must be HEX, TEXT, ASCII, or B64";s=o(n),f=s.binLen,b=s.value}this.getHash=function(n,e,t,r){var a,o=null,c=b.slice(),s=f;if(3===arguments.length?"number"!=typeof t&&(r=t,t=1):2===arguments.length&&(t=1),t!==parseInt(t,10)||1>t)throw"numRounds must a integer >= 1";switch(e){case"HEX":o=w;break;case"B64":o=i;break;default:throw"format must be HEX or B64"}if("SHA-1"===n)for(a=0;a<t;a++)c=L(c,s),s=160;else if("SHA-224"===n)for(a=0;a<t;a++)c=P(c,s,n),s=224;else if("SHA-256"===n)for(a=0;a<t;a++)c=P(c,s,n),s=256;else if("SHA-384"===n)for(a=0;a<t;a++)c=P(c,s,n),s=384;else{if("SHA-512"!==n)throw"Chosen SHA variant is not supported";for(a=0;a<t;a++)c=P(c,s,n),s=512}return o(c,u(r))},this.getHMAC=function(n,e,t,s,l){var p,h,H,d,v=[],A=[];switch(p=null,s){case"HEX":s=w;break;case"B64":s=i;break;default:throw"outputFormat must be HEX or B64"}if("SHA-1"===t)h=64,d=160;else if("SHA-224"===t)h=64,d=224;else if("SHA-256"===t)h=64,d=256;else if("SHA-384"===t)h=128,d=384;else{if("SHA-512"!==t)throw"Chosen SHA variant is not supported";h=128,d=512}if("HEX"===e)H=(p=a(n)).binLen,p=p.value;else if("ASCII"===e||"TEXT"===e)H=(p=r(n,c)).binLen,p=p.value;else{if("B64"!==e)throw"inputFormat must be HEX, TEXT, ASCII, or B64";H=(p=o(n)).binLen,p=p.value}for(n=8*h,e=h/4-1,h<H/8?(p="SHA-1"===t?L(p,H):P(p,H,t))[e]&=4294967040:h>H/8&&(p[e]&=4294967040),h=0;h<=e;h+=1)v[h]=909522486^p[h],A[h]=1549556828^p[h];return s(t="SHA-1"===t?L(A.concat(L(v.concat(b),n+f)),n+d):P(A.concat(P(v.concat(b),n+f,t)),n+d,t),u(l))}}function t(n,e){this.a=n,this.b=e}function r(n,e){var t,r,a=[],o=[],w=0;if("UTF8"===e)for(r=0;r<n.length;r+=1)for(o=[],2048<(t=n.charCodeAt(r))?(o[0]=224|(61440&t)>>>12,o[1]=128|(4032&t)>>>6,o[2]=128|63&t):128<t?(o[0]=192|(1984&t)>>>6,o[1]=128|63&t):o[0]=t,t=0;t<o.length;t+=1)a[w>>>2]|=o[t]<<24-w%4*8,w+=1;else if("UTF16"===e)for(r=0;r<n.length;r+=1)a[w>>>2]|=n.charCodeAt(r)<<16-w%4*8,w+=2;return{value:a,binLen:8*w}}function a(n){var e,t,r=[],a=n.length;if(0!=a%2)throw"String of HEX type must be in byte increments";for(e=0;e<a;e+=2){if(t=parseInt(n.substr(e,2),16),isNaN(t))throw"String of HEX type contains invalid characters";r[e>>>3]|=t<<24-e%8*4}return{value:r,binLen:4*a}}function o(n){var e,t,r,a,o,w=[],i=0;if(-1===n.search(/^[a-zA-Z0-9=+\/]+$/))throw"Invalid character in base-64 string";if(e=n.indexOf("="),n=n.replace(/\=/g,""),-1!==e&&e<n.length)throw"Invalid '=' found in base-64 string";for(t=0;t<n.length;t+=4){for(o=n.substr(t,4),r=a=0;r<o.length;r+=1)a|=(e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(o[r]))<<18-6*r;for(r=0;r<o.length-1;r+=1)w[i>>2]|=(a>>>16-8*r&255)<<24-i%4*8,i+=1}return{value:w,binLen:8*i}}function w(n,e){var t,r,a="",o=4*n.length;for(t=0;t<o;t+=1)r=n[t>>>2]>>>8*(3-t%4),a+="0123456789abcdef".charAt(r>>>4&15)+"0123456789abcdef".charAt(15&r);return e.outputUpper?a.toUpperCase():a}function i(n,e){var t,r,a,o="",w=4*n.length;for(t=0;t<w;t+=3)for(a=(n[t>>>2]>>>8*(3-t%4)&255)<<16|(n[t+1>>>2]>>>8*(3-(t+1)%4)&255)<<8|n[t+2>>>2]>>>8*(3-(t+2)%4)&255,r=0;4>r;r+=1)o=8*t+6*r<=32*n.length?o+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a>>>6*(3-r)&63):o+e.b64Pad;return o}function u(n){var e={outputUpper:!1,b64Pad:"="};try{n.hasOwnProperty("outputUpper")&&(e.outputUpper=n.outputUpper),n.hasOwnProperty("b64Pad")&&(e.b64Pad=n.b64Pad)}catch(n){}if("boolean"!=typeof e.outputUpper)throw"Invalid outputUpper formatting option";if("string"!=typeof e.b64Pad)throw"Invalid b64Pad formatting option";return e}function f(n,e){return n<<e|n>>>32-e}function b(n,e){return n>>>e|n<<32-e}function c(n,e){var r=null;r=new t(n.a,n.b);return 32>=e?new t(r.a>>>e|r.b<<32-e&4294967295,r.b>>>e|r.a<<32-e&4294967295):new t(r.b>>>e-32|r.a<<64-e&4294967295,r.a>>>e-32|r.b<<64-e&4294967295)}function s(n,e){return 32>=e?new t(n.a>>>e,n.b>>>e|n.a<<32-e&4294967295):new t(0,n.a>>>e-32)}function l(n,e,t){return n^e^t}function p(n,e,t){return n&e^~n&t}function h(n,e,r){return new t(n.a&e.a^~n.a&r.a,n.b&e.b^~n.b&r.b)}function H(n,e,t){return n&e^n&t^e&t}function d(n,e,r){return new t(n.a&e.a^n.a&r.a^e.a&r.a,n.b&e.b^n.b&r.b^e.b&r.b)}function v(n){return b(n,2)^b(n,13)^b(n,22)}function A(n){var e=c(n,28),r=c(n,34);return n=c(n,39),new t(e.a^r.a^n.a,e.b^r.b^n.b)}function S(n){return b(n,6)^b(n,11)^b(n,25)}function g(n){var e=c(n,14),r=c(n,18);return n=c(n,41),new t(e.a^r.a^n.a,e.b^r.b^n.b)}function m(n){return b(n,7)^b(n,18)^n>>>3}function U(n){var e=c(n,1),r=c(n,8);return n=s(n,7),new t(e.a^r.a^n.a,e.b^r.b^n.b)}function E(n){return b(n,17)^b(n,19)^n>>>10}function T(n){var e=c(n,19),r=c(n,61);return n=s(n,6),new t(e.a^r.a^n.a,e.b^r.b^n.b)}function X(n,e){var t=(65535&n)+(65535&e);return((n>>>16)+(e>>>16)+(t>>>16)&65535)<<16|65535&t}function y(n,e,t,r){var a=(65535&n)+(65535&e)+(65535&t)+(65535&r);return((n>>>16)+(e>>>16)+(t>>>16)+(r>>>16)+(a>>>16)&65535)<<16|65535&a}function I(n,e,t,r,a){var o=(65535&n)+(65535&e)+(65535&t)+(65535&r)+(65535&a);return((n>>>16)+(e>>>16)+(t>>>16)+(r>>>16)+(a>>>16)+(o>>>16)&65535)<<16|65535&o}function C(n,e){var r,a,o;return r=(65535&n.b)+(65535&e.b),o=(65535&(a=(n.b>>>16)+(e.b>>>16)+(r>>>16)))<<16|65535&r,r=(65535&n.a)+(65535&e.a)+(a>>>16),new t((65535&(a=(n.a>>>16)+(e.a>>>16)+(r>>>16)))<<16|65535&r,o)}function F(n,e,r,a){var o,w,i;return o=(65535&n.b)+(65535&e.b)+(65535&r.b)+(65535&a.b),i=(65535&(w=(n.b>>>16)+(e.b>>>16)+(r.b>>>16)+(a.b>>>16)+(o>>>16)))<<16|65535&o,o=(65535&n.a)+(65535&e.a)+(65535&r.a)+(65535&a.a)+(w>>>16),new t((65535&(w=(n.a>>>16)+(e.a>>>16)+(r.a>>>16)+(a.a>>>16)+(o>>>16)))<<16|65535&o,i)}function x(n,e,r,a,o){var w,i,u;return w=(65535&n.b)+(65535&e.b)+(65535&r.b)+(65535&a.b)+(65535&o.b),u=(65535&(i=(n.b>>>16)+(e.b>>>16)+(r.b>>>16)+(a.b>>>16)+(o.b>>>16)+(w>>>16)))<<16|65535&w,w=(65535&n.a)+(65535&e.a)+(65535&r.a)+(65535&a.a)+(65535&o.a)+(i>>>16),new t((65535&(i=(n.a>>>16)+(e.a>>>16)+(r.a>>>16)+(a.a>>>16)+(o.a>>>16)+(w>>>16)))<<16|65535&w,u)}function L(n,e){var t,r,a,o,w,i,u,b,c,s=[],h=p,d=l,v=H,A=f,S=X,g=I,m=[1732584193,4023233417,2562383102,271733878,3285377520];for(n[e>>>5]|=128<<24-e%32,n[15+(e+65>>>9<<4)]=e,c=n.length,u=0;u<c;u+=16){for(t=m[0],r=m[1],a=m[2],o=m[3],w=m[4],b=0;80>b;b+=1)s[b]=16>b?n[b+u]:A(s[b-3]^s[b-8]^s[b-14]^s[b-16],1),i=20>b?g(A(t,5),h(r,a,o),w,1518500249,s[b]):40>b?g(A(t,5),d(r,a,o),w,1859775393,s[b]):60>b?g(A(t,5),v(r,a,o),w,2400959708,s[b]):g(A(t,5),d(r,a,o),w,3395469782,s[b]),w=o,o=a,a=A(r,30),r=t,t=i;m[0]=S(t,m[0]),m[1]=S(r,m[1]),m[2]=S(a,m[2]),m[3]=S(o,m[3]),m[4]=S(w,m[4])}return m}function P(n,e,r){var a,o,w,i,u,f,b,c,s,l,L,P,B,k,O,N,j,z,M,R,Z,q,D,G,J,K,Q=[],V=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];if(l=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],o=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],"SHA-224"===r||"SHA-256"===r)L=64,a=15+(e+65>>>9<<4),k=16,O=1,J=Number,N=X,j=y,z=I,M=m,R=E,Z=v,q=S,G=H,D=p,l="SHA-224"===r?l:o;else{if("SHA-384"!==r&&"SHA-512"!==r)throw"Unexpected error in SHA-2 implementation";L=80,a=31+(e+128>>>10<<5),k=32,O=2,N=C,j=F,z=x,M=U,R=T,Z=A,q=g,G=d,D=h,V=[new(J=t)(V[0],3609767458),new J(V[1],602891725),new J(V[2],3964484399),new J(V[3],2173295548),new J(V[4],4081628472),new J(V[5],3053834265),new J(V[6],2937671579),new J(V[7],3664609560),new J(V[8],2734883394),new J(V[9],1164996542),new J(V[10],1323610764),new J(V[11],3590304994),new J(V[12],4068182383),new J(V[13],991336113),new J(V[14],633803317),new J(V[15],3479774868),new J(V[16],2666613458),new J(V[17],944711139),new J(V[18],2341262773),new J(V[19],2007800933),new J(V[20],1495990901),new J(V[21],1856431235),new J(V[22],3175218132),new J(V[23],2198950837),new J(V[24],3999719339),new J(V[25],766784016),new J(V[26],2566594879),new J(V[27],3203337956),new J(V[28],1034457026),new J(V[29],2466948901),new J(V[30],3758326383),new J(V[31],168717936),new J(V[32],1188179964),new J(V[33],1546045734),new J(V[34],1522805485),new J(V[35],2643833823),new J(V[36],2343527390),new J(V[37],1014477480),new J(V[38],1206759142),new J(V[39],344077627),new J(V[40],1290863460),new J(V[41],3158454273),new J(V[42],3505952657),new J(V[43],106217008),new J(V[44],3606008344),new J(V[45],1432725776),new J(V[46],1467031594),new J(V[47],851169720),new J(V[48],3100823752),new J(V[49],1363258195),new J(V[50],3750685593),new J(V[51],3785050280),new J(V[52],3318307427),new J(V[53],3812723403),new J(V[54],2003034995),new J(V[55],3602036899),new J(V[56],1575990012),new J(V[57],1125592928),new J(V[58],2716904306),new J(V[59],442776044),new J(V[60],593698344),new J(V[61],3733110249),new J(V[62],2999351573),new J(V[63],3815920427),new J(3391569614,3928383900),new J(3515267271,566280711),new J(3940187606,3454069534),new J(4118630271,4000239992),new J(116418474,1914138554),new J(174292421,2731055270),new J(289380356,3203993006),new J(460393269,320620315),new J(685471733,587496836),new J(852142971,1086792851),new J(1017036298,365543100),new J(1126000580,2618297676),new J(1288033470,3409855158),new J(1501505948,4234509866),new J(1607167915,987167468),new J(1816402316,1246189591)],l="SHA-384"===r?[new J(3418070365,l[0]),new J(1654270250,l[1]),new J(2438529370,l[2]),new J(355462360,l[3]),new J(1731405415,l[4]),new J(41048885895,l[5]),new J(3675008525,l[6]),new J(1203062813,l[7])]:[new J(o[0],4089235720),new J(o[1],2227873595),new J(o[2],4271175723),new J(o[3],1595750129),new J(o[4],2917565137),new J(o[5],725511199),new J(o[6],4215389547),new J(o[7],327033209)]}for(n[e>>>5]|=128<<24-e%32,n[a]=e,K=n.length,P=0;P<K;P+=k){for(e=l[0],a=l[1],o=l[2],w=l[3],i=l[4],u=l[5],f=l[6],b=l[7],B=0;B<L;B+=1)Q[B]=16>B?new J(n[B*O+P],n[B*O+P+1]):j(R(Q[B-2]),Q[B-7],M(Q[B-15]),Q[B-16]),c=z(b,q(i),D(i,u,f),V[B],Q[B]),s=N(Z(e),G(e,a,o)),b=f,f=u,u=i,i=N(w,c),w=o,o=a,a=e,e=N(c,s);l[0]=N(e,l[0]),l[1]=N(a,l[1]),l[2]=N(o,l[2]),l[3]=N(w,l[3]),l[4]=N(i,l[4]),l[5]=N(u,l[5]),l[6]=N(f,l[6]),l[7]=N(b,l[7])}if("SHA-224"===r)n=[l[0],l[1],l[2],l[3],l[4],l[5],l[6]];else if("SHA-256"===r)n=l;else if("SHA-384"===r)n=[l[0].a,l[0].b,l[1].a,l[1].b,l[2].a,l[2].b,l[3].a,l[3].b,l[4].a,l[4].b,l[5].a,l[5].b];else{if("SHA-512"!==r)throw"Unexpected error in SHA-2 implementation";n=[l[0].a,l[0].b,l[1].a,l[1].b,l[2].a,l[2].b,l[3].a,l[3].b,l[4].a,l[4].b,l[5].a,l[5].b,l[6].a,l[6].b,l[7].a,l[7].b]}return n}"function"==typeof define&&(define.amd,1)?define(function(){return e}):"undefined"!=typeof exports?"undefined"!=typeof module&&module.exports?module.exports=exports=e:exports=e:n.jsSHA=e}(window);}catch(e){}
	
	
	
	// default domain
	// var apiURL = "http://192.168.1.8:9998";
	var apiURL = "http://app.local:9998";

	var cLabs = {
		api: {
			url: apiURL
		},
		classSelector: /^\.([\w-]+)$/, // class string expression check
		idSelector: /^#[\w\d\-\_\&\!\@\*]+$/, // ID string expression check
		tagSelector: /^[\w-]+$/ // TAG string expression check
	};

	// global timeout handling
	try{
		if (typeof setTimeoutGlobal !== 'function') {
			window._setTimeoutGlobalRepository = [];
			window.setTimeoutGlobal = function(id, func, timer){
				var exists = false;
				mapObject(window._setTimeoutGlobalRepository, function(instance, key, count){
					if( id === instance.id ){
						exists = true;
					}
				});
				
				if( !exists ) {
					var interval = setTimeout(function () {
						mapObject(window._setTimeoutGlobalRepository, function (instance, key, count) {
							if (id === instance.id){
								window._setTimeoutGlobalRepository.splice(key, 1);
							}
						});
						
						if (typeof func === "function") {
							func();
						}
					}, timer);
					
					window._setTimeoutGlobalRepository.push({
						id: id,
						func: func,
						timer: timer,
						interval: interval
					});
					
					return interval;
				}else{
					throw new Error("setTimeoutGlobal - ID [" + id + "] already in use");
				}
			};
			
			var closeTimeout = function(){
				if( window._setTimeoutGlobalRepository.length > 0 ){
					mapObject(window._setTimeoutGlobalRepository, function(instance, key, count){
						if( instance.interval ){
							clearInterval(instance.interval);
							instance.interval = null;
						}
					});
				}
			};
			
			var reEnableTimeouts = function(){
				if( window._setTimeoutGlobalRepository.length > 0 ){
					var tmp = [];
					mapObject(window._setTimeoutGlobalRepository, function(instance, key, count){
						tmp.push(instance);
					});
					
					window._setTimeoutGlobalRepository = [];
					mapObject(tmp, function(instance, key, count){
						window.setTimeoutGlobal(instance.id, instance.func, instance.timer);
					});
				}
			};
			
			var windowActivity = function(){
				(function() {
					var hidden = "hidden";
					
					// Standards:
					if (hidden in document)
						document.addEventListener("visibilitychange", onchange);
					else if ((hidden = "mozHidden") in document)
						document.addEventListener("mozvisibilitychange", onchange);
					else if ((hidden = "webkitHidden") in document)
						document.addEventListener("webkitvisibilitychange", onchange);
					else if ((hidden = "msHidden") in document)
						document.addEventListener("msvisibilitychange", onchange);
					// IE 9 and lower:
					else if ("onfocusin" in document)
						document.onfocusin = document.onfocusout = onchange;
					// All others:
					else
						window.onpageshow = window.onpagehide
							= window.onfocus = window.onblur = onchange;
					
					function onchange (evt) {
						var status = "",
							v = "visible",
							h = "hidden",
							evtMap = {
								focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
							};
						
						evt = evt || window.event;
						if (evt.type in evtMap) {
							status = evtMap[evt.type];
						}else {
							status = this[hidden] ? "hidden" : "visible";
						}
						
						if( status === "visible" ){
							reEnableTimeouts();
						}else if( status === "hidden" ){
							closeTimeout();
						}
					}
					
					
					// set the initial state (but only if browser supports the Page Visibility API)
					if( document[hidden] !== undefined )
						onchange({type: document[hidden] ? "blur" : "focus"});
				})();
				
			};
			
			windowActivity();
		}
	}catch(err){ console.log(err) }
	
	/**
	 * returns the size of an Object or array
	 *
	 * @param obj {Object}
	 * @return {Number}
	 */
	var sizeof = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		
		if(size === 0 && isElement(obj)){
			size = 1;
		}
		
		return size;
	};
	
	/**
	 * Returns a count of object from a query result
	 * @paramobj  {Object} anything or Array object
	 */
	var objectCount = function( obj ) {
		if(obj !== null && obj.length !== undefined && obj instanceof Array){
			return obj.length;
		}else if(obj !== null){
			return 1;
		}else{
			return 0;
		}
	};
	
	/**
	 * Removes an HTML DOM element
	 * @paramobj el {Object} DOM element
	 */
	var remove = function(el){
		if(el !== null) {
			el.parentElement.removeChild(el);
		}
	};
	
	/**
	 * Returns true if it is a DOM element
	 *
	 * @param o {Object}
	 * @return {Boolean}
	 */
	var isElement = function(o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
				o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	};

	/**
	 * Object iterator - best usage is for a list of DOM elements
	 * @param obj
	 * @param callback
	 */
	var objectIterator = function( obj, callback ) {
		if( typeof obj !== "undefined" && obj !== null && typeof obj.length !== "undefined" && obj instanceof Array ){
			var count = 0;
			for(var key in obj){
				
				// adding additional check to see if object is element or array
				if (isElement(obj[key])) {
					callback(obj[key], key, count, obj.length);
				}
				count++;
			}
		} else if ( typeof obj !== "undefined" && obj !== null ) {
			// adding additional check to see if object is element or array
			if (isElement(obj)) {
				callback(obj, 0, 0, 1)
			}
		}
	};

	/**
	 * App/Append new class string to the provided DOM element
	 * @param element
	 * @param className
	 * @returns {{classList}|*}
	 */
	var addClass = function(element, className) {
		try{
			if (element.classList){
				element.classList.add(className);
			}else{
				element.className += ' ' + className;
			}
		}catch(e){
			console.trace();
		}
		
		return element;
	};

	/**
	 * Remove class string from provided DOM element
	 * @param element
	 * @param className
	 * @returns {{classList}|*}
	 */
	var removeClass = function(element, className) {
		
		try {
			if (element.classList) {
				element.classList.remove(className);
			} else {
				element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		}catch(e){
			console.log(element, className);
			console.error(e);
			console.trace();
		}
		
		return element;
	};

	/**
	 * Provides an ability to check if a DOM element contains a class string
	 * @param element
	 * @param className
	 * @returns {boolean}
	 */
	var hasClass = function(element, className) {
		
		if(typeof className === 'string') {
			return _hasClass(element, className)
		}else if(className instanceof Array){
			var hasClass = false;
			for(var i in className){
				if(typeof className[i] === 'string' && _hasClass(element, className[i])) {
					hasClass = true;
				}
			}
			return hasClass;
		}
		
	};
	
	function _hasClass(element, className){
		className = className.replace(".", "");
		
		try {
			if (element.classList) {
				return element.classList.contains(className);
			} else {
				return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
			}
		}catch(e){
			if(typeof e.stack !== "undefined"){
				console.log(e.stack);
			}
			console.log(e, element, className);

			return false
		}
	}

	/**
	 * A check if a string contains an entry of searched for term
	 * @param str {string}
	 * @param partial {string}
	 * @returns {boolean}
	 */
	var stringContains = function (str, partial){
		return (str.indexOf(partial) > -1);
	};

	/**
	 * Prepends 0 the provided number and returns the formated element as a string
	 * @param num
	 * @param size {number}
	 * @returns {string} 1 => 001
	 */
	var formatNumberLeadingZeros = function(num, size){
		var s = String(num);
		while (s.length < size) s = "0" + s;
		return s;
	};

	/**
	 * Removes HTML tags from the provided input and returns only the text
	 * - this is a very basic implementation and should be used carefully
	 * @param html {string}
	 * @returns {string | string}
	 */
	var stripHtml = function(html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	};

	/**
	 * Iterate up the tree of DOM elements to find the closes match
	 * @param element
	 * @param selector
	 * @returns {null | ParentNode}
	 */
	var closest = function( element, selector ) {
		
		if(typeof selector === "object" ){
			var selectorClassString = selector.getAttribute("class"),
				selectorIdString = selector.id;
			
			if(selectorIdString !== null && selectorIdString.length > 0){
				selector = "#" + selectorIdString;
			}else if(selectorClassString !== null && selectorClassString.length > 0){
				selector = "." + selectorClassString.split(" ")[0];
			}else{
				selector = selector.nodeName;
			}
		}
		
		function closest( element, selector ){
			try {
				element = element.parentNode;
			}catch(e){
				console.log(element, selector);
				console.trace();
			}
			
			if( element !== null && typeof element === 'object' ) {
				
				if( selector.match(cLabs.classSelector) && hasClass(element, selector) ) {
					return element;
				} else if( selector.match(cLabs.idSelector) && element.id === selector.replace("#", "") ) {
					return element;
				} else if( selector.match(cLabs.tagSelector) && element.nodeName === selector.toUpperCase() ) {
					return element;
				}else{
					return closest( element, selector );
				}
			}else{
				return null;
			}
		}
		
		if( typeof element === 'object' ) {
			return closest( element, selector );
		}else{
			return null;
		}
	};
	
	var appendNext = function(el, newNode){
		if (el.nextSibling) {
			el.parentNode.insertBefore(newNode, el.nextSibling);
		}
		else {
			el.parentNode.appendChild(newNode);
		}
	};
	
	//Format number with leading zeros
	var formatNumberLeadingZeros = function(num, size){
		var s = String(num);
		while (s.length < size) s = "0" + s;
		return s;
	};

	// a check to test if the device is a mobile or tablet
	var isMobileTablet = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

		// custom solution because latest iOS 13 userAgent doesn't return correct mobile information
		if( !check ){
			check = stringContains(window.navigator.userAgent.toLowerCase(), 'macintosh') && ('ontouchend' in document);
		}

		return check;
	};

	var getOffset = function( el ) {
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	};
	
	/**
	 * Query selector, supports CSS element selection
	 *
	 * Supports:
	 *  - Class selection: ".element"
	 *  - ID selection: "#element"
	 *  - Tag selection: "div"
	 *  - Multi depth selection: '.element ul li'
	 *
	 * @param {Object} "optional"
	 * @param {String} CSS element selector
	 * @returns {(Object|null|Array)} depending on the provided selector results can vary (null, node, NodeList array)
	 */
	var query = function( doc, selector ) {
		var result;
		
		var tmpDoc = doc, tmpSelector = selector; // used for debug only
		
		if (typeof doc === 'string' && selector === undefined) {
			selector = doc;
			doc = document;
		}
		
		try {
			
			if(doc !== null) {
				selector = trim(selector); //
				if (selector.match(cLabs.classSelector)) {
					result = doc.getElementsByClassName(selector.replace(".", ""));
				} else if (selector.match(cLabs.idSelector)) {
					result = document.getElementById(selector.replace("#", ""));
				} else if (selector.match(cLabs.tagSelector)) {
					result = doc.getElementsByTagName(selector);
				} else {
					result = doc.querySelectorAll(selector);
				}
			}
			
			if (result !== null && result !== undefined && result.nodeType) {
				return result;
			} else if (result !== null && result !== undefined && result.length === 1) {
				return result[0];
			} else if (result !== null && result !== undefined && result.length > 0) {
				return Array.prototype.slice.call(result);
			} else {
				return null;
			}
		}catch(e){
			console.log(e);
			console.log(tmpSelector);
			console.log(tmpDoc);
			console.log(doc, selector);
		}
		
	};

	var scrollEnabled = function(doc){
		return ( doc !== null ) ? (doc.scrollHeight > doc.offsetHeight) : false;
	};

	var trim = function( string ){
		return string.replace(/^\s+|\s+$/g, '');
	};
	
	/* IE8 version fix */
	if ( !document.getElementsByClassName ) {
		query = function(e,l){var t;return"string"==typeof e&&void 0===l&&(l=e,e=document),null!=(t=(l=trim(l)).match(cLabs.idSelector)?document.getElementById(l.replace("#","")):l.match(cLabs.tagSelector)?e.getElementsByTagName(l):e.querySelectorAll(l))&&t.nodeType?t:null!=t&&1===t.length?t[0]:null!=t&&t.length>0?Array.prototype.slice.call(t):null};
	}

	var mergeObjects = function(obj1, obj2, arrayType){
		var obj3 = (typeof arrayType === 'undefined' || arrayType === false) ? {} : [];

		for(var i in obj1){ obj3[i] = obj1[i]; }

		for(var k in obj2){

			if(typeof obj1[k] !== "object"){
				obj3[k] = obj2[k];
			}else if(obj1[k] instanceof Array){
				obj3[k] = obj2[k]; // arrays get overwritten and not extended
			}else if(typeof obj1[k] !== "undefined" && typeof obj1[k] === "object" && obj1[k] !== null && typeof obj1[k].nodeType === "undefined" && sizeof(obj1[k]) > 0){
				obj3[k] = mergeObjects(obj1[k], obj2[k]);
			}else if(typeof obj1[k] !== "undefined" && typeof obj1[k] === "object"){
				obj3[k] = obj2[k];
			}else{
				console.log("fail");
			}

			if(obj3[k] === undefined){
				delete obj3[k];
			}
		}

		return obj3;
	};
	
	/**
	 * Ajax method
	 *
	 * @class Ajax
	 * @constructor
	 */
	cLabs.Ajax = function() {
		this.xhr = new XMLHttpRequest();
	};
	
	cLabs.Ajax.prototype.createCORSRequest = function(method, url) {
		var obj = this;
		
		if ("withCredentials" in obj.xhr) {
			// Most browsers.
			obj.xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// IE8 & IE9
			obj.xhr = new XDomainRequest();
			
			url = (url.indexOf("https") > -1 && location.protocol !== 'https:') ? url.replace('https', 'http') : url;
			
			obj.xhr.open(method, url);
		} else {
			// CORS not supported.
			obj.xhr = null;
		}
		return obj.xhr;
	};
	
	cLabs.Ajax.prototype.abort = function() {
		var _this = this;

		if( _this.xhr && typeof _this.xhr.readyState !== "undefined" && _this.xhr.readyState !== 4 && _this.xhr.readyState > 0 ){
			console.error("aborting Ajax", _this.xhr.readyState, _this.xhr);
			_this.xhr.abort();
		}
		
		return _this;
	};
	
	/**
	 * Retrieves data from a URL without page refresh
	 *
	 * @method getData
	 * @param {Object} configuration object
	 *  - object contains: HTTP method "type: POST, GET", url: to send the request to, data: {object}
	 * @return {String} in success object
	 */
	cLabs.Ajax.prototype.getData = function ( data ) {
		var obj = this;
		
		try{
			data.type           = (data.type !== undefined && typeof data.type === 'string' && data.type.length > 0) ? data.type : 'POST';
			data.data           = (data.data !== undefined && typeof data.data === 'object') ? data.data : {};
			data.url            = (data.url !== undefined && typeof data.url === 'string' && data.url.length > 0) ? data.url : '';
			data.success        = (data.success !== undefined) ? data.success : (function(){});
			data.error          = (data.error !== undefined) ? data.error : (function(){});
			data.headers        = (data.headers !== undefined) ? data.headers : {};
			data.extraCallback  = (data.extraCallback !== undefined) ? data.extraCallback : (function(){});
			
			// cross browser CORS support
			obj.xhr = this.createCORSRequest(data.type, data.url);
			
			obj.xhr.onload = function() {
				data.extraCallback(data, obj.xhr);
				data.success(obj.xhr.responseText, data, obj.xhr);
			};
			
			obj.xhr.onerror = function () {
				data.error(obj.xhr.status);
			};
			
			if (typeof XDomainRequest === "undefined") {
				if( sizeof(data.headers) > 0 ){
					var item;
					for( item in data.headers ){
						obj.xhr.setRequestHeader(item, data.headers[item]);
					}
				}else if ( (data.type === 'POST' || data.type === 'PUT') && sizeof(data.headers) === 0 ) {
					obj.xhr.setRequestHeader("Content-Type", "application/json");
				} else {
					obj.xhr.setRequestHeader("Content-Type", "text/plain");
				}
			}
			
			obj.xhr.send( JSON.stringify(data.data) );
			
			return obj.xhr;
		}catch(err){console.log(err);}
	};
	
	// var scrollObj2 = null;
	var movementInterval;
	var dragElement = function(elmnt, draggableEl, overlayContainer, container, dragging, finishDragging, mobileTouch) {
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0,
			isMobile = isMobileTablet(),
			isParentWindow = elmnt.parentNode.nodeName === "BODY",
			maxLeft = ( isParentWindow ? window.innerWidth : container.offsetWidth ),
			maxTop = ( isParentWindow ? window.innerHeight : container.offsetHeight ),
			touchStart, moving = null;
			// scrollObj2 = query(".scroll-res");

		if( movementInterval ){
			clearTimeout(movementInterval);
		}

		var onWindowChange = function(){
			var isVertical = hasClass(elmnt, "cl-vertical-mini"),
				maxLeft = ( isParentWindow ? window.innerWidth : container.offsetWidth ),
				maxTop = ( isParentWindow ? window.innerHeight : container.offsetHeight ),
				offsetMaxLeft = maxLeft - parseInt( elmnt.offsetWidth + ( isVertical ? draggableEl.offsetWidth/7 : draggableEl.offsetWidth/1.6) ),
				offsetMaxTop = maxTop - parseInt( elmnt.offsetHeight + ( isVertical ? draggableEl.offsetHeight/1.2 : draggableEl.offsetHeight/4 ) ),
				elTop = parseInt(elmnt.style.top),
				elLeft = parseInt(elmnt.style.left);

			if( elTop > offsetMaxTop && offsetMaxTop > 5 ){
				elmnt.style.top = offsetMaxTop + "px";
			}
			if( elLeft > offsetMaxLeft && offsetMaxLeft > 5 ){
				elmnt.style.left = offsetMaxLeft + "px";
			}
		};

		if( isMobile ){
			/* listen to the touchMove event,
			  every time it fires, grab the location
			  of touch and assign it to box */

			var justATouch = false;
			draggableEl.addEventListener('touchstart', function(e) {
				justATouch = true;

				if(touchStart) clearTimeout(touchStart);

				maxLeft = ( isParentWindow ? window.innerWidth : container.offsetWidth );
				maxTop = ( isParentWindow ? window.innerHeight : container.offsetHeight );

				touchStart = setTimeout(function(){
					justATouch = false;
				}, 100);
			}, { passive:false });

			draggableEl.addEventListener('touchmove', function(e) {
				pos3 = e.targetTouches[0].pageX;
				pos4 = e.targetTouches[0].pageY;
				// moving = new Date().getTime();

				elementDrag(e);
			}, { passive:false });

			draggableEl.addEventListener('touchend', function(e) {
				// e.preventDefault();
				// current box position.
				closeDragElement(e);
				moving = null;

				if( justATouch && typeof mobileTouch === "function" ){
					mobileTouch();
				}

			}, { passive:false });

			window.addEventListener("orientationchange", function(e){
				onWindowChange();
			}, true);
		}else {

			// if present, the header is where you move the DIV from:
			draggableEl.onmousedown = dragMouseDown;

			window.addEventListener("resize", function(e){
				onWindowChange();
			}, true);

		}


		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();

			maxLeft = ( isParentWindow ? window.innerWidth : container.offsetWidth );
			maxTop = ( isParentWindow ? window.innerHeight : container.offsetHeight );

			overlayContainer.style.display = "block";

			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}


		/**
		 * Adds additional offset to max left and top based on orientation and container width (will be affected by CSS styling so needs to be adjusted accordingly)
		 * - elmnt => is the main container that has the positioning applied to
		 * - draggableEl => key element that is mean for dragging
		 */
		var checkMaxMinRestraints = function(newTop, newLeft, offsetMaxLeft, offsetMaxTop){
			var // minLeft = (isVertical ? elmnt.offsetWidth/4 : 0 ), // attempt to restrict the container to go out of bounds by a few pixels, needs some work
				minLeft = 0,
				top = ( newTop <= 0 ? 0 : newTop ),
				left = ( newLeft <= minLeft ? minLeft : newLeft );

			if( left >= offsetMaxLeft ){
				left = offsetMaxLeft;
			}
			if( top >= offsetMaxTop ){
				top = offsetMaxTop;
			}

			return {
				top: top,
				left: left
			};
		};

		function elementDrag(e) {

			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			var posX = ( isMobile ) ? e.targetTouches[0].pageX : e.clientX,
				posY = ( isMobile ) ? e.targetTouches[0].pageY : e.clientY,
				isVertical = hasClass(elmnt, "cl-vertical-mini"),
				offsetMaxLeft = maxLeft - parseInt( elmnt.offsetWidth + ( isVertical ? draggableEl.offsetWidth/7 : draggableEl.offsetWidth/1.6) ),
				offsetMaxTop = maxTop - parseInt( elmnt.offsetHeight + ( isVertical ? draggableEl.offsetHeight/1.2 : draggableEl.offsetHeight/4 ) );

			pos1 = pos3 - posX;
			pos2 = pos4 - posY;
			pos3 = parseInt(posX);
			pos4 = parseInt(posY);
			moving = new Date().getTime();

			checkMovement();

			if( !hasClass(elmnt, "cl-being-moved") ) addClass(elmnt, "cl-being-moved");

			var newTop =  ( isMobile ) ? (posY - parseInt( draggableEl.offsetHeight/2 )) : (elmnt.offsetTop - pos2),
				newLeft =  ( isMobile ) ? (posX - parseInt( draggableEl.offsetWidth/2 )) : (elmnt.offsetLeft - pos1),
				leftTopCheck = checkMaxMinRestraints(newTop, newLeft, offsetMaxLeft, offsetMaxTop); // set the element's new position:

			// scrollObj2.innerHTML = leftTopCheck.top + "-" + leftTopCheck.left + " : "+ newTop + "-" + newLeft + " : " + (posX < 0 || posY < 0 || posX > maxLeft || posY > maxTop) + "-" + (newTop > offsetMaxTop || newLeft > offsetMaxLeft);
			// scrollObj2.innerHTML = leftTopCheck.top + "-" + leftTopCheck.left + " : "+ newTop +"-"+ newLeft + " : " + (posX < 0 || posY < 0 || posX > maxLeft || posY > maxTop) + "-" + (newTop > offsetMaxTop || newLeft > offsetMaxLeft);

			if( posX < 0 || posY < 0 || posX > maxLeft || posY > maxTop ) {
				closeDragElement(e);
			}else if( newTop > offsetMaxTop || newLeft > offsetMaxLeft ){
				closeDragElement(e);
			}else if( leftTopCheck.top > offsetMaxTop || leftTopCheck.left > offsetMaxLeft ){
				closeDragElement(e);
			}else {
				elmnt.style.top = leftTopCheck.top + "px";
				elmnt.style.left = leftTopCheck.left + "px";
			}

			
			if( typeof dragging === "function" ) dragging(newTop, newLeft);
		}
		
		function closeDragElement(e) {
			overlayContainer.style.display = "none";
			if( isMobile ) {
				e.preventDefault();
			}else{
				// stop moving when mouse button is released:
				document.onmouseup = null;
				document.onmousemove = null;
			}
			moving = null;

			removeClass(elmnt, "cl-being-moved");
			
			if( typeof finishDragging === "function" ) finishDragging();
		}

		function checkMovement(){

			if( movementInterval ){
				clearTimeout(movementInterval);
			}

			movementInterval = setTimeout(function(){
				if( moving !== null && moving+3000 < new Date().getTime() && !isMobile ){
					closeDragElement();
				}else if( moving !== null ){
					checkMovement();
				}
			}, 3000);
		};
	};


	/**
	 * SSE Messaging
	 * @param options
	 * @constructor
	 */
	var Messaging = function( options ){

		this.settings = {
			source: null,
			ajax: {
				url: null,
				apiKey: undefined,
				errorCallback: function(){}
			},
			sseUrl: null,
			heartbeat: null,
			lastHeartbeat: null,
			mainAjax: new cLabs.Ajax(),
			heartBeatAjax: new cLabs.Ajax(),
			heartWaitTime: 25000,
			messageQueue: [],
			messageInterval: 1000,
			startupCheck: true,
			active: false,
			debug: false,
			callback: function(data){},
			onStartupError: function(){}
		};

		if( typeof options !== "undefined" ){
			for(var opt in options){
				if (options.hasOwnProperty(opt)) {
					this.settings[opt] = options[opt];
				}
			}
		}

		this.intervalInstance = null;
		this.heartbeatIntervalInstance = null;


		this.lookupData = function(){
			var _this = this;


			if(_this.settings.messageQueue.length > 0) {
				var data = _this.settings.messageQueue[0];

				var index = _this.settings.messageQueue.indexOf(data);
				if (index > -1) {
					_this.settings.messageQueue.splice(index, 1);
				}

				if( typeof _this.settings.ajax.url === "string" && _this.settings.ajax.url.length > 0 ) {
					_this.getData(data);
				}else{
					_this.settings.callback(data);
				}
			}
		};

		this.setInterval = function(){
			var _this = this;

			_this.intervalInstance = setInterval(function(){

				_this.lookupData();

			}, _this.settings.messageInterval);

			if( _this.settings.heartbeat !== null ) {
				_this.settings.lastHeartbeat = new Date();
				_this.heartbeatIntervalInstance = setInterval(function () {

					var currentTime = new Date(),
						diff = _this.settings.lastHeartbeat.getTime()-currentTime.getTime();

					if( _this.settings.source.readyState === 0 && diff > _this.settings.heartWaitTime ) {
						_this.closeChanel();
					}

					_this.hearBeatCheck();

				}, _this.settings.heartWaitTime);
			}
		};

		/**
		 * Request a heartbeat
		 * - if the request is failing close the connection
		 * - if the request is successful but the connection is closed reopen and call for a heartbeat again
		 */
		this.hearBeatCheck = function(){
			var _this = this;

			var dataObj = {
				url: _this.settings.heartbeat,
				headers: _this.settings.ajax.apiKey,
				type: "GET",
				success: function (response, dataObject, xhr) {
					if ( xhr.status !== 200 && _this.settings.source.readyState === 0 ) {
						if(_this.settings.debug) console.log('[Msg] SSE Closing connection');
						_this.closeChanel();
					}else if( xhr.status === 200 && _this.settings.source.readyState === 2 ){
						if(_this.settings.debug) console.log('[Msg] SSE Trying to re-open the connection');
						_this.openChanel();

						setTimeout(function(){
							_this.hearBeatCheck();
						}, 200)
					}
				}
			};

			if(typeof _this.settings.ajax.apiKey !== "undefined"){
				dataObj.headers = _this.settings.ajax.apiKey;
			}

			_this.settings.heartBeatAjax.abort().getData(dataObj);
		};

		this.getData = function(){
			var _this = this;

			var dataObj = {
				url: _this.settings.ajax.url,
				type: "GET",
				success: function (response, dataObject, xhr) {
					var json = {};
					try{json = JSON.parse(response)}catch(e){
						if(_this.settings.debug) console.log(e, _this.settings);
					}
					if ( xhr.status === 200 ) {
						_this.settings.callback(json);
					}else{
						_this.settings.ajax.errorCallback(json);
					}
				}
			};

			if(typeof _this.settings.ajax.apiKey !== "undefined"){
				dataObj.headers = _this.settings.ajax.apiKey;
			}

			_this.settings.mainAjax.abort().getData(dataObj);
		};

		this.openChanel = function(){
			var _this = this;

			_this.settings.source = new EventSource(_this.settings.sseUrl, {withCredentials: true});

			_this.serverSideEventListeners(_this.settings.source);
		};

		this.serverSideEventListeners = function(source){
			var _this = this;

			source.addEventListener('open', function(e) {
				_this.settings.active = true;
				if(_this.settings.debug) console.log("[Msg] connection opened", e);
			}, false);

			source.addEventListener('message', function(e) {
				if(_this.settings.debug){
					console.log("[Msg] message check", _this.settings.sseUrl);
					console.log(e.data);
				}
				var data = e.data,
					json = null;

				try{
					json = JSON.parse(data);
				}catch(e){}

				if( _this.settings.heartbeat !== null ) {
					_this.settings.lastHeartbeat = new Date();
				}

				if( json !== null && typeof json.heartbeat === "undefined" ){
					_this.settings.messageQueue.push(json);
				}

			}, false);

			source.addEventListener('error', function(e) {
				if(_this.settings.debug) console.log("[Msg] error check", _this.settings.sseUrl);
				if (e.readyState == EventSource.CLOSED) {
					if(_this.settings.debug) console.warn("[Msg] connection closed", e);
				}else{
					if(_this.settings.debug) console.log(e, e.readyState);
				}

				_this.closeChanel();

				_this.settings.startupCheck = false;
			}, false);
		};

		this.closeChanel = function(){
			this.settings.active = false;
			this.settings.source.close();
		};

		this.sseFailed = function(){
			var _this = this;

			_this.settings.heartbeat = null;
			_this.settings.active = false;

			if( _this.heartbeatIntervalInstance !== null ) {
				clearInterval(_this.heartbeatIntervalInstance);
			}

			_this.settings.onStartupError(_this.settings);
		};

		this.windowActivity = function(){
			var _this = this;

			(function() {
				var hidden = "hidden";

				// Standards:
				if (hidden in document)
					document.addEventListener("visibilitychange", onchange);
				else if ((hidden = "mozHidden") in document)
					document.addEventListener("mozvisibilitychange", onchange);
				else if ((hidden = "webkitHidden") in document)
					document.addEventListener("webkitvisibilitychange", onchange);
				else if ((hidden = "msHidden") in document)
					document.addEventListener("msvisibilitychange", onchange);
				// IE 9 and lower:
				else if ("onfocusin" in document)
					document.onfocusin = document.onfocusout = onchange;
				// All others:
				else
					window.onpageshow = window.onpagehide
						= window.onfocus = window.onblur = onchange;

				function onchange (evt) {
					var status = "",
						v = "visible",
						h = "hidden",
						evtMap = {
							focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
						};

					evt = evt || window.event;
					if (evt.type in evtMap) {
						status = evtMap[evt.type];
					}else {
						status = this[hidden] ? "hidden" : "visible";
					}

					if( status === "visible" && (_this.settings.source.readyState !== 0 && _this.settings.source.readyState !== 1) ){
						_this.openChanel();
					}else if( status === "hidden" && (_this.settings.source.readyState === 0 || _this.settings.source.readyState === 1) ){
						_this.closeChanel();
					}
				}


				// set the initial state (but only if browser supports the Page Visibility API)
				if( document[hidden] !== undefined )
					onchange({type: document[hidden] ? "blur" : "focus"});
			})();

		};

		this.init = function() {
			var _this = this;

			try{

				if(_this.settings.debug) console.log("[Msg] SSE starting", _this.settings.sseUrl, new Date());

				_this.openChanel();

				if(_this.settings.debug) console.log("[Msg] SSE started", _this.settings.sseUrl, new Date(), _this.settings.source.readyState);

				_this.setInterval();
				_this.windowActivity();

				setTimeout(function(){
					if( !_this.settings.startupCheck ){
						console.log("sse failed");
						_this.sseFailed();
					}
				}, 2000);

				window.addEventListener('unload', function(event) {
					if(_this.settings.debug) console.log("[Msg] closing messaging service", new Date());
					_this.settings.source.close();
					_this.settings.active = false;

					_this.settings.heartBeatAjax.abort();

					if( _this.intervalInstance )
						clearInterval(_this.intervalInstance);
				});
				window.addEventListener('beforeunload', function(event) {
					if(_this.settings.debug) console.log("[Msg] closing messaging service");
					_this.settings.source.close();

					_this.settings.heartBeatAjax.abort();

					if( _this.intervalInstance )
						clearInterval(_this.intervalInstance);
				});

			}catch( e ){
				if(_this.settings.debug) console.log("EventSource failed");
				_this.sseFailed();
			}



		};

		this.init();
	};
	
	
	
	
	var MiniScoreBoard = function( options ){
		this.settings = {
			lbWidget: null,
			container: null,
			overlayContainer: null,
			infoContainer: null,
			updateInterval: null,
			updateIntervalTime: 1000,
			active: false,
			enableDragging: true,
			dragging: false
		};
		
		if( typeof options !== "undefined" ){
			for(var opt in options){
				if (options.hasOwnProperty(opt)) {
					this.settings[opt] = options[opt];
				}
			}
		}
		
		this.layout = function(){
			var wrapper = document.createElement("div"),
				iconWrapper = document.createElement("div"),
				icon = document.createElement("div"),
				
				informationWrapper = document.createElement("div"),
				informationTopWrapper = document.createElement("div"),
				informationWrapperClose = document.createElement("div"),
				informationClose = document.createElement("a");
			
			wrapper.setAttribute("class", "cl-widget-ms-wrapper");
			iconWrapper.setAttribute("class", "cl-widget-ms-icon-wrapper");
			icon.setAttribute("class", "cl-widget-ms-icon");
			informationTopWrapper.setAttribute("class", "cl-widget-ms-information-top-wrapper");
			informationWrapper.setAttribute("class", "cl-widget-ms-information-wrapper");
			informationWrapperClose.setAttribute("class", "cl-widget-ms-information-close-wrapper");
			informationClose.setAttribute("class", "cl-widget-ms-information-close");
			
			informationClose.href = "javascript:void(0);";
			informationClose.innerHTML = "x";
			
			informationWrapperClose.appendChild(informationClose);
			informationWrapper.appendChild(informationWrapperClose);
			informationTopWrapper.appendChild(informationWrapper);
			iconWrapper.appendChild(icon);
			wrapper.appendChild(iconWrapper);
			wrapper.appendChild(informationTopWrapper);
			
			return wrapper;
		};

		this.overlayLayout = function(){
			var wrapper = document.createElement("div");

			wrapper.setAttribute("class", "cl-widget-ms-overlay-wrapper");

			return wrapper;
		};

		this.timeManagement = function(){
			var _this = this,
				diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledStart).diff(moment()),
				label = _this.settings.lbWidget.settings.translation.miniLeaderboard.startsIn,
				date = _this.settings.lbWidget.formatDateTime( moment.duration(diff) ),
				dateObj = _this.settings.lbWidget.formatDateTime( moment.duration(diff) ),
				inverse = false;

			if( diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0 ){
				label = _this.settings.lbWidget.settings.translation.miniLeaderboard.starting;
				date = "";
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode > 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode < 3 ){
				diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledEnd).diff( moment() );
				dateObj = _this.settings.lbWidget.formatDateTime( moment.duration(diff) );
				label = _this.settings.lbWidget.formatDateTime( moment.duration(diff) );
				date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
				inverse = true;
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode === 3 ){
				label = _this.settings.lbWidget.settings.translation.miniLeaderboard.finishing;
				date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
				inverse = true;
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode >= 4 ){
				label = _this.settings.lbWidget.settings.translation.miniLeaderboard.finished;
				date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
				inverse = true;
			}

			return {
				label: label,
				diff: diff,
				date: date,
				dateObj: dateObj,
				inverse: inverse
			};
		};
		
		this.layoutDefaultOrEmptyEntry = function(){
			var lbResultsMemEntry = document.createElement("div"),
				lbResultsMemLabel = document.createElement("div"),
				lbResultsMemRank = document.createElement("div"),
				lbResultsMemIcon = document.createElement("div"),
				lbResultsMemImg = document.createElement("img"),
				lbResultsMemPoints = document.createElement("div");

			lbResultsMemEntry.setAttribute("class", "cl-widget-ms-default-mem-entry");
			lbResultsMemLabel.setAttribute("class", "cl-widget-ms-default-mem-label");
			lbResultsMemRank.setAttribute("class", "cl-widget-ms-default-mem-rank");
			lbResultsMemIcon.setAttribute("class", "cl-widget-ms-default-mem-icon");
			lbResultsMemImg.setAttribute("class", "cl-widget-ms-default-mem-img");
			lbResultsMemImg.style.display = "none";
			lbResultsMemPoints.setAttribute("class", "cl-widget-ms-default-mem-points");

			lbResultsMemEntry.appendChild(lbResultsMemLabel);
			lbResultsMemEntry.appendChild(lbResultsMemRank);
			lbResultsMemIcon.appendChild(lbResultsMemImg);
			lbResultsMemEntry.appendChild(lbResultsMemIcon);
			lbResultsMemEntry.appendChild(lbResultsMemPoints);

			return lbResultsMemEntry;
		};

		this.layoutFirstToOrEmptyEntry = function(){
			var lbResultsMemEntry = document.createElement("div"),
				lbResultsMemLabel = document.createElement("div"),
				lbResultsMemRank = document.createElement("div"),
				lbResultsMemIcon = document.createElement("div"),
				lbResultsMemImg = document.createElement("img"),
				lbResultsMemPoints = document.createElement("div");

			lbResultsMemEntry.setAttribute("class", "cl-widget-ms-first-to-mem-entry");
			lbResultsMemLabel.setAttribute("class", "cl-widget-ms-first-to-mem-label");
			lbResultsMemRank.setAttribute("class", "cl-widget-ms-first-to-mem-rank");
			lbResultsMemIcon.setAttribute("class", "cl-widget-ms-first-to-mem-icon");
			lbResultsMemImg.setAttribute("class", "cl-widget-ms-first-to-mem-img");
			lbResultsMemImg.style.display = "none";
			lbResultsMemPoints.setAttribute("class", "cl-widget-ms-first-to-mem-points");

			lbResultsMemEntry.appendChild(lbResultsMemLabel);
			lbResultsMemEntry.appendChild(lbResultsMemRank);
			lbResultsMemIcon.appendChild(lbResultsMemImg);
			lbResultsMemEntry.appendChild(lbResultsMemIcon);
			lbResultsMemEntry.appendChild(lbResultsMemPoints);

			return lbResultsMemEntry;
		};

		var testLive = false;
		this.layoutDefaultOrEmpty = function(){

			var _this = this,
				timeManagement = _this.timeManagement(),
				diff = timeManagement.diff,
				label = timeManagement.label,
				date = timeManagement.date,
				dateObj = timeManagement.dateObj,
				wrapperDomObj = _this.settings.infoContainer,
				defaultDomObj = query(_this.settings.container, ".cl-widget-ms-default-wrapper"),
				inverse = timeManagement.inverse;

			if( defaultDomObj === null ){
				
				_this.removeUnusedElements();

				addClass(_this.settings.container, "cl-ms-default-style");
				
				var lbWrapper = document.createElement("div"),
					lbDateWrapper = document.createElement("div"),
					lbDateLabel = document.createElement("div"),
					lbDate = document.createElement("div"),
					lbResultsWrapper = document.createElement("div"),
					lbResultsList = document.createElement("div"),
					lbHeaders = document.createElement("div"),
					lbHeadersRank = document.createElement("div"),
					lbHeadersPoints = document.createElement("div"),
					lbResultsMemEntry = _this.layoutDefaultOrEmptyEntry(),
					img = query(lbResultsMemEntry, ".cl-widget-ms-default-mem-img");

				lbWrapper.setAttribute("class", "cl-widget-ms-default-wrapper");
				lbDateLabel.setAttribute("class", "cl-widget-ms-default-date-label");
				lbDate.setAttribute("class", "cl-widget-ms-default-date");
				lbDateWrapper.setAttribute("class", "cl-widget-ms-default-date-wrapper");
				lbResultsWrapper.setAttribute("class", "cl-widget-ms-default-results-wrapper");
				lbResultsList.setAttribute("class", "cl-widget-ms-default-results-list");
				lbHeaders.setAttribute("class", "cl-widget-ms-default-results-headers");
				lbHeadersRank.setAttribute("class", "cl-widget-ms-default-results-header-rank");
				lbHeadersPoints.setAttribute("class", "cl-widget-ms-default-results-header-points");

				lbResultsMemEntry.setAttribute("class", "cl-widget-ms-default-mem-entry");

				// lbDateLabel.innerHTML = label;
				lbDate.innerHTML = dateObj;

				lbDateWrapper.appendChild(lbDateLabel);
				lbDateWrapper.appendChild(lbDate);


				query(lbResultsMemEntry, ".cl-widget-ms-default-mem-rank").innerHTML = "--";
				query(lbResultsMemEntry, ".cl-widget-ms-default-mem-points").innerHTML = "--";

				img.src = "";
				img.alt = "";
				img.style.display = "block";

				lbHeadersRank.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.rank;
				lbHeadersPoints.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.points;

				lbHeaders.appendChild(lbHeadersRank);
				lbHeaders.appendChild(lbHeadersPoints);
				lbResultsList.appendChild(lbResultsMemEntry);
				lbResultsWrapper.appendChild(lbHeaders);
				lbResultsWrapper.appendChild(lbResultsList);

				
				lbWrapper.appendChild(lbDateWrapper);
				lbWrapper.appendChild(lbResultsWrapper);

				defaultDomObj = wrapperDomObj.appendChild(lbWrapper);
				
				setTimeout(function(){
					addClass(wrapperDomObj, "cl-show");
				}, 200);
				
			}else{
				if( !hasClass(wrapperDomObj, "cl-show") ){
					addClass(wrapperDomObj, "cl-show");
				}
				query(_this.settings.container, ".cl-widget-ms-default-date-label").innerHTML = label;
				query(_this.settings.container, ".cl-widget-ms-default-date").innerHTML = date;
			}
			
			mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function(lbEntry){
				if( (lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId) && typeof lbEntry.rankings !== "undefined" ){
					var scoreArea = query(defaultDomObj, ".cl-widget-ms-default-results-list");
					scoreArea.innerHTML = "";

					query(_this.settings.container, ".cl-widget-ms-default-date-label").innerHTML = "";
					query(_this.settings.container, ".cl-widget-ms-default-date").innerHTML = dateObj;
					addClass(query(_this.settings.container, ".cl-widget-ms-default-date-wrapper"), "cl-widget-ms-default-date-only");

					mapObject(lbEntry.rankings, function(lbRankingEntry){
						var icon = _this.settings.lbWidget.populateIdenticonBase64Image( lbRankingEntry.memberId ),
							lbWrapper = _this.layoutDefaultOrEmptyEntry(),
							img = query(lbWrapper, ".cl-widget-ms-default-mem-img"),
							selfMember = ( (lbRankingEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbRankingEntry.memberId === _this.settings.lbWidget.settings.memberId) );

						img.src = icon;
						img.alt = "";
						img.style.display = "block";

						if( selfMember ) {
							addClass(lbWrapper, "cl-widget-ms-default-mem-self");
						}

						query(lbWrapper, ".cl-widget-ms-default-mem-label").innerHTML = selfMember ? "YOU" : "";
						query(lbWrapper, ".cl-widget-ms-default-mem-rank").innerHTML = "<span class='cl-mem-rank-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.rank + "</span><span class='cl-mem-rank'>" + lbRankingEntry.rank + "</span>";
						query(lbWrapper, ".cl-widget-ms-default-mem-points").innerHTML = "<span class='cl-mem-points-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.points + "</span><span class='cl-mem-points'>" + lbRankingEntry.points + "</span>";

						scoreArea.appendChild(lbWrapper);
					});

					testLive = true;
					// var lastScore = query(_this.settings.container, ".cl-widget-ms-default-last-score").innerHTML,
					// 	highScore = query(_this.settings.container, ".cl-widget-ms-default-high-score").innerHTML,
					// 	rank = query(_this.settings.container, ".cl-widget-ms-default-rank-value"),
					// 	change = (lbEntry.change < 0) ? "down" : ( lbEntry.change > 0 ? "up" : "same" ),
					// 	rankValue = lbEntry.rank;
					//
					// if( lastScore !== String(lbEntry.points) && String(lbEntry.points) !== highScore ){
					// 	query(_this.settings.container, ".cl-widget-ms-default-last-score").innerHTML = highScore;
					// }
					//
					// query(_this.settings.container, ".cl-widget-ms-default-high-score").innerHTML = lbEntry.points;
					//
					// removeClass(rank, "cl-ms-rank-up");
					// removeClass(rank, "cl-ms-rank-down");
					// removeClass(rank, "cl-ms-rank-same");
					//
					// addClass(rank, "cl-ms-rank-" + change);
					//
					// rank.innerHTML = rankValue;
				}
			});
			
			if( inverse && !hasClass(defaultDomObj, "cl-inverse") ){
				addClass(defaultDomObj, "cl-inverse");
			}
		};

		this.layoutFirstToOrEmpty = function( strategy ){

			var _this = this,
				timeManagement = _this.timeManagement(),
				diff = timeManagement.diff,
				label = timeManagement.label,
				date = timeManagement.date,
				dateObj = timeManagement.dateObj,
				wrapperDomObj = _this.settings.infoContainer,
				defaultDomObj = query(_this.settings.container, ".cl-widget-ms-first-to-wrapper"),
				inverse = timeManagement.inverse;

			if( defaultDomObj === null ){

				_this.removeUnusedElements();

				addClass(_this.settings.container, "cl-ms-first-to-style");

				var lbWrapper = document.createElement("div"),
					lbDateWrapper = document.createElement("div"),
					lbDateLabel = document.createElement("div"),
					lbDate = document.createElement("div"),
					lbResultsWrapper = document.createElement("div"),
					lbResultsList = document.createElement("div"),
					lbHeaders = document.createElement("div"),
					lbHeadersRank = document.createElement("div"),
					lbHeadersPoints = document.createElement("div"),
					lbResultsMemEntry = _this.layoutFirstToOrEmptyEntry(),
					img = query(lbResultsMemEntry, ".cl-widget-ms-first-to-mem-img");

				lbWrapper.setAttribute("class", "cl-widget-ms-first-to-wrapper");
				lbDateLabel.setAttribute("class", "cl-widget-ms-first-to-date-label");
				lbDate.setAttribute("class", "cl-widget-ms-first-to-date");
				lbDateWrapper.setAttribute("class", "cl-widget-ms-first-to-date-wrapper");
				lbResultsWrapper.setAttribute("class", "cl-widget-ms-first-to-results-wrapper");
				lbResultsList.setAttribute("class", "cl-widget-ms-first-to-results-list");
				lbHeaders.setAttribute("class", "cl-widget-ms-first-to-results-headers");
				lbHeadersRank.setAttribute("class", "cl-widget-ms-first-to-results-header-rank");
				lbHeadersPoints.setAttribute("class", "cl-widget-ms-first-to-results-header-points");

				lbResultsMemEntry.setAttribute("class", "cl-widget-ms-first-to-mem-entry");

				// lbDateLabel.innerHTML = label;
				lbDate.innerHTML = dateObj;

				lbDateWrapper.appendChild(lbDateLabel);
				lbDateWrapper.appendChild(lbDate);


				query(lbResultsMemEntry, ".cl-widget-ms-first-to-mem-rank").innerHTML = "--";
				query(lbResultsMemEntry, ".cl-widget-ms-first-to-mem-points").innerHTML = "--/" + strategy.recordTimeWhenSumReaches;

				img.src = "";
				img.alt = "";
				img.style.display = "block";

				lbHeadersRank.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.rank;
				lbHeadersPoints.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.points;

				lbHeaders.appendChild(lbHeadersRank);
				lbHeaders.appendChild(lbHeadersPoints);
				lbResultsList.appendChild(lbResultsMemEntry);
				lbResultsWrapper.appendChild(lbHeaders);
				lbResultsWrapper.appendChild(lbResultsList);


				lbWrapper.appendChild(lbDateWrapper);
				lbWrapper.appendChild(lbResultsWrapper);

				defaultDomObj = wrapperDomObj.appendChild(lbWrapper);

				setTimeout(function(){
					addClass(wrapperDomObj, "cl-show");
				}, 200);

			}else{
				if( !hasClass(wrapperDomObj, "cl-show") ){
					addClass(wrapperDomObj, "cl-show");
				}
				query(_this.settings.container, ".cl-widget-ms-first-to-date-label").innerHTML = label;
				query(_this.settings.container, ".cl-widget-ms-first-to-date").innerHTML = date;
			}

			mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function(lbEntry){
				if( (lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId) && typeof lbEntry.rankings !== "undefined" ){
					var scoreArea = query(defaultDomObj, ".cl-widget-ms-first-to-results-list");
					scoreArea.innerHTML = "";

					query(_this.settings.container, ".cl-widget-ms-first-to-date-label").innerHTML = "";
					query(_this.settings.container, ".cl-widget-ms-first-to-date").innerHTML = dateObj;
					addClass(query(_this.settings.container, ".cl-widget-ms-first-to-date-wrapper"), "cl-widget-ms-first-to-date-only");

					mapObject(lbEntry.rankings, function(lbRankingEntry){
						var icon = _this.settings.lbWidget.populateIdenticonBase64Image( lbRankingEntry.memberId ),
							lbWrapper = _this.layoutFirstToOrEmptyEntry(),
							img = query(lbWrapper, ".cl-widget-ms-first-to-mem-img"),
							selfMember = ( (lbRankingEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbRankingEntry.memberId === _this.settings.lbWidget.settings.memberId) );

						if( selfMember ) {
							addClass(lbWrapper, "cl-widget-ms-first-to-mem-self");
						}

						img.src = icon;
						img.alt = "";
						img.style.display = "block";

						query(lbWrapper, ".cl-widget-ms-first-to-mem-label").innerHTML = selfMember ? "YOU" : "";
						query(lbWrapper, ".cl-widget-ms-first-to-mem-rank").innerHTML = "<span class='cl-mem-rank-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.rank + "</span><span class='cl-mem-rank'>" + lbRankingEntry.rank + "</span>";
						query(lbWrapper, ".cl-widget-ms-first-to-mem-points").innerHTML = "<span class='cl-mem-points-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.points + "</span><span class='cl-mem-points'>" + lbRankingEntry.points + "/" + strategy.recordTimeWhenSumReaches + "</span>";

						scoreArea.appendChild(lbWrapper);
					});
				}
			});

			if( inverse && !hasClass(defaultDomObj, "cl-inverse") ){
				addClass(defaultDomObj, "cl-inverse");
			}
		};

		this.layoutSumBestOf = function(){

			var _this = this,
				timeManagement = _this.timeManagement(),
				diff = timeManagement.diff,
				label = timeManagement.label,
				date = timeManagement.date,
				wrapperDomObj = _this.settings.infoContainer,
				sumBestDomObj = query(_this.settings.container, ".cl-widget-ms-sum-best-wrapper"),
				inverse = timeManagement.inverse;

			if( sumBestDomObj === null ){

				_this.removeUnusedElements();

				var lbWrapper = document.createElement("div"),
					lbDateWrapper = document.createElement("div"),
					lbDateLabel = document.createElement("div"),
					lbDate = document.createElement("div"),
					lbResultsWrapper = document.createElement("div"),
					lbResultsScoreArea = document.createElement("div"),
					lbResultsScoreAreaHigh = document.createElement("div"),
					lbResultsScoreAreaHighLabel = document.createElement("div"),
					lbResultsScoreAreaHighScore = document.createElement("div"),
					lbResultsScoreAreaLast = document.createElement("div"),
					lbResultsScoreAreaLastLabel = document.createElement("div"),
					lbResultsScoreAreaLastScore = document.createElement("div"),
					lbResultsRankArea = document.createElement("div"),
					lbResultsRankValue = document.createElement("span");

				lbWrapper.setAttribute("class", "cl-widget-ms-sum-best-wrapper");
				lbDateLabel.setAttribute("class", "cl-widget-ms-sum-best-date-label");
				lbDate.setAttribute("class", "cl-widget-ms-sum-best-date");
				lbDateWrapper.setAttribute("class", "cl-widget-ms-sum-best-date-wrapper");
				lbResultsWrapper.setAttribute("class", "cl-widget-ms-sum-best-results-wrapper");

				lbResultsScoreArea.setAttribute("class", "cl-widget-ms-sum-best-area");
				lbResultsScoreAreaHigh.setAttribute("class", "cl-widget-ms-sum-best-high-area");
				lbResultsScoreAreaHighLabel.setAttribute("class", "cl-widget-ms-sum-best-high-label");
				lbResultsScoreAreaHighScore.setAttribute("class", "cl-widget-ms-sum-best-high-score");

				lbResultsScoreAreaLast.setAttribute("class", "cl-widget-ms-sum-best-last-area");
				lbResultsScoreAreaLastLabel.setAttribute("class", "cl-widget-ms-sum-best-last-label");
				lbResultsScoreAreaLastScore.setAttribute("class", "cl-widget-ms-sum-best-last-score");

				lbResultsRankArea.setAttribute("class", "cl-widget-ms-sum-best-rank-area");
				lbResultsRankValue.setAttribute("class", "cl-widget-ms-sum-best-rank-value");

				lbDateLabel.innerHTML = label;
				lbDate.innerHTML = date;

				lbResultsScoreAreaHighLabel.innerHTML = _this.settings.lbWidget.settings.translation.miniLeaderboard.highScore;
				lbResultsScoreAreaHighScore.innerHTML = "--";
				lbResultsScoreAreaHigh.appendChild(lbResultsScoreAreaHighLabel);
				lbResultsScoreAreaHigh.appendChild(lbResultsScoreAreaHighScore);
				lbResultsScoreArea.appendChild(lbResultsScoreAreaHigh);

				lbResultsScoreAreaLastLabel.innerHTML = _this.settings.lbWidget.settings.translation.miniLeaderboard.lastScore;
				lbResultsScoreAreaLastScore.innerHTML = "--";
				lbResultsScoreAreaLast.appendChild(lbResultsScoreAreaLastLabel);
				lbResultsScoreAreaLast.appendChild(lbResultsScoreAreaLastScore);
				lbResultsScoreArea.appendChild(lbResultsScoreAreaLast);

				lbResultsRankValue.innerHTML = "--";
				lbResultsRankArea.appendChild(lbResultsRankValue);

				lbResultsWrapper.appendChild(lbResultsScoreArea);
				lbResultsWrapper.appendChild(lbResultsRankArea);



				lbDateWrapper.appendChild(lbDateLabel);
				lbDateWrapper.appendChild(lbDate);

				lbWrapper.appendChild(lbDateWrapper);
				lbWrapper.appendChild(lbResultsWrapper);

				sumBestDomObj = wrapperDomObj.appendChild(lbWrapper);

				setTimeout(function(){
					addClass(wrapperDomObj, "cl-show");
				}, 200);

			}else{
				if( !hasClass(wrapperDomObj, "cl-show") ){
					addClass(wrapperDomObj, "cl-show");
				}
				query(_this.settings.container, ".cl-widget-ms-sum-best-date-label").innerHTML = label;
				query(_this.settings.container, ".cl-widget-ms-sum-best-date").innerHTML = date;
			}

			mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function(lbEntry){
				if( lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId ){
					var lastScore = query(_this.settings.container, ".cl-widget-ms-sum-best-last-score").innerHTML,
						highScore = query(_this.settings.container, ".cl-widget-ms-sum-best-high-score").innerHTML,
						rank = query(_this.settings.container, ".cl-widget-ms-sum-best-rank-value"),
						change = (lbEntry.change < 0) ? "down" : ( lbEntry.change > 0 ? "up" : "same" ),
						rankValue = lbEntry.rank;

					if( lastScore !== String(lbEntry.points) && String(lbEntry.points) !== highScore ){
						query(_this.settings.container, ".cl-widget-ms-sum-best-last-score").innerHTML = highScore;
					}

					query(_this.settings.container, ".cl-widget-ms-sum-best-high-score").innerHTML = lbEntry.points;

					removeClass(rank, "cl-ms-rank-up");
					removeClass(rank, "cl-ms-rank-down");
					removeClass(rank, "cl-ms-rank-same");

					addClass(rank, "cl-ms-rank-" + change);

					rank.innerHTML = rankValue;
				}
			});

			if( inverse && !hasClass(sumBestDomObj, "cl-inverse") ){
				addClass(sumBestDomObj, "cl-inverse");
			}
		};
		
		this.layoutRequiresOptIn = function(){
			
			var _this = this,
				diff = moment(_this.settings.lbWidget.settings.competition.activeCompetition.scheduledStart).diff(moment()),
				label = "Starting In",
				wrapperDomObj = _this.settings.infoContainer,
				date = _this.settings.lbWidget.formatDateTime( moment.duration(diff) );
			
			if( diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0 ){
				label = "starting";
				date = "";
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode > 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode < 3 ){
				diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledEnd).diff( moment() );
				label = "started";
				date = _this.settings.lbWidget.formatDateTime( moment.duration(diff) );
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode === 3 ){
				label = "finishing";
				date = "";
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode >= 4 ){
				label = "finished";
				date = "";
			}
			
			if( query(_this.settings.container, ".cl-widget-ms-optin-wrapper") === null ){
				
				_this.removeUnusedElements();
				
				var optInWrapper = document.createElement("div"),
					optInDateWrapper = document.createElement("div"),
					optInDateLabel = document.createElement("div"),
					optInDate = document.createElement("div"),
					optInDateActionWrapper = document.createElement("div"),
					optInDateAction = document.createElement("a");
				
				optInWrapper.setAttribute("class", "cl-widget-ms-optin-wrapper");
				optInDateLabel.setAttribute("class", "cl-widget-ms-optin-date-label");
				optInDate.setAttribute("class", "cl-widget-ms-optin-date");
				optInDateWrapper.setAttribute("class", "cl-widget-ms-optin-date-wrapper");
				optInDateActionWrapper.setAttribute("class", "cl-widget-ms-optin-action-wrapper");
				optInDateAction.setAttribute("class", "cl-widget-ms-optin-action");
				
				optInDateLabel.innerHTML = label;
				optInDate.innerHTML = date;
				optInDateAction.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
				
				optInDateWrapper.appendChild(optInDateLabel);
				optInDateWrapper.appendChild(optInDate);
				
				optInDateActionWrapper.appendChild(optInDateAction);
				optInWrapper.appendChild(optInDateWrapper);
				optInWrapper.appendChild(optInDateActionWrapper);
				
				wrapperDomObj.appendChild(optInWrapper);
				
				setTimeout(function(){
					addClass(wrapperDomObj, "cl-show");
				}, 200);
				
			}else{
				if( !hasClass(wrapperDomObj, "cl-show") ){
					addClass(wrapperDomObj, "cl-show");
				}
				query(_this.settings.container, ".cl-widget-ms-optin-date-label").innerHTML = label;
				query(_this.settings.container, ".cl-widget-ms-optin-date").innerHTML = date;
			}
		};
		
		this.removeUnusedElements = function(){
			var _this = this,
				defaultLayoutWrapperDomObj = query(_this.settings.container, ".cl-widget-ms-default-wrapper"),
				optInWrapperDomObj = query(_this.settings.container, ".cl-widget-ms-optin-wrapper"),
				sumBestDomObj = query(_this.settings.container, ".cl-widget-ms-sum-best-wrapper"),
				firstToDomObj = query(_this.settings.container, ".cl-widget-ms-first-to-wrapper");

			removeClass(_this.settings.container, "cl-ms-default-style");
			removeClass(_this.settings.container, "cl-ms-optin-style");
			removeClass(_this.settings.container, "cl-ms-sum-best-style");
			removeClass(_this.settings.container, "cl-ms-first-to-style");

			if( defaultLayoutWrapperDomObj !== null ){
				remove(defaultLayoutWrapperDomObj);
			}
			
			if( optInWrapperDomObj !== null ){
				remove(optInWrapperDomObj);
			}

			if( sumBestDomObj !== null ){
				remove(sumBestDomObj);
			}

			if( firstToDomObj !== null ){
				remove(firstToDomObj);
			}
		};
		
		this.clearAll = function(){
			var _this = this;
			
			if( _this.settings.updateInterval ){
				clearTimeout(_this.settings.updateInterval);
			}
			
			_this.removeInfoArea();
			
			_this.settings.active = false;
		};
		
		this.removeInfoArea = function(){
			var _this = this,
				wrapperDomObj = query(_this.settings.container, ".cl-show"),
				layout = query(_this.settings.container, ".cl-widget-ms-default-wrapper");
			
			if( wrapperDomObj !== null ) removeClass(wrapperDomObj, "cl-show");

			if( layout !== null ){
				setTimeout(function(){
					remove(layout);
				}, 300)
			}
		};
		
		this.updateScoreBoard = function(){
			var _this = this;
			
			if( _this.settings.updateInterval ){
				clearTimeout(_this.settings.updateInterval);
			}
			
			_this.settings.updateInterval = setTimeout(function(){
				_this.loadInfoArea(function(){
					_this.updateScoreBoard();
				});
				
				
			}, _this.settings.updateIntervalTime);
		};
		
		this.loadInfoArea = function( callback ){
			var _this = this;
			
			if( _this.settings.active && _this.settings.lbWidget.settings.competition.activeCompetition !== null && _this.settings.lbWidget.settings.competition.activeCompetition.statusCode < 7 ) {
				if (typeof _this.settings.lbWidget.settings.competition.activeCompetition.optin === "boolean" && !_this.settings.lbWidget.settings.competition.activeCompetition.optin) {
					_this.layoutRequiresOptIn();
					callback();
				} else if ( _this.settings.lbWidget.settings.competition.activeContest !== null && _this.settings.lbWidget.settings.competition.activeContest.strategy.type === "SumBest" ) {
					_this.layoutSumBestOf();
					callback();
				} else if ( _this.settings.lbWidget.settings.competition.activeContest !== null && _this.settings.lbWidget.settings.competition.activeContest.strategy.type === "FirstTo" ) {
					_this.layoutFirstToOrEmpty( _this.settings.lbWidget.settings.competition.activeContest.strategy );
					callback();
				} else if (_this.settings.lbWidget.settings.competition.activeContestId !== null) {
					_this.layoutDefaultOrEmpty();
					callback();
				} else {
					_this.layoutDefaultOrEmpty();
				}
			}else{
				_this.clearAll();
			}
		};
		
		this.eventListeners = function(){
			var _this = this;

			dragElement(_this.settings.container, query(_this.settings.container, ".cl-widget-ms-icon"), _this.settings.overlayContainer, _this.settings.lbWidget.settings.bindContainer, function(newTop, newLeft) {
				_this.settings.lbWidget.stopActivity();
				if( newTop <= 5 ){
					addClass(_this.settings.container, "cl-vertical-mini");
				}else if( newLeft <= 5 ){
					removeClass(_this.settings.container, "cl-vertical-mini");
				}
				
				_this.settings.dragging = true;
			}, function () {
				_this.settings.lbWidget.restartActivity();
				setTimeout(function(){
					_this.settings.dragging = false;
				}, 200)
			}, function(){
				_this.settings.lbWidget.clickedMiniScoreBoard();
			});
		};

		this.initLayout = function( callback ){
			var _this = this;

			if( _this.settings.container === null ){
				_this.settings.active = true;
				_this.settings.container = _this.settings.lbWidget.settings.bindContainer.appendChild( _this.layout() );
				_this.settings.overlayContainer = _this.settings.lbWidget.settings.bindContainer.appendChild( _this.overlayLayout() );
				_this.settings.infoContainer = query(_this.settings.container, ".cl-widget-ms-information-wrapper");

				_this.eventListeners();
			}

			if( typeof callback === "function" ){
				callback();
			}
		};
		
		this.loadScoreBoard = function(){
			var _this = this;

			_this.initLayout(function(){
				_this.loadInfoArea(function(){
					_this.updateScoreBoard();
				});

				setTimeout(function(){
					_this.updateScoreBoard();
				}, 1000);
			});
			

		}
		
	};
	
	
	
	
	
	var Notifications = function( options ){
		this.settings = {
			container: null,
			detailsContainer: null,
			lbWidget: null,
			eventStream: [],
			checkTimeout: 2000,
			onDisplayCheckTimeout: 10000,
			checkInterval: null,
			autoNotificationHideInterval: null,
			autoNotificationHideTime: 10000,
			displayInProgress: false
		};
		
		if( typeof options !== "undefined" ){
			for(var opt in options){
				if (options.hasOwnProperty(opt)) {
					this.settings[opt] = options[opt];
				}
			}
		}

		this.layoutWrapper = function(){
			var wrapper = document.createElement("div"),
				iconWrapper = document.createElement("div"),
				icon = document.createElement("div"),

				informationWrapper = document.createElement("div"),
				informationTopWrapper = document.createElement("div"),
				informationDetailsContainer = document.createElement("div"),
				informationDetailsLabel = document.createElement("div"),
				informationDetailsDescription = document.createElement("div"),
				informationWrapperClose = document.createElement("div"),
				informationClose = document.createElement("a");

			wrapper.setAttribute("class", "cl-widget-notif-wrapper");
			iconWrapper.setAttribute("class", "cl-widget-notif-icon-wrapper");
			icon.setAttribute("class", "cl-widget-notif-icon");
			informationTopWrapper.setAttribute("class", "cl-widget-notif-information-top-wrapper");
			informationWrapper.setAttribute("class", "cl-widget-notif-information-wrapper");
			informationDetailsContainer.setAttribute("class", "cl-widget-notif-information-details-wrapper");
			informationDetailsLabel.setAttribute("class", "cl-widget-notif-information-details-label");
			informationDetailsDescription.setAttribute("class", "cl-widget-notif-information-details-description");
			informationWrapperClose.setAttribute("class", "cl-widget-notif-information-close-wrapper");
			informationClose.setAttribute("class", "cl-widget-notif-information-close");

			informationClose.href = "javascript:void(0);";
			informationClose.innerHTML = "x";

			informationDetailsContainer.appendChild(informationDetailsLabel);
			informationDetailsContainer.appendChild(informationDetailsDescription);

			informationWrapperClose.appendChild(informationClose);
			informationWrapper.appendChild(informationWrapperClose);
			informationWrapper.appendChild(informationDetailsContainer);
			informationTopWrapper.appendChild(informationWrapper);
			iconWrapper.appendChild(icon);
			wrapper.appendChild(iconWrapper);
			wrapper.appendChild(informationTopWrapper);

			return wrapper;
		};

		var processed = {};
		this.startSSE = function(){
			var _this = this;

			_this.settings.sseInstance = new Messaging({
				sseUrl: _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSE.replace(":space", _this.settings.lbWidget.settings.spaceName).replace(":id", _this.settings.lbWidget.settings.memberId),
				heartbeat: _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSEHeartbeat.replace(":space", _this.settings.lbWidget.settings.spaceName).replace(":id", _this.settings.lbWidget.settings.memberId),
				ajax: {
					url: null,
					apiKey: {
						"X-API-KEY": _this.settings.lbWidget.settings.apiKey
					}
				},
				callback: function( data ){
					var dataKey = JSON.stringify(data),
						currentTime = new Date().getTime();

					if( typeof processed[dataKey] === "undefined" || ( typeof processed[dataKey] !== "undefined" && (processed[dataKey]+10000) < currentTime ) ) {
						processed[JSON.stringify(data)] = currentTime;
						_this.settings.eventStream.push(data);
					}
				},
				onStartupError: function(settings){},
				debug: true
			});
		};

		this.autoNotificationHide = function(){
			var _this = this;

			if( _this.settings.autoNotificationHideInterval ){
				clearTimeout(_this.settings.autoNotificationHideInterval);
			}

			_this.settings.autoNotificationHideInterval = setTimeout(function(){

				_this.hideNotification();

			}, _this.settings.autoNotificationHideTime);

		};

		this.hideNotification = function(){
			var _this = this;

			if( _this.settings.autoNotificationHideInterval ){
				clearTimeout(_this.settings.autoNotificationHideInterval);
			}

			_this.settings.displayInProgress = false;
			removeClass(query(_this.settings.container, ".cl-widget-notif-information-wrapper"), "cl-show");
			setTimeout(function(){
				_this.settings.container.style.display = "none";
			}, 200);
		};

		this.showAchievementNotification = function( data ){
			var _this = this,
				label = query(_this.settings.detailsContainer, ".cl-widget-notif-information-details-label"),
				description = query(_this.settings.detailsContainer, ".cl-widget-notif-information-details-description"),
				descriptionText = stripHtml(data.data.description);

			label.innerHTML = (data.data.name.length > 23) ? data.data.name.substr(0, 23) + "..." : data.data.name;
			description.innerHTML = (descriptionText.length > 60) ? descriptionText.substr(0, 60) + "..." : descriptionText;

			_this.settings.detailsContainer.dataset.id = data.data.id;

			_this.settings.container.style.display = "block";
			setTimeout(function(){
				addClass(query(_this.settings.container, ".cl-widget-notif-information-wrapper"), "cl-show");
			}, 200);

			_this.autoNotificationHide();
		};

		this.eventStreamCheck = function(){
			var _this = this;

			if( _this.settings.checkInterval ){
				clearTimeout(_this.settings.checkInterval);
			}

			if( _this.settings.eventStream.length > 0 && !_this.settings.displayInProgress ){
				var data = _this.settings.eventStream[0],
					index = _this.settings.eventStream.indexOf(data);

				if( typeof data.achievementId !== "undefined" ) {

					_this.settings.displayInProgress = true;
					_this.settings.lbWidget.getAchievement(data.achievementId, function( data ){

						_this.showAchievementNotification( data );

						_this.settings.checkInterval = setTimeout(function () {
							_this.eventStreamCheck();
						}, _this.settings.onDisplayCheckTimeout);
					});

					_this.settings.eventStream.splice(index, 1);
				} else if ( typeof data.notificationId !== "undefined" ){
					_this.settings.checkInterval = setTimeout(function () {
						_this.eventStreamCheck();
					}, _this.settings.checkTimeout);
				}else{
					_this.settings.checkInterval = setTimeout(function () {
						_this.eventStreamCheck();
					}, _this.settings.checkTimeout);
				}

				if ( index > -1 ) {
					_this.settings.eventStream.splice(index, 1);
				}
			}else {
				_this.settings.checkInterval = setTimeout(function () {
					_this.eventStreamCheck();
				}, _this.settings.checkTimeout);
			}
		};
		
		this.init = function(){
			var _this = this;

			if( _this.settings.container === null ){
				_this.startSSE();
				_this.settings.container = _this.settings.lbWidget.settings.bindContainer.appendChild( _this.layoutWrapper() );
				_this.settings.detailsContainer = query(_this.settings.container, ".cl-widget-notif-information-details-wrapper");
			}else{
				// terminate SSE
				_this.settings.sseInstance.closeChanel();

				// update the member
				_this.settings.sseInstance.settings.sseUrl = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSE.replace(":space", _this.settings.lbWidget.settings.spaceName).replace(":id", _this.settings.lbWidget.settings.memberId);
				_this.settings.sseInstance.settings.heartbeat = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSEHeartbeat.replace(":space", _this.settings.lbWidget.settings.spaceName).replace(":id", _this.settings.lbWidget.settings.memberId);

				// re-instantiate SSE
				_this.settings.sseInstance.openChanel();
			}

			_this.eventStreamCheck();
		};

	};
	
	
	
	
	
	var MainWidget = function( options ){
		this.settings = {
			lbWidget: null,
			container: null,
			navigation: null,
			section: null,
			detailsContainer: null,
			tournamentListContainer: null,
			headerDate: null,
			achievement: {
				container: null,
				detailsContainer: null
			},
			reward: {
				container: null,
				detailsContainer: null
			},
			leaderboard: {
				defaultEmptyList: 20,
				topResultSize: 3,
				header: null,
				container: null,
				list: null,
				topResults: null,
				timerInterval: null
			},
			tournamentsSection: {
				accordionLayout: [{
					label: "Upcoming Tournaments",
					type: "readyCompetitions",
					show: false,
					showTopResults: 1
				}, {
					label: "Active Tournaments",
					type: "activeCompetitions",
					show: true,
					showTopResults: 1
				}, {
					label: "Finished Tournaments",
					type: "finishedCompetitions",
					show: false,
					showTopResults: 1
				}]
			},
			rewardsSection: {
				accordionLayout: [{
					label: "Available Rewards",
					type: "availableRewards",
					show: true,
					showTopResults: 1
				}, {
					label: "Claimed Rewards",
					type: "rewards",
					show: false,
					showTopResults: 1
				}, {
					label: "Expired Rewards",
					type: "expiredRewards",
					show: false,
					showTopResults: 1
				}]
			},
			active: false,
			navigationSwitchLastAtempt: new Date().getTime(),
			navigationSwitchInProgress: false
		};
		
		if( typeof options !== "undefined" ){
			for(var opt in options){
				if (options.hasOwnProperty(opt)) {
					this.settings[opt] = options[opt];
				}
			}
		}

		/**
		 * Accordion style layout
		 * - parameters:
		 *      - label: String "Available rewards"
		 *      - type: String "available-rewards"
		 *      - shown: Boolean true/false
		 * @param data Array
		 * @param onLayout Function
		 */
		this.accordionStyle = function( data, onLayout ){
			var _this = this,
				accordionWrapper = document.createElement("div");

			accordionWrapper.setAttribute("class", "cl-main-accordion-container");

			mapObject(data, function( entry ){
				var accordionSection = document.createElement("div"),
					accordionLabel = document.createElement("div"),
					topShownEntry = document.createElement("div"),
					accordionListContainer = document.createElement("div"),
					accordionList = document.createElement("div");

				accordionSection.setAttribute("class", "cl-accordion " + entry.type + ( (typeof entry.show === "boolean" && entry.show) ? " cl-shown" : "" ));
				accordionLabel.setAttribute("class", "cl-accordion-label");
				topShownEntry.setAttribute("class", "cl-accordion-entry");
				accordionListContainer.setAttribute("class", "cl-accordion-list-container");
				accordionList.setAttribute("class", "cl-accordion-list");

				if( typeof _this.settings.lbWidget.settings.translation.rewards[entry.type] !== "undefined" ){
					accordionLabel.innerHTML = _this.settings.lbWidget.settings.translation.rewards[entry.type];
				}else if( typeof _this.settings.lbWidget.settings.translation.tournaments[entry.type] !== "undefined" ){
					accordionLabel.innerHTML = _this.settings.lbWidget.settings.translation.tournaments[entry.type];
				}else{
					accordionLabel.innerHTML = entry.label;
				}

				if( typeof onLayout === "function" ){
					onLayout(accordionSection, accordionList, topShownEntry, entry);
				}

				accordionListContainer.appendChild(accordionList);

				accordionSection.appendChild(accordionLabel);
				accordionSection.appendChild(topShownEntry);
				accordionSection.appendChild(accordionListContainer);

				accordionWrapper.appendChild(accordionSection);
			});

			return accordionWrapper;
		};

		this.accordionNavigation = function( element ){
			var _this = this,
				parentEl = element.parentNode;

			if( hasClass(parentEl, "cl-shown") ){
				removeClass(parentEl, "cl-shown");
			}else{
				objectIterator(query(closest(parentEl, ".cl-main-accordion-container"), ".cl-shown"), function(obj){
					removeClass(obj, "cl-shown");
				});

				addClass(parentEl, "cl-shown");
			}
		};
		
		this.layout = function(){
			var _this = this,
				wrapper = document.createElement("div"),
				innerWrapper = document.createElement("div"),
				
				navigationContainer = document.createElement("div"),
				navigationItems = document.createElement("div"),
				navigationItemLB = document.createElement("div"),
				navigationItemLBIcon = document.createElement("div"),
				navigationItemACH = document.createElement("div"),
				navigationItemACHIcon = document.createElement("div"),
				navigationItemRewards = document.createElement("div"),
				navigationItemRewardsIcon = document.createElement("div"),
				navigationItemInbox = document.createElement("div"),
				navigationItemInboxIcon = document.createElement("div"),
				
				mainSectionContainer = document.createElement("div"),

				preLoaderContainer = document.createElement("div"),
				preLoaderContent = document.createElement("div"),
				preLoaderBar1 = document.createElement("div"),
				preLoaderBar2 = document.createElement("div"),
				preLoaderBar3 = document.createElement("div"),

				sectionLB = _this.leaderboardAreaLayout(),
				sectionACH = _this.achievementsAreaLayout(),
				sectionRewards = _this.rewardsAreaLayout(),
				sectionInbox = _this.inboxAreaLayout();
			
			wrapper.setAttribute("class", "cl-main-widget-wrapper");
			innerWrapper.setAttribute("class", "cl-main-widget-inner-wrapper");
			
			navigationContainer.setAttribute("class", "cl-main-widget-navigation-container");
			navigationItems.setAttribute("class", "cl-main-widget-navigation-items");
			navigationItemLB.setAttribute("class", "cl-main-widget-navigation-lb cl-active-nav");
			navigationItemLBIcon.setAttribute("class", "cl-main-widget-navigation-lb-icon cl-main-navigation-item");
			navigationItemACH.setAttribute("class", "cl-main-widget-navigation-ach");
			navigationItemACHIcon.setAttribute("class", "cl-main-widget-navigation-ach-icon cl-main-navigation-item");
			navigationItemRewards.setAttribute("class", "cl-main-widget-navigation-rewards");
			navigationItemRewardsIcon.setAttribute("class", "cl-main-widget-navigation-rewards-icon cl-main-navigation-item");
			navigationItemInbox.setAttribute("class", "cl-main-widget-navigation-inbox");
			navigationItemInboxIcon.setAttribute("class", "cl-main-widget-navigation-inbox-icon cl-main-navigation-item");
			
			mainSectionContainer.setAttribute("class", "cl-main-widget-section-container");

			preLoaderContainer.setAttribute("class", "cl-main-widget-pre-loader");
			preLoaderContent.setAttribute("class", "cl-main-widget-pre-loader-content");
			preLoaderBar1.setAttribute("class", "cl-pre-loader-bar");
			preLoaderBar2.setAttribute("class", "cl-pre-loader-bar");
			preLoaderBar3.setAttribute("class", "cl-pre-loader-bar");

			preLoaderContent.appendChild(preLoaderBar1);
			preLoaderContent.appendChild(preLoaderBar2);
			preLoaderContent.appendChild(preLoaderBar3);
			preLoaderContainer.appendChild(preLoaderContent);

			navigationItemLB.appendChild(navigationItemLBIcon);
			navigationItems.appendChild(navigationItemLB);
			navigationItemACH.appendChild(navigationItemACHIcon);
			navigationItems.appendChild(navigationItemACH);
			navigationItemRewards.appendChild(navigationItemRewardsIcon);
			navigationItems.appendChild(navigationItemRewards);
			navigationItemInbox.appendChild(navigationItemInboxIcon);
			navigationItems.appendChild(navigationItemInbox);
			navigationContainer.appendChild(navigationItems);
			
			
			mainSectionContainer.appendChild(sectionLB);
			mainSectionContainer.appendChild(sectionACH);
			mainSectionContainer.appendChild(sectionRewards);
			mainSectionContainer.appendChild(sectionInbox);
			mainSectionContainer.appendChild(preLoaderContainer);

			innerWrapper.appendChild(navigationContainer);
			innerWrapper.appendChild(mainSectionContainer);
			wrapper.appendChild(innerWrapper);
			
			return wrapper;
		};
		
		this.leaderboardAreaLayout = function(){
			var _this = this,
				sectionLB = document.createElement("div"),
				
				sectionLBHeader = document.createElement("div"),
				sectionLBHeaderList = document.createElement("div"),
				sectionLBHeaderListIcon = document.createElement("div"),
				sectionLBHeaderLabel = document.createElement("div"),
				sectionLBHeaderDate = document.createElement("div"),
				sectionLBHeaderClose = document.createElement("div"),
				
				sectionLBDetails = document.createElement("div"),
				sectionLBDetailsInfo = document.createElement("div"),
				sectionLBDetailsInfoIcon = document.createElement("div"),
				sectionLBDetailsContentContainer = document.createElement("div"),
				sectionLBDetailsContentContainerLabel = document.createElement("div"),
				sectionLBDetailsContentContainerDate = document.createElement("div"),
				
				sectionLBLeaderboard = document.createElement("div"),
				sectionLBLeaderboardHeader = document.createElement("div"),
				sectionLBLeaderboardHeaderLabels = document.createElement("div"),
				sectionLBLeaderboardHeaderTopResults = document.createElement("div"),
				sectionLBLeaderboardBody = document.createElement("div"),
				sectionLBLeaderboardBodyResults = document.createElement("div"),
				
				sectionLBMissingMember = document.createElement("div"),
				
				sectionLBOptInContainer = document.createElement("div"),
				sectionLBOptInAction = document.createElement("a"),
				
				sectionLBFooter = document.createElement("div"),
				sectionLBFooterContent = document.createElement("div"),

				sectionTournamentDetailsContainer = document.createElement("div"),
				sectionTournamentDetailsHeader = document.createElement("div"),
				sectionTournamentDetailsHeaderLabel = document.createElement("div"),
				sectionTournamentDetailsHeaderDate = document.createElement("div"),
				sectionTournamentDetailsBackBtn = document.createElement("a"),
				sectionTournamentDetailsBodyContainer = document.createElement("div"),
				sectionTournamentDetailsBodyImageContainer = document.createElement("div"),
				sectionTournamentDetailsBody = document.createElement("div"),
				sectionTournamentDetailsOptInContainer = document.createElement("div"),
				sectionTournamentDetailsOptInAction = document.createElement("a"),

				sectionTournamentList = document.createElement("div"),
				sectionTournamentListBody = document.createElement("div"),
				sectionTournamentListBodyResults = document.createElement("div"),
				sectionTournamentBackAction = document.createElement("a");

			
			sectionLB.setAttribute("class", "cl-main-widget-lb cl-main-section-item cl-main-active-section");
			sectionLBHeader.setAttribute("class", "cl-main-widget-lb-header");
			sectionLBHeaderList.setAttribute("class", "cl-main-widget-lb-header-list");
			sectionLBHeaderListIcon.setAttribute("class", "cl-main-widget-lb-header-list-icon");
			sectionLBHeaderLabel.setAttribute("class", "cl-main-widget-lb-header-label");
			sectionLBHeaderDate.setAttribute("class", "cl-main-widget-lb-header-date");
			sectionLBHeaderClose.setAttribute("class", "cl-main-widget-lb-header-close");
			
			sectionLBDetails.setAttribute("class", "cl-main-widget-lb-details");
			sectionLBDetailsInfo.setAttribute("class", "cl-main-widget-lb-details-info");
			sectionLBDetailsInfoIcon.setAttribute("class", "cl-main-widget-lb-details-info-icon");
			sectionLBDetailsContentContainer.setAttribute("class", "cl-main-widget-lb-details-content");
			sectionLBDetailsContentContainerLabel.setAttribute("class", "cl-main-widget-lb-details-content-label");
			sectionLBDetailsContentContainerDate.setAttribute("class", "cl-main-widget-lb-details-content-date");
			
			// Leaderboard result container
			sectionLBLeaderboard.setAttribute("class", "cl-main-widget-lb-leaderboard");
			sectionLBLeaderboardHeader.setAttribute("class", "cl-main-widget-lb-leaderboard-header");
			sectionLBLeaderboardHeaderLabels.setAttribute("class", "cl-main-widget-lb-leaderboard-header-labels");
			sectionLBLeaderboardHeaderTopResults.setAttribute("class", "cl-main-widget-lb-leaderboard-header-top-res");
			sectionLBLeaderboardBody.setAttribute("class", "cl-main-widget-lb-leaderboard-body");
			sectionLBLeaderboardBodyResults.setAttribute("class", "cl-main-widget-lb-leaderboard-body-res");
			
			sectionLBMissingMember.setAttribute("class", "cl-main-widget-lb-missing-member");
			
			// footer
			sectionLBFooter.setAttribute("class", "cl-main-widget-lb-footer");
			sectionLBFooterContent.setAttribute("class", "cl-main-widget-lb-footer-content");
			
			// details section
			sectionTournamentDetailsContainer.setAttribute("class", "cl-main-widget-lb-details-container");
			sectionTournamentDetailsHeader.setAttribute("class", "cl-main-widget-lb-details-header");
			sectionTournamentDetailsHeaderLabel.setAttribute("class", "cl-main-widget-lb-details-header-label");
			sectionTournamentDetailsHeaderDate.setAttribute("class", "cl-main-widget-lb-details-header-date");
			sectionTournamentDetailsBackBtn.setAttribute("class", "cl-main-widget-lb-details-back-btn");
			sectionTournamentDetailsBodyContainer.setAttribute("class", "cl-main-widget-lb-details-body-container");
			sectionTournamentDetailsBodyImageContainer.setAttribute("class", "cl-main-widget-lb-details-body-image-cont");
			sectionTournamentDetailsBody.setAttribute("class", "cl-main-widget-lb-details-body");
			sectionTournamentDetailsOptInContainer.setAttribute("class", "cl-main-widget-lb-details-optin-container");
			sectionTournamentDetailsOptInAction.setAttribute("class", "cl-main-widget-lb-details-optin-action");

			sectionTournamentList.setAttribute("class", "cl-main-widget-tournaments-list");
			sectionTournamentBackAction.setAttribute("class", "cl-main-widget-tournaments-bacl-btn");
			sectionTournamentListBody.setAttribute("class", "cl-main-widget-tournaments-list-body");
			sectionTournamentListBodyResults.setAttribute("class", "cl-main-widget-tournaments-list-body-res");
			
			sectionLBOptInContainer.setAttribute("class", "cl-main-widget-lb-optin-container");
			sectionLBOptInAction.setAttribute("class", "cl-main-widget-lb-optin-action");
			
			
			sectionLBHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.label;
			sectionLBFooterContent.innerHTML = _this.settings.lbWidget.settings.translation.global.copy;
			sectionTournamentDetailsOptInAction.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
			sectionTournamentDetailsOptInAction.href = "javascript:void(0);";
			sectionLBOptInAction.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
			sectionLBOptInAction.href = "javascript:void(0);";
			
			sectionLBHeaderList.appendChild(sectionLBHeaderListIcon);
			sectionLBHeader.appendChild(sectionLBHeaderList);
			sectionLBHeader.appendChild(sectionLBHeaderLabel);
			sectionLBHeader.appendChild(sectionLBHeaderDate);
			sectionLBHeader.appendChild(sectionLBHeaderClose);
			
			sectionLBDetailsInfo.appendChild(sectionLBDetailsInfoIcon);
			sectionLBDetailsContentContainer.appendChild(sectionLBDetailsContentContainerLabel);
			sectionLBDetailsContentContainer.appendChild(sectionLBDetailsContentContainerDate);
			sectionLBDetails.appendChild(sectionLBDetailsInfo);
			sectionLBDetails.appendChild(sectionLBDetailsContentContainer);
			
			sectionLBLeaderboardHeader.appendChild(sectionLBLeaderboardHeaderLabels);
			sectionLBLeaderboard.appendChild(sectionLBLeaderboardHeader);
			sectionLBLeaderboard.appendChild(sectionLBLeaderboardHeaderTopResults);
			sectionLBLeaderboardBody.appendChild(sectionLBLeaderboardBodyResults);
			sectionLBLeaderboard.appendChild(sectionLBLeaderboardBody);
			
			sectionLBFooter.appendChild(sectionLBFooterContent);

			sectionTournamentListBody.appendChild(sectionTournamentListBodyResults);
			sectionTournamentList.appendChild(sectionTournamentListBody);
			sectionTournamentList.appendChild(sectionTournamentBackAction);

			sectionTournamentDetailsHeader.appendChild(sectionTournamentDetailsHeaderLabel);
			sectionTournamentDetailsHeader.appendChild(sectionTournamentDetailsHeaderDate);
			sectionTournamentDetailsContainer.appendChild(sectionTournamentDetailsHeader);
			sectionTournamentDetailsContainer.appendChild(sectionTournamentDetailsBackBtn);
			sectionTournamentDetailsBodyContainer.appendChild(sectionTournamentDetailsBodyImageContainer);
			sectionTournamentDetailsBodyContainer.appendChild(sectionTournamentDetailsBody);
			sectionTournamentDetailsContainer.appendChild(sectionTournamentDetailsBodyContainer);
			sectionTournamentDetailsOptInContainer.appendChild(sectionTournamentDetailsOptInAction);
			sectionTournamentDetailsContainer.appendChild(sectionTournamentDetailsOptInContainer);
			
			sectionLBOptInContainer.appendChild(sectionLBOptInAction);
			
			sectionLB.appendChild(sectionLBHeader);
			sectionLB.appendChild(sectionLBDetails);
			sectionLB.appendChild(sectionLBLeaderboard);
			sectionLB.appendChild(sectionLBMissingMember);
			sectionLB.appendChild(sectionLBOptInContainer);
			sectionLB.appendChild(sectionLBFooter);
			sectionLB.appendChild(sectionTournamentDetailsContainer);
			sectionLB.appendChild(sectionTournamentList);

			return sectionLB;
		};
		
		this.achievementsAreaLayout = function(){
			var _this = this,
				sectionACH = document.createElement("div"),
				
				sectionACHHeader = document.createElement("div"),
				sectionACHHeaderLabel = document.createElement("div"),
				sectionACHHeaderDate = document.createElement("div"),
				sectionACHHeaderClose = document.createElement("div"),
				
				sectionACHDetails = document.createElement("div"),
				sectionACHDetailsInfo = document.createElement("div"),
				sectionACHDetailsInfoIcon = document.createElement("div"),
				sectionACHDetailsContentContainer = document.createElement("div"),
				sectionACHDetailsContentContainerLabel = document.createElement("div"),
				sectionACHDetailsContentContainerDate = document.createElement("div"),
				
				sectionACHList = document.createElement("div"),
				sectionACHListBody = document.createElement("div"),
				sectionACHListBodyResults = document.createElement("div"),
				
				sectionACHFooter = document.createElement("div"),
				sectionACHFooterContent = document.createElement("div"),
				
				sectionAchievementDetailsContainer = document.createElement("div"),
				sectionAchievementDetailsHeader = document.createElement("div"),
				sectionAchievementDetailsHeaderLabel = document.createElement("div"),
				sectionAchievementDetailsHeaderDate = document.createElement("div"),
				sectionAchievementDetailsBackBtn = document.createElement("a"),
				sectionAchievementDetailsBodyContainer = document.createElement("div"),
				sectionAchievementDetailsBodyImageContainer = document.createElement("div"),
				sectionAchievementDetailsBody = document.createElement("div");
			
			
			
			sectionACH.setAttribute("class", "cl-main-widget-section-ach cl-main-section-item");
			sectionACHHeader.setAttribute("class", "cl-main-widget-ach-header");
			sectionACHHeaderLabel.setAttribute("class", "cl-main-widget-ach-header-label");
			sectionACHHeaderDate.setAttribute("class", "cl-main-widget-ach-header-date");
			sectionACHHeaderClose.setAttribute("class", "cl-main-widget-ach-header-close");
			
			sectionACHDetails.setAttribute("class", "cl-main-widget-ach-details");
			sectionACHDetailsInfo.setAttribute("class", "cl-main-widget-ach-details-info");
			sectionACHDetailsInfoIcon.setAttribute("class", "cl-main-widget-ach-details-info-icon");
			sectionACHDetailsContentContainer.setAttribute("class", "cl-main-widget-ach-details-content");
			sectionACHDetailsContentContainerLabel.setAttribute("class", "cl-main-widget-ach-details-content-label");
			sectionACHDetailsContentContainerDate.setAttribute("class", "cl-main-widget-ach-details-content-date");
			
			// Leaderboard result container
			sectionACHList.setAttribute("class", "cl-main-widget-ach-list");
			sectionACHListBody.setAttribute("class", "cl-main-widget-ach-list-body");
			sectionACHListBodyResults.setAttribute("class", "cl-main-widget-ach-list-body-res");
			
			// footer
			sectionACHFooter.setAttribute("class", "cl-main-widget-ach-footer");
			sectionACHFooterContent.setAttribute("class", "cl-main-widget-ach-footer-content");
			
			// details section
			sectionAchievementDetailsContainer.setAttribute("class", "cl-main-widget-ach-details-container");
			sectionAchievementDetailsHeader.setAttribute("class", "cl-main-widget-ach-details-header");
			sectionAchievementDetailsHeaderLabel.setAttribute("class", "cl-main-widget-ach-details-header-label");
			sectionAchievementDetailsHeaderDate.setAttribute("class", "cl-main-widget-ach-details-header-date");
			sectionAchievementDetailsBackBtn.setAttribute("class", "cl-main-widget-ach-details-back-btn");
			sectionAchievementDetailsBodyContainer.setAttribute("class", "cl-main-widget-ach-details-body-container");
			sectionAchievementDetailsBodyImageContainer.setAttribute("class", "cl-main-widget-ach-details-body-image-cont");
			sectionAchievementDetailsBody.setAttribute("class", "cl-main-widget-ach-details-body");
			
			
			sectionACHHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.achievements.label;
			sectionACHFooterContent.innerHTML = _this.settings.lbWidget.settings.translation.global.copy;


			sectionAchievementDetailsHeader.appendChild(sectionAchievementDetailsHeaderLabel);
			sectionAchievementDetailsHeader.appendChild(sectionAchievementDetailsHeaderDate);
			sectionAchievementDetailsContainer.appendChild(sectionAchievementDetailsHeader);
			sectionAchievementDetailsContainer.appendChild(sectionAchievementDetailsBackBtn);
			sectionAchievementDetailsBodyContainer.appendChild(sectionAchievementDetailsBodyImageContainer);
			sectionAchievementDetailsBodyContainer.appendChild(sectionAchievementDetailsBody);
			sectionAchievementDetailsContainer.appendChild(sectionAchievementDetailsBodyContainer);

			
			sectionACHHeader.appendChild(sectionACHHeaderLabel);
			sectionACHHeader.appendChild(sectionACHHeaderDate);
			sectionACHHeader.appendChild(sectionACHHeaderClose);
			
			sectionACHDetailsInfo.appendChild(sectionACHDetailsInfoIcon);
			sectionACHDetailsContentContainer.appendChild(sectionACHDetailsContentContainerLabel);
			sectionACHDetailsContentContainer.appendChild(sectionACHDetailsContentContainerDate);
			sectionACHDetails.appendChild(sectionACHDetailsInfo);
			sectionACHDetails.appendChild(sectionACHDetailsContentContainer);
			
			sectionACHListBody.appendChild(sectionACHListBodyResults);
			sectionACHList.appendChild(sectionACHListBody);
			
			sectionACHFooter.appendChild(sectionACHFooterContent);
			
			sectionACH.appendChild(sectionACHHeader);
			sectionACH.appendChild(sectionACHDetails);
			sectionACH.appendChild(sectionACHList);
			sectionACH.appendChild(sectionACHFooter);
			sectionACH.appendChild(sectionAchievementDetailsContainer);

			return sectionACH;
		};
		
		this.rewardsAreaLayout = function(){
			var _this = this,
				sectionRewards = document.createElement("div"),
				
				sectionRewardsHeader = document.createElement("div"),
				sectionRewardsHeaderLabel = document.createElement("div"),
				sectionRewardsHeaderDate = document.createElement("div"),
				sectionRewardsHeaderClose = document.createElement("div"),
				
				sectionRewardsDetails = document.createElement("div"),
				sectionRewardsDetailsInfo = document.createElement("div"),
				sectionRewardsDetailsInfoIcon = document.createElement("div"),
				sectionRewardsDetailsContentContainer = document.createElement("div"),
				sectionRewardsDetailsContentContainerLabel = document.createElement("div"),
				sectionRewardsDetailsContentContainerDate = document.createElement("div"),
				
				sectionRewardsList = document.createElement("div"),
				sectionRewardsListBody = document.createElement("div"),
				sectionRewardsListBodyResults = document.createElement("div"),

				sectionRewardsFooter = document.createElement("div"),
				sectionRewardsFooterContent = document.createElement("div"),
				
				sectionRewardsDetailsContainer = document.createElement("div"),
				sectionRewardsDetailsHeader = document.createElement("div"),
				sectionRewardsDetailsHeaderLabel = document.createElement("div"),
				sectionRewardsDetailsHeaderDate = document.createElement("div"),
				sectionRewardsDetailsBackBtn = document.createElement("a"),
				sectionRewardsDetailsBodyContainer = document.createElement("div"),
				sectionRewardsDetailsBodyImageContainer = document.createElement("div"),
				sectionRewardsDetailsBody = document.createElement("div"),
				sectionRewardsWinningsContainer = document.createElement("div"),
				sectionRewardsWinningsIcon = document.createElement("div"),
				sectionRewardsWinningsValue = document.createElement("div"),
				sectionRewardsClaimContainer = document.createElement("div"),
				sectionRewardsClaimBtn = document.createElement("a");

			
			
			sectionRewards.setAttribute("class", "cl-main-widget-section-reward cl-main-section-item");
			sectionRewardsHeader.setAttribute("class", "cl-main-widget-reward-header");
			sectionRewardsHeaderLabel.setAttribute("class", "cl-main-widget-reward-header-label");
			sectionRewardsHeaderDate.setAttribute("class", "cl-main-widget-reward-header-date");
			sectionRewardsHeaderClose.setAttribute("class", "cl-main-widget-reward-header-close");
			
			sectionRewardsDetails.setAttribute("class", "cl-main-widget-reward-details");
			sectionRewardsDetailsInfo.setAttribute("class", "cl-main-widget-reward-details-info");
			sectionRewardsDetailsInfoIcon.setAttribute("class", "cl-main-widget-reward-details-info-icon");
			sectionRewardsDetailsContentContainer.setAttribute("class", "cl-main-widget-reward-details-content");
			sectionRewardsDetailsContentContainerLabel.setAttribute("class", "cl-main-widget-reward-details-content-label");
			sectionRewardsDetailsContentContainerDate.setAttribute("class", "cl-main-widget-reward-details-content-date");
			
			// Leaderboard result container
			sectionRewardsList.setAttribute("class", "cl-main-widget-reward-list");
			sectionRewardsListBody.setAttribute("class", "cl-main-widget-reward-list-body");
			sectionRewardsListBodyResults.setAttribute("class", "cl-main-widget-reward-list-body-res");

			// footer
			sectionRewardsFooter.setAttribute("class", "cl-main-widget-reward-footer");
			sectionRewardsFooterContent.setAttribute("class", "cl-main-widget-reward-footer-content");
			
			// details section
			sectionRewardsDetailsContainer.setAttribute("class", "cl-main-widget-reward-details-container");
			sectionRewardsDetailsHeader.setAttribute("class", "cl-main-widget-reward-details-header");
			sectionRewardsDetailsHeaderLabel.setAttribute("class", "cl-main-widget-reward-details-header-label");
			sectionRewardsDetailsHeaderDate.setAttribute("class", "cl-main-widget-reward-details-header-date");
			sectionRewardsDetailsBackBtn.setAttribute("class", "cl-main-widget-reward-details-back-btn");
			sectionRewardsDetailsBodyContainer.setAttribute("class", "cl-main-widget-reward-details-body-container");
			sectionRewardsDetailsBodyImageContainer.setAttribute("class", "cl-main-widget-reward-details-body-image-cont");
			sectionRewardsDetailsBody.setAttribute("class", "cl-main-widget-reward-details-body");
			sectionRewardsWinningsContainer.setAttribute("class", "cl-main-widget-reward-winnings-container");
			sectionRewardsWinningsIcon.setAttribute("class", "cl-main-widget-reward-winnings-icon");
			sectionRewardsWinningsValue.setAttribute("class", "cl-main-widget-reward-winnings-value");
			sectionRewardsClaimContainer.setAttribute("class", "cl-main-widget-reward-claim-container");
			sectionRewardsClaimBtn.setAttribute("class", "cl-main-widget-reward-claim-btn");

			
			sectionRewardsHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.rewards.label;
			sectionRewardsFooterContent.innerHTML = _this.settings.lbWidget.settings.translation.global.copy;
			sectionRewardsClaimBtn.innerHTML = _this.settings.lbWidget.settings.translation.rewards.claim;

			sectionRewardsWinningsContainer.appendChild(sectionRewardsWinningsIcon);
			sectionRewardsWinningsContainer.appendChild(sectionRewardsWinningsValue);
			sectionRewardsClaimContainer.appendChild(sectionRewardsClaimBtn);

			sectionRewardsDetailsHeader.appendChild(sectionRewardsDetailsHeaderLabel);
			sectionRewardsDetailsHeader.appendChild(sectionRewardsDetailsHeaderDate);
			sectionRewardsDetailsContainer.appendChild(sectionRewardsDetailsHeader);
			sectionRewardsDetailsContainer.appendChild(sectionRewardsDetailsBackBtn);
			sectionRewardsDetailsBodyContainer.appendChild(sectionRewardsDetailsBodyImageContainer);
			sectionRewardsDetailsBodyContainer.appendChild(sectionRewardsDetailsBody);
			sectionRewardsDetailsBodyContainer.appendChild(sectionRewardsWinningsContainer);
			sectionRewardsDetailsContainer.appendChild(sectionRewardsDetailsBodyContainer);
			sectionRewardsDetailsContainer.appendChild(sectionRewardsClaimContainer);

			sectionRewardsHeader.appendChild(sectionRewardsHeaderLabel);
			sectionRewardsHeader.appendChild(sectionRewardsHeaderDate);
			sectionRewardsHeader.appendChild(sectionRewardsHeaderClose);
			
			sectionRewardsDetailsInfo.appendChild(sectionRewardsDetailsInfoIcon);
			sectionRewardsDetailsContentContainer.appendChild(sectionRewardsDetailsContentContainerLabel);
			sectionRewardsDetailsContentContainer.appendChild(sectionRewardsDetailsContentContainerDate);
			sectionRewardsDetails.appendChild(sectionRewardsDetailsInfo);
			sectionRewardsDetails.appendChild(sectionRewardsDetailsContentContainer);

			sectionRewardsListBody.appendChild(sectionRewardsListBodyResults);
			sectionRewardsList.appendChild(sectionRewardsListBody);
			
			sectionRewardsFooter.appendChild(sectionRewardsFooterContent);
			
			sectionRewards.appendChild(sectionRewardsHeader);
			sectionRewards.appendChild(sectionRewardsDetails);
			sectionRewards.appendChild(sectionRewardsList);
			sectionRewards.appendChild(sectionRewardsFooter);
			sectionRewards.appendChild(sectionRewardsDetailsContainer);

			return sectionRewards;
		};
		
		this.inboxAreaLayout = function(){
			var _this = this,
				sectionInbox = document.createElement("div"),
				
				sectionInboxHeader = document.createElement("div"),
				sectionInboxHeaderLabel = document.createElement("div"),
				sectionInboxHeaderDate = document.createElement("div"),
				sectionInboxHeaderClose = document.createElement("div"),
				
				sectionInboxDetails = document.createElement("div"),
				sectionInboxDetailsInfo = document.createElement("div"),
				sectionInboxDetailsInfoIcon = document.createElement("div"),
				sectionInboxDetailsContentContainer = document.createElement("div"),
				sectionInboxDetailsContentContainerLabel = document.createElement("div"),
				sectionInboxDetailsContentContainerDate = document.createElement("div"),
				
				sectionInboxList = document.createElement("div"),
				sectionInboxListBody = document.createElement("div"),
				sectionInboxListBodyResults = document.createElement("div"),
				
				sectionInboxFooter = document.createElement("div"),
				sectionInboxFooterContent = document.createElement("div"),
				
				sectionTournamentDetailsContainer = document.createElement("div"),
				sectionTournamentDetailsHeader = document.createElement("div"),
				sectionTournamentDetailsHeaderLabel = document.createElement("div"),
				sectionTournamentDetailsHeaderDate = document.createElement("div"),
				sectionTournamentDetailsBackBtn = document.createElement("a"),
				sectionTournamentDetailsBodyContainer = document.createElement("div"),
				sectionTournamentDetailsBodyImageContainer = document.createElement("div"),
				sectionTournamentDetailsBody = document.createElement("div");
			
			
			
			sectionInbox.setAttribute("class", "cl-main-widget-section-inbox cl-main-section-item");
			sectionInboxHeader.setAttribute("class", "cl-main-widget-inbox-header");
			sectionInboxHeaderLabel.setAttribute("class", "cl-main-widget-inbox-header-label");
			sectionInboxHeaderDate.setAttribute("class", "cl-main-widget-inbox-header-date");
			sectionInboxHeaderClose.setAttribute("class", "cl-main-widget-inbox-header-close");
			
			sectionInboxDetails.setAttribute("class", "cl-main-widget-inbox-details");
			sectionInboxDetailsInfo.setAttribute("class", "cl-main-widget-inbox-details-info");
			sectionInboxDetailsInfoIcon.setAttribute("class", "cl-main-widget-inbox-details-info-icon");
			sectionInboxDetailsContentContainer.setAttribute("class", "cl-main-widget-inbox-details-content");
			sectionInboxDetailsContentContainerLabel.setAttribute("class", "cl-main-widget-inbox-details-content-label");
			sectionInboxDetailsContentContainerDate.setAttribute("class", "cl-main-widget-inbox-details-content-date");
			
			// Leaderboard result container
			sectionInboxList.setAttribute("class", "cl-main-widget-inbox-list");
			sectionInboxListBody.setAttribute("class", "cl-main-widget-inbox-list-body");
			sectionInboxListBodyResults.setAttribute("class", "cl-main-widget-inbox-list-body-res");
			
			// footer
			sectionInboxFooter.setAttribute("class", "cl-main-widget-inbox-footer");
			sectionInboxFooterContent.setAttribute("class", "cl-main-widget-inbox-footer-content");
			
			// details section
			sectionTournamentDetailsContainer.setAttribute("class", "cl-main-widget-inbox-details-container");
			sectionTournamentDetailsHeader.setAttribute("class", "cl-main-widget-inbox-details-header");
			sectionTournamentDetailsHeaderLabel.setAttribute("class", "cl-main-widget-inbox-details-header-label");
			sectionTournamentDetailsHeaderDate.setAttribute("class", "cl-main-widget-inbox-details-header-date");
			sectionTournamentDetailsBackBtn.setAttribute("class", "cl-main-widget-inbox-details-back-btn");
			sectionTournamentDetailsBodyContainer.setAttribute("class", "cl-main-widget-inbox-details-body-container");
			sectionTournamentDetailsBodyImageContainer.setAttribute("class", "cl-main-widget-inbox-details-body-image-cont");
			sectionTournamentDetailsBody.setAttribute("class", "cl-main-widget-inbox-details-body");
			
			
			sectionInboxHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.rewards.label;
			sectionInboxFooterContent.innerHTML = _this.settings.lbWidget.settings.translation.global.copy;
			
			sectionInboxHeader.appendChild(sectionInboxHeaderLabel);
			sectionInboxHeader.appendChild(sectionInboxHeaderDate);
			sectionInboxHeader.appendChild(sectionInboxHeaderClose);
			
			sectionInboxDetailsInfo.appendChild(sectionInboxDetailsInfoIcon);
			sectionInboxDetailsContentContainer.appendChild(sectionInboxDetailsContentContainerLabel);
			sectionInboxDetailsContentContainer.appendChild(sectionInboxDetailsContentContainerDate);
			sectionInboxDetails.appendChild(sectionInboxDetailsInfo);
			sectionInboxDetails.appendChild(sectionInboxDetailsContentContainer);
			
			sectionInboxListBody.appendChild(sectionInboxListBodyResults);
			sectionInboxList.appendChild(sectionInboxListBody);
			
			sectionInboxFooter.appendChild(sectionInboxFooterContent);
			
			sectionInbox.appendChild(sectionInboxHeader);
			sectionInbox.appendChild(sectionInboxDetails);
			sectionInbox.appendChild(sectionInboxList);
			sectionInbox.appendChild(sectionInboxFooter);
			
			return sectionInbox;
		};
		
		this.leaderboardHeader = function(){
			var _this = this,
				rankCol = document.createElement("div"),
				iconCol = document.createElement("div"),
				nameCol = document.createElement("div"),
				growthCol = document.createElement("div"),
				pointsCol = document.createElement("div");
			
			rankCol.setAttribute("class", "cl-rank-col cl-col");
			iconCol.setAttribute("class", "cl-icon-col cl-col");
			nameCol.setAttribute("class", "cl-name-col cl-col");
			growthCol.setAttribute("class", "cl-growth-col cl-col");
			pointsCol.setAttribute("class", "cl-points-col cl-col");
			
			rankCol.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.rank;
			iconCol.innerHTML = "";
			nameCol.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.name;
			growthCol.innerHTML = "";
			pointsCol.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.points;
			
			_this.settings.leaderboard.header.appendChild(rankCol);
			_this.settings.leaderboard.header.appendChild(iconCol);
			_this.settings.leaderboard.header.appendChild(nameCol);
			_this.settings.leaderboard.header.appendChild(growthCol);
			_this.settings.leaderboard.header.appendChild(pointsCol);

			var rewardCol = document.createElement("div"),
				rewardEnabled = ( typeof _this.settings.lbWidget.settings.competition.activeContest !== "undefined" && _this.settings.lbWidget.settings.competition.activeContest !== null &&  typeof _this.settings.lbWidget.settings.competition.activeContest.rewards !== "undefined" && _this.settings.lbWidget.settings.competition.activeContest.rewards.length > 0 );
			rewardCol.setAttribute("class", "cl-reward-col cl-col" + ( rewardEnabled ? " cl-col-reward-enabled" : "" ));
			rewardCol.innerHTML = _this.settings.lbWidget.settings.translation.leaderboard.prize;

			addClass(_this.settings.leaderboard.header, "cl-reward-enabled");

			_this.settings.leaderboard.header.appendChild(rewardCol);
		};
		
		this.leaderboardRow = function( rank, icon, name, change, growth, points, reward, count, memberFound ){
			var _this = this,
				cellWrapper = document.createElement("div"),
				rankCel = document.createElement("div"),
				rankCelValue = document.createElement("div"),
				iconCel = document.createElement("div"),
				iconCelImg = new Image(),
				nameCel = document.createElement("div"),
				growthCel = document.createElement("div"),
				pointsCel = document.createElement("div"),
				memberFoundClass = (memberFound) ? " cl-lb-member-row" : "";
			
			cellWrapper.setAttribute("class", "cl-lb-row cl-lb-rank-" + rank + " cl-lb-count-" + count + memberFoundClass);
			rankCel.setAttribute("class", "cl-rank-col cl-col cl-rank-" + rank);
			rankCelValue.setAttribute("class", "cl-rank-col-value");
			iconCel.setAttribute("class", "cl-icon-col cl-col");
			iconCelImg.setAttribute("class", "cl-icon-col-img");
			nameCel.setAttribute("class", "cl-name-col cl-col");
			growthCel.setAttribute("class", "cl-growth-col cl-col");
			pointsCel.setAttribute("class", "cl-points-col cl-col");
			
			cellWrapper.dataset.rank = rank;
			
			rankCelValue.innerHTML = rank;
			nameCel.innerHTML = name;
			growthCel.dataset.growth = (change < 0) ? "down" : ( change > 0 ? "up" : "same" );
			growthCel.dataset.change = change;
			growthCel.innerHTML = growth;
			pointsCel.innerHTML = points;
			
			if( icon.length > 0 ){
				iconCelImg.src = icon;
				iconCelImg.alt = name;
			}else{
				iconCelImg.style.display = "none";
			}
			
			rankCel.appendChild(rankCelValue);
			cellWrapper.appendChild(rankCel);
			iconCel.appendChild(iconCelImg);
			cellWrapper.appendChild(iconCel);
			cellWrapper.appendChild(nameCel);
			cellWrapper.appendChild(growthCel);
			cellWrapper.appendChild(pointsCel);

			var rewardCel = document.createElement("div"),
				rewardEnabled = ( typeof _this.settings.lbWidget.settings.competition.activeContest !== "undefined" && _this.settings.lbWidget.settings.competition.activeContest !== null && typeof _this.settings.lbWidget.settings.competition.activeContest.rewards !== "undefined" && _this.settings.lbWidget.settings.competition.activeContest.rewards.length > 0 );
			rewardCel.setAttribute("class", "cl-reward-col cl-col" + ( rewardEnabled ? " cl-col-reward-enabled" : "" ));
			rewardCel.innerHTML = (typeof reward !== "undefined" && reward !== null) ? reward : "";

			addClass(cellWrapper, "cl-reward-enabled");

			cellWrapper.appendChild(rewardCel);
			
			return cellWrapper;
		};
		
		this.leaderboardRowUpdate = function( rank, icon, name, change, growth, points, reward, count, memberFound, onMissing ){
			var _this = this,
				cellRow = query(_this.settings.leaderboard.container, ".cl-lb-rank-" + rank + ".cl-lb-count-" + count);
			
			if( cellRow === null ){
				onMissing(rank, icon, name, change, growth, points, reward, count, memberFound)
			}else {
				
				var rankCel = query(cellRow, ".cl-rank-col-value"),
					iconCel = query(cellRow, ".cl-icon-col-img"),
					nameCel = query(cellRow, ".cl-name-col"),
					growthCel = query(cellRow, ".cl-growth-col"),
					pointsCel = query(cellRow, ".cl-points-col"),
					memberFoundClass = "cl-lb-member-row",
					rowHasClass = hasClass(cellRow, memberFoundClass);
				
				if( count > 0 && !hasClass(cellRow, "cl-shared-rank") ){
					addClass(cellRow, "cl-shared-rank");
				}
				
				if(memberFound && !rowHasClass){
					addClass(cellRow, memberFoundClass);
				}else if( !memberFound && rowHasClass ){
					removeClass(cellRow, memberFoundClass);
				}
				
				cellRow.dataset.rank = rank;
				
				rankCel.innerHTML = rank;
				nameCel.innerHTML = name;
				
				growthCel.dataset.growth = (change < 0) ? "down" : ( change > 0 ? "up" : "same" );
				growthCel.dataset.change = change;
				growthCel.innerHTML = growth;
				
				pointsCel.innerHTML = points;
				
				if( icon.length > 0 ) {
					iconCel.src = icon;
					iconCel.alt = name;
					iconCel.style.display = "block";
				}else{
					iconCel.style.display = "none";
				}
				
				
				if (typeof _this.settings.lbWidget.settings.competition.activeContest !== "undefined" && _this.settings.lbWidget.settings.competition.activeContest !== null && typeof _this.settings.lbWidget.settings.competition.activeContest.rewards !== "undefined" && _this.settings.lbWidget.settings.competition.activeContest.rewards.length > 0) {
					var rewardCel = query(cellRow, ".cl-reward-col");
					if( rewardCel !== null ){
						rewardCel.innerHTML = (typeof reward !== "undefined" && reward !== null) ? reward : "";
					}
				}
			}
		};
		
		this.populateLeaderboardResultsWithDefaultEntries = function(){
			var _this = this,
				topResults = [],
				remainingResults = [];
			
			for(var i = 0; i < _this.settings.leaderboard.topResultSize; i++){
				var rank = i+1;
				topResults.push({
					name: "--",
					rank: rank,
					points:	"--",
					memberId: "",
					memberRefId: ""
				});
			}
			
			for(var s = _this.settings.leaderboard.topResultSize; s < _this.settings.leaderboard.defaultEmptyList; s++){
				var rank = s+1;
				remainingResults.push({
					name: "--",
					rank: rank,
					points:	"--",
					memberId: "",
					memberRefId: ""
				});
			}
			
			_this.updateLeaderboardTopResults( topResults );
			_this.updateLeaderboardResults( remainingResults );

			_this.checkLeaderboardScrollContainer();
		};
		
		this.updateLeaderboardTopResults = function( topResults ){
			var _this = this,
				rankCheck = [],
				cleanupRankCheck = [];
			
			// cleanup
			mapObject(topResults, function( lb ){
				cleanupRankCheck.push(lb.rank);
				objectIterator(query(_this.settings.leaderboard.topResults, ".cl-lb-rank-" + lb.rank + ".cl-shared-rank"), function(obj){
					remove(obj);
				});
			});
			
			objectIterator(query(_this.settings.leaderboard.topResults, ".cl-lb-row"), function(obj){
				var rank = parseInt(obj.dataset.rank);
				if( cleanupRankCheck.indexOf( rank ) === -1 && rank > _this.settings.leaderboard.defaultEmptyList ){
					remove(obj);
				}
			});
			
			mapObject(topResults, function( lb ){
				var count = 0,
					icon = _this.settings.lbWidget.populateIdenticonBase64Image(lb.memberId),
					memberFound = (_this.settings.lbWidget.settings.memberId === lb.memberId || _this.settings.lbWidget.settings.memberId === lb.memberRefId),
					memberName = (memberFound) ? "You" : lb.name,
					reward = _this.getReward(lb.rank),
					change = (typeof lb.change === "undefined") ? 0 : lb.change,
					growthType = (change < 0) ? "down" : ( change > 0 ? "up" : "same" ),
					growthIcon = "<span class='cl-growth-icon cl-growth-" + growthType + "'></span>";
				
				if( rankCheck.indexOf(lb.rank) !== -1 ){
					for (var rc = 0; rc < rankCheck.length; rc++) {
						if( lb.rank === rankCheck[rc] ){
							count++
						}
					}
				}
				
				_this.leaderboardRowUpdate(
					lb.rank,
					icon, // icon
					memberName,
					change,
					growthIcon, // growth
					lb.points,
					reward, // reward
					count,
					memberFound,
					function( rank, icon, name, change, growth, points, reward, count, memberFound ){
						
						var newRow = _this.leaderboardRow( rank, icon, name, change, growth, points, reward, count, memberFound ),
							prevCellRow = query(_this.settings.leaderboard.container, ".cl-lb-rank-" + rank + ".cl-lb-count-" + (count-1));
						
						if( prevCellRow !== null && typeof prevCellRow.length === "undefined" ){
							appendNext(prevCellRow, newRow);
						}else
							_this.settings.leaderboard.topResults.appendChild(newRow);
					}
				);
				
				rankCheck.push(lb.rank);
				
			});
		};
		
		this.getReward = function(rank){
			var _this = this,
				rewardResponse = [];

			if( typeof _this.settings.lbWidget.settings.competition.activeContest !== "undefined" && _this.settings.lbWidget.settings.competition.activeContest !== null ) {
				mapObject(_this.settings.lbWidget.settings.competition.activeContest.rewards, function (reward) {
					if (reward.rewardRank instanceof Array && reward.rewardRank.indexOf(rank) !== -1) {
						rewardResponse.push(reward.value);
					}
				});
			}
			
			return rewardResponse.join(", ");
		};
		
		this.updateLeaderboardResults = function( remainingResults ){
			var _this = this,
				rankCheck = [],
				cleanupRankCheck = [];
			
			// cleanup
			mapObject(remainingResults, function( lb ){
				cleanupRankCheck.push(lb.rank);
				objectIterator(query(_this.settings.leaderboard.list, ".cl-lb-rank-" + lb.rank + ".cl-shared-rank"), function(obj){
					remove(obj);
				});
			});
			
			console.log(query(_this.settings.leaderboard.container, ".cl-lb-row"));
			objectIterator(query(_this.settings.leaderboard.container, ".cl-lb-row"), function(obj){
				console.log(obj);
				try {
					var rank = parseInt(obj.dataset.rank);
					if (cleanupRankCheck.indexOf(rank) === -1 && rank > _this.settings.leaderboard.defaultEmptyList) {
						remove(obj);
					}
				}catch (e) {
					console.log(obj.dataset, obj.attributes, obj);
					console.error(e);
				}
			});
			
			mapObject(remainingResults, function( lb ){
				var count = 0,
					icon = _this.settings.lbWidget.populateIdenticonBase64Image(lb.memberId),
					memberFound = (_this.settings.lbWidget.settings.memberId === lb.memberId || _this.settings.lbWidget.settings.memberId === lb.memberRefId),
					memberName = (memberFound) ? "You" : lb.name,
					reward = _this.getReward(lb.rank),
					change = (typeof lb.change === "undefined") ? 0 : lb.change,
					growthType = (change < 0) ? "down" : ( change > 0 ? "up" : "same" ),
					growthIcon = "<span class='cl-growth-icon cl-growth-" + growthType + "'></span>";
				
				if( rankCheck.indexOf(lb.rank) !== -1 ){
					for (var rc = 0; rc < rankCheck.length; rc++) {
						if( lb.rank === rankCheck[rc] ){
							count++
						}
					}
				}
				
				_this.leaderboardRowUpdate(
					lb.rank,
					icon, // icon
					memberName,
					change,
					growthIcon, // growth
					lb.points,
					reward,
					count,
					memberFound,
					function( rank, icon, name, change, growth, points, reward, count, memberFound ){
						var newRow = _this.leaderboardRow( rank, icon, name, name, growth, points, reward, count, memberFound ),
							prevCellRow = query(_this.settings.leaderboard.container, ".cl-lb-rank-" + rank + ".cl-lb-count-" + (count-1));
						
						if( prevCellRow !== null && typeof prevCellRow.length === "undefined" ){
							appendNext(prevCellRow, newRow);
						}else
							_this.settings.leaderboard.list.appendChild(newRow);
					}
				);
				
				rankCheck.push(lb.rank);
			});
		};
		
		this.updateLeaderboard = function(){
			var _this = this,
				topResults = [],
				remainingResults = [];
			
			_this.populateLeaderboardResultsWithDefaultEntries();
			
			mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function(lb){
				if( lb.rank <= _this.settings.leaderboard.topResultSize ){
					topResults.push(lb);
				}else{
					remainingResults.push(lb);
				}
			});
			
			_this.updateLeaderboardTopResults( topResults );
			_this.updateLeaderboardResults( remainingResults );

			var member = query(_this.settings.leaderboard.list, ".cl-lb-member-row");
			if( member !== null ){
				_this.missingMember( _this.isElementVisibleInView(member, _this.settings.leaderboard.list.parentNode) );
			}

			_this.checkLeaderboardScrollContainer();
		};
		
		this.updateLeaderboardTime = function(){
			var _this = this,
				diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledStart).diff(moment()),
				date = _this.settings.lbWidget.formatDateTime( moment.duration(diff) );
			
			if( _this.settings.leaderboard.timerInterval ){
				clearTimeout(_this.settings.leaderboard.timerInterval);
			}
			
			if( diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0 ){
				date = "";
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode > 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode < 3 ){
				diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledEnd).diff( moment() );
				date = _this.settings.lbWidget.formatDateTime( moment.duration(diff) );
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode === 3 ){
				date = _this.settings.lbWidget.settings.translation.tournaments.finishing;
			}else if( _this.settings.lbWidget.settings.competition.activeContest.statusCode >= 4 ){
				date = _this.settings.lbWidget.settings.translation.tournaments.finished;
			}
			
			_this.settings.headerDate.innerHTML = date;
			_this.settings.detailsContainerDate.innerHTML = date;
			
			_this.settings.leaderboard.timerInterval = setTimeout(function(){
				_this.updateLeaderboardTime();
			}, 1000);
		};
		
		this.leaderboardDetailsUpdate = function(){
			var _this = this,
				mainLabel = query(_this.settings.section, ".cl-main-widget-lb-details-content-label");
			
			mainLabel.innerHTML = (_this.settings.lbWidget.settings.competition.activeContest !== null) ? _this.settings.lbWidget.settings.competition.activeContest.label : "No available competition";
		};
		
		this.leaderboardOptInCheck = function(){
			var _this = this,
				optIn = query(_this.settings.section, ".cl-main-widget-lb-optin-action");
			
			if( typeof _this.settings.lbWidget.settings.competition.activeCompetition !== "undefined" && _this.settings.lbWidget.settings.competition.activeCompetition !== null && typeof _this.settings.lbWidget.settings.competition.activeCompetition.optinRequired === "boolean" && _this.settings.lbWidget.settings.competition.activeCompetition.optinRequired ) {
				if ( typeof _this.settings.lbWidget.settings.competition.activeCompetition.optin === "boolean" && !_this.settings.lbWidget.settings.competition.activeCompetition.optin ) {
					optIn.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
					optIn.parentNode.style.display = "block";
				}else {
					optIn.parentNode.style.display = "none";
				}
			}else{
				optIn.parentNode.style.display = "none";
			}
			
		};

		this.preloader = function(){
			var _this = this,
				preLoader = query(_this.settings.section, ".cl-main-widget-pre-loader"),
				content = query(_this.settings.section, ".cl-main-widget-pre-loader-content");

			return {
				show: function(){
					preLoader.style.display = "block";
					setTimeout(function(){
						preLoader.style.opacity = 1;
					}, 20);
				},
				hide: function(){
					preLoader.style.opacity = 0;

					setTimeout(function(){
						preLoader.style.display = "none";
					}, 200);
				}
			};
		};
		
		this.loadLeaderboard = function( callback ){
			var _this = this;

			if( _this.settings.container === null ){
				_this.settings.container = _this.settings.lbWidget.settings.bindContainer.appendChild( _this.layout() );
				_this.settings.navigation = query(_this.settings.container, ".cl-main-widget-navigation-container");
				_this.settings.section = query(_this.settings.container, ".cl-main-widget-section-container");
				_this.settings.leaderboard.container = query(_this.settings.section, ".cl-main-widget-lb-leaderboard");
				_this.settings.leaderboard.header = query(_this.settings.leaderboard.container, ".cl-main-widget-lb-leaderboard-header-labels");
				_this.settings.leaderboard.list = query(_this.settings.leaderboard.container, ".cl-main-widget-lb-leaderboard-body-res");
				_this.settings.leaderboard.topResults = query(_this.settings.leaderboard.container, ".cl-main-widget-lb-leaderboard-header-top-res");
				_this.settings.detailsContainer = query(_this.settings.container, ".cl-main-widget-lb-details-container");
				_this.settings.tournamentListContainer = query(_this.settings.container, ".cl-main-widget-tournaments-list");
				_this.settings.detailsContainerDate = query(_this.settings.container, ".cl-main-widget-lb-details-header-date");
				_this.settings.headerDate = query(_this.settings.container, ".cl-main-widget-lb-header-date");
				_this.settings.achievement.container = query(_this.settings.container, ".cl-main-widget-section-ach");
				_this.settings.achievement.detailsContainer = query(_this.settings.container, ".cl-main-widget-ach-details-container");
				_this.settings.reward.container = query(_this.settings.container, ".cl-main-widget-section-reward");
				_this.settings.reward.detailsContainer = query(_this.settings.container, ".cl-main-widget-reward-details-container");

				_this.leaderboardHeader();
				_this.eventListeners();
			}
			
			_this.leaderboardOptInCheck();
			_this.leaderboardDetailsUpdate();
			_this.updateLeaderboard();

			if( _this.settings.lbWidget.settings.competition.activeContest !== null ) {
				_this.updateLeaderboardTime();
			}
			
			if( typeof callback === "function" ){
				callback();
			}
		};
		
		this.clearAll = function(){
			var _this = this;
			
			_this.settings.active = false;
			
			if( _this.settings.leaderboard.timerInterval ){
				clearTimeout(_this.settings.leaderboard.timerInterval);
			}
		};
		
		this.hide = function( callback ){
			var _this = this;
			
			_this.clearAll();

			if( _this.settings.container !== null ) {
				removeClass(_this.settings.container, "cl-show");

				setTimeout(function () {
					_this.settings.container.style.display = "none";

					_this.hideCompetitionDetails();
					_this.hideAchievementDetails();

					if (typeof callback === "function") {
						callback();
					}
				}, 30);
			}else if (typeof callback === "function") {
				callback();
			}
			
		};
		
		this.missingMember = function( isVisible ){
			var _this = this,
				area = query(_this.settings.container, ".cl-main-widget-lb-missing-member");
			
			if( !isVisible ){
				
				var member = query(_this.settings.leaderboard.list, ".cl-lb-member-row");
				
				if( area !== null && member !== null ){
					
					area.innerHTML = member.innerHTML;
					
					area.style.display = "block";
				}else{
					area.style.display = "none";
				}
			}else{
				area.style.display = "none";
			}
		};
		
		this.isElementVisibleInView = function (el, container) {
			var position = el.getBoundingClientRect();
			var elemContainer = container.getBoundingClientRect();
			var elemTop = position.top;
			var elemBottom = position.bottom;
			var elemHeight = position.height;
			
			return elemTop <= elemContainer.top ?
				elemContainer.top - elemTop <= elemHeight : elemBottom - elemContainer.bottom <= elemHeight;
		};
		
		this.eventListeners = function(){
			var _this = this;
			
			_this.settings.leaderboard.list.parentNode.onscroll = function(evt){
			    var member = query(_this.settings.leaderboard.list, ".cl-lb-member-row");
				
			    if( member !== null ) {
				    _this.missingMember(_this.isElementVisibleInView(member, evt.target));
			    }
			};
			
			window.onresize = function(evt){
			    var member = query(_this.settings.leaderboard.list, ".cl-lb-member-row");

				if( member !== null ){
					_this.missingMember( _this.isElementVisibleInView(member, _this.settings.leaderboard.list.parentNode) );
				}


			 	_this.checkLeaderboardScrollContainer();
			};
		};

		this.checkLeaderboardScrollContainer = function(){
			var _this = this,
				lbScrollContainer = query(_this.settings.leaderboard.container, ".cl-main-widget-lb-leaderboard-body");

			if( scrollEnabled(lbScrollContainer) ){
				addClass(lbScrollContainer, "cl-element-scrollable");
			}else{
				removeClass(lbScrollContainer, "cl-element-scrollable");
			}
		};
		
		this.competitionDetailsOptInButtonState = function(){
			var _this = this,
				optIn = query(_this.settings.detailsContainer, ".cl-main-widget-lb-details-optin-action");
			
			
			if( typeof _this.settings.lbWidget.settings.competition.activeCompetition.optinRequired === "boolean" && _this.settings.lbWidget.settings.competition.activeCompetition.optinRequired ) {
				if ( typeof _this.settings.lbWidget.settings.competition.activeCompetition.optin === "boolean" && !_this.settings.lbWidget.settings.competition.activeCompetition.optin ) {
					optIn.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;
					removeClass(optIn, "cl-disabled");
				} else {
					optIn.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.registered;
					addClass(optIn, "cl-disabled");
				}
				optIn.parentNode.style.display = "block";
			}else{
				optIn.parentNode.style.display = "none";
			}
		};
		
		this.loadCompetitionDetails = function( callback ){
			var _this = this,
				label = query(_this.settings.detailsContainer, ".cl-main-widget-lb-details-header-label"),
				date = query(_this.settings.detailsContainer, ".cl-main-widget-lb-details-header-date"),
				body = query(_this.settings.detailsContainer, ".cl-main-widget-lb-details-body"),
				image = query(_this.settings.detailsContainer, ".cl-main-widget-lb-details-body-image-cont");
			
			label.innerHTML = ( _this.settings.lbWidget.settings.competition.activeContest.label.length > 0 ) ? _this.settings.lbWidget.settings.competition.activeContest.label : _this.settings.lbWidget.settings.competition.activeCompetition.label;
			body.innerHTML = ( _this.settings.lbWidget.settings.competition.activeContest.description.length > 0 ) ? _this.settings.lbWidget.settings.competition.activeContest.description : _this.settings.lbWidget.settings.competition.activeCompetition.description;
			_this.competitionDetailsOptInButtonState();
			
			_this.settings.detailsContainer.style.display = "block";
			_this.settings.headerDate.style.display = "none";
			
			objectIterator(query(body, "img"), function(img, key, count){
				if( count === 0 ){
					var newImg = img.cloneNode(true);
					image.innerHTML = "";
					image.appendChild(newImg);
					
					remove(img);
				}
			});
			
			setTimeout(function(){
				addClass(_this.settings.detailsContainer, "cl-show");
				
				if(typeof callback === "function") callback();
			}, 50);
		};

		this.loadCompetitionList = function( callback, ajaxInstance ){
			var _this = this,
				listResContainer = query(_this.settings.tournamentListContainer, ".cl-main-widget-tournaments-list-body-res"),
				preLoader = _this.preloader();

			preLoader.show();
			_this.settings.lbWidget.checkForAvailableCompetitions( function() {
				var accordionObj = _this.accordionStyle(_this.settings.tournamentsSection.accordionLayout, function (accordionSection, listContainer, topEntryContainer, layout) {
					var tournamentData = _this.settings.lbWidget.settings.tournaments[layout.type];


					if (typeof tournamentData !== "undefined") {
						if (tournamentData.length === 0) {
							accordionSection.style.display = "none";
						}
						mapObject(tournamentData, function (tournament, key, count) {
							if ((count + 1) <= layout.showTopResults && query(topEntryContainer, ".cl-tournament-" + tournament.id) === null) {
								var topEntryContaineRlistItem = _this.tournamentItem(tournament);
								topEntryContainer.appendChild(topEntryContaineRlistItem);
							}

							if (query(listContainer, ".cl-tournament-" + tournament.id) === null) {
								var listItem = _this.tournamentItem(tournament);
								listContainer.appendChild(listItem);
							}
						});
					}


				});

				listResContainer.innerHTML = "";
				listResContainer.appendChild(accordionObj);

				_this.settings.tournamentListContainer.style.display = "block";
				setTimeout(function () {
					addClass(_this.settings.tournamentListContainer, "cl-show");

					if (typeof callback === "function") callback();

					preLoader.hide()
				}, 50);
			}, ajaxInstance);
		};

		this.hideCompetitionList = function( callback ){
			var _this = this;

			removeClass(_this.settings.tournamentListContainer, "cl-show");

			setTimeout(function () {

				_this.settings.tournamentListContainer.style.display = "none";

				if (typeof callback === "function") callback();
			}, 200);
		};
		
		this.hideCompetitionDetails = function( callback ){
			var _this = this;
			
			removeClass(_this.settings.detailsContainer, "cl-show");
			setTimeout(function(){
				_this.settings.detailsContainer.style.display = "none";
				_this.settings.headerDate.style.display = "block";
				
				if(typeof callback === "function") callback();
			}, 200);
		};
		
		this.achievementItem = function( ach, achieved, perc ){
			var _this = this,
				listItem = document.createElement("div"),
				detailsContainer = document.createElement("div"),
				detailsWrapper = document.createElement("div"),
				label = document.createElement("div"),
				category = document.createElement("div"),
				description = document.createElement("div"),
				progressionWrapper = document.createElement("div"),
				progressionCont = document.createElement("div"),
				progressionBar = document.createElement("div"),
				moreButton = document.createElement("a"),
				cpomntainsImage = (typeof ach.icon !== "undefined" && ach.icon.length > 0);
			
			listItem.setAttribute("class", "cl-ach-list-item cl-ach-" + ach.id + ( cpomntainsImage ? " cl-ach-with-image" : "" ));
			detailsContainer.setAttribute("class", "cl-ach-list-details-cont");
			detailsWrapper.setAttribute("class", "cl-ach-list-details-wrap");
			label.setAttribute("class", "cl-ach-list-details-label");
			category.setAttribute("class", "cl-ach-list-details-category");
			description.setAttribute("class", "cl-ach-list-details-description");
			progressionWrapper.setAttribute("class", "cl-ach-list-progression");
			progressionCont.setAttribute("class", "cl-ach-list-progression-cont");
			progressionBar.setAttribute("class", "cl-ach-list-progression-bar");
			moreButton.setAttribute("class", "cl-ach-list-more");
			
			moreButton.dataset.id = ach.id;
			moreButton.innerHTML = _this.settings.lbWidget.settings.translation.achievements.more;
			moreButton.href = "javascript:void(0);";
			
			listItem.dataset.id = ach.id;
			
			label.innerHTML = ach.name;
			category.innerHTML = ach.category.join(", ");
			
			detailsWrapper.appendChild(label);
			detailsWrapper.appendChild(category);
			detailsWrapper.appendChild(description);
			
			if( cpomntainsImage ){
				var image = new Image(),
					imageIconWrapper = document.createElement("div");
				imageIconWrapper.setAttribute("class", "cl-ach-list-item-img-wrapper");
				image.setAttribute("class", "cl-ach-list-item-img");
				
				image.src = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.assets.replace(":attachmentId", ach.icon);
				image.alt = ach.name;
				
				// image.onload = function(){
				//
				// };
				imageIconWrapper.appendChild(image);
				detailsContainer.appendChild(imageIconWrapper);
			}
			
			detailsContainer.appendChild(detailsWrapper);
			
			progressionCont.appendChild(progressionBar);
			progressionWrapper.appendChild(progressionCont);
			progressionWrapper.appendChild(moreButton);
			
			
			listItem.appendChild(detailsContainer);
			listItem.appendChild(progressionWrapper);
			
			return listItem;
		};
		
		this.achievementListLayout = function(achievementData){
			var _this = this,
				achList = query(_this.settings.section, ".cl-main-widget-section-ach .cl-main-widget-ach-list-body-res");
			
			mapObject(achievementData, function(ach){
				if( query(achList, ".cl-ach-" + ach.id) === null ) {
					var listItem = _this.achievementItem(ach);
					
					achList.appendChild(listItem);
				}
			});
		};

		this.loadAchievementDetails = function( data, callback ){
			var _this = this,
				label = query(_this.settings.achievement.detailsContainer, ".cl-main-widget-ach-details-header-label"),
				body = query(_this.settings.achievement.detailsContainer, ".cl-main-widget-ach-details-body"),
				image = query(_this.settings.achievement.detailsContainer, ".cl-main-widget-ach-details-body-image-cont");

			label.innerHTML = data.data.name;
			body.innerHTML = data.data.description;

			objectIterator(query(body, "img"), function(img, key, count){
				if( count === 0 ){
					var newImg = img.cloneNode(true);
					image.innerHTML = "";
					image.appendChild(newImg);

					remove(img);
				}
			});

			_this.settings.achievement.detailsContainer.style.display = "block";
			setTimeout(function(){
				addClass(_this.settings.achievement.detailsContainer, "cl-show");

				if(typeof callback === "function") callback();
			}, 50);
		};

		this.hideAchievementDetails = function( callback ){
			var _this = this;

			removeClass(_this.settings.achievement.detailsContainer, "cl-show");
			setTimeout(function(){
				_this.settings.achievement.detailsContainer.style.display = "none";

				if(typeof callback === "function") callback();
			}, 200);
		};

		this.loadRewardDetails = function( data, callback ){
			var _this = this,
				label = query(_this.settings.reward.detailsContainer, ".cl-main-widget-reward-details-header-label"),
				body = query(_this.settings.reward.detailsContainer, ".cl-main-widget-reward-details-body"),
				image = query(_this.settings.reward.detailsContainer, ".cl-main-widget-reward-details-body-image-cont"),
				claimBtn = query(_this.settings.reward.detailsContainer, ".cl-main-widget-reward-claim-btn"),
				icon = query(_this.settings.reward.detailsContainer, ".cl-main-widget-reward-winnings-icon"),
				value = query(_this.settings.reward.detailsContainer, ".cl-main-widget-reward-winnings-value");

			label.innerHTML = data.data.reward.rewardName;
			body.innerHTML = data.data.reward.description;
			value.innerHTML = data.data.reward.value;
			claimBtn.dataset.id = data.data.id;

			if( data.data.claimed ){
				addClass(claimBtn, "cl-claimed");
				claimBtn.innerHTML = _this.settings.lbWidget.settings.translation.rewards.claimed;
			}else{
				removeClass(claimBtn, "cl-claimed");
				claimBtn.innerHTML = _this.settings.lbWidget.settings.translation.rewards.claim;
			}

			if( typeof data.data.reward.icon !== "undefined" ){
				icon.innerHTML = "";

				var image = new Image(),
					imageIconWrapper = document.createElement("div");
				imageIconWrapper.setAttribute("class", "cl-reward-list-item-img-wrapper");
				image.setAttribute("class", "cl-reward-list-item-img");

				image.src = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.assets.replace(":attachmentId", data.data.reward.icon);
				image.alt = data.data.reward.value;

				icon.appendChild( image );
			}else{
				icon.innerHTML = "<span class='cl-place-holder-reward-image'></span>";
			}

			objectIterator(query(body, "img"), function(img, key, count){
				if( count === 0 ){
					var newImg = img.cloneNode(true);
					image.innerHTML = "";
					image.appendChild(newImg);

					remove(img);
				}
			});

			_this.settings.reward.detailsContainer.style.display = "block";
			setTimeout(function(){
				addClass(_this.settings.reward.detailsContainer, "cl-show");

				if(typeof callback === "function") callback();
			}, 50);
		};

		this.hideRewardDetails = function( callback ){
			var _this = this;

			removeClass(_this.settings.reward.detailsContainer, "cl-show");
			setTimeout(function(){
				_this.settings.reward.detailsContainer.style.display = "none";

				if(typeof callback === "function") callback();
			}, 200);
		};
		
		this.updateAchievementProgressionAndIssued = function( issued, progression ){
			var _this = this,
				achList = query(_this.settings.section, ".cl-main-widget-section-ach .cl-main-widget-ach-list-body-res");
			
			objectIterator(query(achList, ".cl-ach-list-item"), function(ach){
				var id = ach.dataset.id,
					issuedStatus = (issued.indexOf(id) !== -1);
				
				var perc = 0;
				mapObject(progression, function(pr){
					if( pr.achievementId === id ){
						perc = (parseFloat(pr.goalPercentageComplete)*100).toFixed(1)
					}
				});
				
				if( ach !== null ){
					var bar = query(ach, ".cl-ach-list-progression-bar");
					
					if( issuedStatus ){
						addClass(bar, "cl-ach-complete");
						bar.innerHTML = _this.settings.lbWidget.settings.translation.achievements.complete;
					}else{
						bar.style.width = ((perc > 1 || perc === 0) ? perc : 1) + "%";
					}
				}
				
			});
			
			
		};
		
		this.loadAchievements = function( callback ){
			var _this = this;
			
			_this.settings.lbWidget.checkForAvailableAchievements(function( achievementData ){
				_this.achievementListLayout(achievementData);
				
				var idList = [];
				mapObject(_this.settings.lbWidget.settings.achievements.list, function(ach){
					idList.push(ach.id);
				});
				
				setTimeout(function(){
					_this.settings.lbWidget.checkForMemberAchievementsIssued(function( issued ){
						_this.settings.lbWidget.checkForMemberAchievementsProgression(idList, function( progression ){
							_this.updateAchievementProgressionAndIssued(issued, progression);
						});
					});
				}, 400);

				if( typeof callback === "function" ){
					callback();
				}
				
			});
		};
		
		this.rewardItem = function( rew ){
			var _this = this,
				listItem = document.createElement("div"),
				detailsContainer = document.createElement("div"),
				detailsWrapper = document.createElement("div"),
				label = document.createElement("div"),
				description = document.createElement("div");
			
			listItem.setAttribute("class", "cl-rew-list-item cl-rew-" + rew.id);
			detailsContainer.setAttribute("class", "cl-rew-list-details-cont");
			detailsWrapper.setAttribute("class", "cl-rew-list-details-wrap");
			label.setAttribute("class", "cl-rew-list-details-label");
			description.setAttribute("class", "cl-rew-list-details-description");

			listItem.dataset.id = rew.id;
			if( typeof rew.prize !== "undefined" ) {
				listItem.dataset.rewardId = rew.prize.id;
				label.innerHTML = rew.subject + " - " + rew.prize.reward.rewardName + " (" + rew.prize.reward.value + ")";
				description.innerHTML = (typeof rew.prize.reward.description !== "undefined" && rew.prize.reward.description.length > 0) ? rew.prize.reward.description : rew.body;
			}else{
				label.innerHTML = rew.subject;
				description.innerHTML = rew.body;
			}

			detailsWrapper.appendChild(label);
			detailsWrapper.appendChild(description);
			detailsContainer.appendChild(detailsWrapper);
			listItem.appendChild(detailsContainer);
			
			return listItem;
		};

		this.tournamentItem = function( tournament ){
			var _this = this,
				listItem = document.createElement("div"),
				detailsContainer = document.createElement("div"),
				detailsWrapper = document.createElement("div"),
				label = document.createElement("div"),
				description = document.createElement("div"),
				descriptionContent = stripHtml(tournament.description);

			listItem.setAttribute("class", "cl-tour-list-item cl-tour-" + tournament.id);
			detailsContainer.setAttribute("class", "cl-tour-list-details-cont");
			detailsWrapper.setAttribute("class", "cl-tour-list-details-wrap");
			label.setAttribute("class", "cl-tour-list-details-label");
			description.setAttribute("class", "cl-tour-list-details-description");

			listItem.dataset.id = tournament.id;
			label.innerHTML = tournament.label;
			description.innerHTML = (descriptionContent.length > 100) ? descriptionContent.substr(0, 100) + "..." : descriptionContent;

			detailsWrapper.appendChild(label);
			detailsWrapper.appendChild(description);
			detailsContainer.appendChild(detailsWrapper);
			listItem.appendChild(detailsContainer);

			return listItem;
		};
		
		this.rewardsListLayout = function(rewards, availableRewards, expiredRewards){
			var _this = this,
				rewardList = query(_this.settings.section, ".cl-main-widget-section-reward .cl-main-widget-reward-list-body-res");

			var accordionObj = _this.accordionStyle(_this.settings.rewardsSection.accordionLayout, function(accordionSection, listContainer, topEntryContainer, layout){
				var rewardData = _this.settings.lbWidget.settings.rewards[layout.type];


				if( typeof rewardData !== "undefined" ){
					if( rewardData.length === 0 ){
						accordionSection.style.display = "none";
					}
					mapObject(rewardData, function(rew, key, count){
						if( (count+1) <= layout.showTopResults && query(topEntryContainer, ".cl-reward-" + rew.id) === null ){
							var topEntryContaineRlistItem = _this.rewardItem(rew);
							topEntryContainer.appendChild(topEntryContaineRlistItem);
						}

						if( query(listContainer, ".cl-reward-" + rew.id) === null ) {
							var listItem = _this.rewardItem(rew);
							listContainer.appendChild(listItem);
						}
					});
				}


			});

			rewardList.innerHTML = "";
			rewardList.appendChild(accordionObj);

			// mapObject(rewardData, function(rew){
			// 	if( query(rewardList, ".cl-reward-" + rew.id) === null ) {
			// 		var listItem = _this.rewardItem(rew);
			//
			// 		rewardList.appendChild(listItem);
			// 	}
			// });
		};
		
		this.loadRewards = function( callback ){
			var _this = this;
			
			_this.settings.lbWidget.checkForAvailableRewards(function( rewards, availableRewards, expiredRewards ){
				_this.rewardsListLayout(rewards, availableRewards, expiredRewards);

				if( typeof callback === "function" ){
					callback();
				}
			});
		};
		
		
		var changeInterval;
		var changeContainerInterval;
		this.navigationSwitch = function( target, callback ){
			var _this = this,
				preLoader = _this.preloader();

			if( _this.settings.navigationSwitchInProgress && _this.settings.navigationSwitchLastAtempt+3000 < new Date().getTime() ) {
				_this.settings.navigationSwitchInProgress = false;
			}

			if( !_this.settings.navigationSwitchInProgress ) {
				_this.settings.navigationSwitchInProgress = true;
				_this.settings.navigationSwitchLastAtempt = new Date().getTime();

				if (!hasClass(target.parentNode, "cl-active-nav")) {

					preLoader.show();

					if (changeInterval) clearTimeout(changeInterval);
					if (changeContainerInterval) clearTimeout(changeContainerInterval);

					objectIterator(query(_this.settings.container, ".cl-main-widget-navigation-items .cl-active-nav"), function (obj) {
						removeClass(obj, "cl-active-nav");
					});

					objectIterator(query(_this.settings.container, ".cl-main-widget-section-container .cl-main-active-section"), function (obj) {
						removeClass(obj, "cl-main-active-section");
						setTimeout(function () {
							obj.style.display = "none";
						}, 150);
					});

					changeContainerInterval = setTimeout(function () {
						if (hasClass(target, "cl-main-widget-navigation-lb-icon")) {
							_this.loadLeaderboard(function () {

								var lbContainer = query(_this.settings.container, ".cl-main-widget-section-container .cl-main-widget-lb");

								lbContainer.style.display = "block";
								changeInterval = setTimeout(function () {
									addClass(lbContainer, "cl-main-active-section");
								}, 30);

								if (typeof callback === "function") {
									callback();
								}

								preLoader.hide();

								_this.settings.navigationSwitchInProgress = false;
							});


						} else if (hasClass(target, "cl-main-widget-navigation-ach-icon")) {
							_this.loadAchievements(function () {
								var achContainer = query(_this.settings.container, ".cl-main-widget-section-container .cl-main-widget-section-ach");

								_this.settings.achievement.detailsContainer.style.display = "none";

								achContainer.style.display = "block";
								changeInterval = setTimeout(function () {
									addClass(achContainer, "cl-main-active-section");

									if (typeof callback === "function") {
										callback();
									}
								}, 30);

								preLoader.hide();

								_this.settings.navigationSwitchInProgress = false;
							});
						} else if (hasClass(target, "cl-main-widget-navigation-rewards-icon")) {
							_this.loadRewards(function () {

								var rewardsContainer = query(_this.settings.container, ".cl-main-widget-section-container .cl-main-widget-section-reward");

								rewardsContainer.style.display = "block";
								changeInterval = setTimeout(function () {
									addClass(rewardsContainer, "cl-main-active-section");
								}, 30);

								if (typeof callback === "function") {
									callback();
								}

								preLoader.hide();

								_this.settings.navigationSwitchInProgress = false;
							});
						} else if (hasClass(target, "cl-main-widget-navigation-inbox-icon")) {
							var inboxContainer = query(_this.settings.container, ".cl-main-widget-section-container .cl-main-widget-section-inbox");

							inboxContainer.style.display = "block";
							changeInterval = setTimeout(function () {
								addClass(inboxContainer, "cl-main-active-section");
							}, 30);

							preLoader.hide();

							_this.settings.navigationSwitchInProgress = false;
						}
					}, 250);

					addClass(target.parentNode, "cl-active-nav");
				} else if (typeof callback === "function") {

					_this.settings.navigationSwitchInProgress = false;
					callback();
				}
			}
		};
		
		this.resetNavigation = function( callback ){
			var _this = this,
				lbContainer = query(_this.settings.container, ".cl-main-widget-section-container .cl-main-widget-lb");
			
			objectIterator(query(_this.settings.container, ".cl-main-widget-navigation-items .cl-active-nav"), function(obj){
				removeClass(obj, "cl-active-nav");
			});
			
			objectIterator(query(_this.settings.container, ".cl-main-widget-section-container .cl-main-active-section"), function(obj){
				obj.style.display = "none";
				removeClass(obj, "cl-main-active-section");
			});
			
			addClass(query(_this.settings.container, ".cl-main-widget-navigation-items .cl-main-widget-navigation-lb"), "cl-active-nav");
			setTimeout(function(){
				lbContainer.style.display = "block";
				setTimeout(function(){
					addClass(lbContainer, "cl-main-active-section");

					if( typeof callback !== "undefined" ) callback();
				}, 30);
			}, 40);
		};
		
		this.initLayout = function( callback ){
			var _this = this;
			
			_this.settings.active = true;
			
			_this.loadLeaderboard();
			
			_this.settings.container.style.display = "block";
			setTimeout(function(){
				addClass(_this.settings.container, "cl-show");
				
				var member = query(_this.settings.leaderboard.list, ".cl-lb-member-row");
				if( member !== null ){
					_this.missingMember( _this.isElementVisibleInView(member, _this.settings.leaderboard.list.parentNode) );
				}
				
				_this.resetNavigation( callback );
			}, 30);
		};
	};
	
	
	/**
	 * Main leaderboard widget, controls all actions and initiation logic.
	 * Main responsibility is to control the interactions between different widgets/plugins and user even actions
	 * @param options {Object} setting parameters used to overwrite the default settings
	 * @constructor
	 */
	var LbWidget = function( options ){

		this.settings = {
			debug: true,
			bindContainer: document.body,
			autoStart: true,
			sseMessaging: null,
			notifications: null,
			miniScoreBoard: null,
			enableNotifications: true,
			mainWidget: null,
			globalAjax: new cLabs.Ajax(),
			checkAjax: new cLabs.Ajax(),
			language: "en",
			currency: "",
			spaceName: "",
			memberId: "",
			groups: "",
			gameId: "",
			enforceGameLookup: false, // tournament lookup will include/exclude game only requests
			apiKey: "",
			member: null,
			competition: {
				activeCompetitionId: null,
				activeContestId: null,
				activeCompetition: null,
				activeContest: null,
				refreshInterval: null,
				refreshIntervalMillis: 10000
			},
			achievements: {
				list: [],
				availableRewards: [],
				rewards: [],
				expiredRewards: []
			},
			rewards: {
				availableRewards: [],
				rewards: [],
				expiredRewards: []
			},
			tournaments: {
				activeCompetitionId: null,
				readyCompetitions: [], // statusCode 3
				activeCompetitions: [], // statusCode 5
				finishedCompetitions: [], // statusCode 7
			},
			leaderboard: {
				fullLeaderboardSize: 100,
				refreshIntervalMillis: 5000,
				refreshInterval: null,
				refreshLbDataInterval: null,
				leaderboardData: [],
				loadLeaderboardHistory: {}
				
			},
			uri: {
				gatewayDomain: cLabs.api.url,
				
				members: "/api/v1/:space/members/reference/:id",
				assets: "/assets/attachments/:attachmentId",

				memberSSE: "/api/v1/:space/sse/reference/:id",
				memberSSEHeartbeat: "/api/v1/:space/sse/reference/:id/heartbeat",

				competitions: "/api/v1/:space/competitions",
				competitionById: "/api/v1/:space/competitions/:id",
				contestLeaderboard: "/api/v1/:space/contests/:id/leaderboard",
				
				achievement: "/api/v1/:space/achievements/:id",
				achievements: "/api/v1/:space/achievements/members/reference/:id",
				// achievements: "/api/v1/:space/achievements",
				achievementsProgression: "/api/v1/:space/members/reference/:id/achievements",
				achievementsIssued: "/api/v1/:space/members/reference/:id/achievements/issued",
				
				messages: "/api/v1/:space/members/reference/:id/messages",
				
				memberReward: "/api/v1/:space/members/reference/:id/award/:awardId",
				memberRewardClaim: "/api/v1/:space/members/reference/:id/award/:awardId/award",

				memberCompetitions: "/api/v1/:space/members/reference/:id/competitions",
				memberCompetitionById: "/api/v1/:space/members/reference/:id/competition/:competitionId",
				memberCompetitionOptIn: "/api/v1/:space/members/reference/:id/competition/:competitionId/optin",
				memberCompetitionOptInCheck: "/api/v1/:space/members/reference/:id/competition/:competitionId/optin-check"
			},
			translation: {
				time: {
					days: "d",
					hours: "h",
					minutesShortHand: "min",
					minutes: "m",
					seconds: "s"
				},
				achievements: {
					label: "Achievements",
					more: "More",
					complete: "complete 100%"
				},
				tournaments: {
					label: "Tournaments",
					enter: "Enter Tournament",
					readyCompetitions: "Upcoming Tournaments",
					activeCompetitions: "Active Tournaments",
					finishedCompetitions: "Finished Tournaments",
					finishing: "Finishing",
					finished: "Finished",
					registered: "Registered"
				},
				leaderboard: {
					rank: "Rank",
					name: "Name",
					points: "Points",
					prize: "Prize"
				},
				miniLeaderboard: {
					highScore: "High Score",
					lastScore: "Last Score",
					rank: "Rank",
					startsIn: "Starting In",
					starting: "starting",
					finishing: "finishing",
					finished: "finished"
				},
				rewards: {
					label: "Rewards",
					claim: "Claim Now",
					claimed: "Claimed",
					availableRewards: "Available Rewards",
					rewards: "Claimed Rewards",
					expiredRewards: "Expired Rewards"
				},
				global: {
					copy: "Powered By CompetitionLabs"
				}
			},
			resources: [
				(cLabs.api.url + "/assets/widgets/leaderboard_v3/css/style.css?t=" + ( new Date().getTime() )),
				(cLabs.api.url + "/assets/widgets/leaderboard_v3/css/fonts.css?t=" + ( new Date().getTime() ))
			],
			layoutBuildCallback: function( layout, instance ){}
		};
		
		if( typeof options !== "undefined" ){
			this.settings = mergeObjects(this.settings, options);
		}
		
		this.log = function( message ){ if( this.settings.debug ) { console.error(message); } };
		
		/**
		 * Format duration of Date Time from moment() object
		 * @param duration {moment}
		 * @returns {string}
		 */
		this.formatDateTime = function (duration) {
			var _this = this,
				largeResult = [],
				result = [];
			if (duration.days()) largeResult.push( duration.days() + '<span class="time-ind">' + _this.settings.translation.time.days + '</span>' );
			if (duration.hours() || duration.days() > 0){ result.push( formatNumberLeadingZeros(duration.hours(), 2) + '<span class="time-ind">' + _this.settings.translation.time.hours + '</span>' ) }else result.push( '00<span class="time-ind">'  + _this.settings.translation.time.hours + '</span>' );
			if (duration.minutes() || duration.hours() > 0 || duration.days() > 0){ result.push( formatNumberLeadingZeros(duration.minutes(), 2) + ((duration.days() > 0) ? '<span class="time-ind">' + _this.settings.translation.time.minutes + '</span>' : '<span class="time-ind">' + _this.settings.translation.time.minutesShortHand + '</span>') ) }else (result.push( "00" + ((duration.days() > 0) ? '<span class="time-ind">' + _this.settings.translation.time.minutes + '</span>' : '<span class="time-ind">' + _this.settings.translation.time.minutesShortHand + '</span>') ));
			// if (duration.seconds() && duration.days() === 0){ result.push( formatNumberLeadingZeros(duration.seconds(), 2) + '<span class="time-ind">s</span>' ) }else if(duration.days() === 0){result.push( '00<span class="time-ind">s</span>' )};
			result.push( formatNumberLeadingZeros(duration.seconds(), 2) + '<span class="time-ind">' + _this.settings.translation.time.seconds + '</span>' );
			return (largeResult.length > 0) ? (largeResult.join(" ") + " " + result.join(":")) : result.join(":");
		};

		this.populateIdenticonBase64Image = function( str ){
			if( str.length > 0 ) {
				var shaObj = new jsSHA(str, "TEXT"),
					hash = shaObj.getHash("SHA-512", "HEX", 1),
					data = new Identicon(hash, {
						background: [255, 255, 255, 255],         // rgba white
						margin: 0.1,                              // 20% margin
						size: 22,                                // 420px square
						format: 'svg'                             // use SVG instead of PNG
					}).toString(),
					icon = 'data:image/svg+xml;base64,' + data;

				return icon;
			}else{
				return "";
			}
		};
		
		/**
		 * get a list of available competition filtered by provided global criteria
		 * @param callback {Function}
		 */
		var competitionCheckAjax = new cLabs.Ajax();
		this.checkForAvailableCompetitions = function( callback, ajaxInstance ){
			var _this = this,
				url = (_this.settings.memberId.length === 0) ? (
					_this.settings.uri.competitions.replace(":space", _this.settings.spaceName)
				) : (
					_this.settings.uri.memberCompetitions.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId)
				),
				filters = [
					"statusCode>==3",
					"statusCode<==5",
					"_sortByFields=options.scheduledDates.end:desc",
					("_lang=" + _this.settings.language)
				],
				ajaxInstanceToUse = (typeof ajaxInstance !== "undefined" && ajaxInstance !== null) ? ajaxInstance : competitionCheckAjax;

			if( typeof _this.settings.currency === "string" && _this.settings.currency.length > 0  ){
				filters.push("_uomKey" + _this.settings.currency);
			}
			
			if( _this.settings.gameId.length > 0 && _this.settings.enforceGameLookup ){
				filters.push("options.products.productRefId=" + _this.settings.gameId);
			}
			
			if( _this.settings.groups.length > 0 && _this.settings.memberId.length === 0 ){
				filters.push("options.limitEntrantsTo=" + _this.settings.groups);
			}

			ajaxInstanceToUse.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url + "?" + filters.join("&"),
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function(response, dataObj, xhr){
					if( xhr.status === 200 ){
						var json = JSON.parse(response);
						
						_this.settings.tournaments.readyCompetitions = [];
						_this.settings.tournaments.activeCompetitions = [];
						
						mapObject(json.data, function(comp){
							if( comp.statusCode === 3 ){
								_this.settings.tournaments.readyCompetitions.push(comp);
							}else if( comp.statusCode === 5 ){
								_this.settings.tournaments.activeCompetitions.push(comp);
							}
						});

						_this.checkForFinishedCompetitions(callback, ajaxInstance);


					}else{
						_this.log("failed to checkForActiveCompetitions " + response);
					}
				}
			});
		};
		
		/**
		 * get a list of finished competition filtered by provided global criteria
		 * @param callback {Function}
		 */
		var competitionFinishedCheckAjax = new cLabs.Ajax();
		this.checkForFinishedCompetitions = function( callback, ajaxInstance ){
			var _this = this,
				url = (_this.settings.memberId.length === 0) ? (
					_this.settings.uri.competitions.replace(":space", _this.settings.spaceName)
				) : (
					_this.settings.uri.memberCompetitions.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId)
				),
				filters = [
					"statusCode=7",
					"_limit=10",
					"_sortByFields=options.scheduledDates.end:desc",
					("_lang=" + _this.settings.language)
				],
				ajaxInstanceToUse = (typeof ajaxInstance !== "undefined" && ajaxInstance !== null) ? ajaxInstance : competitionFinishedCheckAjax;

			if( typeof _this.settings.currency === "string" && _this.settings.currency.length > 0  ){
				filters.push("_uomKey" + _this.settings.currency);
			}

			if( _this.settings.gameId.length > 0 && _this.settings.enforceGameLookup ){
				filters.push("options.products.productRefId=" + _this.settings.gameId);
			}

			if( _this.settings.groups.length > 0 && _this.settings.memberId.length === 0 ){
				filters.push("options.limitEntrantsTo=" + _this.settings.groups);
			}

			ajaxInstanceToUse.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url + "?" + filters.join("&"),
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function(response, dataObj, xhr){
					if( xhr.status === 200 ){
						var json = JSON.parse(response);

						_this.settings.tournaments.finishedCompetitions = [];

						mapObject(json.data, function(comp){
							if( comp.statusCode === 7 ){
								_this.settings.tournaments.finishedCompetitions.push(comp);
							}
						});

						if( typeof callback === "function" ){
							callback();
						}
					}else{
						_this.log("failed to checkForActiveCompetitions " + response);
					}
				}
			});
		};
		
		this.prepareActiveCompetition = function( callback ){
			var _this = this,
				activeCompetition = null,
				activeCompetitionId = null;

			if( _this.settings.tournaments.activeCompetitionId !== null ){

				mapObject(_this.settings.tournaments.activeCompetitions, function( comp ){
					if( comp.id === _this.settings.tournaments.activeCompetitionId ){
						activeCompetition = comp;
					}
				});
				mapObject(_this.settings.tournaments.readyCompetitions, function( comp ){
					if( comp.id === _this.settings.tournaments.activeCompetitionId ){
						activeCompetition = comp;
					}
				});
				mapObject(_this.settings.tournaments.finishedCompetitions, function( comp ){
					if( comp.id === _this.settings.tournaments.activeCompetitionId ){
						activeCompetition = comp;
					}
				});


				if( activeCompetition !== null ) {
					activeCompetitionId = _this.settings.tournaments.activeCompetitionId;
				}else{
					_this.settings.tournaments.activeCompetitionId = null;
				}
			}

			if( activeCompetition === null && _this.settings.tournaments.activeCompetitions.length > 0 ){
				activeCompetition = _this.settings.tournaments.activeCompetitions[0];
				activeCompetitionId = activeCompetition.id;
				
			}else if( activeCompetition === null && _this.settings.tournaments.readyCompetitions.length > 0 ){
				activeCompetition = _this.settings.tournaments.readyCompetitions[0];
				activeCompetitionId = activeCompetition.id;
			}
			
			if ( activeCompetitionId === null ) { // no active or ready competitions found
				_this.deactivateCompetitionsAndLeaderboards();
			}else{
				if( _this.settings.competition.activeCompetitionId !== activeCompetitionId && activeCompetitionId !== null ) {
					
					_this.settings.competition.activeCompetition = activeCompetition;
					_this.settings.competition.activeCompetitionId = activeCompetitionId;
					
				}
				
				if( activeCompetitionId !== null ){
					_this.loadActiveCompetition( function( json ){
						
						_this.setActiveCompetition(json, callback);
						
					} );
				}else if (typeof callback === "function") { callback(); }
			}
			
		};
		
		this.loadActiveCompetition = function( callback ){
			var _this = this,
				url = (_this.settings.memberId.length === 0) ? (
					_this.settings.uri.competitionById.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.competition.activeCompetitionId)
				) : (
					_this.settings.uri.memberCompetitionById.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId).replace(":competitionId", _this.settings.competition.activeCompetitionId)
				),
				filters = [
					("_include=strategy"),
					("_lang=" + _this.settings.language)
				];

			if( typeof _this.settings.currency === "string" && _this.settings.currency.length > 0  ){
				filters.push("_uomKey" + _this.settings.currency);
			}
			
			_this.settings.globalAjax.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url + "?" + filters.join("&"),
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function(response, dataObj, xhr){
					if( xhr.status === 200 ){
						var json = JSON.parse(response);
						
						if( typeof callback === "function" ){ callback(json); }
					}else{
						_this.log("failed to loadActiveCompetition " + response);
					}
				}
			});
		};
		
		this.setActiveCompetition = function( json, callback ){
			var _this = this;
			
			_this.settings.competition.activeCompetition = json.data;
			_this.settings.competition.activeContest = null;
			_this.settings.competition.activeContestId = null;
			
			if( typeof json.data.contests !== "undefined" && json.data.contests.length > 0 ) {
				mapObject(json.data.contests, function(contest){
					if( contest.statusCode < 7 && _this.settings.competition.activeContest === null ){
						_this.settings.competition.activeContest = contest;
						_this.settings.competition.activeContestId = contest.id;
						
						if( typeof _this.settings.competition.activeContest.rewards === "undefined" ){
							_this.settings.competition.activeContest.rewards = [];
						}
						
						var rewards = [];
						mapObject(_this.settings.competition.activeContest.rewards, function(reward){
							
							if( typeof reward.rewardRank === "string" ){
								var rankParts = reward.rewardRank.split(","),
									rewardRank = [];
								
								mapObject(rankParts, function(part){
									if( stringContains(part, "-") ){
										var rankRange = part.split("-"),
											rageStart = parseInt(rankRange[0]),
											rangeEnd = parseInt(rankRange[1]);
										for(var i = rageStart; i <= rangeEnd; i++){
											rewardRank.push(i);
										}
									}else{
										rewardRank.push(parseInt(part));
									}
								});
								
								reward.rewardRank = rewardRank;
							}
							
							rewards.push(reward);
						});
						
						_this.settings.competition.activeContest.rewards = rewards;
					}
				});
				
			}
			
			if( typeof callback === "function" ){ callback(); }
		};
		
		this.getLeaderboardData = function( count, callback ){
			if( this.settings.competition.activeContestId !== null ) {
				var _this = this,
					url = _this.settings.uri.contestLeaderboard.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.competition.activeContestId),
					filters = [
						"_limit=" + count,
						"rankings=2"
					];
				
				if (typeof _this.settings.memberId === "string" && _this.settings.memberId.length > 0) {
					filters.push("memberId=" + _this.settings.memberId);
				}
				
				_this.settings.globalAjax.abort().getData({
					type: "GET",
					url: _this.settings.uri.gatewayDomain + url + "?" + filters.join("&"),
					headers: {
						"X-API-KEY": _this.settings.apiKey
					},
					success: function (response, dataObj, xhr) {
						if (xhr.status === 200) {
							var json = JSON.parse(response);
							
							// if(
							// 	typeof _this.settings.loadLeaderboardHistory[_this.settings.competition.activeContestId] === "undefined"
							// 	||
							// 	(
							// 		typeof _this.settings.loadLeaderboardHistory[_this.settings.competition.activeContestId] !== "undefined"
							// 		&&
							// 		_this.settings.loadLeaderboardHistory[_this.settings.competition.activeContestId] !== data
							// 	)
							// ) {
							// 	_this.settings.loadLeaderboardHistory[_this.settings.competition.activeContestId] = {
							// 		changed: true,
							// 		data: JSON.stringify(json.data)
							// 	};
							// }
                            
                            // we need to mask competitor's names. We will replace last 4 characters with "*"
							// also first 4 chars are replaced with "*"
							_this.maskNames(json.data, _this.settings.memberId );
                            
							_this.settings.leaderboard.leaderboardData = json.data;
							callback(json.data);
							
						} else {
							_this.log("failed to getLeaderboardData " + response);
						}
					}
				});
			}else{
				callback();
			}
		};
        
        // function masks names of users
		this.maskNames = function(data, myname) {
			
			//myname --> _this.settings.memberId
			for (var leadboard of data) {

				if ( leadboard.name !== myname ) {
					// split casino and player name
					var separated = leadboard.name.split(":");
					let casName = this.maskWord(separated[0]);
					let playerName = this.maskWord(separated[1]);
					leadboard.name = casName + ":" + playerName;
				}
			}
		}
		
		// take string as input and put first 4 chars as "*"
		this.maskWord = function(word) {
			var ret ="";
			// replace last 4
			if (word.length >= 4) {
				ret = word.substring(0, word.length - 4);
				ret += "****";
			// replace all
			} else {
				ret = word.replace(/./g,'*');
			}
			return ret;
		} 

		var checkAchievementsAjax = new cLabs.Ajax();
		this.checkForAvailableAchievements = function( callback ){
			var _this = this,
				url = _this.settings.uri.achievements.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId),
				filters = [
					"_limit=100",
					// include products to enable achievement filtering
					"_include=rewards,products",
					("_lang=" + _this.settings.language)
				],
				withGroups = false;

			if( typeof _this.settings.currency === "string" && _this.settings.currency.length > 0  ){
				filters.push("_uomKey" + _this.settings.currency);
			}
			
			if( typeof _this.settings.member.groups !== "undefined" &&  _this.settings.member.groups.length > 0 ){
				withGroups = true;
				filters.push("memberGroups=" + _this.settings.member.groups.join(","));
			}

			checkAchievementsAjax.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url + "?_lang=" + _this.settings.language + "&_uomKey" + _this.settings.currency,
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function(response, dataObj, xhr){
					if( xhr.status === 200 ){
						var jsonForAll = JSON.parse(response);
						
						// clear achievements list
						_this.settings.achievements.list = [];
						
						/*
						mapObject(jsonForAll.data, function(ach){
							// here we add first achievements
							_this.settings.achievements.list.push(ach);
						});
						*/

						if( withGroups ) {
							checkAchievementsAjax.abort().getData({
								type: "GET",
								url: _this.settings.uri.gatewayDomain + url + "?" + filters.join("&"),
								headers: {
									"X-API-KEY": _this.settings.apiKey
								},
								success: function (response, dataObj, xhr) {
									if (xhr.status === 200) {
										var json = JSON.parse(response);
										
										mapObject(json.data, function (ach) {

											// we show the achievement only if it's active for the current game (product)
											// _this.settings.gameId="55"
											// ach.products = [{name: "Eddie Dundee", productGroups: ["gameart"], productRefId: "55", productType: "slot"}] 
											_this.filterAchievementByProduct(ach, _this.settings.gameId, _this);
										});
										
										if (typeof callback === "function") callback(_this.settings.achievements.list);
										
									} else {
										_this.log("failed to checkForAvailableAchievements " + response);
									}
								}
							});

						} else {
							if (typeof callback === "function") callback( jsonForAll.data );
						}

					} else {
						_this.log("failed to checkForAvailableAchievements " + response);
					}
				}
			});
		};

		// filter achievement if enabled for current game
		// we show the achievement only if it's active for the current game (product)
		// _this.settings.gameId="55"
		// ach.products = [{name: "Eddie Dundee", productGroups: ["gameart"], productRefId: "55", productType: "slot"}] 
		this.filterAchievementByProduct = function (ach, gameid, self) {
			
			// no product filtering enabled in backoffice
			if (ach.products.length == 0) {
				self.settings.achievements.list.push(ach);
			
			// check if achievement enabled for this current game (product)
			} else {
				for (var prod of ach.products) {
					if (prod.productRefId === self.settings.gameId) {
						// add to achievements list
						self.settings.achievements.list.push(ach);
					}
				}
			} 
		}

		var getAchievementsAjax = new cLabs.Ajax();
		this.getAchievement = function( achievementId, callback ){
			var _this = this;

			getAchievementsAjax.abort().getData({
				url: _this.settings.uri.gatewayDomain + _this.settings.uri.achievement.replace(":space", _this.settings.spaceName).replace(":id", achievementId) + "?_lang=" + _this.settings.language + "&_uomKey" + _this.settings.currency,
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				type: "GET",
				success: function(response, dataObj, xhr){
					var json = null;
					if( xhr.status === 200 ){
						try{
							json = JSON.parse(response);
						}catch(e){}
					}

					if( typeof callback === "function" ){
						callback( json );
					}
				},
				error: function(){
					if( typeof callback === "function" ){
						callback( null );
					}
				}
			});
		};

		var getRewardAjax = new cLabs.Ajax();
		this.getReward = function( rewardId, callback ){
			var _this = this;

			getRewardAjax.abort().getData({
				url: _this.settings.uri.gatewayDomain + _this.settings.uri.memberReward.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId).replace(":awardId", rewardId),
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				type: "GET",
				success: function(response, dataObj, xhr){
					var json = null;
					if( xhr.status === 200 ){
						try{
							json = JSON.parse(response);
						}catch(e){}
					}

					if( typeof callback === "function" ){
						callback( json );
					}
				},
				error: function(){
					if( typeof callback === "function" ){
						callback( null );
					}
				}
			});
		};

		var claimRewardAjax = new cLabs.Ajax();
		this.claimReward = function( rewardId, callback ){
			var _this = this;

			claimRewardAjax.abort().getData({
				url: _this.settings.uri.gatewayDomain + _this.settings.uri.memberRewardClaim.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId).replace(":awardId", rewardId),
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				type: "POST",
				success: function(response, dataObj, xhr){
					var json = null;
					if( xhr.status === 200 ){
						try{
							json = JSON.parse(response);
						}catch(e){}
					}

					if( typeof callback === "function" ){
						callback( json );
					}
				},
				error: function(){
					if( typeof callback === "function" ){
						callback( null );
					}
				}
			});
		};

		var checkForMemberAchievementsAjax = new cLabs.Ajax();
		this.checkForMemberAchievementsIssued = function( callback ){
			var _this = this,
				url = _this.settings.uri.achievementsIssued.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId);

			checkForMemberAchievementsAjax.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url,
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function(response, dataObj, xhr){
					if( xhr.status === 200 ){
						var json = JSON.parse(response),
							idList = [];
						
						if( typeof json.aggregations !== "undefined" && json.aggregations.length > 0 ) {
							mapObject(json.aggregations[0].items, function (item) {
								idList.push(item.value);
							});
						}
						
						if( typeof callback === "function" ) callback( idList );
						
					}else{
						_this.log("failed to checkForMemberAchievementsIssued " + response);
					}
				}
			});
		};

		var checkForMemberAchievementsProgressionAjax = new cLabs.Ajax();
		this.checkForMemberAchievementsProgression = function( idList, callback ){
			var _this = this,
				url = _this.settings.uri.achievementsProgression.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId);

			checkForMemberAchievementsProgressionAjax.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url + ( idList.length > 0 ? ("?id=" + idList.join(",")) : "" ),
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function(response, dataObj, xhr){
					if( xhr.status === 200 ){
						var json = JSON.parse(response);
						
						if( typeof callback === "function" ) callback( json.data );
						
					}else{
						_this.log("failed to checkForMemberAchievementsProgression " + response);
					}
				}
			});
		};

		var checkForAvailableRewardsAjax = new cLabs.Ajax();
		this.checkForAvailableRewards = function( callback ){
			var _this = this,
				url = _this.settings.uri.messages.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId);

			// claimed rewards
			checkForAvailableRewardsAjax.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url + "?_sortByFields=created:desc&messageType=Reward&prize.claimed=true&_hasValuesFor=prize&_limit=100",
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function(response, dataObj, xhr){
					if( xhr.status === 200 ){
						var jsonForAll = JSON.parse(response);
						
						_this.settings.rewards.rewards = [];
						_this.settings.rewards.availableRewards = [];
						_this.settings.rewards.expiredRewards = [];
						
						mapObject(jsonForAll.data, function(message){
							var expired = (typeof message.expiry === "undefined") ? false : ( moment(message.expiry).diff(moment()) < 0 ? true : false );

							if( !expired ) {
								_this.settings.rewards.rewards.push(message);
							}
						});

						// not-claimed rewards
						checkForAvailableRewardsAjax.abort().getData({
							type: "GET",
							url: _this.settings.uri.gatewayDomain + url + "?_sortByFields=created:desc&messageType=Reward&prize.claimed=false&_hasValuesFor=prize&_limit=100",
							headers: {
								"X-API-KEY": _this.settings.apiKey
							},
							success: function(response, dataObj, xhr){
								if( xhr.status === 200 ){
									var jsonForAll = JSON.parse(response);


									mapObject(jsonForAll.data, function(message){
										var expired = (typeof message.expiry === "undefined") ? false : ( moment(message.expiry).diff(moment()) < 0 ? true : false );

										if( !expired ) {
											_this.settings.rewards.availableRewards.push(message);
										}
									});

									// expired rewards
									var date = new Date(),
										utcDate = date.getUTCFullYear() + "-" + formatNumberLeadingZeros((date.getUTCMonth()+1), 2) + "-" + formatNumberLeadingZeros(date.getUTCDate(), 2) + "T" + formatNumberLeadingZeros(date.getUTCHours(), 2) + ":" + formatNumberLeadingZeros(date.getUTCMinutes(), 2) + ":00";
									_this.settings.globalAjax.abort().getData({
										type: "GET",
										url: _this.settings.uri.gatewayDomain + url + "?_sortByFields=created:desc&_limit=100&messageType=Reward&_hasValuesFor=expiry&expiry<==" + utcDate,
										headers: {
											"X-API-KEY": _this.settings.apiKey
										},
										success: function(response, dataObj, xhr){
											if( xhr.status === 200 ){
												var jsonForAll = JSON.parse(response);

												mapObject(jsonForAll.data, function(message){
													_this.settings.rewards.expiredRewards.push(message);
												});

												if (typeof callback === "function") callback(_this.settings.rewards.rewards, _this.settings.rewards.availableRewards, _this.settings.rewards.expiredRewards);
											}else{
												_this.log("failed to checkForAvailableRewards expired " + response);
											}
										}
									});


								}else{
									_this.log("failed to checkForAvailableRewards not-claimed " + response);
								}
							}
						});

					}else{
						_this.log("failed to checkForAvailableRewards claimed " + response);
					}
				}
			});
		};

		var optInMemberAjax = new cLabs.Ajax();
		this.optInMemberToActiveCompetition = function( callback ){
			var _this = this,
				url = _this.settings.uri.memberCompetitionOptIn.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId).replace(":competitionId", _this.settings.competition.activeCompetitionId);

			optInMemberAjax.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url,
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function (response, dataObj, xhr) {
					if (xhr.status === 200) {
						
						callback();
						
					} else {
						_this.log("failed to optInMemberToActiveCompetition " + response);
					}
				}
			});
		};
		
		var revalidationCount = 0;
		this.revalidateIfSuccessfullOptIn = function( callback ){
			var _this = this;
			
			_this.loadActiveCompetition(function( competitionJson ){
				if( typeof competitionJson.data.optin === "boolean" && !competitionJson.data.optin ){
					
					revalidationCount++;
					
					if( revalidationCount < 5 ) {
						setTimeout(function(){
							_this.revalidateIfSuccessfullOptIn( callback );
						}, 100);
					}else{
						revalidationCount = 0;
					}
				}else if( typeof competitionJson.data.optin === "boolean" && competitionJson.data.optin ){
					callback( competitionJson );
				}
			});
		};
		
		this.leaderboardDataRefresh = function(){
			var _this = this;
			
			if( _this.settings.leaderboard.refreshLbDataInterval ){
				clearTimeout(_this.settings.leaderboard.refreshLbDataInterval);
			}
			
			if(
				(_this.settings.competition.activeCompetition !== null && typeof _this.settings.competition.activeCompetition.optinRequired === "boolean" && !_this.settings.competition.activeCompetition.optinRequired)
				||
				( typeof _this.settings.competition.activeCompetition.optin === "boolean" && _this.settings.competition.activeCompetition.optin )
			){
				var count = (_this.settings.miniScoreBoard.settings.active) ? 0 : _this.settings.leaderboard.fullLeaderboardSize;
				_this.getLeaderboardData(count, function( data ){
					
					if( _this.settings.miniScoreBoard.settings.active ) _this.settings.miniScoreBoard.loadScoreBoard();
					if( _this.settings.mainWidget.settings.active ) _this.settings.mainWidget.loadLeaderboard();
					
				});
			}
			
			
			_this.settings.leaderboard.refreshLbDataInterval = setTimeout(function () {
				_this.leaderboardDataRefresh();
			}, _this.settings.leaderboard.refreshIntervalMillis);
			
		};
		
		this.activeCompetitionDataRefresh = function( callback ){
			var _this = this;
			
			if( _this.settings.competition.refreshInterval ){
				clearTimeout(_this.settings.competition.refreshInterval);
			}

			_this.checkForAvailableCompetitions( function(){
				_this.prepareActiveCompetition(function(){
					var count = (_this.settings.miniScoreBoard.settings.active) ? 0 : _this.settings.leaderboard.fullLeaderboardSize;

					// clear to not clash with LB refresh that could happen at same time
					if( _this.settings.leaderboard.refreshInterval ){
						clearTimeout(_this.settings.leaderboard.refreshInterval);
					}

					if( _this.settings.miniScoreBoard.settings.active || _this.settings.mainWidget.settings.active ) {
						if (
							(_this.settings.competition.activeCompetition !== null && typeof _this.settings.competition.activeCompetition.optinRequired === "boolean" && !_this.settings.competition.activeCompetition.optinRequired)
							||
							(_this.settings.competition.activeCompetition !== null && typeof _this.settings.competition.activeCompetition.optin === "boolean" && _this.settings.competition.activeCompetition.optin)
						) {

							_this.getLeaderboardData(count, function (data) {

								if (_this.settings.miniScoreBoard.settings.active) _this.settings.miniScoreBoard.loadScoreBoard();
								if (_this.settings.mainWidget.settings.active) _this.settings.mainWidget.loadLeaderboard();

								// re-start leaderboard refresh
								_this.leaderboardDataRefresh();

								if( typeof callback === "function" ){
									callback();
								}
							});
						} else {
							if (_this.settings.miniScoreBoard.settings.active) _this.settings.miniScoreBoard.loadScoreBoard();
							if (_this.settings.mainWidget.settings.active) {
								_this.getLeaderboardData(count, function (data) {
									_this.settings.mainWidget.loadLeaderboard();
								});
							}

							// restart leaderboard refresh
							_this.leaderboardDataRefresh();

							if( typeof callback === "function" ){
								callback();
							}
						}
					}else{
						if (_this.settings.miniScoreBoard.settings.active) _this.settings.miniScoreBoard.loadScoreBoard();

						if( typeof callback === "function" ){
							callback();
						}
					}
				});
			});
			
			_this.settings.competition.refreshInterval = setTimeout(function(){
				_this.activeCompetitionDataRefresh();
			}, _this.settings.competition.refreshIntervalMillis);
		};
		
		this.deactivateCompetitionsAndLeaderboards = function( callback ){
			var _this = this;
			
			if( _this.settings.leaderboard.refreshInterval ){
				clearTimeout(_this.settings.leaderboard.refreshInterval);
			}
			
			_this.settings.miniScoreBoard.clearAll();
			_this.settings.mainWidget.clearAll();
			
			if( typeof callback === "function" ){ callback(); }
		};

		this.stopActivity = function( callback ){
			var _this = this;

			if( _this.settings.leaderboard.refreshInterval ){
				clearTimeout(_this.settings.leaderboard.refreshInterval);
				clearInterval(_this.settings.leaderboard.refreshInterval);
			}

			if( _this.settings.leaderboard.refreshLbDataInterval ){
				clearTimeout(_this.settings.leaderboard.refreshLbDataInterval);
				clearInterval(_this.settings.leaderboard.refreshLbDataInterval);
			}

			if( _this.settings.miniScoreBoard.settings.updateInterval ){
				clearTimeout(_this.settings.miniScoreBoard.settings.updateInterval);
				clearInterval(_this.settings.leaderboard.refreshInterval);
			}

			if( typeof callback === "function" ){ callback(); }
		};

		this.restartActivity = function( callback ){
			var _this = this;

			_this.activeCompetitionDataRefresh();
			_this.settings.miniScoreBoard.updateScoreBoard();

			if( typeof callback === "function" ){ callback(); }
		};
		
		this.loadMember = function( callback ){
			var _this = this;
			
			_this.settings.globalAjax.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + _this.settings.uri.members.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId),
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function (response, dataObj, xhr) {
					if ( xhr.status === 200 ) {
						var json = JSON.parse(response);
						
						_this.settings.member = json.data;
						
						callback( json.data );
						
					
					} else {

						_this.log("failed to loadMember " + response);
						// if user not found, we can retry later to see if it was inserted. 
						// normally the spin events will automatically insert the user
						if (xhr.status === 404) {
							// retry in 5 secs
							setTimeout(() => {
								_this.init();
							}, 5000);
						}
					}
				}
			});
		};
		
		this.startup = function(){
			var _this = this;

			_this.settings.miniScoreBoard.initLayout(function(){
				_this.settings.miniScoreBoard.settings.active = true;
				_this.activeCompetitionDataRefresh();

				if( _this.settings.enableNotifications ) {
					_this.settings.notifications.init();
				}
			});
		};
		
		this.loadStylesheet = function( callback ){
			var _this = this,
				createdResources = false,
				availableLinks = [];

			objectIterator(query("link"), function(link){
				if( link !== null ){
					availableLinks.push(link.href);
				}
			});

			mapObject(_this.settings.resources, function( resource, key, count ){
				var exists = false;
				mapObject(availableLinks, function( link ){
					if( link === resource ){
						exists = true;
					}

				});

				if( !exists ){
					var link = document.createElement("link");
					link.setAttribute("rel", "stylesheet");
					link.setAttribute("type", "text/css");
					link.setAttribute("href", resource);

					if( count === 0 ){
						link.onload = function(){
							if( typeof callback === "function" ){
								callback();
							}
						};

						link.onerror = function(e){
							if( typeof callback === "function" ){
								callback();
							}
						};
					}

					document.body.appendChild(link);

					createdResources = true;
				}
			});

			if( !createdResources && typeof callback === "function" ) {
				callback();
			}
		};

		this.clickedMiniScoreBoard = function(){
			var _this = this;

			if( !_this.settings.miniScoreBoard.settings.dragging ) {
				_this.deactivateCompetitionsAndLeaderboards(function () {
					_this.settings.leaderboard.leaderboardData = [];
					_this.settings.mainWidget.initLayout(function () {
						_this.activeCompetitionDataRefresh();
					});
					setTimeout(function () {
						_this.settings.miniScoreBoard.settings.container.style.display = "none";
					}, 200);
				});
			}
		};

		/**
		 * Open main widget and open specific tab and loads relevant action
		 * @param tab String
		 * @param actionCallback Function
		 */
		this.openWithTabAndAction = function(tab, actionCallback){
			var _this = this;

			if( _this.settings.mainWidget.settings.active ){
				var loadTab = query(_this.settings.mainWidget.settings.container, tab);
				_this.settings.mainWidget.navigationSwitch(loadTab, function () {
					_this.activeCompetitionDataRefresh();

					if (typeof actionCallback === "function") {
						actionCallback();
					}
				});

				setTimeout(function () {
					_this.settings.miniScoreBoard.settings.container.style.display = "none";
				}, 200);
			} else {
				_this.deactivateCompetitionsAndLeaderboards(function () {
					_this.settings.mainWidget.initLayout(function () {

						_this.settings.mainWidget.navigationSwitch(query(_this.settings.mainWidget.settings.container, tab), function () {
							_this.activeCompetitionDataRefresh();

							if (typeof actionCallback === "function") {
								actionCallback();
							}
						});
					});
					setTimeout(function () {
						_this.settings.miniScoreBoard.settings.container.style.display = "none";
					}, 200);
				});
			}



		};

		var loadCompetitionListAjax = new cLabs.Ajax();
		this.eventHandlers = function( el ){
			var _this = this;

			// mini scoreboard opt-in action
			if( hasClass(el, "cl-widget-ms-optin-action") && !hasClass(el, "checking") ){
				addClass(el, "checking");

				_this.optInMemberToActiveCompetition(function(){

					_this.revalidateIfSuccessfullOptIn(function( competitionJson ){
						_this.settings.competition.activeCompetition = competitionJson.data;

						// _this.getLeaderboardData(1, function( data ){
						// 	_this.settings.miniScoreBoard.loadScoreBoard( data );
						// });


						// extra action to load competition details on mini scoreboard opt-in - Product request
						_this.deactivateCompetitionsAndLeaderboards(function(){
							_this.settings.leaderboard.leaderboardData = [];
							_this.settings.mainWidget.initLayout( function(){
								_this.activeCompetitionDataRefresh();

								_this.settings.mainWidget.loadCompetitionDetails(function(){

								});
							} );
							setTimeout(function(){
								_this.settings.miniScoreBoard.settings.container.style.display = "none";
							}, 200);
						});


						removeClass(el, "checking");
					});
				});

				// Leaderboard details opt-in action
			}else if( hasClass(el, "cl-main-widget-lb-details-optin-action") && !hasClass(el, "checking") ){
				addClass(el, "checking");

				_this.optInMemberToActiveCompetition(function(){

					_this.revalidateIfSuccessfullOptIn(function( competitionJson ){
						_this.settings.competition.activeCompetition = competitionJson.data;
						_this.settings.mainWidget.competitionDetailsOptInButtonState();

						removeClass(el, "checking");
					});
				});

				// Leaderboard details opt-in action
			}else if( hasClass(el, "cl-main-widget-lb-optin-action") && !hasClass(el, "checking") ){
				addClass(el, "checking");

				_this.optInMemberToActiveCompetition(function(){

					_this.revalidateIfSuccessfullOptIn(function( competitionJson ){
						_this.settings.competition.activeCompetition = competitionJson.data;

						_this.settings.mainWidget.loadCompetitionDetails(function(){
						});

						removeClass(el, "checking");
						el.parentNode.style.display = "none";
					});
				});

				// close mini scoreboard info area
			}else if( hasClass(el, "cl-widget-ms-information-close") && !hasClass(el, "checking") ){
				_this.settings.miniScoreBoard.clearAll();

				// close notification window
			}else if( hasClass(el, "cl-widget-notif-information-close") && !hasClass(el, "checking") ){
				_this.settings.notifications.hideNotification();

				// close leaderboard window
			}else if( hasClass(el, "cl-main-widget-lb-header-close") || hasClass(el, "cl-main-widget-ach-header-close") || hasClass(el, "cl-main-widget-reward-header-close") || hasClass(el, "cl-main-widget-inbox-header-close") ){
				_this.settings.mainWidget.hide(function(){
					_this.settings.miniScoreBoard.settings.active = true;
					_this.settings.miniScoreBoard.settings.container.style.display = "block";

					_this.activeCompetitionDataRefresh();

				});

				// load competition details
			}else if( hasClass(el, "cl-main-widget-lb-details-content-label") ){
				if( _this.settings.competition.activeContest !== null ) {
					_this.settings.mainWidget.loadCompetitionDetails(function () {
					});
				}

				// load achievement details
			}else if( hasClass(el, "cl-ach-list-more") ){
				_this.getAchievement(el.dataset.id, function(data){
					_this.settings.mainWidget.loadAchievementDetails(data, function(){
					});
				});

				// leaderboard details back button
			}else if( hasClass(el, "cl-main-widget-lb-details-back-btn") ){
				_this.settings.mainWidget.hideCompetitionDetails();

				// achievements details back button
			}else if( hasClass(el, "cl-main-widget-ach-details-back-btn") ){
				_this.settings.mainWidget.hideAchievementDetails(function(){
				});

				// rewards details back button
			}else if( hasClass(el, "cl-main-widget-reward-details-back-btn") ){
				_this.settings.mainWidget.hideRewardDetails(function(){
				});

				// load rewards details
			}else if( hasClass(el, "cl-rew-list-item") || closest(el, ".cl-rew-list-item") !== null ){
				var rewardId = (hasClass(el, "cl-rew-list-item")) ? el.dataset.rewardId : closest(el, ".cl-rew-list-item").dataset.rewardId;
				_this.getReward(rewardId, function(data){
					_this.settings.mainWidget.loadRewardDetails(data, function(){
					});
				});

				// claim reward
			}else if( hasClass(el, "cl-main-widget-reward-claim-btn") ){
				_this.claimReward(el.dataset.id, function(data){
					if( data.data.claimed ){

						_this.settings.mainWidget.loadRewards();

						addClass(el, "cl-claimed");
						el.innerHTML =  _this.settings.translation.rewards.claimed;
					}else{
						removeClass(el, "cl-claimed");
						el.innerHTML = _this.settings.translation.rewards.claim;
					}
				});

				// load achievement details window from notification window
			}else if( hasClass(el, "cl-widget-notif-information-details-wrapper") || closest(el, ".cl-widget-notif-information-details-wrapper") !== null ){
				_this.openWithTabAndAction(".cl-main-widget-navigation-ach-icon", function(){
					var id = (hasClass(el, "cl-widget-notif-information-details-wrapper")) ? el.dataset.id : closest(el, ".cl-widget-notif-information-details-wrapper").dataset.id;
					_this.settings.notifications.hideNotification();
					_this.settings.mainWidget.hideAchievementDetails(function(){
						_this.getAchievement(id, function(data){
							_this.settings.mainWidget.loadAchievementDetails(data);
						});
					});

				});


				// primary widget navigation
			}else if( hasClass(el, "cl-main-navigation-item") ){
				_this.settings.mainWidget.navigationSwitch( el );

				// competition list
			}else if( hasClass(el, "cl-main-widget-lb-header-list-icon") ){

				if( _this.settings.leaderboard.refreshInterval ){
					clearTimeout(_this.settings.leaderboard.refreshInterval);
				}
				_this.settings.mainWidget.loadCompetitionList(function () {
					_this.activeCompetitionDataRefresh()
				}, loadCompetitionListAjax);

				// load competition
			}else if( hasClass(el, "cl-tour-list-item") || closest(el, ".cl-tour-list-item") !== null ){
				var tournamentId = (hasClass(el, "cl-tour-list-item")) ? el.dataset.id : closest(el, ".cl-tour-list-item").dataset.id,
					preLoader = _this.settings.mainWidget.preloader();

				preLoader.show();
				_this.settings.tournaments.activeCompetitionId = tournamentId;
				_this.activeCompetitionDataRefresh(function(){
					_this.settings.mainWidget.hideCompetitionList(function(){
						preLoader.hide();
					});
				});

				// hide competition list view
			}else if( hasClass(el, "cl-main-widget-tournaments-bacl-btn") ){
				_this.settings.mainWidget.hideCompetitionList();

				// mini scoreboard action to open primary widget
			}else if( (hasClass(el, "cl-widget-ms-icon-wrapper") || closest(el, ".cl-widget-ms-icon-wrapper") !== null) || (hasClass(el, "cl-widget-ms-information-wrapper") || closest(el, ".cl-widget-ms-information-wrapper") !== null) ){
				_this.clickedMiniScoreBoard();

				// accordion navigation
			}else if( hasClass(el, "cl-accordion-label") ){
				_this.settings.mainWidget.accordionNavigation( el );
			}
		};
		
		this.eventListeners = function(){
			var _this = this;
			
			document.body.addEventListener("keyup", function(event){
				switch (event.keyCode) {
					case 27: // on escape
						if( _this.settings.mainWidget.settings.active ) {
							_this.settings.mainWidget.hide(function () {
								_this.settings.miniScoreBoard.settings.active = true;
								_this.settings.miniScoreBoard.settings.container.style.display = "block";

								_this.activeCompetitionDataRefresh();

							});
						}
					break;
				}
			});

			if( _this.isMobile() ) {
				document.body.addEventListener("touchend", function (event) {
					var el = event.target;

					if( !_this.settings.miniScoreBoard.settings.dragging ) {
						_this.eventHandlers(el);
					}
				});
			} else {
				document.body.addEventListener("click", function (event) {
					var el = event.target;

					_this.eventHandlers(el);
				});
			}
		};
		
		this.closeEverything = function(){
			var _this = this;
			
			_this.deactivateCompetitionsAndLeaderboards(function () {
				_this.settings.leaderboard.leaderboardData = [];
				_this.settings.mainWidget.initLayout(function () {
					_this.activeCompetitionDataRefresh();
				});
				setTimeout(function () {
					_this.settings.miniScoreBoard.settings.container.style.display = "none";
				}, 200);
			});
			
			_this.settings.mainWidget.hide();
		};

		this.isMobile = function(){
			return isMobileTablet();
		};
		
		this.init = function(){
			var _this = this;

			_this.loadStylesheet(function(){
				_this.loadMember(function( member ){

					if( _this.settings.miniScoreBoard === null ) {
						_this.settings.notifications = new Notifications();
						_this.settings.miniScoreBoard = new MiniScoreBoard({
							active: true
						});
						_this.settings.mainWidget = new MainWidget();

						_this.settings.notifications.settings.lbWidget = _this;
						_this.settings.miniScoreBoard.settings.lbWidget = _this;
						_this.settings.mainWidget.settings.lbWidget = _this;

						_this.startup();
						_this.eventListeners();
					}else {
						_this.settings.mainWidget.hide(function(){
							_this.deactivateCompetitionsAndLeaderboards(function(){
								_this.settings.miniScoreBoard.settings.active = true;
								_this.settings.miniScoreBoard.settings.container.style.display = "block";
								_this.startup();
							});
						});


					}
				});
			});
		};
		
		if( this.settings.autoStart ){
			this.init();
		}
	};
	
	if( typeof window._CLLBV3Opt === "undefined" ){
		window._CLLBV3Opt = {
			autoStart: false
		};
	}
	if(typeof window._clLeaderBoardV3 === "undefined") {
		window._clLeaderBoardV3 = new LbWidget(window._CLLBV3Opt);
	}else{
		console.warn("window._clLeaderBoardV3 is already defined, widget is configured to run as a single instance");
	}
	
})();
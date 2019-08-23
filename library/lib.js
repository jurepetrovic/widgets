/**
 * CL Library of helper functions and basic compatibility / cross browser support
 * JS v3.0.1 (2019-05-10)
 *
 * This library contains a large variety of useful helper methods that span from querying DOM elements, doing AJAX
 * calls with CORS to basic support of doing string comparison and search.
 *
 * This library also contains cross browser compatibility/support methods that resolve some old issues on older browsers
 * like IE8, IE9 etc.
 * Also some helpful mapping methods like "mapObject" that handle majority of iterations of arrays and basic objects
 * and "objectIterator" that are useful for iterating over single or multiple DOM element lists,
 * global interval handling like "setIntervalGlobal" and "setTimeoutGlobal" that can be used to pause/clear all set/active
 * intervals on the page at any moment (useful to utilise once a user navigates from a page to release some of the Browser
 * resources for continuous processing)
 */
(function(window, document, undefined) {
	'use strict';
	
	/**
	 * * * * * * * * * *
	 * Compatibility - support for non existing console method
	 */
	if (!window.console) {
		window.console = function(){};
		if (typeof XDomainRequest !== "undefined") {
			window.console.prototype.log = function(err){
				throw new SyntaxError(err);
			};
		}
	}
	
	window._stackTrace = function() {
		var err = new Error();
		return err.stack;
	};
	
	// union of Chrome, FF, IE, and Safari console methods
	var m = [
		"log", "info", "warn", "error", "debug", "trace", "dir", "group",
		"groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
		"dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
	];
	// define undefined methods as noops to prevent errors
	for (var i = 0; i < m.length; i++) {
		if ( !window.console[m[i]] ) {
			window.console[m[i]] = function() {};
		}
	}
	
	/**
	 * * * * * * * * * *
	 * Compatability - work around the addEventListener, removeEventListener,
	 * Event.preventDefault and Event.stopPropagation not being supported by IE 8
	 * The code supports the use of handleEvent and also the DOMContentLoaded event
	 * * * * * * * * * *
	 * @source https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener#Older_way_to_register_event_listeners
	 */
	try{
		if (!Event.prototype.preventDefault) {
			Event.prototype.preventDefault=function() {
				this.returnValue=false;
			};
		}
	}catch(err){ console.log(err) }
	
	try{
		if (!Event.prototype.stopPropagation) {
			Event.prototype.stopPropagation=function() {
				this.cancelBubble=true;
			};
		}
	}catch(err){ console.log(err) }
	
	try{
		if (typeof mapObject !== 'function') {
			window.mapObject = function(obj, callback){
				if(obj !== null) {
					var count = 0;
					for (var key in obj) {
						if (obj.hasOwnProperty(key)) {
							var ret = callback(obj[key], key, count);
							if(typeof ret !== "undefined") obj[key] = ret;
							
							count++;
						}
					}
				}else{
					console.log("returned object is null", typeof obj);
				}
				
				return obj;
			};
		}
	}catch(err){ console.log(err) }
	
	try{
		if (typeof objectIterator !== 'function') {
			window.objectIterator = function( obj, callback ) {
				if( typeof obj !== "undefined" && obj !== null && typeof obj.length !== "undefined" && obj instanceof Array ){
					var count = 0;
					for(var key in obj){
						callback(obj[key], key, count, obj.length);
						
						count++;
					}
				}else if( typeof obj !== "undefined" && obj !== null ){
					callback(obj, 0, 0, 1)
				}
			};
		}
	}catch(err){ console.log(err) }
	
	try{
		if (typeof setIntervalGlobal !== 'function') {
			window._intervalGlobalRepository = [];
			window.setIntervalGlobal = function(func, timer){
				var interval = setInterval(func, timer);
				
				window._intervalGlobalRepository.push({
					func: func,
					timer: timer,
					interval: interval
				});
				
				return interval;
			};
			
			var closeIntervals = function(){
				if( window._intervalGlobalRepository.length > 0 ){
					mapObject(window._intervalGlobalRepository, function(instance, key, count){
						if( instance.interval ){
							clearInterval(instance.interval);
							instance.interval = null;
						}
					});
				}
			};
			
			var reEnableIntervals = function(){
				if( window._intervalGlobalRepository.length > 0 ){
					mapObject(window._intervalGlobalRepository, function(instance, key, count){
						instance.interval = setInterval(instance.func, instance.timer);
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
							reEnableIntervals();
						}else if( status === "hidden" ){
							closeIntervals();
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
	
	try{
		if (typeof setDataSet !== 'function') {
			window.setDataSet = function(obj, key, value){
				try{
					obj.dataset[key] = value;
				}catch(e){
					obj.setAttribute(('data-' + key), value);
				}
			}
		}
		if (typeof getDataSet !== 'function') {
			window.getDataSet = function(obj, key){
				try{
					if( typeof key === "undefined" ) {
						return obj.dataset;
					}else{
						return obj.dataset[key];
					}
				}catch(e){
					if( typeof key === "undefined" ){
						var newObject = {};
						for(var keyT in obj.attributes){
							if(obj.attributes.hasOwnProperty(keyT)){
								if(obj.attributes[keyT].name.indexOf("data-") > -1){
									newObject[obj.attributes[keyT].name.replace("data-", "")] = obj.attributes[keyT].value;
								}
							}
						}
						return newObject;
					}else {
						try {
							return obj.getAttribute('data-' + key);
						}catch(e2){
							console.error(obj, key);
							console.error(e2);
						}
					}
				}
			}
		}
	}catch(err){ console.log(err) }
	
	try{
		if (typeof elementId !== 'function') {
			window.elementId = function(obj){
				if(obj !== null && typeof obj === "object"){
					if(conmisio.isElement){
						var el = obj, arr = [];
						for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++){
							arr.push({
								key: atts[i].nodeName,
								value: atts[i].nodeValue
							});
						}
						
						if(obj.elementId === undefined){
							obj.elementId = obj.nodeName + JSON.stringify(arr)
						}
						
						return obj.elementId;
					}else{
						return JSON.stringify(obj);
					}
				}else{
					return "";
				}
			}
		}
	}catch(err){ console.log(err) }
	
	try{
		if (typeof validateObj !== 'function') {
			window.validateObj = function(obj){
				return (typeof obj !== "undefined" && obj !== null)
			}
		}
	}catch(err){ console.log(err) }
	
	try{
		if (!Object.is) {
			Object.is = function(x, y) {
				// SameValue algorithm
				if (x === y) { // Steps 1-5, 7-10
					// Steps 6.b-6.e: +0 != -0
					return x !== 0 || 1 / x === 1 / y;
				} else {
					// Step 6.a: NaN == NaN
					return x !== x && y !== y;
				}
			};
		}
	}catch(err){ console.log(err) }
	
	try{
		
		if (!Element.prototype.addEventListener) {
			var eventListeners = [];
			
			var addEventListener = function (type, listener /*, useCapture (will be ignored) */) {
				var self = this;
				var wrapper;
				wrapper = function(e) {
					e.target = e.srcElement;
					e.currentTarget = self;
					e.pageX = event.clientX + document.body.scrollLeft;
					e.pageY = event.clientY + document.body.scrollTop;
					
					if (listener.handleEvent) {
						listener.handleEvent(e);
					} else {
						listener.call(self, e);
					}
				};
				if (type === "DOMContentLoaded") {
					var wrapper2 = function (e) {
						if (document.readyState === "complete") {
							wrapper(e);
						}
					};
					document.attachEvent("onreadystatechange", wrapper2);
					eventListeners.push({object:this, type:type, listener:listener, wrapper:wrapper2});
					
					if (document.readyState=="complete") {
						var e=new Event();
						e.srcElement=window;
						wrapper2(e);
					}
				} else {
					this.attachEvent("on"+type,wrapper);
					eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
				}
			};
			var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
				var counter=0;
				while (counter<eventListeners.length) {
					var eventListener=eventListeners[counter];
					if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
						if (type=="DOMContentLoaded") {
							this.detachEvent("onreadystatechange",eventListener.wrapper);
						} else {
							this.detachEvent("on"+type,eventListener.wrapper);
						}
						break;
					}
					++counter;
				}
			};
			Element.prototype.addEventListener=addEventListener;
			Element.prototype.removeEventListener=removeEventListener;
			if (HTMLDocument) {
				HTMLDocument.prototype.addEventListener=addEventListener;
				HTMLDocument.prototype.removeEventListener=removeEventListener;
			}
			if (Window) {
				Window.prototype.addEventListener=addEventListener;
				Window.prototype.removeEventListener=removeEventListener;
			}
		}
		
		if ( !Element.prototype.remove ) {
			Element.prototype.remove = function() {
				this.parentElement.removeChild(this);
			};
			NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
				for(var i = 0, len = this.length; i < len; i++) {
					if(this[i] && this[i].parentElement) {
						this[i].parentElement.removeChild(this[i]);
					}
				}
				/*while(this.children.length) {
				 this.removeChild(this.children[0]);
				 }*/
			}
		}
	}catch(err){ console.log(err) }
	
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
	/**
	 * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
	 * on host objects like NamedNodeMap, NodeList, and HTMLCollection
	 * (technically, since host objects have been implementation-dependent,
	 * at least before ES6, IE hasn't needed to work this way).
	 * Also works on strings, fixes IE < 9 to allow an explicit undefined
	 * for the 2nd argument (as in Firefox), and prevents errors when
	 * called on other DOM objects.
	 */
	(function () {
		'use strict';
		var _slice = Array.prototype.slice;
		
		try {
			// Can't be used with DOM elements in IE < 9
			_slice.call(document.documentElement);
		} catch (e) { // Fails in IE < 9
			// This will work for genuine arrays, array-like objects,
			// NamedNodeMap (attributes, entities, notations),
			// NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
			// and will not fail on other DOM objects (as do DOM elements in IE < 9)
			Array.prototype.slice = function(begin, end) {
				// IE < 9 gets unhappy with an undefined end argument
				end = (typeof end !== 'undefined') ? end : this.length;
				
				// For native Array objects, we use the native slice function
				if (Object.prototype.toString.call(this) === '[object Array]'){
					return _slice.call(this, begin, end);
				}
				
				// For array like object we handle it ourselves.
				var i, cloned = [],
					size, len = this.length;
				
				// Handle negative value for "begin"
				var start = begin || 0;
				start = (start >= 0) ? start: len + start;
				
				// Handle negative value for "end"
				var upTo = (end) ? end : len;
				if (end < 0) {
					upTo = len + end;
				}
				
				// Actual expected size of the slice
				size = upTo - start;
				
				if (size > 0) {
					cloned = new Array(size);
					if (this.charAt) {
						for (i = 0; i < size; i++) {
							cloned[i] = this.charAt(start + i);
						}
					} else {
						for (i = 0; i < size; i++) {
							cloned[i] = this[start + i];
						}
					}
				}
				
				return cloned;
			};
		}
	}());
	
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
	// Production steps of ECMA-262, Edition 5, 15.4.4.14
	// Reference: http://es5.github.io/#x15.4.4.14
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(searchElement, fromIndex) {
			
			var k;
			
			// 1. Let O be the result of calling ToObject passing
			//    the this value as the argument.
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}
			
			var O = Object(this);
			
			// 2. Let lenValue be the result of calling the Get
			//    internal method of O with the argument "length".
			// 3. Let len be ToUint32(lenValue).
			var len = O.length >>> 0;
			
			// 4. If len is 0, return -1.
			if (len === 0) {
				return -1;
			}
			
			// 5. If argument fromIndex was passed let n be
			//    ToInteger(fromIndex); else let n be 0.
			var n = +fromIndex || 0;
			
			if (Math.abs(n) === Infinity) {
				n = 0;
			}
			
			// 6. If n >= len, return -1.
			if (n >= len) {
				return -1;
			}
			
			// 7. If n >= 0, then Let k be n.
			// 8. Else, n<0, Let k be len - abs(n).
			//    If k is less than 0, then let k be 0.
			k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
			
			// 9. Repeat, while k < len
			while (k < len) {
				// a. Let Pk be ToString(k).
				//   This is implicit for LHS operands of the in operator
				// b. Let kPresent be the result of calling the
				//    HasProperty internal method of O with argument Pk.
				//   This step can be combined with c
				// c. If kPresent is true, then
				//    i.  Let elementK be the result of calling the Get
				//        internal method of O with the argument ToString(k).
				//   ii.  Let same be the result of applying the
				//        Strict Equality Comparison Algorithm to
				//        searchElement and elementK.
				//  iii.  If same is true, return k.
				if (k in O && O[k] === searchElement) {
					return k;
				}
				k++;
			}
			return -1;
		};
	}
	
	/**** JSON support ****/
	if (typeof XDomainRequest !== "undefined") {
		if (typeof window.JSON !== "object") {
			window.JSON = {}
		}
		(function () {
			"use strict";
			function f(e) {
				return e < 10 ? "0" + e : e
			}
			
			function quote(e) {
				escapable.lastIndex = 0;
				return escapable.test(e) ? '"' + e.replace(escapable, function (e) {
					var t = meta[e];
					return typeof t === "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
				}) + '"' : '"' + e + '"'
			}
			
			function str(e, t) {
				var n, r, i, s, o = gap, u, a = t[e];
				if (a && typeof a === "object" && typeof a.toJSON === "function") {
					a = a.toJSON(e)
				}
				if (typeof rep === "function") {
					a = rep.call(t, e, a)
				}
				switch (typeof a) {
					case"string":
						return quote(a);
					case"number":
						return isFinite(a) ? String(a) : "null";
					case"boolean":
					case"null":
						return String(a);
					case"object":
						if (!a) {
							return"null"
						}
						gap += indent;
						u = [];
						if (Object.prototype.toString.apply(a) === "[object Array]") {
							s = a.length;
							for (n = 0; n < s; n += 1) {
								u[n] = str(n, a) || "null"
							}
							i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]";
							gap = o;
							return i
						}
						if (rep && typeof rep === "object") {
							s = rep.length;
							for (n = 0; n < s; n += 1) {
								if (typeof rep[n] === "string") {
									r = rep[n];
									i = str(r, a);
									if (i) {
										u.push(quote(r) + (gap ? ": " : ":") + i)
									}
								}
							}
						} else {
							for (r in a) {
								if (Object.prototype.hasOwnProperty.call(a, r)) {
									i = str(r, a);
									if (i) {
										u.push(quote(r) + (gap ? ": " : ":") + i)
									}
								}
							}
						}
						i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}";
						gap = o;
						return i
				}
			}
			
			if (typeof Date.prototype.toJSON !== "function") {
				Date.prototype.toJSON = function () {
					return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
				};
				String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
					return this.valueOf()
				}
			}
			var cx, escapable, gap, indent, meta, rep;
			if (typeof window.JSON.stringify !== "function") {
				escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
				meta = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
				window.JSON.stringify = function (e, t, n) {
					var r;
					gap = "";
					indent = "";
					if (typeof n === "number") {
						for (r = 0; r < n; r += 1) {
							indent += " "
						}
					} else if (typeof n === "string") {
						indent = n
					}
					rep = t;
					if (t && typeof t !== "function" && (typeof t !== "object" || typeof t.length !== "number")) {
						throw new Error("JSON.stringify")
					}
					return str("", {"": e})
				}
			}
			if (typeof window.JSON.parse !== "function") {
				cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
				window.JSON.parse = function (text, reviver) {
					function walk(e, t) {
						var n, r, i = e[t];
						if (i && typeof i === "object") {
							for (n in i) {
								if (Object.prototype.hasOwnProperty.call(i, n)) {
									r = walk(i, n);
									if (r !== undefined) {
										i[n] = r
									} else {
										delete i[n]
									}
								}
							}
						}
						return reviver.call(e, t, i)
					}
					
					var j;
					text = String(text);
					cx.lastIndex = 0;
					if (cx.test(text)) {
						text = text.replace(cx, function (e) {
							return"\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
						})
					}
					if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
						j = eval("(" + text + ")");
						return typeof reviver === "function" ? walk({"": j}, "") : j
					}
					throw new SyntaxError("JSON.parse")
				}
			}
		})();
	}
	
})(window, document);
/**** Compatability END ****/



/**
 * Collection of useful libraries
 */
(function () {
	'use strict';
	
	var
		// today = new Date(),
		// dd = today.getDate(),
		// mm = today.getMonth()+1, //January is 0!
		// yyyy = today.getFullYear(),
		dayArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		monthsShortArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	// if( dd < 10 ) { dd = '0' + dd }
	// if( mm < 10 ) { mm = '0' + mm }
	
	
	Date.prototype.days = dayArray;
	Date.prototype.months = monthsArray;
	Date.prototype.shortMonths = monthsShortArray;
	Date.prototype.getDayString = function () { return this.days[this.getDay()]; };
	Date.prototype.getUTCDayString = function () { return this.days[this.getUTCDay()]; };
	Date.prototype.getMonthString = function () { return this.months[this.getMonth()]; };
	Date.prototype.getUTCMonthString = function () { return this.months[this.getUTCMonth()]; };
	Date.prototype.getMonthShortString = function () { return this.shortMonths[this.getMonth()]; };
	Date.prototype.getUTCMonthShortString = function () { return this.shortMonths[this.getUTCMonth()]; };
	
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
	
	
	var conmisio = {
		settings: {}, // Gobal configuration variables
		xmlns: "http://www.w3.org/2000/svg", // namespaceURI
		xhr: null,
		easing: 'easeInOutQuart', // default animation type
		feedExtraLoading: false, // feed extra results are loading (true/false)
		classSelector: /^\.([\w-]+)$/, // class string expression check
		idSelector: /^#[\w\d\-\_\&\!\@\*]+$/, // ID string expression check
		tagSelector: /^[\w-]+$/, // TAG string expression check
		dayArray: dayArray,
		monthsArray: monthsArray,
		monthsShortArray: monthsShortArray
	};
	
	conmisio.nodeTypes = function(nodeType){
		var nodeTypeObj = {};
		
		nodeTypeObj[1] = "Element";
		nodeTypeObj[2] = "Attr";
		nodeTypeObj[3] = "Text";
		nodeTypeObj[4] = "CDATASection";
		nodeTypeObj[5] = "EntityReference";
		nodeTypeObj[6] = "Entity";
		nodeTypeObj[7] = "ProcessingInstruction";
		nodeTypeObj[8] = "Comment";
		nodeTypeObj[9] = "Document";
		nodeTypeObj[10] = "DocumentType";
		nodeTypeObj[11] = "DocumentFragment";
		nodeTypeObj[12] = "Notation";
		
		if(parseInt(nodeType) > 0){
			return nodeTypeObj[nodeType];
		}else{
			return null;
		}
	};
	
	conmisio.assert = function( check, message ){
		if( check ){
			console.error(message);
			throw message;
		}
	};
	
	//check if string is a number
	conmisio.isNumber = function(s){
		return !isNaN(s);
	};
	
	//check if string is Int
	conmisio.isInt = function(s){
		var n = (s.match(/\d+/g) !== null) ? Number(s) : NaN;
		return Number(n) === n && n % 1 === 0;
	};
	
	//check if string is Float
	conmisio.isFloat = function(s){
		var n = Number(s);
		return n === Number(n) && n % 1 !== 0;
	};
	
	/**
	 * Number format change - adds commas on thousands
	 * @param number {String}
	 * @returns {string}
	 */
	conmisio.numberCommaStyling = function( number ){
		var finalResult = (typeof number === "string") ? number : String(number);
		
		try {
			var x = finalResult.split('.'),
				x1 = x[0],
				x2 = x.length > 1 ? '.' + x[1] : '',
				rgx = /(\d+)(\d{3})/;
			
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			
			finalResult = x1 + x2;
		}catch(e){ console.error(finalResult, e); }
		
		return finalResult;
	};
	
	/**
	 * Large number format change - restricts the number to a specific precision based on Billions, Milions or Thousands
	 * @param number {Number}
	 * @param precision {Number}
	 * @returns {string}
	 */
	conmisio.largeNumberFormat = function( number, precision, type ){
		var pre = (typeof precision === "undefined") ? 2 : precision;
		var t = (typeof type === "undefined") ? true : type;
		return Math.abs(Number(number)) >= 1.0e+9
			
			? (Math.abs(Number(number)) / 1.0e+9).toFixed(pre) + (t ? "B" : "")
			// Six Zeroes for Millions
			: Math.abs(Number(number)) >= 1.0e+6
				
				? (Math.abs(Number(number)) / 1.0e+6).toFixed(pre) + (t ? "M" : "")
				// Three Zeroes for Thousands
				: Math.abs(Number(number)) >= 1.0e+3
					
					? (Math.abs(Number(number)) / 1.0e+3).toFixed(pre) + (t ? "K" : "")
					
					: Math.abs(Number(number));
	};
	
	//Format number with leading zeros
	conmisio.formatNumberLeadingZeros = function(num, size){
		var s = String(num);
		while (s.length < size) s = "0" + s;
		return s;
	};
	
	conmisio.toFixed = function(num, place){
		var str = String(num);
		var sp = str.split(".");
		var finalOutput = sp[0];
		
		if( place > 0 && sp.length > 1 && sp[1].length > 0 ){
			finalOutput = finalOutput + "." + sp[1].substring(0, place);
		}
		return Number(finalOutput);
	};
	
	/**
	 * The rules are as follows:
	 * - st is used with numbers ending in 1 (e.g. 1st, pronounced first)
	 * - nd is used with numbers ending in 2 (e.g. 92nd, pronounced ninety-second)
	 * - rd is used with numbers ending in 3 (e.g. 33rd, pronounced thirty-third)
	 * - As an exception to the above rules, all the "teen" numbers ending with 11, 12 or 13 use -th (e.g. 11th, pronounced eleventh, 112th, pronounced one hundred [and] twelfth)
	 * - th is used for all other numbers (e.g. 9th, pronounced ninth).
	 * @param i {numeric}
	 * @returns {string}
	 */
	conmisio.numberOrdinalSuffix = function(i){
		var j = i % 10,
			k = i % 100,
			str = "";
		if (j === 1 && k !== 11) {
			str = i + "st";
		}else if (j === 2 && k !== 12) {
			str = i + "nd";
		}else if (j === 3 && k !== 13) {
			str = i + "rd";
		}else {
			str = i + "th";
		}
		
		return str;
	};
	
	//check if string is Boolean
	conmisio.isBoolean = function(n){
		if(conmisio.trim(n.toLowerCase()) === "true"){
			return true;
		}else return conmisio.trim(n.toLowerCase()) === "false";
	};
	
	conmisio.setCookie = function(c_name, value, expiry){
		var exdate = new Date();
		exdate.setMinutes( (exdate.getMinutes()+expiry) );
		document.cookie = c_name + "=" + encodeURI(value) + ((expiry==null) ? "" : ";expires="+exdate.toUTCString());
		
		return conmisio.getCookie(c_name);
	};
	
	conmisio.removeCookie = function(c_name){
		document.cookie = c_name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};
	
	conmisio.getCookie = function(c_name){
		var cookie = '';
		if (document.cookie.length>0){
			var c_start = document.cookie.indexOf(c_name + "=");
			if ( c_start != -1 ) {
				c_start = c_start + c_name.length + 1;
				var c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				cookie = decodeURI(document.cookie.substring(c_start, c_end));
			}
		}
		
		return cookie;
	};
	
	conmisio.hashNavigation = function(){
		var hash = window.location.hash,
			searchString = window.location.search,
			finalSearchString = (hash.length > 0) ? hash.replace("#", "") : searchString.replace("?", "").replace("%26", "&"),
			hashTerms = finalSearchString.split("&"),
			map = {};
		
		mapObject(hashTerms, function (value, key) {
			if( value.length > 0 ) {
				var keyValuePair = value.split("=");
				
				map[keyValuePair[0]] = (keyValuePair[1].length > 0) ? keyValuePair[1] : undefined;
			}
		});
		
		return {
			hashString: finalSearchString,
			map: map
		};
	};
	
	/**
	 * Add new element before (by default will be inserted as a first element in the list)
	 * @param container
	 * @param newElement
	 * @param elementBefore (element that will be used as a pointer to insert before)
	 */
	conmisio.insertBefore = function( container, newElement, elementBefore ){
		var el = ( typeof elementBefore === "undefined" ) ? container.childNodes[0] : elementBefore;
		return container.insertBefore(newElement, (container.hasChildNodes()) ? el : null);
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
	conmisio.query = function( doc, selector ) {
		var result;
		
		var tmpDoc = doc, tmpSelector = selector; // used for debug only
		
		if (typeof doc === 'string' && selector === undefined) {
			selector = doc;
			doc = document;
		}
		
		try {
			
			if(doc !== null) {
				selector = conmisio.trim(selector); //
				if (selector.match(conmisio.classSelector)) {
					result = doc.getElementsByClassName(selector.replace(".", ""));
				} else if (selector.match(conmisio.idSelector)) {
					result = document.getElementById(selector.replace("#", ""));
				} else if (selector.match(conmisio.tagSelector)) {
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
			
			console.trace();
			//console.warn(_stackTrace());
		}
		
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
	 * @returns {(Array)} array of matched elements, can be empty
	 */
	conmisio.queryAll = function( doc, selector ) {
		var result;
		
		if( typeof doc === 'string' && selector === undefined ) {
			selector = doc;
			doc = document;
		}
		
		selector = conmisio.trim(selector); //
		if ( selector.match(conmisio.classSelector) ) {
			result = doc.getElementsByClassName( selector.replace(".", "") );
		} else if( selector.match(conmisio.idSelector) ) {
			result = [document.getElementById( selector.replace("#", "") )];
		} else if( selector.match(conmisio.tagSelector) ) {
			result = doc.getElementsByTagName( selector );
		} else {
			result = doc.querySelectorAll( selector );
		}
		return Array.prototype.slice.call(result);
	};
	
	conmisio.bodyEventListener = function (events) {
		if ( typeof window.bodyListeners === "undefined" ) {
			window.bodyListeners = [];
			window.bodyListeners.push(events);
			
			conmisio.query('body').addEventListener('click', function (event) {
				for (var i = 0; i < window.bodyListeners.length; i++) {
					window.bodyListeners[i](event);
				}
			});
		} else {
			window.bodyListeners.push(events)
		}
	};
	
	/**
	 * Returns a count of object from a query result
	 * @param {Object} anything or Array object
	 */
	conmisio.objectCount = function( obj ) {
		if(obj !== null && obj.length !== undefined && obj instanceof Array){
			return obj.length;
		}else if(obj !== null){
			return 1;
		}else{
			return 0;
		}
	};
	
	/**
	 * Return an Object sorted by it's Key
	 */
	conmisio.sortObjectByKey = function(obj){
		var keys = [];
		var sorted_obj = {};
		
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				keys.push(key);
			}
		}
		
		// sort keys
		keys.sort();
		
		// create new array based on Sorted Keys
		for(var k in keys){
			sorted_obj[keys[k]] = obj[keys[k]];
		}
		
		return sorted_obj;
	};
	
	/**
	 * The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
	 * tags: random
	 *
	 * @method shuffle
	 * @param {Array} array object
	 * @return {Array}
	 */
	conmisio.shuffle = function(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		
		return array;
	};
	
	/* IE8 version */
	if (!document.getElementsByClassName) {
		conmisio.query = function( doc, selector ) {
			var result;
			
			if (typeof doc === 'string' && selector === undefined) {
				selector = doc;
				doc = document;
			}
			
			selector = conmisio.trim(selector); //
			if (selector.match(conmisio.idSelector)) {
				result = document.getElementById(selector.replace("#", ""));
			} else if (selector.match(conmisio.tagSelector)) {
				result = doc.getElementsByTagName(selector);
			} else {
				result = doc.querySelectorAll(selector);
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
		};
		conmisio.queryAll = function( doc, selector ) {
			var result;
			
			if( typeof doc === 'string' && selector === undefined ) {
				selector = doc;
				doc = document;
			}
			
			selector = conmisio.trim(selector); //
			if ( selector.match(conmisio.idSelector) ) {
				result = [document.getElementById( selector.replace("#", "") )];
			} else if( selector.match(conmisio.tagSelector) ) {
				result = doc.getElementsByTagName( selector );
			} else {
				result = doc.querySelectorAll( selector );
			}
			return Array.prototype.slice.call(result);
		};
	}
	
	/**
	 * Ajax method
	 *
	 * @class Ajax
	 * @constructor
	 */
	conmisio.Ajax = function() {
		this.xhr = new XMLHttpRequest();
	};
	
	conmisio.Ajax.prototype.createCORSRequest = function(method, url) {
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
	
	conmisio.Ajax.prototype.abort = function() {
		if( this.xhr && this.xhr.readyState != undefined && this.xhr.readyState != 4 ){
			this.xhr.abort();
		}
		
		return this;
	};
	
	/**
	 * Retrieves data from a URL without page refresh
	 *
	 * @method getData
	 * @param {Object} configuration object
	 *  - object contains: HTTP method "type: POST, GET", url: to send the request to, data: {object}
	 * @return {String} in success object
	 */
	conmisio.Ajax.prototype.getData = function ( data ) {
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
				}else if ( (data.type === 'POST' || data.type === 'PUT' || data.type === 'DELETE') && sizeof(data.headers) === 0 ) {
					obj.xhr.setRequestHeader("Content-Type", "application/json");
				} else {
					obj.xhr.setRequestHeader("Content-Type", "text/plain");
				}
			}
			
			obj.xhr.send( JSON.stringify(data.data) );
			
			return obj.xhr;
		}catch(err){console.log(err);}
	};
	
	var ajaxGroupList = [];
	conmisio.AjaxGroup = function(data, callback) {
		
		var isSet = false;
		for(var i in ajaxGroupList){
			if(ajaxGroupList[i].url === data.url && ajaxGroupList[i].type === data.type){
				isSet = true;
			}
		}
		
		if(!isSet) {
			var ajax = new conmisio.Ajax();
			
			ajaxGroupList.push({callback: callback, url: data.url, type: data.type, xhr: ajax});
			
			data.extraCallback = function(dataObj){
				var index, callbackData;
				for(var a in ajaxGroupList){
					if(ajaxGroupList[a].url === dataObj.url && ajaxGroupList[a].type === dataObj.type){
						index = ajaxGroupList.indexOf(ajaxGroupList[a]);
						callbackData = ajaxGroupList[a].callback
					}
				}
				
				if(index !== null && index !== undefined && index > -1) {
					ajaxGroupList.splice(index, 1);
					if (callbackData !== undefined && typeof callbackData === "function" && ajaxGroupList.length === 0) {
						callbackData();
					}
					
				}
			};
			
			ajax.getData(data);
		}
	};
	
	// simple object merge
	// [recursive]
	conmisio.mergeObjects = function(obj1, obj2, arrayType){
		var obj3 = (typeof arrayType === 'undefined' || arrayType === false) ? {} : [];
		
		for(var i in obj1){ obj3[i] = obj1[i]; }
		
		for(var k in obj2){
			
			if(typeof obj1[k] !== "object"){
				obj3[k] = obj2[k];
			}else if(obj1[k] instanceof Array){
				obj3[k] = obj2[k]; // arrays get overwritten and not extended
			}else if(typeof obj1[k] !== "undefined" && typeof obj1[k] === "object" && obj1[k] !== null && typeof obj1[k].nodeType === "undefined" && conmisio.sizeof(obj1[k]) > 0){
				obj3[k] = conmisio.mergeObjects(obj1[k], obj2[k]);
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
	 * Removes provided element
	 */
	conmisio.remove = function(el){
		el.parentElement.removeChild(el);
	};
	
	conmisio.checkCssStyles = function( element, style ){
		if(typeof window.getComputedStyle !== 'undefined'){
			var prop = window.getComputedStyle(element,null);
			if(prop){
				return prop.getPropertyValue(style);
			}
		}else{
			return null;
		}
	};
	
	/**
	 * Browser detection
	 * @return {Object} returns object { browser: "Firefox", version: "29.0" }
	 */
	conmisio.browserCheck = function(){
		return (function(){
			var ua= navigator.userAgent, tem,
				M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
			if(/trident/i.test(M[1])){
				tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
				return {browser: 'IE', version: (tem[1] || '')};
			}
			M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
			if((tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
			return {browser: M[0], version: M[1]};
		})();
	};
	
	conmisio.mobileCheck = function(){
		return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));
	};
	
	/**
	 * Executes an event
	 *
	 * @param {Object} DOM object
	 * @param {String} event string (Example: click)
	 * @return {String}
	 */
	conmisio.eventFire = function(el, etype){
		if (el.fireEvent) {
			el.fireEvent('on' + etype);
		} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent(etype, true, false);
			el.dispatchEvent(evObj);
		}
	};
	
	conmisio.getUrlParametersByKey = function(name, url) {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};
	
	/**
	 * Append Element after present
	 *
	 * @param {Object} el object
	 * @param {Object} child object
	 */
	conmisio.appendNext = function(el, child){
		if (el.nextSibling) {
			el.parentNode.insertBefore(child, el.nextSibling);
		}
		else {
			el.parentNode.appendChild(child);
		}
	};
	
	conmisio.stringToDate = function( str ){
		if( typeof str === "string" ){
			return new Date( str );
		}else{
			throw "incorrect type provided [" + typeof str + "]";
		}
	};
	
	conmisio.stringToDateMoment = function( str, format ){
		if( typeof str === "string" && typeof moment !== "undefined" ){
			var date = moment(str).utc();
			
			if( typeof format === 'string' ){
				return date.format(format);
			}else{
				return date.toString();
			}
		}else{
			console.trace();
			throw "incorrect type provided [" + typeof str + "]";
		}
	};
	
	conmisio.dateToDateMoment = function( date, format ){
		if( date instanceof Date && typeof moment !== "undefined" ){
			var date = moment(date).utc();
			
			if( typeof format === 'string' ){
				return date.format(format);
			}else{
				return date.toString();
			}
		}else{
			console.trace();
			throw "incorrect type provided [" + typeof date + "]";
		}
	};
	
	/**
	 * Convert a JavaScript Date to UTC Date object
	 * @param dateString
	 * @returns {Date}
	 */
	conmisio.dateToUTC = function( dateString ){
		var date = (typeof dateString === "string") ? new Date(dateString) : new Date(),
			now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
				date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
		
		return new Date(now_utc);
	};
	
	conmisio.stringToDateMomentObj = function( str ){
		if( typeof str === "string" && typeof moment !== "undefined" ){
			return moment(str).parseZone(str).utc();
		}if( str instanceof Date && typeof moment !== "undefined" ){
			return moment(str).parseZone(str).utc();
		}else{
			throw "incorrect type provided [" + typeof str + "] supports [String, JS Date Obj]";
		}
	};
	
	
	/**
	 * Get current quarter
	 *
	 * @param {Date} Date object
	 * @return {Date}
	 */
	conmisio.quarter = function(date){
		var dd = date.getDate(),
			mm = date.getMonth()+ 1, //January is 0!
			yyyy = date.getFullYear(),
			qDate;
		
		if( mm <= 3 ){ // Q1
			qDate = new Date(yyyy, 0, 1, 0, 0, 0, 0);
		}else if( mm >= 4 && mm <= 6 ){ // Q2
			qDate = new Date(yyyy, 3, 1, 0, 0, 0, 0);
		}else if( mm >= 7 && mm <= 9 ){ // Q3
			qDate = new Date(yyyy, 6, 1, 0, 0, 0, 0);
		}else{ // Q4
			qDate = new Date(yyyy, 9, 1, 0, 0, 0, 0);
		}
		
		return qDate;
	};
	
	/**
	 * Get current quarter String
	 *
	 * @param date {Date} object
	 * @return {String}
	 */
	conmisio.quarterString = function(date){
		var mm = date.getMonth()+ 1, //January is 0!
			qString = '';
		
		if( mm <= 3 ){ // Q1
			qString = 'Q1';
		}else if( mm >= 4 && mm <= 6 ){ // Q2
			qString = 'Q2';
		}else if( mm >= 7 && mm <= 9 ){ // Q3
			qString = 'Q3';
		}else{ // Q4
			qString = 'Q4';
		}
		
		return qString;
	};
	
	/**
	 * Get next quarter
	 *
	 * @param {Date} Date object
	 * @return {Date}
	 */
	conmisio.nextQuarter = function(date){
		var quarter = conmisio.quarter(date);
		quarter.setMonth(quarter.getMonth() + 3);
		return quarter;
	};
	
	conmisio.classAttributes = function( classString, className ) {
		var data = [],
			regex = new RegExp(className+"\\[(.*?)\\]"),
			matches = [];
		
		if( typeof classString == 'string' ){
			matches = classString.match(regex);
		}else if( typeof classString == 'object' ){
			// if object use the default attribute class
			matches = classString.getAttribute( 'class' ).match(regex);
		}
		
		if ( matches ) {
			//matches[1] refers to options inside [] "required, email, ..."
			var spec = matches[1].split(/,\s*/);
			
			if ( spec.length > 0 ) {
				data = spec;
			}
		}
		
		return data;
	};
	
	/**
	 * Get previous quarter
	 *
	 * @param {Date} date object
	 * @return {Date}
	 */
	conmisio.prevQuarter = function(date){
		var quarter = conmisio.quarter(date);
		quarter.setMonth(quarter.getMonth() - 3);
		return quarter;
	};
	
	/**
	 * Cleans white spaces from front and back of the string
	 *
	 * @param {String} string
	 * @return {String}
	 */
	conmisio.trim = function( string ){
		return string.replace(/^\s+|\s+$/g, '');
	};
	
	/**
	 * Replaces multiple spaces with a single space
	 *
	 * @param {String}
	 * @return {String}
	 */
	conmisio.cleanSpaces = function( string ){
		return string.replace(/\s{2,}/g, ' ');
	};
	
	/**
	 * Strips out HTML characters
	 *
	 * @param {String} HTML string
	 * @return {String}
	 */
	conmisio.stripHTML = function(html){
		var doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.body.textContent || "";
	};
	
	/**
	 * returns the size of an Object or array
	 *
	 * @param {Object}
	 * @return {Number}
	 */
	function sizeof(obj) {
		//!Object.keys(item.location).length // IE9+
		
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		
		if(size === 0 && conmisio.isElement(obj)){
			size = 1;
		}
		
		return size;
	}
	
	// sizeof alias
	//TODO: remove alias and update global usage
	conmisio.sizeof = function(obj){
		return sizeof(obj);
	};
	
	/**
	 * Returns true/false if string starts with the provided partial
	 *
	 * @param {String} str
	 * @param {String} partial
	 * @return {Boolean}
	 */
	conmisio.stringStartsWith = function (str, partial){
		return conmisio.trim(String(str)).toLowerCase().indexOf(conmisio.trim(String(partial)).toLowerCase()) == 0;
	};
	
	/**
	 * Returns a split string on Uppercase characters
	 * Example: ToggleMenuButton => Toggle Menu Button
	 *
	 * @param {String} str
	 * @return {string}
	 */
	conmisio.splitStringOnUpper = function (str){
		return str.split(/(?=[A-Z])/).join(" ");
	};
	
	/**
	 * Casts first letters in words to uppercase
	 *
	 * @param {String} str
	 * @return {string}
	 */
	conmisio.toTitleCase = function(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};
	
	/**
	 * Casts first letters to uppercase
	 *
	 * @param {String} str
	 * @return {string}
	 */
	conmisio.capitalizeFirstLetter = function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	
	conmisio.endsWith = function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	};
	
	/**
	 * converts string to standard class string
	 *
	 * @param {String} strValue
	 * @return {string}
	 */
	conmisio.stringToClassString = function(strValue){
		var str = (strValue !== null) ? String(strValue) : "";
		return conmisio.trim(conmisio.cleanSpaces(str.replace(/[^A-Z0-9]+/ig, " "))).replace(/[^A-Z0-9]+/ig, "-").toLowerCase();
	};
	
	/**
	 * converts string to standard machine name string
	 *
	 * @param {String} strValue
	 * @return {string}
	 */
	conmisio.stringToMachineNameString = function(strValue){
		var str = (strValue !== null) ? String(strValue) : "";
		return conmisio.toTitleCase(conmisio.trim(conmisio.cleanSpaces(str.replace(/[^A-Z0-9]+/ig, " ")))).replace(/[^A-Z0-9]+/ig, "");
	};
	
	/**
	 * Returns true/false if string contains provided partial
	 *
	 * @param {String} str
	 * @param {String} partial
	 * @return {Boolean}
	 */
	conmisio.stringContains = function (str, partial){
		return (str.indexOf(partial) > -1);
	};
	
	/**
	 * Returns document height
	 * tested in IE6/7, FF2/3, Safari (Windows), Google Chrome and Opera 9.5
	 *
	 * @return {Number}
	 */
	conmisio.getDocHeight = function() {
		var doc = document;
		return Math.max(
			doc.body.scrollHeight, doc.documentElement.scrollHeight,
			doc.body.offsetHeight, doc.documentElement.offsetHeight,
			doc.body.clientHeight, doc.documentElement.clientHeight
		);
	};
	
	/**
	 * Returns current scroll top offset
	 *
	 * @return {Number}
	 */
	conmisio.getScrollTop = function() {
		var doc = document;
		return Math.max(
			doc.body.scrollTop, doc.documentElement.scrollTop,
			doc.body.offsetTop, doc.documentElement.offsetTop
		);
	};
	
	/**
	 * Duplicates an {Object|Array|Date} and returns a new copy of {Object|Array|Date}
	 *
	 * @param {Object}
	 * @return {Object}
	 */
	conmisio.clone = function(obj) {
		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;
		
		// Handle Date
		if (obj instanceof Date) {
			var copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}
		
		// Handle Array
		if (obj instanceof Array) {
			var copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = conmisio.clone(obj[i]);
			}
			return copy;
		}
		
		// Handle Object
		if (obj instanceof Object) {
			var copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = conmisio.clone(obj[attr]);
			}
			return copy;
		}
		
		throw new Error("Unable to copy obj! Its type isn't supported.");
	};
	
	/**
	 * Retrieve form data
	 *
	 * @param {Object} element Form DOM element (<form>)
	 * @return {Object} returns form data
	 */
	conmisio.formData = function( element ) {
		var i, j, q = {};
		for (i = element.elements.length - 1; i >= 0; i = i - 1) {
			if (element.elements[i].name === "") {
				continue;
			}
			
			switch (element.elements[i].nodeName) {
				case 'INPUT':
					switch (element.elements[i].type) {
						case 'number':
							var value = conmisio.trim(element.elements[i].value);
							if(value.length > 0 && conmisio.isFloat(value)) {
								q[element.elements[i].name] = parseFloat(value);
							}else if(value.length !== 0){
								q[element.elements[i].name] = parseInt(value);
							}else{
								q[element.elements[i].name] = NaN;
							}
							break;
						case 'text':
						case 'hidden':
						case 'password':
						case 'button':
						case 'reset':
						case 'submit':
							
							var value = conmisio.trim(element.elements[i].value);
							if(conmisio.isBoolean(value)){
								q[element.elements[i].name] = (value.toLowerCase() === "true");
							}else {
								q[element.elements[i].name] = value;
							}
							
							break;
						case 'checkbox':
						case 'radio':
							if (element.elements[i].checked) {
								var value = element.elements[i].value;
								if(conmisio.isBoolean(value)){
									q[element.elements[i].name] = (value.toLowerCase() === "true");
								}else {
									q[element.elements[i].name] = value;
								}
							}
							break;
						case 'file':
							break;
					}
					break;
				case 'TEXTAREA':
					q[element.elements[i].name] = conmisio.trim(element.elements[i].value);
					break;
				case 'SELECT':
					switch (element.elements[i].type) {
						case 'select-one':
							var value = element.elements[i].value;
							if(conmisio.isBoolean(value)){
								q[element.elements[i].name] = (value.toLowerCase() === "true");
							}else if(conmisio.isFloat(value)) {
								q[element.elements[i].name] = parseFloat(value);
							}else if(conmisio.isInt(value)) {
								q[element.elements[i].name] = parseInt(value);
							}else {
								q[element.elements[i].name] = value;
							}
							break;
						case 'select-multiple':
							q[element.elements[i].name] = {};
							for (j = element.elements[i].options.length - 1; j >= 0; j = j - 1) {
								if (element.elements[i].options[j].selected) {
									q[element.elements[i].name][j] = element.elements[i].options[j].value;
								}
							}
							break;
					}
					break;
				case 'BUTTON':
					switch (element.elements[i].type) {
						case 'reset':
						case 'submit':
						case 'button':
							q[element.elements[i].name] = element.elements[i].value;
							break;
					}
					break;
			}
		}
		
		return q;
	};
	
	/**
	 * Reset form (very basic)
	 *
	 * @method formReset v0.1
	 * @param {Object} element Form DOM element (<form>)
	 */
	conmisio.formReset = function( element ) {
		var i, j;
		for (i = element.elements.length - 1; i >= 0; i = i - 1) {
			if (element.elements[i].name === "") {
				continue;
			}
			switch (element.elements[i].nodeName) {
				case 'INPUT':
					switch (element.elements[i].type) {
						case 'text':
						case 'hidden':
						case 'password':
						case 'number':
						case 'reset':
							element.elements[i].value = '';
							break;
						case 'checkbox':
						case 'radio':
							element.elements[i].checked = false;
							break;
						case 'file':
							break;
					}
					break;
				case 'TEXTAREA':
					element.elements[i].value = "";
					break;
				case 'SELECT':
					switch (element.elements[i].type) {
						case 'select-one':
							element.elements[i].selectedIndex = 0;
							break;
						case 'select-multiple':
							element.elements[i].selectedIndex = -1;
							break;
					}
					break;
				case 'BUTTON':
					switch (element.elements[i].type) {
						case 'reset':
						case 'submit':
						case 'button':
							break;
					}
					break;
			}
		}
		
	};
	
	/**
	 * Returns true if it is a DOM element
	 *
	 * @param {Object}
	 * @return {Boolean}
	 */
	conmisio.isElement = function(o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
				o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	};
	
	/**
	 * Retrieves element style
	 *
	 * @param {Object} DOM element
	 * @return {Object}
	 */
	conmisio.getStyle = function( element ){
		if (element.currentStyle) {
			return element.currentStyle;
		}
		
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(element);
		}
		
		return element.style;
	};
	
	/**
	 * Checks if an element is visible for the user
	 *
	 * @param {Object} DOM element
	 * @return {Boolean}
	 */
	conmisio.isVisible = function( element ) {
		if( element !== null && typeof element === 'object' ) {
			var styles = conmisio.getStyle( element),
				check = 0;
			
			if( styles.opacity.length !== null && parseFloat(styles.opacity) === 0 ){
				check++;
			} else if( styles.visibility.length !== null && styles.visibility === 'hidden' ) {
				check++;
			} else if( styles.display !== null && styles.display === 'none' ) {
				check++;
			}
			
			if(typeof window.getComputedStyle !== 'undefined'){
				var opacity = conmisio.checkCssStyles(element, "opacity"),
					visibility = conmisio.checkCssStyles(element, "visibility"),
					display = conmisio.checkCssStyles(element, "display");
				
				if( opacity !== null && parseFloat(opacity) === 0 ){
					check++;
				} else if( visibility !== null && visibility === 'hidden' ) {
					check++;
				} else if( display !== null && display === 'none' ) {
					check++;
				}
			}
			
			return (check === 0);
			
		}else{
			return false;
		}
	};
	
	/**
	 * Searches for the closest parent matching provided pattern
	 *
	 * @param {Object} DOM element
	 * @param {String} pattern
	 * @return {Boolean}
	 */
	conmisio.closest = function( element, selector ) {
		
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
				
				if( selector.match(conmisio.classSelector) && conmisio.hasClass(element, selector) ) {
					return element;
				} else if( selector.match(conmisio.idSelector) && element.id === selector.replace("#", "") ) {
					return element;
				} else if( selector.match(conmisio.tagSelector) && element.nodeName === selector.toUpperCase() ) {
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
	
	/**
	 * Get element position index
	 * @param node {Object} DOM object
	 * @returns {number} element index
	 */
	conmisio.getElementIndex = function(node) {
		var index = 0;
		while ( (node = node.previousElementSibling) ) {
			index++;
		}
		return index;
	};
	
	/**
	 * Sets elements opacity (cross browser support added)
	 *
	 * @param element {Object} DOM object
	 * @param value {Number} element opacity (Float number)
	 */
	conmisio.setElementOpacity = function(element, value) {
		var style = element.style;
		
		if (style.opacity !== undefined) {
			style.opacity = value;
		} else if (style.filter !== undefined) {
			style.filter = 'alpha(opacity=' + (value * 100) + ')';
		} else if (style['-ms-filter'] !== undefined) {
			style['-ms-filter'] = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (value * 100) + ')';
		} else {
			throw new Error('Opacity not supported');
		}
	};
	
	/**
	 * Using setInterval increases the opacity from 0 to 1
	 *  - Dependency: conmisio.setElementOpacity() {Function}
	 *
	 * @param element {Object} DOM element
	 * @param frameDuration {Number} interval duration in milliseconds
	 * @param callback {Function} callback
	 * @param opacityTarget {Number} opacity target
	 * @param opacityStartFrom {Number} opacity starts from
	 */
	var fadeInInstanceInterval,
		fadeOutInstanceInterval;
	conmisio.fadeIn = function(element, frameDuration, callback, opacityTarget, opacityStartFrom){
		var opacityVal = (typeof opacityTarget !== "undefined" && opacityTarget !== null && parseFloat(opacityTarget) > 0) ? opacityTarget : 1,
			currentOpacity = (typeof opacityStartFrom === "undefined") ? 0 : opacityStartFrom,
			perTick = opacityVal / (frameDuration / 17);
		
		conmisio.setElementOpacity(element, currentOpacity);
		
		function changeOpacity(){
			currentOpacity = currentOpacity + perTick >= opacityVal ? opacityVal : currentOpacity + perTick;
			conmisio.setElementOpacity(element, currentOpacity);
			
			if(currentOpacity >= opacityVal){
				clearInterval(fadeInInstanceInterval);
				
				if( callback !== undefined && callback !== null && typeof callback === 'function' ){ callback(element); }
			}
		}
		
		if( fadeOutInstanceInterval ){
			clearInterval(fadeOutInstanceInterval);
		}
		
		if( fadeInInstanceInterval ){
			clearInterval(fadeInInstanceInterval);
		}
		
		fadeInInstanceInterval = setInterval(changeOpacity, 17);
	};
	
	/**
	 * Using setInterval decreases the opacity from 1 to 0
	 *  - Dependency: conmisio.setElementOpacity() {Function}
	 *
	 * @param element {Object} DOM element
	 * @param frameDuration {Number} interval duration in milliseconds
	 * @param callback {Function} callback
	 * @param opacityTarget {Number} opacity target
	 */
	conmisio.fadeOut = function(element, frameDuration, callback, opacityTarget){
		var currentOpacity = 1,
			perTick = 1 / (frameDuration / 17),
			finalOpacity = (typeof opacityTarget === "undefined") ? 0 : opacityTarget;
		
		conmisio.setElementOpacity(element, 1);
		
		function changeOpacity(){
			currentOpacity = currentOpacity - perTick <= finalOpacity ? finalOpacity : currentOpacity - perTick;
			conmisio.setElementOpacity(element, currentOpacity);
			
			if(currentOpacity <= 0){
				clearInterval(fadeOutInstanceInterval);
				
				if( callback !== undefined && callback !== null && typeof callback === 'function' ){ callback(element); }
			}
		}
		
		if( fadeInInstanceInterval ){
			clearInterval(fadeInInstanceInterval);
		}
		
		if( fadeOutInstanceInterval ){
			clearInterval(fadeOutInstanceInterval);
		}
		fadeOutInstanceInterval = setInterval(changeOpacity, 17);
	};
	
	conmisio.componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	};
	
	conmisio.rgbToHex = function(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	};
	
	conmisio.hexToRgb = function(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});
		
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	};
	
	conmisio.rgbToHex = function(r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	};
	
	
	
	// Hash any string into an integer value
	// Then we'll use the int and convert to hex.
	function hashCode(str) {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	}
	
	// Convert an int to hexadecimal with a max length
	// of six characters.
	function intToARGB(i) {
		var hex = ((i>>24)&0xFF).toString(16) +
			((i>>16)&0xFF).toString(16) +
			((i>>8)&0xFF).toString(16) +
			(i&0xFF).toString(16);
		// Sometimes the string returned will be too short so we
		// add zeros to pad it out, which later get removed if
		// the length is greater than six.
		hex += '000000';
		return hex.substring(0, 6);
	}
	
	conmisio.stringToHexColor = function(str) {
		if(typeof str === "string"){
			return "#" + intToARGB(hashCode(str))
		}else{
			throw new TypeError('Unsupported type [' + typeof str + '], only supported "string" type')
		}
	};
	
	
	
	//TODO: complete the animation method
	conmisio.animateCssColour = function(){
	
	};
	
	/**
	 * Using setInterval increases the top offset position minus of current
	 * element height to current position simulating a slide down animation
	 *
	 * @param element {Object} DOM element
	 * @param frameDuration {Number} interval duration in milliseconds
	 * @param callback {Function} callback
	 */
	conmisio.slideDown = function(element, frameDuration, callback){
		var offsetHeight = element.offsetHeight,
			currentTopOffset = -1 * offsetHeight,
			currentElementHeight = offsetHeight + currentTopOffset,
			perTick;
		
		element.style.top = currentTopOffset + 'px';
		
		function changeHeight(){
			currentTopOffset = currentTopOffset + perTick >= currentElementHeight ? currentElementHeight : currentTopOffset + perTick;
			element.style.top = currentTopOffset + 'px';
			
			if(currentTopOffset >= currentElementHeight){
				clearInterval(element.sliding);
				
				if( callback !== undefined && callback !== null && typeof callback === 'function' ){ callback(element); }
			}
		}
		
		if( parseInt(offsetHeight) > 0 ){
			perTick = offsetHeight / (frameDuration / 17);
			
			if( element.sliding ){
				clearInterval(element.sliding);
			}
			
			element.sliding = setInterval(changeHeight, 17);
		}
	};
	
	/**
	 * Animation method, animates provided property
	 *  - Works only with {Number} values
	 * @param element {Object}
	 * @param property {String}
	 * @param targetValue {Number}
	 * @param frameDuration {Number}
	 * @param callback {Function}
	 */
	conmisio.animate = function(element, property, targetValue, frameDuration, callback){
		var setProperty = element.style[property],
			perTick = 0,
			metricString = (typeof targetValue === "string") ? targetValue.replace(/[^A-Za-z]+/g, '') : '';
		
		targetValue = (typeof targetValue === "string") ? parseFloat(targetValue.replace(/[^0-9\.]+/g, '')) : parseFloat(targetValue);
		
		if( setProperty === undefined || setProperty === null ){
			return null;
		}
		
		setProperty = ( setProperty.length === 0 ) ? 0 : parseInt(setProperty);
		
		function changeProperty(){
			var newValue = (setProperty > parseFloat(targetValue)) ? Math.max(parseFloat(targetValue), parseFloat(setProperty + perTick)) : Math.min(parseFloat(targetValue), parseFloat(setProperty + perTick));
			
			if(parseFloat(newValue) === parseFloat(targetValue)){
				element.style[property] = targetValue + metricString;
				clearInterval(element[property]);
				
				if( callback !== undefined && callback !== null && typeof callback === 'function' ){ callback(element); }
			}else{
				setProperty = setProperty + perTick;
				element.style[property] = setProperty + metricString;
			}
		}
		
		if( targetValue !== undefined && targetValue !== null ){
			perTick = (parseFloat(targetValue)-setProperty) / (frameDuration / 17);
			if( element[property] ){
				clearInterval(element[property]);
			}
			
			element[property] = setInterval(changeProperty, 17);
		}
		
		return element;
	};
	
	/**
	 * Using setInterval scrolls the page to a set x window position
	 *
	 * @param element {Object} DOM element
	 * @param frameDuration {Number} interval duration in milliseconds
	 * @param callback {Function} callback
	 */
	conmisio.scrollTop = function(element, frameDuration, callback){
		var timeLapsed = 0,
			percentage, position,
			startLocation = conmisio.getScrollTop(),
			endLocation = elementTopOffset( element ),
			distance = endLocation - startLocation,
			animationInterval;
		
		// Loop scrolling animation
		function scrollAnimation() {
			timeLapsed += 16;
			percentage = ( timeLapsed / frameDuration );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			position = startLocation + ( distance * easingPattern(conmisio.easing, percentage) );
			
			console.log(Math.floor(position), endLocation);
			//console.log(startLocation, Math.floor(position));
			window.scrollTo( 0, Math.floor(position) );
			
			
			if ( position <= endLocation ) {
				clearInterval(animationInterval);
				
				if( callback !== undefined && callback !== null && typeof callback === 'function' ){ callback( element ); }
			}
		}
		
		animationInterval = setInterval(scrollAnimation, 16);
	};
	
	/**
	 * Using setInterval scrolls the page to a set x window position
	 *
	 * @param element {Object} DOM element
	 * @param frameDuration {Number} interval duration in milliseconds
	 * @param callback {Function} callback
	 */
	conmisio.scrollDown = function(element, frameDuration, callback){
		var timeLapsed = 0,
			percentage, position,
			startLocation = conmisio.getScrollTop(),
			endLocation = elementTopOffset( element ),
			distance =  endLocation - startLocation,
			animationInterval;
		
		// Loop scrolling animation
		function scrollAnimation() {
			timeLapsed += 16;
			percentage = ( timeLapsed / frameDuration );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			position = startLocation + ( distance * easingPattern(conmisio.easing, percentage) );
			
			console.log(endLocation, position);
			//console.log(startLocation, Math.floor(position));
			window.scrollTo( 0, Math.floor(position) );
			
			if ( endLocation <= position ) {
				clearInterval(animationInterval);
				
				if( callback !== undefined && callback !== null && typeof callback === 'function' ){ callback( element ); }
			}
		}
		
		animationInterval = setInterval(scrollAnimation, 16);
	};
	
	/**
	 * Get elements top offset
	 *
	 * @param element {Object} DOM element
	 * @return {Number}
	 */
	function elementTopOffset( element ) {
		var top = 0;
		
		if( element.offsetParent ) {
			do {
				top += element.offsetTop;
				element = element.offsetParent;
			} while (element);
		}
		
		return ( top >= 0 ) ? top : 0;
	}
	
	// alias for: elementTopOffset()
	conmisio.elementTopOffset = function( element ){
		return elementTopOffset( element );
	};
	
	/**
	 * Get elements left offset
	 *
	 * @param element {Object} DOM element
	 * @return {Number}
	 */
	conmisio.elementLeftOffset = function( element ) {
		var left = 0;
		
		if( element.offsetParent ) {
			do {
				left += element.offsetLeft;
				element = element.offsetParent;
			} while (element);
		}
		
		return ( left >= 0 ) ? left : 0;
	};
	
	/**
	 * Easing pattern calculation
	 *
	 * @param type {String}
	 * @param time {(Number|String)}
	 * @returns {Number}
	 * @source taken from https://github.com/cferdinandi/smooth-scroll/blob/master/smooth-scroll.js#LC42
	 */
	function easingPattern( type, time ) {
		if ( type == 'easeInQuad' ) return time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuad' ) return time * (2 - time); // decelerating to zero velocity
		if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
		if ( type == 'easeInCubic' ) return time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; // decelerating to zero velocity
		if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
		if ( type == 'easeInQuart' ) return time * time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; // decelerating to zero velocity
		if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
		if ( type == 'easeInQuint' ) return time * time * time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
		if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
		return time; // no easing, no acceleration
	}
	
	/**
	 * Returns target element left and top offset
	 *
	 * @param obj {Object} DOM element
	 * @return {(Object|Number)} reutrns Left and Top coordinate
	 * @source http://www.quirksmode.org/js/findpos.html
	 */
	conmisio.elementPosition = function(obj) {
		var objLeft = 0,
			objTop = 0;
		
		if (obj.offsetParent) {
			do {
				objLeft += obj.offsetLeft;
				objTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			
			return {objLeft: objLeft, objTop: objTop};
		}else{
			return null;
		}
		
	};
	
	/**
	 * Returns target element position according to the client area
	 *
	 * @param obj {Object} DOM element
	 * @return {(Object)} {x: ..., y: ...}
	 * @source http://www.kirupa.com/html5/get_element_position_using_javascript.htm
	 */
	conmisio.getElementPositionBasedOnClient = function(element) {
		var xPos = 0;
		var yPos = 0;
		
		while (element) {
			xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
			yPos += (element.offsetTop - element.scrollTop + element.clientTop);
			element = element.offsetParent;
		}
		return {x: xPos, y: yPos};
	};
	
	/**
	 * Removes class value from attribute class
	 *
	 * @param element {Object} DOM element
	 * @param className {String} class name string
	 */
	conmisio.removeClass = function(element, className) {
		
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
	 * Add class to attribute class
	 *
	 * @param element {Object} DOM element
	 * @param className {String} class name string
	 */
	conmisio.addClass = function(element, className) {
		try{
			if (element.classList){
				element.classList.add(className);
			}else{
				element.className += ' ' + className;
			}
		}catch(e){
			console.log(element, className);
			console.trace();
		}
		
		return element;
	};
	
	/**
	 * Checks if a class name is defined
	 *
	 * @param element {Object} DOM element
	 * @param className {String/Array} class name string
	 * @return {Boolean}
	 */
	conmisio.hasClass = function(element, className) {
		
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
			if(e.stack !== undefined){
				console.log(e.stack);
			}
			console.log(e, element, className);
		}
	}
	
	/**
	 * Toggles className or adds/removes it depending on force value
	 *
	 * @param element {Object} DOM element
	 * @param className {String} class name string
	 * @param force {Boolean} state to force class into
	 * @return {Boolean}
	 */
	conmisio.toggleClass = function(element, className, force) {
		var result = conmisio.hasClass(element, className);
		var method = result ? force !== true && "removeClass" : force !== false && "addClass";
		
		if (method) {
			conmisio[method](element, className);
		}
		if (force === true || force === false) {
			return force;
		} else {
			return !result;
		}
		
	};
	
	conmisio.previousSiblingWithClass = function(element, className){
		while(element.previousSibling && !conmisio.hasClass(element.previousSibling, className)) {
			element = element.previousSibling;
		}
		return element.previousSibling;
	};
	
	conmisio.nextSiblingWithClass = function(element, className){
		while(element.nextSibling && !conmisio.hasClass(element.nextSibling, className)) {
			element = element.nextSibling;
		}
		return element.nextSibling;
	};
	
	conmisio.parentWithClass = function(element, className){
		while (!conmisio.hasClass(element.parentElement, className)){
			element = element.parentElement;
			if (!element.parentElement){
				return null;
			}
		}
		return element.parentElement;
	};
	
	conmisio.isEmptyObject = function (o) {
		for ( var p in o ) {
			if ( o.hasOwnProperty( p ) ) { return false; }
		}
		return true;
	};
	
	window.conmisio = conmisio;
	
})(window, document);


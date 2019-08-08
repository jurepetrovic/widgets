(function(window, document, undefined) {
	'use strict';
	
	if (!window.console) { window.console = function(){}; if (typeof XDomainRequest !== "undefined") { window.console.prototype.log = function(err){ throw new SyntaxError(err); }; window.console.prototype.warn = function(err){ throw new SyntaxError(err); }; window.console.prototype.error = function(err){ throw new SyntaxError(err); }; } }
	try{Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1})}catch(err){console.log(err)}
	try{Event.prototype.stopPropagation||(Event.prototype.stopPropagation=function(){this.cancelBubble=!0})}catch(err){console.log(err)}
	try{"function"!=typeof mapObject&&(window.mapObject=function(e,t){if(null!==e){var n=0;for(var r in e)e.hasOwnProperty(r)&&(t(e[r],r,n),n++);return!0}return console.log("returned object is null",typeof e),!1})}catch(err){console.log(err)}
	try{if(!Element.prototype.addEventListener){var eventListeners=[],addEventListener=function(e,t){var n,r=this;if(n=function(e){e.target=e.srcElement,e.currentTarget=r,e.pageX=event.clientX+document.body.scrollLeft,e.pageY=event.clientY+document.body.scrollTop,t.handleEvent?t.handleEvent(e):t.call(r,e)},"DOMContentLoaded"===e){var o=function(e){"complete"===document.readyState&&n(e)};if(document.attachEvent("onreadystatechange",o),eventListeners.push({object:this,type:e,listener:t,wrapper:o}),"complete"==document.readyState){var i=new Event;i.srcElement=window,o(i)}}else this.attachEvent("on"+e,n),eventListeners.push({object:this,type:e,listener:t,wrapper:n})},removeEventListener=function(e,t){for(var n=0;n<eventListeners.length;){var r=eventListeners[n];if(r.object==this&&r.type==e&&r.listener==t){"DOMContentLoaded"==e?this.detachEvent("onreadystatechange",r.wrapper):this.detachEvent("on"+e,r.wrapper);break}++n}};Element.prototype.addEventListener=addEventListener,Element.prototype.removeEventListener=removeEventListener,HTMLDocument&&(HTMLDocument.prototype.addEventListener=addEventListener,HTMLDocument.prototype.removeEventListener=removeEventListener),Window&&(Window.prototype.addEventListener=addEventListener,Window.prototype.removeEventListener=removeEventListener)}Element.prototype.remove||(Element.prototype.remove=function(){this.parentElement.removeChild(this)},NodeList.prototype.remove=HTMLCollection.prototype.remove=function(){for(var e=0,t=this.length;t>e;e++)this[e]&&this[e].parentElement&&this[e].parentElement.removeChild(this[e])})}catch(err){console.log(err)}"undefined"!=typeof XDomainRequest&&("object"!=typeof window.JSON&&(window.JSON={}),function(){"use strict";function f(e){return 10>e?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,o,i,a,p=gap,u=t[e];switch(u&&"object"==typeof u&&"function"==typeof u.toJSON&&(u=u.toJSON(e)),"function"==typeof rep&&(u=rep.call(t,e,u)),typeof u){case"string":return quote(u);case"number":return isFinite(u)?String(u):"null";case"boolean":case"null":return String(u);case"object":if(!u)return"null";if(gap+=indent,a=[],"[object Array]"===Object.prototype.toString.apply(u)){for(i=u.length,n=0;i>n;n+=1)a[n]=str(n,u)||"null";return o=0===a.length?"[]":gap?"[\n"+gap+a.join(",\n"+gap)+"\n"+p+"]":"["+a.join(",")+"]",gap=p,o}if(rep&&"object"==typeof rep)for(i=rep.length,n=0;i>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,u),o&&a.push(quote(r)+(gap?": ":":")+o));else for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(o=str(r,u),o&&a.push(quote(r)+(gap?": ":":")+o));return o=0===a.length?"{}":gap?"{\n"+gap+a.join(",\n"+gap)+"\n"+p+"}":"{"+a.join(",")+"}",gap=p,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof window.JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},window.JSON.stringify=function(e,t,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof window.JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,window.JSON.parse=function(text,reviver){function walk(e,t){var n,r,o=e[t];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(e,t,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}());
	var _slice=Array.prototype.slice;
	try{_slice.call(document.documentElement)}catch(e){Array.prototype.slice=function(t,e){if(e="undefined"!=typeof e?e:this.length,"[object Array]"===Object.prototype.toString.call(this))return _slice.call(this,t,e);var r,i,c=[],l=this.length,o=t||0;o=o>=0?o:l+o;var a=e?e:l;if(0>e&&(a=l+e),i=a-o,i>0)if(c=new Array(i),this.charAt)for(r=0;i>r;r++)c[r]=this.charAt(o+r);else for(r=0;i>r;r++)c[r]=this[o+r];return c}}
	try{ if (typeof setDataSet !== 'function') { window.setDataSet = function(obj, key, value){ try{ obj.dataset[key] = value; }catch(e){ obj.setAttribute(('data-' + key), value); } } } if (typeof getDataSet !== 'function') { window.getDataSet = function(obj, key){ try{ if( typeof key === "undefined" ) { return obj.dataset; }else{ return obj.dataset[key]; } }catch(e){ if( typeof key === "undefined" ){ var newObject = {}; for(var key in obj.attributes){ if(obj.attributes.hasOwnProperty(key)){ if(obj.attributes[key].name.indexOf("data-") > -1){ newObject[obj.attributes[key].name.replace("data-", "")] = obj.attributes[key].value; } } } return newObject; }else { try { return obj.getAttribute('data-' + key); }catch(e2){ console.error(obj, key); console.error(e2); } } } } } }catch(err){ console.log(err) }
	
	/**
	 * Checks if a class name is defined
	 *
	 * @param element {Object} DOM element
	 * @param className {String/Array} class name string
	 * @return {Boolean}
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
			if(e.stack !== undefined){
				console.log(e.stack);
			}
			console.log(e, element, className);
		}
	}
	
	/**
	 * Removes class value from attribute class
	 *
	 * @param element {Object} DOM element
	 * @param className {String} class name string
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
	 * Add class to attribute class
	 *
	 * @param element {Object} DOM element
	 * @param className {String} class name string
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
	 * returns the size of an Object or array
	 *
	 * @param {Object}
	 * @return {Number}
	 */
	var sizeof = function(obj) {
		//!Object.keys(item.location).length // IE9+
		
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
	 * @param {Object} anything or Array object
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
	
	var remove = function(el){
		if(el !== null) {
			el.parentElement.removeChild(el);
		}
	};
	
	/**
	 * Returns true if it is a DOM element
	 *
	 * @param {Object}
	 * @return {Boolean}
	 */
	var isElement = function(o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
				o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	};
	
	var objectIterator = function( obj, callback ) {
		if(obj !== null && obj.length !== undefined && obj instanceof Array){
			var count = 0;
			for(var key in obj){
				if(typeof callback === 'function'){ callback(obj[key], key, count, obj.length) }
				
				count++;
			}
		}else{
			if(typeof callback === 'function'){ callback(obj, 0, 0, 1) }
		}
	};
	
	var apiURL = "https://gateway.competitionlabs.com";
	
	var cLabs = {
		api: {
			url: apiURL,
			achievementProgression: apiURL + "/api/v1/:space/members/reference/:memberId/achievements/:achievementId",
			widgetData: apiURL + "/api/v1/:space/widget/preview/:widgetId",
			css: apiURL + "/assets/css/widgets/achievements-widget.css",
			image: apiURL + "/assets/images/widgets/check.svg",
			successImage: apiURL + "/assets/images/widgets/check-success.svg",
			attachments: apiURL + "/assets/attachments/:attachmentId"
		},
		feedExtraLoading: false, // feed extra results are loading (true/false)
		classSelector: /^\.([\w-]+)$/, // class string expression check
		idSelector: /^#[\w\d\-\_\&\!\@\*]+$/, // ID string expression check
		tagSelector: /^[\w-]+$/ // TAG string expression check
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
	 * @returns {(Object|null|Array)} depending on the provided selector results can vary (null, node, NodeList array)
	 * @param doc
	 * @param selector
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
	
	var trim = function( string ){
		return string.replace(/^\s+|\s+$/g, '');
	};
	
	/* IE8 version */
	if ( !document.getElementsByClassName ) {
		query = function( doc, selector ) {
			var result;
			
			if (typeof doc === 'string' && selector === undefined) {
				selector = doc;
				doc = document;
			}
			
			selector = trim(selector); //
			if (selector.match(cLabs.idSelector)) {
				result = document.getElementById(selector.replace("#", ""));
			} else if (selector.match(cLabs.tagSelector)) {
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
	}
	
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
	
	var stringContains = function (str, partial){
		return (str.indexOf(partial) > -1);
	};
	
	var achievementWidget = function( options ){
		
		this.settings = {
			container: null,
			memberId: "",
			spaceName: "",
			autoRefresh: true,
			autoRefreshInterval: 5000,
			apiURL: apiURL,
			api: cLabs.api,
			theme: "default",
			widgetId: null,
			apiKey: null,
			data: [],
			listItem: function( instance, item ){
				var wrapper = document.createElement("li"),
					innerWrapper = document.createElement("div"),
					iconWrapper = document.createElement("div"),
					iconInnerWrapper = document.createElement("div"),
					icon = document.createElement("img"),
					indicator = document.createElement("div"),
					label = document.createElement("div"),
					description = document.createElement("div"),
					progressBarWrapper = document.createElement("div"),
					progressBar = document.createElement("div"),
					completionWrapper = document.createElement("div"),
					completionElement = document.createElement("div"),
					completionElementImage = document.createElement("img");
				
				wrapper.setAttribute("class", "cl-aw-item-wrapper cl-el-" + item.id);
				innerWrapper.setAttribute("class", "cl-aw-item-inner-wrapper");
				iconWrapper.setAttribute("class", "cl-aw-item-icon-wrapper");
				iconInnerWrapper.setAttribute("class", "cl-aw-item-icon-inner-wrapper");
				icon.setAttribute("class", "cl-aw-item-icon");
				indicator.setAttribute("class", "cl-aw-item-indicator");
				label.setAttribute("class", "cl-aw-item-label");
				description.setAttribute("class", "cl-aw-item-description");
				progressBarWrapper.setAttribute("class", "cl-aw-item-progressBar-wrapper");
				progressBar.setAttribute("class", "cl-aw-item-progressBar");
				completionWrapper.setAttribute("class", "cl-aw-item-completion");
				completionElement.setAttribute("class", "cl-aw-item-completion-element");
				completionElementImage.setAttribute("class", "cl-aw-item-completion-image cl-achieved");
				
				label.innerHTML = item.name;
				description.innerHTML = item.description;
				icon.src = instance.settings.api.attachments.replace(":attachmentId", item.icon);
				completionElementImage.src = instance.settings.api.image;
				
				indicator.appendChild(label);
				indicator.appendChild(description);
				progressBarWrapper.appendChild(progressBar);
				indicator.appendChild(progressBarWrapper);
				iconInnerWrapper.appendChild(icon);
				iconWrapper.appendChild(iconInnerWrapper);
				completionElement.appendChild(completionElementImage);
				completionWrapper.appendChild(completionElement);
				innerWrapper.appendChild(iconWrapper);
				innerWrapper.appendChild(indicator);
				innerWrapper.appendChild(completionWrapper);
				wrapper.appendChild(innerWrapper);
				
				return wrapper;
			},
			noData: function(){
				var wrapper = document.createElement("li"),
					innerWrapper = document.createElement("div");
				
				innerWrapper.innerHTML = "No data available";
				
				wrapper.setAttribute("class", "cl-aw-item-wrapper");
				innerWrapper.setAttribute("class", "cl-aw-item-inner-wrapper cl-no-data");
				wrapper.appendChild(innerWrapper);
				
				return wrapper;
			},
			debug: false
		};
		
		if( typeof options !== "undefined" ){
			for(var opt in options){
				if (options.hasOwnProperty(opt)) {
					this.settings[opt] = options[opt];
				}
			}
		}
		
		this.widgetContainer = null;
		this.intervalInstance;
		this.ajaxDataGet = new cLabs.Ajax();
		
		// Default
		if( this.settings.container === null ){
			this.settings.container = ".cl-achievement-widget";
		}
		
		this.layout = function(){
			var wrapper = document.createElement("div"),
				innerWrapper = document.createElement("div"),
				list = document.createElement("ul");
			
			wrapper.setAttribute("class", "cl-achievement-widget-wrapper");
			innerWrapper.setAttribute("class", "cl-achievement-widget-inner-wrapper");
			list.setAttribute("class", "cl-achievement-widget-list");
			
			innerWrapper.appendChild(list);
			wrapper.appendChild(innerWrapper);
			
			return wrapper;
		};
		
		this.loadAchievedStatus = function( list, achievementId ){
			var _this = this,
				ajax = new cLabs.Ajax();
			
			if( _this.settings.memberId !== null && _this.settings.memberId.length > 0 ) {
				
				var url = _this.settings.api.achievementProgression.replace(":space", _this.settings.spaceName).replace(":memberId", _this.settings.memberId).replace(":achievementId", achievementId);
				
				ajax.getData({
					type: "GET",
					url: url,
					headers: { "X-API-KEY": _this.settings.apiKey },
					success: function (response, dataObj, xhr) {
						if (xhr.status === 200) {
							var json = JSON.parse(response),
								container = query(list, ".cl-el-" + achievementId);
							
							// if (typeof json.aggregations !== "undefined" && json.aggregations[0].items.length > 0) {
							//
							// 	mapObject(json.aggregations[0].items, function (agg) {
							// 		var achievement = query(_this.widgetContainer, ".cl-el-" + agg.value);
							//
							// 		if ( achievement !== null && agg.count > 0 ) {
							// 			addClass(achievement, "achieved");
							//
							// 			query(achievement, ".cl-aw-item-completion-image").src = _this.settings.api.successImage;
							// 		}
							// 	});
							//
							//
							// }
							
							
							if( json.data.achievementId == achievementId && json.data.list.length > 0 && container !== null ){
								mapObject(json.data.list, function(progression){
									var perc = (parseFloat(progression.percentageComplete) * 100),
										percPresentation = parseInt(perc),
										id = progression.rule.id,
										constant = parseInt(progression.rule.constant),
										progressionObj = query(container, ".cl-aw-item-progressBar");
									
									if( progressionObj !== null ) {
										perc = parseInt(constant*parseFloat(progression.percentageComplete));
										
										if(percPresentation > 100){
											percPresentation = 100;
										}
										
										if( perc == 99 ){
											perc = 100;
										}
										progressionObj.style.width = percPresentation + "%";
									}
								});
							} else if( json.data.achievementId == achievementId && json.data.matchedCount > 0 && container !== null ) {
								if( container !== null ){
									addClass(container, "achieved");
									query(container, ".cl-aw-item-completion-image").src = _this.settings.api.successImage;
								}
								query(container, ".cl-aw-item-progressBar").style.width = "100%"
							} else {
								objectIterator(query(container, ".cl-aw-item-progressBar"), function( obj ){
									if( obj !== null ) {
										obj.style.width = "0%";
									}
								});
							}
						}
					}
				});
			}
		};
		
		var ajaxDataString = "";
		var ajaxRunning = false;
		this.loadData = function(){
			var _this = this,
				list = query(_this.widgetContainer, ".cl-achievement-widget-list");
			
			if( _this.widgetContainer.offsetWidth < 475 ){
				addClass(_this.widgetContainer, "cl-size-2x");
			}else{
				removeClass(_this.widgetContainer, "cl-size-2x");
			}
			
			if( _this.settings.widgetId !== null && (_this.settings.data.length === 0 || typeof _this.settings.data === "undefined") ){
				
				_this.autoRefresh();
				
				var url = _this.settings.api.widgetData.replace(":space", _this.settings.spaceName).replace(":widgetId", _this.settings.widgetId);
				
				ajaxRunning = true;
				new cLabs.Ajax().getData({
					type: "GET",
					url: url,
					headers: { "X-API-KEY": _this.settings.apiKey },
					success: function(response, dataObj, xhr){
						if( xhr.status === 200 && ajaxDataString !== response ){
							var json = JSON.parse(response);
							ajaxDataString = response;
							
							list.innerHTML = "";
							
							mapObject(json.data, function(item){
								list.appendChild( _this.settings.listItem( _this, item ) );
								
								_this.loadAchievedStatus(list, item.id);
							});
							
							if( json.data.length === 0 ){
								list.appendChild( _this.settings.noData() );
							}
							
							
						}
						
						ajaxRunning = false;
					},
					error: function(){
						ajaxRunning = false;
					}
				});
				
			}else if( _this.settings.data.length > 0 ){
				
				list.innerHTML = "";
				
				mapObject(_this.settings.data, function(item){
					list.appendChild( _this.settings.listItem( _this, item ) );
					
					_this.loadAchievedStatus(list, item.id);
				});
			}else{
				list.innerHTML = "";
				
				list.appendChild( _this.settings.noData() );
			}
		};
		
		this.reload = function(){
			this.loadData();
		};
		
		this.eventListeners = function(){
			var _this = this;
			
			window.addEventListener("resize", function(){
				var elementSize = _this.widgetContainer.offsetWidth;
				
				if( elementSize < 475 ){
					addClass(_this.widgetContainer, "cl-size-2x");
				}else{
					removeClass(_this.widgetContainer, "cl-size-2x");
				}
			});
		};
		
		this.autoRefresh = function(){
			var _this = this;
			
			if( this.intervalInstance ){
				clearInterval(this.intervalInstance);
			}
			
			if( _this.settings.autoRefresh ){
				this.intervalInstance = setInterval(function(){
					if( !ajaxRunning ) {
						_this.loadData();
					}
				}, _this.settings.autoRefreshInterval);
			}
		};
		
		this.init = function() {
			var _this = this,
				link = document.createElement("link");
			
			if( typeof _this.settings !== "undefined" ) {
				
				this.widgetContainer = query(_this.settings.container);
				
				if( this.widgetContainer !== null ) {
					
					var exists = false;
					objectIterator(query("link"), function(link){
						if( link !== null && _this.settings.api.css === link.href ){
							exists = true;
						}
					});
					
					if( !exists ) {
						link.setAttribute("rel", "stylesheet");
						link.setAttribute("type", "text/css");
						link.setAttribute("href", _this.settings.api.css);
						
						document.body.appendChild(link);
					}
					
					this.widgetContainer.innerHTML = "";
					this.widgetContainer.appendChild(_this.layout());
					
					_this.loadData();
					_this.eventListeners();
					
				} else {
					if(_this.settings.debug) console.warn("[CompetitionLabs Achievements Widget]: container not found ");
				}
			}
		};
		
		this.init();
	};
	
	if(typeof window._clAchievementOptions !== "undefined"){
		mapObject(window._clAchievementOptions, function(opt, key){
			if(typeof window._clAchievementOptions[key].obj === "undefined") {
				window._clAchievementOptions[key].obj = new achievementWidget(opt);
			}
		});
	}
	
	if(typeof window._clAchievementWidget === "undefined") {
		window._clAchievementWidget = achievementWidget;
	}else{
		console.warn("window._clAchievementWidget is already defined");
	}
	
})(window, document);
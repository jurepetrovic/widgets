(function() {
	'use strict';
	
	if (!window.console) { window.console = function(){}; if (typeof XDomainRequest !== "undefined") { window.console.prototype.log = function(err){ throw new SyntaxError(err); }; window.console.prototype.warn = function(err){ throw new SyntaxError(err); }; window.console.prototype.error = function(err){ throw new SyntaxError(err); }; } }
	try{Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1})}catch(err){console.log(err)}
	try{Event.prototype.stopPropagation||(Event.prototype.stopPropagation=function(){this.cancelBubble=!0})}catch(err){console.log(err)}
	try{"function"!=typeof mapObject&&(window.mapObject=function(e,t){if(null!==e){var n=0;for(var r in e)e.hasOwnProperty(r)&&(t(e[r],r,n),n++);return!0}return console.log("returned object is null",typeof e),!1})}catch(err){console.log(err)}
	try{if(!Element.prototype.addEventListener){var eventListeners=[],addEventListener=function(e,t){var n,r=this;if(n=function(e){e.target=e.srcElement,e.currentTarget=r,e.pageX=event.clientX+document.body.scrollLeft,e.pageY=event.clientY+document.body.scrollTop,t.handleEvent?t.handleEvent(e):t.call(r,e)},"DOMContentLoaded"===e){var o=function(e){"complete"===document.readyState&&n(e)};if(document.attachEvent("onreadystatechange",o),eventListeners.push({object:this,type:e,listener:t,wrapper:o}),"complete"==document.readyState){var i=new Event;i.srcElement=window,o(i)}}else this.attachEvent("on"+e,n),eventListeners.push({object:this,type:e,listener:t,wrapper:n})},removeEventListener=function(e,t){for(var n=0;n<eventListeners.length;){var r=eventListeners[n];if(r.object==this&&r.type==e&&r.listener==t){"DOMContentLoaded"==e?this.detachEvent("onreadystatechange",r.wrapper):this.detachEvent("on"+e,r.wrapper);break}++n}};Element.prototype.addEventListener=addEventListener,Element.prototype.removeEventListener=removeEventListener,HTMLDocument&&(HTMLDocument.prototype.addEventListener=addEventListener,HTMLDocument.prototype.removeEventListener=removeEventListener),Window&&(Window.prototype.addEventListener=addEventListener,Window.prototype.removeEventListener=removeEventListener)}Element.prototype.remove||(Element.prototype.remove=function(){this.parentElement.removeChild(this)},NodeList.prototype.remove=HTMLCollection.prototype.remove=function(){for(var e=0,t=this.length;t>e;e++)this[e]&&this[e].parentElement&&this[e].parentElement.removeChild(this[e])})}catch(err){console.log(err)}"undefined"!=typeof XDomainRequest&&("object"!=typeof window.JSON&&(window.JSON={}),function(){"use strict";function f(e){return 10>e?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,o,i,a,p=gap,u=t[e];switch(u&&"object"==typeof u&&"function"==typeof u.toJSON&&(u=u.toJSON(e)),"function"==typeof rep&&(u=rep.call(t,e,u)),typeof u){case"string":return quote(u);case"number":return isFinite(u)?String(u):"null";case"boolean":case"null":return String(u);case"object":if(!u)return"null";if(gap+=indent,a=[],"[object Array]"===Object.prototype.toString.apply(u)){for(i=u.length,n=0;i>n;n+=1)a[n]=str(n,u)||"null";return o=0===a.length?"[]":gap?"[\n"+gap+a.join(",\n"+gap)+"\n"+p+"]":"["+a.join(",")+"]",gap=p,o}if(rep&&"object"==typeof rep)for(i=rep.length,n=0;i>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,u),o&&a.push(quote(r)+(gap?": ":":")+o));else for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(o=str(r,u),o&&a.push(quote(r)+(gap?": ":":")+o));return o=0===a.length?"{}":gap?"{\n"+gap+a.join(",\n"+gap)+"\n"+p+"}":"{"+a.join(",")+"}",gap=p,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof window.JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},window.JSON.stringify=function(e,t,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof window.JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,window.JSON.parse=function(text,reviver){function walk(e,t){var n,r,o=e[t];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(e,t,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}());
	var _slice=Array.prototype.slice;
	try{_slice.call(document.documentElement)}catch(e){Array.prototype.slice=function(t,e){if(e="undefined"!=typeof e?e:this.length,"[object Array]"===Object.prototype.toString.call(this))return _slice.call(this,t,e);var r,i,c=[],l=this.length,o=t||0;o=o>=0?o:l+o;var a=e?e:l;if(0>e&&(a=l+e),i=a-o,i>0)if(c=new Array(i),this.charAt)for(r=0;i>r;r++)c[r]=this.charAt(o+r);else for(r=0;i>r;r++)c[r]=this[o+r];return c}}
	
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
	
	// defaults
	var apiURL = "https://gateway.competitionlabs.com";
	var cLabs = {
		api: {
			url: apiURL,
			leaderBoardQuery: "/api/v1/:space/contests/:contestId/leaderboard?_limit=100",
			contestQuery: "/api/v1/:space/contests/:id",
			preLoader: apiURL + "/assets/images/preloaders/pre-loader.gif",
			css: {
				standardTheme: apiURL + "/assets/css/widgets/leaderboard.css",
				action: apiURL + "/assets/css/widgets/leaderboard-dark.css"
			}
		},
		xmlns: "http://www.w3.org/2000/svg", // namespaceURI
		xhr: null,
		easing: 'easeInOutQuart', // default animation type
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
	 * Ajax - Used to create asynchronous web applications calls.
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
	 * Method that handles and sends data using XMLHttpRequest
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
	
	var leaderBoardDefaultClass = ".cl-leaderboard-widget";
	var leaderBoard = function( options ){
		
		this.settings = {
			font: null,
			fontColor: null,
			theme: "standardTheme",
			backgroundColor: null,
			pointsBackgroundColor: null,
			contest: null,
			apiURL: apiURL,
			api: cLabs.api
		};
		
		if( typeof options !== "undefined" ){
			for(var opt in options){
				if (options.hasOwnProperty(opt)) {
					this.settings[opt] = options[opt];
				}
			}
		}
		
		if(typeof this.settings.reload === "undefined"){
			this.settings.reload = true;
		}
		this.leaderBoardQuery = (typeof this.settings.leaderBoard === "undefined") ? (this.settings.api.url + this.settings.api.leaderBoardQuery) : this.settings.leaderBoard;
		this.contestQuery = (typeof this.settings.contestQuery === "undefined") ? (this.settings.api.url + this.settings.api.contestQuery) : this.settings.contestQuery;
		this.url = "";
		this.timeout;
		this.dataString = "";
		
		this.layout = function( data , containerString){
			var _this = this;
			
			objectIterator(query(containerString), function(widget){
				if(widget !== null){
					var rewardsSet = (_this.settings.contest !== null && typeof _this.settings.contest.rewards !== "undefined" && _this.settings.contest.rewards.length > 0);
					
					_this.constructLayout(widget, rewardsSet);
					_this.stylingRefresh();
					
					var list = query(widget, ".list"),
						objectSize = sizeof(data);
					if(objectSize > 0) {
						var prizesSet = false;
						
						mapObject(data.data, function (item) {
							if(typeof item.rank !== 'undefined' && typeof item.name !== 'undefined' && typeof item.points !== 'undefined') {
								var li = document.createElement("li"),
									divLeft = document.createElement("div"),
									divCenter = document.createElement("div"),
									divRight = document.createElement("div"),
									divPrizes = document.createElement("div");
								
								divLeft.setAttribute("class", "cl-left cl-position");
								divCenter.setAttribute("class", "cl-left cl-entrant");
								divRight.setAttribute("class", "cl-" + ( rewardsSet ? "left" : "right" ) + " cl-points");
								
								divLeft.innerHTML = item.rank;
								divCenter.innerHTML = (typeof _this.settings.memberRefId === "string" && _this.settings.memberRefId.length > 0 && _this.settings.memberRefId === item.memberRefId) ? "You" : item.name;
								divRight.innerHTML = item.points.toFixed(2);
								
								li.setAttribute("class", "cl-result-list-item");
								li.appendChild(divLeft);
								li.appendChild(divCenter);
								li.appendChild(divRight);
								
								if( rewardsSet ) {
									
									var prize = "";
									mapObject(_this.settings.contest.rewards, function(rew){
										if( rew.rewardRank.indexOf(item.rank) !== -1 ){
											prize = rew.value;
										}
									});
									
									if( prize !== "" ){
										divPrizes.setAttribute("class", "cl-right cl-prizes");
										divPrizes.innerHTML = prize;
										li.appendChild(divPrizes);
										prizesSet = true;
									}
								}
								
								list.appendChild(li);
							}
						});
						
						if( prizesSet ){
							addClass(list, "cl-with-prizes");
						}
						
						query(widget, ".cl-leaderboard-preloader").style.display = "none";
					}
					
					if( objectCount(query(widget, ".list .cl-result-list-item")) === 0 || objectSize === 0 ){
						var li = document.createElement("li");
						
						li.setAttribute("class", "no-data");
						li.innerHTML = "No data available, please come back later";
						
						list.appendChild(li);
					}
				}
			});
		};
		
		this.listHeading = function( rewardsSet ){
			var li = document.createElement("li"),
				divLeft = document.createElement("div"),
				divCenter = document.createElement("div"),
				divRight = document.createElement("div");
			
			li.setAttribute("class", "headers");
			divLeft.setAttribute("class", "cl-left cl-position");
			divCenter.setAttribute("class", "cl-left cl-entrant");
			divRight.setAttribute("class", (rewardsSet) ? "cl-left cl-points" : "cl-right cl-points");
			
			divLeft.innerHTML = "#";
			divCenter.innerHTML = "Player";
			divRight.innerHTML = "Points";
			
			li.appendChild(divLeft);
			li.appendChild(divCenter);
			li.appendChild(divRight);
			
			if( rewardsSet ){
				var divPrizes = document.createElement("div");
				divPrizes.setAttribute("class", "cl-right cl-prizes");
				divPrizes.innerHTML = "Prizes";
				li.appendChild(divPrizes);
			}
			
			return li;
		};
		
		this.constructLayout = function( container, rewardsSet ){
			var _this = this,
				wrapper = document.createElement("div"),
				list = document.createElement("ul"),
				img = document.createElement("img"),
				li = this.listHeading( rewardsSet );
			
			img.alt = "loading";
			img.src = _this.settings.api.preLoader;
			
			wrapper.setAttribute("class", "cl-leaderboard-wrapper");
			img.setAttribute("class", "cl-leaderboard-preloader");
			list.setAttribute("class", "list");
			
			list.appendChild(li);
			wrapper.appendChild(list);
			wrapper.appendChild(img);
			
			container.innerHTML = "";
			
			container.appendChild(wrapper);
		};
		
		this.getData = function( forceRefresh ){
			var _this = this,
				ajax = new cLabs.Ajax();
			
			_this.url = _this.leaderBoardQuery.replace(":space", _this.settings.spaceName).replace(":contestId", _this.settings.contestId);
			
			if(_this.timeout && !_this.settings.reload){
				clearTimeout(_this.timeout);
			}
			
			if(typeof _this.settings.runOnLoad === "undefined" || (typeof _this.settings.runOnLoad === "boolean" && _this.settings.runOnLoad)) {
				var preloader = query(_this.settings.container + " .cl-leaderboard-preloader");
				_this.settings.runOnLoad = true;
				
				if(preloader !== null) {
					preloader.style.display = "block";
				}
				
				var dataObj = {
					url: _this.url,
					type: "GET",
					success: function (data, dataObject, xhr) {
						var json = {};
						if (xhr.status === 200 && _this.dataString !== data) {
							_this.dataString = data;
							json = JSON.parse(data);
							
							_this.layout(json, _this.settings.container);
						}else if(preloader !== null) {
							preloader.style.display = "none";
						}
						
						
						if( _this.settings.reload && typeof forceRefresh === "undefined" ){
							_this.timeout = setTimeout(function(){
								_this.getData();
							}, 5000);
						}
					}
				};
				
				if(typeof _this.settings.apiKey !== "undefined"){
					dataObj.headers = _this.settings.apiKey;
				}
				
				ajax.abort().getData(dataObj);
			}
		};
		
		this.getContestData = function( callback ){
			var _this = this,
				ajax = new cLabs.Ajax();
			
			_this.url = _this.contestQuery.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.contestId);
			
			if(typeof _this.settings.runOnLoad === "undefined" || (typeof _this.settings.runOnLoad === "boolean" && _this.settings.runOnLoad)) {
				var dataObj = {
					url: _this.url,
					type: "GET",
					success: function (data, dataObject, xhr) {
						var json = {};
						if ( xhr.status === 200 ) {
							var json = JSON.parse(data);
							
							if( typeof json.data !== "undefined" ){
								_this.settings.contest = JSON.parse(data).data;
								
								if( typeof callback === "function" ){ callback(_this.settings.contest); }
							}
						}
					}
				};
				
				if(typeof _this.settings.apiKey !== "undefined"){
					dataObj.headers = _this.settings.apiKey;
				}
				
				ajax.abort().getData(dataObj);
			}
		};
		
		this.refresh = function( forceRefresh ){
			var _this = this;
			if(typeof _this.settings.runOnLoad !== "undefined") {
				delete _this.settings.runOnLoad;
			}
			
			if( _this.settings.contest === null ){
				_this.getContestData(function() {
					_this.getData( forceRefresh );
				});
			}else {
				_this.getData(forceRefresh);
			}
		};
		
		this.createStyleSheet = function(widget){
			var _this = this,
				style = document.createElement("style"),
				styleSheetContent = "";
			
			remove(query(widget, "style"));
			
			style.setAttribute("media", "screen");
			style.setAttribute("type", "text/css");
			
			if (_this.settings.font !== null) {
				styleSheetContent += _this.settings.container + " .cl-leaderboard-wrapper{font-family: '" + _this.settings.font + "';}";
			}
			
			if (_this.settings.fontColor !== null) {
				if( _this.settings.theme === "action" ){
					styleSheetContent += _this.settings.container + ' .cl-leaderboard-wrapper *{color:' + _this.settings.fontColor + ';}';
				}else {
					styleSheetContent += _this.settings.container + ' .cl-leaderboard-wrapper{color:' + _this.settings.fontColor + ';}';
				}
			}
			
			if (_this.settings.backgroundColor !== null) {
				if( _this.settings.theme === "action" ){
					styleSheetContent += _this.settings.container + ' .cl-leaderboard-wrapper .list{background-color:' + _this.settings.backgroundColor + ';}';
					styleSheetContent += _this.settings.container + ' .cl-leaderboard-wrapper .cl-right.cl-points::before{border-left-color:' + _this.settings.backgroundColor + ';}';
					styleSheetContent += _this.settings.container + ' .list li:hover{background-color:' + _this.settings.backgroundColor + ' !important;}';
				}else {
					widget.style.backgroundColor = _this.settings.backgroundColor;
					styleSheetContent += _this.settings.container + ' .cl-leaderboard-wrapper{color:' + _this.settings.fontColor + ';}';
				}
			}
			
			if (_this.settings.pointsBackgroundColor !== null) {
				if( _this.settings.theme === "action" ){
					styleSheetContent += _this.settings.container + ' .cl-leaderboard-wrapper .cl-points{background-color:' + _this.settings.pointsBackgroundColor + ';}';
				}
			}
			
			style.appendChild(document.createTextNode(styleSheetContent));
			
			widget.appendChild(style);
		};
		
		this.stylingRefresh = function(){
			var _this = this;
			
			objectIterator(query(_this.settings.container + " .cl-leaderboard-wrapper"), function(widget){
				if(widget !== null) {
					
					_this.createStyleSheet(widget);
					
					if (_this.settings.theme !== null) {
						var link = document.createElement("link"),
							removeCheck = false;
						objectIterator(query("link"), function(link){
							if( link !== null ){
								for(var t in _this.settings.api.css){
									if( _this.settings.api.css[t] === link.href && _this.settings.theme !== t ){
										remove(link);
										removeCheck = true;
									}
								}
							}
						});
						
						if(removeCheck) {
							link.setAttribute("rel", "stylesheet");
							link.setAttribute("type", "text/css");
							link.setAttribute("href", _this.settings.api.css[_this.settings.theme]);
							
							document.body.appendChild(link);
						}
					}
				}
			});
		};
		
		this.init = function() {
			var _this = this,
				link = document.createElement("link");
			
			if( typeof _this.settings !== "undefined" ) {
				
				if(typeof _this.settings.container === "undefined" || (typeof _this.settings.container !== "undefined" && _this.settings.container.length === 0)){
					_this.settings.container = leaderBoardDefaultClass;
				}
				
				var obj = query(_this.settings.container);
				
				if( obj !== null && typeof obj._activeInstance === "undefined" ) {
					obj._activeInstance = _this;
					
					var exists = false;
					objectIterator(query("link"), function(link){
						if( link !== null && _this.settings.api.css[_this.settings.theme] === link.href ){
							exists = true;
						}
					});
					
					if( !exists ) {
						link.setAttribute("rel", "stylesheet");
						link.setAttribute("type", "text/css");
						link.setAttribute("href", _this.settings.api.css[_this.settings.theme]);
						
						document.body.appendChild(link);
					}
					
					_this.getContestData(function() {
						_this.getData();
					});
				}else if( obj !== null ){
					console.warn("[CompetitionLabs Leaderboard]: container not found ");
				}else{
					console.warn("[CompetitionLabs Leaderboard]: Instance already exists for this obj => " + leaderBoardDefaultClass);
					_this.refresh( true );
				}
			}
		};
		
		this.init();
	};
	
	if(typeof window._clOptions !== "undefined"){
		mapObject(window._clOptions, function(opt, key){
			if(typeof window._clOptions[key].obj === "undefined") {
				window._clOptions[key].obj = new leaderBoard(opt);
			}
		});
	}
	
	if(typeof window._clLeaderBoard === "undefined") {
		window._clLeaderBoard = leaderBoard;
	}else{
		console.warn("window._clLeaderBoard is already defined");
	}
	
})();
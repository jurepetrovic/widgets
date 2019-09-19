(function(){
	var cLabs = {
		feedExtraLoading: false, // feed extra results are loading (true/false)
		classSelector: /^\.([\w-]+)$/, // class string expression check
		idSelector: /^#[\w\d\-\_\&\!\@\*]+$/, // ID string expression check
		tagSelector: /^[\w-]+$/ // TAG string expression check
	};
	var trim = function( string ){
		return string.replace(/^\s+|\s+$/g, '');
	};
	var isElement = function(o){
		return (
			typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
				o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
		);
	};
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
	
	var ajax = new cLabs.Ajax(),
		leaderboard = new window._clLeaderBoard({
			spaceName: "",
			competitionId: "",
			contestId: "",
			apiKey: {},
			font: "Helvetica",
			theme: "standardTheme",
			container: ".cl-leaderboard",
			api: {
				url: "",
				leaderBoardQuery: "data/leaderboard-data.json",
				contestQuery: "data/contest-data.json",
				preLoader: "images/pre-loader.gif",
				css: {
					standardTheme: "css/leaderboard.css"
				}
			},
			autoStart: false
		});
	
	ajax.getData({
		type: "GET",
		url: "data/competition-list-data.json",
		success: function(response, dataObj, xhr){
			var json = JSON.parse(response);
			
			if( json.data.length > 0 ){
				query(".simple-widget-icon-container").style.display = "block";
				leaderboard.init();
				
				query(".simple-widget-icon").addEventListener("click", function(event){
					query(".cl-leaderboard").style.display = "block";
				});
			}
		}
	});
})();
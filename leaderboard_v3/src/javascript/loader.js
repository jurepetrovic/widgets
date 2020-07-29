/*
 COMPETITION LABS LTD v1.0.0
 (c) 2015-2020 Aleksandr Bernotas
 License: www.competitionlabs.com/terms-of-service

 Centralised loader script that is responsible for loading/handling all your product/environment specific scripts
 in one place. Allows a better control over your vast product range, centralising all your business related configurations
 in one place:
 - load all your scripts/styles/configurations/presets from one script
 - control when and how the scripts get initialised
 - restrict loading per product
*/
(function() {
  'use strict';

  var classSelector = /^\.([\w-]+)$/; // class string expression check
  var idSelector = /^#[\w\d\-\_\&\!\@\*]+$/; // ID string expression check
  var tagSelector = /^[\w-]+$/; // TAG string expression check

  try{"function"!=typeof mapObject&&(window.mapObject=function(e,t){if(null!==e){var n=0;for(var r in e)e.hasOwnProperty(r)&&(t(e[r],r,n),n++);return!0}return console.log("returned object is null",typeof e),!1})}catch(err){console.log(err)}
  var trim = function( string ){return string.replace(/^\s+|\s+$/g, '');};
  var isElement = function(o){return (typeof HTMLElement === "object" ? o instanceof HTMLElement : /*DOM2*/ o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string");};
  function sizeof(obj) {/*!Object.keys(item.location).length // IE9+*/var size = 0, key;for (key in obj) {if (obj.hasOwnProperty(key)) size++;}if(size === 0 && isElement(obj)){size = 1;}return size;}
  var query = function( doc, selector ) {var result;var tmpDoc = doc, tmpSelector = selector; /* used for debug only*/if (typeof doc === 'string' && selector === undefined) {selector = doc;doc = document;}try {if(doc !== null) {selector = trim(selector); /**/if (selector.match(classSelector)) {result = doc.getElementsByClassName(selector.replace(".", ""));} else if (selector.match(idSelector)) {result = document.getElementById(selector.replace("#", ""));} else if (selector.match(tagSelector)) {result = doc.getElementsByTagName(selector);} else {result = doc.querySelectorAll(selector);}}if (result !== null && result !== undefined && result.nodeType) {return result;} else if (result !== null && result !== undefined && result.length === 1) {return result[0];} else if (result !== null && result !== undefined && result.length > 0) {return Array.prototype.slice.call(result);} else {return null;}}catch(e){console.log(e);console.log(tmpSelector);console.log(tmpDoc);console.log(doc, selector);console.trace();/*console.warn(_stackTrace());*/}};

  /**
   * Ajax method
   *
   * @class Ajax
   * @constructor
   */
  var Ajax = function() {this.xhr = new XMLHttpRequest();};
  Ajax.prototype.createCORSRequest = function(method, url) {var obj = this;if ("withCredentials" in obj.xhr) {/* Most browsers.*/obj.xhr.open(method, url, true);} else if (typeof XDomainRequest != "undefined") {/* IE8 & IE9*/obj.xhr = new XDomainRequest();url = (url.indexOf("https") > -1 && location.protocol !== 'https:') ? url.replace('https', 'http') : url;obj.xhr.open(method, url);} else {/* CORS not supported.*/obj.xhr = null;}return obj.xhr;};
  Ajax.prototype.abort = function() {if( this.xhr && this.xhr.readyState != undefined && this.xhr.readyState != 4 ){this.xhr.abort();}return this;};

  /**
   * Retrieves data from a URL without page refresh
   *
   * @method getData
   * @param {Object} configuration object
   *  - object contains: HTTP method "type: POST, GET", url: to send the request to, data: {object}
   * @return {String} in success object
   */
  Ajax.prototype.getData = function ( data ) {var obj = this;try{data.type = (data.type !== undefined && typeof data.type === 'string' && data.type.length > 0) ? data.type : 'POST';data.data           = (data.data !== undefined && typeof data.data === 'object') ? data.data : {};data.url            = (data.url !== undefined && typeof data.url === 'string' && data.url.length > 0) ? data.url : '';data.success        = (data.success !== undefined) ? data.success : (function(){});data.error          = (data.error !== undefined) ? data.error : (function(){});data.headers        = (data.headers !== undefined) ? data.headers : {};data.extraCallback  = (data.extraCallback !== undefined) ? data.extraCallback : (function(){});/* cross browser CORS support*/obj.xhr = this.createCORSRequest(data.type, data.url);obj.xhr.onload = function() {data.extraCallback(data, obj.xhr);data.success(obj.xhr.responseText, data, obj.xhr);};obj.xhr.onerror = function () {data.error(obj.xhr.status);};if (typeof XDomainRequest === "undefined") {if( sizeof(data.headers) > 0 ){var item;for( item in data.headers ){obj.xhr.setRequestHeader(item, data.headers[item]);}}else if ( (data.type === 'POST' || data.type === 'PUT' || data.type === 'DELETE') && sizeof(data.headers) === 0 ) {obj.xhr.setRequestHeader("Content-Type", "application/json");} else {obj.xhr.setRequestHeader("Content-Type", "text/plain");}}obj.xhr.send( JSON.stringify(data.data) );return obj.xhr;}catch(err){console.log(err);}};
  var stringContains = function (str, partial){try{return (str.indexOf(partial) > -1);}catch(e){return false;}};


  var loadScript = function(){

    // generic/default settings
    if( typeof window._CLLBV3Opt === "undefined" ) {
      window._CLLBV3Opt = {
        bindContainer: document.body,
        spaceName: "my_space_name",
        autoStart: false,
        memberId: "",
        gameId: "my_product_id",
        enforceGameLookup: true,
        apiKey: "",
        resources: [],
        uri: {
          gatewayDomain: "https://gateway.competitionlabs.com"
        },
        language: "en",
        currency: ""
      };
    }

    this.settings = {
      apiKey: "", // default API key
      spaceName: "my_space_name", // default space name
      enforceGameLookup: true, // default enforce game lookup
      language: "en", // default language setting
      currency: "", // default currency setting

      // default script that will be loaded
      defaultScript: "https://s3-eu-west-1.amazonaws.com/demo.competitionlabs.com/_widgets/leaderboard_v3/javascript/leaderboard.v3-selfinit.js?v=" + new Date().getTime(),

      // default stylesheet resources that will be loaded
      defaultResources: [
        "https://s3-eu-west-1.amazonaws.com/demo.competitionlabs.com/_widgets/leaderboard_v3/css/fonts.css?t=" + new Date().getTime(),
        "https://s3-eu-west-1.amazonaws.com/demo.competitionlabs.com/_widgets/leaderboard_v3/css/style.css?t=" + new Date().getTime()
      ],

      // forces widget to load if no specific product defined
      loadWidgetIfNoProductsFound: true,

      // product specific configuration that will be loaded overwriting the default scripts and resources
      products: {
        "my_product_id": {
          // script: "",
          // resources: [],
          onBeforeLoad: function( instance, options, callback ){ // your custom logic before the widget gets initialised/rendered
            if( typeof callback === "function" ) callback();
          }
        }
      }
    };

    /**
     * Load in external scripts
     * @param options
     * @param callback
     * @param errorCallback
     */
    this.loadScript = function(options, callback, errorCallback){
      var _this = this,
        script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", ( (typeof options.script === "string" && options.script.length > 0) ? options.script : _this.settings.defaultScript ));


      script.onload = function(){
        callback();
      };

      script.onerror = function(e){
        console.log("widget not loaded");

        if( typeof errorCallback !== "undefined" ){
          errorCallback();
        }
      };

      document.body.appendChild(script);
    };

    /**
     * Initialises widget with global and custom parameters
     * @param product
     */
    this.initialiseWidget = function(product){
      var _this = this;

      _this.loadScript(product, function(){
        if( typeof window._clLeaderBoardV3SelfInit !== "undefined" ){

          var settings = window._CLLBV3Opt;
          settings.resources = (typeof product.resources !== "undefined" ? product.resources : _this.settings.defaultResources);

          if( typeof settings.apiKey === "undefined" ){ settings.apiKey = _this.settings.apiKey }
          if( typeof settings.spaceName === "undefined" ){ settings.spaceName = _this.settings.spaceName }
          if( typeof settings.enforceGameLookup === "undefined" ){ settings.enforceGameLookup = _this.settings.enforceGameLookup }
          if( typeof settings.language === "undefined" ){ settings.language = _this.settings.language }
          if( typeof settings.currency === "undefined" ){ settings.currency = _this.settings.currency }

          window._clLeaderBoardV3 = new window._clLeaderBoardV3SelfInit( settings );


          if( typeof product.onBeforeLoad === "function" ){
            product.onBeforeLoad(_this, product, function(){
              window._clLeaderBoardV3.init();
            });
          }else{
            window._clLeaderBoardV3.init();
          }


        }else{
          console.log("widget does not exist");
        }
      });
    };

    this.init = function(){
      var _this = this;

      if( typeof window._CLLBV3Opt !== "undefined" && typeof window._CLLBV3Opt.gameId === "string" ){

        var found = false;
        mapObject(_this.settings.products, function(product, key){
          if( key === window._CLLBV3Opt.gameId && !found ){
            found = true;
            _this.initialiseWidget(product);
          }
        });

        // if not found and loadWidgetIfNoProductsFound is true initialise widget
        if( !found && _this.settings.loadWidgetIfNoProductsFound ){
          _this.initialiseWidget({
            script: _this.settings.defaultScript,
            resources: _this.settings.defaultResources
          });
        }

      }
    };

  };

  new loadScript().init();
})();

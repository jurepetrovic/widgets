/*
 COMPETITION LABS LTD v1.0.5
 (c) 2015-2020 Aleksandr Bernotas
 License: www.competitionlabs.com/terms-of-service
*/

import './polyfills';
import './modules/setTimeoutGlobal';
import moment from 'moment';
import Identicon from 'identicon.js';
import jsSHA from 'jssha';
import cLabs from './modules/cLabs';
import dragElement from './modules/dragElement';
import {
	sizeof,
	remove,
	objectIterator,
	addClass,
	removeClass,
	hasClass,
	stringContains,
	stripHtml,
	closest,
	isMobileTablet,
	appendNext,
	formatNumberLeadingZeros,
	query,
	mergeObjects
} from './utils';

(function() {
	'use strict';

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
			//console.error("aborting Ajax", _this.xhr.readyState, _this.xhr);
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
				diff = 0,
				label = "",
				date = "",
				dateObj = "",
				inverse = false;

			if( _this.settings.lbWidget.settings.competition.activeContest !== null ) {
				diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledStart).diff(moment());
				label = _this.settings.lbWidget.settings.translation.miniLeaderboard.startsIn;
				date = _this.settings.lbWidget.formatDateTime(moment.duration(diff));
				dateObj = _this.settings.lbWidget.formatDateTime(moment.duration(diff));
				inverse = false;

				if (diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0) {
					label = _this.settings.lbWidget.settings.translation.miniLeaderboard.starting;
					date = "";
				} else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode > 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode < 3) {
					diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledEnd).diff(moment());
					dateObj = _this.settings.lbWidget.formatDateTime(moment.duration(diff));
					label = _this.settings.lbWidget.formatDateTime(moment.duration(diff));
					date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
					inverse = true;
				} else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode === 3) {
					label = _this.settings.lbWidget.settings.translation.miniLeaderboard.finishing;
					date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
					inverse = true;
				} else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode >= 4) {
					label = _this.settings.lbWidget.settings.translation.miniLeaderboard.finished;
					date = _this.settings.lbWidget.settings.translation.miniLeaderboard.rank;
					inverse = true;
				}
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
			preLoader: {
				preLoaderActive: false,
				preLoaderlastAttempt: null,
				preloaderCallbackRecovery: function(){}
			},
			achievement: {
				container: null,
				detailsContainer: null
			},
			reward: {
				container: null,
				detailsContainer: null
			},
			messages: {
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

			if( _this.settings.lbWidget.settings.messages.enable ) {
				navigationItemInbox.setAttribute("class", "cl-main-widget-navigation-inbox");
				navigationItemInboxIcon.setAttribute("class", "cl-main-widget-navigation-inbox-icon cl-main-navigation-item");
				navigationItemInbox.appendChild(navigationItemInboxIcon);
				navigationItems.appendChild(navigationItemInbox);
			}

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
			sectionTournamentBackAction.setAttribute("class", "cl-main-widget-tournaments-back-btn");
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
				
				sectionInboxDetailsContainer = document.createElement("div"),
				sectionInboxDetailsHeader = document.createElement("div"),
				sectionInboxDetailsHeaderLabel = document.createElement("div"),
				sectionInboxDetailsHeaderDate = document.createElement("div"),
				sectionInboxDetailsBackBtn = document.createElement("a"),
				sectionInboxDetailsBodyContainer = document.createElement("div"),
				sectionInboxDetailsBody = document.createElement("div");
			
			
			
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
			sectionInboxDetailsContainer.setAttribute("class", "cl-main-widget-inbox-details-container");
			sectionInboxDetailsHeader.setAttribute("class", "cl-main-widget-inbox-details-header");
			sectionInboxDetailsHeaderLabel.setAttribute("class", "cl-main-widget-inbox-details-header-label");
			sectionInboxDetailsHeaderDate.setAttribute("class", "cl-main-widget-inbox-details-header-date");
			sectionInboxDetailsBackBtn.setAttribute("class", "cl-main-widget-inbox-details-back-btn");
			sectionInboxDetailsBodyContainer.setAttribute("class", "cl-main-widget-inbox-details-body-container");
			sectionInboxDetailsBody.setAttribute("class", "cl-main-widget-inbox-details-body");
			
			
			sectionInboxHeaderLabel.innerHTML = _this.settings.lbWidget.settings.translation.messages.label;
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


			sectionInboxDetailsHeader.appendChild(sectionInboxDetailsHeaderLabel);
			sectionInboxDetailsHeader.appendChild(sectionInboxDetailsHeaderDate);
			sectionInboxDetailsContainer.appendChild(sectionInboxDetailsHeader);
			sectionInboxDetailsContainer.appendChild(sectionInboxDetailsBackBtn);
			sectionInboxDetailsBodyContainer.appendChild(sectionInboxDetailsBody);
			sectionInboxDetailsContainer.appendChild(sectionInboxDetailsBodyContainer);

			
			sectionInboxFooter.appendChild(sectionInboxFooterContent);
			
			sectionInbox.appendChild(sectionInboxHeader);
			sectionInbox.appendChild(sectionInboxDetails);
			sectionInbox.appendChild(sectionInboxList);
			sectionInbox.appendChild(sectionInboxFooter);
			sectionInbox.appendChild(sectionInboxDetailsContainer);

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
					memberName = (memberFound) ? _this.settings.lbWidget.settings.translation.leaderboard.you : lb.name,
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
						rewardResponse.push( _this.settings.lbWidget.settings.rewards.rewardFormatter(reward) );
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
			
			objectIterator(query(_this.settings.leaderboard.container, ".cl-lb-row"), function(obj){
				var rank = parseInt(obj.dataset.rank);
				if( cleanupRankCheck.indexOf( rank ) === -1 && rank > _this.settings.leaderboard.defaultEmptyList ){
					remove(obj);
				}
			});
			
			mapObject(remainingResults, function( lb ){
				var count = 0,
					icon = _this.settings.lbWidget.populateIdenticonBase64Image(lb.memberId),
					memberFound = (_this.settings.lbWidget.settings.memberId === lb.memberId || _this.settings.lbWidget.settings.memberId === lb.memberRefId),
					memberName = (memberFound) ? _this.settings.lbWidget.settings.translation.leaderboard.you : lb.name,
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

			mainLabel.innerHTML = (_this.settings.lbWidget.settings.competition.activeContest !== null) ? _this.settings.lbWidget.settings.competition.activeContest.label : _this.settings.lbWidget.settings.translation.tournaments.noAvailableCompetitions;
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

		//cleanup/recover activity
		this.preLoaderRerun = function(){
			var _this = this;

			if( _this.settings.preLoader.preLoaderActive && _this.settings.preLoader.preloaderCallbackRecovery !== null
				&& _this.settings.preLoader.preLoaderlastAttempt !== null && typeof _this.settings.preLoader.preLoaderlastAttempt === "number"
				&& (_this.settings.preLoader.preLoaderlastAttempt+8000) < new Date().getTime() ){

				_this.settings.preLoader.preloaderCallbackRecovery();
			}
		};

		this.preloader = function(){
			var _this = this,
				preLoader = query(_this.settings.section, ".cl-main-widget-pre-loader"),
				content = query(_this.settings.section, ".cl-main-widget-pre-loader-content");

			return {
				show: function( callback ){
					_this.settings.preLoader.preLoaderActive = true;
					_this.settings.preLoader.preLoaderlastAttempt = new Date().getTime();
					preLoader.style.display = "block";
					setTimeout(function(){
						preLoader.style.opacity = 1;
					}, 20);

					if( _this.settings.preLoader.preloaderCallbackRecovery === null && typeof callback === "function" ) {
						_this.settings.preLoader.preloaderCallbackRecovery = callback;
					}

					callback();
				},
				hide: function(){
					_this.settings.preLoader.preLoaderActive = false;
					_this.settings.preLoader.preLoaderlastAttempt = null;
					preLoader.style.opacity = 0;

					if( _this.settings.preLoader.preloaderCallbackRecovery !== null ){
						_this.settings.preLoader.preloaderCallbackRecovery = null;
					}

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
				_this.settings.messages.container = query(_this.settings.container, ".cl-main-widget-section-inbox");
				_this.settings.messages.detailsContainer = query(_this.settings.container, ".cl-main-widget-inbox-details-container");

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

			_this.settings.preLoader.preLoaderActive = false;
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
				evt.preventDefault();
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
			};
		};

		// this.checkLeaderboardScrollContainer = function(){
		// 	var _this = this,
		// 		lbScrollContainer = query(_this.settings.leaderboard.container, ".cl-main-widget-lb-leaderboard-body");
		//
		// 	if( scrollEnabled(lbScrollContainer) ){
		// 		addClass(lbScrollContainer, "cl-element-scrollable");
		// 	}else{
		// 		removeClass(lbScrollContainer, "cl-element-scrollable");
		// 	}
		// };
		
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

			image.innerHTML = "";
			label.innerHTML = ( _this.settings.lbWidget.settings.competition.activeContest.label.length > 0 ) ? _this.settings.lbWidget.settings.competition.activeContest.label : _this.settings.lbWidget.settings.competition.activeCompetition.label;
			body.innerHTML = ( _this.settings.lbWidget.settings.competition.activeContest.description.length > 0 ) ? _this.settings.lbWidget.settings.competition.activeContest.description : _this.settings.lbWidget.settings.competition.activeCompetition.description;
			_this.competitionDetailsOptInButtonState();
			
			_this.settings.detailsContainer.style.display = "block";
			_this.settings.headerDate.style.display = "none";

			if( _this.settings.lbWidget.settings.competition.extractImageHeader ) {
				objectIterator(query(body, "img"), function (img, key, count) {
					if (count === 0) {
						var newImg = img.cloneNode(true);
						image.appendChild(newImg);

						remove(img);
					}
				});
			}
			
			setTimeout(function(){
				addClass(_this.settings.detailsContainer, "cl-show");
				
				if(typeof callback === "function") callback();
			}, 50);
		};

		this.loadCompetitionList = function( callback, ajaxInstance ){
			var _this = this,
				listResContainer = query(_this.settings.tournamentListContainer, ".cl-main-widget-tournaments-list-body-res"),
				preLoader = _this.preloader();

			preLoader.show(function() {
				_this.settings.lbWidget.checkForAvailableCompetitions(function () {
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
			});
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

			image.innerHTML = "";

			label.innerHTML = data.data.name;
			body.innerHTML = data.data.description;

			if( _this.settings.lbWidget.settings.achievements.extractImageHeader ) {
				var imageLookup = query(body, "img");
				objectIterator(imageLookup, function (img, key, count) {
					if (count === 0) {
						var newImg = img.cloneNode(true);
						image.appendChild(newImg);

						remove(img);
					}
				});
			}

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
			value.innerHTML = _this.settings.lbWidget.settings.rewards.rewardFormatter(data.data.reward);
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
				image.alt = _this.settings.lbWidget.settings.rewards.rewardFormatter(data.data.reward);

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

		this.loadMessageDetails = function( data, callback ){
			var _this = this,
				label = query(_this.settings.messages.detailsContainer, ".cl-main-widget-inbox-details-header-label"),
				body = query(_this.settings.messages.detailsContainer, ".cl-main-widget-inbox-details-body");

			label.innerHTML = data.data.subject;
			body.innerHTML = data.data.body;

			_this.settings.messages.detailsContainer.style.display = "block";
			setTimeout(function(){
				addClass(_this.settings.messages.detailsContainer, "cl-show");

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

		this.hideMessageDetails = function( callback ){
			var _this = this;

			removeClass(_this.settings.messages.detailsContainer, "cl-show");
			setTimeout(function(){
				_this.settings.messages.detailsContainer.style.display = "none";

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
						bar.style.width = "100%";
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
			var labelText = stripHtml(rew.subject);
			var descriptionText = stripHtml(rew.body);

			if( typeof rew.prize !== "undefined" ) {
				listItem.dataset.rewardId = rew.prize.id;
				labelText = stripHtml( rew.subject + " - " + rew.prize.reward.rewardName + " (" + _this.settings.lbWidget.settings.rewards.rewardFormatter(rew.prize.reward) + ")" );
				descriptionText = stripHtml( (typeof rew.prize.reward.description !== "undefined" && rew.prize.reward.description.length > 0) ? rew.prize.reward.description : rew.body );
			}

			label.innerHTML = (labelText.length > 80) ? (labelText.substr(0, 80) + "...") : labelText;
			description.innerHTML = (descriptionText.length > 200) ? (descriptionText.substr(0, 200) + "...") : descriptionText;

			detailsWrapper.appendChild(label);
			detailsWrapper.appendChild(description);
			detailsContainer.appendChild(detailsWrapper);
			listItem.appendChild(detailsContainer);

			return listItem;
		};

		this.messageItem = function( inbox ){
			var _this = this,
				listItem = document.createElement("div"),
				detailsContainer = document.createElement("div"),
				detailsWrapper = document.createElement("div"),
				label = document.createElement("div"),
				description = document.createElement("div"),
				content = stripHtml(inbox.body);

			listItem.setAttribute("class", "cl-inbox-list-item cl-inbox-" + inbox.id);
			detailsContainer.setAttribute("class", "cl-inbox-list-details-cont");
			detailsWrapper.setAttribute("class", "cl-inbox-list-details-wrap");
			label.setAttribute("class", "cl-inbox-list-details-label");
			description.setAttribute("class", "cl-inbox-list-details-description");

			listItem.dataset.id = inbox.id;
			label.innerHTML = (inbox.subject.length > 36) ? inbox.subject.substr(0, 36) + "..." : inbox.subject;
			description.innerHTML = (content.length > 60) ? content.substr(0, 60) + "..." : content;

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

		this.messagesListLayout = function(rewards, availableRewards, expiredRewards){
			var _this = this,
				messageList = query(_this.settings.section, ".cl-main-widget-section-inbox .cl-main-widget-inbox-list-body-res");

			messageList.innerHTML = "";

			mapObject(_this.settings.lbWidget.settings.messages.messages, function(inboxItem, key, count){
				var listItem = _this.messageItem(inboxItem);
				messageList.appendChild(listItem);
			});
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

		this.loadMessages = function( callback ){
			var _this = this;

			_this.settings.lbWidget.checkForAvailableMessages(function( rewards, availableRewards, expiredRewards ){
				_this.messagesListLayout(rewards, availableRewards, expiredRewards);

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

					preLoader.show(function() {

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

								_this.loadMessages(function () {
									var inboxContainer = query(_this.settings.container, ".cl-main-widget-section-container .cl-main-widget-section-inbox");

									inboxContainer.style.display = "block";
									changeInterval = setTimeout(function () {
										addClass(inboxContainer, "cl-main-active-section");
									}, 30);

									preLoader.hide();

									_this.settings.navigationSwitchInProgress = false;
								});

							}
						}, 250);

						addClass(target.parentNode, "cl-active-nav");
					});
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
				refreshIntervalMillis: 10000,
				extractImageHeader: true // will extract the first found image inside the body tag and move it on top
			},
			achievements: {
				list: [],
				availableRewards: [],
				rewards: [],
				expiredRewards: [],
				extractImageHeader: true // will extract the first found image inside the body tag and move it on top
			},
			rewards: {
				availableRewards: [],
				rewards: [],
				expiredRewards: [],
				rewardFormatter: function(reward) {
					var defaultRewardValue = reward.value;

					if( typeof reward.unitOfMeasure !== "undefined" && typeof reward.unitOfMeasure.symbol !== "undefined" && reward.unitOfMeasure.symbol !== null ){
						defaultRewardValue = reward.unitOfMeasure.symbol + reward.value;
					}

					return defaultRewardValue
				}
			},
			messages: {
				enable: true,
				messages: []
			},
			tournaments: {
				activeCompetitionId: null,
				readyCompetitions: [], // statusCode 3
				activeCompetitions: [], // statusCode 5
				finishedCompetitions: [] // statusCode 7
			},
			leaderboard: {
				fullLeaderboardSize: 100,
				refreshIntervalMillis: 3000,
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
				messageById: "/api/v1/:space/members/reference/:id/messages/:messageId",

				memberReward: "/api/v1/:space/members/reference/:id/award/:awardId",
				memberRewardClaim: "/api/v1/:space/members/reference/:id/award/:awardId/award",

				memberCompetitions: "/api/v1/:space/members/reference/:id/competitions",
				memberCompetitionById: "/api/v1/:space/members/reference/:id/competition/:competitionId",
				memberCompetitionOptIn: "/api/v1/:space/members/reference/:id/competition/:competitionId/optin",
				memberCompetitionOptInCheck: "/api/v1/:space/members/reference/:id/competition/:competitionId/optin-check",

				translationPath: "" //../i18n/translation_:language.json
			},
			loadTranslations: true,
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
					registered: "Registered",
					noAvailableCompetitions: "No available competition"
				},
				leaderboard: {
					rank: "Rank",
					name: "Name",
					points: "Points",
					prize: "Prize",
					you: "You"
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
				messages: {
					label: "Messages"
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

		this.populateIdenticonBase64Image = function( str ) {
			if( str.length > 0 ) {
				var shaObj = new jsSHA("SHA-512", "TEXT");
				shaObj.update(str);
				var hash = shaObj.getHash("HEX", 1);
				var	data = new Identicon(hash, {
					background: [255, 255, 255, 255],         // rgba white
					margin: 0.1,                              // 20% margin
					size: 22,                                // 420px square
					format: 'svg'                             // use SVG instead of PNG
				}).toString();

				var icon = 'data:image/svg+xml;base64,' + data;

				return icon;
			} else {
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
		
		var checkAchievementsAjax = new cLabs.Ajax();
		this.checkForAvailableAchievements = function( callback ){
			var _this = this,
				url = _this.settings.uri.achievements.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId),
				filters = [
					"_limit=100",
					"_include=rewards",
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
						
						_this.settings.achievements.list = [];
						
						mapObject(jsonForAll.data, function(ach){
							_this.settings.achievements.list.push(ach);
						});
						
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
											_this.settings.achievements.list.push(ach);
										});
										
										if (typeof callback === "function") callback(_this.settings.achievements.list);
										
									} else {
										_this.log("failed to checkForAvailableAchievements " + response);
									}
								}
							});
						}else{
							if (typeof callback === "function") callback( jsonForAll.data );
						}
					}else{
						_this.log("failed to checkForAvailableAchievements " + response);
					}
				}
			});
		};

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

		var getMessageAjax = new cLabs.Ajax();
		this.getMessage = function( messageId, callback ){
			var _this = this;

			getMessageAjax.abort().getData({
				url: _this.settings.uri.gatewayDomain + _this.settings.uri.messageById.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId).replace(":messageId", messageId),
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

		var checkForAvailableMessagesAjax = new cLabs.Ajax();
		this.checkForAvailableMessages = function( callback ){
			var _this = this,
				url = _this.settings.uri.messages.replace(":space", _this.settings.spaceName).replace(":id", _this.settings.memberId),
				date = new Date();

			date.setDate(date.getMonth()-1);

			var createdDateFilter = date.getFullYear() + "-" + formatNumberLeadingZeros((date.getMonth()+1), 2) + "-" + formatNumberLeadingZeros(date.getDate(), 2);

			checkForAvailableMessagesAjax.abort().getData({
				type: "GET",
				url: _this.settings.uri.gatewayDomain + url + "?_sortByFields=created:desc&_hasNoValuesFor=prize&_limit=100&created>==" + createdDateFilter,
				headers: {
					"X-API-KEY": _this.settings.apiKey
				},
				success: function(response, dataObj, xhr){
					if( xhr.status === 200 ){
						var jsonForAll = JSON.parse(response);

						_this.settings.messages.messages = [];

						mapObject(jsonForAll.data, function(message){
							_this.settings.messages.messages.push(message);
						});

						if (typeof callback === "function") callback(_this.settings.messages.messages);

					}else{
						_this.log("failed to checkForAvailableMessages " + response);
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
					}
				}
			});
		};

		this.loadWidgetTranslations = function( callback ){
			var _this = this;

			if( typeof _this.settings.uri.translationPath === "string" && _this.settings.uri.translationPath.length > 0 && _this.settings.loadTranslations ) {
				_this.settings.globalAjax.abort().getData({
					type: "GET",
					url: _this.settings.uri.gatewayDomain + _this.settings.uri.translationPath.replace(":language", _this.settings.language),
					headers: {
						"X-API-KEY": _this.settings.apiKey
					},
					success: function (response, dataObj, xhr) {
						if (xhr.status === 200) {
							var json = JSON.parse(response);

							_this.settings.translation = mergeObjects(_this.settings.translation, json);

							callback();

						} else {
							_this.log("no translation foound " + response);

							callback();
						}
					}
				});
			}else{
				callback();
			}
		};
		
		this.startup = function(){
			var _this = this;

			_this.settings.miniScoreBoard.initLayout(function(){
				_this.settings.miniScoreBoard.settings.active = true;
				_this.activeCompetitionDataRefresh();

				if( _this.settings.enableNotifications ) {
					_this.settings.notifications.init();
				}

				_this.cleanup();
			});
		};

		var _cleanupInstance;
		this.cleanup = function(){
			var _this = this;

			if( _cleanupInstance ){
				clearTimeout(_cleanupInstance);
			}

			_cleanupInstance = setTimeout(function(){
				_this.settings.mainWidget.preLoaderRerun();

				_this.cleanup();
			}, 3000);
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

				// messages details back button
			}else if( hasClass(el, "cl-main-widget-inbox-details-back-btn") ){
				_this.settings.mainWidget.hideMessageDetails(function(){
				});

				// load rewards details
			}else if( hasClass(el, "cl-rew-list-item") || closest(el, ".cl-rew-list-item") !== null ){
				var rewardId = (hasClass(el, "cl-rew-list-item")) ? el.dataset.rewardId : closest(el, ".cl-rew-list-item").dataset.rewardId;
				_this.getReward(rewardId, function(data){
					_this.settings.mainWidget.loadRewardDetails(data, function(){
					});
				});

				// load inbox details
			}else if( hasClass(el, "cl-inbox-list-item") || closest(el, ".cl-inbox-list-item") !== null ){
				var messageId = (hasClass(el, "cl-inbox-list-item")) ? el.dataset.rewardId : closest(el, ".cl-inbox-list-item").dataset.id;
				_this.getMessage(messageId, function(data){
					_this.settings.mainWidget.loadMessageDetails(data, function(){
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

				preLoader.show(function(){
					_this.settings.mainWidget.settings.active = true;
					_this.settings.tournaments.activeCompetitionId = tournamentId;
					_this.activeCompetitionDataRefresh(function(){
						_this.settings.mainWidget.hideCompetitionList(function(){
							preLoader.hide();
						});
					});
				});


				// hide competition list view
			}else if( hasClass(el, "cl-main-widget-tournaments-back-btn") ){
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
			_this.settings.mainWidget.settings.preLoader.preLoaderActive = false;
		};

		this.isMobile = function(){
			return isMobileTablet();
		};
		
		this.init = function(){
			var _this = this;

			_this.loadStylesheet(function(){
				_this.loadMember(function( member ){
					_this.loadWidgetTranslations(function() {

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

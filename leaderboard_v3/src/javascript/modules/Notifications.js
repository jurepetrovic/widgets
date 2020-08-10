import { Messaging } from './Messaging';
import removeClass from '../utils/removeClass';
import query from '../utils/query';
import stripHtml from '../utils/stripHtml';
import addClass from '../utils/addClass';

export const Notifications = function (options) {
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

  if (typeof options !== 'undefined') {
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        this.settings[opt] = options[opt];
      }
    }
  }

  this.layoutWrapper = function () {
    var wrapper = document.createElement('div');
    var iconWrapper = document.createElement('div');
    var icon = document.createElement('div');

    var informationWrapper = document.createElement('div');
    var informationTopWrapper = document.createElement('div');
    var informationDetailsContainer = document.createElement('div');
    var informationDetailsLabel = document.createElement('div');
    var informationDetailsDescription = document.createElement('div');
    var informationWrapperClose = document.createElement('div');
    var informationClose = document.createElement('a');

    wrapper.setAttribute('class', 'cl-widget-notif-wrapper');
    iconWrapper.setAttribute('class', 'cl-widget-notif-icon-wrapper');
    icon.setAttribute('class', 'cl-widget-notif-icon');
    informationTopWrapper.setAttribute('class', 'cl-widget-notif-information-top-wrapper');
    informationWrapper.setAttribute('class', 'cl-widget-notif-information-wrapper');
    informationDetailsContainer.setAttribute('class', 'cl-widget-notif-information-details-wrapper');
    informationDetailsLabel.setAttribute('class', 'cl-widget-notif-information-details-label');
    informationDetailsDescription.setAttribute('class', 'cl-widget-notif-information-details-description');
    informationWrapperClose.setAttribute('class', 'cl-widget-notif-information-close-wrapper');
    informationClose.setAttribute('class', 'cl-widget-notif-information-close');

    informationClose.href = 'javascript:void(0);';
    informationClose.innerHTML = 'x';

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
  this.startSSE = function () {
    var _this = this;

    _this.settings.sseInstance = new Messaging({
      sseUrl: _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSE.replace(':space', _this.settings.lbWidget.settings.spaceName).replace(':id', _this.settings.lbWidget.settings.memberId),
      heartbeat: _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSEHeartbeat.replace(':space', _this.settings.lbWidget.settings.spaceName).replace(':id', _this.settings.lbWidget.settings.memberId),
      ajax: {
        url: null,
        apiKey: {
          'X-API-KEY': _this.settings.lbWidget.settings.apiKey
        }
      },
      callback: function (data) {
        var dataKey = JSON.stringify(data);
        var currentTime = new Date().getTime();

        if (typeof processed[dataKey] === 'undefined' || (typeof processed[dataKey] !== 'undefined' && (processed[dataKey] + 10000) < currentTime)) {
          processed[JSON.stringify(data)] = currentTime;
          _this.settings.eventStream.push(data);
        }
      },
      onStartupError: function (settings) {
      },
      debug: true
    });
  };

  this.autoNotificationHide = function () {
    var _this = this;

    if (_this.settings.autoNotificationHideInterval) {
      clearTimeout(_this.settings.autoNotificationHideInterval);
    }

    _this.settings.autoNotificationHideInterval = setTimeout(function () {
      _this.hideNotification();
    }, _this.settings.autoNotificationHideTime);
  };

  this.hideNotification = function () {
    var _this = this;

    if (_this.settings.autoNotificationHideInterval) {
      clearTimeout(_this.settings.autoNotificationHideInterval);
    }

    _this.settings.displayInProgress = false;
    removeClass(query(_this.settings.container, '.cl-widget-notif-information-wrapper'), 'cl-show');
    setTimeout(function () {
      _this.settings.container.style.display = 'none';
    }, 200);
  };

  this.showAchievementNotification = function (data) {
    var _this = this;
    var label = query(_this.settings.detailsContainer, '.cl-widget-notif-information-details-label');
    var description = query(_this.settings.detailsContainer, '.cl-widget-notif-information-details-description');
    var descriptionText = stripHtml(data.data.description);

    label.innerHTML = (data.data.name.length > 23) ? data.data.name.substr(0, 23) + '...' : data.data.name;
    description.innerHTML = (descriptionText.length > 60) ? descriptionText.substr(0, 60) + '...' : descriptionText;

    _this.settings.detailsContainer.dataset.id = data.data.id;

    _this.settings.container.style.display = 'block';
    setTimeout(function () {
      addClass(query(_this.settings.container, '.cl-widget-notif-information-wrapper'), 'cl-show');
    }, 200);

    _this.autoNotificationHide();
  };

  this.eventStreamCheck = function () {
    var _this = this;

    if (_this.settings.checkInterval) {
      clearTimeout(_this.settings.checkInterval);
    }

    if (_this.settings.eventStream.length > 0 && !_this.settings.displayInProgress) {
      var data = _this.settings.eventStream[0];
      var index = _this.settings.eventStream.indexOf(data);

      if (typeof data.achievementId !== 'undefined') {
        _this.settings.displayInProgress = true;
        _this.settings.lbWidget.getAchievement(data.achievementId, function (data) {
          _this.showAchievementNotification(data);

          _this.settings.checkInterval = setTimeout(function () {
            _this.eventStreamCheck();
          }, _this.settings.onDisplayCheckTimeout);
        });

        _this.settings.eventStream.splice(index, 1);
      } else if (typeof data.notificationId !== 'undefined') {
        _this.settings.checkInterval = setTimeout(function () {
          _this.eventStreamCheck();
        }, _this.settings.checkTimeout);
      } else {
        _this.settings.checkInterval = setTimeout(function () {
          _this.eventStreamCheck();
        }, _this.settings.checkTimeout);
      }

      if (index > -1) {
        _this.settings.eventStream.splice(index, 1);
      }
    } else {
      _this.settings.checkInterval = setTimeout(function () {
        _this.eventStreamCheck();
      }, _this.settings.checkTimeout);
    }
  };

  this.init = function () {
    var _this = this;

    if (_this.settings.container === null) {
      _this.startSSE();
      _this.settings.container = _this.settings.lbWidget.settings.bindContainer.appendChild(_this.layoutWrapper());
      _this.settings.detailsContainer = query(_this.settings.container, '.cl-widget-notif-information-details-wrapper');
    } else {
      // terminate SSE
      _this.settings.sseInstance.closeChanel();

      // update the member
      _this.settings.sseInstance.settings.sseUrl = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSE.replace(':space', _this.settings.lbWidget.settings.spaceName).replace(':id', _this.settings.lbWidget.settings.memberId);
      _this.settings.sseInstance.settings.heartbeat = _this.settings.lbWidget.settings.uri.gatewayDomain + _this.settings.lbWidget.settings.uri.memberSSEHeartbeat.replace(':space', _this.settings.lbWidget.settings.spaceName).replace(':id', _this.settings.lbWidget.settings.memberId);

      // re-instantiate SSE
      _this.settings.sseInstance.openChanel();
    }

    _this.eventStreamCheck();
  };
};

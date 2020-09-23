import moment from 'moment';
import query from '../utils/query';
import addClass from '../utils/addClass';
import hasClass from '../utils/hasClass';
import removeClass from '../utils/removeClass';
import remove from '../utils/remove';
import dragElement from './dragElement';

export const MiniScoreBoard = function (options) {
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

  if (typeof options !== 'undefined') {
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        this.settings[opt] = options[opt];
      }
    }
  }

  this.layout = function () {
    var wrapper = document.createElement('div');
    var iconWrapper = document.createElement('div');
    var icon = document.createElement('div');

    var informationWrapper = document.createElement('div');
    var informationTopWrapper = document.createElement('div');
    var informationWrapperClose = document.createElement('div');
    var informationClose = document.createElement('a');

    wrapper.setAttribute('class', 'cl-widget-ms-wrapper');
    iconWrapper.setAttribute('class', 'cl-widget-ms-icon-wrapper');
    icon.setAttribute('class', 'cl-widget-ms-icon');
    informationTopWrapper.setAttribute('class', 'cl-widget-ms-information-top-wrapper');
    informationWrapper.setAttribute('class', 'cl-widget-ms-information-wrapper');
    informationWrapperClose.setAttribute('class', 'cl-widget-ms-information-close-wrapper');
    informationClose.setAttribute('class', 'cl-widget-ms-information-close');

    informationClose.href = 'javascript:void(0);';
    informationClose.innerHTML = 'x';

    informationWrapperClose.appendChild(informationClose);
    informationWrapper.appendChild(informationWrapperClose);
    informationTopWrapper.appendChild(informationWrapper);
    iconWrapper.appendChild(icon);
    wrapper.appendChild(iconWrapper);
    wrapper.appendChild(informationTopWrapper);

    return wrapper;
  };

  this.overlayLayout = function () {
    var wrapper = document.createElement('div');

    wrapper.setAttribute('class', 'cl-widget-ms-overlay-wrapper');

    return wrapper;
  };

  this.timeManagement = function () {
    var _this = this;
    var diff = 0;
    var label = '';
    var date = '';
    var dateObj = '';
    var inverse = false;

    if (_this.settings.lbWidget.settings.competition.activeContest !== null) {
      diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledStart).diff(moment());
      label = _this.settings.lbWidget.settings.translation.miniLeaderboard.startsIn;
      date = _this.settings.lbWidget.formatDateTime(moment.duration(diff));
      dateObj = _this.settings.lbWidget.formatDateTime(moment.duration(diff));
      inverse = false;

      if (diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0) {
        label = _this.settings.lbWidget.settings.translation.miniLeaderboard.starting;
        date = '';
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

  this.layoutDefaultOrEmptyEntry = function () {
    var lbResultsMemEntry = document.createElement('div');
    var lbResultsMemLabel = document.createElement('div');
    var lbResultsMemRank = document.createElement('div');
    var lbResultsMemIcon = document.createElement('div');
    var lbResultsMemImg = document.createElement('img');
    var lbResultsMemPoints = document.createElement('div');

    lbResultsMemEntry.setAttribute('class', 'cl-widget-ms-default-mem-entry');
    lbResultsMemLabel.setAttribute('class', 'cl-widget-ms-default-mem-label');
    lbResultsMemRank.setAttribute('class', 'cl-widget-ms-default-mem-rank');
    lbResultsMemIcon.setAttribute('class', 'cl-widget-ms-default-mem-icon');
    lbResultsMemImg.setAttribute('class', 'cl-widget-ms-default-mem-img');
    lbResultsMemImg.style.display = 'none';
    lbResultsMemPoints.setAttribute('class', 'cl-widget-ms-default-mem-points');

    lbResultsMemEntry.appendChild(lbResultsMemLabel);
    lbResultsMemEntry.appendChild(lbResultsMemRank);
    lbResultsMemIcon.appendChild(lbResultsMemImg);
    lbResultsMemEntry.appendChild(lbResultsMemIcon);
    lbResultsMemEntry.appendChild(lbResultsMemPoints);

    return lbResultsMemEntry;
  };

  this.layoutFirstToOrEmptyEntry = function () {
    var lbResultsMemEntry = document.createElement('div');
    var lbResultsMemLabel = document.createElement('div');
    var lbResultsMemRank = document.createElement('div');
    var lbResultsMemIcon = document.createElement('div');
    var lbResultsMemImg = document.createElement('img');
    var lbResultsMemPoints = document.createElement('div');

    lbResultsMemEntry.setAttribute('class', 'cl-widget-ms-first-to-mem-entry');
    lbResultsMemLabel.setAttribute('class', 'cl-widget-ms-first-to-mem-label');
    lbResultsMemRank.setAttribute('class', 'cl-widget-ms-first-to-mem-rank');
    lbResultsMemIcon.setAttribute('class', 'cl-widget-ms-first-to-mem-icon');
    lbResultsMemImg.setAttribute('class', 'cl-widget-ms-first-to-mem-img');
    lbResultsMemImg.style.display = 'none';
    lbResultsMemPoints.setAttribute('class', 'cl-widget-ms-first-to-mem-points');

    lbResultsMemEntry.appendChild(lbResultsMemLabel);
    lbResultsMemEntry.appendChild(lbResultsMemRank);
    lbResultsMemIcon.appendChild(lbResultsMemImg);
    lbResultsMemEntry.appendChild(lbResultsMemIcon);
    lbResultsMemEntry.appendChild(lbResultsMemPoints);

    return lbResultsMemEntry;
  };

  // let testLive = false;
  this.layoutDefaultOrEmpty = function () {
    var _this = this;
    var timeManagement = _this.timeManagement();
    // var diff = timeManagement.diff;
    var label = timeManagement.label;
    var date = timeManagement.date;
    var dateObj = timeManagement.dateObj;
    var wrapperDomObj = _this.settings.infoContainer;
    var defaultDomObj = query(_this.settings.container, '.cl-widget-ms-default-wrapper');
    var inverse = timeManagement.inverse;

    if (defaultDomObj === null) {
      _this.removeUnusedElements();

      addClass(_this.settings.container, 'cl-ms-default-style');

      var lbWrapper = document.createElement('div');
      var lbDateWrapper = document.createElement('div');
      var lbDateLabel = document.createElement('div');
      var lbDate = document.createElement('div');
      var lbResultsWrapper = document.createElement('div');
      var lbResultsList = document.createElement('div');
      var lbHeaders = document.createElement('div');
      var lbHeadersRank = document.createElement('div');
      var lbHeadersPoints = document.createElement('div');
      var lbResultsMemEntry = _this.layoutDefaultOrEmptyEntry();
      var img = query(lbResultsMemEntry, '.cl-widget-ms-default-mem-img');

      lbWrapper.setAttribute('class', 'cl-widget-ms-default-wrapper');
      lbDateLabel.setAttribute('class', 'cl-widget-ms-default-date-label');
      lbDate.setAttribute('class', 'cl-widget-ms-default-date');
      lbDateWrapper.setAttribute('class', 'cl-widget-ms-default-date-wrapper');
      lbResultsWrapper.setAttribute('class', 'cl-widget-ms-default-results-wrapper');
      lbResultsList.setAttribute('class', 'cl-widget-ms-default-results-list');
      lbHeaders.setAttribute('class', 'cl-widget-ms-default-results-headers');
      lbHeadersRank.setAttribute('class', 'cl-widget-ms-default-results-header-rank');
      lbHeadersPoints.setAttribute('class', 'cl-widget-ms-default-results-header-points');

      lbResultsMemEntry.setAttribute('class', 'cl-widget-ms-default-mem-entry');

      // lbDateLabel.innerHTML = label;
      lbDate.innerHTML = dateObj;

      lbDateWrapper.appendChild(lbDateLabel);
      lbDateWrapper.appendChild(lbDate);

      query(lbResultsMemEntry, '.cl-widget-ms-default-mem-rank').innerHTML = '--';
      query(lbResultsMemEntry, '.cl-widget-ms-default-mem-points').innerHTML = '--';

      img.src = '';
      img.alt = '';
      img.style.display = 'block';

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

      setTimeout(function () {
        addClass(wrapperDomObj, 'cl-show');
      }, 200);
    } else {
      if (!hasClass(wrapperDomObj, 'cl-show')) {
        addClass(wrapperDomObj, 'cl-show');
      }
      query(_this.settings.container, '.cl-widget-ms-default-date-label').innerHTML = label;
      query(_this.settings.container, '.cl-widget-ms-default-date').innerHTML = date;
    }

    window.mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function (lbEntry) {
      if ((lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId) && typeof lbEntry.rankings !== 'undefined') {
        var scoreArea = query(defaultDomObj, '.cl-widget-ms-default-results-list');
        scoreArea.innerHTML = '';

        query(_this.settings.container, '.cl-widget-ms-default-date-label').innerHTML = '';
        query(_this.settings.container, '.cl-widget-ms-default-date').innerHTML = dateObj;
        addClass(query(_this.settings.container, '.cl-widget-ms-default-date-wrapper'), 'cl-widget-ms-default-date-only');

        window.mapObject(lbEntry.rankings, function (lbRankingEntry) {
          var icon = _this.settings.lbWidget.populateIdenticonBase64Image(lbRankingEntry.memberId);
          var lbWrapper = _this.layoutDefaultOrEmptyEntry();
          var img = query(lbWrapper, '.cl-widget-ms-default-mem-img');
          var selfMember = ((lbRankingEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbRankingEntry.memberId === _this.settings.lbWidget.settings.memberId));

          img.src = icon;
          img.alt = '';
          img.style.display = 'block';

          if (selfMember) {
            addClass(lbWrapper, 'cl-widget-ms-default-mem-self');
          }

          query(lbWrapper, '.cl-widget-ms-default-mem-label').innerHTML = selfMember ? 'YOU' : '';
          query(lbWrapper, '.cl-widget-ms-default-mem-rank').innerHTML = "<span class='cl-mem-rank-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.rank + "</span><span class='cl-mem-rank'>" + lbRankingEntry.rank + '</span>';
          query(lbWrapper, '.cl-widget-ms-default-mem-points').innerHTML = "<span class='cl-mem-points-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.points + "</span><span class='cl-mem-points'>" + lbRankingEntry.points + '</span>';

          scoreArea.appendChild(lbWrapper);
        });

        // testLive = true;

        //  var lastScore = query(_this.settings.container, ".cl-widget-ms-default-last-score").innerHTML,
        //  highScore = query(_this.settings.container, ".cl-widget-ms-default-high-score").innerHTML,
        //  rank = query(_this.settings.container, ".cl-widget-ms-default-rank-value"),
        //  change = (lbEntry.change < 0) ? "down" : ( lbEntry.change > 0 ? "up" : "same" ),
        //  rankValue = lbEntry.rank;
        //
        // if( lastScore !== String(lbEntry.points) && String(lbEntry.points) !== highScore ){
        //  query(_this.settings.container, ".cl-widget-ms-default-last-score").innerHTML = highScore;
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

    if (inverse && !hasClass(defaultDomObj, 'cl-inverse')) {
      addClass(defaultDomObj, 'cl-inverse');
    }
  };

  this.layoutFirstToOrEmpty = function (strategy) {
    var _this = this;
    var timeManagement = _this.timeManagement();
    // var diff = timeManagement.diff;
    var label = timeManagement.label;
    var date = timeManagement.date;
    var dateObj = timeManagement.dateObj;
    var wrapperDomObj = _this.settings.infoContainer;
    var defaultDomObj = query(_this.settings.container, '.cl-widget-ms-first-to-wrapper');
    var inverse = timeManagement.inverse;

    if (defaultDomObj === null) {
      _this.removeUnusedElements();

      addClass(_this.settings.container, 'cl-ms-first-to-style');

      var lbWrapper = document.createElement('div');
      var lbDateWrapper = document.createElement('div');
      var lbDateLabel = document.createElement('div');
      var lbDate = document.createElement('div');
      var lbResultsWrapper = document.createElement('div');
      var lbResultsList = document.createElement('div');
      var lbHeaders = document.createElement('div');
      var lbHeadersRank = document.createElement('div');
      var lbHeadersPoints = document.createElement('div');
      var lbResultsMemEntry = _this.layoutFirstToOrEmptyEntry();
      var img = query(lbResultsMemEntry, '.cl-widget-ms-first-to-mem-img');

      lbWrapper.setAttribute('class', 'cl-widget-ms-first-to-wrapper');
      lbDateLabel.setAttribute('class', 'cl-widget-ms-first-to-date-label');
      lbDate.setAttribute('class', 'cl-widget-ms-first-to-date');
      lbDateWrapper.setAttribute('class', 'cl-widget-ms-first-to-date-wrapper');
      lbResultsWrapper.setAttribute('class', 'cl-widget-ms-first-to-results-wrapper');
      lbResultsList.setAttribute('class', 'cl-widget-ms-first-to-results-list');
      lbHeaders.setAttribute('class', 'cl-widget-ms-first-to-results-headers');
      lbHeadersRank.setAttribute('class', 'cl-widget-ms-first-to-results-header-rank');
      lbHeadersPoints.setAttribute('class', 'cl-widget-ms-first-to-results-header-points');

      lbResultsMemEntry.setAttribute('class', 'cl-widget-ms-first-to-mem-entry');

      // lbDateLabel.innerHTML = label;
      lbDate.innerHTML = dateObj;

      lbDateWrapper.appendChild(lbDateLabel);
      lbDateWrapper.appendChild(lbDate);

      query(lbResultsMemEntry, '.cl-widget-ms-first-to-mem-rank').innerHTML = '--';
      query(lbResultsMemEntry, '.cl-widget-ms-first-to-mem-points').innerHTML = '--/' + strategy.recordTimeWhenSumReaches;

      img.src = '';
      img.alt = '';
      img.style.display = 'block';

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

      setTimeout(function () {
        addClass(wrapperDomObj, 'cl-show');
      }, 200);
    } else {
      if (!hasClass(wrapperDomObj, 'cl-show')) {
        addClass(wrapperDomObj, 'cl-show');
      }
      query(_this.settings.container, '.cl-widget-ms-first-to-date-label').innerHTML = label;
      query(_this.settings.container, '.cl-widget-ms-first-to-date').innerHTML = date;
    }

    window.mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function (lbEntry) {
      if ((lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId) && typeof lbEntry.rankings !== 'undefined') {
        var scoreArea = query(defaultDomObj, '.cl-widget-ms-first-to-results-list');
        scoreArea.innerHTML = '';

        query(_this.settings.container, '.cl-widget-ms-first-to-date-label').innerHTML = '';
        query(_this.settings.container, '.cl-widget-ms-first-to-date').innerHTML = dateObj;
        addClass(query(_this.settings.container, '.cl-widget-ms-first-to-date-wrapper'), 'cl-widget-ms-first-to-date-only');

        window.mapObject(lbEntry.rankings, function (lbRankingEntry) {
          var icon = _this.settings.lbWidget.populateIdenticonBase64Image(lbRankingEntry.memberId);
          var lbWrapper = _this.layoutFirstToOrEmptyEntry();
          var img = query(lbWrapper, '.cl-widget-ms-first-to-mem-img');
          var selfMember = ((lbRankingEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbRankingEntry.memberId === _this.settings.lbWidget.settings.memberId));

          if (selfMember) {
            addClass(lbWrapper, 'cl-widget-ms-first-to-mem-self');
          }

          img.src = icon;
          img.alt = '';
          img.style.display = 'block';

          query(lbWrapper, '.cl-widget-ms-first-to-mem-label').innerHTML = selfMember ? 'YOU' : '';
          query(lbWrapper, '.cl-widget-ms-first-to-mem-rank').innerHTML = "<span class='cl-mem-rank-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.rank + "</span><span class='cl-mem-rank'>" + lbRankingEntry.rank + '</span>';
          query(lbWrapper, '.cl-widget-ms-first-to-mem-points').innerHTML = "<span class='cl-mem-points-label'>" + _this.settings.lbWidget.settings.translation.leaderboard.points + "</span><span class='cl-mem-points'>" + lbRankingEntry.points + '/' + strategy.recordTimeWhenSumReaches + '</span>';

          scoreArea.appendChild(lbWrapper);
        });
      }
    });

    if (inverse && !hasClass(defaultDomObj, 'cl-inverse')) {
      addClass(defaultDomObj, 'cl-inverse');
    }
  };

  this.layoutSumBestOf = function () {
    var _this = this;
    var timeManagement = _this.timeManagement();
    // var diff = timeManagement.diff;
    var label = timeManagement.label;
    var date = timeManagement.date;
    var wrapperDomObj = _this.settings.infoContainer;
    var sumBestDomObj = query(_this.settings.container, '.cl-widget-ms-sum-best-wrapper');
    var inverse = timeManagement.inverse;

    if (sumBestDomObj === null) {
      _this.removeUnusedElements();

      var lbWrapper = document.createElement('div');
      var lbDateWrapper = document.createElement('div');
      var lbDateLabel = document.createElement('div');
      var lbDate = document.createElement('div');
      var lbResultsWrapper = document.createElement('div');
      var lbResultsScoreArea = document.createElement('div');
      var lbResultsScoreAreaHigh = document.createElement('div');
      var lbResultsScoreAreaHighLabel = document.createElement('div');
      var lbResultsScoreAreaHighScore = document.createElement('div');
      var lbResultsScoreAreaLast = document.createElement('div');
      var lbResultsScoreAreaLastLabel = document.createElement('div');
      var lbResultsScoreAreaLastScore = document.createElement('div');
      var lbResultsRankArea = document.createElement('div');
      var lbResultsRankValue = document.createElement('span');

      lbWrapper.setAttribute('class', 'cl-widget-ms-sum-best-wrapper');
      lbDateLabel.setAttribute('class', 'cl-widget-ms-sum-best-date-label');
      lbDate.setAttribute('class', 'cl-widget-ms-sum-best-date');
      lbDateWrapper.setAttribute('class', 'cl-widget-ms-sum-best-date-wrapper');
      lbResultsWrapper.setAttribute('class', 'cl-widget-ms-sum-best-results-wrapper');

      lbResultsScoreArea.setAttribute('class', 'cl-widget-ms-sum-best-area');
      lbResultsScoreAreaHigh.setAttribute('class', 'cl-widget-ms-sum-best-high-area');
      lbResultsScoreAreaHighLabel.setAttribute('class', 'cl-widget-ms-sum-best-high-label');
      lbResultsScoreAreaHighScore.setAttribute('class', 'cl-widget-ms-sum-best-high-score');

      lbResultsScoreAreaLast.setAttribute('class', 'cl-widget-ms-sum-best-last-area');
      lbResultsScoreAreaLastLabel.setAttribute('class', 'cl-widget-ms-sum-best-last-label');
      lbResultsScoreAreaLastScore.setAttribute('class', 'cl-widget-ms-sum-best-last-score');

      lbResultsRankArea.setAttribute('class', 'cl-widget-ms-sum-best-rank-area');
      lbResultsRankValue.setAttribute('class', 'cl-widget-ms-sum-best-rank-value');

      lbDateLabel.innerHTML = label;
      lbDate.innerHTML = date;

      lbResultsScoreAreaHighLabel.innerHTML = _this.settings.lbWidget.settings.translation.miniLeaderboard.highScore;
      lbResultsScoreAreaHighScore.innerHTML = '--';
      lbResultsScoreAreaHigh.appendChild(lbResultsScoreAreaHighLabel);
      lbResultsScoreAreaHigh.appendChild(lbResultsScoreAreaHighScore);
      lbResultsScoreArea.appendChild(lbResultsScoreAreaHigh);

      lbResultsScoreAreaLastLabel.innerHTML = _this.settings.lbWidget.settings.translation.miniLeaderboard.lastScore;
      lbResultsScoreAreaLastScore.innerHTML = '--';
      lbResultsScoreAreaLast.appendChild(lbResultsScoreAreaLastLabel);
      lbResultsScoreAreaLast.appendChild(lbResultsScoreAreaLastScore);
      lbResultsScoreArea.appendChild(lbResultsScoreAreaLast);

      lbResultsRankValue.innerHTML = '--';
      lbResultsRankArea.appendChild(lbResultsRankValue);

      lbResultsWrapper.appendChild(lbResultsScoreArea);
      lbResultsWrapper.appendChild(lbResultsRankArea);

      lbDateWrapper.appendChild(lbDateLabel);
      lbDateWrapper.appendChild(lbDate);

      lbWrapper.appendChild(lbDateWrapper);
      lbWrapper.appendChild(lbResultsWrapper);

      sumBestDomObj = wrapperDomObj.appendChild(lbWrapper);

      setTimeout(function () {
        addClass(wrapperDomObj, 'cl-show');
      }, 200);
    } else {
      if (!hasClass(wrapperDomObj, 'cl-show')) {
        addClass(wrapperDomObj, 'cl-show');
      }
      query(_this.settings.container, '.cl-widget-ms-sum-best-date-label').innerHTML = label;
      query(_this.settings.container, '.cl-widget-ms-sum-best-date').innerHTML = date;
    }

    window.mapObject(_this.settings.lbWidget.settings.leaderboard.leaderboardData, function (lbEntry) {
      if (lbEntry.memberRefId === _this.settings.lbWidget.settings.memberId || lbEntry.memberId === _this.settings.lbWidget.settings.memberId) {
        var lastScore = query(_this.settings.container, '.cl-widget-ms-sum-best-last-score').innerHTML;
        var highScore = query(_this.settings.container, '.cl-widget-ms-sum-best-high-score').innerHTML;
        var rank = query(_this.settings.container, '.cl-widget-ms-sum-best-rank-value');
        var change = (lbEntry.change < 0) ? 'down' : (lbEntry.change > 0 ? 'up' : 'same');
        var rankValue = lbEntry.rank;

        if (lastScore !== String(lbEntry.points) && String(lbEntry.points) !== highScore) {
          query(_this.settings.container, '.cl-widget-ms-sum-best-last-score').innerHTML = highScore;
        }

        query(_this.settings.container, '.cl-widget-ms-sum-best-high-score').innerHTML = lbEntry.points;

        removeClass(rank, 'cl-ms-rank-up');
        removeClass(rank, 'cl-ms-rank-down');
        removeClass(rank, 'cl-ms-rank-same');

        addClass(rank, 'cl-ms-rank-' + change);

        rank.innerHTML = rankValue;
      }
    });

    if (inverse && !hasClass(sumBestDomObj, 'cl-inverse')) {
      addClass(sumBestDomObj, 'cl-inverse');
    }
  };

  this.layoutRequiresOptIn = function () {
    var _this = this;
    var diff = moment(_this.settings.lbWidget.settings.competition.activeCompetition.scheduledStart).diff(moment());
    var label = 'Starting In';
    var wrapperDomObj = _this.settings.infoContainer;
    var date = _this.settings.lbWidget.formatDateTime(moment.duration(diff));

    if (diff < 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode === 0) {
      label = 'starting';
      date = '';
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode > 0 && _this.settings.lbWidget.settings.competition.activeContest.statusCode < 3) {
      diff = moment(_this.settings.lbWidget.settings.competition.activeContest.scheduledEnd).diff(moment());
      label = 'started';
      date = _this.settings.lbWidget.formatDateTime(moment.duration(diff));
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode === 3) {
      label = 'finishing';
      date = '';
    } else if (_this.settings.lbWidget.settings.competition.activeContest.statusCode >= 4) {
      label = 'finished';
      date = '';
    }

    if (query(_this.settings.container, '.cl-widget-ms-optin-wrapper') === null) {
      _this.removeUnusedElements();

      var optInWrapper = document.createElement('div');
      var optInDateWrapper = document.createElement('div');
      var optInDateLabel = document.createElement('div');
      var optInDate = document.createElement('div');
      var optInDateActionWrapper = document.createElement('div');
      var optInDateAction = document.createElement('a');

      optInWrapper.setAttribute('class', 'cl-widget-ms-optin-wrapper');
      optInDateLabel.setAttribute('class', 'cl-widget-ms-optin-date-label');
      optInDate.setAttribute('class', 'cl-widget-ms-optin-date');
      optInDateWrapper.setAttribute('class', 'cl-widget-ms-optin-date-wrapper');
      optInDateActionWrapper.setAttribute('class', 'cl-widget-ms-optin-action-wrapper');
      optInDateAction.setAttribute('class', 'cl-widget-ms-optin-action');

      optInDateLabel.innerHTML = label;
      optInDate.innerHTML = date;
      optInDateAction.innerHTML = _this.settings.lbWidget.settings.translation.tournaments.enter;

      optInDateWrapper.appendChild(optInDateLabel);
      optInDateWrapper.appendChild(optInDate);

      optInDateActionWrapper.appendChild(optInDateAction);
      optInWrapper.appendChild(optInDateWrapper);
      optInWrapper.appendChild(optInDateActionWrapper);

      wrapperDomObj.appendChild(optInWrapper);

      setTimeout(function () {
        addClass(wrapperDomObj, 'cl-show');
      }, 200);
    } else {
      if (!hasClass(wrapperDomObj, 'cl-show')) {
        addClass(wrapperDomObj, 'cl-show');
      }
      query(_this.settings.container, '.cl-widget-ms-optin-date-label').innerHTML = label;
      query(_this.settings.container, '.cl-widget-ms-optin-date').innerHTML = date;
    }
  };

  this.removeUnusedElements = function () {
    var _this = this;
    var defaultLayoutWrapperDomObj = query(_this.settings.container, '.cl-widget-ms-default-wrapper');
    var optInWrapperDomObj = query(_this.settings.container, '.cl-widget-ms-optin-wrapper');
    var sumBestDomObj = query(_this.settings.container, '.cl-widget-ms-sum-best-wrapper');
    var firstToDomObj = query(_this.settings.container, '.cl-widget-ms-first-to-wrapper');

    removeClass(_this.settings.container, 'cl-ms-default-style');
    removeClass(_this.settings.container, 'cl-ms-optin-style');
    removeClass(_this.settings.container, 'cl-ms-sum-best-style');
    removeClass(_this.settings.container, 'cl-ms-first-to-style');

    if (defaultLayoutWrapperDomObj !== null) {
      remove(defaultLayoutWrapperDomObj);
    }

    if (optInWrapperDomObj !== null) {
      remove(optInWrapperDomObj);
    }

    if (sumBestDomObj !== null) {
      remove(sumBestDomObj);
    }

    if (firstToDomObj !== null) {
      remove(firstToDomObj);
    }
  };

  this.clearAll = function () {
    var _this = this;

    if (_this.settings.updateInterval) {
      clearTimeout(_this.settings.updateInterval);
    }

    _this.removeInfoArea();

    _this.settings.active = false;
  };

  this.removeInfoArea = function () {
    var _this = this;
    var wrapperDomObj = query(_this.settings.container, '.cl-show');
    var layout = query(_this.settings.container, '.cl-widget-ms-default-wrapper');

    if (wrapperDomObj !== null) removeClass(wrapperDomObj, 'cl-show');

    if (layout !== null) {
      setTimeout(function () {
        remove(layout);
      }, 300);
    }
  };

  this.updateScoreBoard = function () {
    var _this = this;

    if (_this.settings.updateInterval) {
      clearTimeout(_this.settings.updateInterval);
    }

    _this.settings.updateInterval = setTimeout(function () {
      _this.loadInfoArea(function () {
        _this.updateScoreBoard();
      });
    }, _this.settings.updateIntervalTime);
  };

  this.loadInfoArea = function (callback) {
    var _this = this;

    if (_this.settings.active && _this.settings.lbWidget.settings.competition.activeCompetition !== null && _this.settings.lbWidget.settings.competition.activeCompetition.statusCode < 7) {
      if (typeof _this.settings.lbWidget.settings.competition.activeCompetition.optin === 'boolean' && !_this.settings.lbWidget.settings.competition.activeCompetition.optin) {
        _this.layoutRequiresOptIn();
        callback();
      } else if (_this.settings.lbWidget.settings.competition.activeContest !== null && _this.settings.lbWidget.settings.competition.activeContest.strategy.type === 'SumBest') {
        _this.layoutSumBestOf();
        callback();
      } else if (_this.settings.lbWidget.settings.competition.activeContest !== null && _this.settings.lbWidget.settings.competition.activeContest.strategy.type === 'FirstTo') {
        _this.layoutFirstToOrEmpty(_this.settings.lbWidget.settings.competition.activeContest.strategy);
        callback();
      } else if (_this.settings.lbWidget.settings.competition.activeContestId !== null) {
        _this.layoutDefaultOrEmpty();
        callback();
      } else {
        _this.layoutDefaultOrEmpty();
      }
    } else {
      _this.clearAll();
    }
  };

  this.eventListeners = function () {
    var _this = this;

    dragElement(_this.settings.container, query(_this.settings.container, '.cl-widget-ms-icon'), _this.settings.overlayContainer, _this.settings.lbWidget.settings.bindContainer, function (newTop, newLeft) {
      _this.settings.lbWidget.stopActivity();
      if (newTop <= 5) {
        addClass(_this.settings.container, 'cl-vertical-mini');
      } else if (newLeft <= 5) {
        removeClass(_this.settings.container, 'cl-vertical-mini');
      }

      _this.settings.dragging = true;
    }, function () {
      _this.settings.lbWidget.restartActivity();
      setTimeout(function () {
        _this.settings.dragging = false;
      }, 200);
    }, function () {
      _this.settings.lbWidget.clickedMiniScoreBoard();
    });
  };

  this.initLayout = function (callback) {
    var _this = this;

    if (_this.settings.container === null) {
      _this.settings.active = true;
      _this.settings.container = _this.settings.lbWidget.settings.bindContainer.appendChild(_this.layout());
      _this.settings.overlayContainer = _this.settings.lbWidget.settings.bindContainer.appendChild(_this.overlayLayout());
      _this.settings.infoContainer = query(_this.settings.container, '.cl-widget-ms-information-wrapper');

      _this.eventListeners();
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  this.loadScoreBoard = function () {
    var _this = this;

    _this.initLayout(function () {
      _this.loadInfoArea(function () {
        _this.updateScoreBoard();
      });

      setTimeout(function () {
        _this.updateScoreBoard();
      }, 1000);
    });
  };
};

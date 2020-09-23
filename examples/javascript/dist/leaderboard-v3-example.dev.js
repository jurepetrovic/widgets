"use strict";

(function () {
  var widgetInstance = window._clLeaderBoardV3;
  widgetInstance.settings.enableNotifications = false; // requires a working/valid SSE channel

  widgetInstance.settings.memberId = '69:jure';
  widgetInstance.settings.uri.gatewayDomain = "https://gateway.competitionlabs.com";
  widgetInstance.settings.apiKey = '7e739a155d2643dab86674e9f5abafda';
  widgetInstance.settings.spaceName = 'gameart_staging';
  widgetInstance.settings.gameId = "307";
  widgetInstance.settings.bindContainer = document.getElementById("my-widget-container"); // lookup services override

  /*
  widgetInstance.settings.uri.members = "data/member-data-sample.json";
  widgetInstance.settings.uri.competitions = "data/competition-list-data-sample.json";
  widgetInstance.settings.uri.competitionById = "data/competition-data-sample.json";
  widgetInstance.settings.uri.memberCompetitions = "data/competition-list-data-sample.json";
  widgetInstance.settings.uri.memberCompetitionById = "data/competition-data-sample.json";
  widgetInstance.settings.uri.contestLeaderboard = "data/leaderboard-data.json";
  widgetInstance.settings.uri.achievements = "data/achievements-list-data-sample.json";
  widgetInstance.settings.uri.achievement = "data/achievements-data-sample.json";
  widgetInstance.settings.uri.achievementsProgression = "data/achievements-list-perc-data-sample.json";
  widgetInstance.settings.uri.achievementsIssued = "data/achievements-list-issued-data-sample.json";
  widgetInstance.settings.uri.messages = "data/messages-claimed-data-sample.json";
  widgetInstance.settings.uri.memberReward = "data/messages-reward-data-sample.json";
  widgetInstance.settings.uri.messageById = "data/messages-data-sample.json";
  widgetInstance.settings.uri.assets = "/images/:attachmentId.png";
  */

  widgetInstance.settings.resources = ["../leaderboard_v3/build/css/style.css?t=" + new Date().getTime()];
  widgetInstance.init();
})();
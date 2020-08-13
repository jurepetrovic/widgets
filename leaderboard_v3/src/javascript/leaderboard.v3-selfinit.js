/*
 COMPETITION LABS LTD v1.0.5
 (c) 2015-2020 Aleksandr Bernotas
 License: www.competitionlabs.com/terms-of-service
*/

import './polyfills';
import './modules/setTimeoutGlobal';

import { LbWidget } from './modules/LbWidget';

(function () {
  if (typeof window._clLeaderBoardV3SelfInit === 'undefined') {
    window._clLeaderBoardV3SelfInit = LbWidget;
  } else {
    console.warn('window._clLeaderBoardV3SelfInit is already defined');
  }
})();

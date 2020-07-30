/*
 COMPETITION LABS LTD v1.0.5
 (c) 2015-2020 Aleksandr Bernotas
 License: www.competitionlabs.com/terms-of-service
*/

import './polyfills';
import './modules/setTimeoutGlobal';

import { LbWidget } from './modules/LbWidget';

(function () {
  if (typeof window._CLLBV3Opt === 'undefined') {
    window._CLLBV3Opt = {
      autoStart: false
    };
  }

  if (typeof window._clLeaderBoardV3 === 'undefined') {
    window._clLeaderBoardV3 = new LbWidget(window._CLLBV3Opt);
  } else {
    console.warn('window._clLeaderBoardV3 is already defined, widget is configured to run as a single instance');
  }
})();

'use strict';
/* global angular */

/**
 * @ngdoc directive
 * @name saApp.directive:contextLoader
 * @description
 * # contextLoader
 */
angular.module('myMail')
  .directive('contextLoader', function () {
    return {
      templateUrl: 'scripts/_common/loader/loader.html',
      restrict: 'E'
    };
  });

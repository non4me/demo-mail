'use strict';
/* global angular */

/**
 * @ngdoc directive
 * @name saApp.directive:authForm
 * @description
 * # authForm
 */
angular.module('myMail')
  .directive('authForm', function () {
    return {
      templateUrl: 'scripts/_common/auth-form/auth-form.html',
      restrict: 'E',
      scope: {},
      controller: function () {
        this.showLogIn = true;
      },
      controllerAs: 'ctrlAuthForm'
    };
  });

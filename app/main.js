(function() {
  'use strict';

  angular.module('myMail')
      .directive('main', function() {
        return {
          restrict: 'E',
          templateUrl: 'app/main.html',
          controller: function($state) {

            this.currentState = $state.current.name;
            this.setTab = function(state, params) {
              $state.go(state, params);
              this.currentState = state
            };

          },
          controllerAs: 'mainCtrl'
        };
      });

})();
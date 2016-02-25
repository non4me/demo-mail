(function() {
  'use strict';

  angular.module('myMail')
      .directive('userProfile', function() {
        return {
          templateUrl: 'scripts/user/user-profile/user-profile.html',
          restrict: 'E',
          replace: true,
          scope: {},
          controller: function(apiMail, sharedConfig) {

            this.data = sharedConfig;

            this.isSelected = function(id) {
              return this.data.selectedBoxId === id;
            };

            this.setSelected = function(id) {
              this.data.selectedBoxId = id;
            };

          },
          controllerAs: 'boxList'
        };
      });
})();

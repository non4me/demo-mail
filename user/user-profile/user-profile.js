(function() {
  'use strict';
  
  angular.module('myMail')
    .directive('userProfile', function() {
      return {
        templateUrl: 'user/user-profile/user-profile.html',
        restrict: 'E',
        replace: true,
        scope: {
          data: '='
        },
        bindToController: true,
        controller: function(apiMail) { 
          var vm = this;
          
          vm.isSelected = function(id) {
            return vm.data.selectedBoxId === id;
          }
          
          vm.setSelected = function(id) {
            vm.data.selectedBoxId = id;
          }
          
        },
        controllerAs: 'boxList'
      };
  });
})();
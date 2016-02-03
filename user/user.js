(function() {
  'use strict';

  angular.module('myMail')
      .directive('user', function() {
        return {
          restrict: 'E',
          templateUrl: 'user/user.html',
          scope: {},
          controller: function(sharedConfig) {
            var vm = this;
            vm.data = sharedConfig;

            vm.excludeUser = function(user){
              if(user) {
                return user.id !== vm.data.selectedUser.id;
              }
              return false;
            };

            vm.selectUser = function(user){
              if(user) {
                vm.data.selectedUser = user;
                vm.data.updateMessasgeList();
              }
            };


            vm.openProfile = function(user){
              vm.data.editProfile = true;
            };

          },
          controllerAs: 'userCtrl'
        };

      });

})();
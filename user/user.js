(function() {
  'use strict';
  
  angular.module('myMail')
    .directive('user', function() {
      return {
        restrict: 'E',
        templateUrl: 'user.html',
        scope: {
          data: '='
        },
        bindToController: true,
        controller: function() {
          var vm = this;
          
          vm.excludeUser = function(user){
            if(user) {
              return user.id !== vm.data.selectedUser.id;
            }
            return false;
          }
          
          vm.selectUser = function(user){
            if(user) {
              vm.data.selectedUser = user;
            }
          }
          
          
          vm.openProfile = function(user){
            vm.data.editProfile = true;
          }
          
        },
        controllerAs: 'userCtrl'
      };
      
  });
  
})();
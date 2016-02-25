(function() {
  'use strict';

  angular.module('myMail')
      .directive('user', function() {
        return {
          restrict: 'E',
          replace: true,
          templateUrl: 'scripts/user/user.html',
          scope: {},
          controller: function($state, $stateParams, sharedConfig, apiUser) {
            var vm = this;
            vm.data = sharedConfig;

            apiUser.getUserList().then(function(list) {
              vm.data.users = list;

              var selectedUserId = $stateParams.userId || (list[0] && +list[0].id);

              if(selectedUserId) {
                vm.data.selectedUser = list.filter(function (e) {
                  return e.id === selectedUserId;
                })[0];
                vm.data.updateMessasgeList();
              }
            });

            vm.excludeUser = function(user){
              if(user) {
                return user.id !== vm.data.selectedUser.id;
              }
              return false;
            };

            vm.selectUser = function(user){
              if(user) {
                $state.go('mailUser.messages', {userId: user.id, boxId: 1});
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

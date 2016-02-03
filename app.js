(function() {
  'use strict';
  
  angular.module('myMail')
    .directive('mailApp', function() {
      return {
        restrict: 'E',
        templateUrl: 'app.html',
        controller: function(apiUser, apiMail) {
          var vm = this;
              vm.sharedData = {
                boxes: [
                  {id: 1, name: 'InBox', ico: 'open', sort: 0},
                  {id: 2, name: 'Archive', ico: 'save', sort: 1},
                  {id: 3, name: 'Spam', ico: 'fire', sort: 2},
                  {id: 4, name: 'Trash', ico: 'trash', sort: 3}
                ],
                selectedBoxId: 1,
                messages: [],
                users: [],
                selectedMessage: {},
                selectedUser: {},
                editProfile: false
              };
              
              vm.userEditMode = false;
              
          apiUser.getUserList().then(function(list) {
            vm.sharedData.users = list;
            vm.sharedData.selectedUser = list[0];
            
            var selectedUserId = list[0] && +list[0].id;
            
            if(selectedUserId) {
              _updateMessages(selectedUserId, vm.sharedData.selectedBoxId);
            }
          });
          
          vm.setSelectedBox = function(boxId) {
            vm.sharedData.selectedBoxId = boxId;
            _updateMessages(vm.sharedData.selectedUser.id, boxId);
          };
          
          vm.setSelectedUser = function(user) {
            vm.sharedData.selectedUser = user;
            _updateMessages(user.id, 1);
          };
          
          vm.saveMessageState =  function() {
            apiMail.saveMessage(vm.sharedData.selectedMessage);
            apiMail.getUserMessages(vm.sharedData.selectedUser.id)
              .then(function(list){
                vm.sharedData.messages = list;
              });
          };
          
          vm.saveMessageStateAndListUpdate =  function() {
            apiMail.saveMessage(vm.sharedData.selectedMessage);
            _updateMessages(vm.sharedData.selectedUser.id);
          };
          
          function _updateMessages(userId) {
            apiMail.getUserMessages(userId)
              .then(function(list){
                var firstMessage = list.filter(function(e){
                  return vm.sharedData.selectedBoxId === 1 ? (e.boxId === 1 || !e.boxId) : e.boxId === vm.sharedData.selectedBoxId;
                })[0];
                
                if(firstMessage)  firstMessage.opened = true;
                    
                vm.sharedData.messages = list;
                vm.sharedData.selectedMessage = firstMessage;
              });
          }

        },
        controllerAs: 'mainCtrl'
      };
  });
  
})();
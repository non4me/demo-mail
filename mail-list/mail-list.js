(function() {
  'use strict';

  angular.module('myMail')
      .directive('mailList', function() {
        return {
          templateUrl: 'mail-list/mail-list.html',
          replace: true,
          scope: {
            saveMessageState: '&',
            saveMessageStateAndListUpdate: '&'
          },
          bindToController: true,
          controller: function(sharedConfig) {
            var vm = this;
            vm.data = sharedConfig;

            vm.setSelected = function(message) {
              message.opened = true;
              vm.data.selectedMessage = message;
              vm.saveMessageState();
            };

            vm.isSelected = function(messageId) {
              if(vm.data.selectedMessage) {
                return vm.data.selectedMessage.id === messageId;
              }

              return false;
            };

            vm.boxFilter = function(message) {
              if(vm.data.selectedBoxId === 1 && (!message.boxId || message.boxId === 1)) {
                return true;
              }
              else {
                return vm.data.selectedBoxId === message.boxId;
              }

            }
          },
          controllerAs: 'mailList'
        };
      });
})();
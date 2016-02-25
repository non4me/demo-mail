(function() {
  'use strict';

  angular.module('myMail')
      .directive('mailList', function() {
        return {
          templateUrl: 'scripts/messages/mail-list/mail-list.html',
          replace: true,
          scope: {},
          bindToController: true,
          controller: function(sharedConfig) {

            this.data = sharedConfig;

            this.setSelected = (message) => {
              message.opened = true;
              this.data.selectedMessage = message;
              sharedConfig.saveMessageState();
            };

            this.isSelected = (messageId) => {
              if(this.data.selectedMessage) {
                return this.data.selectedMessage.id === messageId;
              }

              return false;
            };

            this.boxFilter = (message) => {
              if(this.data.selectedBoxId === 1 && (!message.boxId || message.boxId === 1)) {
                return true;
              }
              else {
                return this.data.selectedBoxId === message.boxId;
              }

            }
          },
          controllerAs: 'ctrlMailList'
        };
      });
})();

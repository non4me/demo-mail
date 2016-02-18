(function() {
  'use strict';

  angular.module('myMail')
      .directive('mailManager', function() {
        return {
          templateUrl: 'app/messages/mail-list/mail-manager/mail-manager.html',
          scope: false,
          controller: function(sharedConfig) {
            var vm = this;

            vm.boxes = sharedConfig.boxes;
            vm.selectedBoxId = sharedConfig.selectedBoxId;

            this.moveToBox = function(boxId, e) {
              e.stopPropagation();
              sharedConfig.selectedMessage.boxId = boxId;
              sharedConfig.saveMessageState();
              sharedConfig.updateMessasgeList();
            };
          },
          controllerAs: 'managerCtrl'
        };
      });

})();
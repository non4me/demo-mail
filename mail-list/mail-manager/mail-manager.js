(function() {
  'use strict';
  
  angular.module('myMail')
    .directive('mailManager', function() {
      return {
        templateUrl: 'mail-manager.html',
        scope: false,
        require: '^mailList',
        link: function(scope, element, attr, mailListCtrl) {
          scope.selectedBoxId = mailListCtrl.data.selectedBoxId;
          
          element.on('click', function(e){
            console.log('Clicked1!');
                    e.preventDefault();
                    console.log('Clicked2!');
                });

          scope.moveToBox = function(boxId, e) {
            e.stopPropagation();
            mailListCtrl.data.selectedMessage.boxId = boxId;
            mailListCtrl.saveMessageStateAndListUpdate();
            return;
          };
        },
        //controllerAs: 'mailMan'
      };
  });
  
})();
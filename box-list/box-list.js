(function() {
  'use strict';
  
  angular.module('myMail')
    .directive('boxList', function() {
      return {
        templateUrl: 'box-list.html',
        restrict: 'E',
        replace: true,
        scope: {
          data: '=',
          changeBox: '&'
        },
        bindToController: true,
        controller: function(store) { 
          var vm = this;
          
          vm.isSelected = function(id) {
            return vm.data.selectedBoxId === id;
          };
          
          vm.setSelected = function(boxId) {
            vm.changeBox({boxId: boxId});
          };
          
          vm.getMailCount = function(boxId) {
            var allMessages = store.getMessages();
            var counter = 0;
            
            if(angular.isArray(allMessages)) {
              angular.forEach(allMessages, function(e){
                if(e.userId === vm.data.selectedUser.id) {
                  if(e.boxId) {
                    if(e.boxId === boxId) ++counter;
                  }
                  else if(boxId === 1) {
                    ++counter;
                  }
                }
              });
            }
            
            return counter;
          };
        },
        controllerAs: 'boxList'
      };
  });
})();
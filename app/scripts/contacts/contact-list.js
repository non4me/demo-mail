(function() {
  'use strict';

  angular.module('myMail')
      .directive('contactList', function() {
        return {
          templateUrl: 'scripts/contacts/contact-list.html',
          replace: true,
          scope: {},
          bindToController: true,
          controller: function(sharedConfig) {

            this.data = sharedConfig;
            this.data.updateContactsList();

          },
          controllerAs: 'ctrlContactList'
        };
      });
})();

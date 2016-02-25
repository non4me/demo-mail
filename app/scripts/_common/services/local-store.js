(function() {
  'use strict';

  // service for localData management
  angular.module('myMail')
      .factory('store', function($q, $http) {
        let localStore = window.sessionStorage; //localStorage
        const MESSAGE_STORE = 'messages',
              CONTACT_STORE = 'contacts',
              USER_STORE = 'users';

        return {
          getUsers: () => _get(USER_STORE),
          saveUsers: (list) => _set(USER_STORE, list),

          getMessages: () => _get(MESSAGE_STORE),
          saveMessages: (list) =>  _set(MESSAGE_STORE, list),

          getContacts: () => _get(CONTACT_STORE),
          saveContacts: (list) => _set(CONTACT_STORE, list)
        };


        function _set (store, list) {
          if(store && angular.isArray(list)) {
            localStore.setItem(store, JSON.stringify(list));
          }
        }

        function _get(store) {
          var _data = localStore.getItem(store),
              list = [];

          if(_data) list = JSON.parse(_data);

          return list;
        }

      });

})();

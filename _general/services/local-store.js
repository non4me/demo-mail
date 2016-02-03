(function() {
  'use strict';

  // service for localData management
  angular.module('myMail')
      .factory('store', function($q, $http) {
        var localStore = window.sessionStorage; //localStorage
        var MESSAGE_STORE = 'messages',
            USER_STORE = 'users';

        return {
          getUsers: function() {
            return _get(USER_STORE);
          },

          saveUsers: function(list) {
            return _set(USER_STORE, list);
          },

          getMessages: function() {
            return _get(MESSAGE_STORE);
          },

          saveMessages: function(list) {
            return _set(MESSAGE_STORE, list);
          }
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
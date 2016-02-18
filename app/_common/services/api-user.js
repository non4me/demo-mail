(function() {
  'use strict';
  
  angular.module('myMail')
    .factory('apiUser', function($q, $http, store) {
      
      var restPoint = '.mocks/users.json',
          cache = {};

      return {
          getUserList: getUserList,
          getUser: getUser
        };

    //getUserList
      function getUserList() {
        return $q(function(resolve, reject){

          var storedUsers = store.getUsers();
          if (storedUsers.length) {
            resolve(storedUsers);
            return;
          }

          $http.get(restPoint)
            .then(function(result){
                if(angular.isArray(result.data)) {
                  store.saveUsers(result.data);
                  resolve(result.data);
                }
              }
            )
            .catch(function(error){
                console.warn(error);
                reject(error);
              });
        });
      }

    //getUser
      function getUser(userId) {
        return $q(function(resolve, reject){

          var storedUsers = store.getUsers();
          if (storedUsers.length) {
            var userData =  _findUser(storedUsers, userId);

            if (angular.isObject(userData)) {
              resolve(userData);
              return;
            }
          }

          $http.get(restPoint)
            .then(function(result){
                if(angular.isArray(result)) {
                  store.saveUsers(result);

                  var userData =  _findUser(result, userId);

                  if (angular.isObject(userData)) {
                    resolve(userData);
                  }
                  else {
                    _errorHandler('User not found' );
                  }

                }
                else {
                  _errorHandler('Incorrect server data');
                }
              }
            )
            .catch(function(error){
                _errorHandler(error);
              });
        });


        function _findUser(userList, userId) {
          return userList.filter(function(user){
              return user.id === userId;
            })[0];
        }
        
        function _errorHandler(error) {
          console.warn(error);
          reject(error);
        }
      }
      
  });
  
})();
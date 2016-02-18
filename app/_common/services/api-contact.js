(function() {
  'use strict';
  
  angular.module('myMail')
    .factory('apiContact', function($q, $http, store) { 
      
      var restPoint = 'http://jsonplaceholder.typicode.com/users',
          cache = {};

      return {
          getContactList: getContactList,
          getContact: getContact
        };
        
    //getContactList
      function getContactList() {
        return $q(function(resolve, reject){
          
          var storedContacts = store.getContacts();
          if (storedContacts.length) {
            resolve(storedContacts);
            return;
          }
          
          $http.get(restPoint)
            .then(function(result){
                if(angular.isArray(result.data)) {
                  store.saveContacts(result.data);
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
      
    //getContact
      function getContact(ContactId) {
        return $q(function(resolve, reject){
          
          var storedContacts = store.getContacts();
          if (storedContacts.length) {
            var ContactData =  _findContact(storedContacts, ContactId);
            
            if (angular.isObject(ContactData)) {
              resolve(ContactData);
              return;
            }
          }
          
          $http.get(restPoint)
            .then(function(result){
                if(angular.isArray(result)) {
                  store.saveContacts(result);
                  
                  var ContactData =  _findContact(result, ContactId);
            
                  if (angular.isObject(ContactData)) {
                    resolve(ContactData);
                  }
                  else {
                    _errorHandler('Contact not found' );
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
        
        
        function _findContact(ContactList, ContactId) {
          return ContactList.filter(function(Contact){
              return Contact.id === ContactId;
            })[0];
        }
        
        function _errorHandler(error) {
          console.warn(error);
          reject(error);
        }
      }
      
  });
  
})();
(function() {
  'use strict';
  
  angular.module('myMail')
    .factory('apiMail', function($q, $http, store) {
      var restPoint = 'http://jsonplaceholder.typicode.com/posts',
      cache = {};
      
      return {
          getUserMessages: getUserMessages,
          getMessage: getMessage,
          saveMessage: saveMessage
        };
        
    //getUserMessages
      function getUserMessages(userId) {
        return $q(function(resolve, reject){
          
          var storedMessages = store.getMessages();
          if (storedMessages.length) {
            var messageList =  _findUserMessages(storedMessages, userId);
            
            if (angular.isArray(messageList)) {
              resolve(messageList);
              return;
            }
          }
          
          $http.get(restPoint)
            .then(function(result){
                if(angular.isArray(result.data)) {
                  store.saveMessages(result.data);
                  
                  var messageList =  _findUserMessages(result.data, userId);
            
                  if (angular.isArray(messageList)) {
                    resolve(messageList);
                  }
                  else {
                    reject('Messages not found' );
                  }
                  
                }
                else {
                  reject('Incorrect server data');
                }
              }
            )
            .catch(function(error){
                reject(error);
              });
        });
      }
      
    //getMessage
      function getMessage(messageId) {
        return $q(function(resolve, reject){
          
          var storedMessages = store.getMessages();
          if (storedMessages.length) {
            var messageData =  _findMessage(storedMessages, messageId);
            
            if (angular.isObject(messageData)) {
              resolve(messageData);
              return;
            }
          }
          
          $http.get(restPoint)
            .then(function(result){
                if(angular.isArray(result.data)) {
                  store.saveMessages(result.data);
                  
                  var messageData =  _findMessage(result.data, messageId);
            
                  if (angular.isObject(messageData)) {
                    resolve(messageData);
                  }
                  else {
                    reject('Messages not found' );
                  }
                  
                }
                else {
                  reject('Incorrect server data');
                }
              }
            )
            .catch(function(error){
                reject(error);
              });
        });
        
      }
      
      
    //saveMessage
      function saveMessage(message) {
        var storedMessages = store.getMessages();
        
        storedMessages.forEach(function(e, i){
          if(e.id === message.id) {
            delete message.$$hashKey;
            storedMessages[i] = message;
          }
        });
        
        store.saveMessages(storedMessages);
      }
      
      
      
    //Helpers
      function _findMessage(messageList, id) {
        return messageList.filter(function(message){
            return message.id === id;
          })[0];
      }
      
      function _findUserMessages(messageList, userId) {
        return messageList.filter(function(message){
            return message.userId === userId;
        });
      }

  });
  
})();
(function() {
  'use strict';

  angular.module('myMail')
      .factory('sharedConfig', function(apiMail, apiContact) {

        return {
          boxes: [
            { id: 1, name: 'InBox', ico: 'save', sort: 0 },
            { id: 2, name: 'Favorites', ico: 'star', sort: 1 },
            { id: 3, name: 'Spam', ico: 'fire', sort: 2 },
            { id: 4, name: 'Trash', ico: 'trash', sort: 3 }
          ],
          selectedBoxId: 1,
          messages: [],
          contacts: [],
          users: [],
          selectedMessage: {},
          selectedUser: {},
          editProfile: false,
          saveMessageState: function () {
            apiMail.saveMessage(this.selectedMessage);
          },
          updateMessasgeList: function() {
            var _this = this;

            apiMail.getUserMessages(this.selectedUser.id)
                .then(function(list){
                  var firstMessage = list.filter(function(e){
                    return _this.selectedBoxId === 1 ? (e.boxId === 1 || !e.boxId) : e.boxId === _this.selectedBoxId;
                  })[0];

                  if(firstMessage)  firstMessage.opened = true;

                  _this.messages = list;
                  _this.selectedMessage = firstMessage;
                });
          },
          updateContactsList: function() {
            var _this = this;

            apiContact.getContactList()
              .then(function(list){
                _this.contacts = list;
              });
          }
        }

      });

})();

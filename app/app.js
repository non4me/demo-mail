(function(){
  'use strict';

  var app = angular.module('myMail', ['ui.router']);

  app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('mailUser', {
          abstract: true,
          url: '/u/{userId:int}',
          template: '<main></main>'
        })
        .state('mailUser.messages', {
          url: '/{boxId:int}',
          template: '<box-list></box-list>'
        })

        .state('mailUser.contacts', {
          url: '/contacts',
          template: '<contact-list></contact-list>'
        })
        //.state('mailUser.contacts.contact', {
        //  abstarct: true,
        //  url: '/{contactId:int}',
        //  template: '<contacts/><contacts>'
        //})
        //.state('mailUser.contacts.contact.edit', {
        //  url: '/edit',
        //  template: '<contacts/><contacts>'
        //})
    ;

    $urlRouterProvider.otherwise(function($injector, $location){
      let rootUrl = '/u/';
      let apiUser = $injector.get('apiUser');


      apiUser.getUserList().then(function(users){
        var userId = users[0].id;
        $location.replace().path(rootUrl + userId + '/1');
      });
    });
  });

})();


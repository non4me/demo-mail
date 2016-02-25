angular.module('myMail').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('scripts/_common/auth-form/auth-form.html',
    "<div class=auth-form ng-if=ctrlAuthForm.showLogIn><div class=backdrop><div class=form-group><input ng-model=login placeholder=\"Login (admin)\"> <input ng-model=password placeholder=\"Password (admin)\"> <button ng-click=\"doLogin(login, password)\">login</button></div></div></div>"
  );


  $templateCache.put('scripts/_common/loader/loader.html',
    "<div class=\"context-loader text-center\"><div class=loader><div class=loader__bar></div><div class=loader__bar></div><div class=loader__bar></div><div class=loader__bar></div><div class=loader__bar></div><div class=loader__ball></div></div><div class=small style=\"margin: -5px\">Loading ...</div></div>"
  );


  $templateCache.put('scripts/contacts/contact-list.html',
    "<div class=contact-list><div ng-repeat=\"contact in ctrlContactList.data.contacts | orderBy: 'name'\"><div class=contact><span class=contact-name>{{::contact.name }} aka {{::contact.username }}</span><br><span class=contact-email>{{::contact.email }}</span><div class=show-mail ng-show=ctrlContactList.isSelected(message.id)>{{ message.body }}</div></div></div></div>"
  );


  $templateCache.put('scripts/main.html',
    "<div class=app><div class=\"row top\"><h1 class=\"logo zero-margin col-xs-6\"><img src=img/logo.png width=50> myMail</h1><div class=\"user-name col-xs-6 text-right\"><user></user></div></div><ul class=\"nav nav-tabs\"><li role=presentation ng-class=\"{active: mainCtrl.currentState === 'mailUser.messages'}\"><a ng-click=\"mainCtrl.setTab('mailUser.messages', {boxId:1})\">Messages</a></li><li role=presentation ng-class=\"{active: mainCtrl.currentState === 'mailUser.contacts'}\"><a ng-click=\"mainCtrl.setTab('mailUser.contacts')\">Contacts</a></li></ul><div class=\"main row zero-margin zero-padding\"><ui-view><context-loader></context-loader></ui-view></div></div>"
  );


  $templateCache.put('scripts/messages/box-list/box-list.html',
    "<div><div class=\"box-list col-sm-2 zero-padding\"><a class=box-name ng-class=\"{'selected': ctrlBoxList.isSelected(box.id) }\" ng-repeat=\"box in ctrlBoxList.data.boxes | orderBy: 'sort'\" ui-sref={boxId:box.id}><span class=\"glyphicon glyphicon-{{box.ico}}\" style=color:#777></span> <span class=mail-counter>{{ ctrlBoxList.getMailCount(box.id) }}</span> {{ box.name }}</a></div><mail-list class=col-sm-10></mail-list></div>"
  );


  $templateCache.put('scripts/messages/mail-list/mail-list.html',
    "<div class=mail-list><h2 class=zero-margin>{{ ctrlMailList.data.selectedBox }}</h2><div ng-repeat=\"message in ctrlMailList.data.messages | filter:ctrlMailList.boxFilter | orderBy: 'id'\"><div class=mail ng-class=\"{'selected': ctrlMailList.isSelected(message.id) }\" ng-click=ctrlMailList.setSelected(message)><mail-manager data=ctrlMailList.data></mail-manager><span class=\"mail-ico glyphicon {{message.opened ? 'glyphicon-eye-open' : 'glyphicon-eye-close'}}\"></span> <span class=mail-header>{{ message.title }}</span><div class=show-mail ng-show=ctrlMailList.isSelected(message.id)>{{ message.body }}</div></div></div></div>"
  );


  $templateCache.put('scripts/messages/mail-list/mail-manager/mail-manager.html',
    "<div class=\"mail-manger text-right\"><button ng-repeat=\"box in CtrlManager.boxes\" title=\"Move to {{box.name}}\" ng-click=\"CtrlManager.moveToBox(box.id, $event)\" ng-show=\"CtrlManager.selectedBoxId !== box.id\"><span class=\"glyphicon glyphicon-{{box.ico}}\"></span></button></div>"
  );


  $templateCache.put('scripts/user/user-profile/user-profile.html',
    "<div>Edit user profile<br>Не успел =( <button>Save</button></div>"
  );


  $templateCache.put('scripts/user/user.html',
    "<div class=\"user pull-right\"><div class=user-info ng-click=\"userCtrl.listOpen = !userCtrl.listOpen\"><img ng-src={{userCtrl.data.selectedUser.picture.thumbnail}} width=\"30\"> <span class=title>{{userCtrl.data.selectedUser.name.title}}</span>. <span class=name>{{userCtrl.data.selectedUser.name.first | capitalize}} {{userCtrl.data.selectedUser.name.last | capitalize}}</span> <span class=\"glyphicon {{ userCtrl.listOpen ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-left'}}\"></span><div class=users-list ng-show=userCtrl.listOpen><div class=user-in-list ng-repeat=\"user in userCtrl.data.users | filter:userCtrl.excludeUser\" ng-click=userCtrl.selectUser(user)><img ng-src={{user.picture.thumbnail}} width=\"30\"> <span class=title>{{user.name.title}}</span>. <span class=name>{{user.name.first | capitalize}} {{user.name.last | capitalize}}</span></div></div></div></div>"
  );

}]);

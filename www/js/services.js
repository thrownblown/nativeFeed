angular.module('sideMenuApp.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('MenuService', function() {

  var menuItems = [
      { text: 'Page One', iconClass: 'icon ion-map', link: '#/one'},
      { text: 'Page Two', iconClass: 'icon ion-gear-b', link: '#/two'},
      { text: 'Page Three', iconClass: 'icon ion-star', link: '#/three'}
  ];

  return {
    all: function() {
      return menuItems;
    }
  }
});

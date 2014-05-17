var app = angular.module('sideMenuApp.services', []);

/**
 * A simple example service that returns some data.
 */
app.factory('MenuService', function() {

  var menuItems = [
      { text: '1 Page One', iconClass: 'icon ion-map', link: 'one'},
      { text: '2 Page Two', iconClass: 'icon ion-gear-b', link: 'two'},
      { text: '3 Page Three', iconClass: 'icon ion-star', link: 'three'}
  ];

  return {
    all: function() {
      return menuItems;
    }
  }
});
// var app = angular.module('feedApp');

app.factory('socket', function($rootScope) { 
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

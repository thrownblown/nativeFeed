var app = angular.module('blackBoxApp.services', []);

/**
 * A simple example service that returns some data.
 */
app.factory('MenuService', function() {

  var menuItems = [
      { text: 'Chats', iconClass: 'icon ion-ios7-bolt', link: 'chats'},
      { text: '2 Page Two', iconClass: 'icon ion-gear-b', link: 'two'},
      { text: '3 Page Three', iconClass: 'icon ion-star', link: 'three'}
  ];

  return {
    all: function() {
      return menuItems;
    }
  }
});

app.factory('socket', function($rootScope) {

  function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    head.appendChild(script);
  }
  function init() {
    loadScript('js/socket.io.js', function (socket) {  
    })
  }
  init();
  var socket = io.connect("http://191.236.103.192:80");



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

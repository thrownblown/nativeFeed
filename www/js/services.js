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

app.factory('PetService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
});

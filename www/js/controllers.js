angular.module('sideMenuApp.controllers', [])

    .controller('MenuController', function ($scope, $location, MenuService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = MenuService.all();

        $scope.goTo = function(page) {
            console.log('Going to ' + page);
            $scope.sideMenuController.toggleLeft();
            $location.url('/' + page);
        };
    })

    .controller('OneController', function ($scope, socket) {
        $scope.navTitle = "blackbox";

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [];


    $scope.chats = {
      999999999999999999999999: {
        _id: '999999999999999999999999',
        timestamp: '2112-12-31T23:59:59.361Z',
        body: 'Godspeed You! Black Emperor',
        user: 'Mitsuo_Yanagimachi',
        image: './images/Alfred_E_Neuman.jpg',
        pic: './images/Alfred_E_Neuman.jpg'
      }
    };
        function loadScript(url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = callback;
            head.appendChild(script);
          }

          function init() {

            loadScript('js/socket.io.js', function () {

              var socket = io.connect("http://191.236.103.192:80");

              document.getElementById('log').innerHTML = "connecting";

              socket.on('ping', function (data) {
                document.getElementById('log').innerHTML = data.message;
                socket.emit('pong', { message: 'Hello from client!' });
                socket.emit('hello');
              });

              socket.on('connect', function () {
                 socket.emit('hello');
                 document.getElementById('log').innerHTML = "connected";
              });

              socket.on('reconnect', function () {
                document.getElementById('log').innerHTML = "reconnected";
              });

              socket.on('disconnect', function () {
                document.getElementById('log').innerHTML = "disconnected";
              });

              socket.on('reconnecting', function () {
                document.getElementById('log').innerHTML = "reconnecting...";
              });

              socket.on('error', function () {
                document.getElementById('log').innerHTML = "error";
              });
              socket.on('newMessage', function(data) {
                console.log('fishon', data);
                var newChat = data.data;
                $scope.chats[newChat._id] = newChat;
              });
            });
          }
          init();


        $scope.refreshChats = function(){
          alert('hello pull chats');
          socket.emit('hello');
        }

        $scope.pullChats = function (){
          $scope.refreshChats();
          $scope.fetchChats();
        }

        $scope.fetchChats = function() {
          var chatArr = $scope.chats;
          chatArr = Object.keys(chatArr).sort();
          var chat = $scope.chats[chatArr[0]];
          // console.log(chatArr, chat);
          socket.emit('fetch', chat)
        } 


        $scope.sendChat = function(chat) {
            if (!isChatValid(chat)) {
                // console.log('Invalid chat, overriding "send".');
                return;
            }
            socket.emit('newChat', {
                // user: $scope.user.name,
                body: chat.body,
                image: '',
                type: 200
            });
            // resetChatForm(chat);
        }

        $scope.refreshChats();



// 'use strict'

// var app = angular.module('feedApp');

// app.factory('socket', function($rootScope) { // MOVE FACTORIES TO A SEPARATE FILE?
//     var socket = io.connect();
//     return {
//         on: function(eventName, callback) {
//             socket.on(eventName, function() {
//                 var args = arguments;
//                 $rootScope.$apply(function() {
//                     callback.apply(socket, args);
//                 });
//             });
//         },
//         emit: function(eventName, data, callback) {
//             socket.emit(eventName, data, function() {
//                 var args = arguments;
//                 $rootScope.$apply(function() {
//                     if (callback) {
//                         callback.apply(socket, args);
//                     }
//                 });
//             });
//         }
//     };
// });

// app.directive('slidePanel', ['$swipe', function($swipe) { // MOVE DIRECTIVES TO A SEPARATE FILE?
//     return {
//         restrict: 'EA',
//         link: function(scope, elem, attrs, ctrl) {
//             var startX, pointX;
//             $swipe.bind(elem, {
//                 'start': function(coords) {
//                     startX = coords.x;
//                     pointX = coords.y;
//                 },
//                 'move': function(coords) {
//                     var delta = coords.x - pointX;
//                 },
//                 'end': function(coords) {},
//                 'cancel': function(coords) {}
//             });
//         }
//     };
// }]);

// app.directive('scrollBottom', function($window) { // MOVE DIRECTIVES TO A SEPARATE FILE?
//     var scrollBottomWrap = function() {
//         var scrollToBottom = function() {
//             var feed = document.getElementById('feed');
//             feed.scrollTop = feed.scrollHeight + 44;
//         };
//         scrollToBottom();
//         $window.addEventListener('resize', function() {
//             scrollToBottom();
//         });
//     };
//     return {
//         link: scrollBottomWrap
//     };
// });

// var feedbackPerLength = function(length) {
//     var composeField = document.getElementById('composeField');
//     var limit = composeField.attributes.getNamedItem('char-limit').value;
//     switch (true) {
//         case (limit <= length):
//             composeField.classList.add('danger');
//             break;
//         case (limit - length <= 20):
//             composeField.classList.remove('danger');
//             composeField.classList.add('warning');
//             break;
//         default:
//             composeField.classList.remove('danger');
//             composeField.classList.remove('warning');
//     }
// };

// app.directive('charLimit', function() { // MOVE DIRECTIVES TO A SEPARATE FILE?
//     return {
//         restrict: 'A',
//         link: function(scope, elem, attrs) {
//             var limit = attrs.charLimit;
//             elem.bind('keyup', function(event) {
//                 var length = elem.val().length;
//                 feedbackPerLength(length); // Color the field if text too long.
//             });
//             elem.bind('keypress', function(event) {
//                 if (elem.val().length >= limit) {
//                     if (event.keyCode !== 8) { // Prevent non-backspace keypresses if length exceeds limit.
//                         event.preventDefault();
//                     }
//                 }
//             });
//         }
//     };
// });

// app.controller('MainCtrl', function($scope, $http, $window, socket, $location, Auth) {
      
//   $scope.logout = function() {
//     Auth.logout()
//     .then(function() {
//       $location.path('/login');
//     });
//   };
// // BREAK SOME OF THESE PIECES BELOW INTO SEPARATE CONTROLLERS?

//     // This function is called if the user makes a dropdown selection.
//     $scope.composeCanned = function(chat) {
//         // Add user's dropdown selection to the composition field.
//         if (chat.body === undefined) {
//             chat.body = $scope.cannedModel;
//         } else {
//             chat.body += ' ' + $scope.cannedModel;
//         }
//         feedbackPerLength(chat.body.length); // Color the field if text too long.
//     };

//     socket.on('init', function(data) {
//         console.log('Socket connection established.');
//     });

//     /*
//     $scope.messageFilter = function(chats) {
//       var result = {};
//       angular.forEach(chats, function(value, key){
//         console.log('value.type', value.type);
//         var showThisType = $scope.settings.messageTypes[value.type].show;
//         if(showThisType){
//           result[key] = value;
//         }
//       });
//       console.log('result', result);
//       return result;
//     };
// */

//     $scope.display = {
//         zones: {
//             selectAll: true,
//             show: false
//         },
//         messageTypes: {
//             selectAll: true,
//             show: false
//         },
//         users: {
//             selectAll: true,
//             show: false
//         }
//     };

//     $scope.settings = {
//         zones: {
//             '1': {
//                 show: true
//             },
//             '2': {
//                 show: true
//             },
//             '3': {
//                 show: true
//             },
//             '4': {
//                 show: true
//             },
//             '5': {
//                 show: true
//             },
//             '6': {
//                 show: true
//             },
//             '7': {
//                 show: true
//             }
//         },
//         messageTypes: {
//             200: {
//                 label: 'Chats',
//                 show: true
//             },
//             300: {
//                 label: 'Instagram',
//                 show: true
//             },
//             101: {
//                 label: 'Courier check-in',
//                 show: true
//             },
//             102: {
//                 label: 'Courier check-out',
//                 show: true
//             },
//             103: {
//                 label: 'Job created',
//                 show: true
//             },
//             104: {
//                 label: 'Job cancelled',
//                 show: true
//             },
//             105: {
//                 label: 'Job edited',
//                 show: true
//             },
//             106: {
//                 label: 'Job ready',
//                 show: true
//             },
//             107: {
//                 label: 'Job assigned',
//                 show: true
//             },
//             108: {
//                 label: 'Job picked',
//                 show: true
//             },
//             109: {
//                 label: 'Job delivered',
//                 show: true
//             },
//             110: {
//                 label: 'Job complete',
//                 show: true
//             },
//             111: {
//                 label: 'Job late',
//                 show: true
//             }
//         },
//         users: []
//     };


//     $scope.toggleSection = function(section) {
//         for (var key in $scope.display) {
//             if (key === section) {
//                 if ($scope.display[key].show === true) {
//                     $scope.display[key].show = false;
//                 } else {
//                     $scope.display[key].show = true;
//                 }
//             } else {
//                 $scope.display[key].show = false;
//             }
//         }
//     };


//     $scope.selectAll = function(section) {
//         var newValue = !$scope.display[section].selectAll;
//         $scope.display[section].selectAll = newValue;
//         for (var key in $scope.settings[section]) {
//             $scope.settings[section][key].show = newValue;
//         }
//     };


//     $scope.configureUserSettings = function() {
//         $http.get('/api/users/me').success(function(user) {
//             $scope.user = user || 'guest';
//         }).error(function(data, status, headers, config) {
//             console.log('GET error!', '\ndata:', data, '\nstatus:', status, '\nheaders:', headers, '\nconfig:', config);
//         });
//         $scope.getAvatars();
//     };

//     $scope.updateFilters = function() {
//         console.log('change');
//     };

//     $scope.toggle = function() {
//         // console.log('show', this.show);
//         this.show = !this.show;
//         // console.log('show', this.show);
//     };


//     $scope.showPanelLeft = false;
//     $scope.togglePanelLeft = function() {
//         $scope.showPanelLeft = ($scope.showPanelLeft) ? false : true;
//         if ($scope.user !== 'guest') {
//             $http.post('/api/users/me', {
//                 propertyKey: 'settings',
//                 propertyValue: $scope.settings,
//                 userId: $scope.user._id
//             }).success(function() {
//                 console.log('POST success!');
//             });
//         }
//     };

//     $scope.showPanelRight = false;
//     $scope.togglePanelRight = function() {
//         $scope.showPanelRight = ($scope.showPanelRight) ? false : true;
//     };

//     $scope.loadAvatar = function() {
//         // $scope.showAvatarControls = false;
//         $http.get('/api/users/me').success(function(user) {
//             var str = 'url("' + user.avatar + '")';
//             // $('#avatarDisplay').css('background-image', str); // jQuery refactored to vanilla JS below.
//             document.getElementById('avatarDisplay').style.backgroundImage = str;
//         }).error(function(data, status, headers, config) {
//             console.log('GET error!', '\ndata:', data, '\nstatus:', status, '\nheaders:', headers, '\nconfig:', config);
//         });
//     };

//     var previewPhoto = function(file, canvas) {
//         var image = new Image();
//         var reader = new FileReader();
//         $scope.showAvatarControls = true;
//         $scope.$apply();
//         reader.onload = function(e) {
//             image.src = e.target.result;

//             //scale image
//             var MAX_WIDTH = 80;
//             var MAX_HEIGHT = 80;
//             var width = image.width;
//             var height = image.height;
//             if (width > height) {
//                 if (width > MAX_WIDTH) {
//                     height *= MAX_WIDTH / width;
//                     width = MAX_WIDTH;
//                 }
//             } else {
//                 if (height > MAX_HEIGHT) {
//                     width *= MAX_HEIGHT / height;
//                     height = MAX_HEIGHT;
//                 }
//             }
//             canvas.width = width;
//             canvas.height = height;
//             var ctx = canvas.getContext('2d');
//             ctx.drawImage(image, 0, 0, width, height);
//         };
//         reader.readAsDataURL(file);
//     };

//     $scope.toggle = function() {
//         // console.log('show', this.show);
//         this.show = !this.show;
//         // console.log('show', this.show);
//     };

//     $scope.previewAvatar = function() {
//         var file = document.getElementById('avatarInput').files[0];
//         var canvas = document.getElementById('avatarCanvas');
//         previewPhoto(file, canvas);
//     };

//     $scope.saveAvatar = function() {
//         var encoding = document.getElementById('avatarCanvas').toDataURL();
//         console.log('save encoding', encoding);
//         $http.post('/api/users/me', {
//             propertyValue: encoding,
//             propertyKey: 'avatar',
//             userId: $scope.user._id
//         }).success(function() {
//             $scope.resetAvatarControls();
//             $scope.loadAvatar();
//             console.log('Image saved to database');
//         });
//     };

//     $scope.cancelAvatar = function() {
//         // $('#avatarImage').attr('src', ''); // jQuery refactored to vanilla JS below.
//         document.getElementById('avatarImage').setAttribute('src', '');
//     };

//     $scope.resetAvatarControls = function() {
//         // $('#avatarInput').replaceWith('<input id="avatarInput" ng-show="showAvatar" onchange="angular.element(this).scope().previewAvatar()" type="file" accept="image/*" capture="camera">'); // Refactor jQ to JS below.
//         document.getElementById('avatarInput').outerHTML = '<input id="avatarInput" ng-show="showAvatar" onchange="angular.element(this).scope().previewAvatar()" type="file" accept="image/*" capture="camera">';
//         $scope.showAvatarControls = false;
//         $scope.$apply();
//     };

//     $scope.toggleStats = function() {
//         $scope.showStats = !$scope.showStats;
//         $scope.showAvatar = false;
//     };

//     $scope.toggleAvatar = function() {
//         $scope.showAvatar = !$scope.showAvatar;
//         $scope.showStats = false;
//     };

//     //--------------------------------------------------
//     //
//     //  MAIN PANEL grunt
//     //
//     //-------------------------------------------------

//     $scope.chats = {};

//     $scope.refreshChats = function(){
//       socket.emit('hello');
//     }

//     $scope.refreshChats();

//     $scope.pullChats = function (){
//       alert('hello pull chats');
//       $scope.refreshChats();
//       $scope.fetchChats();
//     }


//     $scope.fetchChats = function() {
//       var chatArr = $scope.chats;
//       chatArr = Object.keys(chatArr).sort();
//       var chat = $scope.chats[chatArr[0]];
//       // console.log(chatArr, chat);
//       socket.emit('fetch', chat)
//     } 

//     socket.on('newMessage', function(data) {
//         // console.log('fishon', data);
//         var newChat = data.data;
//         $scope.chats[newChat._id] = newChat;
//         $scope.getAvatars();
//     });

//     $scope.sendChat = function(chat) {
//         if (!isChatValid(chat)) {
//             // console.log('Invalid chat, overriding "send".');
//             return;
//         }
//         socket.emit('newChat', {
//             user: $scope.user.name,
//             body: chat.body,
//             image: '',
//             type: 200
//         });
//         resetChatForm(chat);
//     }
//     var toolsVisible = false;
//     $scope.showTools = function() {
//         return toolsVisible;
//     };
//     $scope.toggleTools = function() {
//         var feed = document.getElementById('feed');
//         if (toolsVisible === true) {
//             toolsVisible = false;
//             feed.style.bottom = '44px';
//             feed.scrollTop = feed.scrollHeight + 44;
//             $scope.searchString = '';
//             $scope.cannedModel = '';
//         } else {
//             toolsVisible = true;
//             feed.style.bottom = (44 + 40 * 3) + 'px'; // 3 tools.
//             feed.scrollTop = feed.scrollHeight + (44 + 40 * 3); // 3 tools.
//         }
//     };

//     $scope.getAvatars = function() {
//         $scope.avatars = {};
//         $http.get('/api/users').success(function(usersInDB) {
//             for (var i = 0; i < usersInDB.length; i++) {
//                 $scope.avatars[usersInDB[i].name] = usersInDB[i].avatar;
//             }
//         });
//         angular.forEach($scope.chats, function(chat, hash){
//             if (chat.type !== 200){
//                 $scope.avatars[chat.user] = chat.pic;
//             }
//         })
//     };

    var isChatValid = function(chat) {
        if (chat.body === undefined || chat.body.length > 140) {
            return false;
        } else {
            return true;
        }
    };

    var resetChatForm = function(chat) {
        $scope.cannedModel = '';
        chat.body = undefined;
    };

//     $scope.getUsername = function() {
//         $http.get('/api/users/me').success(function(user) {
//             $scope.currentUser = user;
//             $scope.settings.users = user.settings.users;
//             console.log($scope.settings.users);
//         });
//     };

//     $scope.layer;
//     $scope.map;
//     $scope.dropMarker;
//     $scope.pickMarker;

//     $scope.hideMap = true;
//     $scope.createMap = function() {
//         $scope.layer = new L.StamenTileLayer('toner');
//         $scope.map = new L.Map('map', {
//             center: new L.LatLng(37.7, - 122.4),
//             zoom: 14
//         });
//         $scope.map.addLayer($scope.layer);

//         //drop Location
//         var redMarker = L.AwesomeMarkers.icon({
//             icon: 'bolt',
//             prefix: 'fa',
//             markerColor: 'red'
//         });

//         //pick Location
//         var greenMarker = L.AwesomeMarkers.icon({
//             icon: 'plane',
//             prefix: 'fa',
//             markerColor: 'green'
//         });

//         $scope.pickMarker = L.marker([37.8, - 120], {
//             icon: greenMarker
//         }).addTo($scope.map);
//         $scope.dropMarker = L.marker([37.7, - 122.4], {
//             icon: redMarker
//         }).addTo($scope.map);

//         // $('#map').height($(window).height()); // jQ refactored to JS below.
//         document.getElementById('map').style.height = window.innerHeight;
//         $scope.map.invalidateSize();
//     };

//     $scope.hidePic = true;
//     $scope.createPic = function() {
//         // $('#pic').height($(window).height()); // jQuery refactor to vanilla JS below.
//         document.getElementById('pic').style.height = window.innerHeight;
//     };

//     $scope.showMapOrPic = function(chat) {
//         // console.log(chat);
//         if (chat.image || chat.dropCoordinates){
//             if (chat.image !== undefined) {
//                 var pic = document.getElementById('pic');
//                 pic.style.backgroundImage = 'url(' + chat.image + ')';
//                 pic.style.backgroundRepeat = 'no-repeat';
//                 pic.style.backgroundPosition = 'center center';
//                 $scope.hidePic = false;
//             } else if (chat.pickCoordinates !== undefined || chat.dropCoordinates !== undefined) {
//                 var pickLat = JSON.parse(chat.pickCoordinates).lat;
//                 var pickLng = JSON.parse(chat.pickCoordinates).lng;
//                 var dropLat = JSON.parse(chat.dropCoordinates).lat;
//                 var dropLng = JSON.parse(chat.dropCoordinates).lng;
//                 //pan-center map to the mid-point btw pick & drop
//                 var panLat = (pickLat + dropLat)/2;
//                 var panLng = (pickLng + dropLng)/2;
//                 $scope.dropMarker.setLatLng([dropLat, dropLng]);
//                 if ((pickLat === dropLat) && (pickLng === dropLng)) {
//                     $scope.pickMarker.setLatLng([0, 0]);
//                 } else {
//                     $scope.pickMarker.setLatLng([pickLat, pickLng]);
//                 }
//                 $scope.hideMap = false;
//                 $scope.map.panTo(new L.LatLng(panLat, panLng), {animate: true, duration: 0.5, easeLinearity: 0.25});
//             }
//         }
//     };
    })

    .controller('TwoController', function ($scope) {
        $scope.navTitle = "Page Two Title";

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [];
    })

    .controller('ThreeController', function ($scope) {
        $scope.navTitle = "Page Three Title";

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [];
    });
// });

// app.filter('searchFor', function() {
//     return function(arr, searchString) {
//         if (!searchString) {
//             return arr;
//         }
//         var result = [];
//         searchString = searchString.toLowerCase();
//         angular.forEach(arr, function(chat) {
//             if (chat.body && chat.body.toLowerCase().indexOf(searchString) !== -1) {
//                 result.push(chat);
//             }
//         });
//         return result;
//     };
// });

// app.filter('messageFilter', function() {
//     return function(input, settings) {
//         var result = {};
//         angular.forEach(input, function(value, key) {
//             // console.log('value', value, key);
//             // console.log('obj crap', settings.messageTypes[value.type]);
//             var showType = settings.messageTypes[value.type].show;
//             //var showZone = settings.zones[value.zone].show;
//             //var showUser = settings.users[value.user].show;
//             if (showType) { //if(showType && showZone && showUser){
//                 result[key] = value;
//             }
//         });
//         return result;
//     };
// });
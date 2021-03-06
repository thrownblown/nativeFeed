angular.module('blackBoxApp.controllers', [])

    .controller('MenuController', function ($scope, $location, MenuService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = MenuService.all();

        $scope.goTo = function(page) {
            console.log('Going to ' + page);
            $scope.sideMenuController.toggleLeft();
            $location.url('/' + page);
        };
    })

    .controller('OneController', function ($scope, socket, $timeout, $window) {
        $scope.navTitle = "blackbox";

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleRiht();
            }
        }];


        $scope.chats = []; 
        $scope.chatMem = {};
        var chatList = function(obj){
          var arr = [];
          angular.forEach(obj, function(value, key){
            arr.push(value);
          });
          return arr;
        };

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
            // console.log('fishon', data);
            var newChat = data.data;
            $scope.chatMem[newChat._id] = newChat;
            $scope.chats = chatList($scope.chatMem);

          });
          
        socket.on('init', function(data) {
            console.log('Socket connection established.');
        });

        $scope.refreshChats = function(){
          alert('server connection are go!');
          socket.emit('hello');
        }

        $scope.pullChats = function (){
          alert('hey hey pulling chats');
          $scope.chats = [];
          $scope.refreshChats();
          $scope.fetchChats();
        }
   
        this.fresh = function() {
            console.log('Refreshing!');
          alert('hey hey pulling chats');
          $scope.chats = [];
          $scope.refreshChats();
          $scope.fetchChats();
          $scope.$broadcast('scroll.refreshComplete');
            $timeout( function() {
               $scope.$broadcast('scroll.refreshComplete');  
            }, 1000);
        };

        // $scope.doRefresh = function() {
        // };

        $scope.fetchChats = function() {
          // var chatArr = $scope.chats;
          // chatArr = Object.keys(chatArr).sort();
          var chat = $scope.chats[0];
          console.log(chatArr, chat);
          socket.emit('fetch', chat);
          $scope.$broadcast('scroll.infiniteScrollComplete');

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
            resetChatForm(chat);
        }

        $scope.refreshChats();




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

//     $scope.updateFilters = function() {
//         console.log('change');
//     };

//     $scope.toggle = function() {
//         // console.log('show', this.show);
//         this.show = !this.show;
//         // console.log('show', this.show);
//     };

    var toolsVisible = false;
    $scope.showTools = function() {
        return toolsVisible;
    };
    $scope.toggleTools = function() {
        var feed = document.getElementById('feed');
        if (toolsVisible === true) {
            toolsVisible = false;
            // feed.style.bottom = '44px';
            // feed.scrollTop = feed.scrollHeight + 44;
            $scope.searchString = '';
            $scope.cannedModel = '';
        } else {
            toolsVisible = true;
            feed.style.bottom = (44 + 40 * 3) + 'px'; // 3 tools.
            feed.scrollTop = feed.scrollHeight + (44 + 40 * 3); // 3 tools.
        }
    };


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

    $scope.layer;
    $scope.map;
    $scope.dropMarker;
    $scope.pickMarker;

    $scope.hideMap = true;
    $scope.createMap = function() {
        $scope.layer = new L.StamenTileLayer('toner');
        $scope.map = new L.Map('map', {
            center: new L.LatLng(37.7, - 122.4),
            zoom: 14
        });
        $scope.map.addLayer($scope.layer);

        //drop Location
        var redMarker = L.AwesomeMarkers.icon({
            icon: 'bolt',
            prefix: 'fa',
            markerColor: 'red'
        });

        //pick Location
        var greenMarker = L.AwesomeMarkers.icon({
            icon: 'plane',
            prefix: 'fa',
            markerColor: 'green'
        });

        $scope.pickMarker = L.marker([37.8, - 120], {
            icon: greenMarker
        }).addTo($scope.map);
        $scope.dropMarker = L.marker([37.7, - 122.4], {
            icon: redMarker
        }).addTo($scope.map);

        // $('#map').height($(window).height()); // jQ refactored to JS below.
        document.getElementById('map').style.height = window.height;
        $scope.map.invalidateSize();
    };

    $scope.hidePic = true;
    $scope.createPic = function() {
        // $('#pic').height($(window).height()); // jQuery refactor to vanilla JS below.
        document.getElementById('pic').style.height = window.height;
    };

    $scope.showMapOrPic = function(chat) {
        console.log('show map or pic ', chat);
        if (chat.image || chat.dropCoordinates){
            if (chat.image !== undefined) {
                var pic = document.getElementById('pic');
                pic.style.backgroundImage = 'url(' + chat.image + ')';
                pic.style.backgroundRepeat = 'no-repeat';
                pic.style.backgroundPosition = 'center center';
                $scope.hidePic = false;
            } else if (chat.pickCoordinates !== undefined || chat.dropCoordinates !== undefined) {
                var pickLat = JSON.parse(chat.pickCoordinates).lat;
                var pickLng = JSON.parse(chat.pickCoordinates).lng;
                var dropLat = JSON.parse(chat.dropCoordinates).lat;
                var dropLng = JSON.parse(chat.dropCoordinates).lng;
                //pan-center map to the mid-point btw pick & drop
                var panLat = (pickLat + dropLat)/2;
                var panLng = (pickLng + dropLng)/2;
                $scope.dropMarker.setLatLng([dropLat, dropLng]);
                if ((pickLat === dropLat) && (pickLng === dropLng)) {
                    $scope.pickMarker.setLatLng([0, 0]);
                } else {
                    $scope.pickMarker.setLatLng([pickLat, pickLng]);
                }
                $scope.hideMap = false;
                $scope.map.panTo(new L.LatLng(panLat, panLng), {animate: true, duration: 0.5, easeLinearity: 0.25});
            }
        }
    };
    })

    
    .controller('TwoController', function ($scope, PetService) {
    // .controller('TwoController', function ($scope) {
        $scope.navTitle = "Map";

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.sideMenuController.toggleLeft();
            }
        }];

        $scope.rightButtons = [];
        $scope.map = {
            defaults: {
                tileLayer: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                maxZoom: 14,
                zoomControlPosition: 'bottomleft',
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
                }
            },
            center: {
                lat: 44.52,
                lng: -122.68,
                zoom: 5
            }
        };

        // navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);


        var onGeoSuccess = function(position) {
            alert('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');
        };

        // onGeoError Callback receives a PositionError object
        //
        var onGeoError = function(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    })


    // A simple controller that shows a tapped item's data
    .controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
      // "Pets" is a service returning mock data (services.js)
      $scope.pet = PetService.get($stateParams.petId);
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
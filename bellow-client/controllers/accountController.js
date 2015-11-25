/*
    The account controller for the Bellow controller
*/

(function () {

    var BellowApp = angular.module('BellowApp');

    BellowApp.controller('accountController', function (authenticationService, $scope, $rootScope, toaster, $timeout, apiService, uiGmapGoogleMapApi, globalData) {

        console.log('In the account controller');

        $scope.user = {
            fullname: "",
            email: "",
            dateOfBirth: ""
        };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 40.1451,
                longitude: -99.6680
            },
            options: { draggable: true },
            events: {
                dragend: function (marker, eventName, args) {
                    log.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();

                    //Save the coordinates to the user's home position
                    $scope.user.home.latitude = lat;
                    $scope.user.home.longitude = lon;

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };

        $scope.files = [];

        function init() {
            //authenticationService.getToken();
            var userEmail = authenticationService.getEmail();

            console.log(globalData.userInfo);

            if (userEmail) {
                apiService.getUserInfo(userEmail).then(function (results) {
                    $scope.user = results.userInfo;
                    globalData.userInfo = results.userInfo;

                    $timeout(function () {
                        $scope.$apply();
                        console.log('User Info: ');
                        console.log($scope.user);
                    });
                });
            } else {
                console.log('no email address saved');
            }

            // Initialize the map
            uiGmapGoogleMapApi.then(function (maps) {
                $scope.map = {
                    center: {
                        latitude: 45,
                        longitude: -73
                    },
                    zoom: 8
                };
            });

            // Get the current user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {

                    // Save the user's position
                    globalData.userPosition.lat = position.coords.latitude;
                    globalData.userPosition.lon = position.coords.longitude;

                    // Update the map
                    $scope.map.center = {
                        latitude: globalData.userPosition.lat,
                        longitude: globalData.userPosition.lon
                    };

                    $scope.marker.coords.latitude = position.coords.latitude;
                    $scope.marker.coords.longitude = position.coords.longitude;

                    $timeout(function () {
                        $scope.$apply();
                    });

                });

                //Set the map to the user's current position

            } else {
                console.log('Since we dont have the users location, wing it');
                //We don't have the position, use the user's home position which can be found in the user's information
            }
        }

        $scope.$watch('user', function () {
            console.log($scope.user);
        });

        init();
    });

})();
/*
    The home page controller for the Bellow controller
*/

(function () {

    var BellowApp = angular.module('BellowApp');

    BellowApp.controller('homeController', function (authenticationService, $scope, $rootScope, toaster, $timeout, uiGmapGoogleMapApi, globalData) {

        console.log('In the main controller');
        
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

                $timeout(function () {
                    $scope.$apply();
                });

            });

            //Set the map to the user's current position
        
        } else {
            console.log('Since we dont have the users location, wing it');
            //We don't have the position, use the user's home position which can be found in the user's information
        }

    });

})();
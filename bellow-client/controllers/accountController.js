/*
    The account controller for the Bellow controller
*/

(function () {

    var BellowApp = angular.module('BellowApp');

    BellowApp.controller('accountController', function (authenticationService, $scope, $rootScope, toaster, $timeout, apiService) {

        console.log('In the account controller');

        var user = {};

        function init() {
            if (authenticationService.email) {
                apiService.getUserInfo(authenticationService.email).then(function (results) {
                    console.log(results);
                });
            }
        }

        init();
    });

})();
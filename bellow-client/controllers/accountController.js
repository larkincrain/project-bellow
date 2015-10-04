/*
    The account controller for the Bellow controller
*/

(function () {

    var BellowApp = angular.module('BellowApp');

    BellowApp.controller('accountController', function (authenticationService, $scope, $rootScope, toaster, $timeout, apiService) {

        console.log('In the account controller');

        var user = {};

        function init() {

            console.log('token: ');
            console.log(authenticationService.token);
            console.log('Email address: ');
            console.log(authenticationService.email);

            if (authenticationService.email) {
                apiService.getUserInfo(authenticationService.email).then(function (results) {
                    console.log('user object: ');
                    console.log(results);
                });
            } else {
                console.log('no email address saved');
            }
        }

        init();
    });

})();
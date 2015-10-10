/*
    The authentication controller for the Bellow controller
*/

(function () {

    var BellowApp = angular.module('BellowApp');

    BellowApp.controller('loginController', function (authenticationService, $scope, $rootScope, toaster, $state, $timeout) {

        // So we can show the login view
        $scope.login = true;

        //Submit the form. Send the user's data to be authenticated
        $scope.submit = function () {
            
            //Send the user's password and username to the authentication service. 
            authenticationService.authenticate($scope.username, $scope.password).then(function (result) {
                console.log('Authenticating');
                console.log(result);

                if (result.success) {
                    // Then we need to send the user to the home page
                    $state.go('home');
                } else {
                    $scope.invalidAuthAlert();
                }
            });
        };

        $scope.invalidAuthAlert = function () {
            toaster.pop('toaster-green', 'Authentication failure', 'Login Failed');
        }
    });

})();
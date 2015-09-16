/*
    The authentication controller for the Bellow controller
*/

(function () {

    var BellowApp = angular.module('BellowApp');

    BellowApp.controller('loginController', function (authenticationService, $scope, $rootScope, toaster, $timeout) {

        console.log('in login controller');

        //Submit the form. Send the user's data to be authenticated
        $scope.submit = function () {
            console.log(
                //Send the user's password and username to the authentication service. 
                authenticationService.authenticate($scope.username, $scope.password)
            );
            
            /*
            .then(function (result) {
                console.log('Authentication result: ');
                console.log(result);
            });
            */
        };

        $scope.invalidAuthAlert = function () {
            toaster.pop('toaster-green', 'Authentication failure', 'Login Failed');
        }
    });

})();
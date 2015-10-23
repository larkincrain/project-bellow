/*
Configuration file for the Bellow App 
*/
(function () {

    var BellowApp = angular.module('BellowApp');

    //Routing options
    BellowApp.config(['$httpProvider', '$urlRouterProvider', '$stateProvider', 'uiGmapGoogleMapApiProvider', function ($httpProvider, $urlRouterProvider, $stateProvider, uiGmapGoogleMapApiProvider) {

        console.log('start routing config');

        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // $urlRouteProvider.otherwise('/landing');
        $stateProvider

        .state('enter', {
            url: "",
            views: {
                "nav": {
                    templateUrl: 'templates/nav/main-nav.html',
                    controller: 'mainNavController'
                },
                "side-nav": {
                    templateUrl: 'templates/nav/side-nav.html',
                    controller: 'sideNavController'
                },
                "main-content": {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        })

        .state('home', {
            url: "/",
            views: {
                "nav": {
                    templateUrl: 'templates/nav/main-nav.html',
                    controller: 'mainNavController'
                },
                "side-nav": {
                    templateUrl: 'templates/nav/side-nav.html',
                    controller: 'sideNavController'
                },
                "main-content": {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "login": {
                    templateUrl: 'templates/login.html',
                    controller: 'loginController'
                }
            }
        })
        .state('account', {
            url: "/account",
            views: {
                "nav": {
                    templateUrl: 'templates/nav/main-nav.html',
                    controller: 'mainNavController'
                },
                "main-content": {
                    templateUrl: 'templates/account.html',
                    controller: 'accountController'
                }
            }
        })
        .otherwise
    }]);

    //Check if the user is authenticated, if not, send to login screen
    BellowApp.run(['$route', '$rootScope', "$location", 'authenticationService', '$state',
        function ($route, $rootScope, $location, authenticationService, $state, $scope) {
            $rootScope.$on('login', function (event, data) {
                $location.path("/");
            });

            $rootScope.$on('logout', function (event, data) {
                $location.path("/login");
            });

            $rootScope.$on("$stateChangeStart", function (event, next, curent) {

                console.log('Do we have a token saved?');
                console.log(authenticationService.isLoggedIn());

                if (authenticationService.isLoggedIn() == false) {
                    $location.path("/login");
                }
            });

        }]);

    //API paths
    var apiPaths = {
        apiUrl: "http://54.149.45.146/api",												        //This needs to be the location of my node server
        test_apiUrl: "http://54.149.45.146/api/test",										//This needs to be the location of my node server test end point
    };

    //Paths and app version
    var config = {
        apiPaths: apiPaths,
        version: '0.0.1'
    };

    console.log('Defining global data structure');

    //User's data to be used across all modules
    var globalData = {
        userInfo: {
            email: ""
        },
        
        userPosition: {
            lat: 0,
            lon: 0,
            alt: 0
        },

        currentOrganization: {
            name: "",
            description: "",
            accountType: "",               // What type of account the organization is using
            usersRole: "",

        },
    }

    BellowApp.value('config', config);
    BellowApp.value('globalData', globalData);

})();
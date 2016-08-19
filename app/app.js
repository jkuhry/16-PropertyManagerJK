(function() {
    'use strict';

    var app = angular.module('app', ['ui.router', 'LocalStorageModule']);

    app.config(function(localStorageServiceProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.interceptors.push('AuthInterceptor');

        // localStorageServiceProvider
        //     .setPrefix('app')
        //     .setStorageType('localStorage')
        //     .setNotify(true, true)

        $urlRouterProvider.otherwise('/home');

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
            url: '/home',
            templateUrl: '../partials/partial-home.html',
            controller: 'PropertyController',
            controllerAs: 'vm'
        })

        .state('home.result', {
                url: '/home.result/:cityName?:minRent?:maxRent?:bedrooms?:bathrooms',
                templateUrl: '../partials/partial-home.result.html',
                controller: 'PropertyController',
                controllerAs: 'vm'
            })
            // MULTIPLE ADDITIONAL STATES AND NESTED VIEWS =========================
            .state('registration', {
                url: '/registration',
                templateUrl: '../partials/partial-registration.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            })

        // MULTIPLE ADDITIONAL STATES AND NESTED VIEWS =========================
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '../partials/partial-dashboard.html',
            controller: 'PropertyController',
            controllerAs: 'vm'
        })
    });
app.value("apiUrl", "http://localhost:51146/api/");

})();

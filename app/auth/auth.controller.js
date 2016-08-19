(function() {
    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['AuthFactory', '$state', 'localStorageService'];

    /* @ngInject */
    function AuthController(AuthFactory, $state, localStorageService) {
        var vm = this;
        vm.title = 'AuthController';
        vm.registerUser = registerUser;
        vm.loginUser = loginUser;
        vm.logoutUser = logoutUser;
        vm.username = localStorageService.get("username");


            if (vm.username) {
                vm.userLoggedIn = true;
            }
        activate();

        ////////////////

        function activate() {
        }

        function registerUser(email, password, confirmPassword, firstName, lastName, phoneNumber) {
            AuthFactory.registerUser(email, password, confirmPassword, firstName, lastName, phoneNumber).then(function(response) {

                    toastr.success('User successfully registered!');

                    vm.newFirstName = '';
                    vm.newLastName = '';
                    vm.newEmail = '';
                    vm.newPhoneNumber = '';
                    vm.newPassword = '';
                    vm.newConfirmPassword = '';

                    $state.go("home");

                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.error(error);
                    }
                });
        }

         function loginUser(loginEmail, loginPassword) {
            logoutUser();
            AuthFactory.loginUser(loginEmail, loginPassword).then(function(response) {
                    vm.userLoggedIn = true;
                    vm.loginData = response.data;

                    toastr.success('User successfully logged in!');

                    vm.loginEmail = '';
                    vm.loginPassword = '';

                    $state.go('dashboard');
                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.error(error);
                    }
                });
        }

        //Defining logoutUser to call logoutUser method in AuthorizationFactory and redirect user to login page upon clearing access_token from local storage
        function logoutUser() {
            vm.userLoggedIn= false;
            AuthFactory.logoutUser();
            $state.go('home');
        }
    }
})();
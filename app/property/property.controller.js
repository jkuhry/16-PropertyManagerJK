(function() {
    'use strict';

    angular
        .module('app')
        .controller('PropertyController', PropertyController);

    PropertyController.$inject = ['PropertyFactory', '$stateParams', 'localStorageService'];

    /* @ngInject */
    function PropertyController(PropertyFactory, $stateParams, localStorageService) {
        var vm = this;
        vm.title = 'PropertyController';
        vm.getProperties = getProperties;
        vm.addProperty = addProperty;
        vm.deleteProperty = deleteProperty;
        vm.editProperty = editProperty;
        vm.searchProperties = searchProperties;
        vm.searchPropertiesByUser = searchPropertiesByUser;
        vm.username = localStorageService.get("username");

        vm.cityName = "";
        vm.minRent = 0;
        vm.maxRent = 0;
        vm.bedrooms = 0;
        vm.bathrooms = 0;

        vm.cityName = $stateParams.cityName;
        vm.minRent = $stateParams.minRent;
        vm.maxRent = $stateParams.maxRent;
        vm.bedrooms = $stateParams.bedrooms;
        vm.bathrooms = $stateParams.bathrooms;



        activate();

        ////////////////

        function activate() {
            if (vm.username) {
                searchPropertiesByUser(vm.username);
            }
            searchProperties(vm.cityName, vm.minRent, vm.maxRent, vm.bedrooms, vm.bathrooms);
        }

        function getProperties() {

            PropertyFactory.getProperties()
                .then(function(response) {

                        vm.properties = response.data;
                        toastr.success('Properties Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        function addProperty(city, zip, street, squareft, bedrooms, bathrooms, rent, description) {

            PropertyFactory.addProperty(city, zip, street, squareft, bedrooms, bathrooms, rent, description)
                .then(function(response) {

                        vm.properties.push(response.data);
                        toastr.success('Properties Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        function deleteProperty(data) {
            var index = vm.properties.indexOf(data);
            PropertyFactory.deleteProperty(data.PropertyId).then(function(response) {

                    vm.propertyDel = response.data;
                    toastr.success('Property Successfully Deleted!');


                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });

            return vm.properties.splice(index, 1);

        }

        function editProperty(data) {

            PropertyFactory.editProperty(data)
                .then(function(response) {

                        toastr.success('Properties Updated!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        function searchProperties(cityName, minRent, maxRent, bedrooms, bathrooms) {

            var searchQuery = { city: cityName, minRent: minRent, maxRent: maxRent, bedrooms: bedrooms, bathrooms: bathrooms };

            PropertyFactory.searchProperties(searchQuery)
                .then(function(response) {

                        vm.searchResults = (response.data);
                        toastr.success('Properties Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }

        function searchPropertiesByUser(userName) {

            var searchQuery = { userName: userName };

            PropertyFactory.searchPropertiesByUser(searchQuery)
                .then(function(response) {

                        vm.properties = (response.data);
                        toastr.success('Properties Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }
    }
})();

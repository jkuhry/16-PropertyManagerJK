(function() {
    'use strict';

    angular
        .module('app')
        .factory('PropertyFactory', PropertyFactory);

    PropertyFactory.$inject = ['$http', '$q', 'localStorageService', 'apiUrl'];

    /* @ngInject */
    function PropertyFactory($http, $q, localStorageService, apiUrl) {
    	var url = apiUrl + 'properties/'

        var service = {
            getProperties: getProperties,
            addProperty: addProperty,
            deleteProperty: deleteProperty,
            editProperty: editProperty,
            searchProperties: searchProperties,
            searchPropertiesByUser: searchPropertiesByUser
        };
        return service;

        ////////////////

        function getProperties() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;


        }

        function addProperty(city,zip,street,squareft,bedrooms,bathrooms,rent,description){

            var defer = $q.defer();

            var newProperty = {city: city, street: street, zip: zip, squareft: squareft, bedrooms: bedrooms, bathrooms: bathrooms, rent: rent, description: description};

            $http({
                    method: 'POST',
                    url: url, 
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: newProperty
                }).then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject("No data found!");
                        }
                    },
                    function(error) {
                        defer.reject(error);
                    });

                return defer.promise;

        }

        function deleteProperty(propertyId){

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: url + propertyId,
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;      

        }

         function editProperty(data){

            var defer = $q.defer();

            $http({
                    method: 'PUT',
                    url: url + data.PropertyId,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: data
                }).then(function(response) {
                        if (response.status = 204) {
                            defer.resolve(response);
                        } else {
                            defer.reject("No data found!");
                        }
                    },
                    function(error) {
                        defer.reject(error);
                    });

                return defer.promise;

        }

        function searchProperties(searchQuery){
        	var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: url + 'search', 
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: searchQuery
                }).then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject("No data found!");
                        }
                    },
                    function(error) {
                        defer.reject(error);
                    });

                return defer.promise;
        }

        function searchPropertiesByUser(searchQuery){
            var defer = $q.defer();
        
            $http({
                    method: 'POST',
                    url: url + 'search/username', 
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: searchQuery
                }).then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject("No data found!");
                        }
                    },
                    function(error) {
                        defer.reject(error);
                    });

                return defer.promise;
        }


    }
})();

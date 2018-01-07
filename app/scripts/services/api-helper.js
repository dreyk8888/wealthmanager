'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve debt data
 */
angular.module('wealthManagerApp')
    .service('APIHelper', ['$http', 'GlobalConstants', function($http, GlobalConstants) {
        this.get = function(apiURL){
            return new Promise((resolve, reject)=>{
                $http.get(apiURL).then(function(response){
                    resolve(response);
                }, function(error) {
                    reject(error);
                });
            });
        };

        this.delete = function(id, apiURL){
            return new Promise((resolve, reject)=>{
                $http.delete(apiURL + '/' + id).then(function(response){
                    resolve(response);
                }, function(error) {
                    reject(error);
                });
            });
        };

        this.post = function(data, apiURL){
            return new Promise((resolve, reject)=>{
                $http.post(apiURL, JSON.stringify(data)).then(function(response){
                    resolve(response);
                }, function(error) {
                    reject(error);
                });
            });
        };

        this.put = function(data, id, apiURL){
            return new Promise((resolve, reject)=>{
                $http.put(apiURL + '/' + id, JSON.stringify(data)).then(function(response){
                    resolve(response);
                }, function(error) {
                    reject(error);
                });
            });
        };

}]);

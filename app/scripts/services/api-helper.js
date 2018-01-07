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

        this.delete = function(successHandler, failureHandler, id, apiURL){
            $http.delete(apiURL + '/' + id)
            .then(function(response){
                successHandler(response, id);    //data can't be used outside this function
                return true;
            }, function(error) {
                failureHandler(error);
            });
            return this;
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

        this.put = function(successHandler, failureHandler, data, id, apiURL){
            $http.put(apiURL + '/' + id, JSON.stringify(data))
            .then(function(response){
                successHandler(response, data);
            }, function(error){
                failureHandler(error);
            });
            return this;
        };
}]);

'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve asset data
 */
angular.module('wealthManagerApp')
    .service('AssetDataAPI', ['$http', function($http) {
        var apiURL = 'http://localhost:4000/assetentry';
        //can put additional code here
        this.getData = function(successHandler, failureHandler) {
            $http.get(apiURL)
            .then(function(response){
                successHandler(response);    //data can't be used outside this function
            }, function(error) {
                failureHandler(error);
            })
        }

        this.deleteData = function(successHandler, failureHandler, id){
            $http.delete(apiURL + '/' + id)
            .then(function(response){
                successHandler(response, id);    //data can't be used outside this function
                return true;
            }, function(error) {
                failureHandler(error);
            })
        }

        this.postData = function(successHandler, failureHandler, data){
            $http.post(apiURL, JSON.stringify(data))
            .then(function(response){
                successHandler(response, data);
            }, function(error){
                failureHandler(error);
            })
        }

        this.updateData = function(successHandler, failureHandler, data){
            $http.put(apiURL, JSON.stringify(data))
            .then(function(response){
                successHandler(response, data);
            }, function(error){
                failureHandler(error);
            })
        }
}]);

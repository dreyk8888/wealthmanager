'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve debt data
 */
angular.module('wealthManagerApp')
    .service('DebtDataAPI', ['$http', 'GlobalConstants', function($http, GlobalConstants) {
        var apiURL = GlobalConstants.API_URL_LOCAL + '/debtentry';
        //can put additional code here
        this.getData = function(){
            return new Promise((resolve, reject)=>{
                $http.get(apiURL).then(function(response){
                    resolve(response);
                }, function(error) {
                    reject(error);
                });
            });
        };
/*
        this.getData = function(successHandler, failureHandler) {
            $http.get(apiURL)
            .then(function(response){
                successHandler(response);    //data can't be used outside this function
            }, function(error) {
                failureHandler(error);
            });
            return this;
        };
*/
        this.deleteData = function(successHandler, failureHandler, id){
            $http.delete(apiURL + '/' + id)
            .then(function(response){
                successHandler(response, id);    //data can't be used outside this function
                return true;
            }, function(error) {
                failureHandler(error);
            });
            return this;
        };

        this.postData = function(successHandler, failureHandler, data){
            $http.post(apiURL, JSON.stringify(data))
            .then(function(response){
                successHandler(response, data);
            }, function(error){
                failureHandler(error);
            });
            return this;
        };

        this.updateData = function(successHandler, failureHandler, data, id){
            $http.put(apiURL + '/' + id, JSON.stringify(data))
            .then(function(response){
                successHandler(response, data);
            }, function(error){
                failureHandler(error);
            });
            return this;
        };
}]);

'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve historical net worth data
 */
angular.module('wealthManagerApp')
    .service('NetWorthDataAPI', ['$http', 'GlobalConstants', 'APIHelper', function($http, GlobalConstants, APIHelper) {
        var apiURL = GlobalConstants.API_URL_LOCAL + '/networthhistory';

        this.getData = function(){
            return APIHelper.get(apiURL);
        };

        this.postData = function(data){
            return APIHelper.post(data, apiURL);
        };

        this.updateData = function(data, id){
            return APIHelper.put(data, id, apiURL);
        };

        this.deleteData = function(id){
            return APIHelper.delete(id, apiURL);
        };

        /*
        this.postData = function(successHandler, failureHandler, data){
            return APIHelper.post(data, apiURL);
        };

        this.updateData = function(successHandler, failureHandler, data, id){
            return APIHelper.put(successHandler, failureHandler, data, id, apiURL);
        };


        this.deleteData = function(successHandler, failureHandler, id){
            return APIHelper.delete(successHandler, failureHandler, id, apiURL);
        };
        */
}]);

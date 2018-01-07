'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve debt data
 */
angular.module('wealthManagerApp')
    .service('DebtDataAPI', ['$http', 'GlobalConstants', 'APIHelper', function($http, GlobalConstants, APIHelper) {
        var apiURL = GlobalConstants.API_URL_LOCAL + '/debtentry';

        this.getData = function(){
            return APIHelper.get(apiURL);
        };

        this.deleteData = function(successHandler, failureHandler, id){
            return APIHelper.delete(successHandler, failureHandler, id, apiURL);
        }
        this.postData = function(data){
            return APIHelper.post(data, apiURL);
        };

        this.updateData = function(successHandler, failureHandler, data, id){
            return APIHelper.put(successHandler, failureHandler, data, id, apiURL);
        };
}]);

'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve asset data
 */
angular.module('wealthManagerApp')
    .service('AssetDataAPI', ['$http', 'GlobalConstants', 'APIHelper', function($http, GlobalConstants, APIHelper) {
        var apiURL = GlobalConstants.API_URL_LOCAL + '/assetentry';

        this.getData = function(){
            return APIHelper.get(apiURL);
        };

        this.getDataByUserId = function(userId){
            return APIHelper.getByUserId(userId, apiURL);
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
}]);

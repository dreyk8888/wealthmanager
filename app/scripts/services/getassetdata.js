'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve asset data
 */
angular.module('wealthManagerApp')
    .service('GetAssetData', ['$http', function($http) {
    //can put additional code here
     this.getData = function(successHandler, failureHandler) {
        $http.get('http://localhost:4000/assetentry')
        .then(function(response){
            successHandler(response);    //data can't be used outside this function
        }, function(response) {
            failureHandler(response);
        })
    }

//        return $http.get('http://localhost:4000/assetentry');
}]);

'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve asset data
 */
angular.module('wealthManagerApp')
  .service('getAssetData', ['$http', function($http) {
    //can put additional code here

    return $http.get('http://localhost:4000/assetentry');
  }]);

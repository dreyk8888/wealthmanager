'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and store/retrieve data
 */
angular.module('wealthManagerApp')
  .service('wealthManagerData', ['$http', function($http) {
    return $http.get('/assetentry');
  }]);

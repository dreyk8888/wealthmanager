'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * service for currency related functionality
 */
angular.module('wealthManagerApp')
    .service('Currency', ['GlobalConstants', function(GlobalConstants) {
        //set of supported currencies
        this.CURRENCYSUPPORTED = [
            GlobalConstants.DOM,
            GlobalConstants.USD,
            GlobalConstants.EURO,
            GlobalConstants.CAD,
            GlobalConstants.GBP,
            GlobalConstants.YEN,
            GlobalConstants.YUAN,
            GlobalConstants.FRANC,
            GlobalConstants.RUPEE,
            GlobalConstants.AUD
        ];
}]);

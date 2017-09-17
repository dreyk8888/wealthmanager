'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Portfolio input form to display based on the asset type
 */
angular.module('wealthManagerApp')
    .service('PortfolioForms', ['GlobalConstants', function(GlobalConstants) {
        //send the right type of schema form to use given the asset class
        this.getAssetForm = function (assetClass){
            var form = [];
            if (assetClass === GlobalConstants.CASH){
                 form = [
                    'name',
                    'amount',
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FIXEDINCOME){
                 form = [
                    'name',
                    'units',
                    'unitCost',
                    'location',
                    'date_purchased',
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FIXEDASSETS){
                 form = [
                    'name',
                    'amount',
                    'location',
                    'date_purchased',
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FOREIGNCURR){
                 form = [
                    'name',
                    'amount',
                    'date_purchased',
                    'currency'
                ];
            } else {
                 form = [
                    'name',
                    'units',
                    'unitCost',
                    'location',
                    'date_purchased',
                    'currency'
                ];
            }
        return form;
    }
}]);

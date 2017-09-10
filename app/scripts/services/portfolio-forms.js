'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Portfolio input forms
 */
angular.module('wealthManagerApp')
    .service('PortfolioForms', ['GlobalConstants', function(GlobalConstants) {
        //send the right type of schema form to use given the asset class
        this.getAssetForm = function (assetClass){
            var form = [];
            if (assetClass === GlobalConstants.EQUITIES){
                form = [
                    'class',
                    'name',
                    'units',
                    'unitCost',
                    'location',
                    'date_purchased',
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.CASH){
                 form = [
                    'class',
                    'name',
                    'amount',
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FIXEDINCOME){
                 form = [
                    'class',
                    'name',
                    'units',
                    'unitCost',
                    'location',
                    'date_purchased',
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FIXEDASSETS){
                 form = [
                    'class',
                    'name',
                    'amount',
                    'location',
                    'date_purchased',
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FOREIGNCURR){
                 form = [
                    'class',
                    'name',
                    'amount',
                    'date_purchased',
                    'currency'
                ];
            } else {
                 form = [
                    'class',
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

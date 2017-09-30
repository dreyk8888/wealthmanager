'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Portfolio input form to display based on the input object type
 */
angular.module('wealthManagerApp')
    .service('PortfolioForms', ['GlobalConstants', function(GlobalConstants) {
        //send the right type of schema form to use given the asset class
        this.getAssetForm = function (assetClass){
            var form = [];
            if (assetClass === GlobalConstants.CASH){
                 form = [
                    'name',
                    {
                        'key': 'amount',
                        'validationMessage': 'Enter 1 or more'
                    },
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FIXEDINCOME){
                 form = [
                    'name',
                    {
                        'key': 'units',
                        'validationMessage': 'Enter 1 or more'
                    },
                    {
                        'key': 'unitCost',
                        'validationMessage': 'Enter 1 or more'
                    },
                    'location',
                    {
                        'key': 'date_purchased',
                        'validationMessage': 'Enter as mm/dd/yyyy'
                    },
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FIXEDASSETS){
                 form = [
                    'name',
                    'amount',
                    'location',
                    {
                        'key': 'date_purchased',
                        'validationMessage': 'Enter as mm/dd/yyyy'
                    },
                    'currency'
                ];
            } else if (assetClass === GlobalConstants.FOREIGNCURR){
                 form = [
                    'name',
                    {
                        'key': 'amount',
                        'validationMessage': 'Enter 1 or more'
                    },
                    {
                        'key': 'date_purchased',
                        'validationMessage': 'Enter as mm/dd/yyyy'
                    },
                    'currency'
                ];
            } else {
                 form = [
                    'name',
                    {
                        'key': 'units',
                        'validationMessage': 'Enter 1 or more'
                    },
                    {
                        'key': 'unitCost',
                        'validationMessage': 'Enter 1 or more'
                    },
                    'location',
                    {
                        'key': 'date_purchased',
                        'validationMessage': 'Enter as mm/dd/yyyy'
                    },
                    'currency'
                ];
            }
        return form;
    }

    this.getDebtForm = function(){
        var form = [];
        form = [
            {
                'key': 'term',
                'type': 'select',
                'description': 'Select liability type',
                'titleMap': [
                    { value: GlobalConstants.SHORT_TERM, name: "Short term liability" },
                    { value: GlobalConstants.LONG_TERM, name: "Long term liability" }
                ]
            },
            'name',
            {
                'key': 'amount',
                'validationMessage': 'Enter 1 or more'
            }
        ];
        return form;
    }
}]);

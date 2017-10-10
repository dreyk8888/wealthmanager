'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Portfolio input form to display based on the input object type
 */
angular.module('wealthManagerApp')
    .service('PortfolioForms', ['GlobalConstants', 'Asset', 'Debt', 'Helpers', 'Currency', function(GlobalConstants, Asset, Debt, Helpers, Currency) {
        //asset class is selected in the view because we need to dynamically display a different form
        //depending on class selected
        //send the right type of schema form to use given the asset class
        var assetLocationTitleMap = Helpers.buildTitleMap(Asset.ASSETLOCATIONS);
        var currencyTitleMap = Helpers.buildTitleMap(Currency.CURRENCYSUPPORTED);
        var debtTypeTitleMap = Helpers.buildTitleMap(Debt.DEBTTERMS);
        this.getAssetForm = function (assetClass){
            var form = [];
            if (assetClass === GlobalConstants.CASH){
                 form = [
                    'name',
                    {
                        'key': 'amount',
                        'validationMessage': 'Enter 1 or more'
                    },
                    {
                        'key': 'currency',
                        'type': 'select',
                        'description': 'Select currency',
                        'titleMap': currencyTitleMap
                    }
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
                    {
                        'key': 'location',
                        'type': 'select',
                        'description': 'Select location',
                        'titleMap': assetLocationTitleMap
                    },
                    {
                        'key': 'date_purchased',
                        'validationMessage': 'Enter as mm/dd/yyyy'
                    },
                    {
                        'key': 'currency',
                        'type': 'select',
                        'description': 'Select currency',
                        'titleMap': currencyTitleMap
                    }
                ];
            } else if (assetClass === GlobalConstants.FIXEDASSETS){
                 form = [
                    'name',
                    'amount',
                    {
                       'key': 'location',
                        'type': 'select',
                        'description': 'Select location',
                        'titleMap': assetLocationTitleMap
                    },
                    {
                        'key': 'date_purchased',
                        'validationMessage': 'Enter as mm/dd/yyyy'
                    },
                    {
                        'key': 'currency',
                        'type': 'select',
                        'description': 'Select currency',
                        'titleMap': currencyTitleMap
                    }
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
                    {
                        'key': 'currency',
                        'type': 'select',
                        'description': 'Select currency',
                        'titleMap': currencyTitleMap
                    }
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
                    {
                       'key': 'location',
                        'type': 'select',
                        'description': 'Select location',
                        'titleMap': assetLocationTitleMap
                    },
                    {
                        'key': 'date_purchased',
                        'validationMessage': 'Enter as mm/dd/yyyy'
                    },
                    {
                        'key': 'currency',
                        'type': 'select',
                        'description': 'Select currency',
                        'titleMap': currencyTitleMap
                    }
                ];
            }
        return form;
    };

    this.getDebtForm = function(){
        var form = [];
        form = [
            {
                'key': 'term',
                'type': 'select',
                'description': 'Select liability type',
                'titleMap': debtTypeTitleMap
            },
            'name',
            {
                'key': 'amount',
                'validationMessage': 'Enter 1 or more'
            }
        ];
        return form;
    };
}]);

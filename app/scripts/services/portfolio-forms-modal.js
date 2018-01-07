"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Portfolio input form to display based on the input object type
 */
angular.module("wealthManagerApp")
    .service("PortfolioFormsModal", ["GlobalConstants", "Asset", "Debt", "Helpers", "Currency", function(GlobalConstants, Asset, Debt, Helpers, Currency) {
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
                    "name",
                    {
                        "key": "marketValue",
                        "title": "Amount",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                        "key": "currency",
                        "type": "select",
                        "title": "Currency",
                        "description": "Currency asset is held in",
                        "titleMap": currencyTitleMap
                    }
                ];
            } else if (assetClass === GlobalConstants.FIXEDINCOME){
                 form = [
                    "name",
                    {
                        "key": "units",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                        "key": "unitCost",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                        "key": "marketPrice",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                        "key": "location",
                        "type": "select",
                        "title": "Location",
                        "description": "Category for global asset allocation",
                        "titleMap": assetLocationTitleMap
                    },
                    {
                        "key": "date_purchased",
                        "format": "yyyy-mm-dd",
                        "type":"datepicker",
                        "minDate": "01-01-1900",
                        "maxDate": new Date(),
                        "selectYears": "true",
                        "selectMonths": "true",
                        "validationMessage": "mm/dd/yyyy"
                    },
                    {
                        "key": "currency",
                        "type": "select",
                        "description": "Currency asset is held in",
                        "titleMap": currencyTitleMap
                    }
                ];
            } else if (assetClass === GlobalConstants.FIXEDASSETS){
                 form = [
                    "name",
                    {
                        "key": "totalCost",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                        "key": "marketValue",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                        "key": "location",
                        "type": "select",
                        "title": "Location",
                        "description": "Category for global asset allocation",
                        "titleMap": assetLocationTitleMap
                    },
                    {
                        "key": "date_purchased",
                        "format": "yyyy-mm-dd",
                        "type":"datepicker",
                        "minDate": "01-01-1900",
                        "maxDate": new Date(),
                        "selectYears": "true",
                        "selectMonths": "true",
                        "validationMessage": "mm/dd/yyyy"
                    },
                    {
                        "key": "currency",
                        "type": "select",
                        "description": "Select currency",
                        "titleMap": currencyTitleMap
                    }
                ];
            } else {
                 form = [
                    "name",
                    {
                        "key": "units",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                        "key": "unitCost",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                        "key": "marketPrice",
                        "validationMessage": "Enter 0 or greater"
                    },
                    {
                       "key": "location",
                       "title": "Location",
                        "type": "select",
                        "description": "Category for global asset allocation",
                        "titleMap": assetLocationTitleMap
                    },
                    {
                        "key": "date_purchased",
                        "title": "Date Purchased",
                        "format": "yyyy-mm-dd",
                        "type":"datepicker",
                        "minDate": "01-01-1900",
                        "maxDate": new Date(),
                        "selectYears": "true",
                        "selectMonths": "true",
                        "validationMessage": "mm/dd/yyyy",
                        "readonly": false
                    },
                    {
                        "key": "currency",
                        "type": "select",
                        "description": "Select currency",
                        "titleMap": currencyTitleMap
                    }
                ];
            }
        return form;
    };

    this.getDebtForm = function(){
        var form = [];
        form = [
            {
                "key": "term",
                "type": "select",
                "title": "Category",
                "description": "Type of debt",
                "titleMap": debtTypeTitleMap
            },
            {
                "key": "name",
                "title": "Name",
                "description": "Name or description of liability"
            },
            {
                "key": "amount",
                "title": "Amount",
                "description": "",
                "validationMessage": "Enter 0 or greater"
            }

        ];
        return form;
    };
}]);

"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Portfolio input form to display based on the input object type
 */
angular.module("wealthManagerApp")
    .service("PortfolioForms", ["GlobalConstants", "Asset", "Debt", "Helpers", "Currency", function(GlobalConstants, Asset, Debt, Helpers, Currency) {
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
                     {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": [
                                    {
                                        "key": "name",
                                        "title": "Name or Symbol",
                                        "description": "Ticker symbol or name of asset"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "marketValue",
                                        "title": "Amount",
                                        "validationMessage": "Enter 0 or more"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "currency",
                                        "type": "select",
                                        "title": "Currency",
                                        "description": "Currency asset is held",
                                        "titleMap": currencyTitleMap
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-8"
                            }
                        ]
                    }
                ];
            } else if (assetClass === GlobalConstants.FIXEDASSETS){
                 form = [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": [
                                    {
                                        "key": "name",
                                        "title": "Name or Symbol",
                                        "description": "Ticker symbol or name of asset"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "totalCost",
                                        "title": "Total Cost",
                                        "description": "",
                                        "validationMessage": "Enter 0 or greater"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "marketValue",
                                        "title": "Market Value",
                                        "description": "Current market value",
                                        "validationMessage": "Enter 0 or more"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": [
                                    {
                                        "key": "location",
                                        "type": "select",
                                        "title": "Location",
                                        "description": "Category for global asset allocation",
                                        "titleMap": assetLocationTitleMap
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "currency",
                                        "type": "select",
                                        "title": "Currency",
                                        "description": "Currency asset is held",
                                        "titleMap": currencyTitleMap
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "date_purchased",
                                        "title": "Date purchased",
                                        "description": "",
                                        "validationMessage": "mm/dd/yyyy"
                                    }
                                ]
                            }
                            ]
                    }];
            } else {
                form = [
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": [
                                    {
                                        "key": "name",
                                        "title": "Name or Symbol",
                                        "description": "Ticker symbol or name of asset"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "units",
                                        "title": "No. of Units",
                                        "description": "",
                                        "validationMessage": "Enter 0 or greater"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": [
                                    {
                                        "key": "unitCost",
                                        "title": "Unit Cost",
                                        "description": "",
                                        "validationMessage": "Enter 0 or greater"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "marketPrice",
                                        "title": "Market Price",
                                        "description": "Current market price",
                                        "validationMessage": "Enter 0 or greater"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "row",
                        "items": [
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": [
                                    {
                                        "key": "location",
                                        "type": "select",
                                        "title": "Location",
                                        "description": "Category for global asset allocation",
                                        "titleMap": assetLocationTitleMap
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "currency",
                                        "type": "select",
                                        "title": "Currency",
                                        "description": "Currency asset is held",
                                        "titleMap": currencyTitleMap
                                    }
                                ]
                            },
                            /*
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "date_purchased",
                                        "title": "Date purchased",
                                        "description": "Date purchased",
                                        "validationMessage": "mm/dd/yyyy"
                                    }
                                ]
                            }
                            */
                            {
                                "type": "section",
                                "htmlClass": "col-xs-3",
                                "items": [
                                    {
                                        "key": "date_purchased",
                                        "format": "yyyy-mm-dd",
                                        "type":"datepicker",
                                        "minDate": "01-01-1970",
                                        "maxDate": new Date(),
                                        "selectYears": 100,
                                        "selectMonths": "true",
                                        "editable": "true",
                                        "validationMessage": "mm/dd/yyyy"
                                    }
                                ]
                            }

                            ]
                    }];
            }
        return form;
    };

    this.getDebtForm = function(){
        var form = [];
        form = [
            {
                "type": "section",
                "htmlClass": "row",
                "items": [
                    {
                        "type": "section",
                        "htmlClass": "col-xs-2",
                        "items": [
                            {
                                "key": "term",
                                "type": "select",
                                "title": "Category",
                                "description": "Type of debt",
                                "titleMap": debtTypeTitleMap
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-3",
                        "items": [
                            {
                                "key": "name",
                                "title": "Name",
                                "description": "Name or description of liability"
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-2",
                        "items": [
                            {
                                "key": "amount",
                                "title": "Amount",
                                "description": "",
                                "validationMessage": "Enter 0 or greater"
                            }
                        ]
                    }
                ]
        }];
        return form;
    };
}]);

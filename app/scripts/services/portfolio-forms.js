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
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "name",
                                        "title": "",
                                        "description": "Name/Ticker"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "units",
                                        "title": "",
                                        "description": "#Units",
                                        "validation": false,
                                        "required": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "unitCost",
                                        "title": "",
                                        "description": "Unit cost",
                                        "validation": false,
                                        "required": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "totalCost",
                                        "title": "",
                                        "description": "Total Cost",
                                        "validation": false,
                                        "required": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "marketPrice",
                                        "title": "",
                                        "description": "Mkt price",
                                        "validation": false,
                                        "required": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "marketValue",
                                        "title": "",
                                        "description": "Market Value",
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
                                "htmlClass": "col-xs-2"
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "date_purchased",
                                        "title": "",
                                        "description": "Date purchased",
                                        "validation": false,
                                        "required": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "location",
                                        "type": "select",
                                        "title": "",
                                        "description": "Select location",
                                        "titleMap": assetLocationTitleMap,
                                        "validation": false,
                                        "required": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "currency",
                                        "type": "select",
                                        "title": "",
                                        "description": "Currency",
                                        "titleMap": currencyTitleMap
                                    }
                                ]
                            }
                      ]
                }];
            } else if (assetClass === GlobalConstants.FIXEDASSETS){
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
                                        "key": "name",
                                        "title": "",
                                        "description": "Name/Ticker"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "units",
                                        "title": "",
                                        "description": "#Units",
                                        "validation": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "unitCost",
                                        "title": "",
                                        "description": "Unit cost",
                                        "validation": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "totalCost",
                                        "title": "",
                                        "description": "Total Cost",
                                        "validationMessage": "Enter 0 or greater"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "marketPrice",
                                        "title": "",
                                        "description": "Mkt price",
                                        "validation": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "marketValue",
                                        "title": "",
                                        "description": "Market Value",
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
                                "htmlClass": "col-xs-2"
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "date_purchased",
                                        "title": "",
                                        "description": "Date purchased",
                                        "validationMessage": "mm/dd/yyyy"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "location",
                                        "type": "select",
                                        "title": "",
                                        "description": "Select location",
                                        "titleMap": assetLocationTitleMap
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "currency",
                                        "type": "select",
                                        "title": "",
                                        "description": "Currency",
                                        "titleMap": currencyTitleMap
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
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "name",
                                        "title": "",
                                        "description": "Name/Ticker"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "units",
                                        "title": "",
                                        "description": "#Units",
                                        "validationMessage": "Enter 0 or greater"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "unitCost",
                                        "title": "",
                                        "description": "Unit cost",
                                        "validationMessage": "Enter 0 or greater"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "totalCost",
                                        "title": "",
                                        "description": "Total Cost",
                                        "validation": false,
                                        "readonly": true
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "marketPrice",
                                        "title": "",
                                        "description": "Mkt price",
                                        "validationMessage": "Enter 0 or greater"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "marketValue",
                                        "title": "",
                                        "description": "Market Value",
                                        "validation": false,
                                        "readonly": true
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
                                "htmlClass": "col-xs-2"
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "date_purchased",
                                        "title": "",
                                        "description": "Date purchased",
                                        "validationMessage": "mm/dd/yyyy"
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-2",
                                "items": [
                                    {
                                        "key": "location",
                                        "type": "select",
                                        "title": "",
                                        "description": "Select location",
                                        "titleMap": assetLocationTitleMap
                                    }
                                ]
                            },
                            {
                                "type": "section",
                                "htmlClass": "col-xs-1",
                                "items": [
                                    {
                                        "key": "currency",
                                        "type": "select",
                                        "title": "",
                                        "description": "Currency",
                                        "titleMap": currencyTitleMap
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
                                "title": "",
                                "description": "Select liability type",
                                "titleMap": debtTypeTitleMap
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-2",
                        "items": [
                            {
                                "key": "name",
                                "title": "",
                                "description": "Name/Ticker"
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "htmlClass": "col-xs-2",
                        "items": [
                            {
                                "key": "amount",
                                "title": "",
                                "description": "Amount",
                                "validationMessage": "Enter 0 or greater"
                            }
                        ]
                    }
                ]
        }];
        return form;
    };
}]);

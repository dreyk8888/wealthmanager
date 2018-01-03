"use strict";

/**
 * @ngdoc function
 * @name wealthManagerApp.constant:form-schemas
 * @description
 * # Form-Schemas
 * angular-schema-form schema definitions
 * This is a service so that dropdowns can be dynamically populated
 */

 angular.module("wealthManagerApp")
 .service ("AssetSchema", function() {
    //asset class is selected in the view because we need to dynamically display a different form
    //depending on class selected
    this.schema = {
        type: "object",
        title: "Asset Entry Form",
        properties: {
            name: { "type": "string", "title": "Name or Symbol"},
            description: { "type": "string", "title": "Description of asset"},
            units: { "type": "number", "title": "Units", "minimum": 0},
            unitCost: {"type": "number", "title": "Unit Cost", "minimum": 0},
            totalCost: { "type": "number", "title": "Cost", "minimum": 0},   //this will be calculated from units X unitCost
            marketPrice: { "type": "number", "title": "Market Price", "minimum": 0},
            marketValue: { "type": "number", "title": "Market Value", "minimum": 0},
            location: { "type": "string", "title": "Asset location for allocation."},
            date_purchased: { "type": "string", "title": "Date Purchased (mm/dd/yyyy)", "pattern": "^\\d\\d\/\\d\\d\/\\d\\d\\d\\d$", },
            currency: { "type": "string", "title": "Currency"}
        },
        "required": ["name","units", "unitCost", "totalCost", "marketPrice", "marketValue", "location", "date_purchased"]
    };
    return;
})

.service ("DebtSchema", function() {
    this.schema = {
        type: "object",
        title: "Debt Entry Form",
        properties: {
            term: { "type": "string", "title": "Liability type"},
            name: { "type": "string", "title": "Description of liability"},
            amount: { "type": "number", "title": "Amount", "minimum": 0}
        },
        "required": ["name", "amount"]
    };
    return;
});

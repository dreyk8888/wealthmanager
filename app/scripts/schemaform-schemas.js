'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.constant:form-schemas
 * @description
 * # Form-Schemas
 * angular-schema-form schema definitions
 * This is a service so that dropdowns can be dynamically populated
 */

 angular.module('wealthManagerApp')
 .service ('AssetSchema', ['Asset', function(Asset) {
    this.schema = {
        type: 'object',
        title: 'Asset Entry Form',
        properties: {
            name: { 'type': 'string', 'title': 'Name or Ticker symbol'},
            ticker: { 'type': 'string', 'title': 'Ticker'},
            units: { 'type': 'number', 'title': 'Number of Units', 'minimum': 1},
            unitCost: {'type': 'number', 'title': 'Unit Cost', 'minimum': 1},
            amount: { 'type': 'number', 'title': 'Amount', 'minimum': 1},   //this will be calculated from units X unitCost
            location: { 'type': 'string', 'title': 'Geographical Location'},
            date_purchased: { 'type': 'string', 'title': 'Date Purchased (mm/dd/yyyy)', 'pattern': '^\\d\\d\/\\d\\d\/\\d\\d\\d\\d$', },
            currency: { 'type': 'string', 'title': 'Currency'}
        },
        'required': ['name','units', 'unitCost', 'amount', 'location', 'date_purchased']
    }
    return;
}]);

'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.constant:form-schemas
 * @description
 * # Form-Schemas
 * angular-schema-form schema definitions
 */

 angular.module('wealthManagerApp')
 .constant ('AssetSchema', {
    type: 'object',
    properties: {
        class: { type: 'string', title: 'Asset Class'},
        name: { type: 'string', title: 'Name or Symbol'},
        ticker: { type: 'string', title: 'Ticker'},
        units: { type: 'number', title: 'Number of Units'},
        unitCost: {type: 'number', title: 'Unit Cost'},
        amount: { type: 'number', title: 'Amount'},   //this will be calculated from units X unitCost
        location: { type: 'string', title: 'Geographical Location'},
        date_purchased: { type: 'string', title: 'Date Purchased' },
        currency: { type: 'string', title: 'Currency'}
    }
});

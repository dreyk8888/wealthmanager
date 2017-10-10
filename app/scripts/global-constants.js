'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.constant:form-schemas
 * @description
 *  * Constants in use in the app
 */

 angular.module('wealthManagerApp')
  .constant ('GlobalConstants', {
        API_URL_LOCAL: 'http://localhost:3000', //local API URL
        UNDEFSTR: '---',   //empty string representation in app
        UNDEFNUM: -1,
        UNDEFDATE: '1/1/1111',
        //asset classes
        CASH: 'Cash',
        EQUITIES: 'Equities',
        FIXEDINCOME: 'Fixed Income',
        FIXEDASSETS: 'Fixed Assets',
        FOREIGNCURR: 'Foreign Currency',
        //asset locations
        DOMESTIC: 'Domestic',
        CAN: 'Canadian',
        US: 'United States',
        INTL: 'International',
        EMRG: 'Emerging Markets',
        EUR: 'Eurozone',
        JPN: 'Japan',
        CHN: 'China',
        ASIA: 'Asia/Pacific',
        SAMER: 'South Americas',
        FRONTIER: 'Frontier Markets',

        //currencies
        CAD: 'Canadian Dollar',
        USD: 'US Dollar',
        EURO: 'Euro',
        BP: 'British Pound',
        YEN: 'Japanese Yen',
        YUAN: 'Chinese Yuan',
        FRANC: 'Swiss Francs',
        INR: 'Indian Rupee',
        AUD: 'Australian Dollar',
        DOM: 'Domestic Currency',
        //debt types
        SHORT_TERM: 'Short Term',
        LONG_TERM: 'Long Term'
});

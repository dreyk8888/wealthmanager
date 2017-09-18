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
        FOREIGNCURR: 'Foreign Currency'
});

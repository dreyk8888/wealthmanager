"use strict";

/**
 * @ngdoc function
 * @name wealthManagerApp.constant:form-schemas
 * @description
 *  * Constants in use in the app
 */

 angular.module("wealthManagerApp")
  .constant ("GlobalConstants", {
        API_URL_LOCAL: "http://localhost:3000", //local API URL
        UNDEFSTR: "---",   //empty string representation in app
        UNDEFNUM: -1,
        UNDEFDATE: "01/01/1111",
        //asset classes
        CASH: "Cash",
        EQUITIES: "Equities",
        FIXEDINCOME: "Fixed Income",
        FIXEDASSETS: "Fixed Assets",
        FOREIGNCURR: "Foreign Currency",
        //asset locations
        DOMESTIC: "Domestic",   //default value for assetentry:location in DB
        CAN: "Canadian",
        US: "United States",
        INTL: "International",
        EMRG: "Emerging Markets",
        EUR: "Eurozone",
        JPN: "Japan",
        CHN: "China",
        ASIA: "Asia/Pacific",
        SAMER: "South Americas",
        FRONTIER: "Frontier Markets",

        //currencies, these are hardcoded as defaults in DB, don't change without changing DB!
        DOM: "Local",
        CAD: "CAD",
        USD: "USD",
        EURO: "EUR",
        GBP: "GBP",
        YEN: "JPY",
        YUAN: "CNY",
        FRANC: "CHF",
        RUPEE: "INR",
        AUD: "AUD",
        //debt types
        SHORT_TERM: "Short Term",
        LONG_TERM: "Long Term",

        //compounding
        MONTHLY: "Monthly",
        YEARLY: "Annually"
});

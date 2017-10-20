"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module("wealthManagerApp")
    .service("FIRECalcHelper", ["GlobalConstants", function(GlobalConstants) {
    var DEBUG = true;

    //calculate the future value of netWorthStart and returns a double
    //annualReturn - expected annual return in percentage (eg. 7)
    //principlePerYear - how much is being added/saved each year
    this.netWorthCalc = function (netWorthStart, annualReturn, principlePerYear, numberOfYears, compoundMonthly){
        var netWorth = netWorthStart;
        var interest = annualReturn/100 + 1;    //default compound yearly
        var numPeriods = numberOfYears;         //default number of compounding periods is number of years
        var principle = principlePerYear;

        if (compoundMonthly){
            interest = annualReturn/12/100 + 1; //return per month is monthly interest
            numPeriods = numberOfYears*12;      //num compounding periods is number of months
        }

        for (var n = 1; n <= numPeriods; n++){
            if (netWorth > 0){
                //handle negative net worth case. Ignore compounding on negative net worth until principle puts it in positive.
                netWorth = netWorth * interest;
            }
            if (compoundMonthly){
                if (n % 12 === 0 && Math.ceil(n/12) >= 1){
                    //this period falls on year end, and it is not the first year, so add the principle
                    netWorth = netWorth + principle;
                }
            }
            else {
                netWorth = netWorth + principle;
            }

            console.log ("interest rate = " + interest);
            console.log ("n = " + n);
            console.log ("netWorth = " + netWorth);
        }

        return netWorth.toFixed(2);

    };
}]);


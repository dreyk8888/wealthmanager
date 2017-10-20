"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module("wealthManagerApp")
    .service("FIRECalcHelper", function() {
    var DEBUG = true;

    //calculate the future value of netWorthStart and returns a double
    //annualReturn - expected annual return in percentage (eg. 7)
    //incomePerYear - how much is being added/saved each year
    this.netWorthCalc = function (netWorthStart, annualReturn, incomePerYear, incomeGrowth, numberOfYears, compoundMonthly){
        var netWorthTrend = []; //annual net worth values
        var netWorth = netWorthStart;
        var interest = annualReturn/100 + 1;    //default compound yearly
        var incomeInterest = incomeGrowth/100 + 1;
        var numPeriods = numberOfYears;         //default number of compounding periods is number of years
        var income = incomePerYear;

        if (numberOfYears === 0){
            netWorthTrend.push(Number(netWorthStart.toFixed(2))); //handle the case where number of periods is 0 and loop never runs
        }

        if (compoundMonthly){
            interest = annualReturn/12/100 + 1; //return per month is monthly interest
            numPeriods = numberOfYears*12;      //num compounding periods is number of months
        }

        for (var n = 1; n <= numPeriods; n++){
            if (netWorth > 0){
                //handle negative net worth case. Ignore compounding on negative net worth until income puts it in positive.
                netWorth = netWorth * interest;
            }

            //if compounding monthly, only add income once a year, and only after 1 year
            if (compoundMonthly){
                var year = Math.floor(n/12);    //what year are we in?
                if (n % 12 === 0 &&  year > 0){
                    //this period falls on year end, and it is not the first year, so add the income
                    netWorth = netWorth + income * Math.pow(incomeInterest, year - 1);
                    netWorthTrend.push(Number(netWorth.toFixed(2)));
                }
            }
            else {
                netWorth = netWorth + income * Math.pow(incomeInterest, n - 1);
                netWorthTrend.push(Number(netWorth.toFixed(2)));
            }

            if (DEBUG){ console.log ("interest rate = " + interest + " n = " + n + " income= " + income + " netWorth = " + netWorth ); }
        }

        return netWorthTrend;

    };
});


"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module("wealthManagerApp")
    .service("FIRECalcHelper", ["Helpers", function(Helpers) {
    var DEBUG = true;

    //calculate the future value of netWorthStart and returns a double
    //annualReturn - expected annual return in percentage (eg. 7)
    //incomePerYear - how much is being added/saved each year
    this.netWorthCalc = function (netWorthStart, annualReturn, incomePerYear, incomeGrowth, expensePerMonth, expenseGrowth, numberOfYears, compoundMonthly){
        var netWorthTrend = []; //annual net worth values
        var netWorth = netWorthStart;
        var interest = annualReturn/100 + 1;    //default compound yearly
        var incomeInterest = incomeGrowth/100 + 1;
        var expenseInterest = expenseGrowth/100 + 1;
        var numPeriods = numberOfYears;         //default number of compounding periods is number of years
        var income = incomePerYear;
        var expense = expensePerMonth*12; //use expense per year for calculations

        if (numberOfYears === 0){
            netWorthTrend.push(Number(netWorthStart.toFixed(2))); //handle the case where number of periods is 0 and loop never runs
        }

        if (compoundMonthly){
            interest = annualReturn/12/100 + 1; //return per month is monthly interest
            numPeriods = numberOfYears*12;      //num compounding periods is number of months
        }

        var year = 0;   //track years for income and expense calcs
        for (var n = 1; n <= numPeriods; n++){
            if (netWorth > 0){
                //handle negative net worth case. Ignore compounding on negative net worth until income puts it in positive.
                netWorth = netWorth * interest;
            }

            //if compounding monthly, only add income once a year, and only after 1 year
            if (compoundMonthly){
                year = Math.floor(n/12);    //what year are we in?
                if (n % 12 === 0 &&  year > 0){
                    //this period falls on year end, and it is not the first year, so add the income
                    netWorth = netWorth + income*Math.pow(incomeInterest, year - 1) - expense*Math.pow(expenseInterest, year-1);
                    netWorthTrend.push(Number(netWorth.toFixed(2)));
                }
            }
            else {
                year = n;   //compounding yearly, year is just the period
                netWorth = netWorth + income * Math.pow(incomeInterest, year-1) - expense * Math.pow(expenseInterest, year-1);
                netWorthTrend.push(Number(netWorth.toFixed(2)));
            }

            if (DEBUG){ console.log ("interest rate = " + interest + " n = " + n + " income= " + income + " expense= " + expense + " netWorth= " + netWorth ); }
        }

        return netWorthTrend;

    };

    //determine the rate of annual growth based on a starting net worth and an ending net worth, and how long it's been invested
    this.calculateROI = function(netWorthStart, netWorthEnd, numberOfYears){
        var ROI = 0;
        if (netWorthEnd <= netWorthStart){
            ROI = 1;
        }else{
            ROI = Math.pow(netWorthEnd/netWorthStart, 1/numberOfYears);
        }

        var ROIAsPercent = (ROI - 1)*100;
        ROIAsPercent = Number(ROIAsPercent.toFixed(2));
        return ROIAsPercent;
    };

    //take the series of historical data from all dates and create a series with just one value per year on the specified year end date
    this.consolidateHistoricalData = function(rawData, yearEndMonth, yearEndDay){
        var currentYear = "";
        var tempYear = "";
        var returnData = [];

        //sort the rawData first
        rawData.sort(Helpers.dynamicSort("date"));

        for (var i = 0; i < rawData.length; i++){
            currentYear = new Date(rawData[i].date).getFullYear();
            var entryToSave = rawData[i];

            if (DEBUG){
                console.log("current year is: " + currentYear);
                console.log("saving entry: " + entryToSave.net_worth + " " + entryToSave.date);
            }

            for (var j = i+1; j < rawData.length; j++){
                tempYear = new Date(rawData[j].date).getFullYear();
                if (tempYear === currentYear){
                    entryToSave = this.findObjClosestToEndDate(entryToSave, rawData[j], yearEndMonth, yearEndDay, currentYear);

                    if (DEBUG){console.log("saving entry: " + entryToSave.net_worth + " " + entryToSave.date);}
                }
                //done with all the entries for this year, break out of loop
                if (tempYear > currentYear){
                    break;
                }
            }

            i = j;  //start on next value in data not in current year
            returnData.push({"year": currentYear, "net_worth": entryToSave.net_worth, "currency": entryToSave.currency});
        }
        return returnData;
    };

    this.findObjClosestToEndDate = function(x, y, yearEndMonth, yearEndDay, currentYear){
        var retVal = x;
        var xDate = new Date(x.date);
        var yDate = new Date(y.date);
        var yearEnd = new Date(currentYear, yearEndMonth, yearEndDay,0,0,0,0);
        var xDiff = Math.abs(xDate - yearEnd);
        var yDiff = Math.abs(yDate - yearEnd);
        if (xDiff > yDiff){
            retVal = y;
        }

        return retVal;   //if equal, just return the first one
    };

    this.generateCombinedNetWorthData = function(historicalData, netWorthData){
        //take 2 series of net worth data and combine them into one
    };
}]);


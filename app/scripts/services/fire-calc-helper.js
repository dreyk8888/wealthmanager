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
    var DEBUG = false;

    //calculate the future value of netWorthStart and returns a double
    //annualReturn - expected annual return in percentage (eg. 7)
    //incomePerYear - how much is being added/saved each year
    this.netWorthCalc = function (netWorthStart, annualReturn, incomePerYear, incomeGrowth, expensePerMonth, expenseGrowth, numberOfYears, compoundMonthly){
        var netWorthTrend = []; //annual net worth values
        if (annualReturn < 0){
            //TODO actually handle this case with income per year
            netWorthTrend.push(0); //if your annual return is 0, you will eventually have no money
            return netWorthTrend;
        }

        if (numberOfYears === 0){
            netWorthTrend.push(Number(netWorthStart.toFixed(2))); //handle the case where number of periods is 0 and loop never runs
            return netWorthTrend;
        }

        var netWorth = netWorthStart;

        var interest = annualReturn/100 + 1;    //default compound yearly
        var incomeInterest = incomeGrowth/100 + 1;
        var expenseInterest = expenseGrowth/100 + 1;
        var numPeriods = numberOfYears;         //default number of compounding periods is number of years
        var income = incomePerYear;
        var expense = expensePerMonth*12; //use expense per year for calculations



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
        if (numberOfYears <= 0){
            ROI = 0;
        }else if (netWorthEnd === netWorthStart){
            ROI = 0;
        }else if (netWorthEnd < netWorthStart || netWorthEnd < 0 || netWorthStart < 0){
            ROI = ((netWorthEnd - netWorthStart)/Math.abs(netWorthStart))/numberOfYears*100;
        }else{
            ROI = (Math.pow(netWorthEnd/netWorthStart, 1/numberOfYears) - 1)*100;
        }

        ROI = Number(ROI.toFixed(2));
        return ROI;
    };

    //take the series of historical data from all dates and create a series with just one value per year on the specified year end date
    //also fill in the gaps in years where there's no data
    this.consolidateHistoricalData = function(rawData, yearEndMonth, yearEndDay){
        var currentYear = "";
        var tempYear = "";
        var returnData = [];

        //sort the rawData first
        rawData.sort(Helpers.dynamicSort("date"));
        if (DEBUG){
            for (var x = 0; x < rawData.length; x++){
                console.log("data: " + rawData[x].date + " " + rawData[x].net_worth);
            }
        }
        for (var i = 0; i < rawData.length; i++){
            currentYear = new Date(rawData[i].date).getFullYear();
            var entryToSave = rawData[i];

            if (DEBUG){
                console.log("i: " + i);
                console.log("current year is: " + currentYear);
                console.log("saving entry: " + entryToSave.net_worth + " " + entryToSave.date);
            }

            for (var j = i+1; j < rawData.length; j++){
                tempYear = new Date(rawData[j].date).getFullYear();

                if (DEBUG){
                    console.log("tempyear: " + tempYear);
                    console.log("j: " + j);
                }
                if (tempYear === currentYear){
                    entryToSave = this.findObjClosestToEndDate(entryToSave, rawData[j], yearEndMonth, yearEndDay, currentYear);

                    if (DEBUG){console.log("saving entry: " + entryToSave.net_worth + " " + entryToSave.date);}
                }
                //done with all the entries for this year, break out of loop
                if (tempYear > currentYear){
                    break;
                }

            }

            i = j-1;  //start on next value in data not in current year
            returnData.push({"year": currentYear, "net_worth": entryToSave.net_worth, "currency": entryToSave.currency});

            if (DEBUG){
                console.log("i: " + i);
                for (var x = 0; x < returnData.length; x++){
                    console.log("returnData: " + returnData[x].year + " " + returnData[x].net_worth);
                }
            }

            //if we have skipped a year, insert another entry for the next year of the same net worth value, until we hit the year with data
            var n = 1;
            while (tempYear - currentYear > 1){
                returnData.push({"year": currentYear + n, "net_worth": entryToSave.net_worth, "currency": entryToSave.currency});
                n++;
                tempYear --;
            }
        }
        return returnData;
    };

    this.findObjClosestToEndDate = function(x, y, yearEndMonth, yearEndDay, currentYear){
        //month starts from 0 for Date objects
        var retVal = x;
        var xDate = new Date(x.date);
        var yDate = new Date(y.date);
        var yearEnd = new Date(currentYear, yearEndMonth-1, yearEndDay,0,0,0,0);
        var xDiff = Math.abs(xDate - yearEnd);
        var yDiff = Math.abs(yDate - yearEnd);
        if (DEBUG){
            console.log ("Year end = " + yearEnd);
            console.log ("xDate = " + xDate);
            console.log ("yDate = " + yDate);
            console.log ("xDiff = " + xDiff);
            console.log ("yDiff = " + yDiff);
        }
        if (xDiff > yDiff){
            retVal = y;
        }

        return retVal;   //if equal, just return the first one
    };

    //take 2 series of net worth data and combine them into one array of {year,networth} objects
    //TODO: handle currency differences
    this.generateCombinedNetWorthPlotData = function(historicalData, netWorthData){
        var returnData = [];
        //var currentYear = 2017;
        var currentYear = new Date().getFullYear();
        var yearPtr = 0;
        var dataPoint = {};

        for (var i = 0; i < historicalData.length; i++){
            dataPoint = [historicalData[i].year, historicalData[i].net_worth];
            yearPtr = historicalData[i].year;
            returnData.push(dataPoint);

            if (DEBUG){console.log("Add hist data point: " + dataPoint);}
        }


        if (yearPtr < currentYear){
            //if there's a gap between historical data and current year, fill it with the same net worth value
            var n = 1;
            while ((currentYear - (yearPtr + n)) >= 0){
                dataPoint = [yearPtr + n, historicalData[historicalData.length - 1].net_worth];
                returnData.push (dataPoint);
                n++;

                if (DEBUG){console.log("Add gap data point: " + dataPoint);}
            }
        }

        for (var j = 0; j < netWorthData.length; j++){
            yearPtr = currentYear + j + 1;  //calculated date starts from 1 year from current year
            dataPoint = [yearPtr, netWorthData[j]];
            returnData.push (dataPoint);

            if (DEBUG){console.log("Add future data point: " + dataPoint);}
        }

        return returnData;
    };
}]);


"use strict";

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioEntryCtrl
 * @description
 * # FIRECalcCtrl
 * Controller of the wealthManagerApp Financial independent calculator
 */
//use promises for data fetches and calculations
angular.module("wealthManagerApp")
.controller("FIRECalcCtrl", ["$http","FIRECalcHelper","FIREChartConfig", "NetWorthDataAPI", "APIResponseHandlersCommon", function ($http,FIRECalcHelper, FIREChartConfig, NetWorthDataAPI, APIResponseHandlersCommon){
    var DEBUG = true;

    var vm = this;
    vm.useCalculatedData = false;
    vm.useHistoricalROI = false;
    vm.annualReturn = 7;
    vm.netWorth = 100000;
    vm.incomePerYear = 50000;
    vm.incomeGrowth = 2;
    vm.expensePerMonth = 2000;
    vm.expenseGrowth = 2;
    vm.numberOfYears = 5;
    vm.yearEndDay = 1;
    vm.yearEndMonth = 1;    //which day should be considered the "year end" where we calculate net worth?
    vm.compoundMonthly = false;

    vm.netWorthData = [];
    vm.loadedHistoricalData = [];
    vm.futureNetWorth = 0;

    vm.netWorthChartConfig = FIREChartConfig.NetWorthTrendConfig(vm.netWorthData);

    //dislay historical data vs calculation to plot trend
    vm.displayNetWorth = function(){
        if (vm.useCalculatedData === true){
            NetWorthDataAPI.getDataWithPromise()
                .then(data => {
                    console.log (data.data);
                    if (DEBUG){
                        for (var i = 0; i < data.data.length; i++){
                            vm.loadedHistoricalData.push(data.data[i]);
                            console.log ("Data returned from API: " + vm.loadedHistoricalData[i].net_worth + " " + vm.loadedHistoricalData[i].date);
                        }
                    }
                    vm.combinedData = useHistoricalNetWorth(vm.loadedHistoricalData, vm.useHistoricalROI, vm.yearEndMonth, vm.yearEndDay, vm.netWorth, vm.annualReturn, vm.incomePerYear, vm.incomeGrowth, vm.expensePerMonth, vm.expenseGrowth,
                        vm.numberOfYears, vm.compoundMonthly);

                    vm.netWorthChartConfig.series[0].data = vm.combinedData;
                })
                .catch(error => console.log(error));

        }else{
            vm.netWorthData = FIRECalcHelper.netWorthCalc(vm.netWorth, vm.annualReturn, vm.incomePerYear, vm.incomeGrowth,
                vm.expensePerMonth, vm.expenseGrowth, vm.numberOfYears, vm.compoundMonthly);
            vm.futureNetWorth = calculateFutureNetWorth(vm.netWorthData);

            if (DEBUG){
                console.log ("Future net worth: " + vm.futureNetWorth);
                console.log("Use calculated data? " + vm.useCalculatedData);
            }

            vm.netWorthChartConfig.series[0].data = vm.netWorthData;
        }

    };

    var calculateFutureNetWorth = function(netWorthData){
        return netWorthData[netWorthData.length - 1];
    };

    //build a data set using historical values and projected values
    var useHistoricalNetWorth = function(loadedData, useHistoricalROI, yearEndMonth, yearEndDay, netWorthStart, annualReturn, incomePerYear, incomeGrowth, expensePerMonth,
        expenseGrowth, numberOfYears, compoundMonthly){
        var historicalData = FIRECalcHelper.consolidateHistoricalData(loadedData, yearEndMonth, yearEndDay); //clean up the loaded data so we get 1 point per year

        if (useHistoricalROI === true)
        {
            var years = historicalData[historicalData.length - 1].year - historicalData[0].year;
            var startNW = historicalData[0].net_worth;
            var endNW = historicalData[historicalData.length - 1].net_worth;
            annualReturn = FIRECalcHelper.calculateROI(startNW, endNW, years);
            if (DEBUG){ console.log("Using historical ROI: years=" + years + " NWstart=" + startNW + " NWend=" + endNW + " ROI=" + annualReturn);}
        }

        if (DEBUG){console.log("Calculating future net worth values");}
        //calculate the rest of the net worth trend based on last net worth in history and remaining number of years until retirement
        var calculatedNetWorth = FIRECalcHelper.netWorthCalc(historicalData[historicalData.length-1].net_worth, annualReturn, incomePerYear, incomeGrowth, expensePerMonth,
        expenseGrowth, numberOfYears, compoundMonthly);

        if (DEBUG){console.log("Combining historical and future value into single trend for plot");}
        //a data series with combined historical and calculated data to plot
        var combinedData = FIRECalcHelper.generateCombinedNetWorthPlotData (historicalData,calculatedNetWorth);

        return combinedData;
    };
}]);
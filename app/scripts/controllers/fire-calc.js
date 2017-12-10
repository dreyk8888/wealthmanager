"use strict";

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioEntryCtrl
 * @description
 * # FIRECalcCtrl
 * Controller of the wealthManagerApp Financial independent calculator
 */

// format numbers with commas
// income in FI calculation - the FI income number will be greyed out, displaying how much income will be based on net worth and withdrawal rate
//add another number for withdrawal rate to calculate the income

//graph does not refresh until you click on another text box when using historical data

//test historical data with more realistic date, historical ROI, longer number of years
// color theme
//make graph bigger - need to make this dynamic width, but refuses to work. Do later


angular.module("wealthManagerApp")
.controller("FIRECalcCtrl", ["FIRECalcHelper","FIREChartConfig", "NetWorthDataAPI", "APIResponseHandlersCommon", function (FIRECalcHelper, FIREChartConfig, NetWorthDataAPI, APIResponseHandlersCommon){
    var DEBUG = true;

    var vm = this;

    ////////////////////////////////////////////////////////////////////////////////////////////
    //Initial values
    vm.useCalculatedData = false;
    vm.useHistoricalROI = false;
    vm.annualReturn = 7;
    vm.netWorth = 100000;
    vm.incomePerYear = 50000;
    vm.incomeGrowth = 2;
    vm.expensePerMonth = 3000;
    vm.expenseGrowth = 2;
    vm.numberOfYears = 25;
    vm.compoundMonthly = false;
    vm.FIincome = 0;
    vm.withdrawalRate = 3.5;
    vm.netWorthData = [];
    vm.loadedHistoricalData = [];
    vm.futureNetWorth = 0;

    ////////////////////////////////////////////////////////////////////////////////////////////
    //Chart display

    //Initialize chart
    vm.chart = FIREChartConfig.nwChartConfig(vm.netWorthData);
    //vm.chart = new Highcharts.chart("static-chart", this.netWorthChartConfig);
    //dislay historical data vs calculation to plot trend

    //Display graph based on data
    vm.displayNetWorth = function(){
        if (vm.useCalculatedData === true){

            var currentYear = new Date().getFullYear();

            NetWorthDataAPI.getDataWithPromise()
                .then(data => {
                    console.log (data.data);
                    if (DEBUG){
                        for (var i = 0; i < data.data.length; i++){
                            vm.loadedHistoricalData.push(data.data[i]);
                            console.log ("Data returned from API: " + vm.loadedHistoricalData[i].net_worth + " " + vm.loadedHistoricalData[i].date);
                        }
                    }

                    var yearEndMonth = vm.yearEndDate.getMonth();
                    var yearEndDay = vm.yearEndDate.getDay();
                    vm.combinedData = useHistoricalNetWorth(vm.loadedHistoricalData, vm.useHistoricalROI, yearEndMonth, yearEndDay, vm.netWorth, vm.annualReturn, vm.incomePerYear, vm.incomeGrowth, vm.expensePerMonth, vm.expenseGrowth,
                        vm.numberOfYears, vm.compoundMonthly);

                    vm.futureNetWorth = vm.combinedData[vm.combinedData.length - 1].net_worth;

                    //update on page settings based on historical data
                    vm.FIincome = FIRECalcHelper.calculateFIIncome (vm.futureNetWorth, vm.withdrawalRate);
                    vm.netWorth = vm.combinedData.findIndex(obj => obj.year === currentYear).net_worth;
                    //vm.chart.series[0].data.push(vm.combinedData);
                    vm.chart.series[0].data = vm.combinedData;
                    //vm.netWorthChartConfig = angular.copy(vm.netWorthChartConfig);
                })
                .catch(error => console.log(error));

        }else{
            vm.netWorthData = FIRECalcHelper.netWorthCalc(vm.netWorth, vm.annualReturn, vm.incomePerYear, vm.incomeGrowth,
                vm.expensePerMonth, vm.expenseGrowth, vm.numberOfYears, vm.compoundMonthly);
            vm.futureNetWorth = calculateFutureNetWorth(vm.netWorthData);
            vm.FIincome = FIRECalcHelper.calculateFIIncome (vm.futureNetWorth, vm.withdrawalRate);
            if (DEBUG){
                console.log ("Future net worth: " + vm.futureNetWorth);
                console.log("Use calculated data? " + vm.useCalculatedData);
            }

            vm.chart.series[0].data = vm.netWorthData;
            //vm.chart.series[0].data.push(vm.netWorthData);
        }

    };

    //calculate future value based on data
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
     ////////////////////////////////////////////////////////////////////////////////////////////
    //On page controls
    ////////////////////////////////////////////////////////////////////////////////////////////
    //Sliders
    vm.nwSlider = {
        options:
        {
            precision: 2,
            pushRange: true,
            floor: 0,
            ceil: 2e6,
            showSelectionBar: true,
            translate: function(value) {
                return "$" + value;
            },
            onChange: function(){
                vm.displayNetWorth();
            }
        }
    };
    vm.yearSlider = {
        options:
        {
            precision: 0,
            pushRange: true,
            showSelectionBar: true,
            floor: 0,
            ceil: 50,
            onChange: function(){
                vm.displayNetWorth();
            }
        }
    };
    vm.percentSlider = {
        options:
        {
            precision: 2,
            pushRange: true,
            floor: 0,
            ceil: 20,
            showSelectionBar: true,
            translate: function(value) {
                return value + "%";
            },
            onChange: function(){
                vm.displayNetWorth();
            }
        }
    };
    vm.annualPaymentSlider = {
        options:
        {
            precision: 2,
            pushRange: true,
            floor: 0,
            ceil: 100000,
            showSelectionBar: true,
            translate: function(value) {
                return "$" + value;
            },
            onChange: function(){
                vm.displayNetWorth();
            }
        }
    };
    vm.monthlyPaymentSlider = {
        options:
        {
            precision: 2,
            pushRange: true,
            floor: 0,
            ceil: 10000,
            showSelectionBar: true,
            translate: function(value) {
                return "$" + value;
            },
            onChange: function(){
                vm.displayNetWorth();
            }
        }
    };
    vm.withdrawalRateSlider = {
            options:
            {
                precision: 2,
                step: 0.1,
                floor: 0,
                ceil: 10,
                showSelectionBar: true,
                translate: function(value) {
                    return value + "%";
                },
                onChange: function(){
                    vm.displayNetWorth();
                }
            }
        };

    ////////////////////////////////////////////////////////////////////////////////////////////
    //Date picker functions
    vm.yearEndDate = new Date();  //what date to consider as year end?
    vm.dateOptions = {
        dateDisabled: "",
        formatYear: 'yy',
        maxDate: new Date(2100, 5, 22),
        minDate: new Date(1900,5,22),
        initDate: new Date(),
        maxMode: "month",
        startingDay: 1
    };
    vm.format = 'dd-MM-yyyy';
    vm.popup1 = {
        opened: false
    };
    vm.open1 = function() {
        vm.popup1.opened = true;
    };
/*
    $(window).resize(function()
    {
        vm.chart.setSize(
       $(document).width(),
       $(document).height()/2,
       false
        );
    });
*/
}]);
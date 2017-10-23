"use strict";

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioEntryCtrl
 * @description
 * # FIRECalcCtrl
 * Controller of the wealthManagerApp Financial independent calculator
 */
// use saved values for net worth
// save net worth trend
angular.module("wealthManagerApp")
.controller("FIRECalcCtrl", ["FIRECalcHelper","FIREChartConfig", function (FIRECalcHelper, FIREChartConfig){

    var vm = this;
    vm.annualReturn = 7;
    vm.netWorth = 100000;
    vm.incomePerYear = 50000;
    vm.incomeGrowth = 2;
    vm.expensePerMonth = 2000;
    vm.numberOfYears = 20;
    vm.compoundMonthly = false;

    vm.netWorthChartConfig = FIREChartConfig.NetWorthTrendConfig(vm.netWorthData);

    vm.calculateNetWorth = function(){
        vm.netWorthData = FIRECalcHelper.netWorthCalc(vm.netWorth, vm.annualReturn, vm.incomePerYear, vm.incomeGrowth,
            vm.numberOfYears, vm.compoundMonthly);
        vm.futureNetWorth = vm.netWorthData[vm.netWorthData.length - 1];

        for (var i=0; i < vm.netWorthData.length; i++){
            console.log (vm.netWorthData[i]);
        }
        console.log ("Future net worth: " + vm.futureNetWorth);

        vm.netWorthChartConfig.series[0].data = vm.netWorthData;

    };


}]);
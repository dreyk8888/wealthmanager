"use strict";

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioEntryCtrl
 * @description
 * # FIRECalcCtrl
 * Controller of the wealthManagerApp Financial independent calculator
 */

angular.module("wealthManagerApp")
.controller("FIRECalcCtrl", ["FIRECalcHelper","GlobalConstants", function (FIRECalcHelper, GlobalConstants){

    var vm = this;
    vm.annualReturn = 7;
    vm.netWorth = 100000;
    vm.numberOfYears = 2;
    vm.compoundAt = GlobalConstants.YEARLY;

    vm.futureNetWorth = FIRECalcHelper.netWorthCalc(vm.netWorth, vm.annualReturn, 0, vm.numberOfYears, vm.compoundAt);

}]);
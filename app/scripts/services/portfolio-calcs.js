'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module('wealthManagerApp')
    .service('PortfolioCalcs', ['Helpers', function(Helpers) {
        var DEBUG = true;
        //take an array of asset data and calculate the total
        this.assetTotalCalc = function(data){
            var total = 0;

            for (var i = 0; i < data.length; i++){
                total = total + data[i].amount;
            }
            return total.toFixed(2);
        }

        this.assetClassTotalCalc = function(data){
        //array of [asset class, total]

            var totalEnum = {
                CLASS: 0,
                TOTAL: 1
            }
            var classTotals = [];
            var total = this.assetTotalCalc (data);
            for (var i = 0; i < data.length; i++){
                //search for this class name in the 2-D array, where the first index is class, second is total
                var index = Helpers.search2DArray(data[i].class, classTotals, totalEnum.CLASS);

                if (index === -1){
                    classTotals.push([data[i].class, data[i].amount]);

                    if (DEBUG){ console.log ("Calculating amount per asset class: " + classTotals); }

                } else {
                    var newTotal = classTotals[index].total + data[i].amount;
                    classTotals[index].total = newTotal;
                }
            }

            if (DEBUG){ console.log ("Total amount per asset class: " + classTotals); }

            return classTotals;
        }

        this.assetClassTotalPercentCalc = function(data){
        //array of objects {asset class, total, percentage of all assets}
            var classTotals = [];
            var total = this.assetTotalCalc (data);
            for (var i = 0; i < data.length; i++){
                var index = Helpers.searchObjectArray(data[i].class, classTotals, 'class');

                //first of this class encountered, just use amount as total
                if (index === -1){
                    var percentOfTotal = (data[i].amount/total * 100).toFixed(2);
                    classTotals.push({class: data[i].class, total: data[i].amount, percentage: percentOfTotal} );

                    if (DEBUG){ console.log ("Calculating amount per asset class: " + classTotals); }

                //add the current amount to the existing amount in the array
                } else {
                    var newTotal = classTotals[index].total + data[i].amount;
                    classTotals[index].total = newTotal;

                    var newPercentage = (newTotal/total * 100).toFixed(2);
                    classTotals[index].percentage = newPercentage;
                }
            }

            if (DEBUG){ console.log ("Total amount per asset class: " + classTotals); }

            return classTotals;
        }

        this.debtTotalCalc = function (data){
            var total = 0;

            for (var i = 0; i < data.length; i++){
                total = total + data[i].amount;
            }
            return total.toFixed(2);

        }
}]);

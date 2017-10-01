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
        this.totalCalc = function (data){
            var total = 0;

            for (var i = 0; i < data.length; i++){
                total = total + data[i].amount;
            }
            return total.toFixed(2);

        };

        this.perTypeTotalCalc = function(data){
        //array of {type: <value>, total: 'value'}

            var totalEnum = {
                CLASS: 0,
                TOTAL: 1
            };

            var typeTotals = [];

            for (var i = 0; i < data.length; i++){
                //search for this class name in the 2-D array, where the first index is class, second is total
                var index = Helpers.search2DArray(data[i].class, typeTotals, totalEnum.CLASS);

                if (index === -1){
                    typeTotals.push({'type': data[i].class, 'amount': data[i].amount});

                    if (DEBUG){ console.log ("Calculating amount per type: " + typeTotals); }

                } else {
                    var newTotal = typeTotals[index].total + data[i].amount;
                    typeTotals[index].total = newTotal;
                }
            }

            if (DEBUG){ console.log ("Total amount per type: " + typeTotals); }

            return typeTotals;
        };

        this.perTypeTotalPercentCalc = function(data){
        //array of objects {asset class, total, percentage of all assets}
            var typeTotals = [];
            var total = this.totalCalc (data);
            for (var i = 0; i < data.length; i++){
                var index = Helpers.searchObjectArray(data[i].class, typeTotals, 'class');

                //first of this class encountered, just use amount as total
                if (index === -1){
                    var percentOfTotal = (data[i].amount/total * 100).toFixed(2);
                    typeTotals.push({class: data[i].class, total: data[i].amount, percentage: percentOfTotal} );

                    if (DEBUG){ console.log ("Calculating amount per asset class: " + typeTotals); }

                //add the current amount to the existing amount in the array
                } else {
                    var newTotal = typeTotals[index].total + data[i].amount;
                    typeTotals[index].total = newTotal;

                    var newPercentage = (newTotal/total * 100).toFixed(2);
                    typeTotals[index].percentage = newPercentage;
                }
            }

            if (DEBUG){ console.log ("Total amount per asset class: " + typeTotals); }

            return typeTotals;
        };


}]);

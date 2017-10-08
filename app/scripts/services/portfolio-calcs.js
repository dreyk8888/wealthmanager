"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module("wealthManagerApp")
    .service("PortfolioCalcs", ["Helpers", function(Helpers) {
        var DEBUG = true;
        //take an array of asset data and calculate the total
        this.totalCalc = function (data, objValueName){
            var total = 0;

            for (var i = 0; i < data.length; i++){
                total = total + data[i][objValueName];
            }
            return total.toFixed(2);

        };

        //data: array of portfolio data
        //typeName: name of the type in the data object we should be calculating the total for
        //returns: array of {type: <value>, total: "value"}
        this.perTypeTotalCalc = function(data, objTypeName, objValueName){
            var typeTotals = [];

            for (var i = 0; i < data.length; i++){
                //search for this class name in the 2-D array, where the first index is class, second is total
                var index = Helpers.searchObjectArray(data[i][objTypeName], typeTotals, "type");

                if (index === -1){
                    typeTotals.push({"type": data[i][objTypeName], "total": data[i][objValueName]});
                } else {
                    var newTotal = typeTotals[index].total + data[i][objValueName];
                    typeTotals[index].total = newTotal;
                }
            }

            if (DEBUG){
                for (var j = 0; j < typeTotals.length; j++){
                    console.log ("Type: " + typeTotals[j].type + " Total: " + typeTotals[j].total);
                }
            }

            return typeTotals;
        };

        //data: array of portfolio data
        //objTypeName: name of the type in the data object we should be calculating the total for
        //objValueName: name of the amount value in the object use to calculate total
        //returns: array of objects {type: <value>, total:<value>, percentage: <value>}
        this.perTypeTotalPercentCalc = function(data, objTypeName, objValueName){
            var typeTotals = [];
            var total = this.totalCalc (data, objValueName);
            for (var i = 0; i < data.length; i++){
                //search the existing array of types and totals to see if we should create a new type or add to an existing value
                var index = Helpers.searchObjectArray(data[i][objTypeName], typeTotals, "type");
                 console.log (data[i][objTypeName] + " index: " + index);
                //first of this class encountered, just use amount as total
                if (index === -1){
                    var percentOfTotal = 0;
                    if (data[i][objValueName] > 0 && total > 0){
                        percentOfTotal = (data[i][objValueName]/total * 100).toFixed(2);
                    }
                    typeTotals.push({type: data[i][objTypeName], total: data[i][objValueName], percentage: percentOfTotal} );

                    if (DEBUG){ console.log ("Calculating amount per asset class: " + typeTotals); }

                //add the current amount to the existing amount in the array
                } else {
                    var newTotal = typeTotals[index].total + data[i][objValueName];
                    typeTotals[index].total = newTotal;

                    var newPercentage = 0;

                    if (newTotal > 0 && total > 0){
                        newPercentage = (newTotal/total * 100).toFixed(2);
                    }
                    typeTotals[index].percentage = newPercentage;
                }
            }

            if (DEBUG){
                for (var j = 0; j < typeTotals.length; j++){
                    console.log ("Type: " + typeTotals[j].type + " Amount: " + typeTotals[j].total + " Percentage: " + typeTotals[j].percentage);
                }
            }

            return typeTotals;
        };


}]);

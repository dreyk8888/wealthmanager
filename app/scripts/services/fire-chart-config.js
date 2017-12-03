"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module("wealthManagerApp")
    .service("FIREChartConfig", function() {
        this.nwChartConfig = function(data){
            var chartConfig = {
                chart: {
                    type: "column",
                    height: 60 + "%",
                    width: 900,
                    backgroundColor: "transparent",
                    style: {
                        font: '"Roboto Condensed", sans-serif',
                        color: "#FFFFFF"
                    }
                },
                title: {
                    text: "Net Worth Growth"
                },
                series: [{
                    name: "Net Worth (End of Year)",
                    data: data,
                    color: "#35a04a"
                }],
                xAxis: {
                    labels: {
                      formatter: function () {
                        return this.value + 1;
                      }
                    }
                }
            };

            return chartConfig;
        };

});

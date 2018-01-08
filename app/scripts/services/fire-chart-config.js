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
                    height: 40 + "%",
                    width: window.screen.width*0.75,
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
                },
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: window.screen.width*0.7
                        },
                        // Make the labels less space demanding on mobile
                    chartOptions: {
                        xAxis: {
                            labels: {

                            }
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -2
                            },
                            title: {
                                text: ''
                            }
                        }
                    }
                }]
            }
        }

            return chartConfig;
        };

});

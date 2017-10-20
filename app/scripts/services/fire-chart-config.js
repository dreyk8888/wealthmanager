'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module('wealthManagerApp')
    .service('FIREChartConfig', function() {
        this.NetWorthTrendConfig = function(data){
            var chartConfig = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Net Worth Growth'
                },
                series: [{
                    name: 'Net Worth (End of Year)',
                    data: data
                }]
            };

            return chartConfig;
        };
});

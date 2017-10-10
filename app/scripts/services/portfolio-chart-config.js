'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module('wealthManagerApp')
    .service('PortfolioChartConfig', function() {
        this.portfolioPieConfig = function(data){
            var chartConfig = {
                chart: {
                    type: 'pie'
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',

                        }
                    }
                },
                title: {
                    text: 'Asset Mix by Type'
                },
                series: [{
                    name: 'Asset Mix',
                    data: data
                }]
            };

            return chartConfig;
        };

});
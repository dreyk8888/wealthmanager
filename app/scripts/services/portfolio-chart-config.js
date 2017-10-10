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
        this.portfolioSAssetClassPieConfig = function(data){
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
                    text: 'Asset Allocation by Type'
                },
                series: [{
                    name: 'Asset Mix',
                    data: data
                }]
            };

            return chartConfig;
        };

        this.portfolioAssetLocationPieConfig = function(data){
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
                    text: 'Asset Allocation by Geography'
                },
                series: [{
                    name: 'Asset Allocation by Geography',
                    data: data
                }]
            };

            return chartConfig;
        };



});

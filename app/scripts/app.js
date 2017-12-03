'use strict';

/**
 * @ngdoc overview
 * @name wealthManagerApp
 * @description
 * # wealthManagerApp
 *
 * Main module of the application.
 */
angular
  .module('wealthManagerApp',
    [
        'ui.router',
        'ui.grid',
        'ui.grid.edit',
        'ui.grid.grouping',
        'ui.grid.rowEdit',
        'ui.grid.cellNav',
        'ui.grid.autoResize',
        'ui.bootstrap',
        'schemaForm',
        'highcharts-ng',
        'rzModule'
    ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    // For any unmatched url, send to /business
    $urlRouterProvider.otherwise("/portfolio");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "views/dashboard.html"
        })
        .state('portfolio', {
            url: "/portfolio",
            templateUrl: "views/portfolio-entry.html"
        })
        .state('firecalc', {
            url: "/firecalc",
            templateUrl: "views/fire-calc.html"
        });
}]);

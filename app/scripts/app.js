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
        'highcharts-ng'
    ]);

'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module('wealthManagerApp')
    .service('PortfolioGridColumnDef', function() {

        this.assetColDef = [
            { name: 'ID', field: '_id', width: '0%', visible: false },
            { name: 'Asset Class', field: 'class', width: '20%', grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'asc' }, cellTemplate: 'views/portfolioentry-grid-grouping-template.html' },
            { name: 'Geographical Location', field: 'location', width: '10%'},
            { name: 'Name/Ticker', field: 'name', width: '20%' },
            { name: 'Units Held', field: 'units', type: 'number', width: '10%' },
            { name: 'Unit Cost', field: 'unitCost', type: 'number', width: '10%', cellFilter: 'currency'},
            { name: 'Amount', field: 'amount', type: 'number', width: '10%', enableCellEdit: false, cellFilter: 'currency' },
            { name: 'Date Purchased (MM-DD-YYYY)', field: 'date_purchased', type: 'date', width: '10%', cellFilter: 'date:"MM-dd-yyyy"'},
            { name: "Actions",
                field:"buttons",
                width: '10%',
                cellTemplate: 'views/portfolioentry-grid-button-template-asset.html',
                enableCellEdit: false,
                enableFiltering:false,
                enableSorting: false,
                showSortMenu : false,
                enableColumnMenu: false,
            },
        ];

        this.debtColDef = [
            { name: 'Name', field: 'name', width: '20%' },
            { name: 'Amount', field: 'amount', type: 'number', width: '30%', enableCellEdit: false, cellFilter: 'currency' },
            { name: 'Description', field: 'name', width: '30%' },
            { name: "Actions",
                field:"buttons",
                width: '20%',
                cellTemplate: 'views/portfolioentry-grid-button-template-debt.html',
                enableCellEdit: false,
                enableFiltering:false,
                enableSorting: false,
                showSortMenu : false,
                enableColumnMenu: false,
            },
        ];

});

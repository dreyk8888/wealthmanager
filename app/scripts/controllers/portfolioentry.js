'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
 */

 /*todo
- make an update API
- hook up inline edit to get the right _id to pass to update function in API
- add delete buttons to table
 */


angular.module('wealthManagerApp')
    .controller('PortfolioEntryCtrl', function ($scope, $http, AssetDataAPI, Helpers) {

    $scope.entry = {
        class: "",
        name: "",
        units: "",
        unitCost: "",
        amount: "",
        location: "",
        date_purchased: "",
        currency: ""
    };

    $scope.totalAssets = 0;   //container for asset total amount
    $scope.classTotals = [];

    //ui-grid setup
    $scope.assetData = [];  //container for asset table

    var columnDefs = [
        { name: 'ID', field: '_id', width: '0%', visible: false },
        { name: 'Asset Class', field: 'class', width: '20%', grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'asc' }, cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
        { name: 'Geographical Location', field: 'location', width: '10%'},
        { name: 'Name/Ticker', field: 'name', width: '20%' },
        { name: 'Units Held', field: 'units', type: 'number', width: '10%' },
        { name: 'Unit Cost', field: 'unitCost', type: 'number', width: '10%', cellFilter: 'currency'},
        { name: 'Amount', field: 'amount', type: 'number', width: '10%', enableCellEdit: false, cellFilter: 'currency' },
        { name: 'Date Purchased (MM-DD-YYYY)', field: 'date_purchased', type: 'date', width: '10%', cellFilter: 'date:"MM-dd-yyyy"'},
        {
            name: "",
            field:"buttons",
            width: '10%',
            cellTemplate: '<div class="ui-grid-cell-contents" >' +
            '<button value="Edit" ng-if="!row.inlineEdit.isEditModeOn" class="button-inline-remove" ng-click="row.inlineEdit.enterEditMode($event)"></button>' +
            '<button value="Edit" ng-if="!row.inlineEdit.isEditModeOn" class="button-inline-edit" ng-click="row.inlineEdit.enterEditMode($event)"></button>' +
            '<button value="Edit" ng-if="row.inlineEdit.isEditModeOn" class="button-inline-ok" ng-click="row.inlineEdit.saveEdit($event)"></button>' +
            '<button value="Edit" ng-if="row.inlineEdit.isEditModeOn" class="button-inline-cancel" ng-click="row.inlineEdit.cancelEdit($event)"></button>' +
            '</div>',
            enableCellEdit: false,
            enableFiltering:false,
            enableSorting: false,
            showSortMenu : false,
            enableColumnMenu: false,
        },
    ];

    $scope.gridOptions = {
    enableSorting: true,
    columnDefs: columnDefs,
    enableFiltering: false,
    showTreeExpandNoChildren: true,
    treeRowHeaderAlwaysVisible: false,
    data: 'assetData',
    onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerDataChangeCallback(function() {
                $scope.gridApi.treeBase.expandAllRows();
            });
        }
    };

    //load asset data for the view
    $scope.getData = function() {
        AssetDataAPI.getData(successHandler_GET, failureHandler_GET);
    }

    //contains all the functions needed to recalculate everything
    $scope.recalculate = function(){
        $scope.calculateTotalAssets();
        $scope.calculateTotalPerAssetClass();
    }

    $scope.calculateTotalAssets = function(){
        $scope.totalAssets = 0;
        var total = 0;

        for (var i = 0; i < $scope.assetData.length; i++){
            total = total + $scope.assetData[i].amount;
        }

        console.log ($scope.assetData.length);
        $scope.totalAssets = total.toFixed(2);
    }

    $scope.calculateTotalPerAssetClass = function(){
        //array of {asset class, total, percentage of all assets}
        $scope.classTotals = [];
        var classIndex = 0;
        for (var i = 0; i < $scope.assetData.length; i++){
            var index = Helpers.searchArray($scope.assetData[i].class, $scope.classTotals, 'class');

            if (index === -1){
                var percentOfTotal = ($scope.assetData[i].amount/$scope.totalAssets * 100).toFixed(2);
                $scope.classTotals.push({class: $scope.assetData[i].class.toTitleCase(), total: $scope.assetData[i].amount, percentage: percentOfTotal} );
                console.log ($scope.classTotals);
            } else {
                var newTotal = $scope.classTotals[index].total + $scope.assetData[i].amount;
                $scope.classTotals[index].total = newTotal;

                var newPercentage = (newTotal/$scope.totalAssets * 100).toFixed(2);
                $scope.classTotals[index].percentage = newPercentage;
            }
        }
        console.log ($scope.classTotals);

    }


    /*
    var refresh = function() {
      $scope.refresh = true;
      $timeout(function() {
          $scope.refresh = false;
      }, 0);
    };
    */
    $scope.resetEntry = function(){
        $scope.entry.class = "";
        $scope.entry.name = "";
        $scope.entry.units = "";
        $scope.entry.unitCost = "";
        $scope.entry.amount = "";
        $scope.entry.location = "";
        $scope.entry.date_purchased = "";
        $scope.entry.currency = "";
    }

    $scope.submitAssets = function() {
        var temp = $scope.entry;
        temp.class = temp.class.toTitleCase();
        temp.units = Number(temp.units);
        temp.unitCost = Number(temp.unitCost);
        temp.amount = Number(temp.units * temp.unitCost);

        //post to database
        AssetDataAPI.postData (successHandler_POST, failureHandler_POST, temp);

        $scope.assetData.push(temp);
        $scope.recalculate();
        return true;
      //this runs too soon, causing the push before to have empty data
     // $scope.resetEntry();  //clear out text field
    }

    $scope.deleteAsset = function(asset){
        AssetDataAPI.deleteData(successHandler_DELETE, failureHandler_DELETE, asset);
        $scope.assetData.splice($scope.assetData.indexOf(asset), 1); //remove item from local list of assets
        $scope.recalculate();
    }


    //api success/failure error handling
    function successHandler_POST(res, data) {
        console.log ("Posted" + data);
    }

    function failureHandler_POST(res) {
        console.log ('Failed to post data!')
    }
    function successHandler_DELETE(res, id) {
        console.log ("Deleting:" + id);
    }

    function failureHandler_DELETE(res) {
        console.log ('Failed to delete data!')
    }

    function successHandler_GET(res) {
        $scope.assetData = [];
        for (var i = 0; i < res.data.length; i++){
            $scope.assetData.push(res.data[i]);
        }
        $scope.recalculate();
    }

    function failureHandler_GET(res) {
        console.log ('Failed to retrieve data!')
    }

});
'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
 */

 /*todo
- hook up modal dialog to update data
- create hardcoded set of types and geographical locations in DB
- add code to fetch these sets and use in grid as dropdowns
 */


angular.module('wealthManagerApp')
    .controller('PortfolioEntryCtrl', function ($scope, $http, AssetDataAPI, Helpers, RowEditor) {

    var DEBUG = true;

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
            cellTemplate: 'views/portfolioentry-grid-button-template.html',
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
        appScopeProvider: $scope,
        data: 'assetData',
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerDataChangeCallback(function() {
                $scope.gridApi.treeBase.expandAllRows();
            });
        }
    };


    $scope.editRow = RowEditor.editRow; //expose edit row function by binding to controller scope

    var refresh = function() {
      $scope.refresh = true;
      $timeout(function() {
          $scope.refresh = false;
      }, 0);
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

    //#TODO: Refactor calculate functions into separate service
    $scope.calculateTotalAssets = function(){
        $scope.totalAssets = 0;
        var total = 0;

        for (var i = 0; i < $scope.assetData.length; i++){
            total = total + $scope.assetData[i].amount;
        }

        if (DEBUG){ console.log ("Number of asset entries: " + $scope.assetData.length); }
        $scope.totalAssets = total.toFixed(2);
    }

    //#TODO: Refactor calculate functions into separate service
    $scope.calculateTotalPerAssetClass = function(){
        //array of {asset class, total, percentage of all assets}
        $scope.classTotals = [];
        var classIndex = 0;
        for (var i = 0; i < $scope.assetData.length; i++){
            var index = Helpers.searchArray($scope.assetData[i].class, $scope.classTotals, 'class');

            if (index === -1){
                var percentOfTotal = ($scope.assetData[i].amount/$scope.totalAssets * 100).toFixed(2);
                $scope.classTotals.push({class: $scope.assetData[i].class.toTitleCase(), total: $scope.assetData[i].amount, percentage: percentOfTotal} );
                if (DEBUG){ console.log ("Calculating amount per asset class: " + $scope.classTotals); }
            } else {
                var newTotal = $scope.classTotals[index].total + $scope.assetData[i].amount;
                $scope.classTotals[index].total = newTotal;

                var newPercentage = (newTotal/$scope.totalAssets * 100).toFixed(2);
                $scope.classTotals[index].percentage = newPercentage;
            }
        }
        if (DEBUG){ console.log ("Total amount per asset class: " + $scope.classTotals); }

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

    $scope.deleteAsset = function(id, $event){
        if(DEBUG) {
            console.log ("Deleting: " + id);
            console.log ("Data to be deleted: " + $scope.assetData[$scope.assetData.indexOf(id)]);
        }
        AssetDataAPI.deleteData(successHandler_DELETE, failureHandler_DELETE, id);
        $scope.assetData.splice($scope.assetData.indexOf(id), 1); //remove item from local list of assets
        $scope.recalculate();
    }

    $scope.updateAssets = function (data){
        if(DEBUG) {
            console.log ("Updating: " + data._id + " with " + data);
        }
        AssetDataAPI.updateData(successHandler_PUT, failureHandler_PUT, data);
        $scope.recalculate();
    }

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

    //expose helper function by binding to controller scope
    $scope.isEmptyString = function(myString){
        return Helpers.checkIfEmptyString(myString);
    }


    //api success/failure error handling
    function successHandler_POST(res, data) {
        console.log ("API Success: Posted" + data);
    }

    function failureHandler_POST(res) {
        console.log ('API Error: Failed to post data!')
    }

    function successHandler_PUT(res, data) {
        console.log ("API Success: Updated" + data);
    }

    function failureHandler_PUT(res) {
        console.log ('API Error: Failed to update data!')
    }
    function successHandler_DELETE(res, id) {
        console.log ("API Success: Deleting:" + id);
    }

    function failureHandler_DELETE(res) {
        console.log ('API Error: Failed to delete data!')
    }

    function successHandler_GET(res) {
        $scope.assetData = [];
        for (var i = 0; i < res.data.length; i++){
            $scope.assetData.push(res.data[i]);
        }
        $scope.recalculate();
        console.log ("API Success: Data retrieved and all amounts recalculated.");
    }

    function failureHandler_GET(res) {
        console.log ('API error: Failed to retrieve data!')
    }

});
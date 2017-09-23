'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
 */

 /*todo
 - recalculate when row is edited
 - table not always updated when row edited
- how to unit test?
- CSS columns so everything align properly
 */


angular.module('wealthManagerApp')
    .controller('PortfolioEntryCtrl',
        ['$scope',
        '$http',
        'uiGridConstants',
        'Asset',
        'AssetDataAPI',
        'APIResponseHandlersCommon',
        'Helpers',
        'RowEditor',
        'AssetSchema',
        'PortfolioForms',
        function ($scope, $http, uiGridConstants, Asset, AssetDataAPI, APIResponseHandlersCommon, Helpers, RowEditor, AssetSchema, PortfolioForms) {

    var DEBUG = true;

    var vm = this;

    vm.entry = Asset.init();
    vm.totalAssets = 0;   //container for asset total amount
    vm.classTotals = [];

////////////////////////////////////////////////////////////////////////////
//ui-grid setup to display assets

    vm.assetData = [];  //container for asset table

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

    vm.gridOptions = {
        enableSorting: true,
        columnDefs: columnDefs,
        enableFiltering: false,
        showTreeExpandNoChildren: true,
        treeRowHeaderAlwaysVisible: false,
        appScopeProvider: vm,
        data: vm.assetData,
        onRegisterApi: function(gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.grid.registerDataChangeCallback(function() {
                vm.gridApi.treeBase.expandAllRows();
            });
        }
    };

    vm.editRow = RowEditor.editRow; //handle edit row functionality in grid

////////////////////////////////////////////////////////////////////////////
//Input form
    vm.assetclasses = Asset.ASSETCLASSES;
    //vm.selectedItem = 'Select asset class';

    vm.form = PortfolioForms.getAssetForm('');  //fetch default form until user selects asset type
    vm.classSelected = function(assetClass){
        //vm.selectedItem = assetClass;
        //vm.entry.class = vm.selectedItem;
        vm.entry.class = assetClass;
        vm.form = PortfolioForms.getAssetForm(assetClass);
        if (DEBUG) { console.log ('Class selected: ' + assetClass ); }
    }

    vm.schema = AssetSchema.schema;
    vm.entity = vm.entry;
    vm.model = {};

////////////////////////////////////////////////////////////////////////////
//Calculations


    //contains all the functions needed to recalculate everything
    vm.recalculate = function(){
        vm.calculateTotalAssets();
        vm.calculateTotalPerAssetClass();
    }

    //#TODO: Refactor calculate functions into separate service
    vm.calculateTotalAssets = function(){
        vm.totalAssets = 0;
        var total = 0;

        for (var i = 0; i < vm.assetData.length; i++){
            total = total + vm.assetData[i].amount;
        }

        if (DEBUG){ console.log ("Number of asset entries: " + vm.assetData.length); }
        vm.totalAssets = total.toFixed(2);
    }

    //#TODO: Refactor calculate functions into separate service
    vm.calculateTotalPerAssetClass = function(){
        //array of {asset class, total, percentage of all assets}
        vm.classTotals = [];
        var classIndex = 0;
        for (var i = 0; i < vm.assetData.length; i++){
            var index = Helpers.searchArray(vm.assetData[i].class, vm.classTotals, 'class');

            if (index === -1){
                var percentOfTotal = (vm.assetData[i].amount/vm.totalAssets * 100).toFixed(2);
                vm.classTotals.push({class: vm.assetData[i].class.toTitleCase(), total: vm.assetData[i].amount, percentage: percentOfTotal} );
                if (DEBUG){ console.log ("Calculating amount per asset class: " + vm.classTotals); }
            } else {
                var newTotal = vm.classTotals[index].total + vm.assetData[i].amount;
                vm.classTotals[index].total = newTotal;

                var newPercentage = (newTotal/vm.totalAssets * 100).toFixed(2);
                vm.classTotals[index].percentage = newPercentage;
            }
        }
        if (DEBUG){ console.log ("Total amount per asset class: " + vm.classTotals); }

    }

////////////////////////////////////////////////////////////////////////////
//Data retrieval and updating

    //load asset data for the view
    vm.getData = function() {
        AssetDataAPI.getData(vm.assetGetSuccessHandler, APIResponseHandlersCommon.failureHandler_GET);
    }

    vm.submitAssets = function(form) {
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid){
            console.log ("Form is valid");
            var temp = Asset.copyAndCalculateAmount(vm.entry);
            //post to database
            AssetDataAPI.postData (APIResponseHandlersCommon.successHandler_POST, APIResponseHandlersCommon.failureHandler_POST, temp);
            vm.assetData.push(temp);
            vm.recalculate();
        }
        return true;
    }

    vm.deleteAsset = function(id, $event){
        if(DEBUG) {
            console.log ("Deleting: " + id);
            console.log ("Array index of item to remove: " + vm.assetData.findIndex(x => x._id === id));
            console.log ("Data to be deleted: " + vm.assetData[vm.assetData.indexOf(id)]);
        }

        AssetDataAPI.deleteData(APIResponseHandlersCommon.successHandler_DELETE, APIResponseHandlersCommon.failureHandler_DELETE, id);
        vm.assetData.splice(vm.assetData.findIndex(x => x._id === id), 1); //remove item from local list of assets
        vm.gridApi.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
        vm.recalculate();
    }
/*
//No longer update through this controller
    vm.updateAssets = function (data){
        if(DEBUG) {
            console.log ("Updating: " + data._id + " with " + data);
        }
        AssetDataAPI.updateData(APIResponseHandlersCommon.successHandler_PUT, APIResponseHandlersCommon.failureHandler_PUT, data);
        vm.gridApi.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
        vm.recalculate();
    }
*/
    vm.cancel = function (){
        Asset.resetKeepClass(vm.entry);
    }
    //expose helper function by binding to controller scope
    vm.isEmptyString = function(myString){
        return Helpers.checkIfEmptyString(myString);
    }

    //custom success handler for API Get
    vm.assetGetSuccessHandler = function successHandler_GET(res) {
        vm.assetData = [];
        for (var i = 0; i < res.data.length; i++){
            vm.assetData.push(res.data[i]);
            console.log ("Asset added: " + vm.assetData[i].name);
        }
        vm.recalculate();
        vm.gridOptions.data = vm.assetData;
        console.log ("API Success: Data retrieved and all amounts recalculated.");
    }



}]);
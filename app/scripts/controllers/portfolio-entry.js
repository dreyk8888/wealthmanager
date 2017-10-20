"use strict";

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioEntryCtrl
 * @description
 * # PortfolioEntryCtrl
 * Controller of the wealthManagerApp Portfolio View
 */

 /*todo
 - default asset type in drop down
 - start a second page for projected annual return
 - graph of projected net worth trend
 - graph of historical net worth trend put on top
 */


angular.module("wealthManagerApp")
    .controller("PortfolioEntryCtrl",
        ["$scope",
        "$http",
        "uiGridConstants",
        "Asset",
        "Debt",
        "AssetDataAPI",
        "DebtDataAPI",
        "APIResponseHandlersCommon",
        "Helpers",
        "PortfolioGridColumnDefs",
        "PortfolioCalcs",
        "PortfolioChartConfig",
        "RowEditor",
        "AssetSchema",
        "DebtSchema",
        "PortfolioForms",
        function ($scope, $http, uiGridConstants, Asset, Debt, AssetDataAPI, DebtDataAPI, APIResponseHandlersCommon, Helpers,
            PortfolioGridColumnDefs, PortfolioCalcs, PortfolioChartConfig, RowEditor, AssetSchema, DebtSchema, PortfolioForms) {

    var DEBUG = true;

    var vm = this;

    vm.assetEntry = Asset.init();
    vm.totalAssets = 0;   //container for asset total amount
    vm.assetTotals = [];

    vm.debtEntry = Debt.init();
    vm.totalDebt = 0;
    vm.debtTotals = [];
///////////////////////////////////////////////////////////////////////////
//Pie Chart
    vm.typeChartData = [];
    vm.typeChartConfig = PortfolioChartConfig.portfolioAssetClassPieConfig(vm.typeChartData);
    vm.locationChartData = [];
    vm.locationChartConfig = PortfolioChartConfig.portfolioAssetLocationPieConfig(vm.locationChartData);

//////////////////////////////////////////////////////////////////////////////
//ui-grid setup to display assets
    vm.assetData = [];  //container for asset table
    vm.assetGridOptions = {
            enableSorting: true,
            columnDefs: PortfolioGridColumnDefs.assetColDef,
            enableFiltering: false,
            showTreeExpandNoChildren: true,
            treeRowHeaderAlwaysVisible: false,
            rowHeight:38,
            appScopeProvider: vm,
            data: vm.assetData,
            onRegisterApi: function(gridApi) {
                vm.assetGridApi = gridApi;
                vm.assetGridApi.grid.registerDataChangeCallback(function() {
                    vm.assetGridApi.treeBase.expandAllRows();
                });
            }
        };

////////////////////////////////////////////////////////////////////////////
//ui-grid setup to display debt

    vm.debtData = [];  //container for asset table
    vm.debtGridOptions = {
            enableSorting: true,
            columnDefs: PortfolioGridColumnDefs.debtColDef,
            enableFiltering: false,
            showTreeExpandNoChildren: true,
            treeRowHeaderAlwaysVisible: false,
            rowHeight:38,
            appScopeProvider: vm,
            data: vm.debtData,
            onRegisterApi: function(gridApi) {
                vm.debtGridApi = gridApi;
                vm.debtGridApi.grid.registerDataChangeCallback(function() {
                    vm.debtGridApi.treeBase.expandAllRows();
                });
            }
        };

//////////////////////////////////////////////////////////////////////////////
// Grid Row Edit modal
    vm.editAssetRow = RowEditor.editAssetRow; //handle edit row functionality in grid
    vm.editDebtRow = RowEditor.editDebtRow;
////////////////////////////////////////////////////////////////////////////
//Asset Input form
    vm.assetclasses = Asset.ASSETCLASSES;

    vm.form = PortfolioForms.getAssetForm("");  //fetch default form until user selects asset type
    vm.classSelected = function(assetClass){
        vm.assetEntry.class = assetClass;
        vm.form = PortfolioForms.getAssetForm(assetClass);
        if (DEBUG) { console.log ("Class selected: " + assetClass ); }
    };

    vm.schema = AssetSchema.schema;
    vm.entity = vm.assetEntry;
    vm.model = {};

////////////////////////////////////////////////////////////////////////////
//Debt Input form
    vm.debtform = PortfolioForms.getDebtForm();
    vm.debtentity = vm.debtEntry;
    vm.debtschema = DebtSchema.schema;

////////////////////////////////////////////////////////////////////////////
//Calculations
    //contains all the functions needed to recalculate everything
    vm.recalculate = function(){
        vm.totalAssets = PortfolioCalcs.totalCalc(vm.assetData, "amount");
        vm.assetTotalsPerClass = PortfolioCalcs.perTypeTotalPercentCalc(vm.assetData, "class", "amount");
        vm.assetTotalsPerLocation = PortfolioCalcs.perTypeTotalPercentCalc(vm.assetData, "location", "amount");
        vm.totalDebt = PortfolioCalcs.totalCalc(vm.debtData, "amount");
        vm.debtTotalsPerType = PortfolioCalcs.perTypeTotalPercentCalc(vm.debtData, "term", "amount");
        vm.updateChartData();
    };

     vm.updateChartData = function(){
         vm.typeChartData = [];
         vm.locationChartData = [];
         for (var i = 0; i < vm.assetTotalsPerClass.length; i++){
            vm.typeChartData.push([vm.assetTotalsPerClass[i].type, vm.assetTotalsPerClass[i].total]);
         }

         for (i=0; i < vm.assetTotalsPerLocation.length; i++){
            vm.locationChartData.push([vm.assetTotalsPerLocation[i].type, vm.assetTotalsPerLocation[i].total]);
         }
         vm.typeChartConfig.series[0].data = vm.typeChartData;  //refresh data in chart config
         vm.locationChartConfig.series[0].data = vm.locationChartData;
    };

////////////////////////////////////////////////////////////////////////////
//Data retrieval and updating

    //load asset data for the view
    vm.getData = function() {
        AssetDataAPI.getData(vm.assetGetSuccessHandler, APIResponseHandlersCommon.failureHandler_GET);
        DebtDataAPI.getData(vm.debtGetSuccessHandler, APIResponseHandlersCommon.failureHandler_GET);
    };

    vm.submitAssets = function(form) {
        $scope.$broadcast("schemaFormValidate");
        if (form.$valid){
            console.log ("Form is valid");
            var temp = Asset.copyAndCalculateAmount(vm.assetEntry);
            //post to database
            AssetDataAPI.postData (APIResponseHandlersCommon.successHandler_POST, APIResponseHandlersCommon.failureHandler_POST, temp);
            vm.assetData.push(temp);
            vm.recalculate();
        }
        return true;
    };

    vm.submitDebt = function(form){
        $scope.$broadcast("schemaFormValidate");
        if (form.$valid){
            if(DEBUG) {
                console.log ("Form is valid");
                console.log (vm.debtEntry);
            }

            //post to database
            DebtDataAPI.postData (APIResponseHandlersCommon.successHandler_POST, APIResponseHandlersCommon.failureHandler_POST, vm.debtEntry);
            vm.debtData.push(vm.debtEntry);
            vm.recalculate();
        }
        return true;
    };

    vm.deleteAsset = function(id){
        if(DEBUG) {
            console.log ("Deleting: " + id);
            console.log ("Array index of item to remove: " + vm.assetData.findIndex(obj => obj._id === id));
            console.log ("Data to be deleted: " + vm.assetData[vm.assetData.indexOf(id)]);
        }

        AssetDataAPI.deleteData(APIResponseHandlersCommon.successHandler_DELETE, APIResponseHandlersCommon.failureHandler_DELETE, id);
        vm.assetData.splice(vm.assetData.findIndex(obj => obj._id === id), 1); //remove item from local list of assets
        vm.assetGridApi.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
        vm.recalculate();
    };

    vm.deleteDebt = function(id){
        DebtDataAPI.deleteData(APIResponseHandlersCommon.successHandler_DELETE, APIResponseHandlersCommon.failureHandler_DELETE, id);
        vm.debtData.splice(vm.debtData.findIndex(x=> x._id === id), 1);
    };

    vm.cancelAssetEntry = function (){
        Asset.resetKeepClass(vm.assetEntry);
    };

    //expose helper function by binding to controller scope
    vm.isEmptyString = function(myString){
        return Helpers.checkIfEmptyString(myString);
    };

    //custom success handler for API Get Asset
    vm.assetGetSuccessHandler = function successHandler_GET(res) {
        vm.assetData = [];
        for (var i = 0; i < res.data.length; i++){
            vm.assetData.push(res.data[i]);
            console.log ("Asset added: " + vm.assetData[i].name);
        }
        vm.recalculate();
        vm.assetGridOptions.data = vm.assetData;
        console.log ("API Success: Data retrieved and all amounts recalculated.");
    };

      //custom success handler for API Get Debt
    vm.debtGetSuccessHandler = function successHandler_GET(res) {
        vm.debtData = [];
        for (var i = 0; i < res.data.length; i++){
            vm.debtData.push(res.data[i]);
            console.log ("Debt added: " + vm.debtData[i].name);
        }
        vm.recalculate();
        vm.debtGridOptions.data = vm.debtData;
        console.log ("API Success: Data retrieved and all amounts recalculated.");
    };

}]);
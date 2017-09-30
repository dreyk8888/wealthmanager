'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
 */

 /*todo
 - filter out the N/A values in the grid
 - add tests for calculations
 - get debt row edit/delete working
 */


angular.module('wealthManagerApp')
    .controller('PortfolioEntryCtrl',
        ['$scope',
        '$http',
        'uiGridConstants',
        'Asset',
        'Debt',
        'AssetDataAPI',
        'DebtDataAPI',
        'APIResponseHandlersCommon',
        'Helpers',
        'PortfolioGridColumnDef',
        'PortfolioCalcs',
        'PortfolioChartConfig',
        'RowEditor',
        'AssetSchema',
        'DebtSchema',
        'PortfolioForms',
        function ($scope, $http, uiGridConstants, Asset, Debt, AssetDataAPI, DebtDataAPI, APIResponseHandlersCommon, Helpers,
            PortfolioGridColumnDef, PortfolioCalcs, PortfolioChartConfig, RowEditor, AssetSchema, DebtSchema, PortfolioForms) {

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
    vm.typeChartConfig = PortfolioChartConfig.portfolioPieConfig(vm.typeChartData);

////////////////////////////////////////////////////////////////////////////
//ui-grid setup to display assets

    vm.assetData = [];  //container for asset table
    vm.assetGridOptions = {
            enableSorting: true,
            columnDefs: PortfolioGridColumnDef.assetColDef,
            enableFiltering: false,
            showTreeExpandNoChildren: true,
            treeRowHeaderAlwaysVisible: false,
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
            columnDefs: PortfolioGridColumnDef.debtColDef,
            enableFiltering: false,
            showTreeExpandNoChildren: true,
            treeRowHeaderAlwaysVisible: false,
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

    vm.form = PortfolioForms.getAssetForm('');  //fetch default form until user selects asset type
    vm.classSelected = function(assetClass){
        vm.assetEntry.class = assetClass;
        vm.form = PortfolioForms.getAssetForm(assetClass);
        if (DEBUG) { console.log ('Class selected: ' + assetClass ); }
    }

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
        vm.totalAssets = PortfolioCalcs.totalCalc(vm.assetData);
        vm.assetTotals = PortfolioCalcs.perTypeTotalPercentCalc(vm.assetData);
        vm.totalDebt = PortfolioCalcs.totalCalc(vm.debtData);
        vm.debtTotals = PortfolioCalcs.perTypeTotalCalc(vm.debtData);
        vm.updateTypeChartData();
    }

     vm.updateTypeChartData = function(){
         vm.typeChartData = [];
         for (var i = 0; i < vm.assetTotals.length; i++){
            vm.typeChartData.push([vm.assetTotals[i].class, vm.assetTotals[i].total]);
         }
         vm.typeChartConfig.series[0].data = vm.typeChartData;  //refresh data in chart config
    }
////////////////////////////////////////////////////////////////////////////
//Data retrieval and updating

    //load asset data for the view
    vm.getData = function() {
        AssetDataAPI.getData(vm.assetGetSuccessHandler, APIResponseHandlersCommon.failureHandler_GET);
        DebtDataAPI.getData(vm.debtGetSuccessHandler, APIResponseHandlersCommon.failureHandler_GET);
    }

    vm.submitAssets = function(form) {
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid){
            console.log ("Form is valid");
            var temp = Asset.copyAndCalculateAmount(vm.assetEntry);
            //post to database
            AssetDataAPI.postData (APIResponseHandlersCommon.successHandler_POST, APIResponseHandlersCommon.failureHandler_POST, temp);
            vm.assetData.push(temp);
            vm.recalculate();
        }
        return true;
    }

    vm.submitDebt = function(form){
        $scope.$broadcast('schemaFormValidate');
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
    }

    vm.deleteAsset = function(id, $event){
        if(DEBUG) {
            console.log ("Deleting: " + id);
            console.log ("Array index of item to remove: " + vm.assetData.findIndex(x => x._id === id));
            console.log ("Data to be deleted: " + vm.assetData[vm.assetData.indexOf(id)]);
        }

        AssetDataAPI.deleteData(APIResponseHandlersCommon.successHandler_DELETE, APIResponseHandlersCommon.failureHandler_DELETE, id);
        vm.assetData.splice(vm.assetData.findIndex(x => x._id === id), 1); //remove item from local list of assets
        vm.assetGridApi.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
        vm.recalculate();
    }

    vm.deleteDebt = function(id, event){
        DebtDataAPI.deleteData(APIResponseHandlersCommon.successHandler_DELETE, APIResponseHandlersCommon.failureHandler_DELETE, id);
        vm.debtData.splice(vm.debtData.findIndex(x=> x._id === id), 1);
    }

    vm.cancelAssetEntry = function (){
        Asset.resetKeepClass(vm.assetEntry);
    }
    //expose helper function by binding to controller scope
    vm.isEmptyString = function(myString){
        return Helpers.checkIfEmptyString(myString);
    }

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
    }

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
    }

}]);
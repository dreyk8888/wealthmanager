"use strict";

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioEntryCtrl
 * @description
 * # PortfolioEntryCtrl
 * Controller of the wealthManagerApp Portfolio View
 */

/*todo
 - incorrect validation on date on asset form. Tried type number and string, did not go away. Tried "date" but that made form misaligned
 - add currency to the grid for asset and debt
 - total assets and debts need to account for currency settings and convert to the "local" currrency
 - move graphs to a trends or dashboard page
 */


angular.module("wealthManagerApp")
    .controller("PortfolioEntryCtrl",
        ["$scope",
        "$http",
        "uiGridConstants",
        "GlobalConstants",
        "Asset",
        "Debt",
        "AssetDataAPI",
        "DebtDataAPI",
        "NetWorthDataAPI",
        "Helpers",
        "PortfolioGridColumnDefs",
        "PortfolioCalcs",
        "PortfolioChartConfig",
        "RowEditor",
        "AssetSchema",
        "DebtSchema",
        "PortfolioForms",
        function ($scope, $http, uiGridConstants, GlobalConstants, Asset, Debt, AssetDataAPI, DebtDataAPI, NetWorthDataAPI, Helpers,
            PortfolioGridColumnDefs, PortfolioCalcs, PortfolioChartConfig, RowEditor, AssetSchema, DebtSchema, PortfolioForms) {

    var DEBUG = false;

    var vm = this;

    vm.assetEntry = Asset.init();
    vm.totalAssets = 0;   //container for asset total amount
    vm.assetTotals = [];
    vm.assetInputForm = {}; //container for passing form into submit function

    vm.debtEntry = Debt.init();
    vm.totalDebt = 0;
    vm.debtTotals = [];
    vm.debtInputForm = {}; //container for passing form into submit function

    vm.localCurrency = GlobalConstants.USD; //use USD as the default local currency for now
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
// Add entry collapsible initialize
    vm.isAssetEntryCollapsed = false;
    vm.isDebtEntryCollapsed = false;
////////////////////////////////////////////////////////////////////////////
//Asset Input form
    vm.assetclasses = Asset.ASSETCLASSES;
    vm.classDisplay = "Asset Class";
    vm.assetform = PortfolioForms.getAssetForm("");  //fetch default form until user selects asset type
    vm.classSelected = function(assetClass){
        vm.assetEntry.class = assetClass;
        vm.assetform = PortfolioForms.getAssetForm(assetClass);
        vm.classDisplay = assetClass;
        if (DEBUG) { console.log ("Class selected: " + assetClass ); }
    };

    vm.assetschema = AssetSchema.schema;
    vm.entity = vm.assetEntry;
    vm.model = {};


////////////////////////////////////////////////////////////////////////////
//Debt Input form
    vm.debtform = PortfolioForms.getDebtForm();
    vm.debtentity = vm.debtEntry;
    vm.debtschema = DebtSchema.schema;

////////////////////////////////////////////////////////////////////////////
//Refresh calls
    //contains all the functions needed to recalculate everything
    vm.recalculate = function(){
        vm.totalAssets = PortfolioCalcs.totalCalc(vm.assetData, "marketValue");
        vm.assetTotalsPerClass = PortfolioCalcs.perTypeTotalPercentCalc(vm.assetData, "class", "marketValue");
        vm.assetTotalsPerLocation = PortfolioCalcs.perTypeTotalPercentCalc(vm.assetData, "location", "marketValue");
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

    vm.updateNetWorth = function(assetTotal, debtTotal, myCurrency){
        var currentDate = moment().format();
        var currentYear = moment(currentDate).year();
        var net = assetTotal - debtTotal;
        var netWorth = {
            net_worth: net,
            date: currentDate, //today's date,
            currency: myCurrency
        };

        //check if there is already an entry with the current date. If yes, overwrite it, otherwise create a new entry
        NetWorthDataAPI.getData()
          .then(data => {
              var oid = 0;
              for (var i = 0; i < data.data.length; i++){
                  if (DEBUG){console.log ("Data returned from API: " + data.data[i].net_worth + " " + data.data[i].date);}

                  if (moment(data.data[i].date).year() === currentYear){
                      oid = data.data[i]._id;
                      break;
                  }
              }
              //failed to find an entry of the same year in database, add a new one
              if (oid === 0){
                  NetWorthDataAPI.postData(netWorth)
                  .then(data => {
                    if (DEBUG) {console.log ("Object posted, response: ID=" + data.data._id + " net_worth=" + data.data.net_worth + " currency=" + data.data.amount + " date=" +
                    data.data.date);}
                  });
              } else {
                  //NetWorthDataAPI.updateData(APIResponseHandlersCommon.successHandler_PUT, APIResponseHandlersCommon.failureHandler_PUT, netWorth, oid);
                  NetWorthDataAPI.updateData(netWorth, oid)
                  .then (data => {
                    if (DEBUG) {console.log ("Object updated, response: ID=" + data.data._id + " net_worth=" + data.data.net_worth + " currency=" + data.data.amount + " date=" +
                    data.data.date);}
                  });
              }
          });
    };

////////////////////////////////////////////////////////////////////////////
//Data retrieval and updating

    //load asset data for the view
    vm.getData = function() {

        AssetDataAPI.getData()
          .then(data => {
              vm.assetData = [];
              for (var i = 0; i < data.data.length; i++){
                  vm.assetData.push(data.data[i]);
                  if (DEBUG) {console.log ("Asset added from API data: " + vm.assetData[i].name);}
              }
              vm.recalculate();
              vm.assetGridOptions.data = vm.assetData;
        });

        DebtDataAPI.getData()
          .then(data => {
              vm.debtData = [];
              for (var i = 0; i < data.data.length; i++){
                  vm.debtData.push(data.data[i]);
                  if (DEBUG) {console.log ("Debt added from API data: " + vm.debtData[i].name);}
              }
              vm.recalculate();
              vm.debtGridOptions.data = vm.debtData;
        });
    };

    vm.submitAssets = function(form) {
        $scope.$broadcast("schemaFormValidate");
        if (form.$valid){
            if (DEBUG){
              console.log ("Form is valid");
              console.log ("Asset entered: " + vm.assetEntry);
              console.log ("Date purchased: " + vm.assetEntry.date_purchased);
            }
console.log ("Date purchased: " + vm.assetEntry.date_purchased);

            vm.assetEntry.date_purchased = moment(vm.assetEntry.date_purchased);  //this corrects the date generated by date picker, otherwise it is a day behind
            var temp = Asset.copyAndCalculateAmount(vm.assetEntry);
            //post to database
            var postResponse = {};  //need the response to get the ID to write back to table
            AssetDataAPI.postData(temp)
              .then(data => {
                postResponse = data.data;
                if (DEBUG) {console.log ("Object posted to API: ID=" + postResponse._id + " name=" + postResponse.name + " units=" + postResponse.units + " unitCost=" +
                  postResponse.unitCost + " location=" + postResponse.location + " currency=" + postResponse.currency);}

                vm.assetData.push(postResponse);  //update the table with what was actually posted, since ID and defaults are in the response only
                vm.recalculate();
                vm.updateNetWorth(vm.totalAssets, vm.totalDebt, vm.localCurrency);    //save latest net worth value to networthhistory database table
              });
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
            var postResponse = {};
            DebtDataAPI.postData(vm.debtEntry)
             .then(data => {
                postResponse = data.data;
                if (DEBUG) {console.log ("Object posted to API: ID=" + postResponse._id + " name=" + postResponse.name + " units=" + postResponse.units + " unitCost=" +
                  postResponse.unitCost + " location=" + postResponse.location + " currency=" + postResponse.currency);}

                vm.debtData.push(postResponse);  //update the table with what was actually posted, since ID and defaults are in the response only
                vm.recalculate();
                vm.updateNetWorth(vm.totalAssets, vm.totalDebt, vm.localCurrency);    //save latest net worth value to networthhistory database table
              });
        }
        return true;
    };

    vm.deleteAsset = function(id){
        if(DEBUG) {
            console.log ("Deleting: " + id);
            console.log ("Array index of item to remove: " + vm.assetData.findIndex(obj => obj._id === id));
            console.log ("Data to be deleted: " + vm.assetData[vm.assetData.indexOf(id)]);
        }

        AssetDataAPI.deleteData(id)
            .then(data => {
                vm.assetData.splice(vm.assetData.findIndex(obj => obj._id === id), 1); //remove item from local list of assets
                vm.assetGridApi.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
                vm.recalculate();
                vm.updateNetWorth(vm.totalAssets, vm.totalDebt, vm.localCurrency);    //save latest net worth value to networthhistory database table
              });

    };

    vm.deleteDebt = function(id){
        DebtDataAPI.deleteData(id)
             .then(data => {
                vm.debtData.splice(vm.debtData.findIndex(x=> x._id === id), 1);
                vm.debtGridApi.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
                vm.recalculate();
                vm.updateNetWorth(vm.totalAssets, vm.totalDebt, vm.localCurrency);    //save latest net worth value to networthhistory database table
              });

    };

    vm.cancelAssetEntry = function (){
        Asset.resetKeepClass(vm.assetEntry);
    };

    //expose helper function by binding to controller scope
    vm.isEmptyString = function(myString){
        return Helpers.checkIfEmptyString(myString);
    };


}]);
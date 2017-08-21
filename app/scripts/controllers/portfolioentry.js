'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
 */

 /*todo
- refactor from this.assets to
- group by asset type
- make an update API
- hook up inline edit to get the right _id to pass to update function in API
- add delete buttons to table
- calculate the percentage of each assetType amount vs total assets
- display total amount per assetType
 */


angular.module('wealthManagerApp')
    .controller('PortfolioEntryCtrl', function ($scope, $http, AssetDataAPI) {

        $scope.entry = {
            assetType: "",
            assetName: "",
            units: "",
            unitCost: "",
            amount: "",
            category: "",
            date_purchased: "",
            currency: ""
        };

        $scope.totalAssets = 0;   //container for asset total amount

        //ui-grid setup
        $scope.assetData = [];  //container for asset table

        var columnDefs = [
            { name: 'ID', field: '_id', width: '0%', visible: false },
            { name: 'Name/Ticker', field: 'assetName', width: '30%' },
            { name: 'Units Held', field: 'units', type: 'number', width: '10%' },
            { name: 'Unit Cost', field: 'unitCost', type: 'number', width: '10%'},
            { name: 'Amount', field: 'amount', type: 'number', width: '20%', enableCellEdit: false},
            { name: 'Date Purchased (MM-DD-YYYY)', field: 'date_purchased', type: 'date', width: '30%', cellFilter: 'date:"MM-dd-yyyy"'}
        ];

        $scope.gridOptions = {};
        $scope.gridOptions.enableSorting = true;
        $scope.gridOptions.columnDefs = columnDefs;
        $scope.gridOptions.data = 'assetData'
        $scope.gridOptions.onRegisterApi = function(gridApi) {
            $scope.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
        };

        $scope.calculateTotalAssets = function(){
            $scope.totalAssets = 0;
            var total = 0;

            for (var i = 0; i < $scope.assetData.length; i++){
                total = total + $scope.assetData[i].amount;
            }

            console.log ($scope.assetData.length);
            $scope.totalAssets = total.toFixed(2);
        }

        //load asset data for the view
        $scope.getData = function() {
            AssetDataAPI.getData(successHandler_GET, failureHandler_GET);
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
            $scope.entry.assetType = "";
            $scope.entry.assetName = "";
            $scope.entry.units = "";
            $scope.entry.unitCost = "";
            $scope.entry.amount = "";
            $scope.entry.category = "";
            $scope.entry.date_purchased = "";
            $scope.entry.currency = "";
        }

        $scope.submitAssets = function() {
            var temp = $scope.entry;
            temp.units = Number(temp.units);
            temp.unitCost = Number(temp.unitCost);
            temp.amount = Number(temp.units * temp.unitCost);

            //post to database
            AssetDataAPI.postData (successHandler_POST, failureHandler_POST, temp);

            $scope.assetData.push(temp);
            console.log (temp.assetName);
            $scope.calculateTotalAssets();
            return true;
            //this runs too soon, causing the push before to have empty data
           // $scope.resetEntry();  //clear out text field
        }

        $scope.deleteAsset = function(asset){
            AssetDataAPI.deleteData(successHandler_DELETE, failureHandler_DELETE, asset);
            $scope.assetData.splice($scope.assetData.indexOf(asset), 1); //remove item from local list of assets
            $scope.calculateTotalAssets();

            console.log($scope.assetData);
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
            console.log("Get data: " + $scope.gridOptions.data);
            $scope.calculateTotalAssets();
        }

        function failureHandler_GET(res) {
            console.log ('Failed to retrieve data!')
        }


  });
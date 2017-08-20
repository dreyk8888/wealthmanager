'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
 */

 /*todo 8/13/2017
 - separate table by assetType
foreach (assetType){
    foreach (asset in assetType){
        create a row of data
    }
}
- figure out how to do inline edit/save/cancel
- calculate the percentage of each assetType amount vs total assets
- display total amount per assetType
 */


angular.module('wealthManagerApp')
    .controller('PortfolioEntryCtrl', function ($scope, $http, AssetDataAPI) {
        this.entry = {
            assetType: "",
            assetName: "",
            units: "",
            unitCost: "",
            amount: "",
            category: "",
            date_purchased: "",
            currency: ""
        };


        var self = this;        //save this to a different var so that we can access the data from http callback response
        self.assets = [];       //local copy of asset data loaded from DB

        this.totalAssets = 0;

        $scope.columns = [
            { name: 'Name/Ticker', field: 'assetName' },
            { name: 'Units Held', field: 'units' },
            { name: 'Unit Cost', field: 'unitCost'},
            { name: 'Amount', field: 'amount'},
            { name: 'Date Purchased', field: 'date_purchased'}
        ];

        $scope.gridOptions = {};
        $scope.gridOptions.enableSorting = true;
        $scope.gridOptions.columnDefs = $scope.columns;
        $scope.gridOptions.data = 'myData'
        $scope.gridOptions.onRegisterApi = function(gridApi) {
                $scope.gridApi = gridApi;
        };

        this.calculateTotalAssets = function(){
            this.totalAssets = 0;
            var total = 0;
            for (var i = 0; i < this.assets.length; i++){
                total = total + this.assets[i].amount;
            }
            this.totalAssets = total.toFixed(2);
        }

        //load asset data for the view
        this.getData = function() {
            AssetDataAPI.getData(successHandler_GET, failureHandler_GET);
            this.calculateTotalAssets();
        }

        this.resetEntry = function(){
            this.entry.assetType = "";
            this.entry.assetName = "";
            this.entry.units = "";
            this.entry.unitCost = "";
            this.entry.amount = "";
            this.entry.category = "";
            this.entry.date_purchased = "";
            this.entry.currency = "";
        }

        this.submitAssets = function() {
            var temp = this.entry;
            temp.units = Number(temp.units);
            temp.unitCost = Number(temp.unitCost);
            temp.amount = Number(temp.units * temp.unitCost);

            //post to database
            AssetDataAPI.postData (successHandler_POST, failureHandler_POST, temp);

            this.assets.push(temp);
            console.log (temp.assetName);
            this.calculateTotalAssets();
            return true;
            //this runs too soon, causing the push before to have empty data
           // this.resetEntry();  //clear out text field
        }

        //trigger inline edit of an asset
        this.editAsset = function(asset){
            this.editing = this.assets.indexOf(asset);
            this.newField = angular.copy(asset);
        }

        //cancel inline edit and restore previous value
        this.cancelEdit = function(index){

        }
        this.deleteAsset = function(asset){
            AssetDataAPI.deleteData(successHandler_DELETE, failureHandler_DELETE, asset);
            this.assets.splice(this.assets.indexOf(asset), 1); //remove item from local list of assets
            this.calculateTotalAssets();
            console.log ('Assets list:' + this.assets);

            console.log($scope.myData);
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
            $scope.myData = [];
            for (var i = 0; i < res.data.length; i++){
                self.assets[i] = res.data[i];
                $scope.myData.push(res.data[i]);
            }
        }

        function failureHandler_GET(res) {
            console.log ('Failed to retrieve data!')
        }


  });
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

        //load asset data for the view
        this.getData = function() {
            AssetDataAPI.getData(successHandler_GET, failureHandler_GET);
            console.log ("Data reloaded");
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


            //update page
            this.assets.push(temp);

            //clear out text field
            //this.resetEntry();
        };

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
            console.log ('Assets list:' + this.assets);
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
            for (var i = 0; i < res.data.length; i++){
                self.assets[i] = res.data[i];
            }
        }

        function failureHandler_GET(res) {
            console.log ('Failed to retrieve data!')
        }


  });
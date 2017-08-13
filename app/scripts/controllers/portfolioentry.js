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
    .controller('PortfolioEntryCtrl', function ($http, GetAssetData) {
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

        var self = this;
        self.assets = [];

        this.submitAssets = function() {
            console.log(this.entry);
            this.entry.amount = this.entry.units * this.unitCost;
            $http.post('http://localhost:4000/assetentry', JSON.stringify(this.entry));
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
            //code to delete an asset from the database
             $http.delete('http://localhost:4000/assetentry', JSON.stringify(this.entry));
        }
        function successHandler(res) {
            for (var i = 0; i < res.data.length; i++){
                self.assets[i] = res.data[i];
                console.log (self.assets[i].assetName);
            }
        }

        function failureHandler(res) {
            console.log ('Failed to retrive data!')
        }

        this.getData = function() {
            GetAssetData.getData(successHandler, failureHandler);
        }

  });
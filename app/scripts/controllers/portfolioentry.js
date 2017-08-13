'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
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
            yearPurchased: ""
        };

        var self = this;
        self.data = "";

        this.submitAssets = function() {
            console.log(this.entry);
            this.entry.amount = this.entry.units * this.unitCost;
            $http.post('http://localhost:4000/assetentry', JSON.stringify(this.entry));
        };

        function successHandler(res) {
            for (var i = 0; i < res.data.length; i++){
                self.data = res.data[i].amount;
            }
        }

        function failureHandler(res) {
            console.log ('Failed to retrive data!')
        }

        this.getData = function() {
            GetAssetData.getData(successHandler, failureHandler);
        }

  });
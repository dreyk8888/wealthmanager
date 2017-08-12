'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
 */
angular.module('wealthManagerApp')
    .controller('PortfolioEntryCtrl', function (GetAssetData) {
        this.entry = {
            assetType: "",
            assetName: "",
            amount: "",
            category: "",
            datePurchased: ""
        };

        var self = this;
        self.data = "";

        this.submit = function() {
            console.log(this.entry);
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
'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:PortfolioentryCtrl
 * @description
 * # PortfolioentryCtrl
 * Controller of the wealthManagerApp
 */
angular.module('wealthManagerApp')
    .controller('PortfolioEntryCtrl', function ($http) {
        this.entry = {
            assetType: "",
            assetName: "",
            amount: "",
            category: "",
            datePurchased: ""
        };

        this.details = this.entry[2];

        this.submit = function() {
            console.log(this.entry);
            $http.post('http://localhost:4000/assetentry', JSON.stringify(this.entry));
        };

        this.fetchAssets = function (){
            $http.get("http://localhost:4000/assetentry")
       //   .then(function(response){ this.details = response.data; });
            .then(function(response){
                console.log(response.data)
                console.log(this.details)
                this.details = response.data
            });

    //  $http.get("http://localhost:4000/assetentry" + this.search + "&tomatoes=true&plot=full")
    //  .then(function(response){ this.details = response.data; });

    };

  });
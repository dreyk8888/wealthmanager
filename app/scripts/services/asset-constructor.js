'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Asset object declaration and initialization functions.
 * Also includes functionality to set up Asset objects for posting to API
 */
angular.module('wealthManagerApp')
    .service('Asset', function() {
        //return a clean Asset object
        this.init = function(){
            var asset = {
                class: "",
                name: "",
                units: "",
                unitCost: "",
                amount: "",
                location: "",
                date_purchased: "",
                currency: ""
            }
            return asset;
        }

        this.reset = function (asset){
            asset.class = "";
            asset.name = "";
            asset.units = "";
            asset.unitCost = "";
            asset.amount = "";
            asset.location = "";
            asset.date_purchased = "";
            asset.currency = "";

            return asset;
        }
        //return the Asset object parameter populated with parameterized values and calculated amount
        //keep track of _id for API posting purposes
        this.populate = function (asset, _id, assetClass, name, units, unitCost, amount, location, date_purchased, currency){
            asset._id = _id;
            asset.class = assetClass.toTitleCase();
            asset.name = name;
            asset.units = Number(units);
            asset.unitCost = Number(unitCost);
            asset.amount = asset.units*asset.unitCost;
            asset.location = location;
            asset.date_purchased = date_purchased;
            asset.currency = currency;

            return asset;
        }

        //return a copy of an existing Asset object with amount calculated
        this.copyAndCalculateAmount = function (obj){
            var asset = this.init();
            asset._id = obj._id;
            asset.class = obj.class.toTitleCase();
            asset.name = obj.name;
            asset.units = Number(obj.units);
            asset.unitCost = Number(obj.unitCost);
            asset.amount = asset.units*asset.unitCost;
            asset.location = obj.location;
            asset.date_purchased = obj.date_purchased;
            asset.currency = obj.currency;

            return asset;
        }

});

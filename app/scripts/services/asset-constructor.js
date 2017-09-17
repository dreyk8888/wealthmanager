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
    .service('Asset', ['GlobalConstants', function(GlobalConstants) {
        //set of asset classes
        this.ASSETCLASSES = [GlobalConstants.CASH, GlobalConstants.EQUITIES, GlobalConstants.FIXEDINCOME, GlobalConstants.FIXEDASSETS,GlobalConstants.FOREIGNCURR]
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

        this.resetKeepClass = function (asset){
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

            if (asset.class === GlobalConstants.CASH){
                asset.class = assetClass;
                asset.name = name;
                asset.units = GlobalConstants.UNDEFNUM;
                asset.unitCost = GlobalConstants.UNDEFNUM;
                asset.amount = amount;
                asset.location = GlobalConstants.UNDEFSTR;
                asset.date_purchased = GlobalConstants.UNDEFDATE;
                asset.currency = currency;
            } else if (asset.class === GlobalConstants.FIXEDASSETS || asset.class === GlobalConstants.FOREIGNCURR){
                asset.class = assetClass;
                asset.name = name;
                asset.units = GlobalConstants.UNDEFNUM;
                asset.unitCost = GlobalConstants.UNDEFNUM;
                asset.amount = amount;
                asset.location = location;
                asset.date_purchased = date_purchased;
                asset.currency = currency;
            } else {
                asset.class = assetClass;
                asset.name = name;
                asset.units = Number(units);
                asset.unitCost = Number(unitCost);
                asset.amount = asset.units*asset.unitCost;
                asset.location = location;
                asset.date_purchased = date_purchased;
                asset.currency = currency;
            }
            return asset;
        }

        //return a copy of an existing Asset object with amount calculated
        //for fields that don't apply, set to EMPTY --> '---'
        this.copyAndCalculateAmount = function (obj){
            var asset = this.init();
            asset._id = obj._id;
            asset.class = obj.class;
            if (asset.class === GlobalConstants.CASH){
                asset.name = obj.name;
                asset.units = GlobalConstants.UNDEFNUM;
                asset.unitCost = GlobalConstants.UNDEFNUM;
                asset.amount = obj.amount;
                asset.location = GlobalConstants.UNDEFSTR;
                asset.date_purchased = GlobalConstants.UNDEFDATE;
                asset.currency = obj.currency;
            } else if (asset.class === GlobalConstants.FIXEDASSETS || asset.class === GlobalConstants.FOREIGNCURR){
                asset.name = obj.name;
                asset.units = GlobalConstants.UNDEFNUM;
                asset.unitCost = GlobalConstants.UNDEFNUM;
                asset.amount = obj.amount;
                asset.location = obj.location;
                asset.date_purchased = obj.date_purchased;
                asset.currency = obj.currency;
            } else {
                asset.name = obj.name;
                asset.units = Number(obj.units);
                asset.unitCost = Number(obj.unitCost);
                asset.amount = asset.units*asset.unitCost;
                asset.location = obj.location;
                asset.date_purchased = obj.date_purchased;
                asset.currency = obj.currency;
            }
            return asset;
        }

}]);

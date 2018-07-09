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
        //set of supported asset classes
        //removed foreign currency because it is the same as cash
        this.ASSETCLASSES = [GlobalConstants.CASH, GlobalConstants.EQUITIES, GlobalConstants.FIXEDINCOME, GlobalConstants.FIXEDASSETS];

        //supported asset allocations
        this.ASSETLOCATIONS = [
            GlobalConstants.DOMESTIC,
            GlobalConstants.CAN,
            GlobalConstants.US,
            GlobalConstants.INTL,
            GlobalConstants.EMRG,
            GlobalConstants.EUR,
            GlobalConstants.JPN,
            GlobalConstants.CHN,
            GlobalConstants.ASIA,
            GlobalConstants.SAMER,
            GlobalConstants.FRONTIER
        ];

        //return a clean Asset object
        this.init = function(sessionUserId){
            var asset = {
                userId: sessionUserId,
                class: "",
                name: "",
                units: "",
                unitCost: "",
                marketPrice: "",
                totalCost: "",
                marketValue: "",
                location: "",
                date_purchased: "",
                currency: ""
            };
            return asset;
        };
        //don't reset userId, as this should be constant until user logs out
        this.reset = function (asset){
            asset.class = "";
            asset.name = "";
            asset.units = "";
            asset.unitCost = "";
            asset.marketPrice = "";
            asset.totalCost = "";
            asset.marketValue = "";
            asset.location = "";
            asset.date_purchased = "";
            asset.currency = "";

            return asset;
        };
        //don't reset userId, as this should be constant until user logs out
        this.resetKeepClass = function (asset){
            asset.name = "";
            asset.units = "";
            asset.unitCost = "";
            asset.marketPrice = "";
            asset.totalCost = "";
            asset.marketValue = "";
            asset.location = "";
            asset.date_purchased = "";
            asset.currency = "";

            return asset;
        };

        //this will be used if we ever allow changing of asset classes in row edit
        //return the Asset object parameter populated with parameterized values and calculated amount
        //keep track of _id for API posting purposes
        this.populate = function (asset, _id, userId, assetClass, name, units, unitCost, totalCost, location, date_purchased, currency, marketPrice, marketValue){
            asset._id = _id;
            asset.userId = userId;
            asset.class = assetClass;
            asset.name = name;
            asset.currency = currency;
            if (assetClass === GlobalConstants.CASH){
                asset.units = GlobalConstants.UNDEFNUM;
                asset.unitCost = GlobalConstants.UNDEFNUM;
                asset.totalCost = GlobalConstants.UNDEFNUM;
                asset.marketPrice = GlobalConstants.UNDEFNUM;
                asset.marketValue = marketValue;
                asset.location = GlobalConstants.DOMESTIC;
                asset.date_purchased = GlobalConstants.UNDEFDATE;
            } else if (assetClass === GlobalConstants.FIXEDASSETS || assetClass === GlobalConstants.FOREIGNCURR){
                asset.units = GlobalConstants.UNDEFNUM;
                asset.unitCost = GlobalConstants.UNDEFNUM;
                asset.totalCost = totalCost;
                asset.marketPrice = GlobalConstants.UNDEFNUM;
                asset.marketValue = marketValue;
                asset.location = location;
                asset.date_purchased = date_purchased;
                asset.currency = currency;
            } else {
                asset.units = Number(units);
                asset.unitCost = Number(unitCost);
                asset.totalCost = asset.units*asset.unitCost;
                asset.marketPrice = Number(marketPrice);
                asset.marketValue = asset.units*asset.marketPrice;
                asset.location = location;
                asset.date_purchased = date_purchased;
            }
            return asset;
        };

        //return a copy of an existing Asset object with amount calculated
        //for fields that don't apply, set to EMPTY --> '---'
        this.copyAndCalculateAmount = function (obj){
            var asset = this.init();
            asset._id = obj._id;
            asset.userId = obj.userId;
            asset.class = obj.class;
            asset.name = obj.name;
            asset.currency = obj.currency;

            if (asset.class === GlobalConstants.CASH){

                asset.units = GlobalConstants.UNDEFNUM;
                asset.unitCost = GlobalConstants.UNDEFNUM;
                asset.totalCost = GlobalConstants.UNDEFNUM;
                asset.marketPrice = GlobalConstants.UNDEFNUM;
                asset.marketValue = obj.marketValue;
                asset.location = GlobalConstants.DOMESTIC;
                asset.date_purchased = GlobalConstants.UNDEFDATE;
            } else if (asset.class === GlobalConstants.FIXEDASSETS || asset.class === GlobalConstants.FOREIGNCURR){
                asset.units = GlobalConstants.UNDEFNUM;
                asset.unitCost = GlobalConstants.UNDEFNUM;
                asset.totalCost = obj.totalCost;
                asset.marketPrice = GlobalConstants.UNDEFNUM;
                asset.marketValue = obj.marketValue;
                asset.location = obj.location;
                asset.date_purchased = obj.date_purchased;
            } else {
                asset.units = Number(obj.units);
                asset.unitCost = Number(obj.unitCost);
                asset.totalCost = asset.units*asset.unitCost;
                asset.marketPrice = Number(obj.marketPrice);
                asset.marketValue = asset.units*asset.marketPrice;
                asset.location = obj.location;
                asset.date_purchased = obj.date_purchased;
            }
            return asset;
        };

}]);

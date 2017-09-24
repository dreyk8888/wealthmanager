'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * debt object declaration and initialization functions.
 * Also includes functionality to set up debt objects for posting to API
 */
angular.module('wealthManagerApp')
    .service('Debt', ['GlobalConstants', function(GlobalConstants) {
        //set of debt classes
        this.DEBTTERMS = [GlobalConstants.SHORT_TERM, GlobalConstants.LONG_TERM];
        //return a clean debt object
        this.init = function(){
            var debt = {
                term: "",
                name: "",
                amount: ""
            }
            return debt;
        }

        this.reset = function (debt){
            debt.term = "";
            debt.name = "";
            debt.amount = "";

            return debt;
        }

        this.resetKeepClass = function (debt){
            debt.name = "";
            debt.amount = "";

            return debt;
        }
        //return the debt object parameter populated with parameterized values and calculated amount
        //keep track of _id for API posting purposes
        this.populate = function (debt, _id, term, name, amount){
            debt._id = _id;
            debt.name = name;
            debt.amount = amount;
            debt.term = term;

            return debt;
        }
}]);

"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Helper functions for wealth manager
 */
angular.module("wealthManagerApp")
    .service("Helpers", function() {

        //search for a string in an array of objects, return index if found, or -1 if not found
        //array - array of objects to search
        //searchTerm - value of parameter name match
        //objectToSearch - name of parameter to match
        this.searchObjectArray = function(searchTerm, array, objectToSearch){
            var index = -1;
            if (array.length < 1){
                return index;
            }
            for(var i = 0, len = array.length; i < len; i++) {
                if (typeof array[i][objectToSearch]  !== "undefined"){
                    if (array[i][objectToSearch].toLowerCase() === searchTerm.toLowerCase()) {
                        index = i;
                        return index;
                    }
                }
            }
            return index;
        };

        //convert strings to title case
        this.toTitleCase = function (str) {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };

        this.checkIfEmptyString = function(myString){
            if (!myString || myString.length === 0) {
                return true;
            }
            return false;
        };

});

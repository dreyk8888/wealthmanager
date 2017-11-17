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

        //build a schema form title map from an array of strings
        //title map should be an array of objects of the form {value: "", name: ""}
        this.buildTitleMap = function (array){
            var titleMap = [];
            for (var i = 0; i < array.length; i++){
                titleMap.push({"value": array[i], "name": array[i]});
            }
            return titleMap;
        };

        //dynamic sort an array of objects by specified parameter
        this.dynamicSort = function(array, param){


        }

        //compare 2 objects by a parameter, return -1 if a < b, 1 if a > b, 0 if equal
        this.compare = function(a, b, param){
            if (a[param] < b[param])
                return -1;
            if (a[param] > b[param])
                return 1;
            return 0;
        }

});

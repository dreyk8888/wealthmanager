'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve asset data
 */
angular.module('wealthManagerApp')
    .service('Helpers', function() {

        //search for an item in an array of objects, return index if found, or -1 if not found
        this.searchArray = function(searchTerm, array, objectToSearch){
            var index = -1;
            if (array.length < 1){
                return index;
            }

            for(var i = 0, len = array.length; i < len; i++) {
                if (array[i][objectToSearch].toLowerCase() === searchTerm.toLowerCase()) {
                    index = i;
                    return index;
                }
            }
            return index;
        }

        //convert strings to title case
        String.prototype.toTitleCase = function () {
            return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };

});

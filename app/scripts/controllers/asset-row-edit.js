'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:AssetRowEditCtrl
 * @description
 * # Controller to display asset editing modal dialog
 * Controller of the wealthManagerApp
 */

angular.module('wealthManagerApp').controller('AssetRowEditCtrl', ['$uibModalInstance', 'AssetSchema', 'grid', 'row', function ($uibModalInstance, AssetSchema, grid, row) {
    console.log("Running AssetRowEditCtrl");
    var vm = this;
    vm.schema = AssetSchema;
    vm.entity = angular.copy(row.entity);
    vm.form = [
        'class',
        'name',
        'units',
        'unitCost',
        'amount',
        'location',
        'date_purchased',
        'currency'
    ];

   vm.save =  function save() {
        console.log ("Saving values");
        // Copy row values over
        row.entity = angular.extend(row.entity, vm.entity);
        $uibModalInstance.close(row.entity);
    };

    vm.cancel = function cancel(){
        console.log("Cancelled");
        $uibModalInstance.dismiss('cancel');
    }

}]);
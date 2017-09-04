'use strict';

/**
 * @ngdoc function
 * @name wealthManagerApp.controller:AssetRowEditCtrl
 * @description
 * # Controller to display asset editing modal dialog
 * Controller of the wealthManagerApp
 */

angular.module('wealthManagerApp')
.controller('AssetRowEditCtrl', function ($uibModalInstance, AssetSchema, grid, row) {
    var vm = this;

    vm.schema = AssetScema;
    vm.entity = angular.copy(row.entity);
    vm.form = [
        'name',
        'company',
        'phone',
        {
            'key': 'address.city',
            'title': 'City'
        },
    ];

    vm.save = save;

    function save() {
        // Copy row values over
        row.entity = angular.extend(row.entity, vm.entity);
        $uibModalInstance.close(row.entity);
    }
});

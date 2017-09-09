//'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service for opening a new modal for row editing in ui-grid
 */
angular.module('wealthManagerApp')
.service('RowEditor', ['$rootScope', '$uibModal', function ($rootScope, $uibModal, AssetRowEditCtrl) {
    var service = {};
    service.editRow = editRow;

    function editRow(grid, row) {
       var modalInstance = $uibModal.open({
            templateUrl: 'views/edit-modal.html',
            //controller: AssetRowEditCtrl,
            controllerAs: 'vm',

            controller: function ($uibModalInstance, AssetSchema, grid, row) {
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
                };
            },


            resolve: {
                grid: function () { return grid; },
                row: function () { return row; }
            }
        });
    }

    console.log ("row.entity.name");

    return service;
}]);


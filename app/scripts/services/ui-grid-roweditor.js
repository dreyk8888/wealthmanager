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
            //controllerAs: 'editModal',
            controller: function ($scope, $uibModalInstance, AssetSchema, grid, row) {
                console.log("Running AssetRowEditCtrl");
                //var $scope = this;
                console.log ("Test");
                $scope.schema = AssetSchema;
                $scope.entity = angular.copy(row.entity);
                $scope.form = [
                    'class',
                    'name',
                    'units',
                    'unitCost',
                    'amount',
                    'location',
                    'date_purchased',
                    'currency'
                ];

                $scope.save =  function save() {
                    console.log ("Saving values");
                    // Copy row values over
                    row.entity = angular.extend(row.entity, $scope.entity);
                    $uibModalInstance.close(row.entity);
                };

                $scope.cancel = function cancel(){
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

    return service;
}]);


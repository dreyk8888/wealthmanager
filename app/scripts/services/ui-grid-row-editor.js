//'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service for opening a new modal for row editing in ui-grid and saving changed data
 */
angular.module('wealthManagerApp')
.service('RowEditor', ['$rootScope', '$uibModal', 'AssetDataAPI', 'APIResponseHandlersCommon', 'Asset', function ($rootScope, $uibModal, AssetDataAPI, APIResponseHandlersCommon, Asset) {

    var DEBUG = true;

    this.editRow = function editRow(grid, row) {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/edit-modal.html',
            //controller: AssetRowEditCtrl,
            controllerAs: 'vm',
            controller: function ($scope, $uibModalInstance, AssetSchema, PortfolioForms, grid, row) {
                var vm = this;
                vm.schema = AssetSchema.schema;
                vm.entity = angular.copy(row.entity);
                vm.form = PortfolioForms.getAssetForm (vm.entity.class);

                vm.save =  function save(form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid){
                        // Copy row values over
                        row.entity = angular.extend(row.entity, vm.entity);
                        var updateData = Asset.copyAndCalculateAmount(row.entity);

                         //update data in storage
                        if (DEBUG){ console.log("Data to save: " + updateData); }
                        AssetDataAPI.updateData(APIResponseHandlersCommon.successHandler_PUT, APIResponseHandlersCommon.failureHandler_PUT, updateData, updateData._id);
                        row.entity = updateData; //update grid

                        //close modal
                        $uibModalInstance.close(row.entity);
                    }
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

}]);


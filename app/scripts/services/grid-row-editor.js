'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service for opening a new modal for row editing in ui-grid and saving changed data
 */
angular.module('wealthManagerApp')
.service('RowEditor', ['$rootScope', '$uibModal', 'AssetDataAPI', 'DebtDataAPI', 'APIResponseHandlersCommon', 'Asset', function ($rootScope, $uibModal, AssetDataAPI, DebtDataAPI, APIResponseHandlersCommon, Asset) {

    var DEBUG = true;

    this.editAssetRow = function (grid, row) {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/edit-modal.html',
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


                        if (DEBUG){ console.log("Data to save: " + updateData); }

                        //update data in storage
                        AssetDataAPI.updateData(APIResponseHandlersCommon.successHandler_PUT, APIResponseHandlersCommon.failureHandler_PUT, updateData, updateData._id);

                        //update grid
                        grid.appScope.assetData[grid.appScope.assetData.findIndex(x => x._id === updateData._id)] = updateData;

                        //assetData was never updated. That's why recalculate doesn't work
                        grid.appScope.recalculate();

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

        return modalInstance;
    };

    this.editDebtRow = function (grid, row) {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/edit-modal.html',
            controllerAs: 'vm',
            controller: function ($scope, $uibModalInstance, DebtSchema, PortfolioForms, grid, row) {
                var vm = this;
                vm.schema = DebtSchema.schema;
                vm.entity = angular.copy(row.entity);
                vm.form = PortfolioForms.getDebtForm ();

                vm.save =  function save(form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid){
                        // Copy row values over
                        row.entity = angular.extend(row.entity, vm.entity);

                        if (DEBUG){ console.log("Data to save: " + row.entity); }

                        //update data in storage
                        DebtDataAPI.updateData(APIResponseHandlersCommon.successHandler_PUT, APIResponseHandlersCommon.failureHandler_PUT, row.entity, row.entity._id);

                        //update grid
                        grid.appScope.debtData[grid.appScope.debtData.findIndex(x => x._id === row.entity._id)] = row.entity;

                        //assetData was never updated. That's why recalculate doesn't work
                        grid.appScope.recalculate();

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
        return modalInstance;
    };

}]);

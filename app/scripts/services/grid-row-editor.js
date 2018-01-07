'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service for opening a new modal for row editing in ui-grid and saving changed data
 */
angular.module('wealthManagerApp')
.service('RowEditor', ['$rootScope', '$uibModal','AssetDataAPI','DebtDataAPI','Asset', 'Debt',function ($rootScope, $uibModal, AssetDataAPI, DebtDataAPI, Asset, Debt) {

    var DEBUG = true;

    this.editAssetRow = function (grid, row) {

        var modalInstance = $uibModal.open({
            templateUrl: 'views/edit-modal.html',
            controllerAs: 'vm',
            controller: function ($scope, $uibModalInstance, AssetSchema, PortfolioFormsModal, grid, row) {
                var vm = this;
                vm.schema = AssetSchema.schema;
                vm.entity = angular.copy(row.entity);
                vm.form = PortfolioFormsModal.getAssetForm (vm.entity.class);

                vm.save =  function save(form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid){
                        // Copy row values over
                        row.entity = angular.extend(row.entity, vm.entity);
                        var updateData = Asset.copyAndCalculateAmount(row.entity);


                        if (DEBUG){
                            console.log("Data to save: " + updateData._id);
                            console.log ("ID to write to grid" + grid.appScope.assetData.findIndex(x => x._id === updateData._id));
                        }

                        var updateResponse = {};
                        //update data in storage
                        AssetDataAPI.updateData(updateData, updateData._id)
                            .then (data => {
                                updateResponse = data.data;
                                if (DEBUG) {console.log ("Object posted to API: ID=" + updateResponse._id + " name=" + updateResponse.name + " units=" + updateResponse.units + " unitCost=" +
                                updateResponse.unitCost + " location=" + updateResponse.location + " currency=" + updateResponse.currency);}

                                //update grid
                                grid.appScope.assetData[grid.appScope.assetData.findIndex(x => x._id === updateData._id)] = updateResponse; //update the table with what was actually posted, since ID and defaults are in the response only

                                //update the totals, and pie charts
                                grid.appScope.recalculate();

                                //save net worth to net worth history
                                grid.appScope.updateNetWorth(grid.appScope.totalAssets, grid.appScope.totalDebt, grid.appScope.localCurrency);

                                //close modal
                                $uibModalInstance.close(row.entity);
                            });

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
            controller: function ($scope, $uibModalInstance, Debt, DebtSchema, PortfolioFormsModal, grid, row) {
                var vm = this;
                vm.schema = DebtSchema.schema;
                vm.entity = angular.copy(row.entity);
                vm.form = PortfolioFormsModal.getDebtForm ();

                vm.save =  function save(form) {
                    $scope.$broadcast('schemaFormValidate');
                    if (form.$valid){
                        // Copy row values over
                        row.entity = angular.extend(row.entity, vm.entity);

                        //clean up the data before write to DB
                        var updateData = Debt.init();
                        updateData = Debt.populate (updateData, row.entity._id, row.entity.term, row.entity.name, row.entity.amount);
                        if (DEBUG){ console.log("Data to save: " + row.entity._id + " " + row.entity.name + " " + row.entity.term);
                                    console.log("Data to save: " + updateData._id + " " + updateData.name + " " + updateData.term);
                         }

                        //update data in storage
                        var updateResponse = {};
                        DebtDataAPI.updateData(updateData, updateData._id)
                            .then (data => {
                                updateResponse = data.data;
                                if (DEBUG) {console.log ("Object posted to API: ID=" + updateResponse._id + " name=" + updateResponse.name + " amount=" + updateResponse.amount + "term=" +
                                updateResponse.term);}

                                //update grid
                                grid.appScope.debtData[grid.appScope.debtData.findIndex(x => x._id === row.entity._id)] = updateResponse;

                                //debtData was never updated. That's why recalculate doesn't work
                                grid.appScope.recalculate();

                                //save net worth to net worth history
                                grid.appScope.updateNetWorth(grid.appScope.totalAssets, grid.appScope.totalDebt, grid.appScope.localCurrency);
                                //close modal
                                $uibModalInstance.close(row.entity);
                            });

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


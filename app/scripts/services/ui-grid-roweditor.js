'use strict';

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
            controller: ['$uibModalInstance', 'AssetSchema', 'grid', 'row', AssetRowEditCtrl],
            controllerAs: 'editModal',
            resolve: {
                grid: function () { return grid; },
                row: function () { return row; }
            }
        });
    }

    return service;
}]);


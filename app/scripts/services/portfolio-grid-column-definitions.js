"use strict";

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Column definition and filters for Portfolio grids for wealth manager
 */
angular.module("wealthManagerApp")
.filter("GridUnitsFilter", function() {

    return function (input, entity) {
        if (entity.units < 0) {
            return "---";
        }
        else {
            return entity.units;
        }
    };
})

.filter("GridUnitCostFilter", function() {

    return function (input, entity) {
        if (entity.unitCost < 0){
            return "---";
        }
        else if (entity.unitCost >= 0) {
           return "$" + entity.unitCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  //put commas for every thousand
        }
    };
})

.filter("GridMktPriceFilter", function() {

    return function (input, entity) {
        if (entity.marketPrice < 0) {
            return "---";
        }
        else if (entity.marketPrice >= 0) {
           return "$" + entity.marketPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  //put commas for every thousand
        }
    };
})
.filter("GridTotalCostFilter", function() {

    return function (input, entity) {
        if (entity.totalCost < 0){
            return "---";
        }
        else if (entity.totalCost >= 0) {
           return "$" + entity.totalCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  //put commas for every thousand
        }
    };
})

.filter("GridDateFilter", function() {

    return function (input, entity) {
        //don't display anything if this a group heading row
        if (entity.date_purchased == undefined)
            return "";
        //check if dummy date, if so show the n/a dashes
        var dateVal = moment(entity.date_purchased);
        var compareDate = moment("01/01/1800","MM/DD/YYYY");
        if (dateVal < compareDate){
            return "---";
        }
        else {
            dateVal = dateVal.format("MM-DD-YYYY");   //real date, format it properly
            return dateVal;
        }
    };
})
.service("PortfolioGridColumnDefs", function() {
    this.assetColDef = [
        { name: "ID", field: "_id", width: "0%", visible: false },
        { name: "Asset Class", field: "class", width: "8%", grouping: { groupPriority: 0 }, sort: { priority: 0, direction: "asc" }, cellTemplate: "views/portfolioentry-grid-grouping-template.html" },
        { name: "Location", field: "location", width: "9%"},
        { name: "Name/Symbol", field: "name", width: "14%" },
        { name: "#Units", field: "units", type: "number", width: "9%", cellFilter: "GridUnitsFilter:row.entity"},
        { name: "Cost/Unit", field: "unitCost", type: "number", width: "9%", cellFilter: "GridUnitCostFilter:row.entity"},
        { name: "Cost", field: "totalCost", type: "number", width: "12%", enableCellEdit: false, cellFilter: "GridTotalCostFilter:row.entity" },
        { name: "Mkt Price", field: "marketPrice", type: "number", width: "9%", cellFilter: "GridMktPriceFilter:row.entity"},
        { name: "Mkt Value", field: "marketValue", type: "number", width: "12%", enableCellEdit: false, cellFilter: "currency" },
        { name: "Date Purchased (MM-DD-YYYY)", field: "date_purchased", type: "date", width: "10%", cellFilter: "GridDateFilter:row.entity"},
        //{ name: "Date Purchased (MM-DD-YYYY)", field: "date_purchased", type: "date", width: "10%", cellFilter: 'date:"MM-dd-yyyy"'},
        { name: "Actions",
            field:"buttons",
            width: "9%",
            cellTemplate: "views/portfolioentry-grid-button-template-asset.html",
            enableCellEdit: false,
            enableFiltering:false,
            enableSorting: false,
            showSortMenu : false,
            enableColumnMenu: false,
        },
    ];

    this.debtColDef = [
        { name: "ID", field: "_id", width: "0%", visible: false },
        { name: "Term", field: "term", width: "20%", grouping: { groupPriority: 0 }, sort: { priority: 0, direction: "asc" }, cellTemplate: "views/portfolioentry-grid-grouping-template.html" },
        { name: "Name", field: "name", width: "30%" },
        { name: "Amount", field: "amount", type: "number", width: "10%", enableCellEdit: false, cellFilter: "currency" },
        { name: "Description", field: "name", width: "30%" },
        { name: "Actions",
            field:"buttons",
            width: "10%",
            cellTemplate: "views/portfolioentry-grid-button-template-debt.html",
            enableCellEdit: false,
            enableFiltering:false,
            enableSorting: false,
            showSortMenu : false,
            enableColumnMenu: false,
        },
  ];
});

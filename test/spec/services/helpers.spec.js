"use strict";

describe("Service: Helpers", function () {

  // load the service"s module
  beforeEach(angular.mock.module("wealthManagerApp"));

  // instantiate service
  var Helpers;
  beforeEach(inject(function (_Helpers_) {
    Helpers = _Helpers_;
  }));

  //use calculator mock data for testing some of the helpers
  var PortfolioCalcsMock;
  beforeEach(inject(function(_PortfolioCalcsMockData_){
    PortfolioCalcsMock = _PortfolioCalcsMockData_;
  }));

  it("Helpers service should exist", function() {
    expect(Helpers).toBeDefined();
  });

  it("searchObjectArray() should exist", function () {
    expect(Helpers.searchObjectArray("",[],{})).toBeDefined();
  });

  it("checkIfEmptyString() should exist", function () {
    expect(Helpers.checkIfEmptyString("")).toBeDefined();
  });

  it("toTitleCase() should exist", function () {
    expect(Helpers.toTitleCase("")).toBeDefined();
  });

  it("buildTitleMap() should exist", function () {
    expect(Helpers.buildTitleMap("")).toBeDefined();
  });

  it("toTitleCase() takes lower case sentence and converts to title case", function () {
    expect(Helpers.toTitleCase("hello how are you?")).toEqual("Hello How Are You?");
  });

  it("checkIfEmptyString() returns true if string is empty", function () {
    expect(Helpers.checkIfEmptyString("")).toEqual(true);
  });

  it("checkIfEmptyString() returns false if string is not empty", function () {
    expect(Helpers.checkIfEmptyString("!!erla   lekjralkejlk")).toEqual(false);
  });

  it("checkIfEmptyString() returns false if string is not empty and is whitespace", function () {
    expect(Helpers.checkIfEmptyString("   ")).toEqual(false);
  });

  it("checkIfEmptyString() returns false if string is not empty and is newline", function () {
    expect(Helpers.checkIfEmptyString("\n")).toEqual(false);
  });

  it("searchObjectArray() returns array index if item found, item is a string", function () {
    expect(Helpers.searchObjectArray("Fixed Assets", PortfolioCalcsMock.mockAssetDataFloat, "class")).toEqual(2);
  });

  it("searchObjectArray() returns array index if item found, item is upper case", function () {
    expect(Helpers.searchObjectArray("CASH", PortfolioCalcsMock.mockAssetDataFloat, "class")).toEqual(1);
  });

  it("searchObjectArray() returns -1 if not found", function () {
    expect(Helpers.searchObjectArray("CASHES", PortfolioCalcsMock.mockAssetDataFloat, "class")).toEqual(-1);
  });

  var array = ["abc", "def", "ghi", "jkl"];
  var expected = [{"value": "abc", "name": "abc"}, {"value":"def", "name":"def"}, {"value":"ghi", "name":"ghi"}, {"value":"jkl", "name":"jkl"}];
  it("buildTitleMap() returns a title map from an array of form [{value: <value>, name: <name>}, ...]", function () {
    expect(Helpers.buildTitleMap(array)).toEqual(expected);
  });

  var testObj1 = {
    net_worth: 999.9,
    date: "2019-10-23T21:09:08.000Z",
    currency: "CAD"
  };
  var testObj2 = {
    net_worth: 1000,
    date: "2018-10-23T21:09:08.000Z",
    currency: "USD"
  };

  var testObj3 = {
    net_worth: 1.0000001,
    date: "2018-10-23T21:09:07.000Z",
    currency: "USD"
  };

  var testObj4 = {
    net_worth: 1,
    date: "2007-10-21T21:09:08.000Z",
    currency: "USD"
  };

  var testArray = [testObj1, testObj2, testObj3, testObj4];
  var resultArraybyDate = [testObj4, testObj3, testObj2, testObj1];
  var resultArraybyNW = [testObj4, testObj3, testObj1, testObj2];
  it("object.sort(dynamicSort(date)) returns an array sorted by date", function () {
    expect(testArray.sort(Helpers.dynamicSort("date"))).toEqual(resultArraybyDate);
  });

  it("object.sort(dynamicSort(date)) returns an array sorted by net worth", function () {
    expect(testArray.sort(Helpers.dynamicSort("net_worth"))).toEqual(resultArraybyNW);
  });
});

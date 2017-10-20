"use strict";

describe("Service: FIRECalcHelper", function () {

  // load the service"s module
  beforeEach(angular.mock.module("wealthManagerApp"));

  // instantiate service
  var FIRECalcHelper;
  beforeEach(inject(function (_FIRECalcHelper_) {
    FIRECalcHelper = _FIRECalcHelper_;
  }));
/*
  //use calculator mock data for testing some of the helpers
  var PortfolioCalcsMock;
  beforeEach(inject(function(_PortfolioCalcsMockData_){
    PortfolioCalcsMock = _PortfolioCalcsMockData_;
  }));
*/
  it("FIRECalcHelper service should exist", function() {
    expect(FIRECalcHelper).toBeDefined();
  });

  it("netWorthCalc() should exist", function () {
    expect(FIRECalcHelper.netWorthCalc(0,0,0,0,0,false)).toBeDefined();
  });

  it("netWorthCalc() should calculate the future value compounded annually without principle added correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 0, 0, 2, false)).toEqual("114490.00");
  });

  it("netWorthCalc() should calculate the future value compounded monthly without principle added correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 0, 0, 2, true)).toEqual("114980.60");
  });

  it("netWorthCalc() should calculate the future value compounded annually with principle added correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 0, 2, false)).toEqual("197290.00");
  });

  it("netWorthCalc() should calculate the future value compounded monthly with principle added correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 0, 3, true)).toEqual("252176.40");
  });

  it("netWorthCalc() should calculate the future value compounded annually with principle and principle growth correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 3, 2, false)).toEqual("198490.00");
  });

  it("netWorthCalc() should calculate the future value compounded monthly with principle and principle growth correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 3, 3, true)).toEqual("255899.15");
  });

  it("netWorthCalc() should handle zeroes for net worth", function () {
    expect(FIRECalcHelper.netWorthCalc(0, 7, 0, 2, 0, false)).toEqual("0.00");
  });

  it("netWorthCalc() should handle zeroes for annual return", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 0, 0, 2, 0, false)).toEqual("100000.00");
  });

  it("netWorthCalc() should handle zeroes for annual return and number of years", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 0, 0, 0, 0, false)).toEqual("100000.00");
  });

  it("netWorthCalc() should handle negative net worth", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 0, 0, 0, 0, false)).toEqual("-100000.00");
  });

  it("netWorthCalc() should handle negative net worth with principle by ignoring compounding until net worth positive", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 0, 5, false)).toEqual("105698.00");
  });

});

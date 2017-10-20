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

  it("netWorthCalc() should calculate the future value compounded annually without income added correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 0, 0, 2, false)).toEqual([107000,114490]);
  });

  it("netWorthCalc() should calculate the future value compounded monthly without income added correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 0, 0, 2, true)).toEqual([107229.01, 114980.6]);
  });

  it("netWorthCalc() should calculate the future value compounded annually with income added correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 0, 2, false)).toEqual([147000.00,197290]);
  });

  it("netWorthCalc() should calculate the future value compounded monthly with income added correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 0, 3, true)).toEqual([147229.01,197872.2,252176.4]);
  });

  it("netWorthCalc() should calculate the future value compounded annually with income and income growth correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 3, 2, false)).toEqual([147000,198490]);
  });

  it("netWorthCalc() should calculate the future value compounded monthly with income and income growth correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 3, 3, true)).toEqual([147229.01,199072.2,255899.15]);
  });

  it("netWorthCalc() should handle zeroes for net worth", function () {
    expect(FIRECalcHelper.netWorthCalc(0, 7, 0, 2, 0, false)).toEqual([0]);
  });

  it("netWorthCalc() should handle zeroes for annual return", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 0, 0, 2, 0, false)).toEqual([100000]);
  });

  it("netWorthCalc() should handle zeroes", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 0, 0, 0, 0, false)).toEqual([100000]);
  });

  it("netWorthCalc() should handle negative net worth", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 0, 0, 0, 0, false)).toEqual([-100000]);
  });

  it("netWorthCalc() should handle negative net worth with income by ignoring compounding until net worth positive", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 0, 5, false)).toEqual([-60000,-20000,20000,61400,105698]);
  });

  it("netWorthCalc() should handle zero income but non-zero growth", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 0, 0, 3, 0, false)).toEqual([100000]);
  });

  it("netWorthCalc() should handle negative net worth with income AND growth by ignoring compounding until net worth positive", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 3, 5, false)).toEqual([-60000,-18800.00,23636,68999.6,118849.92]);
  });

  it("netWorthCalc() negative net worth with income AND growth monthly compounding", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 3, 5, true)).toEqual([-60000,-18800,23636,69053.73,119065.98]);
  });

});

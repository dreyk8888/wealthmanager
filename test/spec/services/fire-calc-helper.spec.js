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
    expect(FIRECalcHelper.netWorthCalc(0,0,0,0,0,0,0,false)).toBeDefined();
  });

  it("netWorthCalc() should calculate the future value compounded annually without income/expense correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 0, 0, 0,0, 2, false)).toEqual([107000,114490]);
  });

  it("netWorthCalc() should calculate the future value compounded monthly without income/expense correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 0, 0, 0, 0, 2, true)).toEqual([107229.01, 114980.6]);
  });

  it("netWorthCalc() should calculate the future value compounded annually with income correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 0, 0, 0, 2, false)).toEqual([147000.00,197290]);
  });

  it("netWorthCalc() should calculate the future value compounded monthly with income correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 0, 0, 0, 3, true)).toEqual([147229.01,197872.2,252176.4]);
  });

  it("netWorthCalc() should calculate the future value compounded annually with expense correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 0, 1500, 0, 5, false)).toEqual([129000,160030,193232.1,228758.35,266771.43]);
  });

  it("netWorthCalc() should calculate the future value compounded monthly with expense correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 0, 1500, 0, 3, true)).toEqual([129229.01, 160570.98, 194178.67]);
  });

  it("netWorthCalc() should calculate the future value compounded annually with income and income growth correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 3, 0, 0, 2, false)).toEqual([147000,198490]);
  });

  it("netWorthCalc() should calculate the future value compounded monthly with income and income growth correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 3, 0, 0, 3, true)).toEqual([147229.01,199072.2,255899.15]);
  });

  it("netWorthCalc() should calculate the future value compounded annually with income/expense and income/expense growth correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 3, 1500, 2, 10, false)).toEqual([129000,160870,195839.7,234155.82,276083.3,321906.63,371931.27,426485.07,485919.96,550613.62]);
  });

  it("netWorthCalc() should calculate the future value compounded monthly with income/expense and income/expense growth correctly", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 7, 40000, 3, 1500, 2, 3, true)).toEqual([129229.01,161410.98,196788.2]);
  });

  it("netWorthCalc() should handle zeroes for net worth", function () {
    expect(FIRECalcHelper.netWorthCalc(0, 7, 0, 2, 0, 0, 0, false)).toEqual([0]);
  });

  it("netWorthCalc() should handle zeroes for annual return", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 0, 0, 2, 0, 0, 0, false)).toEqual([100000]);
  });

  it("netWorthCalc() should handle zeroes", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 0, 0, 0, 0, 0, 0, false)).toEqual([100000]);
  });

  it("netWorthCalc() should handle negative net worth", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 0, 0, 0, 0, 0, 0, false)).toEqual([-100000]);
  });

  it("netWorthCalc() should handle negative net worth with income by ignoring compounding until net worth positive", function () {
   expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 0, 0, 0, 5, false)).toEqual([-60000,-20000,20000,61400,105698]);
  });

  it("netWorthCalc() should handle zero income but non-zero growth", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, 0, 0, 3, 0, 0, 0, false)).toEqual([100000]);
  });

  it("netWorthCalc() should handle negative net worth with income AND growth by ignoring compounding until net worth positive", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 3, 0, 0, 5, false)).toEqual([-60000,-18800.00,23636,68999.6,118849.92]);
  });

  it("netWorthCalc() negative net worth with income AND growth monthly compounding", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 3, 0, 0, 5, true)).toEqual([-60000,-18800,23636,69053.73,119065.98]);
  });

  it("netWorthCalc() should handle negative net worth with annual compounding, income/expense AND growth by ignoring compounding until net worth positive", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 3, 1500, 2, 5, false)).toEqual([-78000,-55160,-31451.2,-6843.86,18692.71]);
  });

  it("netWorthCalc() negative net worth with monthly compounding, income/expense AND growth monthly compounding", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 3, 1500, 2, 5, true)).toEqual([-78000,-55160,-31451.2,-6843.86,18692.71]);
  });

  it("netWorthCalc() negative net worth expense exceeding income, with growth, compounded annually", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 3, 5000, 2, 5, false)).toEqual([-120000,-140000,-159988,-179951.4,-199876.98]);
  });

  it("netWorthCalc() negative net worth expense exceeding income, with growth, compounded annually", function () {
    expect(FIRECalcHelper.netWorthCalc(-100000, 7, 40000, 3, 5000, 2, 5, true)).toEqual([-120000,-140000,-159988,-179951.4,-199876.98]);
  });

  it("calculateROI() should exist", function () {
    expect(FIRECalcHelper.calculateROI(0,0,0)).toBeDefined();
  });

  it("calculateROI() should return ROI of 0 if number of years is 0", function () {
    expect(FIRECalcHelper.calculateROI(100,105,0)).toEqual(0);
  });

  it("calculateROI() should ROI of -0.87 if starting net worth = 115, end = 105, over 10 years", function () {
    expect(FIRECalcHelper.calculateROI(115,105,10)).toEqual(-0.87);
  });

  it("calculateROI() should ROI of -10 if starting net worth is 20000, ending is 10000 over 5 years", function () {
    expect(FIRECalcHelper.calculateROI(20000,10000,5)).toEqual(-10);
  });

  it("calculateROI() should return 89.5 percent for start of -1000, end of -105, 1 year", function () {
    expect(FIRECalcHelper.calculateROI(-1000,-105,1)).toEqual(89.5);
  });

  it("calculateROI() should return 20 percent for start of -100, end of 100, 10 years", function () {
    expect(FIRECalcHelper.calculateROI(-100,100,10)).toEqual(20);
  });

  it("calculateROI() should return 400 percent for start of 100, end of 100, 10 years", function () {
    expect(FIRECalcHelper.calculateROI(-100,-500,10)).toEqual(-40);
  });

  it("calculateROI() should return 600 percent for start of 100, end of 100, 10 years", function () {
    expect(FIRECalcHelper.calculateROI(100,-500,10)).toEqual(-60);
  });

  it("calculateROI() should return 5 percent for start of 100, end of 105, 1 year", function () {
    expect(FIRECalcHelper.calculateROI(100,105,1)).toEqual(5);
  });

  it("calculateROI() should return 0 percent for start of 100, end of 100, 10 years", function () {
    expect(FIRECalcHelper.calculateROI(100,100,10)).toEqual(0);
  });

  it("calculateROI() should return 1.45 percent for start of 100, end of 101.452, 10 years", function () {
    expect(FIRECalcHelper.calculateROI(100,101.452,1)).toEqual(1.45);
  });

  it("calculateROI() should return 1.09 percent for start of 100, end of 111.452, 10 years", function () {
    expect(FIRECalcHelper.calculateROI(100,111.452,10)).toEqual(1.09);
  });

  it("calculateROI() should return 1.06 percent for start of 100, end of 123.452, 20 years", function () {
    expect(FIRECalcHelper.calculateROI(100,123.452,20)).toEqual(1.06);
  });

  var testDateObj1 = {
    net_worth: 1000,
    date: "2017-10-23T21:09:08.000Z",
    currency: "USD"
  };

  var testDateObj2 = {
    net_worth: 965465,
    date: "2014-01-28T21:09:18.000Z",
    currency: "CAD"
  };

  var testDateObj3 = {
    net_worth: 50,
    date: "2017-04-23T21:09:18.000Z",
    currency: "USD"
  };

  var testDateObj4 = {
    net_worth: 150,
    date: "2017-05-23T21:09:18.000Z",
    currency: "USD"
  };

  var testData = [testDateObj1, testDateObj2, testDateObj3, testDateObj4];
  var resultData = [
      {
        year: 2014,
        net_worth: 965465,
        currency: "CAD"
      },
      {
        year: 2017,
        net_worth: 150,
        currency: "USD"
      }
    ];


  it ("findObjClosestToEndDate() should return object that has date closer to end date - different year", function(){
    expect(FIRECalcHelper.findObjClosestToEndDate(testDateObj2, testDateObj3, 5,15,2017)).toEqual(testDateObj3);
  });

  it ("findObjClosestToEndDate() should return object that has date closer to end date - days apart", function(){
    expect(FIRECalcHelper.findObjClosestToEndDate(testDateObj4, testDateObj3, 5,15,2017)).toEqual(testDateObj4);
  });

  it ("cleanHistoricalData() should exist", function(){
    expect(FIRECalcHelper.consolidateHistoricalData(testData, "","")).toBeDefined();
  });

  it ("cleanHistoricalData() return an array of year, net worth, currency objects", function(){
    expect(FIRECalcHelper.consolidateHistoricalData(testData, 5, 15)).toEqual(resultData);
  });


});

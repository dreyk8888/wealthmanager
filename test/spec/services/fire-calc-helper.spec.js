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

  it("netWorthCalc() negative income will return 0 net worth - IGNORING THIS CASE FOR NOW", function () {
    expect(FIRECalcHelper.netWorthCalc(100000, -10, 0, 3, 0, 0, 0, false)).toEqual([0]);
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
  var testDateObj1 = {
    net_worth: 1000,
    date: "2017-10-23T21:09:08.000Z",
    currency: "USD"
  };

  var testDateObj6 = {
    net_worth: 1002000,
    date: "2019-05-15T21:09:18.000Z",
    currency: "USD"
  };
  var testDateObj5 = {
    net_worth: 8000,
    date: "2019-05-23T21:09:18.000Z",
    currency: "USD"
  };

  var testData = [testDateObj1, testDateObj2, testDateObj3, testDateObj4];
  var testData2 = [testDateObj1, testDateObj2, testDateObj3, testDateObj4, testDateObj5, testDateObj6];
  var resultData = [
      {
        year: 2014,
        net_worth: 965465,
        currency: "CAD"
      },
      {
        year: 2015,
        net_worth: 965465,
        currency: "CAD"
      },
      {
        year: 2016,
        net_worth: 965465,
        currency: "CAD"
      },
      {
        year: 2017,
        net_worth: 150,
        currency: "USD"
      }
    ];
  var resultData2 = [
      {
        year: 2014,
        net_worth: 965465,
        currency: "CAD"
      },
      {
        year: 2015,
        net_worth: 965465,
        currency: "CAD"
      },
      {
        year: 2016,
        net_worth: 965465,
        currency: "CAD"
      },
      {
        year: 2017,
        net_worth: 150,
        currency: "USD"
      },
      {
        year: 2018,
        net_worth: 150,
        currency: "USD"
      },
      {
        year: 2019,
        net_worth: 1002000,
        currency: "USD"
      }
    ];

  it ("findObjClosestToEndDate() should return object that has date closer to end date - different year", function(){
    expect(FIRECalcHelper.findObjClosestToEndDate(testDateObj2, testDateObj3, 5,15,2017)).toEqual(testDateObj3);
  });

  it ("findObjClosestToEndDate() should return object that has date closer to end date - same day", function(){
    expect(FIRECalcHelper.findObjClosestToEndDate(testDateObj5, testDateObj6, 5,15,2019)).toEqual(testDateObj6);
  });

  it ("findObjClosestToEndDate() should return object that has date closer to end date - days apart", function(){
    expect(FIRECalcHelper.findObjClosestToEndDate(testDateObj4, testDateObj3, 5,15,2017)).toEqual(testDateObj4);
  });

  it ("consolidateHistoricalData() should exist", function(){
    expect(FIRECalcHelper.consolidateHistoricalData(testData, "","")).toBeDefined();
  });

  it ("consolidateHistoricalData() return an array of year, net worth, currency objects - 4 items", function(){
    expect(FIRECalcHelper.consolidateHistoricalData(testData, 5, 15)).toEqual(resultData);
  });

  it ("consolidateHistoricalData() return an array of year, net worth, currency objects - 6 items", function(){
    expect(FIRECalcHelper.consolidateHistoricalData(testData2, 5, 15)).toEqual(resultData2);
  });

  it ("generateCombinedNetWorthPlotData() should exist", function(){
    expect(FIRECalcHelper.generateCombinedNetWorthPlotData(testData,testData)).toBeDefined();
  });

  var testNWDataHist = [
    {"year": 2010,"net_worth": 15002,"currency":"CAD"},
    {"year": 2011,"net_worth": 15902,"currency":"USD"},
    {"year": 2012,"net_worth": 11902,"currency":"CAD"},
    {"year": 2013,"net_worth": 51902,"currency":"JPY"},
    {"year": 2014,"net_worth": 101902,"currency":"JPY"},
    {"year": 2015,"net_worth": 161902,"currency":"CAD"},
    {"year": 2016,"net_worth": 361902,"currency":"CAD"},
    {"year": 2017,"net_worth": 400000,"currency":"CAD"}
  ];

  var testNWDataHist2 = [
    {"year": 2010,"net_worth": 15002,"currency":"CAD"},
    {"year": 2011,"net_worth": 15902,"currency":"USD"},
    {"year": 2012,"net_worth": 15902,"currency":"CAD"},
    {"year": 2013,"net_worth": 51902,"currency":"JPY"},
    {"year": 2014,"net_worth": 101902,"currency":"JPY"},
    {"year": 2015,"net_worth": 161902,"currency":"CAD"}
  ];

  var testNWDataCalc = [500000,458034,700000,710215.12,812345];

  var combinedNWData = [
    [2010, 15002],
    [2011, 15902],
    [2012, 11902],
    [2013, 51902],
    [2014, 101902],
    [2015, 161902],
    [2016, 361902],
    [2017, 400000],
    [2018, 500000],
    [2019, 458034],
    [2020, 700000],
    [2021, 710215.12],
    [2022, 812345]
  ];

  var combinedNWData2 = [
    [2010, 15002],
    [2011, 15902],
    [2012, 15902],
    [2013, 51902],
    [2014, 101902],
    [2015, 161902],
    [2016, 161902],
    [2017, 161902],
    [2018, 500000],
    [2019, 458034],
    [2020, 700000],
    [2021, 710215.12],
    [2022, 812345]
  ];

  it ("generateCombinedNetWorthPlotData() should return a combined array from historical and calculated data", function(){
    expect(FIRECalcHelper.generateCombinedNetWorthPlotData(testNWDataHist,testNWDataCalc)).toEqual(combinedNWData);
  });

  it ("generateCombinedNetWorthPlotData() should return a combined array from historical and calculated data", function(){
    expect(FIRECalcHelper.generateCombinedNetWorthPlotData(testNWDataHist2,testNWDataCalc)).toEqual(combinedNWData2);
  });

  it ("calculateFIIncome() should exist", function(){
    expect(FIRECalcHelper.calculateFIIncome(0, 8)).toBeDefined();
  });

  it ("calculateFIIncome() should return income of 0 if withdrawal rate is 0", function(){
    expect(FIRECalcHelper.calculateFIIncome(1000, 0)).toEqual(0);
  });

  it ("calculateFIIncome() should return income of 0 if withdrawal rate is -10", function(){
    expect(FIRECalcHelper.calculateFIIncome(1000, -10)).toEqual(0);
  });

  it ("calculateFIIncome() should return income of 0 if net worth is negative", function(){
    expect(FIRECalcHelper.calculateFIIncome(-1000, 10)).toEqual(0);
  });

  it ("calculateFIIncome() should return income of 0 if net worth is 0", function(){
    expect(FIRECalcHelper.calculateFIIncome(0, 5)).toEqual(0);
  });

  it ("calculateFIIncome() should return income of 5000 if withdrawal rate is 5% and net worth is 1000000", function(){
    expect(FIRECalcHelper.calculateFIIncome(1000000, 5)).toEqual("50000.00");
  });

  it ("calculateFIIncome() should return income of 5000 if withdrawal rate is 5.5545878% and net worth is 1000000", function(){
    expect(FIRECalcHelper.calculateFIIncome(1000000, 5.5545871)).toEqual("55545.87");
  });
});

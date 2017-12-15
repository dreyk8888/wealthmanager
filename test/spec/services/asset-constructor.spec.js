"use strict";

describe("Service: Asset constructor", function () {

  // load the service"s module
  beforeEach(module("wealthManagerApp"));

  // instantiate service
  var Asset;
  beforeEach(inject(function (_Asset_) {
    Asset = _Asset_;
  }));



  it("Asset constructor service should exist", function() {
    expect(Asset).toBeDefined();
  });

  it("init() should exist", function (){
    expect(Asset.init()).toBeDefined();
  });

  it("reset() should exist", function () {
    expect(Asset.reset({})).toBeDefined();
  });

  it("resetKeepClass() should exist", function () {
    expect(Asset.resetKeepClass({})).toBeDefined();
  });

  it("populate() should exist", function () {
    expect(Asset.populate({}, "","","","","","","","","","")).toBeDefined();
  });

  it("copyAndCalculateAmount() should exist", function () {
    expect(Asset.copyAndCalculateAmount({})).toBeDefined();
  });

  var testAsset = {
      class: "Equities",
      name: "TEST",
      units: "100",
      unitCost: "10.50",
      totalCost: "",
      marketPrice: "53.23",
      marketValue: "",
      location: "Domestic",
      date_purchased: "7/23/2017",
      currency: "INR"
  };
  var expectedEmptyAsset = {
      class: "",
      name: "",
      units: "",
      unitCost: "",
      totalCost: "",
      marketPrice: "",
      marketValue: "",
      location: "",
      date_purchased: "",
      currency: ""
  };


  it("init() to create Asset with empty strings", function () {
    expect(Asset.init()).toEqual(expectedEmptyAsset);
  });

  it("reset() will return an Asset with empty strings given an Asset that was not empty", function () {
    expect(Asset.reset(testAsset)).toEqual(expectedEmptyAsset);
  });

  var testAsset2 = {
      class: "Hello Kitty",
      name: "TEST",
      units: "100",
      unitCost: "10.50",
      totalCost: "45",
      marketPrice: "23",
      marketValue: "67",
      location: "Domestic",
      date_purchased: "7/23/2017",
      currency: "INR"
  };

  var expectedAssetWithClass = {
      class: "Hello Kitty",
      name: "",
      units: "",
      unitCost: "",
      totalCost: "",
      marketPrice: "",
      marketValue: "",
      location: "",
      date_purchased: "",
      currency: ""
  };

  it("resetKeepClass() will return an Asset with empty strings except for class given an Asset that was not empty", function () {
    expect(Asset.resetKeepClass(testAsset2)).toEqual(expectedAssetWithClass);
  });

  var testAsset3 = {
      class: "Whatever",
      name: "TEST",
      units: "100",
      unitCost: "10.50",
      totalCost: "",
      marketPrice: "53.23",
      marketValue: "",
      location: "Domestic",
      date_purchased: "7/23/2017",
      currency: "INR"
  };

  var testCash = {
      _id: "1234567",
      class: "Cash",
      name: "My mom's money",
      units: "",
      unitCost: "",
      totalCost: 50000,
      marketPrice: "",
      marketValue: "",
      location: "",
      date_purchased: "",
      currency: "USD"
  };

  var expectedPopulatedCashAsset = {
      _id: "1234567",
      class: "Cash",
      name: "My mom's money",
      units: -1,
      unitCost: -1,
      totalCost: 50000,
      marketPrice: -1,
      marketValue: -1,
      location: "---",
      date_purchased: "1/1/1111",
      currency: "USD"
  };


  it("copyAndCalculateAmount() to create a copy of cash asset with name, amount, currency", function () {
    expect(Asset.copyAndCalculateAmount(testCash)).toEqual(expectedPopulatedCashAsset);
  });

  it("populate() will return an Asset object populated with class, name, amount, currency if asset class is cash", function () {
    expect(Asset.populate(testAsset3, "1234567", "Cash", "My mom's money", "", "", 50000, "", "", "USD" )).toEqual(expectedPopulatedCashAsset);
  });

  var testFixed = {
      _id: "1234",
      class: "Fixed Assets",
      name: "My mom's house",
      units: "",
      unitCost: "",
      totalCost: 50000,
      marketPrice: 53.23,
      marketValue: 90876.8756,
      location: "Japan",
      date_purchased: "01/15/1973",
      currency: "YEN"
  };

  var expectedPopulatedFixedAsset = {
      _id: "1234",
      class: "Fixed Assets",
      name: "My mom's house",
      units: -1,
      unitCost: -1,
      totalCost: 50000,
      marketPrice: -1,
      marketValue: 90876.8756,
      location: "Japan",
      date_purchased: "01/15/1973",
      currency: "YEN"
  };

  it("copyAndCalculateAmount() to create a copy of fixed asset with name, amount, location, date purchased and currency", function () {
    expect(Asset.copyAndCalculateAmount(testFixed)).toEqual(expectedPopulatedFixedAsset);
  });

  it("populate() will return an Asset object populated with class, name, amount, location, date purchased, currency if asset class is fixed asset", function () {
    expect(Asset.populate(testAsset3, "1234", "Fixed Assets", "My mom's house","","",50000,"Japan","01/15/1973", "YEN","123",90876.8756)).toEqual(expectedPopulatedFixedAsset);
  });

  var testCurr = {
      _id: "1234",
      class: "Foreign Currency",
      name: "US Dollars in eTrade",
      units: "",
      unitCost: "",
      totalCost: 50000,
      marketPrice: 53.23,
      marketValue: 5640,
      location: "Japan",
      date_purchased: "01/15/1973",
      currency: "YEN"
  };
  var expectedPopulatedForeignCurr = {
      _id: "1234",
      class: "Foreign Currency",
      name: "US Dollars in eTrade",
      units: -1,
      unitCost: -1,
      totalCost: 50000,
      marketPrice: -1,
      marketValue: 5640,
      location: "Japan",
      date_purchased: "01/15/1973",
      currency: "YEN"
  };

  it("copyAndCalculateAmount() to create a copy of foreign currency with name, amount, location, date purchased and currency", function () {
    expect(Asset.copyAndCalculateAmount(testCurr)).toEqual(expectedPopulatedForeignCurr);
  });

  it("populate() will return an Asset object populated with class, name, amount, location, date purchased, currency if asset class is foreign currency", function () {
    expect(Asset.populate(testAsset3, "1234", "Foreign Currency", "US Dollars in eTrade","","",50000,"Japan","01/15/1973", "YEN", 19.546, 5640)).toEqual(expectedPopulatedForeignCurr);
  });

  var testEquity = {
      _id: "9876",
      class: "Equities",
      name: "TEST",
      units: "100",
      unitCost: "10.50",
      totalCost: "",
      marketPrice: "13.54",
      marketValue: "",
      location: "Domestic",
      date_purchased: "7/23/2017",
      currency: "INR"
  };

  var expectedEquity = {
      _id: "9876",
      class: "Equities",
      name: "TEST",
      units: 100,
      unitCost: 10.50,
      totalCost: 1050,
      marketPrice: 13.54,
      marketValue: 1354,
      location: "Domestic",
      date_purchased: "7/23/2017",
      currency: "INR"
  };

  var expectedEquity2 = {
      _id: "1000",
      class: "Equities",
      name: "TESTDATA",
      units: 1000,
      unitCost: 10.40,
      totalCost: 10400,
      marketPrice: 9.23,
      marketValue: 9230,
      location: "CAN",
      date_purchased: "6/10/2080",
      currency: "USD"
  };

  it("copyAndCalculateAmount() to create a copy of  object with class, name, amount, location, date purchased, currency if asset class is equities", function () {
    expect(Asset.copyAndCalculateAmount(testEquity)).toEqual(expectedEquity);
  });

  it("populate() will return an Asset object populated with class, name, amount, location, date purchased, currency if asset class is equities", function () {
    expect(Asset.populate(testEquity, "1000", "Equities", "TESTDATA", "1000","10.40",50000,"CAN","6/10/2080", "USD", "9.23",60540)).toEqual(expectedEquity2);
  });


});
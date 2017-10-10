"use strict";

//Test Asset API calls for existance
describe("Service: AssetDataAPI, Service: APIResponseHandlersCommon", function () {

  // load the service"s module
  beforeEach(module("wealthManagerApp"));

  // instantiate service
  var AssetDataAPI, ResponseHandlers;
  beforeEach(inject(function (_AssetDataAPI_, _APIResponseHandlersCommon_) {
    AssetDataAPI = _AssetDataAPI_;
    ResponseHandlers = _APIResponseHandlersCommon_;
  }));


  it("AssetDataAPI service should exist", function() {
    expect(AssetDataAPI).toBeDefined();
  });

  it("getData() should exist", function (){
    expect(AssetDataAPI.getData()).toBeDefined();
  });

  it("deleteData() should exist", function () {
    expect(AssetDataAPI.deleteData()).toBeDefined();
  });

  it("postData() should exist", function () {
    expect(AssetDataAPI.postData()).toBeDefined();
  });

  it("updateData() should exist", function () {
    expect(AssetDataAPI.updateData()).toBeDefined();
  });
/*
  var asset = {
    class: "Equities",
    name: "TESTDATA",
    units: "1000",
    unitCost: "10.10",
    amount: "10100",
    location: "Domestic",
    date_purchased: "7/9/2012",
    currency: "USD"
  };

  //posting of test data
  it("Post test asset data with postData()", function () {
    expect(AssetDataAPI.postData(ResponseHandlers.successHandler_POST, ResponseHandlers.failureHandler_POST, asset)).toBeDefined();
  });

  */
  //get back test data to check connection
  it("Get back test asset data with getData()", function () {
    expect(AssetDataAPI.getData(ResponseHandlers.successHandler_GET, ResponseHandlers.failureHandler_GET)).toBeDefined();
  });
});
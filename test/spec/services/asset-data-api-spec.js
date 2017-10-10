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

});
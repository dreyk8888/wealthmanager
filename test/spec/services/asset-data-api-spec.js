"use strict";

describe("Service: AssetDataAPI", function () {

  // load the service"s module
  beforeEach(angular.mock.module("wealthManagerApp"));

  // instantiate service
  var AssetDataAPI;
  beforeEach(inject(function (_AssetDataAPI_) {
    AssetDataAPI = _AssetDataAPI_;
  }));

  // A simple test to verify the Users factory exists
  it("AssetDataAPI service should exist", function() {
    expect(AssetDataAPI).toBeDefined();
  });

  var dummy = function(){};
  it("getData() should exist", function (){
    expect(AssetDataAPI.getData(dummy, dummy)).toBeDefined();
  });

  it("deleteData() should exist", function () {
    expect(AssetDataAPI.deleteData({},{},"")).toBeDefined();
  });

  it("postData() should exist", function () {
    expect(AssetDataAPI.postData({},{},{})).toBeDefined();
  });

  it("updateData() should exist", function () {
    expect(AssetDataAPI.updateData({},{},"")).toBeDefined();
  });
});
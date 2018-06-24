"use strict";

//Test Debt API calls for existance
describe("Service: DebtDataAPI", function () {

  // load the service"s module
  beforeEach(module("wealthManagerApp"));

  // instantiate service
  var DebtDataAPI, ResponseHandlers;
  beforeEach(inject(function (_DebtDataAPI_) {
    DebtDataAPI = _DebtDataAPI_;
  }));


  it("DebtDataAPI service should exist", function() {
    expect(DebtDataAPI).toBeDefined();
  });

  it("getData() should exist", function (){
    expect(DebtDataAPI.getData()).toBeDefined();
  });

  it("deleteData() should exist", function () {
    expect(DebtDataAPI.deleteData()).toBeDefined();
  });

  it("postData() should exist", function () {
    expect(DebtDataAPI.postData()).toBeDefined();
  });

  it("updateData() should exist", function () {
    expect(DebtDataAPI.updateData()).toBeDefined();
  });
});
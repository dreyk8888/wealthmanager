"use strict";

//Test generic response handlers
describe("Service: APIResponseHandlersCommon", function () {

  // load the service"s module
  beforeEach(angular.mock.module("wealthManagerApp"));

  var ResponseHandlers;
  beforeEach(inject(function(_APIResponseHandlersCommon_){
    ResponseHandlers = _APIResponseHandlersCommon_;
  }));

  it("APIResponseHandlersCommon service should exist", function() {
    expect(ResponseHandlers).toBeDefined();
  });

  it("successHandler_GET should exist", function (){
    expect(ResponseHandlers.successHandler_GET()).toBeDefined();
  });

  it("failureHandler_GET should exist", function (){
    expect(ResponseHandlers.failureHandler_GET()).toBeDefined();
  });

  it("successHandler_POST should exist", function (){
    expect(ResponseHandlers.successHandler_POST()).toBeDefined();
  });

  it("failureHandler_POST should exist", function (){
    expect(ResponseHandlers.failureHandler_POST()).toBeDefined();
  });

  it("successHandler_PUT should exist", function (){
    expect(ResponseHandlers.successHandler_PUT()).toBeDefined();
  });

  it("failureHandler_PUT should exist", function (){
    expect(ResponseHandlers.failureHandler_PUT()).toBeDefined();
  });

  it("successHandler_DELETE should exist", function (){
    expect(ResponseHandlers.successHandler_DELETE()).toBeDefined();
  });

  it("failureHandler_DELETE should exist", function (){
    expect(ResponseHandlers.failureHandler_DELETE()).toBeDefined();
  });

});
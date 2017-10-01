'use strict';

describe('Service: PortfolioCalcs', function () {

  // load the service's module
  beforeEach(module('wealthManagerApp'));

  // instantiate service
  var PortfolioCalcs;
  beforeEach(inject(function (_PortfolioCalcs_) {
    PortfolioCalcs = _PortfolioCalcs_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect(PortfolioCalcs).toBeDefined();
  });

  it('has a dummy test to test 1+3', function () {
    expect(1+3).toEqual(4);
  });

  it('has a dummy test to test 4+3', function () {
    expect(4+3).toEqual(7);
  });

});

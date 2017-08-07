'use strict';

describe('Service: portfolioDataEntry', function () {

  // load the service's module
  beforeEach(module('wealthManagerApp'));

  // instantiate service
  var portfolioDataEntry;
  beforeEach(inject(function (_portfolioDataEntry_) {
    portfolioDataEntry = _portfolioDataEntry_;
  }));

  it('should do something', function () {
    expect(!!portfolioDataEntry).toBe(true);
  });

});

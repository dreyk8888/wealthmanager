'use strict';

describe('Controller: PortfolioentryCtrl', function () {

  // load the controller's module
  beforeEach(module('wealthManagerApp'));

  var PortfolioentryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PortfolioentryCtrl = $controller('PortfolioentryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PortfolioentryCtrl.awesomeThings.length).toBe(3);
  });
});

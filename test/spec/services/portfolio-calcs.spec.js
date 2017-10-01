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

  var mockDataEmpty = [];
  var mockAssetDataFloat = [
    {
      class: 'Equities',
      amount: 50123
    },
    {
      class: 'Cash',
      amount: 100002.4556
    },
    {
      class: 'Fixed Assets',
      amount: 0.455698798
    },
    {
      class: 'Fixed Income',
      amount: 1.5023e6
    }
  ];

  var mockAssetDataZeroes = [
    {
      class: 'Equities',
      amount: 0
    },
    {
      class: 'Equities',
      amount: 0.00000
    }
  ];

  var mockAssetDataNegative = [
    {
      class: 'Equities',
      amount: -23320
    },
    {
      class: 'Equities',
      amount: -50000
    }
  ];

  var mockDebtDataFloat = [
    {
      type: 'Short term',
      amount: 5.183465e8
    },
    {
      class: 'Long term',
      amount: 100002.4556
    },
    {
      class: 'Short term',
      amount: 0.475698798
    },
    {
      class: 'Long term',
      amount: 1.5023e7
    }
  ];

  //test that decimals are rounded to 2 decimal places correctly
  var mockDataRoundingUp = [
    {
      type: 'Short term',
      amount: 0.123
    },
    {
      class: 'Long term',
      amount: 0.126
    }
  ];

  var mockDataRoundingDown = [
    {
      type: 'Short term',
      amount: 0.123
    },
    {
      class: 'Long term',
      amount: 0.121
    }
  ];

  it('totalCalc() should exist', function () {
    expect(PortfolioCalcs.totalCalc(mockDataEmpty)).toBeDefined();
  });

  it('totalCalc(asset data) with large float and exponentials should calculate the correct total with 2 decimal places', function () {
    expect(PortfolioCalcs.totalCalc(mockAssetDataFloat)).toEqual('1652425.91');
  });

  it('totalCalc(asset data) with zeroes should return 0.00', function () {
    expect(PortfolioCalcs.totalCalc(mockAssetDataZeroes)).toEqual('0.00');
  });

  it('totalCalc(asset data) with negatives should return negative number with 2 decimals', function () {
    expect(PortfolioCalcs.totalCalc(mockAssetDataNegative)).toEqual('-73320.00');
  });

  it('totalCalc(debt data) with large float and exponentials should calculate total with 2 decimal places', function () {
    expect(PortfolioCalcs.totalCalc(mockDebtDataFloat)).toEqual('533469502.93');
  });

  it('totalCalc(data) if 3rd decimal >= 5, should round up', function () {
    expect(PortfolioCalcs.totalCalc(mockDataRoundingUp)).toEqual('0.25');
  });

  it('totalCalc(data) if 3rd decimal >= 5, should round up', function () {
    expect(PortfolioCalcs.totalCalc(mockDataRoundingDown)).toEqual('0.24');
  });

});

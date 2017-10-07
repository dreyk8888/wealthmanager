'use strict';

describe('Service: PortfolioCalcs', function () {

  // load the service's module
  beforeEach(angular.mock.module('wealthManagerApp'));

  // instantiate service
  var PortfolioCalcs;
  beforeEach(inject(function (_PortfolioCalcs_) {
    PortfolioCalcs = _PortfolioCalcs_;
  }));

  var PortfolioCalcsMock;
  beforeEach(inject(function(_PortfolioCalcsMockData_){
    PortfolioCalcsMock = _PortfolioCalcsMockData_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect(PortfolioCalcs).toBeDefined();
  });

  it('has a dummy test to test 1+3', function () {
    expect(1+3).toEqual(4);
  });


  it('totalCalc() should exist', function () {
    expect(PortfolioCalcs.totalCalc(PortfolioCalcsMock.mockDataEmpty, 'amount')).toBeDefined();
  });

  it('totalCalc(asset data) with large float and exponentials should calculate the correct total with 2 decimal places (returns a string due to fixed function)', function () {
    expect(PortfolioCalcs.totalCalc(PortfolioCalcsMock.mockAssetDataFloat, 'amount')).toEqual('27489628.17');
  });

  it('totalCalc(asset data) with zeroes should return 0.00 (returns a string due to fixed function)', function () {
    expect(PortfolioCalcs.totalCalc(PortfolioCalcsMock.mockAssetDataZeroes, 'amount')).toEqual('0.00');
  });

  it('totalCalc(asset data) with negatives should return negative number with 2 decimals (returns a string due to fixed function)', function () {
    expect(PortfolioCalcs.totalCalc(PortfolioCalcsMock.mockAssetDataNegative, 'amount')).toEqual('-73320.00');
  });

  it('totalCalc(debt data) with large float and exponentials should calculate total with 2 decimal places', function () {
    expect(PortfolioCalcs.totalCalc(PortfolioCalcsMock.mockDebtDataFloat, 'amount')).toEqual('533469502.93');
  });

  it('totalCalc(data) if 3rd decimal >= 5, should round up', function () {
    expect(PortfolioCalcs.totalCalc(PortfolioCalcsMock.mockDataRoundingUp, 'amount')).toEqual('0.25');
  });

  it('totalCalc(data) if 3rd decimal >= 5, should round up', function () {
    expect(PortfolioCalcs.totalCalc(PortfolioCalcsMock.mockDataRoundingDown, 'amount')).toEqual('0.24');
  });

  it('perTypeTotalCalc() should exist', function () {
    expect(PortfolioCalcs.totalCalc(PortfolioCalcsMock.mockDataEmpty, 'amount')).toBeDefined();
  });


  it('perTypeTotalPercentCalc() should calculate right total for float and exponentials', function () {
    expect(PortfolioCalcs.perTypeTotalCalc(PortfolioCalcsMock.mockDataEmpty, 'amount')).toBeDefined();
  });

  var expectedEmptyArray = [];
  it('perTypeTotalCalc() should return empty array if given an empty object', function () {
    expect(PortfolioCalcs.perTypeTotalCalc(PortfolioCalcsMock.mockDataEmpty, 'class', 'amount')).toEqual(expectedEmptyArray);
  });

  var expectedEmptyZeroes = [
    {
      type: 'Fixed Assets',
      total: 0
    },
    {
      type: 'Cash',
      total: 0
    },
    {
      type: 'Equities',
      total: 0
    }
  ];

  it('perTypeTotalCalc() should return array of zeroes if given an array of zeroes', function () {
    expect(PortfolioCalcs.perTypeTotalCalc(PortfolioCalcsMock.mockAssetDataZeroes, 'class', 'amount')).toEqual(expectedEmptyZeroes);
  });

  var expectedNegativeDebtData = [
    {
      type: 'Long term',
      total: -15123002.4556
    },
    {
       type: 'Short term',
       total: -518346499.524301202
    }
  ];
  it('perTypeTotalCalc() should handle negative values', function () {
    expect(PortfolioCalcs.perTypeTotalCalc(PortfolioCalcsMock.mockDebtDataNegatives, 'type', 'amount')).toEqual(expectedNegativeDebtData);
  });

  //expected order is whichever order it encounters all the types/classes
  var expectedDataMockAssetDataFloat = [
    {
      type: 'Equities',
      total: 70123
    },
    {
      type: 'Cash',
      total: 25466899.6116
    },
    {
      type: 'Fixed Assets',
      total: 450305.555698798
    },
    {
       type: 'Fixed Income',
       total: 1.5023e6
    }
  ];

  it('perTypeTotalCalc() should calculate right total for Asset data', function () {
    expect(PortfolioCalcs.perTypeTotalCalc(PortfolioCalcsMock.mockAssetDataFloat, 'class', 'amount')).toEqual(expectedDataMockAssetDataFloat);
  });

  var expectedDataMockDebtDataFloat = [
    {
      type: 'Long term',
      total: 15123002.4556
    },
    {
       type: 'Short term',
       total: 518346500.475698798
    }
  ];

  it('perTypeTotalCalc() should calculate right total for debt data', function () {
    expect(PortfolioCalcs.perTypeTotalCalc(PortfolioCalcsMock.mockDebtDataFloat, 'type', 'amount')).toEqual(expectedDataMockDebtDataFloat);
  });

  var expectedDataMockDebtDataPercent = [
    {
      type: 'Long term',
      total: 15123002.4556,
      percentage: '2.83'
    },
    {
       type: 'Short term',
       total: 518346500.475698798,
       percentage: '97.17'
    }
  ];

  it('perTypeTotalPercentCalc() should calculate right total and percentage for debt data', function () {
    expect(PortfolioCalcs.perTypeTotalPercentCalc(PortfolioCalcsMock.mockDebtDataFloat, 'type', 'amount')).toEqual(expectedDataMockDebtDataPercent);
  });

  var expectedDataMockAssetDataPercent = [
    {
      type: 'Equities',
      total: 70123,
      percentage: '0.26'
    },
    {
      type: 'Cash',
      total: 25466899.6116,
      percentage: '92.64'
    },
    {
      type: 'Fixed Assets',
      total: 450305.555698798,
      percentage: '1.64'
    },
    {
       type: 'Fixed Income',
       total: 1.5023e6,
      percentage: '5.46'
    }
  ];
  it('perTypeTotalPercentCalc() should calculate right total and percentage for asset data', function () {
    expect(PortfolioCalcs.perTypeTotalPercentCalc(PortfolioCalcsMock.mockAssetDataFloat, 'class', 'amount')).toEqual(expectedDataMockAssetDataPercent);
  });

});

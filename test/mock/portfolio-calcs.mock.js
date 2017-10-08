//portfolio-calcs.mock.js
//Mock data for testing functions in portfolio-calcs.js
angular.module("wealthManagerApp")
  .service("PortfolioCalcsMockData", function() {
    this.mockDataEmpty = [];
    this.mockAssetDataFloat = [
      {
        class: "Equities",
        amount: 50123
      },
      {
        class: "Cash",
        amount: 100002.4556
      },
      {
        class: "Fixed Assets",
        amount: 0.455698798
      },
      {
        class: "Fixed Income",
        amount: 1.5023e6
      },
      {
        class: "Equities",
        amount: 20000
      },
      {
        class: "Fixed Assets",
        amount: 450305.10
      },
      {
        class: "Cash",
        amount: 25366897.156
      },
    ];

    this.mockAssetDataZeroes = [
      {
        class: "Fixed Assets",
        amount: 0.0
      },
      {
        class: "Cash",
        amount: 0
      },
      {
        class: "Equities",
        amount: 0
      },
      {
        class: "Fixed Assets",
        amount: 0.0000000
      },

      {
        class: "Equities",
        amount: 0.00000
      }
    ];

    this.mockAssetDataContainsZeroes = [
      {
        class: "Fixed Assets",
        amount: 100
      },
      {
        class: "Cash",
        amount: 0.00
      },
      {
        class: "Equities",
        amount: 0
      },
      {
        class: "Fixed Assets",
        amount: 0.0000000
      },

      {
        class: "Equities",
        amount: 100.00000
      }
    ];

    this.mockAssetDataNegative = [
      {
        class: "Equities",
        amount: -23320
      },
      {
        class: "Equities",
        amount: -35000
      },
      {
        class: "Cash",
        amount: -10000
      },
      {
        class: "Fixed Income",
        amount: -5000
      }
    ];

    this.mockDebtDataNegatives = [
      {
        type: "Long term",
        amount: -100002.4556
      },
      {
        type: "Short term",
        amount: -5.183465e8
      },
      {
        type: "Short term",
        amount: 0.475698798
      },
      {
        type: "Long term",
        amount: -1.5023e7
      }
    ];

    this.mockDebtDataFloat = [
      {
        type: "Long term",
        amount: 100002.4556
      },
      {
        type: "Short term",
        amount: 5.183465e8
      },
      {
        type: "Short term",
        amount: 0.475698798
      },
      {
        type: "Long term",
        amount: 1.5023e7
      }
    ];

    //test that decimals are rounded to 2 decimal places correctly
    this.mockDataRoundingUp = [
      {
        type: "Short term",
        amount: 0.123
      },
      {
        class: "Long term",
        amount: 0.126
      }
    ];

    this.mockDataRoundingDown = [
      {
        type: "Short term",
        amount: 0.123
      },
      {
        class: "Long term",
        amount: 0.121
      }
    ];

});
// Karma configuration
// Generated on 2017-06-08

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      'bower_components/tv4/tv4.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/objectpath/lib/ObjectPath.js',
      'bower_components/angular-schema-form/dist/schema-form.js',
      'bower_components/angular-schema-form/dist/bootstrap-decorator.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/chart.js/dist/Chart.js',
      'bower_components/angular-chart.js/dist/angular-chart.js',
      'bower_components/highcharts/highcharts.js',
      'bower_components/highcharts-ng/dist/highcharts-ng.js',
      'bower_components/moment/moment.js',
      'bower_components/angularjs-slider/dist/rzslider.js',
      'bower_components/pickadate/lib/picker.js',
      'bower_components/pickadate/lib/picker.date.js',
      'bower_components/pickadate/lib/picker.time.js',
      'bower_components/angular-schema-form-datepicker/bootstrap-datepicker.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
	  //'Firefox'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
	  'karma-chrome-launcher',
	  'karma-firefox-launcher',
    'karma-spec-reporter'
    ],

    reporters: ['spec'],

     specReporter: {
        maxLogLines: 5,             // limit number of lines logged per test
        suppressErrorSummary: true, // do not print error summary
        suppressFailed: false,      // do not print information about failed tests
        suppressPassed: false,      // do not print information about passed tests
        suppressSkipped: true,      // do not print information about skipped tests
        showSpecTiming: false,      // print the time elapsed for each spec
        failFast: true              // test would finish with error when a first fail occurs.
      },
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};

'use strict';

/**
 * @ngdoc service
 * @name wealthManagerApp.wealthManagerData
 * @description
 * # wealthManagerData
 * Service in the wealthManagerApp to access API and retrieve asset data
 */
angular.module('wealthManagerApp')
    .service('APIResponseHandlersCommon', function() {
        //api success/failure error handling

    this.successHandler_GET = function successHandler_GET() {
        console.log ('API error: Successfully to retrieved data!');
    };
    this.failure_Handler_GET = function failureHandler_GET() {
        console.log ('API error: Failed to retrieve data!');
    };
    this.successHandler_POST = function successHandler_POST(data) {
        console.log ("API Success: Posted" + data);
    };

    this.failureHandler_POST = function failureHandler_POST() {
        console.log ('API Error: Failed to post data!');
    };

    this.successHandler_PUT = function successHandler_PUT(data) {
        console.log ("API Success: Updated" + data);
    };

    this.failureHandler_PUT = function failureHandler_PUT() {
        console.log ('API Error: Failed to update data!');
    };

    this.successHandler_DELETE = function successHandler_DELETE(id) {
        console.log ("API Success: Deleting:" + id);
    };

    this.failureHandler_DELETE = function failureHandler_DELETE() {
        console.log ('API Error: Failed to delete data!');
    };

});

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./index.html": 2,
	"./styles/style.pcss": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Report</title>\n  <link rel=\"stylesheet\" href=\"file://{{viewsPath}}/css/style.css\">\n</head>\n<body>\n<div class=\"report-page\">\n  <div class=\"page-title\">\n    <p><span class=\"title\">{{reportName}}:</span> {{from}} - {{to}}</p>\n  </div>\n\n  <div class=\"breadcrumbs\">\n    <p class=\"name\">{{client.name}}</p>\n  </div>\n\n  <div class=\"cols-row\">\n    <div class=\"col\">\n      <span class=\"title\">Hours Tracked</span>\n      <span class=\"val text-lg\"><strong>{{hours totalHours}}</strong></span>\n    </div>\n    <div class=\"col\">\n      <span class=\"title\">Billable Hours</span>\n      <span class=\"val text-sm\"><strong>{{hours totalBillableHours}}</strong> Billable</span>\n      <span class=\"val text-sm\"><strong>{{hours totalUnbillableHours}}</strong> Non-Billable</span>\n    </div>\n    <div class=\"col\">\n      <span class=\"title\">Billable Amount</span>\n      <span class=\"val text-lg\"><strong>{{currency totalAmount}}</strong></span>\n    </div>\n    <div class=\"col\">\n      <span class=\"title\">Uninvoiced Amount</span>\n      <span class=\"val text-lg\"><strong>{{currency totalUninvoicedAmount}}</strong></span>\n    </div>\n  </div>\n\n  <div class=\"table-box\">\n    <h2>Team Report</h2>\n\n    <table class=\"table\">\n      <thead>\n      <tr>\n        <th>Name</th>\n        <th>Hours</th>\n        <th></th>\n        <th>Billable Hours</th>\n        <th>Billable Amount</th>\n      </tr>\n      </thead>\n      <tbody>\n      {{#each tasks}}\n      <tr>\n        <td>{{this.taskName}}</td>\n        <td>{{hours this.totalHours}}</td>\n        <td>\n          <span class=\"percent-line\" style=\"width: {{percentFromMax}}%\"></span>\n        </td>\n        <td>{{hours this.billableHours}} ({{billablePercent}}%)</td>\n        <td style=\"font-weight: bold;\">{{currency this.totalAmount}}</td>\n      </tr>\n\n      {{#each this.items}}\n      <tr style=\"background: #f8f8f8;\">\n        <td><img src=\"{{this.avatar}}\" width=\"25\" height=\"25\" alt=\"\"> <span class=\"name\">{{this.fullName}}</span></td>\n        <td>{{hours this.totalHours}}</td>\n        <td>\n          <span class=\"percent-line\" style=\"width: {{percentFromMax}}%\"></span>\n        </td>\n        <td>{{hours this.billableHours}} ({{billablePercent}}%)</td>\n        <td>{{currency this.totalAmount}}</td>\n      </tr>\n      {{/each}}\n\n      {{/each}}\n      <tr>\n        <td>Total</td>\n        <td><strong>{{hours totalHours}}</strong></td>\n        <td></td>\n        <td><strong>{{hours totalBillableHours}}</strong></td>\n        <td><strong>{{currency totalAmount}}</strong></td>\n      </tr>\n      </tbody>\n    </table>\n\n    <!--<h2>Team Members</h2>-->\n    <!--<div class=\"cols-row\">-->\n    <!--<div class=\"col\">-->\n    <!--<img src=\"/Users/andrew/work/bane/modules/harvest-reports/avatars/andrew.png\" width=\"210\" alt=\"\"/>-->\n    <!--<p>Andrew Orsich</p>-->\n    <!--</div>-->\n    <!--<div class=\"col\">-->\n    <!--<img src=\"/Users/andrew/work/bane/modules/harvest-reports/avatars/andrew.png\" width=\"210\" alt=\"\"/>-->\n    <!--<p>Andrew Orsich</p>-->\n    <!--</div>-->\n    <!--<div class=\"col\">-->\n    <!--<img src=\"/Users/andrew/work/bane/modules/harvest-reports/avatars/andrew.png\" width=\"210\" alt=\"\"/>-->\n    <!--<p>Andrew Orsich</p>-->\n    <!--</div>-->\n    <!--<div class=\"col\">-->\n    <!--<img src=\"/Users/andrew/work/bane/modules/harvest-reports/avatars/andrew.png\" width=\"210\" alt=\"\"/>-->\n    <!--<p>Andrew Orsich</p>-->\n    <!--</div>-->\n    <!--</div>-->\n\n  </div>\n\n  {{#if moreThanOneProject}}\n  <div style=\"page-break-before: always;\">\n    <div class=\"table-box\">\n      <h2>Projects Report</h2>\n\n      <table class=\"table\">\n        <thead>\n        <tr>\n          <th>Name</th>\n          <th>Hours</th>\n          <th></th>\n          <th>Billable Hours</th>\n          <th>Billable Amount</th>\n        </tr>\n        </thead>\n        <tbody>\n        {{#each projects}}\n        <tr>\n          <td>{{this.projectName}}</td>\n          <td>{{hours this.totalHours}}</td>\n          <td>\n            <span class=\"percent-line\" style=\"width: {{percentFromMax}}%\"></span>\n          </td>\n          <td>{{hours this.billableHours}} ({{billablePercent}}%)</td>\n          <td style=\"font-weight: bold;\">{{currency this.totalAmount}}</td>\n        </tr>\n        {{/each}}\n        <tr>\n          <td>Total</td>\n          <td><strong>{{hours totalHours}}</strong></td>\n          <td></td>\n          <td><strong>{{hours totalBillableHours}}</strong></td>\n          <td><strong>{{currency totalAmount}}</strong></td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n  {{/if}}\n\n  <div style=\"page-break-before: always;\">\n    <div class=\"table-box\">\n      <h2>Detailed Time Report</h2>\n      <table class=\"table table-stats\">\n        <thead>\n        <tr>\n          <th>Person</th>\n          <th>Date</th>\n          <th>Project</th>\n          <th>Task</th>\n          <th>Hours</th>\n        </tr>\n        </thead>\n        <tbody>\n        {{#each detailsEntries}}\n        <tr style=\"background: #f8f8f8\">\n          <td><strong>{{this.fullName}}</strong></td>\n          <td></td>\n          <td></td>\n          <td></td>\n          <td><strong>{{hours this.totalHours}}</strong></td>\n        </tr>\n        {{#each this.notes}}\n        <tr>\n          <td style=\"border: 0;\"></td>\n          <td style=\"border: 0;\">{{this.spentOn}}</td>\n          <td style=\"border: 0;\">{{this.projectName}}</td>\n          <td style=\"border: 0;\">{{this.taskName}}</td>\n          <td style=\"border: 0;\">{{hours this.hoursWorked}}</td>\n        </tr>\n        {{#if this.notes}}\n        <tr>\n          <td style=\"border: 0;\"></td>\n          <td style=\"border-top: 0;\" colspan=\"4\">\n            <span class=\"desc\">{{this.notes}}</span>\n          </td>\n        </tr>\n        {{/if}}\n        {{/each}}\n        {{/each}}\n        <tr>\n          <td></td>\n          <td></td>\n          <td></td>\n          <td></td>\n          <td>Total  <strong>{{hours totalHours}}</strong></td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n</div>\n</body>\n</html>";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
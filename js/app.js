'use strict';

/* App Module */

var expenseApp = angular.module('expenseApp', [
  'ngRoute',
  'ngResource',
  'expenseControllers',
  'expenseServices'
],function($interpolateProvider){
  //$interpolateProvider.startSymbol('[[');
  //$interpolateProvider.endSymbol(']]');
});
angular.module('myApp', ['angular-loading-bar'])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
    cfpLoadingBarProvider.latencyThreshold = 100;
  }]);

expenseApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      }).
      when('/login/admin',{
        templateUrl:'partials/Admin/adminLogin.html',
        controller:'adminLoginCtrl'
      }).

      when('/login/manager',{
        templateUrl:'partials/Manager/managerLogin.html',
        controller:'managerLoginCtrl'
      }).

      when('/login/employee',{
        templateUrl:'partials/Employee/employeeLogin.html',
        controller:'employeeLoginCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);

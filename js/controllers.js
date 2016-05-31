'use strict';

/* Controllers */

var expenseControllers = angular.module('expenseControllers', ['ngRoute']);

expenseControllers.controller('loginCtrl', ['$scope','$location',
  function($scope,$location) {
    //$scope.phones = Phone.query();

            $scope.authenticate = function (username) {
                // write authentication code here.. 
               if (username=="admin")
                {
                	$location.path('/login/admin' )//+ username)
                }
                 if (username=="manager")
                {
                	$location.path('/login/manager')// + username)
                }
                 if (username=="user")
                {
                	$location.path('/login/employee')//+ username)
                }
                
            };
  }]);

     expenseControllers.controller("adminLoginCtrl", function ($scope, $routeParams,EmployeeData) {
           // $scope.username = $routeParams.username;
           $scope.Employees = EmployeeData.query();
        });
          expenseControllers.controller("managerLoginCtrl", function ($scope, $routeParams) {
            $scope.username = $routeParams.username;
        });
               expenseControllers.controller("employeeLoginCtrl", function ($scope, $routeParams) {
            $scope.username = $routeParams.username;
        });
'use strict';

/* Services */

var expenseServices = angular.module('expenseServices', ['ngResource']);

expenseServices.factory('EmployeeData', function($resource) {
    return $resource('http://localhost:8082/fetchdata', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});

expenseServices.factory('InsertEmployeeData', function($resource) {
    return $resource('http://localhost:8082/insertEmployee/:id', {
        id: '@_enumber'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
expenseServices.factory('UpdateEmployeeData', function($resource) {
    // body...
    return $resource('http://localhost:8082/UpdateEmployee/:emp_number', {
        emp_number: '@enumber'
    }, {
        update: {
            method: 'PUT'
        }
    });
});

expenseServices.factory('fetchonedata', function($resource) {
    // body...
    return $resource('http://localhost:8082/fetchonedata/:emp_number', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
});

expenseServices.factory('deleteEmployee', function($resource) {
    // body...
    return $resource('http://localhost:8082/deleteEmployee/:emp_number', {}, {
        delete: {
            method: 'DELETE'
        }
    });
});
expenseServices.factory('ExpenseType',function ($resource) {
	// body...
	return $resource('http://localhost:8082/expenseType/:id',{},{
		query: {
            method: 'GET',
            isArray: true
        },
        update:{
        	method:'PUT'
        },
        delete:{
        	method:'DELETE'
        }
	});
});

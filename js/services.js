'use strict';

/* Services */

var expenseServices = angular.module('expenseServices', ['ngResource']);

expenseServices.factory('EmployeeData',function($resource){
return $resource('http://localhost:8082/fetchdata',{},{
	query:{method:'GET',isArray:true}
});
});
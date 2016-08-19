'use strict';

/* Controllers */

var expenseControllers = angular.module('expenseControllers', ['ngRoute']);

expenseControllers.controller('loginCtrl', ['$scope', '$location',
    function($scope, $location) {
        //$scope.phones = Phone.query();

        $scope.authenticate = function(username) {
            // write authentication code here.. 
            if (username == "admin") {
                $location.path('/login/admin') //+ username)
            }
            if (username == "manager") {
                $location.path('/login/manager') // + username)
            }
            if (username == "user") {
                $location.path('/login/employee') //+ username)
            }

        };
    }
]);

expenseControllers.controller("adminLoginCtrl", function($scope, $routeParams, EmployeeData, InsertEmployeeData, fetchonedata, UpdateEmployeeData, deleteEmployee) {
    // $scope.username = $routeParams.username;
    $scope.getAll = function() {
        // body...
        $scope.Employees = EmployeeData.query();
    }

    $scope.Iemp = new InsertEmployeeData();
    $scope.Eemp = new UpdateEmployeeData();
    $scope.Demp = new deleteEmployee();
    $scope.showCreateForm = function() {
        // clear form
        $scope.clearForm();

        // change modal title
        $('#modal-product-title').text("Add New Employee");

        // hide update product button
        $('#btn-update-product').hide();

        // show create product button
        $('#btn-create-product').show();

    }

    // retrieve record to fill out the form
    $scope.readOne = function(id) {

        // change modal title
        $('#modal-product-title').text("Edit Employee");

        // show udpate product button
        $('#btn-update-product').show();

        // show create product button
        $('#btn-create-product').hide();

        // post id of product to be edited
        var entry = fetchonedata.query({
            emp_number: id
        }, function(data) {
            console.log(data);
            $scope.enumber = data[0]["emp_number"];
            $scope.fname = data[0]["emp_firstname"];
            $scope.lname = data[0]["emp_lastname"];

            $('#modal-product-form').openModal();
        });
    }

    // clear variable / form values
    $scope.clearForm = function() {
        $scope.id = "";
        $scope.fname = "";
        $scope.lname = "";
        $scope.enumber = "";
    }
    //delete employee
    $scope.deleteEmployee = function(id) {
        // body...
        //$scope.enumber=id;

        // ask the user if he is sure to delete the record
        if (confirm("Are you sure?")) {
            $scope.Demp.$delete({
                emp_number: id
            }, function(emp) {
                // body...
                console.log(emp);
                // tell the user product was deleted
                Materialize.toast(emp.Data, 4000);

                // refresh the list
                $scope.getAll();
            });
        }
    }
    ///edit employee
    $scope.editEmployee = function() {
        $scope.Eemp.fname = $scope.fname;
        $scope.Eemp.lname = $scope.lname;
        $scope.Eemp.enumber = $scope.enumber;
        $scope.Eemp.$update($scope.enumber, function(emp) {
            //updated in the backend
            console.log(emp);
            // tell the user product record was updated
            Materialize.toast(emp.Data, 4000);

            // close modal
            $('#modal-product-form').closeModal();

            // clear modal content
            $scope.clearForm();

            // refresh the product list
            $scope.getAll();
        });
    }
    // create new Employee 
    $scope.createEmployee = function() {

        $scope.Iemp.fname = $scope.fname;
        $scope.Iemp.lname = $scope.lname;
        $scope.Iemp.enumber = $scope.enumber;
        InsertEmployeeData.save($scope.Iemp, function(emp) {
            // body...
            console.log(emp.Data);
            // tell the user new product was created
            Materialize.toast(emp.Data, 4000);
            // close modal
            $('#modal-product-form').closeModal();
            // clear modal content
            $scope.clearForm();

            // refresh the list
            $scope.getAll();

        });
    }

});
expenseControllers.controller('adminExpenseTypeCtrl', function($scope, $routeParams, ExpenseType) {
    // body...
    //$scope.Iexp = new InsertExpenseType();
    $scope.exp = new ExpenseType();
    $scope.getAll = function(argument) {
        // body...
        $scope.ExpenseType = ExpenseType.query();
    }
    $scope.showCreateForm = function() {
        // clear form
        $scope.clearForm();


        // change modal title
        $('#modal-product-title').text("Add new expense type");

        // hide update product button
        $('#btn-update-product').hide();

        // show create product button
        $('#btn-create-product').show();

    }
    $scope.createExpenseType = function(argument) {
        // body...
        $scope.exp.expenseName = $scope.expenseName;
        ExpenseType.save($scope.exp, function(exp) {
            // body...
            // tell the user new product was created
            Materialize.toast(exp.Data, 4000);
            // close modal
            $('#modal-product-form').closeModal();
            // clear modal content
            $scope.clearForm();

            // refresh the list
            $scope.getAll();
        })
    }
    $scope.readOne = function(id) {
        // body...

        // change modal title
        $('#modal-product-title').text("Edit expense type");

        // show udpate product button
        $('#btn-update-product').show();

        // show create product button
        $('#btn-create-product').hide();
        ExpenseType.query({
            id: id
        }, function(data) {
            // body...
            console.log(data);
            $scope.expenseName = data[0]["expenseName"];
            $scope.id = data[0]["id"];
            $('#modal-product-form').openModal();
        });
    }
    $scope.editExpenseType = function(argument) {
        // body...
        $scope.exp.expenseName = $scope.expenseName;
        $scope.exp.id = $scope.id;
        //$scope.Eemp.enumber = $scope.enumber;
        $scope.exp.$update({
            id: $scope.id
        }, function(exp) {
            // body...
            // tell the user new product was created
            Materialize.toast(exp.Data, 4000);
            // close modal
            $('#modal-product-form').closeModal();
            // clear modal content
            $scope.clearForm();

            // refresh the list
            $scope.getAll();
        })
    }
    $scope.deleteExpenseType = function(id) {
        // body...

        // ask the user if he is sure to delete the record
        if (confirm("Are you sure?")) {
            $scope.exp.$delete({
                id: id
            }, function(emp) {
                // body...

                // tell the user product was deleted
                Materialize.toast(emp.Data, 4000);
                // refresh the list
                $scope.getAll();
            });
        }
    }
    // clear variable / form values
    $scope.clearForm = function() {
        // body...
        $scope.expenseName = "";
        $scope.id = "";
    }
});

expenseControllers.controller('employeeDashboardCtrl',function ($scope,Expense) {
    // body...
    $scope.exp=new Expense();
    $scope.getAll=function (argument) {
        // body...
        $scope.Expense=Expense.query();
    }
});


expenseControllers.controller("managerLoginCtrl", function($scope, $routeParams) {
    $scope.username = $routeParams.username;
});
expenseControllers.controller("employeeLoginCtrl", function($scope, $routeParams) {
    $scope.username = $routeParams.username;
});
expenseControllers.controller('SidebarController', function($scope) {

    $scope.state = false;

    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };

});

expenseControllers.directive('sidebarDirective', function() {
    return {
        link: function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                if (newVal) {
                    element.addClass('show');
                    return;
                }
                element.removeClass('show');
            });
        }
    };
});
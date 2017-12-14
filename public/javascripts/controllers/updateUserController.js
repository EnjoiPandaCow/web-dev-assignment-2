var app = angular.module('ShyftWebApp');

app.controller('updateUserController', ['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService) {
    // create a message to display in our view
    $scope.message = 'Edit User Page!';

    $scope.formData = {};
    $scope.formData.fName = myService.fName;
    $scope.formData.lName = myService.lName;
    $scope.formData.email = myService.email;
    $scope.formData.password = myService.password;
    $scope.formData.contactNo = myService.contactNo;
    $scope.formData.street = myService.street;
    $scope.formData.town = myService.town;
    $scope.formData.county = myService.county;

    $scope.updateUser = function () {
        $http.put('/users/' + myService.identity0, $scope.formData)
            .success(function (data) {

                $location.path('/users');
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data)
            });
    };
}
]);

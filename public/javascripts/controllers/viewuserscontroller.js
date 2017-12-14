var app = angular.module('ShyftWebApp');

app.controller('viewusersController', ['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService) {

    findAll();

    function findAll() {
        $http.get('/users')
            .success(function (data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error ' + data);
            });
    }

    $scope.update = function(user_details) {


        myService.fName = user_details.fName;
        myService.lName = user_details.lName;
        myService.email = user_details.email;
        myService.password = user_details.password;
        myService.contactNo = user_details.contactNo;
        myService.street = user_details.street;
        myService.town = user_details.town;
        myService.county = user_details.county;
        myService.identity0 = user_details._id;

        $location.path('/updateUser')
    };


    $scope.delete = function(_id) {
        if (confirm("Are you sure you want to delete this User")) {
            console.log('Deleting id : ' + _id);
            $http.delete('/users/' + _id)
                .success(function(data) {
                    console.log(data);
                    findAll();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };
}
]);

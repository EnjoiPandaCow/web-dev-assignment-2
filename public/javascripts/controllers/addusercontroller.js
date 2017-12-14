var app = angular.module('ShyftWebApp');

app.controller('adduserController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.formData = {};

    $scope.addUser = function(){
        $http.post('/users', $scope.formData)
            .success(function(data) {
                $scope.users = data;
                $location.path('/users');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

]);

var app = angular.module('ShyftWebApp');

app.controller('addjobController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.formData = {};

    $scope.options = [{ name: "Fits in a Bag", id: 0 }, { name: "Fits in the Front Seat", id: 1 }, { name: "Fits in the Back Seat", id: 2 }, { name: "Fits in the Boot", id: 3 }];
    $scope.formData.sizeOptions = $scope.options[0];

    $scope.addJob = function(){
        $scope.formData.size = $scope.formData.sizeOptions.name;
        $http.post('/jobs', $scope.formData)
            .success(function(data) {
                $scope.jobs = data;
                $location.path('/jobs');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

]);

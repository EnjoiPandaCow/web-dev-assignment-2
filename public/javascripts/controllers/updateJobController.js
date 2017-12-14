var app = angular.module('ShyftWebApp');

app.controller('updateJobController', ['$scope', '$http', '$location', 'myService1', function($scope, $http, $location, myService1) {
    // create a message to display in our view
    $scope.message = 'Edit Job Page!';

    $scope.formData = {};
    $scope.formData.title = myService1.title;
    $scope.formData.desc = myService1.desc;
    $scope.formData.size = myService1.size;
    $scope.formData.cStreet = myService1.cStreet;
    $scope.formData.cTown = myService1.cTown;
    $scope.formData.cCounty = myService1.cCounty;
    $scope.formData.dStreet = myService1.dStreet;
    $scope.formData.dTown = myService1.dTown;
    $scope.formData.dCounty = myService1.dCounty;
    $scope.formData.dTime = myService1.dTime;
    $scope.formData.price = myService1.price;

    $scope.updateJob = function () {
        $http.put('/jobs/' + myService1.identity1, $scope.formData)
            .success(function (data) {

                $location.path('/jobs');
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data)
            });
    };
}
]);
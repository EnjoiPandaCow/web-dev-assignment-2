var app = angular.module('ShyftWebApp');

app.controller('viewNewsController', ['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService) {

    findAll();

    function findAll() {
        $http.get('/news')
            .success(function (data) {
                $scope.newss = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error ' + data);
            });
    }

}
]);

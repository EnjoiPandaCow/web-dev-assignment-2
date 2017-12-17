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

    $scope.delete = function(_id) {
        if (confirm("Are you sure you want to delete this Article")) {
            console.log('Deleting id : ' + _id);
            $http.delete('/news/' + _id)
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

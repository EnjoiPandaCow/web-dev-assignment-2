var app = angular.module('ShyftWebApp');

app.controller('addNewsController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.formData = {};

    $scope.addNews = function(){
        $http.post('/news', $scope.formData)
            .success(function(data) {
                $scope.news = data;
                $location.path('/news');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

]);

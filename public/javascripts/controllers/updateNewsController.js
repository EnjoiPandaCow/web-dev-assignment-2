var app = angular.module('ShyftWebApp');

app.controller('updateNewsController', ['$scope', '$http', '$location', 'newsService', function($scope, $http, $location, newsService) {
    // create a message to display in our view
    $scope.message = 'Edit User Page!';

    $scope.formData = {};
    $scope.formData.title = newsService.title;
    $scope.formData.msg = newsService.msg;

    $scope.updateNews = function () {
        $http.put('/news/' + newsService.identityNews, $scope.formData)
            .success(function (data) {
                $location.path('/viewNews');
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data)
            });
    };
}
]);

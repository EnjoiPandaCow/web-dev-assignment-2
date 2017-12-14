var app = angular.module('ShyftWebApp');


app.controller('mainController', ['$scope', function($scope) {
    // create a message to display in our view
    $scope.message = 'Welcome To Shyft';
}
]);

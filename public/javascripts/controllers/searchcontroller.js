var app = angular.module('ShyftWebApp');

app.controller('searchController', ['$scope', '$http', '$location', 'myService1', function($scope, $http, $location, myService1) {

    findAll();

    function findAll() {
        $http.get('/jobs')
            .success(function (data) {
                $scope.jobs = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error ' + data);
            });
    }

    $scope.update = function (job_details) {
        
        myService1.title = job_details.title;
        myService1.desc = job_details.desc;
        myService1.size = job_details.size;
        myService1.cStreet = job_details.cStreet;
        myService1.cTown = job_details.cTown;
        myService1.cCounty = job_details.cCounty;
        myService1.dStreet = job_details.dStreet;
        myService1.dTown = job_details.dTown;
        myService1.dCounty = job_details.dCounty;
        myService1.dTime = job_details.dTime;
        myService1.price = job_details.price;
        myService1.identity1 = job_details._id;

        $location.path('/updateJob')
    };

    $scope.delete = function (_id) {
        if (confirm("Are you sure you want to delete this Job")) {
            console.log('Deleting id : ' + _id);
            $http.delete('/jobs/' + _id)
                .success(function (data) {
                    console.log(data);
                    findAll();
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    };
}
]);

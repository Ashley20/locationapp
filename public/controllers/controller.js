var app = angular.module("myApp", []);

 app.controller("AppCtrl", function($scope, $http) { 

 	 $scope.showLocation = function(){
       
        $http.get('/adress', $scope.location).then(function(response){
            
            $scope.locationlist = response.data;
        })
        
    };


 });

    



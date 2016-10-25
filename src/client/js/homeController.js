angular.module('notesApp')

  .controller('homeController', ['$scope', '$location', 'AuthService', '$http',
    ($scope, $location, AuthService, $http) => {

    $scope.message = "no message";
    $scope.userName = "";

    // Get user
    $http({
      method: 'GET',
      url: '/user',
      withCredentials: true
    })
      .success((data) => {
        $scope.message = data.status;
        console.log('homepage: ' + data.status);
        AuthService.getUserStatus()
          .then(function () {
            $scope.userName = AuthService.getUserName();
            console.log('homepage: ' + $scope.userName);
          });
      })
      .error((error) => {
        $scope.message = error.status;
        console.log('Error: ' + error.status);
      });

  }]);

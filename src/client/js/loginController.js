angular.module('notesApp')

  .controller('loginController', ['$scope', '$location', 'AuthService', '$http', 
    function ($scope, $location, AuthService, $http) {

      // Login function
      $scope.login = function () {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password)
          // handle success
          .then(function () {
            $location.path('/');
            $scope.disabled = false;
            $scope.loginForm = {};
            console.log('Login ok -> homePage redirection');
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          });

      };

    }]);

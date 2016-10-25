angular.module('notesApp')

  .controller('logoutController', ['$scope', '$location', '$route', 'AuthService',
    function ($scope, $location, $route, AuthService) {

      $scope.logout = function () {

        // call logout from service
        AuthService.logout()
          .then(function () {
            $route.reload();
          });

      };

    }]);


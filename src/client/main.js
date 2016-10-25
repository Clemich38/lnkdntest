angular.module('notesApp', ['ngRoute'])

  .run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
      function (event, next, current) {
        AuthService.getUserStatus()
          .then(function () {
            if (AuthService.isLoggedIn() === false) {
              $location.path('/login');
            }
          });
      });
  })

  // Routes config
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/notesHome.html',
        controller: 'homeController'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'loginController'
      })
      .when('/logout', {
        controller: 'logoutController'
      })
      .when('/register', {
        templateUrl: '/views/register.html',
        controller: 'registerController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


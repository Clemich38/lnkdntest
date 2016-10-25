angular.module('notesApp')

  .factory('AuthService', ['$q', '$timeout', '$http',

    function ($q, $timeout, $http) {

      // create user
      var user = null;
      var userName = "";
      var serverMsg = "";

      // functions
      return ({

        // Get user logged in status
        isLoggedIn: function isLoggedIn() {
          if (user) {
            return true;
          } else {
            return false;
          }
        },

        // Get user logged in status
        getUserName: function getUserName() {
          if (user) {
            console.log('Get User Name: ' + userName);
            return userName;
          } else {
            return "No User Name...";
          }
        },

        // Get user status
        getUserStatus: function getUserStatus() {
          // return $http.get('/auth/status')
          return $http({
            method: 'GET',
            url: '/auth/status',
            withCredentials: true
          })
            // handle success
            .success(function (data) {
              if (data.status) {
                user = true;
                userName = data.username;
                console.log(data);
              } else {
                user = false;
              }
            })
            // handle error
            .error(function (data) {
              user = false;
            });
        },

        // Login user
        login: function login(username, password) {

          // create a new instance of deferred
          var deferred = $q.defer();

          // send a post request to the server
          // $http.post('/auth/login',
          //   { username: username, password: password })
          $http({
            method: 'POST',
            url: '/auth/login',
            data: { username: username, password: password },
            withCredentials: true
          })
            // handle success
            .success(function (data, status) {
              if (status === 200 && data.status) {
                user = true;
                // userName = data.status;
                deferred.resolve();
              } else {
                user = false;
                // userName = data.status;
                deferred.reject();
              }
              console.log(data);
            })
            // handle error
            .error(function (data) {
              user = false;
              // userName = data.status;
              console.log(data);
              deferred.reject();
            });

          // return promise object
          return deferred.promise;
        },

        // Logout user
        logout: function logout() {

          // create a new instance of deferred
          var deferred = $q.defer();

          // send a get request to the server
          $http.get('/auth/logout')
            // handle success
            .success(function (data) {
              user = false;
              deferred.resolve();
            })
            // handle error
            .error(function (data) {
              user = false;
              deferred.reject();
            });

          // return promise object
          return deferred.promise;
        },

        // Register user
        register: function register(username, password) {

          // create a new instance of deferred
          var deferred = $q.defer();

          // send a post request to the server
          $http.post('/auth/register',
            { username: username, password: password })
            // handle success
            .success(function (data, status) {
              if (status === 200 && data.status) {
                deferred.resolve();
              } else {
                deferred.reject();
              }
            })
            // handle error
            .error(function (data) {
              deferred.reject();
            });

          // return promise object
          return deferred.promise;
        }
      });

    }]);

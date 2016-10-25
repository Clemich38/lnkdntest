angular.module('notesApp')

  .controller('homeController', ['$scope', '$location', 'AuthService', '$http',
    ($scope, $location, AuthService, $http) => {

      // -------------------------
      // Init
      // -------------------------

      $scope.message = "no message";
      $scope.userName = "";
      $scope.formData = {};
      $scope.inputData = {};
      $scope.notesData = {};

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

      // Get all notes
      $http.get('/user/notes')
        .success((data) => {
          $scope.notesData = data;
          console.log(data);
        })
        .error((error) => {
          console.log('Error: ' + error);
        });

      // -------------------------
      // Methods
      // -------------------------

      // Get all notes
      $scope.getAllNotes = () => {
        $http.get('/user/notes')
          .success((data) => {
            $scope.notesData = data;
            console.log(data);
          })
          .error((error) => {
            console.log('Error: ' + error);
          });
      };

      // Create a new todo
      $scope.createNote = () => {
        $http.post('/user/notes', $scope.formData)
          .success((data) => {
            $scope.formData = {};
            console.log(data);
            // get all notes
            $scope.getAllNotes();
          })
          .error((error) => {
            console.log('Error: ' + error);
          });
      };

      // Delete a todo
      $scope.deleteNote = (noteID) => {
        $http.delete('/user/notes/' + noteID)
          .success((data) => {
            console.log(data);
            // get all notes
            $scope.getAllNotes();
          })
          .error((data) => {
            console.log('Error: ' + data);
          });
      };


      $scope.loginRedirection = function () {
        $location.path('/login');
      };

    }]);

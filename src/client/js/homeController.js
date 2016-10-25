angular.module('notesApp')

  .controller('homeController', ['$scope', '$location', 'AuthService', '$http',
    ($scope, $location, AuthService, $http) => {

      // -------------------------
      // Init
      // -------------------------

      $scope.message = "no message";
      $scope.userName = "";
      $scope.userLoggedIn = false;
      $scope.formData = {};
      $scope.inputData = {};
      $scope.notesData = {};
      $scope.editedNote = null;
      $scope.openedNote = null;
      $scope.showNewNote = false;

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
              $scope.userLoggedIn = AuthService.isLoggedIn();
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
      $scope.getAllNotes = function() {
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
      $scope.createNote = function() {
        $http.post('/user/notes', $scope.formData)
          .success((data) => {
            $scope.formData = {};
            console.log(data);
            $scope.showNewNote = false;
            // get all notes
            $scope.getAllNotes();
          })
          .error((error) => {
            console.log('Error: ' + error);
          });
      };

      // Delete a note
      $scope.deleteNote = function(noteID) {
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

      // Edit a note
      $scope.editNote = function(noteID) {
        $http.put('/user/notes/' + noteID, $scope.inputData)
          .success((data) => {
            console.log(data);
            // get all notes
            $scope.getAllNotes();
          })
          .error((data) => {
            console.log('Error: ' + data);
          });

        $scope.editedNote = null;
      };

      // Cancel edit a note
      $scope.cancelEditNote = function(noteID) {
        $scope.editedNote = null;
      };

      // Show edit a note
      $scope.showEditNote = function(noteID) {
        $scope.editedNote = noteID;
      };

      // Show new note form
      $scope.showNew = function() {
        $scope.showNewNote = true;
      };

      // View note detail
      $scope.viewNoteDetail = function(noteID) {
          $scope.openedNote = noteID;
      };

      // Close note detail
      $scope.closeNoteDetail = function() {
          $scope.openedNote = null;
      };

      // Redirect to login page
      $scope.loginRedirection = function () {
        $location.path('/login');
      };

      // Redirect to register page
      $scope.registerRedirection = function () {
        $location.path('/register');
      };

    }]);

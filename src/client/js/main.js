angular.module('notesApp', [])

    .controller('mainController', ($scope, $http) => {
        $scope.message = "no message";

        // Get user page
        $http.get('/user')
            .success((data) => {
                $scope.message = data;
                console.log(data);
            })
            .error((error) => {
                $scope.message = error.status;
                console.log('Error: ' + error);
            });
        

        // // login
        // $scope.login = (noteID) => {
        //     $http.put('/notes/' + noteID, $scope.inputData)
        //     .success((data) => {
        //         $scope.inputData = {};
        //         console.log(data);
        //         // get all notes
        //         $scope.getAllNotes();
        //     })
        //     .error((data) => {
        //         console.log('Error: ' + data);
        //     });
        // };

    });

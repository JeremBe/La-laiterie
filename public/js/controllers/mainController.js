// MAIN CONTROLLER
function mainController($scope, $http, todoService) {
    $scope.data = {};

    function load() {
        todoService.get().then(function(res) {
            $scope.membres = res.data;
        });
    }
    $scope.add = function() {
        console.log($scope.data);
        if ($scope.data != {}) {
            todoService.create($scope.data).then(function(res) {
                load();
                $scope.data = {};
                $(document).ready(function() {
                    Materialize.updateTextFields();
                });
            });
        }
    }
    $scope.update = function(todo) {
        todoService.update(todo._id, todo).then(function(res) {
            load();
        });
    }
    $scope.delete = function(todo) {
        todoService.delete(todo._id).then(function(res) {
            load();
        });
    }
    load();
}

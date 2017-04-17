// ===========================
// MAIN CONTROLLER
function mainController($scope, membersService) {

}

// ===========================
// signupController CONTROLLER
function signupController($scope, userService, $timeout, $location, $rootScope) {
    $rootScope.home = true;
    $scope.create = function() {
        userService.create($scope.connect).then(function(res) {
                $location.path('/');
                Materialize.toast('Votre compte a été créé', 4000, 'success');
        })
    }
}

// ============================
// connectController CONTROLLER
function connectController($scope, $timeout, $location, $window, $rootScope, userService, userFactory) {
  $rootScope.home = true;

    $scope.signIn = function() {
        userService.connect($scope.connect).then(function(res) {
            userFactory.user = res.data;
            $rootScope.isAdmin = res.data.user.admin;
            console.log($rootScope.isAdmin);

            localStorage.user = angular.toJson({
                token: res.data.token
            });

            $location.path('/membres');

        })
    }
}

// ============================
// membersController CONTROLLER
function membersController($scope, $location, $rootScope, membersService, userService, userFactory) {
    $rootScope.home = false;

    $scope.data = {};

    function load() {
        membersService.get().then(function(res) {
            $scope.membres = res.data;
        });
    }
    $scope.add = function() {
        if ($scope.data != {}) {
            membersService.create($scope.data).then(function(res) {
                load();
                $scope.data = {};
                $(document).ready(function() {
                    Materialize.updateTextFields();
                });
            });
        }
    }

    $scope.edit = {
        update: function(member) {
            membersService.update(member._id, member).then(function(res) {
                load();
                Materialize.toast(member.prenom + ' ' + member.nom + ' a été modifié', 4000, 'success');
            });
        },
        delete: function(member) {
            membersService.delete(member._id).then(function(res) {
                load();
                Materialize.toast(member.prenom + ' ' + member.nom + ' a été supprimé', 4000, 'success');
            });
        }
    }

    load();

    $scope.showSide = function() {
        var position = $('.collapse').css('max-height');
        if (position != '0px') {
            $('.collapse').css('max-height', '0px');
            $('.addbutton').text(' + ');
        } else {
            $('.collapse').css('max-height', '2000px');
            $('.addbutton').text(' - ');
        }
    }

}

// ================================
// membersEditController CONTROLLER
function membersEditController($scope, $location, membersService, userService, userFactory) {
    $scope.oldMember = {};
    $scope.show = true;
    $scope.update = function(member) {
        $scope.edit.update(member);
        $scope.toggle();
    }
    $scope.delete = function(member) {
        $scope.edit.delete(member)
    }
    $scope.toggle = function(member) {
        if (member) {
            $scope.oldMember = angular.copy(member);
            $scope.show = !$scope.show;
        } else {
            $scope.oldMember = {};
            $scope.show = !$scope.show;
        }
    }
}

// ============================
// adminController CONTROLLER
function adminController($scope, $location, $rootScope, membersService, userService, userFactory) {
    $rootScope.home = false;


    $(document).ready(function(){
      $('.modal').modal({dismissible: false});
    });

    userService.get().then(function(res) {
        $scope.users = res.data
    })

    $scope.delete = function (member) {
          userService.delete(member._id).then(function(res) {
              userService.get().then(function(res) {
                  $scope.users = res.data
              })
          });
    }
    $scope.validateAdmin = function (option, user) {
      if (option) {
        console.log(user);
        userService.admin(user._id, {
            admin: user.admin
        }).then(function() {
            userService.get().then(function(res) {
                $scope.users = res.data
            })
        })
      }
      else {
        userService.get().then(function(res) {
            $scope.users = res.data
        })
      }
    }
    $scope.activate = function(user, value) {
        userService.activate(user._id, {
            activate: value
        }).then(function() {
            userService.get().then(function(res) {
                $scope.users = res.data
            })
        })
    }

    $scope.admin = function(user, value) {
        if (!value) {
            $scope.currentUser = user;
            $('#modal1').modal('open');
        }else {
            $scope.validateAdmin(true, user);
        }
    }

}

// ============================
// navController CONTROLLER
function navController($scope, $location, membersService, authService, userService, userFactory) {

    $scope.logout = function() {
        $scope.toggle();
        authService.logout();
    }

    $scope.url = function (url) {
      $scope.toggle();
      $location.path(url);
    }
    $scope.$on('$locationChangeStart', function(event) {
        $scope.navShow = false;
        var url = $location.url().split('/');
        if (url[1] == 'admin' || url[1] == 'membres') $scope.navShow = true;
        else $scope.navShow = false;
    });
    $scope.toggle = function() {
        var position = $('#mobileNav').css('max-height');
        if (position != '0px') {
            $('#mobileNav').css('max-height', '0px');
        } else {
            $('#mobileNav').css('max-height', '2000px');
        }
    }
}

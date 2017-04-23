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
            console.log(res.data);

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
    $(document).ready(function(){
        $('.collapsible').collapsible();
      });

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

    $scope.searchOpen = function() {
        var position = $('#icon_prefix').css('width');
        if (position != '0px') {
            $('#icon_prefix').css('width', '0px');
        } else {
            $('#icon_prefix').css('width', '250px').focus();
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

    $scope.searchOpen = function() {
        var position = $('#icon_prefix').css('width');
        if (position != '0px') {
            $('#icon_prefix').css('width', '0px');
        } else {
            $('#icon_prefix').css('width', '250px').focus();
        }
    }

    $(document).ready(function(){
      $('.modal').modal({dismissible: false});
    });

    userService.get().then(function(res) {
        $rootScope.users = res.data
    })

    $scope.delete = function (member) {
          userService.delete(member._id).then(function(res) {
              userService.get().then(function(res) {
                  $rootScope.users = res.data
              })
          });
    }
    $rootScope.validateAdmin = function (option, user) {
      if (option) {
        userService.admin(user._id, {
            admin: user.admin
        }).then(function() {
            userService.get().then(function(res) {
                $rootScope.users = res.data
            })
        })
      }
      else {
        userService.get().then(function(res) {
            $rootScope.users = res.data
        })
      }
    }
    $scope.activate = function(user, value) {
        userService.activate(user._id, {
            activate: value
        }).then(function() {
            userService.get().then(function(res) {
                $rootScope.users = res.data
            })
        })
    }

    $rootScope.admin = function(user, value) {
        if (!value) {
            $rootScope.currentUser = user;
            $('#modal1').modal('open');
        }else {
            $rootScope.validateAdmin(true, user);
        }
    }

}

// ============================
// navController CONTROLLER
function navController($scope, $location, $rootScope, membersService, authService, userService, userFactory) {

    $scope.logout = function() {
        authService.logout();
    }

    $scope.url = function (url) {
      $location.path(url);
    }

    $scope.$on('$locationChangeStart', function(event) {
        $rootScope.navShow = false;
        var url = $location.url().split('/');
        if (url[1] == 'administration' || url[1] == 'membres') $rootScope.navShow = true;
        else $rootScope.navShow = false;
    });

    $scope.toggle = function() {
        var position = $('.sideBar').css('width');
        if (position == '220px') {
            $('.sideBar').css('width','61px');
            $('.sideRight').css('width','calc(100% - 61px)');
            $('.iconsNav').css('color','rgba(155, 157, 171, 1)');
            $('.textMenu').css('color','rgba(155, 157, 171, 0)');
            $scope.hideMenu = true;
        } else {
            $('.sideBar').css('width','220px');
            $('.sideRight').css('width','calc(100% - 220px)');
            $('.iconsNav').css('color','rgba(155, 157, 171, 0)');
            setTimeout(function () {
              $('.textMenu').css('color','rgba(155, 157, 171, 1)');
            }, 5);
            $scope.hideMenu = false;
        }
    }
}
// ============================
// navController CONTROLLER
function changeController($scope, $location, $rootScope, membersService, authService, userService, userFactory) {

    $scope.update = function functionName() {
      console.log($scope.change);
        userService.changePwd($scope.change).then(function (res) {
            console.log(res.data);
        });
    }
}

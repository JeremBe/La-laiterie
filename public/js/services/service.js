// USERS SERVICE
function userService($http) {
    return {
        get : function() {
            return $http.get('/users');
        },
        activate : function(id, user) {
            return $http.put('/users/activate/' + id, user);
        },
        admin : function(id, user){
            return $http.put('/users/admin/' + id, user);
        },
        update : function(id, data){
            return $http.put('/users/' + id, data);
        },
        create : function(data) {
            return $http.post('/users', data);
        },
        delete : function(id) {
            return $http.delete('/users/' + id);
        },
        connect : function (data) {
            return $http.post('/connect/', data);
        }
    }
};

function userFactory() {
    var user = {};
    return user;
}

function authService($window, $q, $location, userFactory) {

    var self = this;
    this.user = false;
    var defer = $q.defer();

    // This exposes the user object as a promise.
    // First two arguments of then are success and error callbacks, third one is notify callback.
    this.getUser = function() {
        self.setUser();
        return self.user;
    };

    this.observeUser = function() {
        return defer.promise;
    };

    this.setUser = function() {
        self.user = self.parseJwt(self.getToken());
        defer.notify(self.user);
    };

    this.parseJwt = function(token) {
        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        } else return false;
    };

    this.saveToken = function(token) {
        $window.localStorage.token = token;
        self.setUser();
    };

    this.getToken = function() {
        return angular.fromJson(localStorage.user) ? angular.fromJson(localStorage.user).token : '';
    };

    this.isAuthed = function() {
        var token = angular.fromJson(localStorage.user) ? angular.fromJson(localStorage.user).token : '';
        if (token) {
            var params = self.parseJwt(token);
            var notExpired = Math.round(new Date().getTime() / 1000) <= params.exp;

            // if the user is expired, log them out
            if (!notExpired) {
                self.logout();
            }
            return notExpired;
        } else {
            return false;
        }
    };

    this.logout = function() {
        delete localStorage.user;
        self.user = false;
        defer.notify(self.user);
        $location.path('/');
    };
}
// MEMBERS SERVICE
function membersService($http) {
    return {
        get : function() {
            return $http.get('/membres');
        },
        update : function(id, data){
            return $http.put('/membres/' + id, data);
        },
        create : function(data) {
            return $http.post('/membres', data);
        },
        delete : function(id) {
            return $http.delete('/membres/' + id);
        }
    }
};

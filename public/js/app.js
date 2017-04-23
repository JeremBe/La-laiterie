function config($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'connectController'
		})
		.when('/membres', {
			templateUrl: 'views/members.html',
			controller: 'membersController'
		})
		.when('/pwd', {
			templateUrl: 'views/pwd.html',
			controller: 'changeController'
		})
		.when('/administration', {
			templateUrl: 'views/admin.html',
			controller: 'adminController'
		})
		.when('/inscription', {
			templateUrl: 'views/signup.html',
			controller: 'signupController'
		})
		.otherwise({
			redirectTo: '/'
		});
		$httpProvider.interceptors.push(authInterceptor);
}

function run($rootScope, $location, authService){
		$rootScope.isAdmin = false;
		var path = function() { return $location.path(); };
		$rootScope.$watch(path, function(newVal, oldVal){
			$rootScope.activetab = newVal;
		});
		var auth = authService.getUser();
		var url = $location.url().split('/');
		if (auth && auth.admin && auth.activate) {
				$rootScope.isAdmin = true;
				if (url[1] != 'membres' && url[1] != 'administration') $location.path('/membres');
		}
		else if (auth && auth.activate) {
				if (url[1] != 'membres') $location.path('/membres');
	 }
	 else {
	 	$location.path('/')
	 }
}

angular.module('app', ['ngRoute','ngSanitize','ngCsv'])
    .config(config)
    .controller('mainController', mainController)
    .controller('signupController', signupController)
    .controller('changeController', changeController)
    .controller('connectController', connectController)
    .controller('membersController', membersController)
    .controller('adminController', adminController)
    .controller('membersEditController', membersEditController)
    .controller('navController', navController)
    .service('membersService', membersService)
    .service('userService', userService)
    .service('authService', authService)
    .factory('userFactory', userFactory)
    .factory('authInterceptor', authInterceptor)
    /*.factory('', )*/
    .run(run);

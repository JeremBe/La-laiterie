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
		.when('/admin', {
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
	var path = function() { return $location.path(); };
	$rootScope.$watch(path, function(newVal, oldVal){
		$rootScope.activetab = newVal;
	});

	if (authService.getUser() && authService.getUser().admin) {
			$rootScope.isAdmin = true;
			var url = $location.url().split('/');
			if (url[1] != 'membres' && url[1] != 'admin') {
				$location.path('/membres')
			}
	}

}

angular.module('app', ['ngRoute','ngSanitize','ngCsv'])
    .config(config)
    .controller('mainController', mainController)
    .controller('signupController', signupController)
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

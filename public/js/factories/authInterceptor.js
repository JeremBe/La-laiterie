function authInterceptor($q, authService, $rootScope) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if (authService.isAuthed()) {
                config.headers.Authorization = authService.getToken();
            }
            return config;
        },
        responseError: function(response) {
            if (response.status === 401) {
                // delete the token
                authService.logout();
                // handle the case where the user is not authenticated
            }
            return $q.reject(response);
        }
    };
}

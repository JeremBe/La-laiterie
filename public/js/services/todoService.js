// TODO SERVICE
function todoService($http) {
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

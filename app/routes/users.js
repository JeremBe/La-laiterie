// ROUTES USERS
var Auth = require('../middlewares/authorization.js');
var Users = require('../models/users.js');
module.exports = function(app) {
    app.put('/users/activate/:id', Users.activate);
    app.put('/users/admin/:id', Users.admin);
    app.put('/users/:id', Users.update);
    app.get('/users', Users.findAll);
    app.post('/users', Users.create);
    app.delete('/users/:id', Users.delete);
    app.post('/connect', Users.connect);
}

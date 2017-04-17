// ROUTES USERS
var Auth = require('../middlewares/authorization.js');
var Users = require('../models/users.js');
module.exports = function(app) {
    app.put('/users/activate/:id', Auth.user.isAdministrator, Users.activate);
    app.put('/users/admin/:id', Auth.user.isAdministrator, Users.admin);
    app.put('/users/:id', Auth.user.isAdministrator, Users.update);
    app.get('/users', Auth.user.isAdministrator, Users.findAll);
    app.post('/users', Users.create);
    app.delete('/users/:id', Auth.user.isAdministrator, Users.delete);
    app.post('/connect', Users.connect);
}

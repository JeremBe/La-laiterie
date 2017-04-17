// ROUTES MEMBERS
var Auth = require('../middlewares/authorization.js');
var Membres = require('../models/membres.js');
module.exports = function(app) {
    app.get('/membres', Auth.user.isMember, Membres.findAll);
    app.post('/membres', Auth.user.isMember, Membres.create);
    app.put('/membres/:id', Auth.user.isMember, Membres.update);
    app.delete('/membres/:id', Auth.user.isMember, Membres.delete);
}

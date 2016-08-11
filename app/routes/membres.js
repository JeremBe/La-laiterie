// ROUTES TODOS
var Membres = require('../models/membres.js');
module.exports 	= function(app) {
	app.get('/membres', Membres.findAll);
	app.post('/membres', Membres.create);
	app.put('/membres/:id', Membres.update);
	app.delete('/membres/:id', Membres.delete);
}

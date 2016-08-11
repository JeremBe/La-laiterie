// MODEL TODO
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  description: String
});
var Users = {

    model: mongoose.model('Users', userSchema),

    create: function(req, res) {
		Users.model.create({
			description: req.body.description
		}, function(){
			res.sendStatus(200);
		})
	},
	findAll: function(req, res) {
		Users.model.find(function (err, data) {
			res.send(data);
		});
	},
	update: function(req, res){
		Users.model.findByIdAndUpdate(req.params.id, {
			description: req.body.description
		}, function(){
			res.sendStatus(200);
		})
	},
	delete: function(req, res){
		Users.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}
}
module.exports = Users;

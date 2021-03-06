// MODEL MEMBERS
var mongoose = require('mongoose');
var membreSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    tel: String
});
var Membres = {

    model: mongoose.model('Membres', membreSchema),

    create: function(req, res) {
        Membres.model.create(req.body, function() {
            res.sendStatus(200);
        })
    },
    findAll: function(req, res) {
        Membres.model.find({})
                     .select('_id nom prenom email tel')
                     .exec(function (err, data) {
                        res.send(data);
                      });
    },
    update: function(req, res) {
        Membres.model.findByIdAndUpdate(req.params.id,req.body, function() {
            res.sendStatus(200);
        })
    },
    delete: function(req, res) {
        Membres.model.findByIdAndRemove(req.params.id, function() {
            res.sendStatus(200);
        })
    }
}
module.exports = Membres;

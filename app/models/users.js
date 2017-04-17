// MODEL USERS
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secretToken = require('../../config/secretToken.js');
var SALT_WORK_FACTOR = 13;

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    pwd: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    activate: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.comparePassword = function(pwd, cb) {
    bcrypt.compare(pwd, this.pwd, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({
        _id: this._id,
        prenom: this.prenom,
        email: this.email,
        nom: this.nom,
        admin: this.admin,
        activate: this.activate,
    }, secretToken, {
        expiresIn: '24h'
    });
};

var Users = {

    model: mongoose.model('Users', userSchema),

    connect: function(req, res, next) {
        if (!req.body.email || !req.body.pwd) {
            res.sendStatus(401)
        } else {
            Users.model.findOne({email: req.body.email}, function(err, user) {
                if (err || !user) res.sendStatus(401);
                else {
                    user.comparePassword(req.body.pwd, function(err, isMatch) {
                        if (err) res.sendStatus(401);
                        if (!isMatch) res.sendStatus(401);
                        else {
                            var token = user.generateJwt();
                            res.status(200).json({
                              success: true,
                              user: user,
                              token: token
                            });
                        }
                    });
                }
            });
        }
    },
    activate: function(req, res) {
        Users.model.findByIdAndUpdate(req.params.id,
          {
            activate: req.body.activate
          }, function(err, user) {
            res.sendStatus(200);
        })
    },
    admin: function(req, res) {
        Users.model.findByIdAndUpdate(req.params.id,
          {
            admin: req.body.admin
          }, function(err, user) {
            res.sendStatus(200);
        })
    },
    create: function(req, res) {
        req.body.pwd = bcrypt.hashSync(req.body.pwd, bcrypt.genSaltSync(10), null);
        Users.model.create(req.body, function() {
            res.sendStatus(200);
        })
    },
    findAll: function(req, res) {
        Users.model.find(function(err, data) {
            res.send(data);
        });
    },
    update: function(req, res) {
        Users.model.findByIdAndUpdate(req.params.id, {
            description: req.body.description
        }, function() {
            res.sendStatus(200);
        })
    },
    delete: function(req, res) {
        Users.model.findByIdAndRemove(req.params.id, function() {
            res.sendStatus(200);
        })
    }
}
module.exports = Users;

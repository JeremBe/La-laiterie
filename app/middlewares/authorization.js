var jwt = require('jsonwebtoken'),
    secretToken = require('../../config/secretToken.js');

exports.user = {
    isAdministrator: function(req, res, next) {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, secretToken, function(err, decoded) {
                if (err) return res.sendStatus(401);
                if (decoded.admin && decoded.activate) {
                    next();
                } else {
                    return res.sendStatus(401);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    },
    isMember: function(req, res, next) {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, secretToken, function(err, decoded) {
                if (err) return res.sendStatus(401);
                if (decoded.activate) {
                    next();
                } else {
                    return res.sendStatus(401);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    }
};

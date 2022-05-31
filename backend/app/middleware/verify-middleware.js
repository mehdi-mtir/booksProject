const User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log('----------------------------------');
        var token = req.headers.authorization;
        console.log('token', token);
        jwt.verify(token, 'une phrase secretre');
        next();
    } catch (error) {
        res.status(401).send('erreur');
    }
}
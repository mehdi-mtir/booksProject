const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var result;
// Create and Save a new user
exports.create = (req, res) => {
    let user;

    console.log("Request received : " + req.body.email + " " + req.body.nom);
    // res.status(200).send({"ok":true});
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    /*User.findOne({email: req.body.email}).then(
        (user)=>{
            return res.status(400).send({
                message: "User with email " + user.email + " already exists"
            });
        }
    )*/



    // Create a user

    // console.log("user=", user)
    bcrypt.genSalt(10, function(err, salt) {
        console.log("pass before hash : " + JSON.stringify(req.body))
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user = new User({
                nom: req.body.nom || "Untitled user",
                email: req.body.email,
                password: hash
            });
            console.log("pass after hash : " + JSON.stringify(user))
                // Save user in the database
            user.save()
                .then(data => {
                    res.json(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the user."
                    });
                });
        });
    });

};
//****************login****************** */
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            bcrypt.compare(req.body.password, user.password).
            then((result) => {
                    console.log(result)
                    if (result === true) {
                        try {
                            const tempExpiration = 10000;
                            var token = jwt.sign({ email: req.body.email, id: user._id }, 'une phrase secretre', { expiresIn: tempExpiration });
                            res.json({ tok: token, expiresIn: tempExpiration });
                        } catch (error) {
                            console.log(error)
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });


        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with email " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with email " + req.params.email
            });
        });
};
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
    User.findOneAndDelete({ id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
};
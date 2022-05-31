const Book = require('../models/book.model.js');

// Create and Save a new book
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "book content can not be empty"
        });
    }

    // Create a book
    const book = new Book({
        title: req.body.title || "Untitled book",
        isbn: req.body.isbn,
        categorie: req.body.categorie,
        auteur: {
            nom: req.body.auteur.nom,
            prenom: req.body.auteur.prenom,
            email: req.body.auteur.email
        }
    });
    console.log("book=", book)

    // Save book in the database
    book.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the book."
            });
        });
};

// Retrieve and return all books from the database.
exports.findAll = (req, res) => {
    Book.find()
        .then(books => {
            res.status(200).send(books);
            console.log(books);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
};

// Find a single book with a bookId
exports.findByIsbn = (req, res) => {
    Book.findOne({ isbn: req.params.isbn })
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "book not found with id " + req.params.isbn
                });
            }
            res.send(book);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "book not found with id " + req.params.isbn
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.isbn
            });
        });
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "book content can not be empty"
        });
    }

    // Find book and update it with the request body
    Book.findByIdAndUpdate(req.params.bookId, {
            title: req.body.title || "Untitled book",
            isbn: req.body.isbn,
            categorie: req.body.categorie,
            auteur: {
                nom: req.body.auteur.nom,
                prenom: req.body.auteur.prenom,
                email: req.body.auteur.email
            }
        }, { new: true })
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "book not found with id " + req.params.bookId
                });
            }
            res.send(book);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "book not found with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Error updating book with id " + req.params.bookId
            });
        });
};
// Update a book identified by the isbn in the request
exports.updateByIsbn = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "book content can not be empty"
        });
    }

    // Find book and update it with the request body
    Book.findOneAndUpdate({ isbn: req.params.isbn }, {
            title: req.body.title || "Untitled book",
            isbn: req.body.isbn,
            categorie: req.body.categorie,
            auteur: {
                nom: req.body.auteur.nom,
                prenom: req.body.auteur.prenom,
                email: req.body.auteur.email
            }
        }, { new: true })
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "book not found with isbn " + req.params.isbn
                });
            }
            res.send(book);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "book not found with isbn " + req.params.isbn
                });
            }
            return res.status(500).send({
                message: "Error updating book with isbn " + req.params.isbn
            });
        });
};
// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
    Book.findOneAndDelete({ isbn: req.params.isbn })
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "book not found with isbn " + req.params.isbn
                });
            }
            res.send({ message: "book deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "book not found with isbn " + req.params.isbn
                });
            }
            return res.status(500).send({
                message: "Could not delete book with isbn " + req.params.isbn
            });
        });
};
const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: String,
    isbn: String,
    categorie: [String],
    auteur: {
        nom: String,
        prenom: String,
        email: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);
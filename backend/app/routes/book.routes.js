const books = require('../controllers/book.controller.js');
const verifyMiddleware = require('../middleware/verify-middleware.js');

const bookRoutes = (app) => {
    
    // Create a new book
    app.post('/books', books.create);

    // Retrieve all books
    //app.get('/books', verifyMiddleware, books.findAll);
    app.get('/books', books.findAll);

    // Retrieve a single book with bookId
    app.get('/books/:isbn', books.findByIsbn);

    // Update a book with bookId
    app.put('/books/:bookId', books.update);
    app.put('/books/updateByIsbn/:isbn', books.updateByIsbn);
    // Delete a book with bookId
    app.delete('/books/:isbn', books.delete);
}

module.exports = bookRoutes;
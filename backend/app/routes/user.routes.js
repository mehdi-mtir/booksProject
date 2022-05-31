module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const verifyMiddleware = require('../middleware/verify-middleware.js');
    //user routes
    // Create a new user
    app.post('/users', users.create);
    app.post('/login', users.login);
    // Retrieve all users
    //app.get('/users', verifyMiddleware, users.findAll);
    app.get('/users', users.findAll);
}
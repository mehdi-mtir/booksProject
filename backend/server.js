const express = require('express');
const bodyParser = require('body-parser');
const adaptHeader = require('./app/middleware/adapt-header');
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');



// create express app
const app = express();

//Middleware 1:  pour parmettre les accès à partir de clients différents
//Correction de l'erreur CORS
app.use(adaptHeader);

//Middleware 2 : Body parser pour faciliter l'accès aux paramètres reçus en format json ou formData
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())




mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to books application." });
});

// listen for requests
//Methode 1
const bookRoutes = require('./app/routes/book.routes.js');
bookRoutes(app);
//Methode 2: Raccourci d'écriture
require('./app/routes/user.routes.js')(app);

// start listening to requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
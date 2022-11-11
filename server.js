const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
// create express app
const app = express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

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
    res.json({"message": "Welcome to eCommerce application. This application can create/update/list/purchace the products for the created users."});
});

require('./app/routes/user.routes.js')(app);
require('./app/routes/category.routes.js')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/cart.routes.js')(app);
require('./app/routes/transaction.routes.js')(app);
require('./app/routes/admin.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
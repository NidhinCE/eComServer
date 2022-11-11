module.exports = (app) => {
    const transaction = require('../controllers/transaction.controller.js');

    // Create a new transaction
    app.post('/transaction/api', transaction.create);

    // Retrieve all transaction
    app.get('/transaction/api', transaction.findAll);

    // Retrieve a single category with transactionId
    // app.get('/transaction/api/:transactionId', transaction.findOne);

    // Retrieve a single category with customerId
    app.get('/transaction/api/:userId', transaction.findByUser);

    // Update a category with transactionId
    app.put('/transaction/api/:transactionId', transaction.update);

    // Delete a category with transactionId
    app.delete('/transaction/api/:transactionId', transaction.delete);
}
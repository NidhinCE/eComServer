const Transaction = require('../models/transaction.model.js');

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if(!req.body.customerId) {
        return res.status(400).send({
            message: "Transaction can not be empty"
        });
    }

    // Create a Transaction
    const transaction = new Transaction({
        customerId: req.body.customerId,
        productId: req.body.productId,
        price: req.body.price
    });

    // Save Transaction in the database
    transaction.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Transaction."
        });
    });
};

// Retrieve and return all Transaction from the database.
exports.findAll = (req, res) => {
    Transaction.find()
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Categories."
        });
    });
};

// Find a single transaction with a transactionId
exports.findOne = (req, res) => {
    Transaction.findById(req.params.transactionId)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transactionId
            });            
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transactionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Transaction with id " + req.params.transactionId
        });
    });
};

exports.findByUser = (req, res) => {
    Transaction.find({'customerId':req.params.userId})
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "Transactions not found with given user " + req.params.userId
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "req.params.userId " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with user name test " + req.params.userName + " " + err
        });
    });
};



// Update a transaction identified by the transactionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Transaction can not be empty"
        });
    }

    // Find transaction and update it with the request body
    Transaction.findByIdAndUpdate(req.params.transactionId, {
        customerId: req.body.customerId,
        totalPayment: req.body.totalPayment
    }, {new: true})
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transactionId
            });
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transactionId
            });                
        }
        return res.status(500).send({
            message: "Error updating Transaction with id " + req.params.transactionId
        });
    });
};

// Delete a transaction with the specified transactionId in the request
exports.delete = (req, res) => {
    Transaction.findByIdAndRemove(req.params.transactionId)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transactionId
            });
        }
        res.send({message: "Transaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transactionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Transaction with id " + req.params.transactionId
        });
    });
};

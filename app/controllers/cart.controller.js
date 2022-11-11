const Cart = require('../models/cart.model.js');

// Create and Save a new Cart
exports.create = (req, res) => {
    // Validate request
    if(!req.body.userId) {
        return res.status(400).send({
            message: "Cart can not be empty"
        });
    }

    // Create a Cart
    const cart = new Cart({
        customerId: req.body.userId,
        productId: req.body._id,
        price: req.body.price
    });
    console.log("Cart Object");
    console.log(cart);
    // Save Cart in the database
    cart.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Cart."
        });
    });
};

// Retrieve and return all Cart from the database.
exports.findAll = (req, res) => {
    Cart.find()
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Categories."
        });
    });
};

// // Find a single cart with a cartId
// exports.findOne = (req, res) => {
//     Cart.findById(req.params.cartId)
//     .then(cart => {
//         if(!cart) {
//             return res.status(404).send({
//                 message: "Cart not found with id " + req.params.cartId
//             });            
//         }
//         res.send(cart);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Cart not found with id " + req.params.cartId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving Cart with id " + req.params.cartId
//         });
//     });
// };

exports.findByUser = (req, res) => {
    Cart.find({'customerId':req.params.customerId})
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "Transactions not found with given user " + req.params.customerId
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "req.params.userId " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with user name test " + req.params.customerId + " " + err
        });
    });
};

// Update a cart identified by the cartId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Cart can not be empty"
        });
    }

    // Find cart and update it with the request body
    Cart.findByIdAndUpdate(req.params.cartId, {
        userId: req.body.userId,
        productId: req.body.productId,
        price: req.body.price
    }, {new: true})
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "Cart not found with id " + req.params.cartId
            });
        }
        res.send(cart);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cart not found with id " + req.params.cartId
            });                
        }
        return res.status(500).send({
            message: "Error updating Cart with id " + req.params.cartId
        });
    });
};

// Delete a cart with the specified cartId in the request
exports.delete = (req, res) => {
    Cart.findByIdAndRemove(req.params.cartId)
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "Cart not found with id " + req.params.cartId
            });
        }
        res.send({message: "Cart deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cart not found with id " + req.params.cartId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Cart with id " + req.params.cartId
        });
    });
};

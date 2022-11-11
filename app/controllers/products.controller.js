const Product = require('../models/products.model.js');

var cats;
// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if(!req.body.Name) {
        return res.status(400).send({
            message: "Product can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        categoryId: req.body.category,
        name: req.body.Name,
        price: req.body.Price,
        description: req.body.Description
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all Product from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productsId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productsId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Product with id " + req.params.productsId
        });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Product can not be empty"
        });
    }

    // Find product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        categoryId: req.body.categoryId,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating Product with id " + req.params.productId
        });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
    console.log("To Delete")
    console.log(req.params.productsId);
    Product.findByIdAndRemove(req.params.productsId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productsId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Product with id " + req.params.productsId + " " + err
        });
    });
};

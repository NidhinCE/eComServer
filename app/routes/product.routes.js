module.exports = (app) => {
    const products = require('../controllers/products.controller.js');

    // Create a new category
    app.post('/products/api', products.create);

    // Retrieve all products
    app.get('/products/api', products.findAll);

    // Retrieve a product category with productsId
    app.get('/products/api/:productsId', products.findOne);

    // Update a product with productsId
    app.put('/products/api/:productsId', products.update);

    // Delete a product with productsId
    app.delete('/products/api/:productsId', products.delete);
}
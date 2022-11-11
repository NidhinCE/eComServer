module.exports = (app) => {
    const cart = require('../controllers/cart.controller.js');

    // Create a new category
    app.post('/cart/api', cart.create);

    // Retrieve all cart
    app.get('/cart/api', cart.findAll);

    // Retrieve a single category with cartId
    app.get('/cart/api/:customerId', cart.findByUser);

    // Update a category with cartId
    app.put('/cart/api/:cartId', cart.update);

    // Delete a category with cartId
    app.delete('/cart/api/:cartId', cart.delete);
}
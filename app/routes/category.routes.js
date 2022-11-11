module.exports = (app) => {
    const categorys = require('../controllers/category.controller.js');

    // Create a new category
    app.post('/categorys/api', categorys.create);

    // Retrieve all categorys
    app.get('/categorys/api', categorys.findAll);

    // Retrieve a single category with categoryId
    app.get('/categorys/api/:categoryId', categorys.findOne);

    // Update a category with categoryId
    app.put('/categorys/api/:categoryId', categorys.update);

    // Delete a category with categoryId
    app.delete('/categorys/api/:categoryId', categorys.delete);
}
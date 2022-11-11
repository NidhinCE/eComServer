module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/users/api', users.create);

    // Retrieve all Users
    app.get('/users/api', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/api/:userId', users.findOne);

    // Update a User with userId
    app.put('/users/api/:userId', users.update);

    // Delete a User with userId
    app.delete('/users/api/:userId', users.delete);

    // Retrieve a single User with user name
    app.get('/userbyname/api/:userName', users.getUserByName);
}
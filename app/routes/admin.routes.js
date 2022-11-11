module.exports = (app) => {
    const admin = require('../controllers/admin.controller.js');

    // Create a new admin
    app.post('/admin/api', admin.create);

    // // Retrieve a single admin with userId
    // app.get('/admin/:userId', admin.findOne);
    
    // Retrieve a single admin with user name and password
    app.get('/admin/api/:userName', admin.getAdmin);
}
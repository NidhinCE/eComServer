const Admin = require('../models/admin.model.js');

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.userName || !req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "Admin can not be empty"
        });
    }

    // Create a Admin
    const admin = new Admin({
        userName: req.body.userName, 
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        eMail: req.body.eMail,
        phoneNumber: req.body.phoneNumber, 
        password: req.body.password,
    });

    // Save Admin in the database
    admin.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Admin."
        });
    });
};

// Find a single admin with user name and password
exports.getAdmin = (req, res) => {
    Admin.find({'userName':req.params.userName})
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "Admin not found with user name " + req.params.userName
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Admin not found with user name " + req.params.userName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with user name test " + req.params.userName + " " + err
        });
    });
};

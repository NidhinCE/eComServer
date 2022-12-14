const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.userName || !req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }

    // Create a User
    const user = new User({
        userName: req.body.userName, 
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        eMail: req.body.eMail,
        phoneNumber: req.body.phoneNumber, 
        password: req.body.password,
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        userName: req.body.userName, 
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        eMail: req.body.eMail,
        phoneNumber: req.body.phoneNumber, 
        password: req.body.password,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

exports.getUserByName = (req, res) => {
    User.find({'userName':req.params.userName})
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

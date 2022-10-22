const UserModel = require('../models/User')

// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        re_pass: req.body.re_pass,
        root: 'user'
    });

    await user.save().then(data => {
        res.render('results', {users: "user "+ data.name +" created successfully!"})
    }).catch(err => {

        res.render('results', {users: err.message || "Some error occurred while creating user"})
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec();

        if (user===null){
            res.status(200).render('results', {users: "user not found"
            })
        }else{
            res.status(200).render('results', {users: "user :"+ user.email +" "
                    + user.name +" "+ user.password
            })
        }

    } catch(error) {

        res.status(404).render('results', {users: error.message})
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    console.log("launched")
    const id = req.body.oldEmail;

    await UserModel.findOneAndUpdate({email: query}, {email:req.body.newEmail,
        fullName:req.body.newfullName,
        password:req.body.newpassword,

    }).then(data => {
        console.log(data)
        if (!data) {

            res.status(404).render('results', {users: `User not found.`})
        }else{

            res.render('update');
        }
    }).catch(err => {

        res.status(500).render('results', {users: err.message})
    });
}; 

exports.destroy = async (req, res) => {

    let email = req.body.email
    await UserModel.deleteOne({email: req.body.email}).then(data => {

        if (data.deletedCount===0) {

            res.status(404).render('results', {users: "User not found"})

        } else {


            res.render('results', {users: "user "+ email +" deleted successfully!"})
        }
    }).catch(err => {

        res.status(500).render('results', {users: err.message})
    })
}
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        console.log("launched")
        res.status(200).render('results', {users: user})
    } catch(error) {
        res.status(404).render('results', {users    : error.message})

    }
};
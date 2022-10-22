const AdminModel = require('../models/admin.js')
const Role = require("../models/Role");


exports.create = async (req, res) => {
    if (!req.body.email && !req.body.name && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const adminRole = await Role.findOne({value: "ADMIN"})

    const admin = new AdminModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        re_pass: req.body.re_pass,
        roles: [adminRole.value]
    });

    await admin.save().then(data => {

        res.render('results', {users: "admin "+ data.name +" created succesfully!"})
    }).catch(err => {

        res.render('results', {users: err.message || "Some error occurred while creating user"})
    });


};

var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    re_pass:  {
        type: String,
        required: true,
    },
    roles: [{
        type:String,
        ref: 'Role'
    }]
});
var Admin = new mongoose.model('Admin', schema);
module.exports = Admin;
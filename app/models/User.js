const {Schema, model} = require('mongoose')

const User = new Schema({
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
        required: true
    },
    re_pass:  {
        type: String,
        required: true,
    },
    roles: [{
        type:String,
        ref: 'Role'
    }]
})

module.exports = model('User', User)
var mongoose = require('mongoose');
var purchase = new mongoose.Schema({
    productName: {
        type: String,
        unique: true,
        required: true,
    },
    cost: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
});
var Purchase = new mongoose.model('Purchase', purchase);
module.exports = Purchase;
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user_id : String,
    products : [{
        productId : String,
        quantity : Number
    }]
});

const cartModel = mongoose.model('carts',cartSchema);

module.exports = cartModel;
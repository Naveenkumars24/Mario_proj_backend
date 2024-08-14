const mongoose = require('mongoose');
const { v4 : uuidv4  } = require('uuid');

const productSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4() },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: String , required : true},
    category: { type: String, required: true },
    image: { type: String, required: true },
});

const productModel= mongoose.model('product',productSchema)

module.exports = productModel;
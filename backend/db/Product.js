const mongoose = require('mongoose');

// Define Schema
const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
},{collection:"Product"});

// Define model
const productModel = mongoose.model('products',productSchema);

module.exports = productModel;
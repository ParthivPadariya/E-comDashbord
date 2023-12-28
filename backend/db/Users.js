// Hear we define Users Schema and model
const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    // password:String
});

// Model
// const userModel = mongoose.model('users',userSchema);
// module.exports = userModel;
module.exports = mongoose.model('users',userSchema)
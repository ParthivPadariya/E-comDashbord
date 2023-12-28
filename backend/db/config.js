const mongoose = require('mongoose');

function Connection() {
    mongoose.connect('mongodb://127.0.0.1:27017/Data',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("connection Started"))  
    .catch((err)=>{console.log("Server Not Connected")})
}

module.exports = Connection;
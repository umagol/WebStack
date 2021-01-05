const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    
    Name:String,
    Email:String,
    Password:String,
})

module.exports = mongoose.model('auth',authSchema);
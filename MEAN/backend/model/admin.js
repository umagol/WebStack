const { text } = require("express");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    
    AdminName:String,
    AdminEmail:String,
    AdminAbout: String,
    AdminPassword:String
    
})

module.exports = mongoose.model('admin',adminSchema);
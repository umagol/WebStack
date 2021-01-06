const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    UserName:String,
    UserEmail:String,
    UserAbout: String,
    ProfileImage: String,
})

module.exports = mongoose.model('user',userSchema);
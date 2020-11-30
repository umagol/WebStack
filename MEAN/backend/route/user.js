//Export
const route = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/user");
const Auth = require("../model/auth");

route.get( "/", verify, async(req, res) => {
    try {
        const allUser = await User.find();
        //find() use for finding data in db and findOne() are use fine single data 
        res.status(200).json(allUser);
    }
    catch (error) {
        res.status(400).json({ message: error });//catch Error
    }
});

route.get( "/singaluser", verify, async(req, res) => {
    try {
        var email = req.user.Email;
        const oneUser = await User.findOne({UserEmail: email} ); //Id is pass by url

        res.json({
            Email: oneUser.UserEmail,
            About: oneUser.UserAbout,
            Name: oneUser.UserName
        });
    } catch (error) {
        res.json({ message: error });
    }
}); 

route.delete("/delete/:id", verify, async(req, res) => {
try {
    console.log(req.params.id);
    const DeleteUser = await User.findOneAndDelete({UserEmail:req.params.id});
    const DeleteAuth = await Auth.findOneAndDelete({Email:req.params.id});
    res.json(DeleteUser);    
} catch (error) {
   console.log(error); 
}
});

route.put( "/:id", (req, res) => {
    var id = req.params.lilistingid;
});

module.exports = route;

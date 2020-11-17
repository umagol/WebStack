//Export
const route = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/user");


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

route.get( "/:id",verify, async(req, res) => {
    
    try {
        const oneUser = await User.findById(req.user); //Id is pass by url
        res.json(oneUser);
    } catch (error) {
        res.json({ message: error });
    }

});

route.post( "/:id", (req, res) => {
    var id = req.params.id;
});


route.delete( "/:id", (req, res) => {
    var id = req.params.lilistingid;

});

route.put( "/:id", (req, res) => {
    var id = req.params.lilistingid;

});


module.exports = route;
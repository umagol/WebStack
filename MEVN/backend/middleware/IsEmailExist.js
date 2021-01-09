const Auth = require("../model/auth");

module.exports = async(req, res, next) => {
    console.log(req.body.email);
    // checking user email id in database
    //email is not exit so fill the data in db
    
    const emailExit = await Auth.findOne({
        Email: req.body.email
    });
    //check email is exit or not
    if (emailExit) {
        return res.status(400).send({ error : "Email is Invalid"});    
    }
    next();  
};
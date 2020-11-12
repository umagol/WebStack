const route = require("express").Router();
const bcrypt = require("bcryptjs");
const Auth = require("../model/auth");
const User = require("../model/user");
const Admin =require("../model/admin");
const jwt = require("jsonwebtoken");

route.post("/login", async (req, res) => {

    // checking user email id and Psaaword in database
    const user = await Auth.findOne({ Email: req.body.email });

    //if it is not exit send error
    if (!user) {
        return res.status(200).send({ error : "Email Invalid"});
    }

    //Encrypt Password and check
    const validPass = await bcrypt.compare(req.body.password, user.Password);

    if (!validPass) {
        return res.status(200).send({ eror : "Password Invalid"});
    } else {
        // creat and assign a token
        if(user.AccountType == "user"){
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET); //send token in userid 
            res.header("auth-token", token).status(201).send({ usertoken: token });
        }  
        else
        if(user.AccountType == "admin")
        {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET); //send token in userid 
            res.header("auth-token", token).status(201).send({ admintoken: token });
        }
    }
});

//User SignUp Route
route.post("/signup/user", async (req, res) => {

    // checking user email id in database
    const emailExit = await Auth.findOne({
        Email: req.body.email
    });
    //check email is exit or not
    if (emailExit) {
        return res.status(200).send({ eror : "Email is Invalid"});
        
    }
    //email is not exit so fill the data in db 

    // hash password  encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        //requist . bodypaser . filedname by pass data in frontend or postman
        UserName: req.body.name,
        UserEmail: req.body.email,
        UserAbout:req.body.about,
        UserPassword: hashedPassword,
    });

    const data = new Auth({
        Name:req.body.name,
        Email: req.body.email,
        Password:hashedPassword,
        AccountType:"user",
    });

    //try save the data is db and carch any error
    try {
        const savedata = await data.save();
        const savedUser = await user.save();
        res.status(201).send(savedUser); //status 201 for user post method and 200 use for get method 
    } catch (error) {
        res.status(400).send(error); //status 400 user for any error
            
    }

});


route.post("/signup/admin", async (req, res) => {

    // checking user email id in database
    const emailExit = await Auth.findOne({
        Email: req.body.email
    });
    //check email is exit or not
    if (emailExit) {
        return res.status(200).send({ eror : "Email is Invalid"});
        
    }    
    //email is not exit so fill the data in db 

    // hash password  encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new Admin({
        //requist . bodypaser . filedname by pass data in frontend or postman
        AdminName: req.body.name,
        AdminEmail: req.body.email,
        AdminAbout:req.body.about,
        AdminPassword: hashedPassword,
    });

    const data = new Auth({
        Name:req.body.name,
        Email: req.body.email,
        Password:hashedPassword,
        AccountType:"admin",
    });

    //try save the data is db and carch any error
    try {
        const savedata = await data.save();
        const savedUser = await user.save();
        res.status(201).send(savedUser); //status 201 for user post method and 200 use for get method 
    } catch (error) {
        res.status(400).send(error); //status 400 user for any error
    }

});

module.exports = route;

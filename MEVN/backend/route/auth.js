const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const Auth = require("../model/auth");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const path = require("path")
const multer  = require('multer');
const IsEmailExist = require("../middleware/IsEmailExist");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
         cb(null, `${req.params.email}` + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });






route.post("/login", async (req, res) => {
    console.log("User Is Login  "+req.body.email);
    // checking user email id and Psaaword in database
    const user = await Auth.findOne({ Email: req.body.email });

    const UserData = await User.findOne({ UserEmail: req.body.email });

    //if it is not exit send error
    if (!user) {
        return res.status(200).send({ error : "Email Invalid"});
    }

    //Encrypt Password and check
    const validPass = await bcrypt.compare(req.body.password, user.Password);

    if (!validPass) {
        return res.status(200).send({ error : "Password Invalid"});
    } else {
            const token = jwt.sign({ Email: user.Email }, process.env.TOKEN_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN, // Set Time For access token
                });
            
            //send token in userid 
            res.header("auth-token", token).status(201).send(
                {
                     Accesstoken: token,
                     UserName: UserData.UserEmail,
                     UserAbout: UserData.UserAbout
                });
    }
});

//User SignUp Route
route.post("/signup", IsEmailExist, async (req, res) => {
    console.log("User Is Signup");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create new user
    const user = new User({
        //requist . bodypaser . filedname by pass data in frontend or postman
        UserName: req.body.name,
        UserEmail: req.body.email,
        UserAbout: req.body.about,
    });
    const auth = new Auth({
        Name:req.body.name,
        Email: req.body.email,
        Password:hashedPassword,
    });

    //try save the data is db and carch any error
    try {
        const savedata = await auth.save();
        const savedUser = await user.save();
        res.status(201).send(savedUser); //status 201 for user post method and 200 use for get method 
    } catch (error) {
        res.status(400).send(error); //status 400 user for any error
    }
});

route.post("/uploadprofile/:email",upload.single('image'), async (req, res) => {
        const email = req.params.email;
        console.log(" uploda image  "+email);

        await User.findOneAndUpdate({UserEmail: email},{$set:{
            ProfileImageName:req.file.filename,
            ProfileImagePath: `http://localhost:5000/${req.file.path}`,
        }}  ,
        {
            multi:true
        },
        function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        });
        res.send({"greate":"good"});
    });




/**
 * Not Wrokin Well 
 */
// route.post('/changepassword',(req, res)=>{
//     var  data = req.query.email.split(",");
//     var  email = data[0];
//     var username = data[1];
     
//      if(!req.query.email){
//       var error = [{mssg: "Fill email!"}];
//       res.send(error);
//     }else {
//     user.findOne({Username:username,Email:email}, function(err, result) {
//           if(result){
//             console.log(result)

//             var lid = result.Login_id;
//             console.log("loginid",lid);

//            var otp = Math.floor((Math.random() * 10000) + 1);
//            if(result){

//             var transporter = nodemailer.createTransport({
//               host: 'smtp.gmail.com',
//               port: 587,
//               secure: false, // true for 465, false for other ports
//               auth: {
//                   user: 'testwork@gmail.com', // generated ethereal user
//                   pass: 'testwork'  // generated ethereal password
//               },
//               tls:{
//                 rejectUnauthorized:false
//               }
//             });
          
//             var mailOptions = {
//               from: 'testwork@gmail.com',
//               to: email,
//               subject: 'Change Password!',
//               text: 'OTP of password change : '+otp+'.'
//             };
//             transporter.sendMail(mailOptions, function(error, info){
//               if (error) {
//                 console.log(error);
//               } else {
//                 console.log('Email sent: ' + info.response);
                  
//                   var myquery = { Login_id:lid };
//                   var newvalues = {$set:{ OTP: otp}};
//                   user.updateOne(myquery, newvalues, function(err, results) {
//                     if (err) throw err;
//                     console.log("1 document updated");
//                     var m = [{mssg: "otp_sent",otp:otp}];
//                     res.send(m);       
//                   });
//               }
//             });
//            }
//            else{
//            var error = [{mssg: "Email doesn't exits"}];
//            res.send(error);
//            }
//           }
//           else{
//             var error = [{mssg: "Username doesn't exits"}];
//           res.send(error);
//           }
//        });
//     }
// });



module.exports = route;



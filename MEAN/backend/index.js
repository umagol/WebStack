// Export Model
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./route/user");
const Admin = require("./route/admin");
const Auth = require("./route/auth");
const cors = require("cors");

//Dotenv config
dotenv.config();

//DB Connection
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    ()=>console.log('DB is Connect')
);

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/api/user", User);
app.use("/api/admin", Admin);
app.use("/api/auth", Auth);

app.listen(5000,()=>console.log("Server is runing on 5000 port"));



//List of all Mongoose Function for Query

// Model.deleteMany()
// Model.deleteOne()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndRemove()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()

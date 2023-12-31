const express = require("express");

const port = 8080;

const app = express();

const path = require("path")

const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        var con = await mongoose.connect("mongodb+srv://hensibhimani5:Hensi123@cluster0.gqlfvrw.mongodb.net/Bloging", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if(con){
            console.log("Db is connected");
        }
    }
    catch(err){
        console.log("Db is not connected");
    }
}


connectDB();

// mongoose.connect("mongodb+srv://hensibhimani5:Hensi123@cluster0.gqlfvrw.mongodb.net/", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
// }).then((res)=>{
//     console.log("Connected");
// })
// .catch((err)=>{
//     console.log(err);
// })




const admin = require("./models/adminmodel");
const passport = require('passport');

const localStrategy = require("./config/passport-local-strategy");

const session = require('express-session');

const cookieparser = require('cookie-parser');

const flash = require('connect-flash');
const middleWare = require('./config/middleware');
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(cookieparser());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "user_assets")));

app.use(session({
    name : "RNW",
    secret : "CodeData",
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 60*60*1000
    }
}))

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser);

app.use(middleWare.setFlash);


app.use("/admin", require("./routs/admin"));
app.use("/", require("./routs/user"));

app.listen(port, function (err) {
    if (err) {
        console.log("server is not running");
        return false;

    }
    else {
        console.log("server is running on port:", port)
    }
});




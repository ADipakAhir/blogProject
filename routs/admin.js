const express = require("express");

const route = express.Router();

const admin = require("../models/adminmodel");

const passport = require('passport');

// console.log("admin connect");

const admincontroller = require("../controller/admincontroller");

route.get('/',(req,res)=>{
    // console.log(req.cookies.adminRecord);
    // if(req.cookies.adminRecord != undefined){
    //     return res.redirect("/admin/deshbord");
    // }

    if(req.isAuthenticated()){
        return res.redirect('/admin/deshbord');
    }
    return res.render('admin_login');
});

route.get("/logout" , async(req,res)=>{
    // res.clearCookie('adminRecord')
    await req.session.destroy(function(err){
        if(err){
            console.log("something wrong");
            return false;
        }
        return res.redirect("/admin/");
    });
});

route.post('/checklogin', passport.authenticate('local',{failureRedirect : "/admin/"}),admincontroller.checklogin);

route.get("/deshbord", passport.checkAuthentication,admincontroller.deshbord);

route.get("/add_admin",passport.checkAuthentication,admincontroller.add_admin);

route.get("/view_admin", passport.checkAuthentication,admincontroller.view_admin);

route.post("/insertdata",admin.uplodeadavatar, admincontroller.insertdata);

route.get("/deleteAdminRecord/:id", passport.checkAuthentication,admincontroller.deleteAdminRecord);

route.get("/UpdateAdminRecord/:id" ,passport.checkAuthentication, admincontroller.UpdateAdminRecord);

route.post("/EditRecord" , admin.uplodeadavatar , admincontroller.EditRecord);

route.post("/EditPassword", passport.checkAuthentication, admincontroller.EditPassword);

route.get("/changePassword",passport.checkAuthentication, async(req,res)=>{
    return res.render('changePassword');
})

route.get("/viewprofile" , passport.checkAuthentication,async(req,res)=>{
    
  
        return res.render("viewprofile");
   
});




route.get("/forgetpass", async (req,res)=>{
    return res.render('forgetPass');
})

route.post("/checkForgetPass", admincontroller.checkForgetPass);



route.get("/pageOtp",async(req,res)=>{
    return res.render('checkOtp');
})

route.post("/verifyOTP", admincontroller.verifyOTP);

route.get("/resetPassword", async (req,res)=>{
    return res.render("resetPass");
})
route.post("/verifyResetPassword", admincontroller.verifyResetPassword);



route.use("/slider",passport.checkAuthentication, require("./slider"));

route.use("/post", passport.checkAuthentication, require('./Post'));

route.use("/category",passport.checkAuthentication, require('./category'));
route.use("/subcategory",passport.checkAuthentication, require('./subcategory'));
module.exports = route;
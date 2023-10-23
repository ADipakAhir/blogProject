const Admin = require('../models/adminmodel');

const path = require('path');

const fs = require('fs');

const admin = require('../models/adminmodel');

const nodeMailer = require('nodemailer');

module.exports.checklogin = async(req,res)=>{
    req.flash('success', 'Successfully Login')
    return res.redirect('/admin/deshbord');
}

module.exports.deshbord = async (req, res) => {
    
    console.log("Dashboard page");
    return res.render("deshbord");
};

module.exports.add_admin = async(req,res)=>{
  
    return res.render("add_admin");
};

module.exports.view_admin = async(req ,res)=>{

    let adminData = await Admin.find({});
    if(adminData){
        return res.render("view_admin",{
            adminData : adminData,
            adminDatamatch : req.cookies.adminRecord
        });
    }
    else{
        console.log("Record not found");
        return res.redirec('/admin/add_admin');
    }

   
};

module.exports.insertdata = async(req,res)=>{
    var name = req.body.fname+" "+req.body.lname;
    req.body.name = name;
   
    var img = '';
    if(req.file){
        img = Admin.avatarpath+"/"+req.file.filename;
    }
    req.body.admin_image = img;

    let data = await Admin.create(req.body);
    if(data){
        console.log("record inserted");
    }
    else{
        console.log("Something wrong");
    }
    req.flash("success","Record inserted successfully");
    return res.redirect('/admin/view_admin');
}


module.exports.deleteAdminRecord = async (req,res) =>{
    // console.log(req.params.id)
    let oldData = await Admin.findById(req.params.id);
    if(oldData){
        var imgPath = path.join(__dirname,"..",oldData.admin_image);
        if(imgPath){
            await fs.unlinkSync(imgPath);
        }
        let removeData = await Admin.findByIdAndDelete(oldData.id);
        if(removeData){
            console.log("file and record deleted successfully!!");
        }
        else{
            console.log("record not delete");
        }
    }
    else{
        console.log("Record not found");
    }
    req.flash("success","Record Deleted successfully");
    return res.redirect('/admin/view_admin');
}

module.exports.UpdateAdminRecord = async(req,res)=>{
    let findata = await Admin.findById(req.params.id);
    if(findata){
        // console.log(findata);
        return res.render('update_admin' , {
            singledata : findata,
            adminDatamatch : req.cookies.adminRecord
        });
    } 
    else{
        console.log("record not found");
    }
    return res.redirect("/add_admin");
}

module.exports.EditRecord = async(req,res)=>{
    console.log(req.body);
    var EditId = req.body.EditId;
    let existOld = await Admin.findById(req.body.EditId);
    if(existOld){
        if(req.file){
            var imgpath = path.join(__dirname,'..',existOld.admin_image);
            console.log(imgpath);
            try{
                await fs.unlinkSync(imgpath);
            }
            catch(err){
                console.log(err);
            }
            var newImgPath = Admin.avatarpath+'/'+req.file.filename;
            req.body.admin_image = newImgPath;

        }
        else{
            let oldImg = existOld.admin_image;
            req.body.admin_image = oldImg;
        }
        req.body.name = req.body.fname+" "+req.body.lname;
        delete(req.body.EditId);
        delete(req.body.fname);
        delete(req.body.lname);
        delete(req.body.submit);
        console.log(req.body);
        let updateRecord = await Admin.findByIdAndUpdate(EditId,req.body);
        if(updateRecord){
            console.log("Record updated successfully");
        }
        else{
            console.log("somthing wrong");
        }
    }
    else{
        console.log("Record not found for update");
    }
    return res.redirect("/admin/view_admin");
}


module.exports.EditPassword = async (req,res) =>{
   if(req.user.password === req.body.cpass){
        if(req.body.cpass !== req.body.npass){
            if(req.body.npass === req.body.copass)
            {
                await Admin.findByIdAndUpdate(req.user.id,{password: req.body.npass});
                return res.redirect('/admin/logout');
            }
            else{
                console.log("New password and Confirm password are not match");
            }
        }
        else{
            console.log("current password and new password are match");
        }
    }
    else{
        console.log("current password and db password not match");
    }
}



module.exports.checkForgetPass = async (req,res) =>{
    // console.log(req.body);
    let adData = await Admin.findOne({email:req.body.email}).countDocuments();
    if(adData==1){
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
            
              user: "rwn2developerfaculty@gmail.com",
              pass: "vumjezglggfghjvf",
            },
          });

          do {
            number = Math.floor(Math.random() * 99999);
          } while (number < 10000);

          res.cookie('otp',number);
          res.cookie('email',req.body.email);


          const info = await transporter.sendMail({
            from: 'rwn2developerfaculty@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "FORGET PASSWORD ", // Subject line
            text: "YOur OTP is HERE", // plain text body
            html: `<b>YOUR OTP IS HERE: ${number} </b>`, // html body
          });

        console.log("Email sent successfully");
        return res.redirect('/admin/pageOtp');
    }
    else{
        console.log("Email not Found");
        return res.redirect('back');
    }
}


module.exports.verifyOTP = async (req,res) =>{
    console.log(req.cookies.otp);
    console.log(req.body.otp);
    if(req.cookies.otp == req.body.otp){
        return res.redirect('/admin/resetPassword')
    }
    else{
        console.log("OTP not Match");
        return res.redirect('back');
    }
}

module.exports.verifyResetPassword = async (req,res) =>{
    // console.log(req.body);
    let email = req.cookies.email;
    if(req.body.npass == req.body.cpass){
        let oldEmailData = await Admin.findOne({email:email});
        if(oldEmailData){
            await Admin.findByIdAndUpdate(oldEmailData.id,{password: req.body.npass});
            res.clearCookie('otp');
            res.clearCookie('email');
            return res.redirect('/admin');
        }
        else{

            console.log("Email not found");
        }
    }
    else{
        console.log("New and confirm password not match");
    }
}
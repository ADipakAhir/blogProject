const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/adminimage";

const path = require ("path");

const adminschema = mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    password:{
        type : String,
        required:true
    },

    phone:{
        type : Number,
        required:true
    },
    gender:{
        type : String,
        required:true
    },
    city:{
        type : String,
        required:true
    },
    hobby:{
        type : Array,
        required:true
    },
    admin_image:{
        type :String,
        required:true
    },
    message : {
        type : String,
        required : true
    }

});

const storage1 = multer.diskStorage({
    destination :function(req , file,cb){
        cb(null,path.join(__dirname,"..",AVATAR_PATH));
    },

    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }

});

adminschema.statics.uplodeadavatar = multer({storage:storage1}).single("admin_image");
adminschema.statics.avatarpath = AVATAR_PATH;

const admin = mongoose.model("admin", adminschema)
module.exports = admin;
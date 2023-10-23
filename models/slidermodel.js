const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/sliderimage";

const path = require ("path");

const sliderschema = mongoose.Schema({
    title:{
        type : String,
        required:true
    },
    slider_image:{
        type :String,
        required:true
    },
    content : {
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

sliderschema.statics.uplodeadavatar = multer({storage:storage1}).single("slider_image");
sliderschema.statics.avatarpath = AVATAR_PATH;

const slider = mongoose.model("slider", sliderschema)
module.exports = slider;
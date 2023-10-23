const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/postImage";

const path = require ("path");

const postschema = mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    postDate:{
        type : String,
        required : true
    },
    title:{
        type : String,
        required:true
    },
    category:{
        type : String,
        required:true
    },
    post_image:{
        type :String,
        required:true
    },
    message : {
        type : String,
        required : true
    },
    isActive :{
        type: Boolean,
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

postschema.statics.uplodeadavatar = multer({storage:storage1}).single("post_image");
postschema.statics.avatarpath = AVATAR_PATH;

const post = mongoose.model("post", postschema)
module.exports = post;
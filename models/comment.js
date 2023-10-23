const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/postImage/commentImages";

const path = require ("path");

const commentschema = mongoose.Schema({
    PostId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "post",
        required : true
    },
    name:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    commentimage:{
        type :String,
        required:true
    },
    message : {
        type : String,
        required : true
    },
    dateTime : {
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

commentschema.statics.uplodeadavatar = multer({storage:storage1}).single("commentimage");
commentschema.statics.avatarpath = AVATAR_PATH;

const comment = mongoose.model("comment", commentschema)
module.exports = comment;
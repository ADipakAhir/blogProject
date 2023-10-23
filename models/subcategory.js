const mongoose = require("mongoose");

const multer = require("multer");

const AVATAR_PATH = "/uploads/subcatImages";

const path = require ("path");

const Subcategoryschema = mongoose.Schema({
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "category",
        required : true
    },
    title:{
        type : String,
        required:true
    },
    subcat_image:{
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

Subcategoryschema.statics.uplodeadavatar = multer({storage:storage1}).single("subcat_image");
Subcategoryschema.statics.avatarpath = AVATAR_PATH;

const subcategory = mongoose.model("subcategory", Subcategoryschema)
module.exports = subcategory;
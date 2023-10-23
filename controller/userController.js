const Slider = require("../models/slidermodel");
const Post = require("../models/postmodel");
const Comment = require('../models/comment');

const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

module.exports.home = async (req,res) =>{
    let SliderData = await Slider.find({});
    let PostData = await Post.find({isActive:true});

    return res.render("users/index",{
        SliderData : SliderData,
        PostData : PostData
        
    });
}

module.exports.singleBlog = async (req,res) =>{
    let singleBlog = await Post.findById(req.params.id);
    
    let recentData = await Post.find().sort({'_id': -1}).limit(3)

    let allPostIds = await Post.find({},{id: 1});
    // console.log(allPostIds);
    var next = -1;
    allPostIds.map((v,i)=>{
        // console.log(v.id);
        if(v.id==req.params.id){
            next = i;
        }
    })

    var prev = -1;
    allPostIds.map((v,i)=>{
        // console.log(v.id);
        if(v.id==req.params.id){
            prev = i;
        }
    })

    let commentByPost = await Comment.find({'PostId':req.params.id});
    let commentByCount = await Comment.find({'PostId':req.params.id}).countDocuments();


    return res.render("users/single_blog",{
         blogDetails : singleBlog,
         allComment : commentByPost,
         countComment  :commentByCount,
         next :  allPostIds[next+1]?allPostIds[next+1].id:undefined,
         prev :  allPostIds[prev-1]?allPostIds[prev-1].id:undefined,
         recentData : recentData
    });
}

module.exports.addComment = async (req,res) =>{
    console.log(req.body);
    console.log(req.file);
    var commentPath='';
    if(req.file){
        commentPath = Comment.avatarpath+"/"+req.file.filename;
    }
    req.body.commentimage = commentPath;
    var dateWithoutSecond = new Date();
    dateWithoutSecond.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    req.body.dateTime = dateWithoutSecond;  
    await Comment.create(req.body);
    return res.redirect('back');
}


module.exports.workThreeColumn = async (req,res) =>{
    let catData = await Category.find({});
    let subData = await Subcategory.find({});
    return res.render("users/workColumn",{
        catData :catData,
        subData : subData
    });
}
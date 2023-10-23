const moment = require('moment/moment');
const Post = require('../models/postmodel');
const Comment = require("../models/comment");



module.exports.postPage = (req,res) =>{
    return res.render('add_post');
}


module.exports.insertdata = async (req,res) =>{
    // console.log(req.file);
    // console.log(req.body);
    var postImage = '';
    if(req.file){
        postImage = Post.avatarpath+"/"+req.file.filename;
    }
    req.body.name = req.user.name;
    // req.body.postDate =  new Date().toLocaleDateString();
    var date = moment();
    req.body.postDate = moment().format("D/MM/YYYY");
    req.body.post_image = postImage;
    req.body.isActive = true;
    Post.create(req.body);
    return res.redirect('back');
}


module.exports.view_post = async (req,res) =>{
    console.log(req.query.search);
    var search ='';
    if(req.query.search)
    {
        search = req.query.search;
    }

    var page = 0;
    if(req.query.page){
        page = req.query.page;
    }
    limit = 5;
    let postData =  await Post.find({
        $or : [
            { name : { $regex : ".*"+search+".*", $options : "i"}},
            { category : {$regex : ".*"+search+".*"}}
        ]
    })
    .skip(page*limit)
    .limit(limit);

    let countPost =  await Post.find({
        $or : [
            { name : { $regex : ".*"+search+".*", $options : "i"}},
            { category : {$regex : ".*"+search+".*"}}
        ]
    }).countDocuments();

    let setPage = Math.ceil(countPost/limit)
    console.log(setPage);

    return res.render('view_post',{
        postData : postData,
        totalPage : setPage,
        search : search,
        currentPage : page
    })
}

module.exports.activeData = async (req,res) =>{
    let updateData = await Post.findByIdAndUpdate(req.params.id,{isActive:false});
    req.flash("success","Record deactive Successfully");
    return res.redirect('back');
}

module.exports.deactiveData = async (req,res) =>{
    let updateData = await Post.findByIdAndUpdate(req.params.id,{isActive:true});
    req.flash("success","Record Active Successfully");
    return res.redirect('back');
}

module.exports.deleteMultiRecord = async (req,res) =>{
    // console.log(req.body.delAll);
    await Post.deleteMany({'_id':{'$in':req.body.delAll}})
    req.flash("success","All Record Deleted  Successfully");
    return res.redirect('back');
}


module.exports.viewComment = async (req,res) =>{
    console.log(req.query.search);
    var search ='';
    if(req.query.search)
    {
        search = req.query.search;
    }

    var page = 0;
    if(req.query.page){
        page = req.query.page;
    }
    limit = 5;
    let postData =  await Comment.find({
        $or : [
            { name : { $regex : ".*"+search+".*", $options : "i"}},
            { message : {$regex : ".*"+search+".*"}}
        ]
    }).populate('PostId')
    .skip(page*limit)
    .limit(limit);

    console.log(postData);

    let countPost =  await Comment.find({
        $or : [
            { name : { $regex : ".*"+search+".*", $options : "i"}},
            { category : {$regex : ".*"+search+".*"}}
        ]
    }).populate('PostId').countDocuments();

    let setPage = Math.ceil(countPost/limit)
    console.log(setPage);

    return res.render('view_comment',{
        postData : postData,
        totalPage : setPage,
        search : search,
        currentPage : page
    })
}
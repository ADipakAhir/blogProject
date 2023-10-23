
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

module.exports.add_subcategory = async (req,res) =>{

    let CatData = await Category.find({});
    return res.render('add_subcategory',{
        catData : CatData
    })
}


module.exports.insertSubData = async (req,res) =>{
    console.log(req.file);
    console.log(req.body);
    var imgPath ='';
    if(req.file){
        imgPath = Subcategory.avatarpath+"/"+req.file.filename;
    }

    req.body.subcat_image= imgPath;

    await Subcategory.create(req.body);
    req.flash("success","Subcategory Added Successfully");
    return res.redirect('back');
}


module.exports.viewSubcategory = async (req,res) =>{
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
    let postData =  await Subcategory.find({
        $or : [
            { title : { $regex : ".*"+search+".*", $options : "i"}},
            { content : {$regex : ".*"+search+".*"}}
        ]
    }).populate('categoryId')
    .skip(page*limit)
    .limit(limit);

    console.log(postData);

    let countPost =  await Subcategory.find({
        $or : [
            { title : { $regex : ".*"+search+".*", $options : "i"}},
            { content : {$regex : ".*"+search+".*"}}
        ]
    }).populate('categoryId').countDocuments();

    let setPage = Math.ceil(countPost/limit)
    console.log(setPage);

    return res.render('view_subcategory',{
        categoryData : postData,
        totalPage : setPage,
        search : search,
        currentPage : page
    })
}

const Category = require('../models/category');

module.exports.addCategoryData = async (req,res) =>{
    // console.log(req.body);
    await Category.create(req.body);
    req.flash('success',"Category Added Successfully");
    return res.redirect('back');
}
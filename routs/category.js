const express = require('express');


const routs = express.Router();

const CategoryController = require("../controller/categoryController");


routs.get("/add_category",async (req,res)=>{
    return res.render('add_category');
})

routs.post("/insertcategory",CategoryController.addCategoryData);

module.exports = routs;
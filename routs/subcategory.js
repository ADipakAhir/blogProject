const express = require('express');


const routs = express.Router();

const Subcategory = require('../models/subcategory');

const subcategoryController = require("../controller/subcatController");


routs.get("/add_subcategory",subcategoryController.add_subcategory);

routs.post("/insertSubData",Subcategory.uplodeadavatar,subcategoryController.insertSubData);

routs.get("/view_subcategory", subcategoryController.viewSubcategory);

module.exports = routs;
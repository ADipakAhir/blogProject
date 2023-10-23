const express = require('express');

const routes = express.Router();

const Slider = require("../models/slidermodel");

const SliderController = require("../controller/sliderController");

routes.get("/add_slider",SliderController.add_slider);

routes.post("/insertdata", Slider.uplodeadavatar , SliderController.insertData);
 
module.exports = routes;
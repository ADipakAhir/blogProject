const Slider = require("../models/slidermodel");


module.exports.add_slider = async (req,res) =>{
    return res.render("add_slider");
}


module.exports.insertData = async (req,res) =>{
    console.log(req.file);
    console.log(req.body);
    var sliderPath = '';
    if(req.file){
        sliderPath = Slider.avatarpath+"/"+req.file.filename;
    }
    req.body.slider_image = sliderPath;

    await Slider.create(req.body);
    return res.redirect('back');
}
const express = require('express');

const routs = express.Router();

const postModel = require("../models/postmodel");

const PostController = require('../controller/PostController');

routs.get("/add_post", PostController.postPage);

routs.post("/insertdata",postModel.uplodeadavatar,PostController.insertdata);

routs.get("/view_post",PostController.view_post);

routs.get("/activeData/:id", PostController.activeData);
routs.get("/deactiveData/:id", PostController.deactiveData);

routs.post("/deleteMultiRecord", PostController.deleteMultiRecord);

routs.get("/view_comment", PostController.viewComment);

module.exports = routs;
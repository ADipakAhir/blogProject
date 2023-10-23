const express = require("express");

const routes = express.Router();

const UserController = require("../controller/userController");

const Comment = require("../models/comment");

routes.get("/", UserController.home);

routes.get("/single_blog/:id", UserController.singleBlog);

routes.post("/addComment",Comment.uplodeadavatar, UserController.addComment);

routes.get("/workThreeColumn", UserController.workThreeColumn);

module.exports = routes;
const express = require("express");
const {getPosts, createPost} = require("../controller/post");
const {userById} = require("../controller/user");
const {createPostValidator} = require("../validator");
const {requireSignin} = require('../controller/auth');

const router = express.Router();

router.get('/', getPosts);
//checks for validation before going to create post
router.post('/post', requireSignin, createPostValidator, createPost);
//if any route will contain :userId, our app will first execute userId()
router.param('userId', userById)

module.exports = router;
const express = require("express");
const {getPosts, createPost} = require("../controller/post");
const {createPostValidator} = require("../validator");
const {requireSignin} = require('../controller/auth');

const router = express.Router();

router.get('/',requireSignin, getPosts);
//checks for validation before going to create post
router.post('/post', createPostValidator, createPost);

module.exports = router;
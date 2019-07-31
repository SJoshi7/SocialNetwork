const express = require("express");
const {getPosts, createPost} = require("../controller/post");
const {createPostValidator} = require("../validator");

const router = express.Router();

router.get('/',getPosts);
//checks for validation before going to create post
router.post('/post', createPostValidator, createPost);

module.exports = router;
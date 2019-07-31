const express = require("express");
const {getPosts, createPost} = require("../controller/post");
const validator = require("../validator");

const router = express.Router();

router.get('/',getPosts);
//checks for validation before going to create post
router.post('/post', validator.createPostValidator, createPost);

module.exports = router;
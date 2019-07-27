const express = require("express");
const postController = require("../controller/post");

const router = express.Router();

router.get('/',postController.getPosts);
router.post('/post',postController.createPost);

module.exports = router;
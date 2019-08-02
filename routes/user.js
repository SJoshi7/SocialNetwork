const express = require("express");
const {userById, allUsers, getUser} = require('../controller/user');
const {requireSignin} = require('../controller/auth');

const router = express.Router();

router.get('/users',allUsers);
router.get('/user/:userId',requireSignin, getUser);
//if any route will contain :userId, our app will first execute userId()
router.param('userId', userById)

module.exports = router;
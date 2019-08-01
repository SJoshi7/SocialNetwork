const jwt = require("jsonwebtoken");
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require("../models/user");

exports.signup = async (req,res) => {
	const userExists = await User.findOne({email: req.body.email});
	if(userExists)
		return res.status(403).json({
			error: "Email is already in use!"
		});
	const user = await new User(req.body);
	await user.save();
	res.status(200).json({message: "Signup sucess! Please Login"})
}

exports.signin = (req,res)=>{
	//finding the user based on email
	const {email, password} = req.body;
	User.findOne({email}, (err,user)=>{
		//if error or no user
		if(err || !user){
			return res.status(401).json({
				error:"User with that email does not exist. Please signup!"
			})
		}
		//if user is found, email and pswd match
		//create auth method in model and use here
		if(!user.authenticate(password)){
			return res.status(401).json({
				error:"Email and password doesn't match!"
			})
		}	
		//generate a token with user id and secret
		const token =  jwt.sign({_id:user._id},process.env.JWT_SECRET);
		//persist the token in the cookie with exp date
		res.cookie("t",token, {expire:new Date() + 9999})
		//return response with user and token to frontend client
		const {_id, name, email} = user;
		return res.json({token, user: {_id, email, name}});

	})
	
}

exports.signout = (req,res) => {
	res.clearCookie("t");
	return res.json({message:"Signout successful!"})
}

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET
})
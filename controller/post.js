const Post = require("../models/post");

exports.getPosts = (req,res) => {
	const posts = Post.find().select("_id title body")
	.then(posts=>{
		//when key and value are same we can only write one, posts:posts can be written as posts
		res.json({posts})
	})
	.catch(err=>console.log(err))
};

exports.createPost = (req,res) => {
	const post = new Post(req.body);
	post.save()
	.then(result =>{
		res.json({
			post:result
		})
	}) 
};
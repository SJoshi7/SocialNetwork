exports.createPostValidator = (req,res,next)=>{
	//title
	req.check("title","Write a Title").notEmpty();
	req.check("title","Title must be between 4-150 characters").isLength({
		min:4,
		max:150
	});
	//body
	req.check("body","Write a body").notEmpty();
	req.check("body","Body must be between 4-2000 characters").isLength({
		min:4,
		max:2000
	});
	//check for errors
	const errors = req.validationErrors();
	//if error show the first error as it takes place
	if(errors){
		const firstError = errors.map((error)=>error.msg)[0]
		return res.status(400).json({error: firstError})
	}
	//proceed to next middleware
	next();
}

exports.userSignupValidator = (req,res,next) => {
	//name is not null and b/w 4-20 char
	req.check("name","Name is required").notEmpty();
	//email
	req.check("email","Email must be between 3-32 characters")
	.matches(/.+@.+\..+/)
	.withMessage("Email must contain @")
	.isLength({
		min:4,
		max:2000 
	})
	//check for password
	req.check("password","Password is required").notEmpty();
	req.check('password')
	.isLength({	min:6})
	.withMessage("Password must contain 6 characters")
	.matches(/\d/)
	.withMessage("Password must contain a number")
	//check for erros
	const errors = req.validationErrors();
	if(errors){
		const firstError = errors.map(error=>error.msg)[0];
		return res.status(400).json({error:firstError});
	}
	next();
}
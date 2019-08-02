const express = require('express');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')
const mongoose = require('mongoose');
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

dotenv.config();
//db
mongoose.connect(
	process.env.MONGO_URI,
	{useNewUrlParser: true}
	)
.then(()=>console.log("DB connected"))
//if error
mongoose.connection.on('error',err=>console.log(`DB connection ERROR: ${err.message}`))

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function(err,req,res,next){
	if(err.name === "UnauthorizedError"){
		res.status(401).json({error:"Unauthorized!"});
	}
})

const port = 8000;
app.listen(port, ()=>{
	console.log(`A nodejs api listening on port: ${port}`);
});
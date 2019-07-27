const express = require('express');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRoutes = require("./routes/post");

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
app.use("/",postRoutes);

const port = 8000;
app.listen(port, ()=>{
	console.log(`A nodejs api listening on port: ${port}`);
});
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
);

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// set up cluster in MongoDB Atlas.
// used connection string to connect Atlas to Heroku (see config vars)
// connected Github to NoSQL Fitness Tracker Repo

// *** When we go to deploy the main branch getting an error.......

//Build main 2c48dd20
//There was an issue deploying your app. View the build log for details.

//-----> Building on the Heroku-20 stack
//-----> Determining which buildpack to use for this app
 //!     No default language could be detected for this app.
	//		HINT: This occurs when Heroku cannot detect the buildpack to use for this application automatically.
		//	See https://devcenter.heroku.com/articles/buildpacks
 // !     Push failed
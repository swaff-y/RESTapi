//to use env we need to use dotenv
//.config method pull all of our ENV variables from our .env file
require("dotenv").config();

//require express for teh server
const express = require('express');
//app variable to configure our server
const app = express();
//Require mongoose to connect to our mongodb database
const mongoose = require('mongoose');

//connect to our database
//need to pull databse url out into an env variable
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true});
//A variable to store mongo connection
const db = mongoose.connection;
//See if there is an error connecting to our database
db.on('error', (error) => console.error(error));
//message to see that we have connected to the database
db.once('open', () => console.log('connected to database'));

//setup server to use JSON
//middleware - used before it gets passed to your routes
// lets our server accept json as a body instead of a post or get element
app.use(express.json());

//setup our routes
const subscribersRouter = require("./routes/subscribers");
//localhost:3000/subscribers
app.use('/subscribers', subscribersRouter);


//the port to listen on
//npm run devStart -> to start server
app.listen(3000, () => console.log('Server started'));

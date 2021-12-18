const express = require('express');
const cors = require('cors'); //Cross-Origin Resource Sharing variable
const mongoose = require('mongoose'); // mongoose connection
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// above is a different way to do imports

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // port the server will be on


//middleware 
app.use(cors());
app.use(express.json());
//tells the app to go to a folder and use these items
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

/**
 * Explanation about this process.env, it is basically where your database connection is
 * it can be named to anything. So long as in that location is your database connection info
 * in my case it is a MongoDB connection
 */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true} //connect to the database
    );
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB connection established.") //confirmation message connection was successful
})



app.listen(port, () => { //tells what port the server will be on
    console.log(`Server is running on port: ${port}`);
});
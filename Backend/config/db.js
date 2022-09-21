// this is a config file to connect to mongoDB Database
const mongoose = require('mongoose');
//this is the mongodb connection string which we have stored insode mongoURI
const mongoURI = "mongodb://localhost:27017/INoteBook-Development";

const connectToMongo= () =>{
    mongoose.connect(mongoURI,
        //this is the callback that we have fired after the connection to the database is successful
         ()=>{
        console.log("Connected to MongoDB Successfully");
    })
}

module.exports = connectToMongo;
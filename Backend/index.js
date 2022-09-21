const express = require('express')
const connectToMongo = require('./config/db');
const app = express()
const port = 8080

//here we connect to the MongoDb Database
connectToMongo();



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
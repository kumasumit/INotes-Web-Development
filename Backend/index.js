//here we handle all the imports/requires
// require("./constants");
//here path is relative to the project root INOTES-WEB-DEVELOPMENT
require("dotenv").config({ path: "Backend/.env", debug: true });
// const { JWT_TOKEN } = processs;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongo = require("./config/db");
//here all the imports/requires end

const app = express();
const port = 8080;
app.use(cors());
//here we connect to the MongoDb Database
connectToMongo();
//this is a middleware to read json data sent in the body of request
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//All te routes will go through index.js inside routes
//make sure app.use for routes is at the end of the file,
app.get("/", (req, res) => {
  res.send(
    "<h1>Hello World!!! <br/>from Inotes Web Express Api by Kumar Sumit<h1>"
  );
});
//so that routes are loaded only after all the other middlewares that is after all app.use cases
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`INotebook backend app listening on port ${port}`);
});

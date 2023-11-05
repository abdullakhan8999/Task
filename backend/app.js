const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Config
if (process.env.NODE_ENV !== "production") {
   require("dotenv").config({ path: "Config/.env" })
}

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
   cors({
      origin: process.env.CLIENT_API,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
   })
);

//router 
app.get('/', (req, res) => {
   res.send("<h1>Welcome to user oauth</h1>")
})
app.use("/auth", require("./Routers/AuthRouter.js"));

module.exports = app;
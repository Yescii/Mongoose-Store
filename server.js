// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
// const Book = require("./models/book.js");
const app = express();
require("dotenv").config();

// MIDDLEWARE and Static Files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// ROUTES/ CONTROLLERS
const storeController = require("./controllers/store.js");
app.use("/store", storeController);

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This server works on port: ${PORT}`);
});

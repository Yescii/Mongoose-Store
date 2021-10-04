const mongoose = require("mongoose");

//Scehema template created with mongoose
const storeSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  qty: Number,
});

//Store the schema create to Store
const Store = mongoose.model("Store", storeSchema);

module.exports = Store;

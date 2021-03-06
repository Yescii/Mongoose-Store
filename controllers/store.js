// Dependencies
const express = require("express");
const storeRouter = express.Router();
const Store = require("../models/StoreDB.js");

storeItems = [
  {
    name: "bread",
    discription: "Mixed with natural milk or water, made into a dough",
    img: "https://images.heb.com/is/image/HEBGrocery/001539558",
    price: 1.99,
    qty: 45,
  },
  {
    name: "peanut butter",
    discription: "Mixed with natural milk or water, made into a dough",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsqxV0R7pwZKX7FX-n7cnUorCCK9wUcX2wZg&usqp=CAU",
    price: 1.5,
    qty: 30,
  },
  {
    name: "24 Water Pack",
    discription: "Pack of 24 water bottles",
    img: "https://i.ebayimg.com/images/g/RNwAAOSwmjdesUU5/s-l640.jpg",
    price: 3.25,
    qty: 56,
  },
];

//INDEX
storeRouter.get("/", (req, res) => {
  Store.find({}, (error, allItems) => {
    res.render("index.ejs", {
      items: allItems,
    });
  });
});

//NEW
storeRouter.get("/new", (req, res) => {
  Store.find({}, (error, allItems) => {
    res.render("new.ejs");
  });
});

//DELETE
storeRouter.delete("/:id", (req, res) => {
  Store.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/store");
  });
});

//UPDATE
storeRouter.put("/:id", (req, res) => {
  Store.findByIdAndUpdate(req.params.id, req.body, (error, updatedPost) => {
    res.redirect(`/store/${req.params.id}`);
  });
});

//CREATE
storeRouter.post("/", (req, res) => {
  Store.create(req.body, (error, createdPost) => {
    res.redirect("/store");
  });
});

//EDIT
storeRouter.get("/:id/edit", (req, res) => {
  Store.findById(req.params.id, (error, foundItem) => {
    res.render("edit.ejs", {
      item: foundItem,
    });
  });
});

//EDIT
storeRouter.get("/:id/buy", (req, res) => {
  Store.findById(req.params.id, (error, foundItem) => {
    let qty = foundItem.qty - 1;
    foundItem.qty = qty;
    foundItem.save();
    res.render("show.ejs", { item: foundItem });
  });
});

// SHOW
storeRouter.get("/:id", (req, res) => {
  Store.findById(req.params.id, (err, foundItem) => {
    res.render("show.ejs", { item: foundItem });
  });
});

module.exports = storeRouter;

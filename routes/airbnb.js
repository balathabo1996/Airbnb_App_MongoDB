/******************************************************************************
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Thabotharan Balachandran Student ID: N01674899 Date: 2025-11-20
*
*
******************************************************************************/

const express = require("express");
const router = express.Router();
const controller = require("../controllers/airbnbController");

// CRUD routes

// GET all listings
router.get("/", controller.getAll);

// Search by index
router.get("/search/index", (req, res) => {
    res.render("pages/searchByIndex", { title: "Search Airbnb by Index", result: null });
});
router.post("/search/index", controller.searchByIndex);

// Search by ID
router.get("/search/id", controller.searchForm);
router.post("/search/id", controller.searchById);

// Search by Name
router.get("/search/name", (req, res) => {
    res.render("pages/searchByName", { title: "Search Airbnb by Name", result: null });
});
router.post("/search/name", controller.searchByName);

// Add a new listing
router.get("/add", (req, res) => {
    res.render("pages/addData", { title: "Add New Airbnb Listing" });
});
router.post("/add", controller.create)

// Update a listing
router.put("/:id", controller.update);

// Delete a listing
router.delete("/:id", controller.remove);

// Filter by Price
router.get("/filter/price", (req, res) => {
    res.render("pages/filterByPrice", { title: "Filter Airbnb by Price", result: null });
});
router.post("/filter/price", controller.filterByPrice);


module.exports = router;

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

const mongoose = require("mongoose");

const AirbnbSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    NAME: { type: String, required: true },
    host_name: String,
    "neighbourhood group": String,
    neighbourhood: String,
    "room type": String,
    country: String,
    "country code": String,
    price: Number,
    "service fee": Number,
    "minimum nights": Number,
    "number of reviews": Number,
    "last review": Date,
    "reviews per month": Number,
    "property type": String,
    thumbnail: String,
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model("Airbnb", AirbnbSchema,"listings");

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

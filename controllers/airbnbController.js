const Airbnb = require("../models/airbnb");

// GET all
exports.getAll = async (req, res, next) => {
    try {
        const listings = await Airbnb.find().lean();
        res.render('pages/allData', { title: 'All Airbnb Data', data: listings });
    } catch (err) {
        next(err);
    }
};

// Search by index
exports.searchByIndex = async (req, res) => {
    try {
        const index = parseInt(req.body.index);

        if (isNaN(index) || index < 0) {
            return res.render("pages/searchByIndex", {
                title: "Search Airbnb by Index",
                result: null,
                error: "Please enter a valid index number (0 or higher)"
            });
        }

        // Fetch all listings
        const listings = await Airbnb.find().lean();

        if (index >= listings.length) {
            return res.render("pages/searchByIndex", {
                title: "Search Airbnb by Index",
                result: null,
                error: `Index out of range. Total listings: ${listings.length}`
            });
        }

        const listing = listings[index];

        res.render("pages/searchByIndex", {
            title: "Search Airbnb by Index",
            result: [listing],
            error: null
        });

    } catch (err) {
        console.error(err);
        res.render("pages/searchByIndex", {
            title: "Search Airbnb by Index",
            result: null,
            error: "Error occurred while searching"
        });
    }
};


// Search by ID
// Show search form
exports.searchForm = (req, res) => {
    res.render("pages/searchById", { title: "Search Airbnb by ID", result: null });
};

// Handle form post
exports.searchById = async (req, res) => {
    try {
        const id = req.body.id;
        const listing = await Airbnb.findOne({ id }).lean();

        res.render("pages/searchById", {
            title: "Search Airbnb by ID",
            result: listing || null,
            error: listing ? null : "No listing found for the given ID",
        });

    } catch (err) {
        console.error(err);
        res.render("pages/searchById", {
            title: "Search Airbnb by ID",
            result: null,
            error: "Error while searching",
        });
    }
};

// Search by Name
exports.searchByName = async (req, res) => {
    try {
        const name = req.body.NAME.trim();

        if (!name) {
            return res.render("pages/searchByName", {
                title: "Search Airbnb by Name",
                result: null,
                error: "Please enter a name to search"
            });
        }

        const listings = await Airbnb.find({
            NAME: { $regex: name, $options: "i" } // case-insensitive search
        }).lean();

        res.render("pages/searchByName", {
            title: "Search Airbnb by Name",
            result: listings.length ? listings : null,
            error: listings.length ? null : "No listings found"
        });

    } catch (err) {
        console.error(err);
        res.render("pages/searchByName", {
            title: "Search Airbnb by Name",
            result: null,
            error: "Error occurred while searching"
        });
    }
};


// Create new listing using form
exports.create = async (req, res, next) => {
    try {
        const exist = await Airbnb.findOne({ id: req.body.id }).lean();
        if (exist) {
            return res.render("pages/addData", {
                title: "Add New Airbnb Listing",
                error: "ID already exists. Please use a unique ID."
            });
        }
        const newListing = new Airbnb({
            id: req.body.id,
            NAME: req.body.NAME,
            "room type": req.body["room type"],
            country: req.body.country,
            price: Number(req.body.price),
            "service fee": Number(req.body["service fee"]),
            "minimum nights": Number(req.body["minimum nights"]),
            "number of reviews": Number(req.body["number of reviews"]),
            thumbnail: req.body.thumbnail,
        });
        await newListing.save();
        res.render("pages/addData", {
            title: "Add New Airbnb Listing",
            success: "Listing added successfully!"
        });

        console.log("Successfully added:", newListing);
    } catch (err) {
        next(err);
    }
};


// UPDATE listing (title & price)
exports.update = async (req, res, next) => {
    try {
        const updates = { NAME: req.body.NAME, price: Number(req.body.price) };
        const listing = await Airbnb.findOneAndUpdate(
            { id: req.params.id },  
            updates,
            { new: true, runValidators: true }
        );
        if (!listing) return res.status(404).send("Not found");
        res.send(listing);
        console.log("Successfully updated:", listing);
    } catch (err) {
        next(err);
    }
};

// DELETE listing
exports.remove = async (req, res, next) => {
    try {
        const listing = await Airbnb.findOneAndDelete({ id: req.params.id }).lean();
        if (!listing) return res.status(404).send("Not found");
        res.status(204).send("Deleted successfully");
        console.log("Successfully deleted:", listing);
    } catch (err) {
        next(err);
    }
};


// Filter by price range
exports.filterByPrice = async (req, res) => {
    try {
        let min = parseFloat(req.body.min);
        let max = parseFloat(req.body.max);

        if (isNaN(min) || isNaN(max) || min < 0 || max < 0 || min > max) {
            return res.render("pages/filterByPrice", {
                title: "Filter Airbnb by Price",
                result: null,
                error: "Enter valid minimum and maximum prices (min <= max)"
            });
        }

        // Fetch all listings
        const listings = await Airbnb.find().lean();

        // Filter by numeric price (strip "$" if needed)
        const filtered = listings.filter(listing => {
            let price = listing.price;
            if (typeof price === "string") {
                price = Number(price.replace(/[^0-9.]/g, ""));
            }
            return price >= min && price <= max;
        });

        res.render("pages/filterByPrice", {
            title: "Filter Airbnb by Price",
            result: filtered.length ? filtered : null,
            error: filtered.length ? null : "No listings found in this price range"
        });

    } catch (err) {
        console.error(err);
        res.render("pages/filterByPrice", {
            title: "Filter Airbnb by Price",
            result: null,
            error: "Error occurred while filtering"
        });
    }
};

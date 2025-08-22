const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require('../schema.js');
const { isLoggedIn , isOwner,validateListing } = require('../middlewares.js');
const listingsController = require("../controller/listings.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js")
const upload = multer({ storage })

//index route
router.get("/", wrapAsync (listingsController.index));


//new route
router.get("/new", isLoggedIn,listingsController.renderNewForm)

//create route
router.post("/",isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync(listingsController.createlisting));
// router.post("/", upload.single("listing[image]"), (req, res) => {
//     res.send(req.file);
// });


// Search route
router.get("/search", async (req, res) => {
    let query = req.query.q;
    if (!query) {
        return res.redirect("/listings");
    }
    // MongoDB regex search (case-insensitive)
    const listings = await Listing.find({ title: new RegExp(query, "i") });
    res.render("listings/search.ejs", { listings, query });
});


//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingsController.renderEditForm))

//update route
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingsController.updatelisting))

//detele route
router.delete("/:id", isLoggedIn,isOwner,wrapAsync(listingsController.destroylisting))

//show route
router.get("/:id", wrapAsync(listingsController.showlisting))




module.exports = router;
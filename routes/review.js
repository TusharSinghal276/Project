const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { isLoggedIn ,isAuthor,validateReview } = require('../middlewares.js');
const reviewController = require("../controller/reviews.js")




//Review
//POST
router.post("/",isLoggedIn, validateReview ,wrapAsync(reviewController.createReview));

//review delete
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;
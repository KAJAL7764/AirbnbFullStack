const express = require('express');
const router = express.Router( { mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require('../Models/listing.js');
const Listing = require('../Models/listing.js');
const {validtereview, isloggedIn, isReviewAuthor} = require('../middleware.js');

const reviewController = require("../controllers/review.js");
const review = require("../Models/review.js")

//Post  Reviews routes
router.post("/", isloggedIn, validtereview, wrapAsync(reviewController.createReview));
    
    //Reviews routes delete routes post routes
    router.delete("/:reviewId", isloggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


    module.exports = router;
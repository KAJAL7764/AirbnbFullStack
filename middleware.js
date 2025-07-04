const Listing = require('./Models/listing.js');
const Review = require('./Models/review.js');
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema} = require("./schema.js");
//middlware for authorization
module.exports.isloggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
}

//middlware 
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

//middlware for checking owner
module.exports.isOwner = async (req, res, next) =>  {
    let { id } = req.params; 
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are the not owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//middlware for handling errors
module.exports.validteListing = ((req,  res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }
    else{
        next();
    }
})

//middlware for handling errors
module.exports.validtereview = ((req,  res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }
    else{
        next();
    }
})


//middlware for checking isreviewAuthor
module.exports.isReviewAuthor = async (req, res, next) =>  {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are the not author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
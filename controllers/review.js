const Listing = require("../Models/listing");
const Review = require("../Models/review");

module.exports.createReview = async (req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.review.push(newReview);
    
    await newReview.save();
    await listing.save();
    // res.send("new review saved");
    req.flash("success", "New review Created")
    res.redirect(`/listings/${listing._id}`);
    }

    module.exports.destroyReview = async (req, res) => {
        let {id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
        await Review.findByIdAndDelete(reviewId);
        // res.redirect(`/listings/${id}`);
        req.flash("success", "New review deleted");
        res.redirect(`/listings/${id}`);
    
    }
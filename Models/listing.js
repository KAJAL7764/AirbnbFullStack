const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { urlencoded } = require("express");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
    image: {
      url: String,
      fileName: String,
  },

  price: Number,
  location: String,
  country: String,
  review: [
    {
    type: Schema.Types.ObjectId,
    ref: "Review",
    },
  ],
    owner : {
      type: Schema.Types.ObjectId,
      ref: "User",
      },
  
});

//ppa pre placements 

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({_id: {$in: listing.review}})
  }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

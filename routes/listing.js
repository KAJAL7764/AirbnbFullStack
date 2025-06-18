const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedIn, isOwner, validteListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedIn,
    upload.single("listing[image]"),
    validteListing,
    wrapAsync(listingController.createListing)
  );

// New Routes
router.get("/new", isloggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isloggedIn,
    isOwner,
    upload.single("listing[image]"),
    validteListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isloggedIn, isOwner, wrapAsync(listingController.deleteListing));

//edit routes or add new data
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;

if(process.env.NODE_ENV !== 'production')
require('dotenv').config();
// console.log(process.env.SECRET) ;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = 8080;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");

const listingsRouter = require('./routes/listing.js');
const reviewRouter  = require("./routes/review.js");
const userRouter  = require("./routes/user.js");
// const { maxHeaderSize } = require("http");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}
//This is going to set the view and listing paths for using ejs files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
}

app.get('/', (req, res) => {
    res.send('This is root routes');
})

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Middleware Error handing
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.render("error.ejs", { err })
    // res.status(statusCode).send(message);
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const session = require('express-session')
const flash = require('connect-flash');
const path = require('path');



app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.get("/GetCookies", (req, res) => {
//     res.cookie("myCookie", "Hello World");
//     res.send("Cookies Set");
// })


//signed cookies
// app.use(cookieParser("secretcode"));
// app.get("/signCookies", (req, res) => {
//     res.cookie("signedCookie", "Hello World", { signed: true });
//     res.send("Signed Cookies Set");
// })
// app.get("/verify", (req, res) => {
//     console.log(req.cookies)
//     res.send("Verify Cookies Set");
// })

// app.use(session({secret: "myCookie", resave: false, saveUninitialized: true}));

const sessionOptions = {
    secret: "myCookie",
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionOptions));
app.use(flash()); 

app.get("/register", (req, res) => {
    let {name = "anonymous user"} = req.query;
 req.session.name = name;
 if(name === "anonymous user") {
     req.flash("error", "User not registered!!");
    }
    else {
        req.flash("success", "user registred successfully");
    }
    res.redirect("/hello");

})
app.get("/hello", (req, res) => {
    // console.log(req.flash("success"))
    res.locals.messages = req.flash("success");
    res.locals.error = req.flash("error");
    res.render("page.ejs", { name: req.session.name});
})
// app.get("/reqcount", (req, res) => {
//     if(req.session.count)
//     {
//         req.session.count++;
//     }
//     else {
//         req.session.count = 1;
//     }
//     res.send(`uou send a request ${req.session.count} times`)
// })

// app.get("/test", (req, res) => {
//     res.send("test sucssefull");
// })
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
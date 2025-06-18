const User = require("../Models/user.js");
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {

    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User registered successfully");
            res.redirect("/listings");
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}
module.exports.login = async (req, res) => {
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl); // Redirect to a protected page or homepage
}
module.exports.logout =  (req, res) => {
    req.logout((err) => {
        if (err) {
            return next();
        }
        req.flash("success", "You are logged out successfully!");
        res.redirect("/listings");
    })
}
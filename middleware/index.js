let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        if(req.user.username === "Jean-Sebastien Surena"){
            return next();
        }
        req.flash("error", "You need to be me to do that.");
        res.redirect("/");
        
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj;
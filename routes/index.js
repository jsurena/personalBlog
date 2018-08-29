var express    = require ("express"),
    router     = express.Router(),
    User       = require("../models/user"),
    passport   = require("passport");
    

router.get("/", function(req, res){
    res.render("home");
});

router.get("/about", function(req, res){
   res.render("aboutme"); 
});

router.get("/gallery", function(req, res){
    res.render("gallery");
})

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register");
});

module.exports = router;
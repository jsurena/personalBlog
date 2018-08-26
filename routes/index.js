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

module.exports = router;
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

// REGISTRATION
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    if(req.body.password === req.body.passwordCheck){
        var newUser = new User({username: req.body.username, email: req.body.email});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                return res.render("register", {"error": err.message});
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        });
    } else {
        return res.render("register", {"error": "Passwords did not match"});
    }
});

// LOGGING IN
router.get("/login", function(req, res){
    res.render("login");
});


module.exports = router;
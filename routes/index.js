var express    = require ("express"),
    router     = express.Router(),
    User       = require("../models/user"),
    Post       = require("../models/post"),
    passport   = require("passport");
    

router.get("/", function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            console.log("ERROR");
        } else {
            res.render("home", {posts: posts});
        }
    });
});

router.get("/test", function(req, res){
   res.render("testEditor"); 
});

router.get("/about", function(req, res){
   res.render("aboutme"); 
});

router.get("/gallery", function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        } else {
            res.render("gallery", {posts: posts});
        }
    });
});

router.get("/search", function(req, res){
    if(req.query.search){
        const regex= new RegExp(escapeRegex(req.query.search), 'gi');
        Post.find({name: regex}, function(err, foundPosts){
            if(err){
                console.log(err);
            } else {
                let searchTerm = req.body.search;
                res.render("search", {search: searchTerm, posts: foundPosts});
            }
        });
    }
    Post.find({}, function(err, foundPosts){
        if(err){
            console.log(err);
        } else {
            let searchTerm = req.body.search;
            res.render("search", {search: searchTerm, posts: foundPosts});
        }
    });
   
});

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

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});


// LOGGING OUT
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("back");
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
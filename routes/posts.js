var express    = require ("express"),
    Post       = require("../models/post"),
    router     = express.Router(),
    DOMParser  = require("dom-parser"),
    $          = require("jquery"),
    middleware = require("../middleware");;

router.get("/posts/new", middleware.isLoggedIn, function(req, res){
    res.render("./posts/new");
});

// SHOW ROUTE
router.get("/posts/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err) {
            console.log("ERROR");
        } else {
            // let content = new DOMParser().parseFromString(foundPost.content);
            res.render("./posts/show", {post: foundPost}); 
        }
    });
});

// CREATE ROUTE
router.post("/posts", function(req, res){
    Post.create({
        title: req.body.title,
        image: req.body.image,
        content: req.body.body
    }, function(err, newPost){
        if(err) {
            console.log("ERROR");
            res.render("./posts/new");
        } else {
            newPost.author.id = req.user._id;
            newPost.author.username = req.user.username;
            newPost.save();
            res.redirect("/")
        }
    });
});

// EDIT ROUTE
router.get("/posts/:id/edit", middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            req.flash("error", "Could not find that post.");
        } else {
            res.render("./posts/edit", {post: foundPost});
        }
    });
});

// UPDATE ROUTE
router.put("/posts/:id", middleware.isLoggedIn, function(req, res){
   Post.findByIdAndUpdate(req.params.id, req.body.post, function(err){
      if(err){
          res.redirect("/");
          req.flash("error", "Could not be updated.");
          console.log(err);
      } else {
          res.redirect("/");
      } 
   });
});

// DESTROY ROUTE

module.exports = router;
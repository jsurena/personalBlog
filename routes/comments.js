var express    = require("express");
var router     = express.Router({mergeParams: true});
var Post       = require("../models/post");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// CREATE ROUTE
router.post("/posts/:id/comments", middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post) {
        if(err) {
            console.log(err);
        } else {
            Comment.create({}, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect("back");
                } else {
                   comment.text = req.body.text;    
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   post.comments.push(comment);
                   post.save();
                   res.redirect("/posts/" + req.params.id);
                }
            });
        }
    });
});

// EDIT ROUTE
router.get("/posts/:id/comments/:comment_id/edit", middleware.isLoggedIn, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
        } else {
            res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE ROUTE
router.put("/posts/:id/comments/:comment_id", middleware.isLoggedIn, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, function(err, comment){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           res.redirect("/posts" + req.params.id);
       }
    });
});

// DESTROY ROUTE
router.delete("/posts/:id/comments/:comment_id", middleware.isLoggedIn, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           res.redirect("/posts/" + req.params.id);
       }
    });
});


module.exports = router;


module.exports = router;
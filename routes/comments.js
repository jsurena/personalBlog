var express    = require("express");
var router     = express.Router({mergeParams: true});
var Post       = require("../models/post");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// CREATE ROUTE
router.post("/posts/:id/comments", function(req, res){
    Post.findById(req.params.id, function(err, post) {
        if(err) {
            console.log(err);
        } else {
            Comment.create(req.body.userComment, function(err, comment){
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               post.comments.push(comment);
            });
        }
    });
});

// EDIT ROUTE
router.get("/posts/:id/comments/:comment_id/edit", middleware.isLoggedIn, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
        } else {
            res.render("comments/edit");
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
router.get("/posts/:id/comments/:comment_id/delete", function(req, res){

});

router.delete("/posts/:id/comments/:comment_id", function(req, res){

});

module.exports = router;


module.exports = router;
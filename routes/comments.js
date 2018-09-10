var express    = require("express");
var router     = express.Router({mergeParams: true});
var Post       = require("../models/post");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

router.get("/posts/:id/comments/new", middleware.isLoggedIn, function(req, res){

});

// CREATE ROUTE
router.post("/posts/:id/comments", function(req, res){

});

// EDIT ROUTE
router.get("/posts/:id/comments/:comment_id/edit", middleware.isLoggedIn, function(req, res){

});

// UPDATE ROUTE
router.put("/posts/:id/comments/:comment_id", middleware.isLoggedIn, function(req, res){

});

// DESTROY ROUTE
router.get("/posts/:id/comments/:comment_id/delete", function(req, res){

});

router.delete("/posts/:id/comments/:comment_id", function(req, res){

});

module.exports = router;


module.exports = router;
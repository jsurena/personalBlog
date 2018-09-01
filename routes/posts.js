var express    = require ("express"),
    Post       = require("../models/post"),
    router     = express.Router();

router.get("/posts/new", function(req, res){
    res.render("./posts/new");
});

router.get("/posts/:id", function(req, res){
   res.render("./posts/show", {id: req.params.id}); 
});

router.post("/posts", function(req, res){
    Post.create({
        title: req.body.title,
        image: req.body.image,
        content: req.body.body
    }, function(err, newPost){
        if(err) {
            console.log("ERROR");
            res.render("back");
        } else {
            newPost.author.id = req.user._id;
            newPost.author.username = req.user.username;
            newPost.save();
            res.redirect("/")
        }
    });
});

module.exports = router;
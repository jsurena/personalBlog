var express    = require ("express"),
    router     = express.Router();

router.get("/posts/new", function(req, res){
    res.render("./posts/new");
});

router.get("/posts/:id", function(req, res){
   res.render("./posts/show", {id: req.params.id}); 
});

router.post("/posts", function(req, res){
    res.send("You have hit the post route");
});

module.exports = router;
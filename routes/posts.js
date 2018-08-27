var express    = require ("express"),
    router     = express.Router();
    
router.get("/posts/:id", function(req, res){
   res.render("./posts/show", {id: req.params.id}); 
});

module.exports = router;
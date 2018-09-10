var express    = require("express");
var router     = express.Router({mergeParams: true});
var Post       = require("../models/post");
var Comment    = require("../models/comment");
var middleware = require("../middleware");




module.exports = router;
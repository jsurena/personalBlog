var express         = require("express"),
    app             = express(),
    ejs             = require("ejs"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash");
    
var indexRoutes = require("./routes/index");
var postRoutes  = require("./routes/posts");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(indexRoutes);
app.use(postRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Personal blog has started."); 
});

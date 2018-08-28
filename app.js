var express         = require("express"),
    app             = express(),
    ejs             = require("ejs"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    Post            = require("./models/posts"),
    User            = require("./models/users"),
    Comment         = require("./models/comments");
    
var indexRoutes = require("./routes/index");
var postRoutes  = require("./routes/posts");

mongoose.connect("mongodb://" + process.env.IP + "/the_black_code", { useNewUrlParser: true });
var db = mongoose.connection;

// Blog.create({
//     title: "Test Blog",
//     image: "https://source.unsplash.com/DziZIYOGAHc",
//     body:"HELLO THIS IS A BLOG POST"
// });

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Database connectivity established.");
});

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

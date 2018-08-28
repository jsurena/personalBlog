var express         = require("express"),
    app             = express(),
    ejs             = require("ejs"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    Post            = require("./models/post"),
    User            = require("./models/user"),
    Comment         = require("./models/comment");
    
var indexRoutes = require("./routes/index");
var postRoutes  = require("./routes/posts");

mongoose.connect("mongodb://" + process.env.IP + "/the_black_code", { useNewUrlParser: true });
var db = mongoose.connection;

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

Post.create({
    title: "Test Blog",
    image: "https://source.unsplash.com/alt9KvwlERg",
    content:"HELLO THIS IS A BLOG POST"
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Personal blog has started."); 
});

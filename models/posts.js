var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
    title: String,
    image: String,
    content: String,
    created: {type: Date, default: Date.now}
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
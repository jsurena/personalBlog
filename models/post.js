var mongoose = require("mongoose");

mongoose.connect("mongodb://" + process.env.IP + "/the_black_code", { useNewUrlParser: true });

var postSchema = mongoose.Schema({
    title: String,
    image: String,
    content: String,
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
    created: {type: Date, default: Date.now}
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
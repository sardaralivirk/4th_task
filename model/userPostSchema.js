const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    like: String,
    Comment: String,
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Ensure this matches the model name for users
    },
    newField:String,
    emoji:String
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

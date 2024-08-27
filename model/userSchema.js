const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    post_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' 
    },
    isDeleted: { type: Boolean, default: false },
    otp:String,
    dummy:String
});

// Pre-hooks to filter out deleted users
userSchema.pre('find', function() {
    this.where({ isDeleted: false });
});

userSchema.pre('findOne', function() {
    this.where({ isDeleted: false });
});

const User = mongoose.model('User', userSchema);
module.exports = User;

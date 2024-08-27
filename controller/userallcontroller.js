//const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const genrateOtp=require('../otpgenraterfolder/otpfile')
const nodemailer=require('nodemailer')
const Post = require('../model/userPostSchema');
const SecretKey="14254"
const { post } = require('../route/allRoutes');

// const transation = async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const { name, email, password, isDeleted, like, Comment } = req.body;

//         // Create a new user
//         const user = await User.create([{ name, email, password, isDeleted }], { session });

//         // Create a new post associated with the user
//         const userId = user[0]._id; // Get the user ID from the created user
//         await Post.create([{ like, Comment, user_Id: userId }], { session });

//         // Commit transaction
//         await session.commitTransaction();
//         session.endSession();
//         res.json({ message: "User and post added successfully" });

//     } catch (err) {
//         // Abort transaction on error
//         await session.abortTransaction();
//         session.endSession();

//         res.status(500).json({ error: err.message });
//     }
// };

const createuser= async(req,res)=>{
    const { name,email, password,post_Id} = req.body;
    const find=await User.findOne({email})
    if(find){
        res.json({message:'user already exits'})
    }else{
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const add=await User.create({name,email,post_Id,password:hash})

        res.json({message:"cr",add})
    }

}

const userInformation = async (req, res) => {
    try {
        const { id } = req.body;
        const finduser = await User.findOne({ _id: id }).populate('post_Id');
        console.log(finduser)
        return res.status(200).json({ message: `User data found: ${finduser}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const userPost=async(req,res)=>{
    const {like,Comment,user_Id}=req.body;
    const crt=await Post.create({like,Comment,user_Id})
    return res.json({message:'post add'})
}

const createrelation = async (req, res) => {
    try {
        const { post_id, user_id } = req.body;
        const finduser = await User.findOneAndUpdate({ _id: user_id }, { $set: { post_Id: post_id } }, { new: true });
        const finduserpost = await Post.findOneAndUpdate({ _id: post_id }, { $set: { user_Id: user_id } }, { new: true });
        return res.json({ finduserpost, finduser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const alluser = async (req, res) => {
    try {
        const find = await User.find();
        return res.json({ find });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const softdelete = async (req, res) => {
    try {
        await User.create({ name: 'ali', isDeleted: false });
        await User.create({ name: 'HiddenTest', isDeleted: true });
        const docs = await User.find();
        return res.json({ docs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { post_id, user_id } = req.body;
        const finduser = await Post.findOne({ _id: post_id });
        if (user_id === finduser.user_Id.toString()) {
            await Post.findOneAndDelete({ _id: post_id });
            return res.json({ message: "Post has been deleted" });
        } else {
            return res.status(400).json({ message: 'User does not match' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const forgetPassword=async(req,res)=>{
    try {
        const {email}=req.body
        if (email) {
            const findemail=await User.findOne({email});
            console.log(findemail)
            if (findemail) {
                const token=jwt.sign(email, SecretKey)
            } else {
                return res.status(400).json({message:'user not found'})
            }
            
        } else {
            res.json({message:"please provide email"})
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            port: 587, 
            secure: false, 
            auth: {
                user: 'sardaralivirk@gmail.com', 
                pass: 'qbxoioonrudfwvjj' 
            }
        });
        
        const OTP=genrateOtp();
       
        await User.findOneAndUpdate({email},{$set: {otp:OTP}})
        
        const info = await transporter.sendMail({
            from: 'b-23313@student.usa.edu.pk',
            to: 'aliburhandev@gmail.com', 
            subject: 'Reset Password', 
            text: `Click on this link to generate your pass`, 
            html: `<h1>Hello ${OTP}</h1>` 
        });
        return res.status(200).json({ message: 'Password reset link successfully sent to your Gmail account' });
           
    } catch(error) {
                 return res .status(400).json({meassage:"not send link to mail "})
    }

}

const reasetpwd=async(req,res)=>{
    const {password,confirm_password,otp,id}=req.body
    if (!password || !confirm_password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords must match' });
    }
    const find=await User.findOne({_id:id})
    if(otp==find.otp){
        const salt = 10;
    const newHashPassword = await bcrypt.hash(password, salt);
    const updatedUser = await User.findOneAndUpdate({_id:id},{$set:{password:newHashPassword}})
    res.json({updatedUser})
    }
    else{
        res.json({message:"your otp is not match"})
    }


}
module.exports = { createuser, userInformation, alluser, softdelete, createrelation, deletePost,userPost,forgetPassword,reasetpwd };

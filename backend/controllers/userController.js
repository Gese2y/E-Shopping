import asyncHandler from '../middleWare/asyncHandler.js';
import User from '../models/userModel.js';
// import jwt  from 'jsonwebtoken';
import generaToken from '../utils/generateToken.js';
//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser  = asyncHandler(async (req,res)=>{
   const {email, password}=req.body;

   const user = await User.findOne({email});

   if (user && (await user.matchPassword(password))){
    generaToken(res, user._id)


    res.status(200).json({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin: user.isAdmin
    });
   }else{
    res.status(401);
    throw new Error('Invalid email or password');
   }
    res.send('auth user');
});
//@desc Register User
//@route POST /api/users
//@access Public
const registerUser  = asyncHandler(async (req,res)=>{
   const {name,email,password}=req.body;

   const userExists = await User.findOne({ email })

   if (userExists){
    res.status(400);
    throw new Error('User already exists');
   }
   const user = await User.create({
    name,
    email,
    password
   });

   if(user){
    generaToken(res, user._id)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
   } else{
    res.status(400);
    throw new Error('Invalid user data');
   }
 });
 //@desc Logout User/ clear the coookie
//@route POST /api/users/logout
//@access Private
const logoutUser  = asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    });
    res.status(200).json({message:'Logged out successfully'})
 });
 //@desc Get user profile
//@route Get /api/users/profile
//@access Private
const getUserProfile  = asyncHandler(async (req,res)=>{
   const user = await User.findById(req.user._id);

   if(user){
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
   }else{
    res.status(404);
    throw new Error('user not found');
   }
 });
 //@desc Update User profile
//@route Put /api/users
//@access private
const updateUserProfile  = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);
if(user){
    user.name = req.body.name||user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
        user.password = req.body.password;
    }

    const updateUser = await user.save();
    res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin
    })
}else{
    res.status(404);
    throw new Error('User not found');
}
 });
 //@desc Get users
//@route POST /api/users
//@access Private/Admin
const getUsers  = asyncHandler(async (req,res)=>{
    res.send('get users');
 });
  //@desc Get user by ID 
//@route POST /api/users/:id
//@access Private/Admin
const getUserById  = asyncHandler(async (req,res)=>{
    res.send('get user by id');
 });
  //@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser  = asyncHandler(async (req,res)=>{
    res.send('delete user');
 });
//@desc Update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser  = asyncHandler(async (req,res)=>{
    res.send('update user');
 });

 export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
 }
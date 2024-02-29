// User Route

const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
require("dotenv").config()
const {uploadfile} = require("../middlewares/uploadfile.middleware")
const UserRouter = express.Router()


UserRouter.post("/register",async(req,res)=>{
    try {
        let {email,password} = req.body
        
        let payload = req.body

        let user = await UserModel.findOne({email:email})
       
        if(user) return res.status(401).json({Message:"User already exists. Please login"})

        let hash = await bcrypt.hash(password,7);
        payload.password = hash
        let new_user = new UserModel(payload)
        await new_user.save();
        res.status(200).json({Message:"New User created",new_user});

    } catch (error) {
        console.log(error);
        res.status(400).json({Error:"Error during registration"})
    }
})


UserRouter.post("/login",async(req,res)=>{
    try {
        let {email,password} = req.body
        let user = await UserModel.findOne({email:email})
        if(!user) return res.status(404).json({Error:"User Not found. Please register"})

        let result = await bcrypt.compare(password,user.password)

        if(!result) return res.status(401).json({Error:"Incorrect Credentials!"})

        let token_payload = {
            userID : user._id,
            userName :user.userName
        }
        let secret_key = process.env.SECRET_KEY
       
        let access_token = jwt.sign(token_payload,secret_key)

        res.status(200).json({Message:"Login successful",access_token,user})
    } catch (error) {
        res.status(400).json({Error:"Error during login"})
    }
})

UserRouter.patch("/update/details/:userID",async(req,res)=>{
    try {
        let {userID} = req.params
        let user = await UserModel.findOne({_id:userID})
        if(!user) return res.status(404).json({Error:"User not found"})

        let payload = req.body

        await UserModel.findByIdAndUpdate({_id:userID},payload);

        res.status(200).json({Message:"User updated"})
    } catch (error) {
        res.status(400).json({Error:"Error during user update"})
    }
})


UserRouter.patch("/update/image/:userID",uploadfile,async(req,res)=>{
    try {
        let image = req.publicURL

        let {userID} = req.params
        let user = await UserModel.findOne({_id:userID})
        
        if(!user) return res.status(404).json({Error:"User not found"})

        await UserModel.findByIdAndUpdate({_id:userID},{image:image})
        res.status(200).json({Message:"Profile picture updated",image})
    } catch (error) {
        console.log(error);
        res.status(400).json({Error:"Error during updating profile picture"})
    }
})

UserRouter.patch("/update/details/:userID",async(req,res)=>{
    try {
        let {userID} = req.params
        let user = await UserModel.findOne({_id:userID})
        
        if(!user) return res.status(404).json({Error:"User not found"})

        await UserModel.findByIdAndUpdate({_id:userID},req.body)
        res.status(200).json({Message:"Profile details updated"})

    } catch (error) {
        res.status(400).json({Error:"Error while updating user details"})
    }
})

UserRouter.get("/:userID",async(req,res)=>{
    try {
        let {userID} = req.params
        let user = await UserModel.findOne({_id:userID})
        
        if(!user) return res.status(404).json({Error:"User not found"})

        let user_info = {
            userName:user.userName,
            userImage:user.image,
            userId:user._id,
            userEmail:user.email,
            userMobile:user.mobile ? user.mobile : "",
            userAge: user.age ? user.age : ""
        }
        res.status(200).json({user_info})
    } catch (error) {
        res.status(400).json({Error: "error while getting user details"})
    }
})

module.exports={
    UserRouter
}
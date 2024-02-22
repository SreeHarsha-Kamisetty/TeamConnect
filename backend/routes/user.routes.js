// User Route

const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");


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
        let secret_key = process.env.secret_key

        let access_token = jwt.sign(token_payload,secret_key)

        res.status(200).json({Message:"Login successful",access_token})
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

module.exports={
    UserRouter
}
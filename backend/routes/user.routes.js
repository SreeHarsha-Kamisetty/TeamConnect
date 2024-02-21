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





module.exports={
    UserRouter
}
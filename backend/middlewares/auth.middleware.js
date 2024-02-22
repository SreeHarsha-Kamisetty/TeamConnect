// Authentication Middleware

const jwt = require("jsonwebtoken")
require("dotenv").config()


const auth = async(req,res,next)=>{
    try {
        let access_token = req.headers.authorization?.split(" ")[1];
        if(!access_token) return res.status(401).json({Message:"Please login"})

        let decoded_token =  jwt.verify(access_token,process.env.SECRET_KEY)

        req.body.userID = decoded_token.userID
        req.body.userName = decoded_token.userName
        next();


    } catch (error) {
        res.status(403).json({Error:"Unauthorized"})
    }
}
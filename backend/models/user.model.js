// User Model

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  image:String,
  workspaces:[
    {
        id:String,
        workspacename:String
    }
  ]
},{versionKey:false});

const UserModel = mongoose.model("user",userSchema)


module.exports={
    UserModel
}
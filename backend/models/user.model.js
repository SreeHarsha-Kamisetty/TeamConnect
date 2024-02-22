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
  image:{
    type:String,
    default:"https://firebasestorage.googleapis.com/v0/b/coinsquare-8dc2e.appspot.com/o/default.jpg?alt=media&token=fa163076-3ed8-48b2-875b-3b370c66f251"
},
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
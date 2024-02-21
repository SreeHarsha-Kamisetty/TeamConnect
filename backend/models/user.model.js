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
  workspaces:[
    {
        id:String,
        workspacename:String
    }
  ]
});

const UserModel = mongoose.model("user",userSchema)


module.exports={
    UserModel
}
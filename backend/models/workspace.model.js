const mongoose = require("mongoose")

const workspaceSchema = mongoose.Schema({
    workspaceName:String,
    channels:[{
        channelName:String
    }   
    ],
    users:[{
        
        userId:String,
        userName:String,
        userImage:String
    }]
},{versionKey:false})





const WorkspaceModel = mongoose.model("workspace",workspaceSchema);


module.exports={
    WorkspaceModel
}
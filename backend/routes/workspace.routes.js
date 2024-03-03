const express = require("express");
const { WorkspaceModel } = require("../models/workspace.model");
const {UserModel} = require("../models/user.model")
const WorkspaceRouter = express.Router();

WorkspaceRouter.get("/list",async(req,res)=>{
    try {
        
        let workspace_list = await WorkspaceModel.find();
        
        res.status(200).json({workspace_list})
    } catch (error) {
        res.status(400).json({Error:"Error during getting workspace list"})
    }
})
WorkspaceRouter.post("/create",async(req,res)=>{
    try {
        let user = await UserModel.findOne({_id:req.body.userId})
        let user_details={
            userName:user.userName,
            userImage:user.image,
            userId:user._id
        }
        let workspace_details = {
            workspaceName:req.body.workspaceName,
            channels:[
                {
                    channelName:"general"
                }
            ],
            users:[
                user_details
            ]
        }
        let new_workspace = new WorkspaceModel(workspace_details)
        await new_workspace.save();

        res.status(200).json({Message:"New Workspace created",new_workspace})
    } catch (error) {
        res.status(400).json({Error:"Error creating workspace"})
    }
})


WorkspaceRouter.patch("/add/users/:workspaceId",async(req,res)=>{
    try {
        let {workspaceId} = req.params

        let workspace = await WorkspaceModel.findOne({_id:workspaceId})

        if(!workspace) return res.status(404).json({Error:"Wrokspace not found"})
        let {email} = req.body
        let user = await UserModel.findOne({email:email})
        let userData = {
            userId:user._id,
            userName:user.userName,
            userImage:user.image
        }
        let user_list = workspace.users
        if(!user_list.includes(userData)){
            user_list.push(userData)
        }
        
        await WorkspaceModel.findByIdAndUpdate({_id:workspaceId},{users:user_list})
        res.status(200).json({Message:"User added"})
    } catch (error) {
        res.status(400).json("Error")
    }
})

WorkspaceRouter.patch("/add/channel/:workspaceId/:channelName",async(req,res)=>{
    try {
        let {workspaceId,channelName} = req.params
        let new_channel = {
            channelName:channelName
        }
        let workspace = await WorkspaceModel.findOne({_id:workspaceId});

        if(!workspace) return res.status(404).json({Error:"Workspace not found"})

        let channels = workspace.channels;
        let flag = false;
        channels.forEach(item =>{
            if(item.channelName == channelName){
                flag = true;
            }
        })

       if(flag) return res.status(401).json({Error:"Channel already exists"})
        await WorkspaceModel.findByIdAndUpdate({_id:workspaceId},{$push:{channels:new_channel}})

        res.status(200).json({Message:"New channel added"})
    } catch (error) {
        console.log(error)
        res.status(400).json({Error:"Error while adding channel"})
    }
})

module.exports={
    WorkspaceRouter
}
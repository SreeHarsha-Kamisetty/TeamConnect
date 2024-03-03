const express = require("express")
const{uploadfile} = require("../middlewares/uploadfile.middleware")
const Message = require("../models/message.model");
const MessageRouter = express.Router();


MessageRouter.post("/files",uploadfile,(req,res)=>{
    try {
        let fileName = req.uploadedFileName
        let downloadLink = req.downloadLink
        let publicURL = req.publicURL

        res.status(200).json({fileName,downloadLink,publicURL})
    } catch (error) {
        res.status(400).json({Error:"Error while uploading file"})
    }
})



//add

MessageRouter.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

MessageRouter.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports={
    MessageRouter
}
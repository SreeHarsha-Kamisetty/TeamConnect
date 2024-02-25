const express = require("express")
const{uploadfile} = require("../middlewares/uploadfile.middleware")
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





module.exports={
    MessageRouter
}
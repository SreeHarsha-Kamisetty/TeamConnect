const Multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')
require("dotenv").config()

const multer = Multer({
    storage: FirebaseStorage({
      bucketName: process.env.BUCKET,
      credentials:{
          clientEmail: process.env.FB_CLIENT_EMAIL,
          privateKey: process.env.FB_PRIVATE_KEY,
          projectId: process.env.FB_PROJECT_ID
      },
      public:true
    })
  })

const uploadfile = async (req, res, next) => {
    multer.single('file')(req, res, (err) => {
      if (err) {
        // Handle multer error
        return res.status(400).send({ error:"Error when uploading file" });
      }
      req.uploadedFileName = req.file.fileRef.metadata.name
      req.downloadLink = req.file.fileRef.metadata.mediaLink;
      req.publicURL = req.file.publicUrl;
  
      next();
    });
  };

module.exports={
    uploadfile
}
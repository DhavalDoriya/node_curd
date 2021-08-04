const multer = require("multer")

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const path = require('path');
const fs = require('fs');
const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
         // upload only png and jpg format
        //  return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

module. exports = exports = imageUpload; 
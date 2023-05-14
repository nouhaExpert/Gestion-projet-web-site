// const path=require('path')
// const multer  = require('multer')

// //define storage for the images

// const storage = multer.diskStorage({
//     //destination for files
//     destination: function (request, file, callback) {
//         callback(null, 'C:/Users/PC/Desktop/back-end/uploads/fichier');
//     },
  
//     //add back the extension
//     filename: function (request, file, callback) {
//         let ext=path.extname(file.originalname)
//       callback(null, Date.now() + file.originalname);
//     },
//   });
  
//   //upload parameters for multer
//   const upload = multer({
//     storage: storage,
//     limits: {
//       fieldSize: 1024 * 1024 * 3,
//     },
//   });
//   module.exports= upload

const util = require("util");
const multer = require("multer");
//const maxSize = 1024 * 1024 * 3;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/fichier");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  //limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
  
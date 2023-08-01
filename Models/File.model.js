const mongoose = require("mongoose");
const File = new mongoose.Schema(
  { 
    fileName: { type: String },
    fileDesc: { type: String },
    fileUrl: {type: String},  
    createdOn: { type: Date, default: Date.now },
  },
  {
    collection: "files",
  }
);
 

const FileData = mongoose.models.FileData || mongoose.model('FileData', File);
module.exports = FileData;
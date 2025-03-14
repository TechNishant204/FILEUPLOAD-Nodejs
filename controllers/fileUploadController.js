const File = require("../models/File");
const fs = require("fs");
const path = require("path");

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file and ensure that the file name(File) should be same as the file name in the request body
    const file = req.files.File;
    console.log("File aa gyi hai", file);

    // let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
    // console.log("PATH", path);

    // Create directory if it doesn't exist(__dirname will give you the path of the current file)
    const dirPath = path.join(__dirname, "files");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // here second param is for recursive which tell the function to create all the parent directories if they don't exist
    }

    // extract file extension and put validation on file
    const fileExt = path.extname(file.name); //here extname is a function which returns the extension of the file
    if (fileExt !== ".jpg" && fileExt !== ".png" && fileExt !== ".jpeg") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid file type" });
    }

    //create path where file need to be stored on server
    const filePath = path.join(dirPath, Date.now() + fileExt);
    console.log("File PATH->", filePath);

    // add path to mv func to move the file from the temp directory to the file directory
    file.mv(filePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error while moving the file",
        });
      }
    });

    return res.json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while uploading the file",
    });
  }
};

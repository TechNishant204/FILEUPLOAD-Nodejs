const File = require("../models/File");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

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

//Upload file to cloudinary
const uploadFileToCloudinary = async (file, folder, quality) => {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

//image Upload ka handler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;

    //Validation
    const supportedType = ["jpg", "jpeg", "png"];
    // here we are trying to find out the extension of the file so that we can check if the supported type match or not
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!supportedType.includes(fileType)) {
      return res
        .status(400)
        .json({ success: false, message: "File format not supported" });
    }

    // calling the function to upload the file
    const response = await uploadFileToCloudinary(file, "CodePro");

    //db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      message: "Image Uploaded Successfully",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while uploading the file",
    });
  }
};

//video upload ka handler
exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log("check file data", file);

    //Validation
    const supportedType = ["mp4", "mov"];
     // here we are trying to find out the extension of the file so that we can check if the supported type match or not
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("check filetype:", fileType);
    if (!supportedType.includes(fileType)) {
      return res
        .status(400)
        .json({ success: false, message: "File format not supported" });
    }

    console.log("uploading file to cloudinary");
    const response = await uploadFileToCloudinary(file, "CodePro"); //calling function created above
    console.log("Check Response: ", response);

    //db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    });

    res.json({
      success: true,
      message: "Video uploaded successfully",
      videoUrl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while uploading the file",
    });
  }
};

//ImageSizeReduce handler
exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log("File check:", file);

    //Validation
    const supportedType = ["jpg", "jpeg", "png"];
     // here we are trying to find out the extension of the file so that we can check if the supported type match or not
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!supportedType.includes(fileType)) {
      return res
        .status(400)
        .json({ success: false, message: "File format not supported" });
    }

    const response = await uploadFileToCloudinary(file, "CodePro", 90); //90 is the size reducing attribute
    console.log("check response:", response);

    //db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      message: "Image Uploaded Successfully",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while resizing the image",
    });
  }
};

//import karana hai
const express = require("express");
require("dotenv").config();

//app create karna hai
const app = express();

//Port Find Karna hai
const PORT = process.env.PORT || 3000;

//Middleware connect karna hai
app.use(express.json());
const fileupload = require("express-fileupload"); //middleware to upload file on server
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// api route mount karana hai
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

//db se connect karna hai
const db = require("./config/database");
db.dbConnect();

//cloudinary se connect karna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//app ko start karna hai
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

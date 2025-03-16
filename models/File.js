const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

//post middleware
fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);
    //transporter
    // TODO: shift this configuration under /config folder
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `CodeHelp - by Babbar`,
      to: doc.email,
      subject: "New file uploaded on Cloudinary",
      html: `<h2>Confirmation mail</h2> <p>Your file is uploaded on cloudinary. Now you can view your image here:<a href="${doc.imageUrl}">${doc.imageUrl}</a>.</p>`,
    });

    console.log("INFO", info);
  } catch (error) {
    console.error(error);
  }
});

module.exports = mongoose.model("File", fileSchema);

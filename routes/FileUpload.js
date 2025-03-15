const express = require("express");
const router = express.Router();

const {
  localFileUpload,
  videoUpload,
  imageUpload,
  imageSizeReducer,
} = require("../controllers/fileUploadController");

router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);
router.post("/localFileUpload", localFileUpload);

module.exports = router;

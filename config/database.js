const mongoose = require("mongoose");
require("dotenv").config();
exports.dbConnect = async () => {
  //mongoose.connect return one promise
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("Connect to MongoDB Successfully"))
    .catch((error) => {
      console.log("Error in MongoDB Connection");
      console.error(error);
      process.exit(1);
    });
};

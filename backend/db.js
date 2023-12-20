const mongoose = require("mongoose");
const DATABASE_URL = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "image";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);
    // , {
    //   useNewUrlParser: true,
    // }
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

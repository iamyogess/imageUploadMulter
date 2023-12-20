const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

const connectDB = require("./db");
const imageRouter = require("./imageRoute");

app.use(cors());

// Use routes
app.use("/api/image", imageRouter);

//db
connectDB();


app.listen(port, () => {
  console.log("Server started!");
});

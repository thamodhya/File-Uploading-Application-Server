const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.urlencoded({ extended: true }));  
app.use(express.json());

//route imports
app.use('/files', require("./routes/files"));
 
app.use((req,res,next)=>{
  console.log("Server Accessed");
  next();
});

mongoose.set("strictQuery", false);
const connUrl = "mongodb://127.0.0.1:27017/File-uploading";
mongoose
  .connect(connUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, 
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  return res.json({
    message: "Access to this page is not allowed",
    active: false,
  });
});

app.listen(1337, () => {
  ``;
  console.log("Node Server running on  port 1337");
});

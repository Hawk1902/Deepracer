const express = require("express");
const router = express.Router();
const fs = require("fs");

const multer = require("multer");

const { spawn } = require("child_process");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // create data/modelname
    const modelName = file.originalname.split(".")[0];
    const modelDir = "data/" + modelName;
    if (!fs.existsSync(modelDir)) {
      fs.mkdirSync(modelDir);
    }
    // creat data/modelname/csv
    const modelCSVDir = "data/" + modelName + "/csv/";
    if (!fs.existsSync(modelCSVDir)) {
      fs.mkdirSync(modelCSVDir);
    }
    cb(null, modelCSVDir); // Specify the directory where you want to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });
var type = upload.single("csvFile");

router.post("/api/csv", type, (req, res) => {
  // no file
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const modelName = req.body.name;

  // Save the file using fs module
  fs.readFile(req.file.path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving file.");
    }

    // Process the file data as needed
    // console.log(data);
    // Respond with a success message
    res.send("File uploaded and saved.");
  });

  const fileName = "data/" + modelName + "/csv/" + req.file.originalname;
  console.log({ fileName });

  const pythonScript = spawn("python", [
    "scripts/testracer.py",
    fileName,
    modelName,
  ]);

  // output from the python script
  pythonScript.stdout.on("data", (data) => {
    console.log(`Python script output: ${data}`);
  });

  // Handle errors from the script
  pythonScript.stderr.on("data", (data) => {
    console.error(`Python script error: ${data}`);
  });

  // Handle script completion
  // pythonScript.on("close", (code) => {
  //   if (code === 0) {
  //     // Script executed successfully
  //     res.send("Python script executed.");
  //   } else {
  //     // Script execution failed
  //     res.status(500).send("Error executing Python script.");
  //   }
  // });
});

module.exports = router;

const express = require("express");
const fs = require("fs");
const router = express.Router();

const multer = require("multer");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/csv/"); // Specify the directory where you want to save the uploaded files
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
  // Save the file using fs module
  fs.readFile(req.file.path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving file.");
    }

    // Process the file data as needed
    console.log(data);

    // Respond with a success message
    res.send("File uploaded and saved.");
  });
});

module.exports = router;

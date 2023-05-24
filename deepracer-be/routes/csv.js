const express = require("express");
const router = express.Router();

const multer = require("multer");

const { spawn } = require("child_process");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    let ext = "";
    if (file.originalname.split(".").length > 1)
      // check if there is an extension or not.
      ext = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
    const modelname = req.body.modelname;
    cb(null, file.fieldname + "-" + modelname + ext); // Use the original filename
  },
});

const upload = multer({ storage: storage });
const type2 = upload.fields([
  { name: "evalcsv", maxCount: 1 },
  { name: "trainingcsv", maxCount: 1 },
  { name: "evallog", maxCount: 1 },
]);

router.post("/api/csv", type2, (req, res) => {
  const modelname = req.body.modelname;
  const eval_csv_path = "public/evalcsv-" + modelname + ".csv";
  const training_csv_path = "public/trainingcsv-" + modelname + ".csv";
  const eval_log_csv_path = "public/evallog-" + modelname + ".log";

  const pythonScript = spawn("python", [
    "scripts/generator.py",
    eval_csv_path,
    training_csv_path,
    eval_log_csv_path,
  ]);

  // output from the python script
  pythonScript.stdout.on("data", (data) => {
    console.log(`Python script output: ${data}`);
  });

  // Handle errors from the script
  pythonScript.stderr.on("data", (data) => {
    console.error(`Python script error: ${data}`);
  });

  res.json("File uploaded and saved.");
});

module.exports = router;

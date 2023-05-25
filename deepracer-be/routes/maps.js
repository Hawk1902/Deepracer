/*
    This code is part of an Express server and defines two endpoints: /api/maps (GET) and /select (POST). The /api/maps endpoint reads from a directory, filters for files with the .npy extension, and responds with these file names. The /select endpoint receives the name of a selected map from a POST request body and logs it. At this point, there's a placeholder for handling the selected map (a TODO), but it currently simply sends a 200 status response with the received map name.
*/ 

const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const mapsDir = path.join(__dirname, "../scripts/maps");

router.get("/api/maps", (req, res) => {
  fs.readdir(mapsDir, (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching maps");
      return;
    }

    const npyFiles = files.filter((file) => path.extname(file) === ".npy");
    res.json(npyFiles);
  });
});


router.post("/select", (req, res) => {
  if (!req.body || !req.body.selectedMap) {
    res.status(400).send("Bad Request: missing selectedMap in request body");
    return;
  }

  console.log(req.body);

  const selectedMap = req.body.selectedMap;

  console.log(selectedMap);
  // TODO: Add logic to handle the selected map

  res.status(200).send(`Received map: ${selectedMap}`);
});

module.exports = router;

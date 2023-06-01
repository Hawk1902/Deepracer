const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const Score = require("../models").Score;

router.get("/api/score", async (req, res) => {
  const scores = await Score.findAll({
    attributes: ["id", "modelname", "time"],
  });
  const sortedScores = scores.sort((a, b) => a.time - b.time);
  res.json(sortedScores);
});

router.delete("/api/score", async (req, res) => {
  // delete all scores in db
  const scores = await Score.destroy({
    where: {},
  });
  // remove all images in public
  const publicDirectory = "public";
  fs.readdir(publicDirectory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(publicDirectory, file), (err) => {
        if (err) throw err;
      });
    }
  });
  res.json(scores);
});

module.exports = router;

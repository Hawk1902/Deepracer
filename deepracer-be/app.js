const express = require("express");

const app = express();
const PORT = 4000;

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const csvRoutes = require("./routes/csv");
const imageRoutes = require("./routes/image");
app.use(csvRoutes);
app.use(imageRoutes);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

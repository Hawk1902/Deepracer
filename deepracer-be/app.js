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
const mapRoutes = require("./routes/maps")
app.use(csvRoutes);
app.use(imageRoutes);
app.use(mapRoutes);


app.use("/generated", express.static("public"));

app.listen(PORT, "0.0.0.0", (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

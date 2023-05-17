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

const routes = require("./routes/csv");
app.use(routes);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

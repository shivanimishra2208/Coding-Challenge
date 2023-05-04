const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const whitelist = ["http://localhost:3000"];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/", require("./routes/auth"));

const port = process.env.PORT || 8000;

const startServer = async () => {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
};

startServer();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

// routes
const scheduleRoutes = require("./routes/schedules");
const ROUTES_CONTRACTOR = require("./routes-contractor");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    limit: "5mb",
    verify: (req, _, buff, __) => {
      req.bodyPlainText = buff.toString();
      return true;
    },
  })
);

ROUTES_CONTRACTOR(app, [scheduleRoutes], "/v1");

const { DB_USERNAME, DB_PW, DB_NAME } = process.env;

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PW}@personal.knwxohc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => console.log("Server started on port 8000"));
  })
  .catch((err) => console.log(err));

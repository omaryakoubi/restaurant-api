const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

//API MIDDLEWARES
const authentication = require("./api/auth/authentication.js");
const add_food = require("./api/product/add_food.js");
const food_list = require("./api/product/food_list.js");
app.use("/app", authentication);
app.use("/app", add_food);
app.use("/app", food_list);

//DATABASE CONNECTION
const DB_URL = process.env.MONGODB_URL;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

//SERVER CONNECTION
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

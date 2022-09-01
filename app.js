const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bookRoute = require("./routes/bookRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", bookRoute);

app.listen(4000, () => {
  console.log("listening on http://localhost:4000");
  mongoose.connect("mongodb://localhost/my_db").then(() => {
    console.log("Mongodb is connected");
  });
});

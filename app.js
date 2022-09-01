const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bookRoute = require("./routes/bookRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", bookRoute);
const PORT = process.env.PORT ||  4000
app.listen(PORT, () => {
  console.log("listening on http://localhost:"+PORT);
  mongoose.connect("mongodb://localhost/my_db").then(() => {
    console.log("Mongodb is connected");
  });
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bookRoute = require("./routes/bookRoutes");
const userRoute = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser());
app.use(
  session({
    secret: "its secret shaan!",
    resave: true,
    maxAge: 24 * 60 * 60,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/book", bookRoute);
app.use("/api/user", userRoute);

app.get("/api/", function (req, res, next) {
  res.send("<h1>Home page: api</h1>");
  next();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("listening on http://localhost:" + PORT);
  mongoose
    .connect(
      "mongodb+srv://shaan:zaim123hashim123ali@cluster0.njl441g.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Mongodb is connected");
    });
});

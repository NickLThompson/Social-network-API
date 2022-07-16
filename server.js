// regular stuff, bringing in express and mongoose, allowing us to use port 3001 in heroku
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env || 3001;

// connecting express and our routes together and stuff; glue
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

// this connects mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/social-media=api",
    {
      useFindAndModify: false,
      useNewUrlParser: true,
    }
  );
  
  mongoose.set("debug", true);
  
  app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
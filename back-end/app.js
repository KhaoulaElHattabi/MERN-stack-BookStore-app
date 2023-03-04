const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const catRoutes = require("./routes/categoryRoutes");
mongoose.set("strictQuery", false);
const bookRoutes = require("./routes/bookRoutes");
const usrRoutes = require("./routes/userRoutes");
const cors = require("cors");

require("dotenv").config();

// Increase maximum request size
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(cors());
app.use(express.json());
app.use("/categories", catRoutes);
app.use("/books", bookRoutes);
app.use("/users", usrRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) =>
    app.listen(process.env.PORT, () => {
      console.log("Server is running ...");
    })
  )
  .catch((error) => console.log("Database not connected", error));

require("dotenv").config();
const express = require("express");
const app = express();
const cafeRoutes = require("./routes/cafe");
const employeeRoutes = require("./routes/employee");
const mongoose = require("mongoose");

//Midlewares
app.use(express.json());

//Routes
app.use("/cafe", cafeRoutes);
app.use("/employee", employeeRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

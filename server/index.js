require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const indexRouter = require("./routes");
const port = process.env.port || "8000";
const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(console.log("Database connected"))
  .catch((e) => {
    console.log("Database error", e.toString());
  });

app.use(morgan("common"));
app.use(express.json());
app.use("/assets", express.static("public"));
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err.toString() || "Something went wrong";
  res.status(500).json({ data: null, err: errMsg });
});

console.log("test");
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

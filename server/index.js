require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

const indexRouter = require("./routes");

const port = process.env.PORT || "8000";

const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(console.log("Database connected"))
  .catch((e) => {
    console.log("Database error", e.toString());
  });
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use("/assets", express.static("public"));
app.use(cors());
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err.err || "Something went wrong";
  res.status(err.status || 500).json({ data: null, err: errMsg });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

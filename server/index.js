const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./src/routes/");

const app = express();
app.use(express.json());
app.use(cors());

// register upload paths
app.use("/uploads", express.static("uploads"));

// add endpoint grouping
app.use("/api/v1/", router);
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

const port = process.env.PORT;

app.listen(port, () => console.debug(`Server running on port: ${port}`));

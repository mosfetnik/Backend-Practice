const express = require("express");
const { status } = require("express/lib/response");
const fs = require("fs");
const app = express();

app.get("/get", (req, res) => {
  res.status(200).json({ message: " hello from the server side" });
});

app.post("/post", (req, res) => {
  res.send("You can post here");
});

const tours = JSON.parse(fs.readFileSync("../../text/nturos.json"));

app.get("/api/v1/tours/", (req, res) => {
  res.status(200).json({
    status: "success",
    results :tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

const express = require("express");
const { marked } = require("marked");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/convert", (req, res) => {
  const { markdown } = req.body;
  const html = marked(markdown);
  res.send({
    msg: "Converted to html succesfully",
    error: false,
    data: html,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

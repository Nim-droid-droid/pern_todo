const express = require("express");
const app = express();
const cors = require("cors");
// by usiing pool lib i can run queries with postgres
const pool = require("./db");
const port = 5000;

app.listen(port, () => {
  console.log(`serve is running in port: ${port}`);
})
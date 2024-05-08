const express = require("express");
const app = express();
const cors = require("cors");
// by usiing pool lib i can run queries with postgres
const pool = require("./db");
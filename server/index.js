const express = require("express");
const app = express();
const cors = require("cors");
// by usiing pool lib i can run queries with postgres
const pool = require("./db");
const port = 5000;

// Express MIDDLEWARE //
// everytime u use middlewear u have to use use()
app.use(cors() )
// whenever im building fullstack app i need to get data from the client side, only way to get that data is from the request.body property thats inside the request obj that comes with the request sent from the clients machine to the server
/*This middleware is used to parse incoming requests with JSON payloads.
When your Express application receives an HTTP request with a JSON payload (typically sent with a Content-Type: application/json header), the express.json() middleware parses the JSON data and makes it available in the req.body property of the request object. This allows you to access the JSON data sent by the client in your route handlers. */
// give me acces to req.body so i can get the JSON data
app.use(express.json() )

app.listen(port, () => {
  console.log(`serve is running in port: ${port}`);
})
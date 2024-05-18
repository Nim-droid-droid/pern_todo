const express = require("express");
const app = express();
const cors = require("cors");
// by usiing pool lib i can run queries with postgres
const pool = require("./db");
const port = 5000;

// ROUTES //
// Im going to use the pool connection to run queries on each of these routes:

// in Express everything you write in relations to actions e.g. app.get() app.post() etc is middleware cuz it acts in-between the request & response (user makes a POST request triggering the app.post() middleware code i wrote) 

// POST/CREATE    Create a to do 
  // Make a asyn POST req to "/todos" -> localhost:5000/todos notice the "/todos" at the end thats the endpoint the req is sent to. 
  // Async cuz whenever we create data its going to take some time to get data back. Async provides me with await which waits for the func to complete before it continues.
  // Express has no opinion on how you fetch data from the server, so it uses the most basic approach which is to use the API built into the browser to make asynchronous request to different network resources by using HTTP request
// app.post(endpoint, callback)
app.post("/todos", async(req, res)=>{
})

// GET/READ    
// Get all to do 
// Get a to do 
// PUT/UPDATE    Update a to do 
// DELETE/DELETE    Delete a to do 


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
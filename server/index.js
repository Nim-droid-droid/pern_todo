const express = require("express");
const app = express();
const cors = require("cors");
// by using pool lib (pg library (node-postgres)) i can run queries on postgres DB
const pool = require("./db");
const port = 5000;
// whenever im building fullstack app i need to get data from the client side, only way to get that data is from the request.body property thats inside the request obj that comes with the request sent from the clients machine to the server
/*This middleware is used to parse incoming requests with JSON payloads.
When your Express application receives an HTTP request with a JSON payload (typically sent with a Content-Type: application/json header), the express.json() middleware parses the JSON data and makes it available in the req.body property of the request object. This allows you to access the JSON data sent by the client in your route handlers. */
// give me acces to req.body so i can get the JSON data
app.use(express.json() )  //req.body

// ROUTES //
// Im going to use the pool connection to run queries on each of these routes:

// in Express everything you write in relations to actions e.g. app.get() app.post() etc is middleware cuz it acts in-between the request & response (user makes a POST request triggering the app.post() middleware code i wrote) 

// POST/CREATE    Create a to do 
  // Make a asyn POST req to "/todos" -> localhost:5000/todos notice the "/todos" at the end thats the endpoint the req is sent to. 
  // Async cuz whenever we create data its going to take some time to get data back. Async provides me with await which waits for the func to complete before it continues.
  // Express has no opinion on how you fetch data from the server, so it uses the most basic approach which is to use the API built into the browser to make asynchronous request to different network resources by using HTTP request

// app.post(endpoint, callback)
app.post("/todos", async(req, res)=>{
  // await - wait for the function to complete before continuing/calling the callback function
  // Error handling
  // need to do error handling if its 1 of the 2 things: data from other sources or user input, so side effects management
  // user input error handling
  try {
    console.log(req.body)  //test

    // Get data from clients to determine what exactly I'm going to add
    // since i have access to req.body i can now test out (write JSON data) for POST /todos route in Postman
      // extracts prop named description from req.body obj - req.body is coming from Postman. In Postman i created a prop in JSON obj for /todos POST called description, im just destructuring it here
      // description var holds the extracted value
    const { description } = req.body;

    // INSERT A NEW TODO
    // Builds/INSERT a new todo using an asynchronous DB query & stores the result in a constant variable named newTodo.
    
    // 1 - Send msg to DB using query()
    // This line of code essentially attempts to INSERT a new todo item into the todo table using the value stored in the description variable. It uses an asynchronous DB operation & await to ensure the code waits for the query to finish before proceeding.
    
      // await pool.query(...) is an asynchronous call that executes a SQL query on the DB
        // await is used because pool.query is asynchronous. It tells JS to pause execution of the current function at this point until the query finishes.
      // Use pool lib then its query method to executes a SQL query to insert data query on the 1st available idle client on (postgres) todo DB & return its result. 
        // It returns a Promise that resolves with the query result OR rejects with an error.

      // ( INSERT statement used to add a new record into a table named "todo", 
      // inside it's column named "description", 
      // "$1" is a placeholder/var for the value to be inserted (which will be provided later). 
      // $1 is the val of [description] - [description] arr intended to hold the values to be inserted for the placeholder/var $1 in this query. 
      // Assuming description was extracted from the request body earlier in the code, this arr ensures the correct value gets inserted into the description column of the new todo item )
      // RETURNING * - Returning back all the data, No i can see the data in my returning JSON object in Postman
      
    // 2 - Await, non blocking & Even loop
      // await pauses the execution of the async function at this point, while it waits for a val (successful or handle any errors) to return. 
      
      // But it doesnt block the entire program execution. Only the async func that's handling the POST request (the current function) gets paused. 

      // While waiting for the query to complete, the Event Loop takes over & starts processing other code in the program that's not waiting for something e.g. Event handlers waiting for user interactions, other asynchronous operations that haven't reached an await yet or any part of your application logic that doesn't depend on the outcome of this query etc

    // 3 - DB Query Finishes
      // Once the DB finishes processing the INSERT query (successfully or with an error), an event is added to the event queue.

    // 4 - Resuming the Paused Function
      // The Event Loop monitors the Event Queue. When the query completion event is detected, the Event Loop tries to resume the function that was paused at await (the POST request handler).
    
    // 5 - Code After await Executes
      // The await allows the POST request handler function to pick up where it left off. It can now use the result of the query (if successful) or handle any errors that might have occurred.

    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

  } catch (err) {
    console.error(err.message);
  }
 }
)

// GET/READ    
// Get all to do 
// Get a to do 
// PUT/UPDATE    Update a to do 
// DELETE/DELETE    Delete a to do 


// Express MIDDLEWARE //
// everytime u use middlewear u have to use use()
app.use(cors() )

app.listen(port, () => {
  console.log(`serve is running in port: ${port}`);
})
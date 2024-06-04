const express = require("express");
const app = express();
const cors = require("cors");
// by using pool lib (pg library (node-postgres)) i can run queries on postgres DB
const pool = require("./db");
const port = 5000;

// Express MIDDLEWARE //
// everytime u use middlewear u have to use use()
app.use(cors() );

// whenever im building fullstack app i need to get data from the client side, only way to get that data is from the request.body property thats inside the request obj that comes with the request sent from the clients machine to the server
/*This middleware is used to parse incoming requests with JSON payloads.
When your Express application receives an HTTP request with a JSON payload (typically sent with a Content-Type: application/json header), the express.json() middleware parses the JSON data and makes it available in the req.body property of the request object. This allows you to access the JSON data sent by the client in your route handlers. */
// give me acces to req.body so i can get the JSON data
app.use(express.json() );  //req.body

// ROUTES //
// RESTful API in Postgres:
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

      // Summary: await pauses the function's execution until the awaited Promise settles, making the code easier to read and reason about. Error handling using try...catch is crucial for asynchronous operations & the specific behavior of pool.query (e.g. executes a single SQL query) depends on the DB system u're using.

    // pool.query is great in many situations except if u are working with transactions. query just send a message to the DB
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
    
    // Sent back the data stored in the newTodo variable as a JSON response back to the client (a HTTP res that contains things like Content-Type Header etc)
      // res - is used to send data back to the client that made the request. res is the response object provided by the Express framework.
      // .json - Express method for sending data in JSON format.
        // Inside it'd (), u specify the data u want to send as a JSON response. in this case newTodo
      // newTodo - holds the result of the DB query that inserted the newly created todo item. 
    // res.json(newTodo);
    
    // get the 1st row 
    res.json(newTodo.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
 }
)

// GET/READ    
// Get all to do 
app.get("/todos", async(req, res)=>{
  try {
    // no need for ''RETURNING *'' cuz SELECT gives the data back
    const allTodos = await pool.query("SELECT * FROM todo")
    res.json(allTodos.rows)

  } catch (error) {
    console.error(error.message)
  }
 }
)

// GET/READ    
// Get a specific todo based on id
// MAKE URL DYNAMIC
// can call :id para whatever u want e.g. :num

// app.get("/todos/:id", ...) defines a GET endpoint at the path /todos/:id.
  // :id is a route parameter. This means that any value placed in that part of the URL will be captured and made available in request.params.

  // whatever i pass after /todos/ gets passed into its :id para
    // http://localhost:5000/todos/random    ->  { id: 'random' } in req.params.id
    // http://localhost:5000/todos/1    ->  { id: '1' }

// app.get("/todos/:num"...
  // http://localhost:5000/todos/random    ->  { num: 'random' } in req.params.num

// async to allow the use of await
app.get("/todos/:id", async(req, res)=>{
  try {
    // Log the route parameters - to see everything in the params obj - so the todos & id of each todo in JSON format in Postman
    console.log(req.params)

    // Grab & store id val from the URL - do that by destructuring id val from the route/req.params
    const {id} = req.params;

    // SQL query against the PostgreSQL DB
    // SELECT * FROM table_name WHERE condition = condition2
      // retrieves all columns from the todo table where the todo_id matches the provided value.
        // $1 is a parameterized placeholder in the SQL query. [id] is an array containing the actual value to replace the placeholder. Here, id will replace $1.
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

    res.json(todo.rows[0])
  } catch (err) {
    // Logs the error message
    console.error(err.message)
  }
 }
)
// PUT/UPDATE    Update a to do 
// DELETE/DELETE    Delete a to do 


app.listen(port, () => {
  console.log(`serve is running in port: ${port}`);
})
import React, { useState } from "react";
import {ListTodos} from "./ListTodos"; // Importing ListTodos component
import {InputTodo} from "./InputTodo"; // Importing InputTodo component 
import {EditTodo} from "./EditTodo"; // Importing EditTodo component 
import { v4 as uuidv4 } from "uuid"; // Importing UUID library for generating unique IDs

/***List of to dos left
 * incorporate ListTodos component
 * incorporate InputTodo component
 * incorporate EditTodo component
 * add styling - preferably similar to the soft flat colour palette similar to Structure app or the minimalistic colour palette & design similar to Noion. Line work is thin, crisp & simple or thick & in muted colours.
 * Layout also similar to Structure app, clean lines and a very simple format.
 * ADDITIONAL STYLING
    Inspiration: Notion and Structure.
    Colour palette: Notion
      Primary Line colour: Black
      Accent colour:
    Line art: Notion
    Layout: Structure 
*/

export default function TodoWrapper(){
  // Maintains an array of to-do items. Each todo is an object:
  // {
  // id: "unique-id",
  // task: "do something",
  // completed: false,
  // isEditing: false
  // }

  // State to hold the list of todos
  const [todos, setTodos] = useState([]);  // Initialize empty list of todos

  // Adds a new to-do to the list.
  function addTodo(todo){
    setTodos([...todos,  // Keep existing todos
      { 
        id: uuidv4(),        // Generate a unique ID for each todo
        task: todo,          // The task description
        completed: false,   // Whether the task is completed. Not completed initially
        isEditing: false     // Initially not in editing mode
      }
    ]);
  }
  
  // Removes a to-do based on if it has a matching ID
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
    
  // Toggles the completed state of a to-do.
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        // Keep existing todos
        // Flip the completed status
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Toggles isEditing to enable/disable editing mode.
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, // Keep existing todos
          isEditing: !todo.isEditing }// Toggle editing mode
       : todo
      )
    );
  }

  // Updates the task value and exits editing mode.
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  return(
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      {/* Input component to add new todos */}
      {/* switch out TodoForm for InputTodo*/}
      <InputTodo addTodo={addTodo} />
      {/* <TodoForm addTodo={addTodo} /> */}
      {/* Render list of todos */}
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            // Otherwise, (in editing mode) render the todo display
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
}
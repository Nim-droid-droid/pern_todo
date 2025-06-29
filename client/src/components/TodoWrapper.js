import React, { useState } from "react";
import {ListTodos} from "./ListTodos";
import {InputTodo} from "./InputTodo";
import {EditTodo} from "./EditTodo";
import { v4 as uuidv4 } from "uuid";


export default function TodoWrapper(){
  // Maintains an array of to-do items. Each item is expected to be an object like:
  // {
  // id: "unique-id",
  // task: "do something",
  // completed: false,
  // isEditing: false
  // }


  const [todos, setTodos] = useState([]);

  // Adds a new to-do to the list.
  function addTodo(todo){
    setTodos([...todos,
      { id:uuidv4(),
        task:todo, 
        completed: false, 
        isEditing: false
      }
    ]);
  }
  
  // Removes a to-do based on its id.
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
    
  // Toggles the completed state of a to-do.
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }


  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }


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
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
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
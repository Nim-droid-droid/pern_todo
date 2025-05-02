import React, { useState } from "react";
import {ListTodos} from "./ListTodos";
import {InputTodo} from "./InputTodo";
import {EditTodo} from "./EditTodo";
import { v4 as uuidv4 } from "uuid";


export default function TodoWrapper(){
  const [todos, setTodos] = useState([]);

  function addTodo(todo){
    setTodos([...todos,
      { id:uuidv4(),
        task:todo, 
        completed: false, 
        isEditing: false
      }
    ]);
  }
  
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
    
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
    );
  };
  return();
}
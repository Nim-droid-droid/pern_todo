import React, { useState } from "react";
import {ListTodos} from "./ListTodos";
import {InputTodo} from "./InputTodo";
import {EditTodo} from "./EditTodo";
import { v4 as uuidv4 } from "uuid";


export default function TodoWrapper(){
  const [todos, setTodos] = useState([]);

  function addTodo(todo){
    setTodos([...todos],
      { id:uuidv4(),
        task:todo, 
        completed: false, isEditing:,
      }
    )
  }

  return();
}
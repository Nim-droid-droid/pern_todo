import React from 'react'
import { useState } from 'react';

// Functionality not tested - fix props names & make them match
function EditTodo(props) {
  const [value, setValue] = useState(props.task);

  function handleSubmit(e){
    // prevent default action
    e.preventDefault();
    // edit todo
    // props.editTodo(value, props.task.id);
    editTodo(value, task.id);
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="TodoForm">
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo"/>
      </form>
    </>
  )
}
export default EditTodo;
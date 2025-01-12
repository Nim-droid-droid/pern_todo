import React from 'react'
import { useState } from 'react';

// Functionality not tested - fix props names & make them match
function EditTodo(props) {
  const [value, setValue] = useState(props.task);

  function handleSubmit(e){}
  
  return (
    <>
      <button>Edit</button>
    </>
  )
}
export default EditTodo;
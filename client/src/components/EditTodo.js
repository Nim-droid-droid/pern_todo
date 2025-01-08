import React from 'react'
import { useState } from 'react';

// Functionality not tested
function EditTodo(props) {
  const [value, setValue] = useState(props.task);

  return (
    <>
      <button>Edit</button>
    </>
  )
}
export default EditTodo;
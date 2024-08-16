import React, { useState } from 'react';

export default function InputTodo() {
  const [description, setDescription] = useState("");

  return (
    <>
      <div></div>
      <h1 className="text-center mt-5">PERN Todo List</h1>

      <form className="d-flex mt-5">

        <input
          type="text"
          className="form-control"
          value={description}
        />
      </form>
    </>
  );
}

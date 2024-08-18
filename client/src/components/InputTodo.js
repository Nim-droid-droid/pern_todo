import React, { useState } from 'react';

export default function InputTodo() {
  const [description, setDescription] = useState("");

  return (
    <>
      <div></div>
      <h1 className="text-center mt-5">PERN Todo List</h1>

      {/* connect form to onSubmitForm fun. Each time form submits onSubmitForm fires */}
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </form>
    </>
  );
}

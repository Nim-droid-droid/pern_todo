import React, { useState } from 'react';

export default function InputTodo() {
  const [description, setDescription] = useState("");
  
  // submit form & send data out - now i can add to dos to my DB
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        // By default fetch makes a GET request
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      console.log(response);

      // Once response has been sent page will refresh & show the changes
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <>
      <div></div>
      <h1 className="text-center mt-5">PERN Todo List</h1>

      {/* connect form to onSubmitForm fun. Each time form submits onSubmitForm fires */}
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
      {/* value={description}    React will force the input to always have the value you passed, in this case description var */}
      {/* onChange={ e => setDescription(e.target.value)}    allows me to type into input box hence change/update inital val */}
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
}

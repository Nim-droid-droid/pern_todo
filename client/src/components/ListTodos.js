import React, { useEffect, useState } from 'react'

export default function ListTodos() {
  // Initially this arr is empty but i will put all the fetched data/todos in here. 
  const [todos, setTodos] = useState([]);

  // Make fetch request to my RESTful API Each time this component renders
  const getTodos = async () => {
    try {
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <>

    </>
  )
}

import React, { useEffect, useState } from 'react'

export default function ListTodos() {
  // Initially this arr is empty but i will put all the fetched data/todos in here. 
  const [todos, setTodos] = useState([]);

  // Make fetch request to my RESTful API Each time this component renders
  const getTodos = async () => {
    try {
      // await since it takes time to fetch data. Without this I'm just going to get aPpromise obj with the value pending
      const response = await fetch("http://localhost:5000/todos");
      // await since it takes time to parse data. Without this I'm just going to get aPpromise obj with the value pending
      const jsonData = await response.json();

    } catch (err) {
      console.error(err.message);
    }
  };
  
  return (
    <>

    </>
  )
}

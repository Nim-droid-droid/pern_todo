import React, { useEffect, useState } from 'react'

export default function ListTodos() {
  // Initially this arr is empty but i will put all the fetched data/todos in here. 
  const [todos, setTodos] = useState([]);

  // Make fetch request to my RESTful API Each time this component renders
  const getTodos = async () => {
    try {
      // await since it takes time to fetch data. Without this I'm just going to get aPpromise obj with the value pending
      const response = await fetch("http://localhost:5000/todos");
      // See data step 1
      // cant simply console log the returned data, i need to parse it somehow & I'm going to do that using JSON format
      // await since it takes time to parse data. Without this I'm just going to get aPpromise obj with the value pending
      const jsonData = await response.json();
      // console.log(jsonData);

      // Update todos state - Now the arr will no longer be empty but hold all of the todos
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(()=>{
    // See data step 2 - now i can see the obj with ALL the todos/data in console 
    getTodos()
  }, []);


  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
      </table>
    </>
  )
}

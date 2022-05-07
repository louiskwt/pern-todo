import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import EditTodo from './EditTodo'


const ListTodo = () => {
    const [todos, setTodos] = useState([])

    const getTodos = async() => {
        try {
            const response = await fetch('http://localhost:8000/todos')
            const jsonData = await response.json()

            setTodos(jsonData)
        } catch(err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getTodos()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/todos/${id}`, {
                method: 'DELETE',
            })
        
            console.log(res)
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <>
          <table className='table mt-5 text-center'>
              <thead className="table-dark">
                  <tr>
                      <th scope="col">Things To-do</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                  </tr>
              </thead>
              <tbody>
                  {todos.map((todo, index) => (
                      <tr key={index}>
                          <td >{todo.description}</td>
                          <td><Button variant="danger" onClick={() => handleDelete(todo.todo_id)}>Delete</Button></td>
                          <td><EditTodo description={todo.description} id={todo.todo_id} /></td>
                      </tr>
                  ))}

              </tbody>
          </table>
    </>
  )
}

export default ListTodo
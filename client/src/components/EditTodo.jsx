import React, {useState} from 'react'
import { Button, Form, Modal }  from 'react-bootstrap'

const EditTodo = ({description, id}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => { 
                                setShow(false)
                                setTodoDesc(description) 
                            };
    const [todoDesc, setTodoDesc] = useState(description)

    // update todo
    const updateTodo = async(e) => {
        e.preventDefault();
        try {
            const body = {description: todoDesc};
            const response = await fetch(`http://localhost:8000/todos/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log(response);
            window.location = '/'

        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <>
        <Button variant="success" onClick={handleShow}>
            Edit
        </Button>
        <div>
              <Modal show={show} onHide={handleClose} >
                  <Modal.Header closeButton>
                      <Modal.Title>Edit Todo</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Control type="text" value={todoDesc} onChange={(e) => setTodoDesc(e.target.value) } />
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                          Cancel
                      </Button>
                      <Button variant='primary' onClick={(e) => updateTodo(e)}>
                          Update Todo
                      </Button>
                  </Modal.Footer>
              </Modal>
        </div>
    </>
  )
}

export default EditTodo
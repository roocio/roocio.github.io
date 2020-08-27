import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'

function TodoList() {
  const [list, setList] = useState([])
  const addItem = () => {
    setList([...list, { task: 'Clean the house', timeLeft: 20, ready: false }])
  }
  return (
    <Container className="d-flex flex-column align-items-left">
      <Button onClick={addItem}>Add</Button>
      <ListGroup>
        {list.map((i) => (
          <ListGroup.Item>{i.task}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default TodoList

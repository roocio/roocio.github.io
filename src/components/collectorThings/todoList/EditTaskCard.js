import React from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

import AddTaskForm from './AddTaskForm'

const EditTaskCard = ({ item, onTaskEdited, hide }) => {
  return (
    <Card.Body>
      <Col className="mb-3 pl-0" style={{ color: '#4d4d4d' }}>
        <strong>Task edit</strong>
      </Col>
      <AddTaskForm
        onSubmitValues={(name, deadline) => {
          onTaskEdited({
            id: item.id,
            task: name,
            deadline: deadline,
          })
        }}
        currentTaskName={item.task}
      >
        <Accordion.Toggle as={Button} variant="link" eventKey={item.id}>
          Close
        </Accordion.Toggle>
      </AddTaskForm>
    </Card.Body>
  )
}
export default EditTaskCard

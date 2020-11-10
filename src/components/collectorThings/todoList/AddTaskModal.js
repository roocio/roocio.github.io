import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AddTaskForm from './AddTaskForm'

const AddTaskModal = ({ show, hide, onTaskAdd }) => {
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a new task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddTaskForm
          onSubmitValues={(name, deadline) => {
            onTaskAdd({
              id:
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15),
              task: name,
              deadline: deadline,
              taskCreationDate: new Date(),
            })
          }}
          hide={hide}
        />
      </Modal.Body>
    </Modal>
  )
}

export default AddTaskModal

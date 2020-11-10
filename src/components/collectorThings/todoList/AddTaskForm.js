import React, { useState, useRef, useEffect } from 'react'
import { object, string } from 'yup'
import { Formik } from 'formik'
import DatePicker from 'react-date-picker'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'react-date-picker/dist/DatePicker.css'

function AddTaskForm({
  onSubmitValues,
  hide,
  currentTaskName,
  children = null,
}) {
  let yup = require('yup')
  const schema = yup.object().shape({
    name: yup.string().required(),
  })
  const [datePicker, setDatePicker] = useState(new Date())
  let maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 6)

  const textInput = useRef(null)
  useEffect(() => {
    textInput.current.focus()
  }, [])

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        onSubmitValues(values.name, datePicker)
      }}
      initialValues={{
        name: currentTaskName,
        datePicker: datePicker,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col lg={6}>
              <Form.Group controlId="validationFormikTask">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="input"
                  name="name"
                  placeholder="Clean the house..."
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  ref={textInput}
                />
                <Form.Control.Feedback type="invalid">
                  You must name your task
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg="auto">
              <Form.Group controlId="validationFormikTask" className="mb-4">
                <Form.Label>Deadline</Form.Label>
                <Col className="pl-0">
                  <DatePicker
                    onChange={setDatePicker}
                    value={datePicker}
                    minDate={new Date()}
                    maxDate={maxDate}
                    minDetail="year"
                    calendarClassName=""
                    style={{
                      height: '35px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Form.Row className="justify-content-end">
            {children ? (
              children
            ) : (
              <Col xs="auto">
                <Button
                  variant="secondary"
                  className="btn-icon-addTask"
                  style={{ width: '5rem' }}
                  onClick={hide}
                >
                  Cancel
                </Button>
              </Col>
            )}
            <Col xs="auto">
              <Button
                type="submit"
                className="btn-icon-addTask"
                style={{ width: '6rem' }}
              >
                Add
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )}
    </Formik>
  )
}
export default AddTaskForm

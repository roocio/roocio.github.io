import React, { useState, useReducer, useEffect } from 'react'

// UI components import
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Table from 'react-bootstrap/Table'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// icons import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

// images import
import imgEmptyList from '../../../assets/imgs/imgEmptyList.svg'
import imgAllDone from '../../../assets/imgs/imgAllDone.svg'

// proyect components import
import AddTaskModal from './AddTaskModal'
import AddTaskForm from './AddTaskForm'
import EditTaskCard from './EditTaskCard'

// moment library import
import moment from 'moment'

const listReducer = (state, { type, item }) => {
  switch (type) {
    case 'ADD_ITEM':
      return [
        ...state,
        {
          id: item.id,
          task: item.task,
          deadline: item.deadline,
          ready: false,
          taskCreationDate: item.taskCreationDate,
        },
      ]
    case 'EMPTY_LIST':
      return []
    case 'SET_READY':
      state.find((stateItem) => stateItem.id === item.id).ready = true
      return [...state]

    case 'EDIT_ITEM':
      state.find((stateItem) => stateItem.id === item.id).task = item.task
      state.find((stateItem) => stateItem.id === item.id).deadline =
        item.deadline
      return [...state]
    default:
      throw new Error()
  }
}

function TodoList() {
  // moment control
  let momentDeadLine

  // modal control
  const [show, setShow] = useState(false)

  // Accordion control
  const [activeAccordion, setActiveAccordion] = useState(null)

  // handle "Add task" btn
  const handleAddTaskBtn = () => {
    // reset progress bar when a new list is create
    if (progressBarHandle.completed) {
      dispatchList({ type: 'EMPTY_LIST' })
    }
    setShow(true)
  }

  // Task list control
  const initialList = []
  const [list, dispatchList] = useReducer(listReducer, initialList)

  const handleAddTask = (item) => {
    setShow(false)
    setListControl({
      ...listControl,
      listTaskNotReady: listControl.listTaskNotReady + 1,
    })
    dispatchList({ type: 'ADD_ITEM', item })
  }

  const handleEditTask = (item) => {
    dispatchList({ type: 'EDIT_ITEM', item })
  }

  const [progressBarHandle, setProgressBarAmount] = useState({
    amount: 0,
    completed: false,
  })
  const handleProgressBar = () => {
    if (listControl.listTaskReady) {
      let newAmount = (listControl.listTaskReady * 100) / list.length
      let isCompleted = newAmount >= 100
      if (isCompleted) {
        setListControl({ ...listControl, allTaskReady: true })
      }
      setProgressBarAmount({
        ...progressBarHandle,
        amount: parseInt(newAmount),
        completed: isCompleted,
      })
    }
  }

  const handleClickOnTaskReady = (item) => {
    setListControl({
      ...listControl,
      listTaskNotReady: listControl.listTaskNotReady - 1,
      listTaskReady: listControl.listTaskReady + 1,
    })
    dispatchList({ type: 'SET_READY', item: { id: item.id } })
  }

  // list control state
  const [listControl, setListControl] = useState({
    listTaskNotReady: 0,
    listTaskReady: 0,
    allTaskReady: false,
    firstTimeList: true,
  })

  useEffect(() => {
    if (listControl.allTaskReady) {
      setListControl({
        ...listControl,
        listTaskNotReady: 0,
        listTaskReady: 0,
        allTaskReady: false,
        firstTimeList: false,
      })
      setProgressBarAmount({ amount: 0, completed: false })
    }
    if (list.length) {
      handleProgressBar()
    }
  }, [list])

  const manageDeadlineShowed = (deadline) => {
    return moment(deadline)
      .hours(23)
      .minutes(59)
      .seconds(0)
      .from(moment(), true)
  }

  return (
    <div className="mb-5">
      <Card>
        <Row className="pl-3 pr-3 mt-3 mb-3">
          <Col sm={8} style={{ color: '#4d4d4d' }}>
            <h2>Todo list</h2>
          </Col>
          <Col sm={4} className="d-flex justify-content-end">
            <Button onClick={handleAddTaskBtn} className="btn-icon-addTask">
              <tet className="ml-2 mr-2">Add task</tet>
              <FontAwesomeIcon icon={faPlus} size="1x" />
            </Button>
          </Col>
        </Row>
        <Row className="pl-3 pr-3 mb-3">
          <Col>
            <text style={{ color: '#4d4d4d' }}>Completed:</text>
            <ProgressBar
              now={progressBarHandle.amount}
              label={`${progressBarHandle.amount}%`}
              className="mb-3"
            />
            {!list.length ? (
              <Row className="d-flex align-items-center">
                <Col
                  xs={12}
                  lg={{ span: 5, offset: 1 }}
                  className="d-flex justify-content-center"
                >
                  <span className="text-center" style={{ color: '#6600cc' }}>
                    <h2>You list is empty!</h2>
                    <text>
                      Start by adding some tasks in "Add task" section
                    </text>
                  </span>
                </Col>
                <Col
                  xs={12}
                  lg="auto"
                  className="d-flex justify-content-center"
                >
                  <Image src={imgEmptyList} fluid />
                </Col>
              </Row>
            ) : null}
            {progressBarHandle.completed ? (
              <Row className="d-flex align-items-center">
                <Col
                  xs={12}
                  lg={{ span: 4, offset: 1 }}
                  className="d-flex justify-content-center"
                >
                  <span className="text-center" style={{ color: '#6600cc' }}>
                    <h2>All done!</h2>
                    <text>You are up to date. Take a well deserved rest</text>
                  </span>
                </Col>
                <Col
                  xs={12}
                  lg="auto"
                  className="d-flex justify-content-center"
                >
                  <Image src={imgAllDone} fluid />
                </Col>
              </Row>
            ) : null}
          </Col>
        </Row>
        <Row className="ml-1 mr-1 mb-5">
          <Col>
            <Accordion fluid>
              {listControl.listTaskNotReady
                ? list
                    .filter((item) => item.ready === false)
                    .map((i) => (
                      <Card style={{ overflow: 'visible' }}>
                        <Card.Header>
                          <Row className="d-flex align-items-center justify-content-between">
                            <Col xs={12} lg={8}>
                              <span>
                                <text
                                  className="font-weight-bold"
                                  style={{ color: '#6600cc' }}
                                >
                                  {i.task}
                                </text>
                              </span>
                            </Col>
                            <Col
                              lg="auto"
                              className="d-flex justify-content-end align-items-center mr-3"
                            >
                              <Row>
                                <OverlayTrigger
                                  placement="top"
                                  key="deadline"
                                  overlay={
                                    <Tooltip id="tooltip-top">
                                      <small style={{ color: '#6600cc' }}>
                                        {i.deadline
                                          ? i.deadline.toDateString()
                                          : 'No estimated'}
                                      </small>
                                    </Tooltip>
                                  }
                                >
                                  <small>
                                    Deadline in:
                                    <span
                                      className="pl-1"
                                      style={{ color: '#6600cc' }}
                                    >
                                      {i.deadline
                                        ? manageDeadlineShowed(i.deadline)
                                        : 'No estimated'}
                                    </span>
                                  </small>
                                </OverlayTrigger>
                              </Row>
                            </Col>
                          </Row>
                          <Row
                            md="auto"
                            className="d-flex justify-content-end align-items-center"
                          >
                            <Button
                              onClick={() => {
                                handleClickOnTaskReady(i)
                              }}
                              variant="link"
                            >
                              <a className="btn-icon-taskReady">
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  size="1x"
                                />
                              </a>
                            </Button>
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey={i.id}
                            >
                              <a className="btn-icon-taskEdit">
                                <FontAwesomeIcon icon={faEdit} size="1x" />
                              </a>
                            </Accordion.Toggle>
                          </Row>
                        </Card.Header>
                        <Accordion.Collapse eventKey={i.id}>
                          <EditTaskCard
                            item={i}
                            onTaskEdited={handleEditTask}
                          />
                        </Accordion.Collapse>
                      </Card>
                    ))
                : null}
            </Accordion>
          </Col>
        </Row>
        {listControl.listTaskReady ? (
          <Row className="p-3">
            <Col>
              <Card>
                <ListGroup variant="flush">
                  {list
                    .filter((item) => item.ready == true)
                    .map((i) => (
                      <ListGroup.Item style={{ backgroundColor: '#eafce8' }}>
                        <Row className="d-flex align-items-center justify-content-between">
                          <Col xs lg={8} className="font-weight-bold">
                            <text style={{ color: '##737373' }}>{i.task}</text>
                          </Col>
                          <Col
                            lg="auto"
                            className="d-flex justify-content-end align-items-center"
                          >
                            <Row>
                              <OverlayTrigger
                                placement="top"
                                key="deadline-task-on-ready"
                                overlay={
                                  <Tooltip id="tooltip-top">
                                    <small style={{ color: '#6600cc' }}>
                                      Deadline was
                                      <strong>
                                        {i.deadline
                                          ? i.deadline.toDateString()
                                          : 'No estimated'}
                                      </strong>
                                    </small>
                                  </Tooltip>
                                }
                              >
                                <Row className="d-flex justify-content-end align-items-center mr-3">
                                  <span
                                    style={{ color: '##737373' }}
                                    className="mr-3 ml-3 font-weight-light"
                                  >
                                    <small>
                                      Completed in{' '}
                                      <strong>
                                        {moment(i.taskCreationDate).from(
                                          moment(),
                                          true,
                                        )}
                                      </strong>{' '}
                                    </small>
                                  </span>

                                  <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    size="1x"
                                    color="#81ee77"
                                  />
                                </Row>
                              </OverlayTrigger>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        ) : null}
        <AddTaskModal
          show={show}
          hide={() => setShow(false)}
          onTaskAdd={handleAddTask}
        />
      </Card>
      <Row className="justify-content-end mr-2">
        <OverlayTrigger
          trigger="click"
          placement="top-end"
          overlay={
            <Popover id="popover-img-credits">
              <Popover.Title>
                <small>
                  <strong>www.freepik.com</strong>
                </small>
              </Popover.Title>
              <Popover.Content>
                <a
                  target="_blank"
                  href="https://www.freepik.com/vectors/background"
                  className="badge badge-pill badge-light"
                >
                  Empty List
                </a>

                <a
                  target="_blank"
                  href="https://www.freepik.com/vectors/home"
                  className="badge badge-pill badge-light"
                >
                  All done
                </a>
              </Popover.Content>
            </Popover>
          }
        >
          <a href="#">
            <small style={{ color: '#737373' }} className="pt-0">
              Image credits
            </small>
          </a>
        </OverlayTrigger>
      </Row>
    </div>
  )
}

export default TodoList

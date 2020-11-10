import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import P5Wrapper from 'react-p5-wrapper'
import aimTrainerSketch from './collectorThings/aimTrainer/aimTrainerSketch'

import Header from './header/Header'
import TodoList from './collectorThings/todoList/TodoList'
import RenderOnSelect from './RenderOnSelect'
import useCollectorItemsReducer from '../helpers/useCollectorItemsReducer'

function Home() {
  const {
    selectedCollectorItem,
    selectCollectorItemAction,
    closeCollectorItemAction,
  } = useCollectorItemsReducer()

  return (
    <div>
      <Row className="mt-5 ml-4 mb-3 mr-5 text-monospace">
        <Col>
          <p>
            <mark>The Collector of Things.</mark>
            <p className="mt-2">A page without a reason found yet</p>
          </p>
        </Col>
      </Row>

      <Container>
        <RenderOnSelect render={selectedCollectorItem} />
      </Container>

      <Header
        onCloseBtnClick={closeCollectorItemAction}
        onSelectBtnClick={selectCollectorItemAction}
        selected={selectedCollectorItem}
      />
    </div>
  )
}
export default Home

import React from 'react'

import P5Wrapper from 'react-p5-wrapper'
import aimTrainerSketch from './collectorThings/aimTrainer/aimTrainerSketch'
import TodoList from './collectorThings/todoList/TodoList'

const RenderOnSelect = ({ render }) => {
  const selectRender = () => {
    switch (render) {
      case 'aimTrainer': {
        return <P5Wrapper sketch={aimTrainerSketch} />
      }
      case 'todoList': {
        return <TodoList />
      }
      default:
        return null
    }
  }

  return <div>{selectRender()}</div>
}

export default RenderOnSelect

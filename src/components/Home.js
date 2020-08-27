import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'

import Header from './Header'
import TodoList from './TodoList'

function Home() {
  return (
    <div>
      <p className="mt-5 ml-4 mb-5 text-monospace">
        <mark>The Collector of Things.</mark>
        <p className="mt-2">A page without a reason found yet</p>
      </p>
      {/* <Button variant="secondary">Go somewhere</Button> */}

      {/* <Col>
        <P5Wrapper sketch={sketch} />
      </Col> */}
      <Container
      // style={{
      //   position: 'absolute',
      //   top: '30%',
      //   left: '7%',
      // }}
      // className="container-fluid vh-100 mt-2"
      >
        <TodoList />
      </Container>

      <Header />
    </div>
  )
}
export default Home

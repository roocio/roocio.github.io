import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'

import Header from './Header'

function Home() {
  return (
    <div>
      <p className="mt-5 text-monospace fixed-top">
        <mark>The Collector of Things.</mark>
        <p className="mt-2">A page without a reason found yet</p>
      </p>
      {/* <Button variant="secondary">Go somewhere</Button> */}

      <Col>
        <P5Wrapper sketch={sketch} />
      </Col>

      <Header />
    </div>
  )
}
export default Home

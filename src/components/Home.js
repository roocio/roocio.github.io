import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Header from './Header'

function Home() {
  return (
    <div className="ml-2">
      <Col>
        <p className="mt-5 text-monospace">
          <mark>The Collector of Things.</mark>
          <p className="mt-2">A page without a reason found yet</p>
        </p>
      </Col>
      <Button variant="secondary">Go somewhere</Button>
      <Header />
    </div>
  )
}
export default Home

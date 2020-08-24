import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'

function AboutCard() {
  return (
    <Card
      border="dark"
      style={{ width: '9rem' }}
      className="bg-transparent text-black"
    >
      <Card.Img src="https://avatars0.githubusercontent.com/u/18176548?s=460&v=4" />
      <Card.Body>
        <Card.Title>Rocío</Card.Title>
        <Card.Text>The author</Card.Text>
        <Row xs={4} md={4} lg={6}>
          <Col>
            <a href="https://github.com/roocio" target="_blank">
              <FontAwesomeIcon icon={faGithubAlt} />
            </a>
          </Col>
          <Col>
            <a href="https://www.linkedin.com/in/rociodc/" target="_blank">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
export default AboutCard

import React, { useState } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'

function Contact({ linkText }) {
  const [show, setShow] = useState(false)
  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <OverlayTrigger
        placement="top"
        show={show}
        onToggle={() => setShow(true)}
        overlay={
          <Tooltip id="tooltip-top">
            <h6 className="text-monospace">Hi there.</h6>
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
          </Tooltip>
        }
      >
        <Nav.Link>{linkText}</Nav.Link>
      </OverlayTrigger>
    </div>
  )
}

export default Contact

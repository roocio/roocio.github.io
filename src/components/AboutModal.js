import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AboutCard from './AboutCard'

function AboutModal({ show, hide }) {
  return (
    <Modal
      show={show}
      onHide={hide}
      // dialogClassName="modal-100w"
      aria-labelledby="large-centered-modal"
      centered
      className="about-modal"
      animation={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="large-centered-modal"
          className="font-weight-bold  text-monospace"
        >
          <h1 className="font-weight-bold">R4nd0m 5tuff ab0v3 a1l</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="text-monospace">
          <Col>
            <p>
              This page just shows random stuff, but most of all, things that I
              enjoy develop, analyze, and learn. In the end there is only one
              collection of everything that I personally like and makes me have
              a while of fun and frustration.
            </p>
            <p>why not.</p>
            <p>
              On the page you can find some data visualizations, some weird
              games, generative images, among other things. The code will be
              available in the section "Repos".
            </p>
          </Col>
          <Col md="auto">
            <AboutCard />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
export default AboutModal

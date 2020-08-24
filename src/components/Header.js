import React, { useState } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import AboutModal from './AboutModal'
import Contact from './Contact'

function Navigation() {
  const [show, setShow] = useState(false)

  return (
    <Navbar collapseOnSelect expand="lg" fixed="bottom" className="ml-2 ">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto text-monospace">
          <Nav.Link onClick={() => setShow(true)}>About</Nav.Link>
          <Contact linkText={'Contact'} />
        </Nav>
        <AboutModal show={show} hide={() => setShow(false)} />
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Navigation

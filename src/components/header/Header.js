import React, { useState } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown'

import AboutModal from './about/AboutModal'
import Contact from './Contact'
import HeaderCancelBtn from './HeaderCancelBtn'

import useCollectorItemsReducer from '../../helpers/useCollectorItemsReducer'

function Header({ onCloseBtnClick, onSelectBtnClick, selected }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <Navbar collapseOnSelect expand="lg" fixed="bottom" className="ml-2 mr-2">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav>
        <div>
          {selected ? (
            <HeaderCancelBtn onCloseBtnClick={onCloseBtnClick} />
          ) : null}
        </div>
      </Nav>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto text-monospace">
          <NavDropdown
            title="Collector"
            id="collasible-nav-dropdown"
            drop="up"
            className="mr-2"
          >
            <NavDropdown.Item
              //as="button"
              href="#AIMTrainer"
              id="aimTrainer"
              onClick={onSelectBtnClick}
            >
              AIM Trainer
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#ToDo List"
              id="todoList"
              onClick={onSelectBtnClick}
            >
              Todo List
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="text-monospace">
          <Nav.Link href="#" onClick={() => setShowModal(true)}>
            About
          </Nav.Link>
          <Contact linkText={'Contact'} />
        </Nav>

        <AboutModal show={showModal} hide={() => setShowModal(false)} />
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Header

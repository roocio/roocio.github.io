import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import useCollectorItemsReducer from '../../helpers/useCollectorItemsReducer'

const HeaderCancelBtn = ({ onCloseBtnClick }) => {
  return (
    <Button
      variant="danger"
      className="text-monospace"
      onClick={onCloseBtnClick}
    >
      Close
      <FontAwesomeIcon
        icon={faWindowClose}
        color="white"
        style={{ marginLeft: '0.5rem' }}
      />
    </Button>
  )
}

export default HeaderCancelBtn

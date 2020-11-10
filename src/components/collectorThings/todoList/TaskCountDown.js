import React, { useState, useEffect } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const TaskCountDown = ({ id, hours, minutes }) => {
  // list timeleft control state
  const [timeLeftList, setTimeLeftList] = useState({
    [id]: {
      hours: hours,
      minutes: minutes,
    },
  })

  useEffect(() => {
    const secondsInterval = setTimeout(() => {
      if (timeLeftList[id].minutes > 0) {
        let newMinutes = timeLeftList[id].minutes - 1
        setTimeLeftList({
          ...timeLeftList,
          [id]: {
            minutes: newMinutes,
            hours: timeLeftList[id].hours,
          },
        })
        console.log('minutes', newMinutes)
      }
      if (timeLeftList[id].minutes === 0) {
        if (timeLeftList[id].hours != 0) {
          let newHours = timeLeftList[id].hours - 1
          console.log('hours', newHours)
          setTimeLeftList({
            ...timeLeftList,
            [id]: { hours: newHours, minutes: 59 },
          })
        }
      }
    }, 60000)
  }, [timeLeftList])

  return (
    <Row>
      Time left:
      <span className="font-weight-bold pl-1 pr-1" style={{ color: '#6600cc' }}>
        {timeLeftList[id].hours}:
        {timeLeftList[id].minutes < 10
          ? `0${timeLeftList[id].minutes}`
          : timeLeftList[id].minutes}
      </span>
      hs
    </Row>
  )
}
export default TaskCountDown

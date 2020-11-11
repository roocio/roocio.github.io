import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

const WorldToday = () => {
  const ref = useRef(null)

  useEffect(() => {
    const myDiv = d3.select(ref.current)
    myDiv.style('background-color', 'red')
  }, [])

  return <div ref={ref}>hola</div>
}
export default WorldToday

import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div>Sorry, no such page exists! Kindly <Link to="/">clear here</Link> to go back...
    </div>
  )
}

export default Error
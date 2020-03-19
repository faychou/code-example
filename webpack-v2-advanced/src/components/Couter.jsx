// const list = <p>abc</p>
import React, { useState } from 'react'

const couterStyle = {
  margin: '20px 0',
  textAlign: 'center',
  height: '50px',
  lineHeight: '50px'
}

const Couter = () => {
  const [count, setCount] = useState(0)
  return (
    <div style={couterStyle}>
      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

export default Couter
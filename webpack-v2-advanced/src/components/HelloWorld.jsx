// const list = <p>abc</p>
import React, { Component } from 'react'
import '@/assets/css/hello.less'

class HelloWorld extends Component{
  constructor() {
    super()
  }

  render() {
    return (
      <div className='hello'>
        <h2>hello everyone !</h2>
        <img src={require('../assets/images/webpack3.svg')} alt=""/>
      </div>
    )
  }
}

export default HelloWorld
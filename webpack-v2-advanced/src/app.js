import React from 'react'
import webpack1 from './assets/images/webpack1.jpg'
import webpack2 from '@/assets/images/webpack2.png'
import HelloWorld from '@/components/HelloWorld'
import Couter from '@/components/Couter'

const appStyle = {
  textAlign: 'center',
  padding: '20px 0'
}
const btnStyle = {
  width: '200px',
  height: '50px',
  lineHeight: '50px',
  backgroundColor: '#0dc7a8',
  color: '#fff',
  cursor: 'pointer',
  margin: '20px auto',
  borderRadius: '10px',
  boxShadow: '1px 1px 5px #0dc7a8',
  textAlign: 'center',
  userSelect: 'none'
}

class App extends React.Component{
  constructor() {
    super()
  }
  // handleClick() {
  //   console.log('点击事件触发');
  // }
  handleClick = () => {
    console.log('点击事件触发');
    import('@/assets/js/test')
    .then(module => {
      console.log(module)
      module.default()
    });
  };


  render() {
    return (
      <div className="app">
        <h1 style={appStyle}>app</h1>
        <input type="text" />
        <HelloWorld />
        <Couter />
        {/* <div style={btnStyle} onClick={()=> this.handleClick()}>点我试试</div> */}
        <div style={btnStyle} onClick={ this.handleClick }>点我试试</div>
        <div>
          <img src={webpack1} alt=""/>
          <img src={webpack2} alt=""/>
        </div>
      </div>
    )
  }
}

export default App
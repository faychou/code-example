import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

export default class Index extends Component {
  state = {
    text: ''
  }
  onAddTodo = (e) => {
    this.setState({
      text: e.target.value
    });
  }
  onSubmit = () => {
    
  }
  render() {
    const {text} = this.state
    return (
      <Provider store={store}>
        <div className="todo-app">
          <h3>class组件使用redux示例</h3>

          <div className="todo-input">
            <input type="text" placeholder="请输入代办事项" value={text} onchange={this.onAddTodo} />
            <button onClick={this.onSubmit}>添加</button>
          </div>

          <ul className="todo-list">
            <li>哈哈</li>
          </ul>
        </div>
      </Provider>
    );
  }
}

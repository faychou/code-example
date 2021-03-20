import React from 'react';
// 需要安装 @types/react-redux，不需要安装 @types/redux，因为Redux已经自带了声明文件
import { Provider } from 'react-redux';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import store from './store/';

export default () => {

  return (
    <Provider store={store}>
      <div className="todo">
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
    
  )
}
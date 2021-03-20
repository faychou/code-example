import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import MyProvider from './MyContext';

export default () => {

  return (
    <MyProvider>
      <div className="todo">
        <TodoInput />
        <TodoList />
      </div>
    </MyProvider>
    
  )
}
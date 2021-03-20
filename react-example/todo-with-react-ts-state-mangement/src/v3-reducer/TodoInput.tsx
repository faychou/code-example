import React, { useRef, useContext } from 'react';
import { MyContext } from './MyContext';

export default () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(MyContext);

  const addTodoHandler = () => {
    const value = inputRef.current!.value.trim();
    
    dispatch({
      type: 'ADDTODO',
      todo: {
        id: new Date().getTime(),
        text: value,
        isFinished: false
      }
    });

    inputRef.current!.value = '';
  }
  return (
    <div className="todo-input">
      <input type="text" placeholder="请输入待办事项" ref={ inputRef } />
      <button onClick={addTodoHandler}>添加</button>
    </div>
  )
}
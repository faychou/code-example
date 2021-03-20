import React, { useRef, useContext } from 'react';
import { MyContext } from './MyContext';

export default () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(MyContext);

  const addTodoHandler = () => {
    const value = inputRef.current!.value.trim();
    
    if(context !== null) { // 因为前面定义 context 初始值时可能为null，选择第二种写法可以避免
      context.addTodo({
        id: new Date().getTime(),
        text: value,
        isFinished: false
      });
    }

    inputRef.current!.value = '';
  }
  return (
    <div className="todo-input">
      <input type="text" placeholder="请输入待办事项" ref={ inputRef } />
      <button onClick={addTodoHandler}>添加</button>
    </div>
  )
}
import React, { useRef, useContext } from 'react';
import { observer } from "mobx-react";
import { MyContext, useStores } from './store';

const TodoInput =  () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const store = useContext(MyContext);
  // const store = useStores();

  const addTodoHandler = () => {
    const value = inputRef.current!.value.trim();
    
    store.addAction({
      id: new Date().getTime(),
      text: value,
      isFinished: false
    });

    inputRef.current!.value = '';
  }
  
  // const addTodoAsyncHandler = () => { // 异步
  //   const value = inputRef.current!.value.trim();
    
  //   store.addAsyncAction({
  //     id: new Date().getTime(),
  //     text: value,
  //     isFinished: false
  //   });

  //   inputRef.current!.value = '';
  // }

  return (
    <div className="todo-input">
      <input type="text" placeholder="请输入待办事项" ref={ inputRef } />
      <button onClick={addTodoHandler}>添加</button>
      {/* <button onClick={addTodoAsyncHandler}>异步添加</button> */}
    </div>
  )
}

export default observer(TodoInput);
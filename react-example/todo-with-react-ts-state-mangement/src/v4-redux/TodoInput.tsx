import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { addAction, addSyncAction } from './store/action';
import { addAction } from './store/action';

export default () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 返回 Redux store 的 分发(dispatch) 函数的引用
  const dispatch = useDispatch();

  const addTodoHandler = () => {
    const value = inputRef.current!.value.trim();
    
    dispatch(addAction({
      id: new Date().getTime(),
      text: value,
      isFinished: false
    }));

    inputRef.current!.value = '';
  }

  // const addTodoAsyncHandler = () => {
  //   const value = inputRef.current!.value.trim();
    
  //   dispatch(addSyncAction({ // 异步
  //     id: new Date().getTime(),
  //     text: value,
  //     isFinished: false
  //   }));

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
import React, { useState, useRef } from 'react';
import { todoListType } from './Todo';

interface IProps {
  addTodo: (todo: todoListType) => void;
}

export default ({addTodo}: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ text, setText ]  = useState('');

  const changeInputHandler = (e: React.ChangeEvent) => {
    // 这里不写类型断言的话，会报 e.target 不存在 value 属性
    // 因为 event.target 是一个 HTMLElement ,是所有 HTML 元素的父级，但不保证具有属性值
    setText((e.target as HTMLInputElement).value);
  }

  const addTodoHandler = () => {
    const value = inputRef.current!.value.trim();
    console.log(value);
    addTodo({
      id: new Date().getTime(),
      text: value,
      isFinished: false
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
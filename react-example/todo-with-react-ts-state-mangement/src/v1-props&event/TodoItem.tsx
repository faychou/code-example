import React from 'react';
import { todoListType } from './Todo';

interface IProps {
  todo: todoListType;
  changeTodo: (id: number) => void;
}

const style = {
  marginTop: '5px',
  padding: '5px 0',
  boxShadow: '0 0 3px #eee'
}

export default ({todo, changeTodo}: IProps) => {
  const changeHandler =() => {
    changeTodo(todo.id);
  }

  const spanStyle = {
    textDecoration: todo.isFinished ? 'line-through' : 'none'
  }

  return (
    <div className="todo-item" style={style}>
      <input type="checkbox" checked={todo.isFinished} onChange={changeHandler} />
      <span style={spanStyle}>{todo.text}</span>
    </div>
  )
}
import React, { useContext } from 'react';
import { MyContext, todoListType } from './MyContext';

interface IProps {
  todo: todoListType;
}

const style = {
  marginTop: '5px',
  padding: '5px 0',
  boxShadow: '0 0 3px #eee'
}

export default ({todo}: IProps) => {
  const context = useContext(MyContext);

  const spanStyle = {
    textDecoration: todo.isFinished ? 'line-through' : 'none'
  }

  const changeHandler =() => {
    if(context !== null) {
      context.changeTodo(todo.id);
    }
  }

  return (
    <div className="todo-item" style={style}>
      <input type="checkbox" checked={todo.isFinished} onChange={changeHandler} />
      <span style={spanStyle}>{todo.text}</span>
    </div>
  )
}
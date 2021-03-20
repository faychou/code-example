import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { MyContext } from './MyContext';

const style = {
  marginTop: '20px'
}

export default () => {

  const context = useContext(MyContext);

  const todoListDOM = context !== null ? context.todoList.map((item) => <TodoItem key={item.id} todo={item} />) : null;

  return (
    <div className="todo-list" style={style}>
      {todoListDOM}
    </div>
  )
}
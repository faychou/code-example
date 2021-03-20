import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { MyContext } from './MyContext';

const style = {
  marginTop: '20px'
}

export default () => {

  const { state } = useContext(MyContext);

  const todoListDOM = state.map((item) => <TodoItem key={item.id} todo={item} />);

  return (
    <div className="todo-list" style={style}>
      {todoListDOM}
    </div>
  )
}
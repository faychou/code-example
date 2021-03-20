import React from 'react';
import TodoItem from './TodoItem';
import { todoListType } from './Todo';

interface IProps {
  todoList: todoListType[];
  changeTodo: (id: number) => void;
}

const style = {
  marginTop: '20px'
}

export default ({todoList, changeTodo}: IProps) => {
  const todoListDOM = todoList.map((item) => <TodoItem key={item.id} todo={item} changeTodo={changeTodo} />)
  return (
    <div className="todo-list" style={style}>
      {todoListDOM}
    </div>
  )
}
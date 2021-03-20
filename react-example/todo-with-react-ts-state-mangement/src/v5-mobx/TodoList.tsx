import React from 'react';
import { observer } from "mobx-react";
import TodoItem from './TodoItem';
import { useStores } from './store';

const style = {
  marginTop: '20px'
}

const TodoList = () => {

  const store = useStores();

  const todoListDOM = store.todoList.map((item) => <TodoItem key={item.id} todo={item} />);

  return (
    <div className="todo-list" style={style}>
      {todoListDOM}
    </div>
  )
}

export default observer(TodoList);
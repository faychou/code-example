import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import TodoItem from './TodoItem';
import { useStores } from './store';

const style = {
  marginTop: '20px'
}

const TodoList = () => {

  const store = useStores();

  useEffect(() => {
    console.log('--store.todoList.length--', store.todoList.length);
  }, [store.todoList.length]);

  const todoListDOM = store.todoList.map((item) => <TodoItem key={item.id} todo={item} />);

  return (
    <div className="todo-list" style={style}>
      {todoListDOM}
    </div>
  )
}

export default observer(TodoList);
import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export interface todoListType {
  id: number;
  text: string;
  isFinished: boolean;
}

export default () => {
  const [ todoList, setTodoList ] = useState<todoListType[]>([]);

  const addTodo = (todo: todoListType) => {
    setTodoList([...todoList, todo]);
  }

  const changeTodo = (id: number) => {
    const newTodoList = todoList.map(item => {
      if(item.id === id) {
        return Object.assign({}, item, {
          isFinished: !item.isFinished
        });
      }
      return item;
    });
    setTodoList(newTodoList);
  }

  return (
    <div className="todo">
      <TodoInput addTodo={addTodo} />
      <TodoList todoList={todoList} changeTodo={changeTodo} />
    </div>
  )
}
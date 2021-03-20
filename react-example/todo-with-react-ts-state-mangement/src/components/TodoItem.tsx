import React from 'react';
import { observer } from "mobx-react";
import { useStores } from './store';
import { StateProps } from './store/TodoStore';

interface IProps {
  todo: StateProps;
}

const style = {
  marginTop: '5px',
  padding: '5px 0',
  boxShadow: '0 0 3px #eee'
}

const TodoItem = ({todo}: IProps) => {
  const { changeAction } = useStores();

  const spanStyle = {
    textDecoration: todo.isFinished ? 'line-through' : 'none'
  }

  const changeHandler = () => {
    changeAction(todo.id);
  }

  return (
    <div className="todo-item" style={style}>
      <input type="checkbox" checked={todo.isFinished} onChange={changeHandler} />
      <span style={spanStyle}>{todo.text}</span>
    </div>
  );
}

export default observer(TodoItem);
import React, { useContext } from 'react';
import { MyContext } from './MyContext';
import { StateProps } from './store/reducer';

interface IProps {
  todo: StateProps;
}

const style = {
  marginTop: '5px',
  padding: '5px 0',
  boxShadow: '0 0 3px #eee'
}

export default ({todo}: IProps) => {
  const { dispatch } = useContext(MyContext);

  const spanStyle = {
    textDecoration: todo.isFinished ? 'line-through' : 'none'
  }

  const changeHandler =() => {
    dispatch({
      type: 'CHANGEFINISHE',
      id: todo.id
    });
  }

  return (
    <div className="todo-item" style={style}>
      <input type="checkbox" checked={todo.isFinished} onChange={changeHandler} />
      <span style={spanStyle}>{todo.text}</span>
    </div>
  )
}
import React from 'react';
import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducer';

const style = {
  marginTop: '20px'
}

export default () => {

  // 订阅 Redux 的 store
  // 注意在选择器中声明 state 参数的类型
  const state = useSelector((state: RootState) => state);

  const todoListDOM = state.map((item) => <TodoItem key={item.id} todo={item} />);

  return (
    <div className="todo-list" style={style}>
      {todoListDOM}
    </div>
  )
}
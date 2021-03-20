import React, { createContext, useState } from 'react'

export interface todoListType {
  id: number;
  text: string;
  isFinished: boolean;
}

export interface ContextProps {
  todoList: todoListType[];
  addTodo: (todo: todoListType) => void;
  changeTodo: (id: number) => void
}

// interface IProps {
//   children: React.ReactNode;
// }

// 解决 createContext 初始值给 null 时 ts 报错
// export const MyContext = React.createContext<Partial<ContextProps>>({}); // 在这里可以给初始值
// export const MyContext = React.createContext({} as ContextProps);
export const MyContext = createContext<ContextProps | null>(null);

const MyProvider = (props: React.PropsWithChildren<{}>) => {
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
    // 使用一个 Provider 来将当前的 state 传递给以下的组件树
    // 中间的组件再也不必指明，无论多深，任何组件都能读取这个值
    <MyContext.Provider
      // 通过 value 向所有的子组件传递数据以及修改数据的方法，这里写两对大括号是因为外面那对是表示插值，里面那对表示对象
      value={{ 
        todoList,
        addTodo,
        changeTodo
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;

import React, { FC, createContext, useContext } from "react";
import todoStore from './TodoStore';

export const MyContext = createContext<typeof todoStore>(todoStore);

// 自定义 hook
export const useStores = () => {
  const store = useContext(MyContext);
  if (!store) {
    throw new Error("no store");
  }
  return store;
};

// const MyProvider = (props: React.PropsWithChildren<{}>) => {
const MyProvider: FC = ({ children }) => {
  return (
    <MyContext.Provider value={todoStore}>
      {children}
    </MyContext.Provider>
  )
};

export default MyProvider;
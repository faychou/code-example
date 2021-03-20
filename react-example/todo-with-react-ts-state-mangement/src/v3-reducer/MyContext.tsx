import React, { useReducer } from 'react';
import redecer, { StateProps, ActionProps } from './store/reducer';

export interface ContextProps {
  state: StateProps[];
  dispatch: React.Dispatch<ActionProps>;
}

export const MyContext = React.createContext({} as ContextProps);

const MyProvider = (props: React.PropsWithChildren<{}>) => {
  const initState: StateProps[] = [];
  // 将业务逻辑拆分到单独文件中去，更容易管理大量的状态，使组件更加干净
  const [ state, dispatch ] = useReducer(redecer, initState);

  return (
    <MyContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;

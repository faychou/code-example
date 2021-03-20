import * as types from './actionType';

export interface StateProps {
  id: number;
  text: string;
  isFinished: boolean;
}

export interface ActionProps {
  type: string;
  [key: string]: any;
}

const reducer = (state: StateProps[] = [], action: ActionProps): StateProps[] => {
  switch(action.type) {
    case types.ADD:
      return [...state, action.todo];
    case types.CHANGEFINISHED:
      return state.map(item => {
        if(item.id === action.id) {
          return Object.assign({}, item, {
            isFinished: !item.isFinished
          });
        }
        return item;
      });
    default:
      return state;
  }
}

// 注意这里不必显式声明 RootState 的新接口，使用 ReturnType 从 rootReducer 推断类型
// ReturnType<T>的作用是用于获取函数 T 的返回类型
export type RootState = ReturnType<typeof reducer>;

export default reducer;
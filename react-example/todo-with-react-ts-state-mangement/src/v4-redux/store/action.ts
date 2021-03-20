
import { Dispatch } from 'redux';
import * as types from './actionType';
import { StateProps } from './reducer';

export const addAction = (todo: StateProps) => {
  return {
    type: types.ADD,
    todo
  }
}

// export const addSyncAction = (todo: StateProps) => (dispatch: Dispatch) => { // 异步 action
//   setTimeout(() => { // 模拟异步
//     dispatch(addAction(todo))
//   }, 1000);
// }

export const changeAction = (id: number) => {
  return {
    type: types.CHANGEFINISHED,
    id
  }
}
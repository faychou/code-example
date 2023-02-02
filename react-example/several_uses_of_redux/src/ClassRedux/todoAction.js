import { ADD_TODO_TYPE } from "./todoActionsType";

export const addTodoAction = (payload) => {
  return {
    type: ADD_TODO_TYPE,
    payload,
  };
};

// 异步
export const addTodoActionAsync = (payload) => {
  return (dispatch) => {
    dispatch(addTodoAction(payload));
  };
};

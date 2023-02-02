import { ADD_TODO_TYPE } from "./todoActionsType";

const initState = {
  todoList: [
    {
      text: "从入门到放弃",
    },
  ],
};
function todoReducer(state = initState, action) {
  switch (action.type) {
    case ADD_TODO_TYPE:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    default:
      return state;
  }
}

export default todoReducer;

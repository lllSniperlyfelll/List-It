import {
  CREATE_NEW_TODO_LIST,
  DETELE_TODO_LIST,
  INIT_TODO_LIST,
} from '../Actions/ActionTypes';

initialState = {
  todoLists: [],
  isLoading: true,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case INIT_TODO_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_NEW_TODO_LIST:
      const uuid = Object.keys(state.todoLists).length + 5;

      return {
        ...state,
        todoLists: actions.payload,
        isLoading: false,
      };

    case DETELE_TODO_LIST:
      const newTodoList = state.todoLists.filter(
        (item) => item.id === actions.payload,
      );
      return {
        ...state,
        todoLists: newTodoList,
      };
    default:
      return state.todoLists;
  }
}

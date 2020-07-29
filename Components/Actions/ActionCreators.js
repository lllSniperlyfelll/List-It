import {
  CREATE_NEW_GROCERY_LIST,
  CREATE_NEW_TODO_LIST,
  DETELE_GROCERY_LIST,
  DETELE_TODO_LIST,
} from './ActionTypes';



export const deleteTodoList = (listId) => dispatch => {
  dispatch(getDeleteTodoListAction(listId))
}
const getDeleteTodoListAction = (listId) => ({
  type: DETELE_TODO_LIST,
  payload: listId
})





export const deleteGroceryList = (listId) => (dispatch) => {
  dispatch(getDeleteGroceryListAction(listId));
};
const getDeleteGroceryListAction = (listId) => ({
  type: DETELE_GROCERY_LIST,
  payload: listId,
});


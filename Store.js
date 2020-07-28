import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import todoListReducer from "./Components/Reducers/todoListReducer";
import groceryListReducer from './Components/Reducers/groceryListReducer';

export default function Store() {
  const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true,
  };

  const combinedReducers = combineReducers({
    todoLists: todoListReducer,
    groceryLists: groceryListReducer,
  });
  /**
   * Reducers to be added
   */

  const store = createStore(combinedReducers, applyMiddleware(thunk, logger));
  return { store };
}

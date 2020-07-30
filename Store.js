import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import todoListReducer from './Components/Reducers/todoListReducer';
import groceryListReducer from './Components/Reducers/groceryListReducer';
import tutorialsReducer from './Components/Reducers/tutorialsReducer';

export default function Store() {
  const config = {
    key: 'listIt',
    storage: AsyncStorage,
    debug: true,
  };

  const combinedReducers = persistCombineReducers(config, {
    todoLists: todoListReducer,
    groceryLists: groceryListReducer,
    tutorials: tutorialsReducer,
  });
  /**
   * Reducers to be added
   */

  const store = createStore(combinedReducers, applyMiddleware(thunk, logger));
  const persistedStore = persistStore(store);
  return {store, persistedStore};
}

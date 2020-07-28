import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

export default function Store() {
  const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true,
  };

  const combinedReducers = combineReducers({});
  /**
   * Reducers to be added
   */

  const store = createStore(combinedReducers, applyMiddleware(thunk, logger));
  return store;
}

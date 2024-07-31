import { createStore, combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  // other reducers can be added here
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;

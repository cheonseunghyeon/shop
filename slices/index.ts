import {combineReducers} from 'redux';

import shoppinglist from './shoppinglist';
const rootReducer = combineReducers({
  shoppinglist,
});

// rootReducer 함수의 반환값 타입을 RootState type alias로 지정
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

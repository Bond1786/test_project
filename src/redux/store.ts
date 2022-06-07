import { applyMiddleware, combineReducers, compose, createStore } from '@reduxjs/toolkit';
import { ApiMiddleWare } from '../middleware/APIMiddle';
import { loggerMiddleware } from '../middleware/logger';
import AppReducer from './AppReducer';

// import reportWebVitals from './reportWebVitals';
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
export const rootReducer = combineReducers({
  app: AppReducer
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const store = createStore(rootReducer,applyMiddleware(loggerMiddleware,ApiMiddleWare));
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

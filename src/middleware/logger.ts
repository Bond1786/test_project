import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
export const loggerMiddleware: Middleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch) =>
  <A extends Action>(action: A): A => {
    const result = next(action);
    return result;
  };

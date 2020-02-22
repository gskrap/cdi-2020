import reducers from '../reducers/reducers';
import {Action, applyMiddleware, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export type AppThunkDispatch = ThunkDispatch<
  AppState,
  void,
  Action<any>
>

export type AppState = {
  appLoading: boolean,
}

const initialState = {
  appLoading: false,
};

const configureStore = (initialState: AppState) => {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunk),
  )
};

const store = configureStore(initialState);
export { store }
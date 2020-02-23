import reducers from '../reducers/reducers';
import {Action, applyMiddleware, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {User} from '../models/user';

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
  loggedIn: boolean,
  currentUser: User | null,
}

const initialState: AppState = {
  appLoading: false,
  loggedIn: false,
  currentUser: null,
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
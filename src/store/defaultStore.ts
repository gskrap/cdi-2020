import reducers from '../reducers/reducers';
import {Action, applyMiddleware, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {DanceClass} from '../models/DanceClass';
import {User} from '../models/User';

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
  logInLoading: boolean,
  loggedIn: boolean,
  currentUser: User | null,
  danceClasses: DanceClass[] | null,
  danceClassesLoading: boolean,
}

const initialState: AppState = {
  logInLoading: false,
  loggedIn: false,
  currentUser: null,
  danceClasses: null,
  danceClassesLoading: false,
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

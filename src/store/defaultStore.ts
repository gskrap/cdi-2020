import reducers from '../reducers/reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {DanceClass} from '../models/DanceClass';
import {User} from '../models/User';

export type AppState = {
  logInLoading: boolean,
  loggedIn: boolean,
  currentUser: User | null,
  danceClasses: DanceClass[] | null,
  danceClassesLoading: boolean,
  teachers: User[] | null,
  teachersLoading: boolean,
}

const initialState: AppState = {
  logInLoading: false,
  loggedIn: false,
  currentUser: null,
  danceClasses: null,
  danceClassesLoading: false,
  teachers: null,
  teachersLoading: false,
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

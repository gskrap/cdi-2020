import reducers from '../reducers/reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {DanceClass} from '../models/DanceClass';
import {User} from '../models/User';
import {StudentGroup} from '../models/StudentGroup';
import {DanceClassLocation} from '../models/DanceClassLocation';
import {CLASS_FILTER} from '../constants/settingsConstants';

export type AppState = {
  logInLoading: boolean,
  loggedIn: boolean,
  currentUser: User | null,
  danceClassFilter: CLASS_FILTER,
  danceClasses: DanceClass[] | null,
  danceClassesLoading: boolean,
  danceClassesLoaded: boolean,
  groups: StudentGroup[] | null,
  groupsLoading: boolean,
  locations: DanceClassLocation[] | null,
  locationsLoading: boolean,
  selectedUser: User | null,
  teachers: User[] | null,
  teachersLoading: boolean,
}

const initialState: AppState = {
  logInLoading: false,
  loggedIn: false,
  currentUser: null,
  danceClassFilter: CLASS_FILTER.MY,
  danceClasses: null,
  danceClassesLoading: false,
  danceClassesLoaded: false,
  groups: null,
  groupsLoading: false,
  locations: null,
  locationsLoading: false,
  selectedUser: null,
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

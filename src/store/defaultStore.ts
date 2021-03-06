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
  teachers: User[] | null,
  teachersLoading: boolean,
  allUsers: User[] | null,
  allUsersLoading: boolean,
  selectedUser: User| null,
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
  teachers: null,
  teachersLoading: false,
  allUsers: null,
  allUsersLoading: false,
  selectedUser: null,
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

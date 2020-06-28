import {API, checkHttpResponse} from '../helpers/httpHelper';
import {Dispatch} from 'redux';
import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_FAIL,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_DANCE_CLASSES,
  FETCH_DANCE_CLASSES_FAIL,
  FETCH_DANCE_CLASSES_SUCCESS,
  FETCH_GROUPS,
  FETCH_GROUPS_FAIL,
  FETCH_GROUPS_SUCCESS,
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_FAIL,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_TEACHERS,
  FETCH_TEACHERS_FAIL,
  FETCH_TEACHERS_SUCCESS,
  FetchAllUsersAction,
  FetchAllUsersFailAction,
  FetchAllUsersSuccessAction,
  FetchDanceClassesAction,
  FetchDanceClassesFailAction,
  FetchDanceClassesSuccessAction,
  FetchGroupsAction,
  FetchGroupsFailAction,
  FetchGroupsSuccessAction,
  FetchLocationsAction,
  FetchLocationsFailAction,
  FetchLocationsSuccessAction,
  FetchTeachersAction,
  FetchTeachersFailAction,
  FetchTeachersSuccessAction,
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAIL,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SET_SELECTED_USER,
  LogInFailAction,
  LogInRequestAction,
  LogInSuccessAction,
  LogOutFailAction,
  LogOutRequestAction,
  LogOutSuccessAction,
  SetSelectedUserAction,
} from './actionTypes';
import {User} from '../models/User';
import {CLASS_FILTER} from '../constants/settingsConstants';

export const TIMEOUT = 0;
export type MappedActions<T extends (...args: any[]) => any> = ReturnType<T>;

export default (dispatch: Dispatch) => ({
  actions: {
    async fetchPermissions() {
      dispatch<LogInRequestAction>({type: LOG_IN_REQUEST});
      try {
        const response = await API.get('/user_status');
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          dispatch<LogInSuccessAction>({
            type: LOG_IN_SUCCESS,
            payload: responseBody,
          })
        }, TIMEOUT)
      } catch (e) {
        dispatch<LogInFailAction>({type: LOG_IN_FAIL});
        console.error(e);
      }
    },

    async register(user: Partial<User>) {
      dispatch<LogInRequestAction>({type: LOG_IN_REQUEST});
      try {
        const response = await API.post('/users', { user });
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          window.localStorage.setItem('auth_token', responseBody.auth_token);
          this.fetchPermissions();
        }, TIMEOUT);
      } catch (e) {
        dispatch<LogInFailAction>({type: LOG_IN_FAIL});
        console.error(e);
      }
    },

    async logIn(email: string, password: string) {
      dispatch<LogInRequestAction>({type: LOG_IN_REQUEST});
      try {
        const session = {session: {email, password}};
        const response = await API.post('/sessions', session);
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          window.localStorage.setItem('auth_token', responseBody.auth_token);
          this.fetchPermissions();
        }, TIMEOUT);
      } catch (e) {
        dispatch<LogInFailAction>({type: LOG_IN_FAIL});
        console.error(e);
      }
    },

    async logOut() {
      dispatch<LogOutRequestAction>({type: LOG_OUT_REQUEST});
      try {
        const response = await API.delete(`/sessions/${window.localStorage.getItem('auth_token')}`);
        await checkHttpResponse(response);
        setTimeout(() => {
          window.localStorage.removeItem('auth_token')
          dispatch<LogOutSuccessAction>({type: LOG_OUT_SUCCESS});
        }, TIMEOUT);
      } catch (e) {
        dispatch<LogOutFailAction>({type: LOG_OUT_FAIL});
        console.error(e);
      }
    },

    async fetchDanceClasses(userId?: number, cb?: () => void) {
      dispatch<FetchDanceClassesAction>({type: FETCH_DANCE_CLASSES});
      try {
        const response = await API.get(`${userId ? '/users/' + userId : ''}/dance_classes`);
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          dispatch<FetchDanceClassesSuccessAction>({
            type: FETCH_DANCE_CLASSES_SUCCESS,
            payload: responseBody,
            filter: userId ? CLASS_FILTER.MY : CLASS_FILTER.ALL,
          });
          if (cb) cb();
        }, TIMEOUT);
      } catch (e) {
        dispatch<FetchDanceClassesFailAction>({type: FETCH_DANCE_CLASSES_FAIL});
        console.error(e);
      }
    },

    async deleteDanceClass(danceClassId: number, cb?: () => void) {
      try {
        await API.delete(`/dance_classes/${danceClassId}`);
        this.fetchDanceClasses();
        if (cb) cb();
      } catch (e) {
        console.error(e);
      }
    },

    async fetchGroups() {
      dispatch<FetchGroupsAction>({type: FETCH_GROUPS});
      try {
        const response = await API.get('/groups');
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          dispatch<FetchGroupsSuccessAction>({
            type: FETCH_GROUPS_SUCCESS,
            payload: responseBody,
          })
        }, TIMEOUT);
      } catch (e) {
        dispatch<FetchGroupsFailAction>({type: FETCH_GROUPS_FAIL});
        console.error(e);
      }
    },

    async fetchLocations() {
      dispatch<FetchLocationsAction>({type: FETCH_LOCATIONS});
      try {
        const response = await API.get('/locations');
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          dispatch<FetchLocationsSuccessAction>({
            type: FETCH_LOCATIONS_SUCCESS,
            payload: responseBody,
          })
        }, TIMEOUT);
      } catch (e) {
        dispatch<FetchLocationsFailAction>({type: FETCH_LOCATIONS_FAIL});
        console.error(e);
      }
    },

    async fetchTeachers() {
      dispatch<FetchTeachersAction>({type: FETCH_TEACHERS});
      try {
        const response = await API.get('/teachers');
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          dispatch<FetchTeachersSuccessAction>({
            type: FETCH_TEACHERS_SUCCESS,
            payload: responseBody,
          })
        }, TIMEOUT);
      } catch (e) {
        dispatch<FetchTeachersFailAction>({type: FETCH_TEACHERS_FAIL});
        console.error(e);
      }
    },

    async fetchAllUsers() {
      dispatch<FetchAllUsersAction>({type: FETCH_ALL_USERS});
      try {
        const response = await API.get('/users');
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          dispatch<FetchAllUsersSuccessAction>({
            type: FETCH_ALL_USERS_SUCCESS,
            payload: responseBody,
          })
        }, TIMEOUT);
      } catch (e) {
        dispatch<FetchAllUsersFailAction>({type: FETCH_ALL_USERS_FAIL});
        console.error(e);
      }
    },

    setSelectedUser(user: User | null, newData: boolean = false) {
      dispatch<SetSelectedUserAction>({
        type: SET_SELECTED_USER,
        payload: user,
        newData,
      })
    }
  },
})

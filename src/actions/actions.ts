import {API, checkHttpResponse} from '../helpers/httpHelper';
import {Dispatch} from 'redux';
import {
  FETCH_DANCE_CLASSES, FETCH_DANCE_CLASSES_FAIL, FETCH_DANCE_CLASSES_SUCCESS,
  FetchDanceClassesAction, FetchDanceClassesFailAction, FetchDanceClassesSuccessAction,
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS, LOG_OUT_FAIL, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
  LogInFailAction,
  LogInRequestAction,
  LogInSuccessAction, LogOutFailAction, LogOutRequestAction, LogOutSuccessAction
} from './actionTypes';

export const TIMEOUT = 500;
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
      }
    },

    async fetchDanceClasses(prefix?: string) {
      dispatch<FetchDanceClassesAction>({type: FETCH_DANCE_CLASSES});
      try {
        const response = await API.get(`${prefix || ''}/dance_classes`);
        const responseBody = await checkHttpResponse(response);
        setTimeout(() => {
          dispatch<FetchDanceClassesSuccessAction>({
            type: FETCH_DANCE_CLASSES_SUCCESS,
            payload: responseBody,
          })
        }, TIMEOUT);
      } catch (e) {
        dispatch<FetchDanceClassesFailAction>({type: FETCH_DANCE_CLASSES_FAIL});
        console.log(e);
      }
    },
  },
})

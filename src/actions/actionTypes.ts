import {User} from '../models/User';
import {DanceClass} from '../models/DanceClass';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_FAIL = 'LOG_IN_REQUEST_FAIL';
export const LOG_IN_SUCCESS = 'LOG_IN_REQUEST_SUCCESS';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_FAIL = 'LOG_OUT_REQUEST_FAIL';
export const LOG_OUT_SUCCESS = 'LOG_OUT_REQUEST_SUCCESS';
export const FETCH_DANCE_CLASSES = 'FETCH_DANCE_CLASSES';
export const FETCH_DANCE_CLASSES_FAIL = 'FETCH_DANCE_CLASSES_FAIL';
export const FETCH_DANCE_CLASSES_SUCCESS = 'FETCH_DANCE_CLASSES_SUCCESS';
export const FETCH_TEACHERS = 'FETCH_TEACHERS';
export const FETCH_TEACHERS_FAIL = 'FETCH_TFETCH_TEACHERS_FAILEACHERS';
export const FETCH_TEACHERS_SUCCESS = 'FETCH_TEACHERS_SUCCESS';

export interface LogInRequestAction {
  type: typeof LOG_IN_REQUEST;
}

export interface LogInFailAction {
  type: typeof LOG_IN_FAIL;
}

export interface LogInSuccessAction {
  type: typeof LOG_IN_SUCCESS;
  payload: {
    loggedIn: boolean,
    user: User,
  };
}

export interface LogOutRequestAction {
 type: typeof LOG_OUT_REQUEST;
}

export interface LogOutFailAction {
 type: typeof LOG_OUT_FAIL;
}

export interface LogOutSuccessAction {
 type: typeof LOG_OUT_SUCCESS;
}

export interface FetchDanceClassesAction {
  type: typeof FETCH_DANCE_CLASSES;
}

export interface FetchDanceClassesFailAction {
  type: typeof FETCH_DANCE_CLASSES_FAIL;
}

export interface FetchDanceClassesSuccessAction {
  type: typeof FETCH_DANCE_CLASSES_SUCCESS;
  payload: DanceClass[];
}

export interface FetchTeachersAction {
  type: typeof FETCH_TEACHERS;
}

export interface FetchTeachersFailAction {
  type: typeof FETCH_TEACHERS_FAIL;
}

export interface FetchTeachersSuccessAction {
  type: typeof FETCH_TEACHERS_SUCCESS;
  payload: User[];
}

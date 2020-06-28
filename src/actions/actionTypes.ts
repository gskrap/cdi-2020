import {User} from '../models/User';
import {DanceClass} from '../models/DanceClass';
import {DanceClassLocation} from '../models/DanceClassLocation';
import {StudentGroup} from '../models/StudentGroup';
import {CLASS_FILTER} from '../constants/settingsConstants';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_FAIL = 'LOG_IN_REQUEST_FAIL';
export const LOG_IN_SUCCESS = 'LOG_IN_REQUEST_SUCCESS';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_FAIL = 'LOG_OUT_REQUEST_FAIL';
export const LOG_OUT_SUCCESS = 'LOG_OUT_REQUEST_SUCCESS';
export const FETCH_DANCE_CLASSES = 'FETCH_DANCE_CLASSES';
export const FETCH_DANCE_CLASSES_FAIL = 'FETCH_DANCE_CLASSES_FAIL';
export const FETCH_DANCE_CLASSES_SUCCESS = 'FETCH_DANCE_CLASSES_SUCCESS';
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const FETCH_GROUPS_FAIL = 'FETCH_GROUPS_FAIL';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_LOCATIONS_FAIL = 'FETCH_LOCATIONS_FAIL';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_TEACHERS = 'FETCH_TEACHERS';
export const FETCH_TEACHERS_FAIL = 'FETCH_TEACHERS_FAIL';
export const FETCH_TEACHERS_SUCCESS = 'FETCH_TEACHERS_SUCCESS';
export const SET_SELECTED_USER = 'SET_SELECTED_USER';

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
  filter: CLASS_FILTER;
}

export interface FetchGroupsAction {
  type: typeof FETCH_GROUPS;
}

export interface FetchGroupsFailAction {
  type: typeof FETCH_GROUPS_FAIL;
}

export interface FetchGroupsSuccessAction {
  type: typeof FETCH_GROUPS_SUCCESS;
  payload: StudentGroup[];
}

export interface FetchLocationsAction {
  type: typeof FETCH_LOCATIONS;
}

export interface FetchLocationsFailAction {
  type: typeof FETCH_LOCATIONS_FAIL;
}

export interface FetchLocationsSuccessAction {
  type: typeof FETCH_LOCATIONS_SUCCESS;
  payload: DanceClassLocation[];
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

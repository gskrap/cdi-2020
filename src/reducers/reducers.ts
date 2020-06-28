import {
  FETCH_DANCE_CLASSES,
  FETCH_DANCE_CLASSES_FAIL,
  FETCH_DANCE_CLASSES_SUCCESS,
  FETCH_GROUPS,
  FETCH_GROUPS_FAIL,
  FETCH_GROUPS_SUCCESS,
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_FAIL, FETCH_LOCATIONS_SUCCESS,
  FETCH_TEACHERS,
  FETCH_TEACHERS_FAIL,
  FETCH_TEACHERS_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAIL,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS, SET_SELECTED_USER
} from '../actions/actionTypes';

const reducers = (state: any, action: any) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        loggedIn: false,
        logInLoading: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        loggedIn: action.payload.loggedIn,
        logInLoading: false,
      };
    case LOG_OUT_REQUEST:
    case LOG_OUT_FAIL:
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loggedIn: false,
      };
    case FETCH_DANCE_CLASSES:
      return {
        ...state,
        danceClassesLoading: true,
      };
    case FETCH_DANCE_CLASSES_FAIL:
      return {
        ...state,
        danceClassesLoading: false,
      };
    case FETCH_DANCE_CLASSES_SUCCESS:
      return {
        ...state,
        danceClasses: action.payload,
        danceClassFilter: action.filter,
        danceClassesLoading: false,
        danceClassesLoaded: true,
      };
    case FETCH_GROUPS:
      return {
        ...state,
        groupsLoading: true,
      };
    case FETCH_GROUPS_FAIL:
      return {
        ...state,
        groupsLoading: false,
      };
    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        groupsLoading: false,
      };
    case FETCH_LOCATIONS:
      return {
        ...state,
        locationsLoading: true,
      };
    case FETCH_LOCATIONS_FAIL:
      return {
        ...state,
        locationsLoading: false,
      };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        locationsLoading: false,
      };
    case FETCH_TEACHERS:
      return {
        ...state,
        teachersLoading: true,
      };
    case FETCH_TEACHERS_FAIL:
      return {
        ...state,
        teachersLoading: false,
      };
    case FETCH_TEACHERS_SUCCESS:
      return {
        ...state,
        teachers: action.payload,
        teachersLoading: false,
      };
    default:
      return state
  }
};

export default reducers;

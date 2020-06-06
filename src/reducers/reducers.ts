import {
  FETCH_DANCE_CLASSES, FETCH_DANCE_CLASSES_FAIL, FETCH_DANCE_CLASSES_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAIL,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS
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
        danceClassesLoading: false,
      };
    default:
      return state
  }
};

export default reducers;

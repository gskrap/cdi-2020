import {ACTION_TYPES} from '../actions/actions';

const reducers = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_APP_LOADING:
      return Object.assign({}, state, {
        appLoading: action.bool
      });
    case ACTION_TYPES.UPDATE_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.bool
      });
    case ACTION_TYPES.UPDATE_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.user
      });
    default:
      return state
  }
};

export default reducers;
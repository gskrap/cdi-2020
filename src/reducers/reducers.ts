import {ACTION_TYPES} from '../actions/actions';

const reducers = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_APP_LOADING:
      return Object.assign({}, state, {
        appLoading: action.bool
      });
    default:
      return state
  }
};

export default reducers;
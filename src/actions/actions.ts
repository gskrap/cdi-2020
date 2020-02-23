import {AppThunkAction} from '../store/default-store';
import {checkHttpResponse} from '../helpers/http-helper';
import {User} from '../models/user';

export const API = 'https://cdi-api.herokuapp.com';
// export const API = 'http://localhost:3000';

export const TIMEOUT = 500;

export enum ACTION_TYPES {
  UPDATE_APP_LOADING = 'UPDATE_APP_LOADING',
  UPDATE_LOGGED_IN = 'UPDATE_LOGGED_IN',
  UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER',
}

export const getPermissions = (): AppThunkAction => dispatch => {
  dispatch(updateAppLoading(true));
  setTimeout(() => {
    fetch(API + '/user_status', {
      method: 'get',
      headers: {'Authorization': window.localStorage.getItem('auth_token')!}
    })
      .then(response => checkHttpResponse(response))
      .then((response) => {
        dispatch(updateCurrentUser(response.user));
        dispatch(updateLoggedIn(response.loggedIn));
        dispatch(updateAppLoading(false));
      })
      .catch(error => {
        console.log(error);
        dispatch(updateAppLoading(false));
      })
  }, TIMEOUT)
}

export const logIn = (email: string, password: string): AppThunkAction => dispatch => {
  dispatch(updateAppLoading(true));
  setTimeout(() => {
    fetch(API + '/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session: {
          email: email,
          password: password,
        }
      }),
    })
      .then(response => checkHttpResponse(response))
      .then(response => {
        window.localStorage.setItem('auth_token', response.auth_token);
        dispatch(getPermissions());
      })
      .catch(error => {
        console.log(error);
        dispatch(updateAppLoading(false));
      })
  }, TIMEOUT)
};

export const logOut = (): AppThunkAction => dispatch => {
  dispatch(updateAppLoading(true))
  setTimeout(() => {
    fetch(API + '/sessions/' + window.localStorage.getItem('auth_token'), {
      method: 'delete',
    })
      .then(response => checkHttpResponse(response))
      .then(() => {
        window.localStorage.removeItem('auth_token')
        dispatch(updateLoggedIn(false));
        dispatch(updateAppLoading(false));
        dispatch(updateCurrentUser(null));
      })
      .catch(error => {
        console.log(error);
        dispatch(updateAppLoading(false));
      })
  }, TIMEOUT)
}

export const updateAppLoading = (bool: boolean) => {
  return {
    type: ACTION_TYPES.UPDATE_APP_LOADING,
    bool,
  }
};

export const updateLoggedIn = (bool: boolean) => {
  return {
    type: ACTION_TYPES.UPDATE_LOGGED_IN,
    bool,
  }
};

export const updateCurrentUser = (user: User | null) => {
  return {
    type: ACTION_TYPES.UPDATE_CURRENT_USER,
    user,
  }
};
import {AppThunkAction} from '../store/default-store';
import {checkHttpResponse} from '../helpers/http-helper';

export const API = 'https://cdi-api.herokuapp.com';
// export const API = 'http://localhost:3000';

export const TIMEOUT = 500;

export enum ACTION_TYPES {
  UPDATE_APP_LOADING = 'UPDATE_APP_LOADING'
}

export const logIn = (email: string, password: string): AppThunkAction => (dispatch) => {
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
        console.log('user logged in successfully :: ', response.auth_token);
        // window.localStorage.setItem('auth_token', response.data.auth_token)
        // dispatch(getPermissions())
        dispatch(updateAppLoading(false))
      })
      .catch(error => {
        console.log(error)
        dispatch(updateAppLoading(false))
      })
  }, TIMEOUT)
};

export const updateAppLoading = (bool: boolean) => {
  return {
    type: ACTION_TYPES.UPDATE_APP_LOADING,
    bool,
  }
};
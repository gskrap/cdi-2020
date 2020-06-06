const apiUrl = 'https://cdi-api.herokuapp.com';
//const apiUrl = 'http://localhost:3000';

export const checkHttpResponse = (response: Response) => {
  if (response.ok) {
    if (response.status === 204) {
      return Promise.resolve();
    } else {
      return response.json();
    }
  } else {
    throw new Error();
  }
};

export const API = {
  delete(path: string) {
    return fetch(`${apiUrl}${path}`, {
      method: 'DELETE',
    })
  },
  get(path: string) {
    return fetch(`${apiUrl}${path}`, {
      method: 'GET',
      headers: {'Authorization': window.localStorage.getItem('auth_token')!}
    })
  },
  post(path: string, payload?: any, options = {}) {
    return fetch(`${apiUrl}${path}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
      ...options,
    })
  }
};

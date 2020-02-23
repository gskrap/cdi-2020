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
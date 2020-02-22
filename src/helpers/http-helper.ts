export const checkHttpResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error();
  }
};